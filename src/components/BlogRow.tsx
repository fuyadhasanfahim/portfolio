import Link from "next/link";
import type { Post } from "@/lib/data";

/**
 * Numbered editorial blog row. Lime index, title shifts + turns lime on hover.
 */
export default function BlogRow({
  post,
  index,
}: {
  post: Post;
  index: number;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex items-center gap-6 border-t border-line py-7 transition-colors last:border-b sm:gap-10"
    >
      <span className="font-display w-10 shrink-0 text-sm text-acc/80">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="font-display text-xl font-semibold tracking-tight transition-all duration-300 group-hover:translate-x-2 group-hover:text-acc sm:text-2xl">
          {post.title}
        </h3>
        <p className="mt-1.5 line-clamp-1 text-sm text-muted">
          {post.excerpt}
        </p>
      </div>

      <div className="hidden shrink-0 flex-col items-end gap-1 text-right sm:flex">
        <span className="text-xs uppercase tracking-[0.16em] text-muted">
          {post.tag}
        </span>
        <span className="text-xs text-muted/70">{post.date}</span>
      </div>

      <span className="shrink-0 text-acc opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
        →
      </span>
    </Link>
  );
}
