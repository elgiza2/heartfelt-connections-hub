/**
 * @doc "5 friends = one free month of Pro" milestone.
 *
 * The grant itself is decided in Postgres (trigger on `referrals` ->
 * `grant_referral_milestone`), so this card only ever *reports* server truth:
 * it reads `my_referral_milestone()` and never awards anything itself.
 */
import { useEffect, useState } from "react";
import { Gift, Sparkles } from "lucide-react";
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
      if (error || !data?.ok) {
        setFailed(true);
        return;
      }
      setState(data as Milestone);
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Never render a silent blank: say what happened.
  if (failed) {
    return (
      <section className="rounded-[24px] border border-foreground/[0.08] bg-foreground/[0.02] p-5">
        <p className="text-[13px] text-foreground/60">
          Couldn't load your free-Pro progress right now. Refresh the page to try again.
        </p>
      </section>
    );
  }
  if (!state) {
    return (
      <section className="h-[132px] animate-pulse rounded-[24px] border border-foreground/[0.08] bg-foreground/[0.02]" />
    );
  }

  const target = state.target || MILESTONE_TARGET;
  const done = Math.min(state.referrals, target);
  const pct = Math.round((done / target) * 100);
  const expires = state.expires_at ? new Date(state.expires_at) : null;

  return (
    <section className="relative overflow-hidden rounded-[26px] border border-[#C9A24C]/30 bg-gradient-to-br from-[#C9A24C]/[0.14] via-[#C9A24C]/[0.05] to-transparent p-5 shadow-[0_24px_60px_-34px_rgba(201,162,76,0.55)]">
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#C9A24C]/20 blur-3xl"
      />
      <div className="relative flex items-start gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#C9A24C]/15 text-[#C9A24C] ring-1 ring-[#C9A24C]/35">
          {state.granted ? <Sparkles className="h-5 w-5" /> : <Gift className="h-5 w-5" />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold tracking-tight text-foreground">
            {state.granted ? "Pro unlocked — on us" : `Invite ${target} friends, get Pro free`}
          </p>
          <p className="mt-1 text-[13px] leading-relaxed text-foreground/60">
            {state.granted
              ? expires
                ? `Your free Pro month is active until ${expires.toLocaleDateString()}.`
                : "Your free Pro period is active."
              : state.remaining === 0
                ? "You reached the goal — your free Pro month is being applied."
                : `${state.remaining} more ${state.remaining === 1 ? "friend" : "friends"} and Pro is free for a limited period.`}
          </p>
        </div>
      </div>

      <div className="relative mt-4 flex items-center gap-1.5" aria-hidden>
        {Array.from({ length: target }).map((_, i) => (
          <span
            key={i}
            className={`h-2 flex-1 rounded-full transition-colors ${
              i < done
                ? "bg-gradient-to-r from-[#F6E7B7] to-[#C9A24C] shadow-[0_0_14px_-2px_rgba(201,162,76,0.9)]"
                : "bg-foreground/[0.10]"
            }`}
          />
        ))}
      </div>
      <p className="relative mt-2 text-[12px] text-foreground/50">
        {done} / {target} friends joined ({pct}%)
      </p>
    </section>
  );
}
