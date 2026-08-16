import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import { projects } from "@/content/projects";
import ProjectHero from "@/components/ProjectHero";
import ShimmerImage from "@/components/ShimmerImage";

// ── generateStaticParams ──────────────────────────────────────────────────────
// Tells Next.js to build one static HTML file per project at deploy time.
// Same idea as a Flutter route that maps a list of items to named screens —
// you define the mapping once, not once per item.
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// 404 any slug that isn't in the list above
export const dynamicParams = false;

// ── Per-page metadata ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.name} — Vincent Munene`,
    description: project.tagline,
  };
}

// ── Gallery screenshot placeholder ───────────────────────────────────────────
function ShotPlaceholder({ label }: { label: string }) {
  return (
    <div className="flex aspect-[16/10] w-full items-center justify-center rounded-[var(--radius-card)] border border-border [background-color:#141414] [background-image:repeating-linear-gradient(135deg,#181818_0_12px,#141414_12px_24px)]">
      <span className="font-mono text-[12px] tracking-[0.04em] text-[#5a5a5a]">
        {label}
      </span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  // generateStaticParams + dynamicParams=false already prevents unknown slugs,
  // but this satisfies TypeScript's narrowing.
  if (!project) notFound();

  // Bound once here because TypeScript's narrowing on the optional `gallery`
  // property doesn't reach inside the `.map()` callback below.
  const shotCount = project.gallery?.length ?? 0;

  return (
    <>
      {/* Back nav — replaces the full Nav on detail pages */}
      <nav className="sticky top-0 z-20 bg-bg px-5 py-[22px]">
        <div className="mx-auto max-w-[720px]">
          <Link
            href="/"
            className="font-mono text-[13px] tracking-[0.04em] text-body transition-colors hover:text-heading"
          >
            ← Back
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-[720px] px-5 pb-[120px] pt-6">

        {/* Title, pills, tagline */}
        <ProjectHero project={project} />

        {/* ── Optional video ─────────────────────────────────────────────── */}
        {project.video && (
          <div className="mb-11">
            <video
              src={project.video}
              controls
              playsInline
              className="w-full rounded-[var(--radius-card)] border border-border"
            />
          </div>
        )}

        {/* ── Written content ────────────────────────────────────────────── */}
        <div className="flex flex-col gap-5">
          <p className="text-[16px] leading-[1.7] text-body">{project.overview}</p>
          <p className="text-[16px] leading-[1.7] text-body">{project.problem}</p>
          <p className="text-[16px] leading-[1.7] text-body">{project.solution}</p>
        </div>

        {/* ── Optional gallery ───────────────────────────────────────────── */}
        {/* Shots keep their real shape rather than being cropped into a fixed
            box. Portrait (phone, 9:20) goes three-up; landscape (desktop, 16:9)
            stacks full width, since a wide shot shrunk to a third is unreadable. */}
        {project.gallery && project.gallery.length > 0 && (
          project.galleryAspect === "landscape" ? (
            <div className="mt-11 flex flex-col gap-5">
              {project.gallery.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface"
                >
                  <ShimmerImage
                    src={src}
                    alt={`${project.name} screenshot ${i + 1}`}
                    fill
                    sizes="(min-width: 760px) 720px, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div
              className={`mt-11 flex flex-col items-center gap-6 sm:grid sm:items-start sm:gap-5 ${
                shotCount === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"
              }`}
            >
              {project.gallery.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-[9/20] w-full max-w-[260px] overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface sm:max-w-none"
                >
                  <ShimmerImage
                    src={src}
                    alt={`${project.name} screenshot ${i + 1}`}
                    fill
                    sizes={
                      shotCount === 4
                        ? "(min-width: 640px) 165px, 260px"
                        : "(min-width: 640px) 226px, 260px"
                    }
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )
        )}

        {/* Show placeholder shots when gallery is empty (placeholder state) */}
        {(!project.gallery || project.gallery.length === 0) && (
          <div className="mt-11 flex flex-col gap-5">
            <ShotPlaceholder label="screenshot 1" />
            <ShotPlaceholder label="screenshot 2" />
            <ShotPlaceholder label="screenshot 3" />
          </div>
        )}

        {/* ── Optional architecture block ────────────────────────────────── */}
        {project.architecture && (
          <div className="mt-11">
            <h2 className="mb-4 font-display text-[20px] font-bold tracking-[-0.01em] text-heading sm:text-[22px]">
              Architecture
            </h2>

            <p className="mb-8 text-[16px] leading-[1.7] text-body">
              {project.architecture.summary}
            </p>

            {/* Optional diagram */}
            {project.architecture.diagram && (
              <div className="mb-8 overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface p-6">
                <Image
                  src={project.architecture.diagram}
                  alt={`${project.name} architecture diagram`}
                  width={680}
                  height={400}
                  className="w-full"
                />
              </div>
            )}

            {/* Decision records */}
            <div className="flex flex-col gap-8">
              {project.architecture.decisions.map((d) => (
                <div key={d.title}>
                  <h3 className="mb-2 font-display text-[16px] font-semibold text-heading">
                    {d.title}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-body">{d.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Links ──────────────────────────────────────────────────────── */}
        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-11 flex gap-6 border-t border-hairline pt-6">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[14px] tracking-[0.03em] text-accent hover:text-accent-hover"
              >
                View live app →
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[14px] tracking-[0.03em] text-accent hover:text-accent-hover"
              >
                View source →
              </a>
            )}
          </div>
        )}

      </main>
    </>
  );
}
