/** @doc Referral overview — localized invitation copy and the approved artwork. */
import { useUserLang, translateExactText } from "@/lib/authI18n";
import { useReferrals } from "../ReferralsPage";
import heroImage from "@/assets/megsy-referral-hero.jpg";

const copy = (text: string, lang: ReturnType<typeof useUserLang>) => translateExactText(text, lang);

export default function DashboardTab() {
  const lang = useUserLang();
  const { signups } = useReferrals();
  const headline = copy("Invite 5 friends, get Pro free", lang);
  const description = copy(
    "Every friend who joins Megsy AI with your link brings you closer to free Pro access for a limited time.",
    lang,
  );

  return (
    <div className="flex h-full flex-col" data-stagger>
      <header className="pt-1 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
          {copy("Megsy Pro invitation", lang)}
        </p>
        <h1 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-[42px]">
          {headline}
        </h1>
        <p className="mx-auto mt-3 max-w-[460px] text-[14.5px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </header>

      <div className="mt-6 overflow-hidden rounded-[24px] border border-border">
        <img
          src={heroImage}
          alt={copy("Megsy Pro invitation artwork", lang)}
          width={1280}
          height={960}
          className="block w-full"
        />
      </div>

      <p className="mt-5 text-center text-[13px] text-muted-foreground">
        {signups} / 5 {copy("friends joined", lang)}
      </p>
    </div>
  );
}
