/** @doc Referrals overview — invite 5 friends, get Pro free. No points system. */
import MilestoneCard from "./MilestoneCard";
import { useReferrals } from "../ReferralsPage";
import heroAsset from "@/assets/megsy-referral-hero.jpg.asset.json";

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-foreground/[0.08] bg-foreground/[0.02] px-4 py-3">
    <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/50">
      {label}
    </p>
    <p className="mt-1 text-[20px] font-semibold tracking-tight text-foreground">{value}</p>
  </div>
);

export default function DashboardTab() {
  const { signups } = useReferrals();
  const remaining = Math.max(0, 5 - signups);

  return (
    <div className="flex h-full flex-col justify-center gap-4" data-stagger>
      {/* Hero */}
      <section>
        <div className="overflow-hidden rounded-[28px] border border-foreground/[0.08]">
          <img
            src={heroAsset.url}
            alt="Megsy — invite friends and unlock Pro"
            width={1536}
            height={864}
            className="h-auto w-full object-cover"
          />
        </div>

        <h1 className="mt-4 text-[26px] font-semibold leading-[1.12] tracking-tight text-foreground sm:text-[30px]">
          Invite 5 friends, get Pro free.
        </h1>
        <p className="mt-1.5 max-w-[380px] text-[13px] leading-relaxed text-foreground/60">
          No points, no grinding. Five friends join with your link and Megsy Pro is on us for a
          limited period.
        </p>
      </section>

      {/* 5 friends -> a free month of Pro */}
      <MilestoneCard />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Stat label="Friends joined" value={String(signups)} />
        <Stat label="Left for Pro" value={String(remaining)} />
      </div>
    </div>
  );
}
