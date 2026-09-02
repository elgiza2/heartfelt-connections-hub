/** @doc Server-reported referral milestone: five verified friends unlock limited-time Pro. */
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Milestone {
  ok: boolean;
  referrals: number;
  target: number;
  remaining: number;
  granted: boolean;
  plan: string;
  expires_at: string | null;
}

const MILESTONE_TARGET = 5;

export default function MilestoneCard() {
  const [state, setState] = useState<Milestone | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      const { data, error } = await (supabase as any).rpc("my_referral_milestone");
      if (!alive) return;
      if (error || !data?.ok) { setFailed(true); return; }
      setState(data as Milestone);
    })();
    return () => { alive = false; };
  }, []);

  if (failed) return (
    <section className="border-y border-[hsl(var(--referral-ink)/0.14)] py-4">
      <p className="text-[13px] text-[hsl(var(--referral-ink)/0.62)]">We couldn&apos;t load your Pro progress. Refresh to try again.</p>
    </section>
  );
  if (!state) return <section className="h-[126px] animate-pulse border-y border-[hsl(var(--referral-ink)/0.14)] bg-[hsl(var(--referral-sky)/0.55)]" />;

  const target = state.target || MILESTONE_TARGET;
  const done = Math.min(state.referrals, target);
  const pct = Math.round((done / target) * 100);
  const expires = state.expires_at ? new Date(state.expires_at) : null;

  return (
    <section className="border-y border-[hsl(var(--referral-ink)/0.14)] py-5">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--referral-ink)/0.48)]">Your invitation progress</p>
          <p className="mt-2 font-serif text-[26px] leading-none text-[hsl(var(--referral-ink))]">{state.granted ? "Pro is active." : `You are ${state.remaining ? `${state.remaining} friends` : "there"} away.`}</p>
          <p className="mt-2 max-w-[500px] text-[13px] leading-relaxed text-[hsl(var(--referral-ink)/0.58)]">
            {state.granted ? (expires ? `Your limited-time Pro access is active until ${expires.toLocaleDateString()}.` : "Your limited-time Pro access is active.") : "Verified invitations count toward your free limited-time Pro access."}
          </p>
        </div>
        <span className="shrink-0 font-serif text-[28px] leading-none text-[hsl(var(--referral-sky-deep))]">{pct}%</span>
      </div>
      <div className="mt-5 grid grid-cols-5 gap-1.5" aria-label={`${done} of ${target} friends joined`}>
        {Array.from({ length: target }).map((_, i) => <span key={i} className={`h-2 rounded-full ${i < done ? "bg-[hsl(var(--referral-sky-deep))]" : "bg-[hsl(var(--referral-ink)/0.12)]"}`} />)}
      </div>
      <p className="mt-2 text-[11px] text-[hsl(var(--referral-ink)/0.45)]">{done} of {target} friends joined</p>
    </section>
  );
}
