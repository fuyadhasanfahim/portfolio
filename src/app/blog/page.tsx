import type { Metadata } from "next";
import PageIntro from "@/components/PageIntro";
import BlogRow from "@/components/BlogRow";
import ContactCTA from "@/components/ContactCTA";
import { posts } from "@/lib/data";

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
        description="Field notes from shipping real systems — AI handoff, infrastructure, and the decisions in between."
      />

      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {posts.map((post, i) => (
            <BlogRow key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
