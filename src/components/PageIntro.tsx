import AuroraBg from "./AuroraBg";
import Reveal from "./motion/Reveal";

type Props = {
  kicker: string;
  lead: string;
  accent: string;
  trail?: string;
  description?: string;
};

/** Reusable atmospheric header for inner pages. */
export default function PageIntro({
  kicker,
  lead,
  accent,
  trail,
  description,
}: Props) {
  return (
    <section className="relative overflow-hidden pb-4 pt-36 sm:pt-44">
      <AuroraBg orbs />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <span className="kicker">{kicker}</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="font-display mt-5 max-w-4xl text-[clamp(40px,8vw,96px)] font-bold leading-[0.92] tracking-[-0.03em]">
            {lead}{" "}
            <span className="font-serif-accent font-normal text-acc">
              {accent}
            </span>
            {trail ? ` ${trail}` : ""}
          </h1>
        </Reveal>
        {description && (
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-muted">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
