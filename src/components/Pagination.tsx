import Link from "next/link";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

/** Page 1 lives at /blog; later pages at /blog/page/N. Keeps URLs shareable. */
export function blogPageHref(page: number): string {
  return page <= 1 ? "/blog" : `/blog/page/${page}`;
}

const arrowBase =
  "flex h-10 w-10 items-center justify-center rounded-lg border text-sm transition-colors";
const numberBase =
  "flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 font-display text-sm tabular-nums transition-colors";

export default function Pagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const prevDisabled = page <= 1;
  const nextDisabled = page >= totalPages;

  return (
    <nav
      aria-label="Blog pagination"
      className="mt-16 flex items-center justify-center gap-2"
    >
      {prevDisabled ? (
        <span
          aria-disabled
          className={`${arrowBase} border-line text-muted/40`}
        >
          <IconArrowLeft size={18} aria-hidden />
        </span>
      ) : (
        <Link
          href={blogPageHref(page - 1)}
          rel="prev"
          aria-label="Previous page"
          className={`${arrowBase} glass border-glass-brd text-muted hover:border-acc/40 hover:text-acc`}
        >
          <IconArrowLeft size={18} aria-hidden />
        </Link>
      )}

      {pages.map((p) => {
        const active = p === page;
        return (
          <Link
            key={p}
            href={blogPageHref(p)}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? `${numberBase} border-acc bg-acc font-semibold text-bg`
                : `${numberBase} glass border-glass-brd text-muted hover:border-acc/40 hover:text-acc`
            }
          >
            {String(p).padStart(2, "0")}
          </Link>
        );
      })}

      {nextDisabled ? (
        <span
          aria-disabled
          className={`${arrowBase} border-line text-muted/40`}
        >
          <IconArrowRight size={18} aria-hidden />
        </span>
      ) : (
        <Link
          href={blogPageHref(page + 1)}
          rel="next"
          aria-label="Next page"
          className={`${arrowBase} glass border-glass-brd text-muted hover:border-acc/40 hover:text-acc`}
        >
          <IconArrowRight size={18} aria-hidden />
        </Link>
      )}
    </nav>
  );
}
