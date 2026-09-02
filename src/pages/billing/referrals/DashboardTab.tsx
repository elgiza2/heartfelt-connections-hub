/** @doc Referrals overview — sky-poster invite: invite 5 friends, get Pro free. */
import { Check } from "lucide-react";
import MilestoneCard from "./MilestoneCard";
import { useReferrals } from "../ReferralsPage";
import heroImage from "@/assets/megsy-referral-hero.jpg";

const steps = [
  { t: "Share your link", d: "Send your personal invite link to friends." },
  { t: "5 friends join", d: "They sign up with Megsy AI using your link." },
  { t: "Pro unlocks free", d: "Your Pro plan activates automatically." },
];

export default function DashboardTab() {
  const { signups } = useReferrals();
  const remaining = Math.max(0, 5 - signups);

  return (
    <div className="flex h-full flex-col" data-stagger>
      {/* Sky poster — artwork and headline live in one continuous surface. */}
      <section className="relative overflow-hidden rounded-[30px] shadow-[0_40px_90px_-50px_rgba(14,110,190,0.65)] ring-1 ring-[#7cc4f5]/40">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #4FB3F0 0%, #63C0F5 38%, #9BD7F8 68%, #E9F6FE 100%)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 top-6 h-40 w-40 rounded-full bg-white/35 blur-[60px]"
        />

        <div className="relative px-6 pt-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
            Limited time
          </span>

          <h1
            style={{ color: "#ffffff" }}
            className="mt-4 text-[34px] font-light leading-[1.05] tracking-[-0.03em] drop-shadow-[0_2px_18px_rgba(10,80,140,0.35)] sm:text-[42px]"
          >
            Invite 5 friends
            <br />
            <span className="font-semibold">Pro is on us</span>
          </h1>
          <p className="mt-3 max-w-[330px] text-[14px] leading-relaxed text-white/85">
            Every friend who joins Megsy AI with your link brings you closer to a
            free Pro plan.
          </p>
        </div>

        <img
          src={heroImage}
          alt=""
          aria-hidden
          width={1280}
          height={960}
          className="relative -mt-2 block w-full select-none"
          style={{
            maskImage:
              "linear-gradient(180deg, transparent 0%, black 16%, black 78%, transparent 99%)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent 0%, black 16%, black 78%, transparent 99%)",
          }}
        />

        <div className="relative -mt-10 px-5 pb-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-center backdrop-blur-md">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0d4f7a]/60">
                Friends joined
              </p>
              <p className="mt-1 text-[26px] font-semibold leading-none tracking-tight text-[#0B3C5D]">
                {signups}
                <span className="text-[13px] font-medium text-[#0B3C5D]/40"> / 5</span>
              </p>
            </div>
            <div className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 text-center backdrop-blur-md">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#0d4f7a]/60">
                Left for Pro
              </p>
              <p className="mt-1 text-[26px] font-semibold leading-none tracking-tight text-[#0B3C5D]">
                {remaining}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4 space-y-3">
        <MilestoneCard />

        {/* How it works — numbered, editorial rhythm. */}
        <section className="rounded-[24px] border border-foreground/[0.07] bg-foreground/[0.02] px-5 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
            How it works
          </p>
          <ol className="mt-3 space-y-3.5">
            {steps.map((s, i) => (
              <li key={s.t} className="flex items-start gap-3">
                <span className="mt-[1px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#3FA9F5] text-[11px] font-semibold text-white">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-[14px] font-medium leading-snug text-foreground">
                    {s.t}
                  </span>
                  <span className="mt-0.5 block text-[12.5px] leading-relaxed text-foreground/55">
                    {s.d}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <ul className="space-y-2 rounded-[22px] border border-foreground/[0.07] bg-foreground/[0.02] px-4 py-3.5">
          {[
            "No credit card required, no auto renewal",
            "Your friends get a welcome bonus too",
            "Pro activates the moment the 5th friend joins",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2.5">
              <Check className="mt-[2px] h-3.5 w-3.5 shrink-0 text-[#3FA9F5]" />
              <span className="text-[12.5px] leading-relaxed text-foreground/60">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
