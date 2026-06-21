import Link from "next/link";
import Hero from "@/components/Hero";
import AuroraBg from "@/components/AuroraBg";
import GlowOrb from "@/components/GlowOrb";
import SectionHeading from "@/components/SectionHeading";
import DragRow from "@/components/DragRow";
import SelectedBuilds from "@/components/SelectedBuilds";
import BlogRow from "@/components/BlogRow";
import StatCounter from "@/components/StatCounter";
import ContactCTA from "@/components/ContactCTA";
import Faq from "@/components/Faq";
import Reveal from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/button";
import { posts, stats } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Atmospheric statement beat */}
      <section className="relative overflow-hidden py-[clamp(56px,7vw,96px)]">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <GlowOrb
            color="violet"
            size={520}
            opacity={0.2}
            blur={130}
            className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            duration={16}
          />
        </div>
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <Reveal>
            <p className="font-display text-[clamp(28px,4.5vw,52px)] font-medium leading-[1.1] tracking-tight">
              Your systems,{" "}
              <span className="font-serif-accent font-normal text-acc">
                built to think.
              </span>{" "}
              Live AI, durable infrastructure, and platforms that don&apos;t
              buckle under scale.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-10">
              <ButtonLink href="/about">How I work</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured work */}
      <section className="surface relative border-t border-line section-pad">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              kicker="Selected work"
              lead="Projects that"
              accent="moved the needle."
            />
            <Reveal>
              <ButtonLink href="/projects" variant="ghost" className="shrink-0">
                All projects
              </ButtonLink>
            </Reveal>
          </div>
          <DragRow />
        </div>
      </section>

      {/* Selected builds — Tier 2 live projects */}
      <section className="relative section-pad">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              kicker="Selected builds"
              lead="Live projects,"
              accent="shipped."
            />
            <Reveal>
              <ButtonLink href="/projects" variant="ghost" className="shrink-0">
                See all
              </ButtonLink>
            </Reveal>
          </div>
          <SelectedBuilds />
        </div>
      </section>

      {/* Results / stats strip */}
      <section className="relative overflow-hidden border-y border-line bg-bg-2/50">
        <div className="mx-auto max-w-6xl px-5 py-[clamp(44px,5vw,72px)] sm:px-8">
          <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
            {stats.map((s) => (
              <StatCounter
                key={s.label}
                value={s.value}
                suffix={s.suffix}
                label={s.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* From the blog */}
      <section className="relative section-pad">
        <AuroraBg orbs={false} stars />
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              kicker="From the blog"
              lead="Notes on"
              accent="building."
            />
            <Reveal>
              <ButtonLink href="/blog" variant="ghost" className="shrink-0">
                Read the blog
              </ButtonLink>
            </Reveal>
          </div>
          <div>
            {posts.map((post, i) => (
              <BlogRow key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative section-pad">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            kicker="FAQ"
            lead="Questions,"
            accent="answered."
            className="mb-12"
          />
          <Faq />
        </div>
      </section>

      {/* Closing CTA */}
      <ContactCTA />
    </>
  );
}
