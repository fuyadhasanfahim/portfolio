import Starfield from "./Starfield";
import GlowOrb from "./GlowOrb";

/**
 * Global, fixed atmospheric background shared by every page: a subtle
 * deep-violet aurora mesh, a sparse starfield, and two faint drifting orbs.
 * Sits behind all content (body is transparent, the dark base lives on <html>).
 * Kept restrained so it reads as depth, not decoration.
 */
export default function SiteBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* deep-violet aurora mesh */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 18% 0%, rgba(54,46,104,0.30), transparent 60%)," +
            "radial-gradient(55% 50% at 85% 8%, rgba(40,36,84,0.22), transparent 60%)," +
            "radial-gradient(120% 100% at 50% 110%, rgba(22,18,44,0.40), transparent 72%)",
        }}
      />

      <Starfield count={50} />

      <GlowOrb
        color="violet"
        size={560}
        opacity={0.16}
        blur={130}
        className="-left-40 top-[8%]"
        duration={18}
      />
      <GlowOrb
        color="indigo"
        size={520}
        opacity={0.14}
        blur={130}
        className="-right-32 top-[42%]"
        duration={20}
        delay={1.5}
      />
    </div>
  );
}
