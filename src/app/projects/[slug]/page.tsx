import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AuroraBg from "@/components/AuroraBg";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/button";
import { featuredProjects as projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <section className="relative overflow-hidden pb-8 pt-36 sm:pt-44">
        <AuroraBg orbs />
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <Link
              href="/projects"
              className="link-underline text-sm text-muted hover:text-ink"
            >
              ← All projects
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-muted">
              <span className="glass rounded-full px-3 py-1">
                {project.category}
              </span>
              <span>{project.year}</span>
              <span>·</span>
              <span>{project.role}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-5 text-[clamp(40px,7vw,84px)] font-bold leading-[0.95] tracking-[-0.03em]">
              {project.title}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {project.summary}
            </p>
          </Reveal>
        </div>
      </section>

      <article className="mx-auto max-w-4xl px-5 pb-8 sm:px-8">
        {/* outcome highlight — balanced, wraps gracefully */}
        <Reveal>
          <div className="glass-strong rounded-3xl p-7 shadow-[0_0_60px_-36px_var(--acc-glow)] sm:p-9">
            <span className="kicker">Outcome</span>
            {project.metric ? (
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-5">
                <span className="font-display text-[clamp(30px,4.5vw,48px)] font-bold leading-[1.05] tracking-tight text-acc">
                  {project.metric.value}
                </span>
                <span className="max-w-md text-sm leading-relaxed text-muted">
                  {project.metric.label}
                </span>
              </div>
            ) : (
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink">
                {project.summary}
              </p>
            )}
          </div>
        </Reveal>

        <Block title="The problem" delay={0.04}>
          <p className="text-base leading-relaxed text-muted">
            {project.problem}
          </p>
        </Block>

        <Block title="The approach" delay={0.04}>
          <p className="text-base leading-relaxed text-muted">
            {project.approach}
          </p>
        </Block>

        <Block title="Architecture" delay={0.04}>
          <p className="text-base leading-relaxed text-muted">
            {project.architecture}
          </p>
        </Block>

        <Block title="Key features" delay={0.04}>
          <ul className="space-y-3">
            {project.features.map((f) => (
              <li key={f} className="flex gap-3 text-base text-muted">
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-acc" />
                {f}
              </li>
            ))}
          </ul>
        </Block>

        <Block title="Tech stack" delay={0.04}>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <span
                key={t}
                className="glass rounded-full px-3.5 py-1.5 text-xs text-muted transition-colors duration-300 hover:border-acc/50 hover:text-acc"
              >
                {t}
              </span>
            ))}
          </div>
        </Block>

        <Block title="The result" delay={0.04}>
          <p className="text-base leading-relaxed text-ink">{project.result}</p>
        </Block>

        {/* live / GitHub links at the end of the study */}
        {(project.liveUrl || project.githubUrl) && (
          <Reveal>
            <div className="flex flex-wrap gap-4 border-t border-line pt-12">
              {project.liveUrl && (
                <ButtonLink href={project.liveUrl}>Live site ↗</ButtonLink>
              )}
              {project.githubUrl && (
                <ButtonLink href={project.githubUrl} variant="ghost">
                  GitHub ↗
                </ButtonLink>
              )}
            </div>
          </Reveal>
        )}
      </article>

      <ContactCTA />
    </>
  );
}

function Block({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <section className="border-t border-line py-12">
        <div className="grid gap-6 sm:grid-cols-[200px_1fr]">
          <h2 className="font-display text-sm uppercase tracking-[0.18em] text-muted/80">
            {title}
          </h2>
          <div>{children}</div>
        </div>
      </section>
    </Reveal>
  );
}
