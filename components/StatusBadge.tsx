import type { Project } from "@/content/projects";

// Labels for statuses worth calling out. "live" is deliberately absent — a
// shipped project already announces itself with a "View live app" link, so a
// badge there would be noise.
const LABELS: Partial<Record<Project["status"], string>> = {
  "in-development": "Coming soon",
};

export default function StatusBadge({ status }: { status: Project["status"] }) {
  const label = LABELS[status];
  if (!label) return null;

  return (
    <span className="shrink-0 rounded-[var(--radius-chip)] border border-accent/40 bg-accent/10 px-2.5 py-1 font-mono text-[11px] tracking-[0.03em] text-accent">
      {label}
    </span>
  );
}
