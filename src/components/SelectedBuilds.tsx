import { selectedBuilds, type SelectedBuild } from "@/lib/data";
import { RevealGroup, RevealItem } from "./motion/Reveal";

/**
 * Responsive grid of Tier 2 "selected builds" — smaller live projects, each a
 * card linking out to its deployed site. Ordered by complexity (desc) in data.
 */
export default function SelectedBuilds() {
  return (
    <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {selectedBuilds.map((build) => (
        <RevealItem key={build.slug} className="h-full">
          <BuildCard build={build} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}

function BuildCard({ build }: { build: SelectedBuild }) {
  return (
    <a
      href={build.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="glass group relative flex h-full flex-col rounded-3xl p-6 transition-all duration-300 hover:border-acc/60 hover:shadow-[0_0_40px_-14px_var(--acc-glow)]"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          {build.category && (
            <span className="text-[11px] uppercase tracking-[0.16em] text-muted/80">
              {build.category}
            </span>
          )}
          <h3 className="font-display mt-1.5 text-lg font-semibold tracking-tight">
            {build.title}
          </h3>
        </div>
        <span className="text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acc">
          ↗
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {build.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {build.techStack.slice(0, 5).map((t) => (
          <span
            key={t}
            className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted"
          >
            {t}
          </span>
        ))}
        {build.techStack.length > 5 && (
          <span className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted">
            +{build.techStack.length - 5}
          </span>
        )}
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm font-medium text-ink">
        Visit live site
        <span className="text-acc transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>
    </a>
  );
}
