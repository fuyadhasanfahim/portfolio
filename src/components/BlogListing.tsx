import { notFound } from "next/navigation";
import BlogRow from "./BlogRow";
import Pagination from "./Pagination";
import { posts } from "@/lib/data";

export const POSTS_PER_PAGE = 6;

/** Posts newest-first, the order the list and pagination both rely on. */
export function sortedPosts() {
  return [...posts].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  );
}

export function totalBlogPages() {
  return Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
}

/**
 * Paginated blog rows + controls. `page` is 1-based; an out-of-range page
 * triggers notFound so URLs like /blog/page/99 return a clean 404.
 */
export default function BlogListing({ page }: { page: number }) {
  const totalPages = totalBlogPages();
  if (!Number.isInteger(page) || page < 1 || page > totalPages) notFound();

  const all = sortedPosts();
  const start = (page - 1) * POSTS_PER_PAGE;
  const pageItems = all.slice(start, start + POSTS_PER_PAGE);

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {pageItems.map((post, i) => (
          // Numbering continues across pages: 01..15 globally.
          <BlogRow key={post.slug} post={post} index={start + i} />
        ))}
        <Pagination page={page} totalPages={totalPages} />
      </div>
    </section>
  );
}
