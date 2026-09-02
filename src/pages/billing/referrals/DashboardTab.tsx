/** @doc Referrals overview — invite 5 friends, get Pro free. No points system. */
import { Crown, Check } from "lucide-react";
import MilestoneCard from "./MilestoneCard";
import { useReferrals } from "../ReferralsPage";
import heroImage from "@/assets/megsy-referral-hero.jpg";

const steps = [
  "Share your invite link with friends",
  "5 friends sign up with your link",
  "Megsy Pro unlocks free, automatically",
];

export default function DashboardTab() {
  const { signups } = useReferrals();
  const remaining = Math.max(0, 5 - signups);

  return (
    <div className="flex h-full flex-col" data-stagger>
      {/* Poster card — the invite artwork, framed like a collectible pass. */}
      <section className="relative overflow-hidden rounded-[28px] bg-[#0B0B0F] shadow-[0_40px_90px_-50px_rgba(0,0,0,0.8)] ring-1 ring-white/[0.08]">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[42%] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9A24C]/15 blur-[90px]"
        />

        <div className="relative flex items-center justify-between px-5 pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/75 backdrop-blur-md">
            <Crown className="h-3 w-3 text-[#F6E7B7]" />
            Limited time
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
            Megsy Pro
          </span>
        </div>

        <img
          src={heroImage}
          alt=""
          aria-hidden
          width={1280}
          height={960}
          className="relative mx-auto block w-full max-w-[440px] select-none"
          style={{
            maskImage:
              "radial-gradient(120% 92% at 50% 46%, black 52%, transparent 82%)",
            WebkitMaskImage:
              "radial-gradient(120% 92% at 50% 46%, black 52%, transparent 82%)",
          }}
        />

        <div className="relative -mt-6 px-5 pb-6">
          <h1
            style={{ color: "#ffffff" }}
            className="text-center text-[32px] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[40px]"
          >
            Invite friends
            <br />
            <span className="bg-gradient-to-r from-[#F6E7B7] via-[#C9A24C] to-[#F6E7B7] bg-clip-text text-transparent">
              get Pro free
            </span>
          </h1>

          <ul className="mx-auto mt-5 max-w-[360px] space-y-2.5">
            {steps.map((s, i) => (
              <li key={s} className="flex items-start gap-3">
                <span className="mt-[1px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#C9A24C]/40 bg-[#C9A24C]/10 font-mono text-[10px] text-[#F6E7B7]">
                  {i + 1}
                </span>
                <span className="text-[13.5px] leading-snug text-white/70">{s}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-center">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
                Friends joined
              </p>
              <p className="mt-1 text-[26px] font-bold leading-none tracking-tight text-white">
                {signups}
                <span className="text-[13px] font-medium text-white/35"> / 5</span>
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-center">
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
                Left for Pro
              </p>
              <p className="mt-1 text-[26px] font-bold leading-none tracking-tight text-white">
                {remaining}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-4 space-y-3">
        <MilestoneCard />

        <ul className="space-y-2 rounded-[22px] border border-foreground/[0.07] bg-foreground/[0.02] px-4 py-3.5">
          {[
            "No credit card required, no auto renewal",
            "Your friends get a welcome bonus too",
            "Pro activates the moment the 5th friend joins",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2.5">
              <Check className="mt-[2px] h-3.5 w-3.5 shrink-0 text-[#C9A24C]" />
              <span className="text-[12.5px] leading-relaxed text-foreground/60">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
