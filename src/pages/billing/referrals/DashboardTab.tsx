/** @doc Referral overview — a clean editorial invite page built around the sky artwork. */
import MilestoneCard from "./MilestoneCard";
import { useReferrals } from "../ReferralsPage";
import heroImage from "@/assets/megsy-referral-hero.jpg";

const steps = [
  { number: "01", title: "Share your link", copy: "Send your personal Megsy invite to friends." },
  { number: "02", title: "Five friends join", copy: "They create an account through your invitation." },
  { number: "03", title: "Pro is yours", copy: "Your limited-time Pro access starts automatically." },
];

export default function DashboardTab() {
  const { signups } = useReferrals();
  const remaining = Math.max(0, 5 - signups);

  return (
    <div className="flex h-full flex-col" data-stagger>
      <header className="grid gap-5 border-b border-[hsl(var(--referral-ink)/0.14)] pb-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[hsl(var(--referral-ink)/0.52)]">Megsy Pro invitation</p>
          <h1 className="mt-3 max-w-[620px] font-serif text-[clamp(42px,7vw,76px)] font-normal leading-[0.9] tracking-[-0.045em] text-[hsl(var(--referral-ink))]">
            Invite friends.<br />
            <em className="font-normal text-[hsl(var(--referral-ink)/0.58)]">Keep creating.</em>
          </h1>
        </div>
        <p className="max-w-[230px] text-[14px] leading-relaxed text-[hsl(var(--referral-ink)/0.62)] md:pb-1">
          Bring five people to Megsy AI and enjoy Pro on us for a limited time.
        </p>
      </header>

      <section className="relative mt-5 overflow-hidden rounded-[26px] bg-[hsl(var(--referral-sky-deep))] shadow-[0_28px_70px_-42px_hsl(var(--referral-ink)/0.7)] ring-1 ring-[hsl(var(--referral-ink)/0.12)]">
        <img src={heroImage} alt="Megsy Pro invitation artwork" width={1280} height={960} className="block aspect-[4/3] w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-[hsl(var(--referral-ink)/0.72)] to-transparent px-5 pb-5 pt-20 text-[hsl(var(--background))] sm:px-7 sm:pb-7">
          <p className="max-w-[360px] text-[18px] font-medium leading-tight sm:text-[22px]">A little extra room for the work that matters.</p>
          <span className="shrink-0 text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--background)/0.75)]">01 / 03</span>
        </div>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-[hsl(var(--referral-ink)/0.14)] bg-[hsl(var(--referral-ink)/0.14)]">
        <div className="bg-[hsl(var(--referral-sky)/0.9)] px-5 py-4 sm:px-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--referral-ink)/0.52)]">Friends joined</p>
          <p className="mt-2 font-serif text-[40px] leading-none text-[hsl(var(--referral-ink))]">{signups}<span className="ml-1 text-[18px] text-[hsl(var(--referral-ink)/0.42)]">/ 5</span></p>
        </div>
        <div className="bg-[hsl(var(--referral-lilac)/0.34)] px-5 py-4 sm:px-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[hsl(var(--referral-ink)/0.52)]">Until Pro</p>
          <p className="mt-2 font-serif text-[40px] leading-none text-[hsl(var(--referral-ink))]">{remaining}</p>
        </div>
      </section>

      <div className="mt-5 space-y-4">
        <MilestoneCard />
        <section className="border-t border-[hsl(var(--referral-ink)/0.14)] pt-5">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-serif text-[30px] leading-none text-[hsl(var(--referral-ink))]">How it works</h2>
            <span className="text-[11px] uppercase tracking-[0.2em] text-[hsl(var(--referral-ink)/0.45)]">Simple by design</span>
          </div>
          <ol className="mt-5 grid gap-0 border-y border-[hsl(var(--referral-ink)/0.14)] sm:grid-cols-3">
            {steps.map((step) => (
              <li key={step.number} className="border-b border-[hsl(var(--referral-ink)/0.14)] py-4 last:border-0 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0">
                <span className="text-[11px] font-semibold tracking-[0.18em] text-[hsl(var(--referral-sky-deep))]">{step.number}</span>
                <p className="mt-4 text-[15px] font-semibold text-[hsl(var(--referral-ink))]">{step.title}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-[hsl(var(--referral-ink)/0.58)]">{step.copy}</p>
              </li>
            ))}
          </ol>
        </section>
        <p className="max-w-[620px] pb-2 text-[12.5px] leading-relaxed text-[hsl(var(--referral-ink)/0.52)]">
          No card required. No auto-renewal. Friends receive a welcome bonus, and your Pro access begins when the fifth friend joins.
        </p>
      </div>
    </div>
  );
}
