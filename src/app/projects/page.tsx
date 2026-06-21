import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import ProjectCard from "@/components/ProjectCard";
import SelectedBuilds from "@/components/SelectedBuilds";
import SectionHeading from "@/components/SectionHeading";
import ContactCTA from "@/components/ContactCTA";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { featuredProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Featured systems and live builds: AI support, internal tools, infrastructure, and multi-tenant platforms.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        kicker="Selected work"
        lead="Things I've"
        accent="shipped."
        description="A focused set of production systems and live builds: AI support, sales tooling, durable infrastructure, and multi-tenant platforms."
      />

      {/* Featured case studies */}
      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            kicker="Featured work"
            lead="Deep"
            accent="case studies."
            className="mb-12"
          />
          <RevealGroup className="grid gap-7 sm:grid-cols-2">
            {featuredProjects.map((p) => (
              <RevealItem key={p.slug} className="h-full">
                <ProjectCard project={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Selected live builds */}
      <section className="surface border-t border-line section-pad">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <SectionHeading
            kicker="Selected builds"
            lead="Live projects,"
            accent="shipped."
            className="mb-12"
          />
          <SelectedBuilds />
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
