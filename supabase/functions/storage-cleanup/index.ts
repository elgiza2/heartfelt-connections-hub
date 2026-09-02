/**
 * @doc One-off maintenance endpoint that deletes old Storage objects through the
 * Storage API (SQL deletes are blocked by `storage.protect_delete`).
 *
 * Protected by the `STORAGE_CLEANUP_TOKEN` secret. Accepts a bucket list and an
 * optional age filter, deletes in batches, and reports how many bytes it freed.
 */
import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CLEANUP_TOKEN = Deno.env.get("STORAGE_CLEANUP_TOKEN") ?? "";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const token = req.headers.get("x-cleanup-token") ?? "";
  if (!CLEANUP_TOKEN || token !== CLEANUP_TOKEN) return json({ error: "Unauthorized" }, 401);

  let payload: { buckets?: string[]; olderThanDays?: number; dryRun?: boolean };
  try {
    payload = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const buckets = Array.isArray(payload.buckets)
    ? payload.buckets.filter((b) => typeof b === "string" && b.length > 0).slice(0, 20)
    : [];
  if (buckets.length === 0) return json({ error: "buckets must be a non-empty string array" }, 400);

  const olderThanDays = Number.isFinite(payload.olderThanDays)
    ? Math.max(0, Number(payload.olderThanDays))
    : 0;
  const cutoff = Date.now() - olderThanDays * 86_400_000;
  const dryRun = payload.dryRun === true;

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const report: Record<string, { deleted: number; bytes: number; errors: string[] }> = {};

  for (const bucket of buckets) {
    const entry = { deleted: 0, bytes: 0, errors: [] as string[] };
    report[bucket] = entry;

    // Storage list() is per-prefix, so walk the tree breadth-first.
    const prefixes: string[] = [""];
    const paths: { path: string; size: number }[] = [];

    while (prefixes.length > 0) {
      const prefix = prefixes.shift()!;
      let offset = 0;
      for (;;) {
        const { data, error } = await admin.storage
          .from(bucket)
          .list(prefix, { limit: 1000, offset });
        if (error) {
          entry.errors.push(error.message);
          break;
        }
        if (!data || data.length === 0) break;
        for (const item of data) {
          const full = prefix ? `${prefix}/${item.name}` : item.name;
          if (item.id === null) {
            prefixes.push(full);
            continue;
          }
          const created = item.created_at ? Date.parse(item.created_at) : 0;
          if (created && created > cutoff) continue;
          paths.push({ path: full, size: Number(item.metadata?.size ?? 0) });
        }
        if (data.length < 1000) break;
        offset += data.length;
      }
    }

    if (dryRun) {
      entry.deleted = paths.length;
      entry.bytes = paths.reduce((sum, p) => sum + p.size, 0);
      continue;
    }

    for (let i = 0; i < paths.length; i += 100) {
      const batch = paths.slice(i, i + 100);
      const { error } = await admin.storage.from(bucket).remove(batch.map((p) => p.path));
      if (error) {
        entry.errors.push(error.message);
        continue;
      }
      entry.deleted += batch.length;
      entry.bytes += batch.reduce((sum, p) => sum + p.size, 0);
    }
  }

  const totalBytes = Object.values(report).reduce((sum, r) => sum + r.bytes, 0);
  return json({ dryRun, totalBytes, totalMB: +(totalBytes / 1_048_576).toFixed(1), report });
});
