import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AuroraBg from "@/components/AuroraBg";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/motion/Reveal";
import Markdown from "@/components/Markdown";
import { formatPostDate, posts } from "@/lib/data";

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
              <span className="text-acc">{post.category}</span>
              <span>·</span>
              <span>{formatPostDate(post.publishedAt)}</span>
              <span>·</span>
              <span>{post.readMinutes} min read</span>
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
        <Reveal>
          <div className="mt-10">
            <Markdown content={post.content} />
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="glass rounded-full border-glass-brd px-3 py-1 text-xs text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

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
