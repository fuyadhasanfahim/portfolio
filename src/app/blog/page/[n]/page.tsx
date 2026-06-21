import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageIntro from "@/components/PageIntro";
import BlogListing, { totalBlogPages } from "@/components/BlogListing";
import ContactCTA from "@/components/ContactCTA";

// Pre-render pages 2..N at build time; page 1 lives at /blog.
export function generateStaticParams() {
  const total = totalBlogPages();
  return Array.from({ length: Math.max(0, total - 1) }, (_, i) => ({
    n: String(i + 2),
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/page/[n]">): Promise<Metadata> {
  const { n } = await params;
  return {
    title: `Blog — Page ${n}`,
    description: "Notes on building AI systems, infrastructure, and platforms.",
  };
}

export default async function BlogPaginatedPage({
  params,
}: PageProps<"/blog/page/[n]">) {
  const { n } = await params;
  const page = Number(n);

  // Page 1 is canonical at /blog; anything below 2 here is not a real page.
  if (!Number.isInteger(page) || page < 2 || page > totalBlogPages()) {
    notFound();
  }

  return (
    <>
      <PageIntro
        kicker="The blog"
        lead="Notes on"
        accent="building."
        description="Field notes from shipping real systems: AI handoff, infrastructure, and the decisions in between."
      />

      <BlogListing page={page} />

      <ContactCTA />
    </>
  );
}
