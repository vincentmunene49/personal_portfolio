import Link from "next/link";
import ShimmerImage from "@/components/ShimmerImage";
import StatusBadge from "@/components/StatusBadge";
import type { Project } from "@/content/projects";

// ── Shared placeholder shown when cardImage is not yet set ────────────────────
function ImagePlaceholder() {
  return (
    <div className="flex h-full items-center justify-center [background-color:#141414] [background-image:repeating-linear-gradient(135deg,#181818_0_12px,#141414_12px_24px)]">
      <span className="font-mono text-[12px] tracking-[0.04em] text-[#5a5a5a]">
        project screenshot
      </span>
    </div>
  );
}

// ── Product card: screenshot on top, metadata below ───────────────────────────
function ProductCard({ project, eager }: { project: Project; eager: boolean }) {
  return (
    <>
      {/* Visual area */}
      <div className="relative aspect-video w-full border-b border-border">
        {project.cardImage ? (
          <ShimmerImage
            src={project.cardImage}
            alt={`${project.name} screenshot`}
            fill
            // Cards are single-column inside the 720px content column.
            sizes="(min-width: 760px) 720px, 100vw"
            // The top cards are the likely LCP element, and lazy-loading the LCP
            // image delays it. Not `preload` — which image wins LCP depends on
            // viewport height, and the docs warn off preload in exactly that case.
            loading={eager ? "eager" : "lazy"}
            className="object-cover"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="font-display text-[18px] font-semibold tracking-[-0.01em] text-heading">
            {project.name}
          </h3>
          <StatusBadge status={project.status} />
        </div>
        <PillRow stack={project.stack} />
        <p className="mt-3 text-[15px] leading-relaxed text-body">
          {project.tagline}
        </p>
        <LearnMore />
      </div>
    </>
  );
}

// ── System card: typographic layout on top, tagline below ─────────────────────
function SystemCard({ project }: { project: Project }) {
  return (
    <>
      {/* Typographic visual area — same aspect ratio as the product screenshot */}
      <div className="flex aspect-video w-full flex-col justify-between border-b border-border bg-bg p-5 sm:p-8">
        <p className="font-mono text-[11px] tracking-[0.06em] text-muted uppercase">
          {project.status}
        </p>
        <div>
          <h3 className="mb-4 font-display text-[22px] font-bold leading-none tracking-[-0.02em] text-heading sm:text-[32px]">
            {project.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                className="rounded-[var(--radius-chip)] border border-border px-2.5 py-1 font-mono text-[11px] tracking-[0.03em] text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="text-[15px] leading-relaxed text-body">{project.tagline}</p>
        <LearnMore />
      </div>
    </>
  );
}

// ── Shared sub-components ─────────────────────────────────────────────────────
function PillRow({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {stack.map((t) => (
        <span
          key={t}
          className="rounded-[var(--radius-chip)] border border-border px-2.5 py-1 font-mono text-[11px] tracking-[0.03em] text-body"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function LearnMore() {
  return (
    <div className="mt-4 flex justify-end">
      <span className="inline-flex items-center gap-1.5 font-mono text-[13px] tracking-[0.03em] text-accent">
        Learn more
        {/* arrow is animated by the parent group-hover */}
        <span className="arrow transition-transform duration-200 ease-out group-hover:translate-x-0.5">
          →
        </span>
      </span>
    </div>
  );
}

// ── Exported card ─────────────────────────────────────────────────────────────
export default function ProjectCard({
  project,
  eager = false,
}: {
  project: Project;
  // Set on the cards near the top of the list so their image isn't lazy-loaded.
  eager?: boolean;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface transition-[transform,border-color] duration-200 ease-out hover:scale-[1.02] hover:border-border-bright motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      {project.kind === "product" ? (
        <ProductCard project={project} eager={eager} />
      ) : (
        <SystemCard project={project} />
      )}
    </Link>
  );
}
