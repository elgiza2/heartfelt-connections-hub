/** @doc Referrals overview — invite 5 friends, get Pro free. No points system. */
import { Link2, Users, Crown } from "lucide-react";
import MilestoneCard from "./MilestoneCard";
import { useReferrals } from "../ReferralsPage";
import heroImage from "@/assets/megsy-referral-hero.jpg";

const steps = [
  {
    icon: Link2,
    title: "Share your link",
    body: "Send your invite link to friends — WhatsApp, socials, anywhere.",
  },
  {
    icon: Users,
    title: "5 friends join",
    body: "Each friend who signs up with your link counts toward the goal.",
  },
  {
    icon: Crown,
    title: "Pro unlocks",
    body: "The moment you hit five, Megsy Pro activates automatically.",
  },
];

export default function DashboardTab() {
  const { signups } = useReferrals();
  const remaining = Math.max(0, 5 - signups);

  return (
    <div className="flex h-full flex-col" data-stagger>
      {/* Full-bleed hero — the artwork *is* the page, not a picture on it. */}
      <section className="relative -mx-5 -mt-4 md:-mt-6">
        <div className="relative h-[52vh] min-h-[340px] max-h-[480px] w-full overflow-hidden">
          <img
            src={heroImage}
            alt=""
            aria-hidden
            width={1280}
            height={960}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%), linear-gradient(to bottom, black 0%, black 74%, transparent 99%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%), linear-gradient(to bottom, black 0%, black 74%, transparent 99%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
          {/* Scrim: keeps the headline readable while the art stays visible. */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

          <div className="absolute inset-x-0 bottom-0 px-5 pb-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/30 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
              <Crown className="h-3 w-3 text-[#F6E7B7]" />
              Megsy Referrals
            </span>
            <h1
              style={{ color: "#ffffff" }}
              className="mt-3 text-[34px] font-bold leading-[1.04] tracking-[-0.03em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)] sm:text-[44px]"
            >
              Invite 5 friends.
              <br />
              <span className="bg-gradient-to-r from-[#F6E7B7] via-[#C9A24C] to-[#F6E7B7] bg-clip-text text-transparent">
                Pro is on us.
              </span>
            </h1>
          </div>
        </div>
      </section>

      <p className="mt-4 max-w-[440px] text-[13.5px] leading-relaxed text-foreground/60">
        No points, no grinding. Five friends join with your link and Megsy Pro
        unlocks automatically for a limited period.
      </p>

      <div className="mt-5 space-y-3">
        <MilestoneCard />

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] px-4 py-3.5">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/50">
              Friends joined
            </p>
            <p className="mt-1 text-[24px] font-bold tracking-tight text-foreground">
              {signups}
              <span className="text-[14px] font-medium text-foreground/40"> / 5</span>
            </p>
          </div>
          <div className="rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] px-4 py-3.5">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/50">
              Left for Pro
            </p>
            <p className="mt-1 text-[24px] font-bold tracking-tight text-foreground">
              {remaining}
            </p>
          </div>
        </div>

        {/* How it works */}
        <section className="pt-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
            How it works
          </p>
          <div className="mt-3 space-y-2.5">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="flex items-start gap-3.5 rounded-2xl border border-foreground/[0.07] bg-foreground/[0.02] px-4 py-3.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#C9A24C]/30 bg-[#C9A24C]/10 text-[#C9A24C]">
                  <s.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold tracking-tight text-foreground">
                    <span className="mr-1.5 text-foreground/35">{i + 1}.</span>
                    {s.title}
                  </p>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-foreground/55">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
