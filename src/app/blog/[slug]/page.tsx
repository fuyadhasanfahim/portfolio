import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AuroraBg from "@/components/AuroraBg";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/motion/Reveal";
import { posts } from "@/lib/data";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <section className="relative overflow-hidden pb-8 pt-36 sm:pt-44">
        <AuroraBg orbs />
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <Link
              href="/blog"
              className="link-underline text-sm text-muted hover:text-ink"
            >
              ← The blog
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-8 flex items-center gap-4 text-xs uppercase tracking-[0.16em] text-muted">
              <span className="text-acc">{post.tag}</span>
              <span>·</span>
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="font-display mt-5 text-[clamp(34px,6vw,68px)] font-bold leading-[0.98] tracking-[-0.03em]">
              {post.title}
            </h1>
          </Reveal>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-5 pb-8 sm:px-8">
        <Reveal>
          <p className="border-l-2 border-acc pl-5 text-lg italic leading-relaxed text-ink/90">
            {post.excerpt}
          </p>
        </Reveal>
        <div className="mt-10 space-y-6">
          {post.body.map((para, i) => (
            <Reveal key={i} delay={0.02}>
              <p className="text-base leading-[1.8] text-muted">{para}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 border-t border-line pt-8">
          <Link
            href="/blog"
            className="link-underline text-sm text-acc"
          >
            ← Back to the blog
          </Link>
        </div>
      </article>

      <ContactCTA />
    </>
  );
}
