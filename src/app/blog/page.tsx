import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import BlogListing from "@/components/BlogListing";
import ContactCTA from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on building AI systems, infrastructure, and platforms.",
};

export default function BlogPage() {
  return (
    <>
      <PageIntro
        kicker="The blog"
        lead="Notes on"
        accent="building."
        description="Field notes from shipping real systems: AI handoff, infrastructure, and the decisions in between."
      />

      <BlogListing page={1} />

      <ContactCTA />
    </>
  );
}
