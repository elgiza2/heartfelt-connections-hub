/** @doc Referral overview — heading, artwork, and progress. Actions live in the pinned bottom bar. */
import MilestoneCard from "./MilestoneCard";
import { useReferrals } from "../ReferralsPage";
import heroImage from "@/assets/megsy-referral-hero.jpg";

const steps = [
  { title: "Share your link", copy: "Send your personal Megsy invite to friends." },
  { title: "Five friends join", copy: "They create an account through your invitation." },
  { title: "Pro is yours", copy: "Your limited-time Pro access starts automatically." },
];

export default function DashboardTab() {
  const { signups } = useReferrals();
  const remaining = Math.max(0, 5 - signups);

  return (
    <div className="flex h-full flex-col" data-stagger>
      <header className="pt-1 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          Megsy Pro invitation
        </p>
        <h1 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[42px]">
          Invite 5 friends, get Pro free
        </h1>
        <p className="mx-auto mt-3 max-w-[460px] text-[14.5px] leading-relaxed text-muted-foreground">
          Every friend who joins Megsy AI with your link brings you closer to free Pro access for a limited time.
        </p>
      </header>

      <div className="mt-6 overflow-hidden rounded-[24px] border border-border">
        <img
          src={heroImage}
          alt="Megsy Pro invitation artwork"
          width={1280}
          height={960}
          className="block w-full"
        />
      </div>

      <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-[20px] border border-border">
        <div className="border-e border-border px-5 py-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Friends joined</p>
          <p className="mt-2 text-[30px] font-semibold leading-none text-foreground">
            {signups}
            <span className="ms-1 text-[15px] font-medium text-muted-foreground">/ 5</span>
          </p>
        </div>
        <div className="px-5 py-4">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Left for Pro</p>
          <p className="mt-2 text-[30px] font-semibold leading-none text-foreground">{remaining}</p>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <MilestoneCard />

        <section>
          <h2 className="text-[15px] font-semibold text-foreground">How it works</h2>
          <ol className="mt-3 divide-y divide-border rounded-[20px] border border-border">
            {steps.map((step, i) => (
              <li key={step.title} className="flex items-start gap-3 px-5 py-4">
                <span className="mt-[1px] text-[13px] font-semibold tabular-nums text-muted-foreground">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-[14.5px] font-medium text-foreground">{step.title}</span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-muted-foreground">
                    {step.copy}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <p className="pb-2 text-[12.5px] leading-relaxed text-muted-foreground">
          No card required. No auto renewal. Your Pro access begins the moment the fifth friend joins.
        </p>
      </div>
    </div>
  );
}
