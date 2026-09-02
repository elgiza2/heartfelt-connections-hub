/** @doc Referrals overview — invite 5 friends, get Pro free. No points system. */
import MilestoneCard from "./MilestoneCard";
import { useReferrals } from "../ReferralsPage";
import heroImage from "@/assets/megsy-referral-hero.jpg";

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-foreground/[0.08] bg-foreground/[0.03] px-4 py-3 backdrop-blur-sm">
    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/50">
      {label}
    </p>
    <p className="mt-1 text-[22px] font-semibold tracking-tight text-foreground">{value}</p>
  </div>
);

export default function DashboardTab() {
  const { signups } = useReferrals();
  const remaining = Math.max(0, 5 - signups);

  return (
    <div className="flex h-full flex-col" data-stagger>
      {/* Full-bleed hero — the artwork *is* the page, not a picture on it. */}
      <section className="relative -mx-5 -mt-4 md:-mt-6">
        <div className="relative h-[46vh] min-h-[300px] max-h-[440px] w-full overflow-hidden">
          <img
            src={heroImage}
            alt=""
            aria-hidden
            width={1280}
            height={960}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              maskImage:
                "linear-gradient(to bottom, black 0%, black 52%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, black 52%, transparent 100%)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background" />

          <div className="absolute inset-x-0 bottom-0 px-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/12 bg-background/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/70 backdrop-blur-md">
              Megsy Referrals
            </span>
            <h1 className="mt-3 text-[32px] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[40px]">
              Invite 5 friends.
              <br />
              <span className="text-foreground/45">Pro is on us.</span>
            </h1>
          </div>
        </div>
      </section>

      <p className="mt-3 max-w-[420px] text-[13.5px] leading-relaxed text-foreground/60">
        No points, no grinding. Five friends join with your link and Megsy Pro unlocks
        automatically for a limited period.
      </p>

      <div className="mt-5 space-y-3">
        <MilestoneCard />

        <div className="grid grid-cols-2 gap-3">
          <Stat label="Friends joined" value={String(signups)} />
          <Stat label="Left for Pro" value={String(remaining)} />
        </div>
      </div>
    </div>
  );
}
