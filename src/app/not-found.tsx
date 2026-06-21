import AuroraBg from "@/components/AuroraBg";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      <AuroraBg orbs />
      <div className="px-5 text-center">
        <div className="font-display text-[clamp(90px,22vw,260px)] font-bold leading-none tracking-tighter">
          4<span className="text-acc">0</span>4
        </div>
        <p className="mx-auto mt-4 max-w-sm text-base text-muted">
          This page drifted off into the nebula. Let&apos;s get you back to
          solid ground.
        </p>
        <div className="mt-9 flex justify-center">
          <ButtonLink href="/">Back home</ButtonLink>
        </div>
      </div>
    </section>
  );
}
