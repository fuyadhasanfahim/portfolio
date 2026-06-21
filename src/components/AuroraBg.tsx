import Starfield from "./Starfield";
import GlowOrb from "./GlowOrb";

type Props = {
  /** show the twinkling starfield layer */
  stars?: boolean;
  /** show floating glow orbs */
  orbs?: boolean;
  /** soften the bottom edge into solid bg for a clean section seam */
  fadeBottom?: boolean;
  className?: string;
};

/**
 * Layered atmospheric background: an aurora mesh (radial gradients in deep
 * violet / lime / teal over the near-black bg), an optional twinkling
 * starfield, and optional floating glow orbs. Sits behind content; drop it
 * into a `relative` section.
 */
export default function AuroraBg({
  stars = true,
  orbs = true,
  fadeBottom = true,
  className = "",
}: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
    >
      {/* solid base so the layer never reads transparent */}
      <div className="absolute inset-0 bg-bg" />

      {/* aurora mesh — a single deep-violet mood, desaturated and subtle.
          The near-black base still dominates ~70% of the viewport. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 22% 6%, rgba(54,46,104,0.34), transparent 58%)," +
            "radial-gradient(60% 55% at 82% 88%, rgba(40,36,84,0.26), transparent 60%)," +
            "radial-gradient(120% 110% at 50% 28%, rgba(22,18,44,0.42), transparent 72%)",
        }}
      />

      {stars && <Starfield count={70} />}

      {orbs && (
        <>
          <GlowOrb
            color="violet"
            size={560}
            opacity={0.24}
            blur={120}
            className="-left-32 -top-16"
            duration={16}
          />
          <GlowOrb
            color="indigo"
            size={500}
            opacity={0.2}
            blur={120}
            className="right-[2%] bottom-[4%]"
            duration={18}
            delay={1.2}
          />
        </>
      )}

      {/* gentle bottom fade only — keeps section seams clean without flattening */}
      {fadeBottom && (
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            background: "linear-gradient(to bottom, transparent, var(--bg))",
          }}
        />
      )}
    </div>
  );
}
