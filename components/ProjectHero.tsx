import StatusBadge from "@/components/StatusBadge";
import type { Project } from "@/content/projects";

// Top section of every project detail page.
// Renders the title, tech pill row, and one-line summary.
export default function ProjectHero({ project }: { project: Project }) {
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-[28px] font-bold leading-tight tracking-[-0.02em] text-heading sm:text-[36px]">
          {project.name}
        </h1>
        <StatusBadge status={project.status} />
      </div>

      <div className="mb-[18px] flex flex-wrap gap-2">
        {project.stack.map((t) => (
          <span
            key={t}
            className="rounded-[var(--radius-chip)] border border-border px-2.5 py-1 font-mono text-[11px] tracking-[0.03em] text-body"
          >
            {t}
          </span>
        ))}
      </div>

      <p className="mb-8 text-[17px] leading-[1.6] text-heading">
        {project.tagline}
      </p>
    </div>
  );
}
