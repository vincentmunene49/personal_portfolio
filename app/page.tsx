import Nav from "@/components/Nav";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import TechIcon from "@/components/TechIcon";
import { projects } from "@/content/projects";

// ── Static data ───────────────────────────────────────────────────────────────

// Order here controls chip order in the Stack section.
const STACK = [
  "Flutter",
  "FlutterFlow",
  "Dart",
  "Firebase",
  "Supabase",
  "Java",
  "Kotlin",
  "Spring Boot",
  "Kafka",
  "Docker",
  "Kubernetes",
  "Jenkins",
];

// Most recent first — the timeline renders in array order.
const EXPERIENCE = [
  {
    company: "Konvergenz",
    role: "Flutter Developer",
    dates: "Mar 2026 — Present",
    description:
      "Building P360, a clinical practitioner tool for Kenya's Digital Health Agency, covering " +
      "professional licensing, CPD, and clinical workflows. Flutter front end, with document " +
      "capture, biometrics, and a Kafka and FCM notification pipeline behind it.",
  },
  {
    company: "Minet",
    role: "Backend Developer",
    dates: "Jan 2026 — Mar 2026",
    description:
      "Backend services in Java and Spring Boot for an insurance platform, deployed through a " +
      "Docker, Kubernetes and Jenkins pipeline.",
  },
  {
    company: "Upwork",
    role: "Freelance Developer",
    dates: "Apr 2025 — Present",
    description:
      "Contract mobile and backend work, including WebshopR, LiftMindr and Cosecha above. Sole " +
      "developer on most engagements, from Figma file to store listing.",
  },
  {
    company: "Turnkey Africa",
    role: "Android & Backend Developer",
    dates: "Jan 2023 — Apr 2025",
    description:
      "First full-time role, working across both sides of Agencify. Built Android features in Kotlin " +
      "and backend services in Java and Spring Boot, shipped through a Docker, Kubernetes and Jenkins " +
      "deployment pipeline.",
  },
  {
    company: "Kenyatta National Hospital",
    role: "IT Intern",
    dates: "Sep 2022 — Nov 2022",
    description:
      "Three months with the database management team, learning database administration and " +
      "helping develop a concept for a tool maintenance system.",
  },
];

const GITHUB_URL   = "https://github.com/vincentmunene49";
const LINKEDIN_URL = "https://www.linkedin.com/in/vincent-munene-35319822a/";
const UPWORK_URL   = "https://www.upwork.com/freelancers/~01eb4d10c44e026776?mp_source=share";
const EMAIL        = "munenevincent49@gmail.com";

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Nav />

      <main className="mx-auto flex max-w-[720px] flex-col gap-[72px] px-5 pb-[120px] pt-6">

        {/* ── About ─────────────────────────────────────────────────────── */}
        <section id="about" className="scroll-mt-20">
          {/*
            Mobile  (< sm): 24px padding, social icons flow below the bio.
            Desktop (≥ sm): 32px padding, social icons positioned top-right.
            Mirrors the design sample's responsive behaviour exactly.
          */}
          <div className="relative rounded-[var(--radius-card)] border border-border bg-surface p-6 sm:p-8">

            <h1 className="mb-3 font-display text-[28px] font-bold leading-[1.1] tracking-[-0.02em] text-heading sm:text-[34px]">
              Vincent Munene
            </h1>

            {/* Location */}
            <div className="mb-[18px] flex items-center gap-[7px] font-mono text-[13px] tracking-[0.03em] text-body">
              <svg
                width="11"
                height="13"
                viewBox="0 0 11 13"
                fill="none"
                aria-hidden="true"
                className="shrink-0"
              >
                <circle cx="5.5" cy="5" r="4" stroke="#D4A25A" strokeWidth="1.4" />
                <circle cx="5.5" cy="5" r="1.4" fill="#D4A25A" />
                <path d="M5.5 9 L5.5 12.5" stroke="#D4A25A" strokeWidth="1.4" />
              </svg>
              <span>Nairobi, Kenya</span>
            </div>

            <p className="max-w-[52ch] text-[16px] leading-[1.7] text-body">
              Full-stack mobile developer. Flutter, FlutterFlow, and native Android
              with Kotlin, backed by Firebase, Supabase, or Spring Boot when a project
              needs real infrastructure. I take apps from Figma file to Play Store
              listing, and I&apos;ve been on both sides of that gap often enough to know
              where projects usually stall.
              <br /><br />
              Open to freelance and full-time.
            </p>

            {/*
              Social buttons.
              On mobile : normal flow, mt-5 gives spacing below the bio.
              On desktop: sm:absolute sm:right-6 sm:top-6 pins them top-right.
            */}
            <div className="mt-5 flex gap-2 sm:absolute sm:right-6 sm:top-6 sm:mt-0">
              <a
                href={GITHUB_URL}
                className="flex h-[34px] w-[34px] items-center justify-center rounded-[var(--radius-chip)] border border-border text-body transition-colors hover:border-border-bright hover:text-heading"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
              >
                <TechIcon name="GitHub" size={16} />
              </a>
              <a
                href={LINKEDIN_URL}
                className="flex h-[34px] w-[34px] items-center justify-center rounded-[var(--radius-chip)] border border-border text-body transition-colors hover:border-border-bright hover:text-heading"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
              >
                <TechIcon name="LinkedIn" size={16} />
              </a>
              <a
                href={UPWORK_URL}
                className="flex h-[34px] w-[34px] items-center justify-center rounded-[var(--radius-chip)] border border-border text-body transition-colors hover:border-border-bright hover:text-heading"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Upwork profile"
              >
                <TechIcon name="Upwork" size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Stack ─────────────────────────────────────────────────────── */}
        <Section id="stack" title="Stack">
          <div className="flex flex-wrap gap-[10px]">
            {STACK.map((label) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-[var(--radius-chip)] border border-border bg-bg px-3 py-[7px]"
              >
                {/* Icon mark box */}
                <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[4px] border border-border">
                  <TechIcon name={label} size={12} />
                </span>
                <span className="text-[14px] text-heading">{label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Projects ──────────────────────────────────────────────────── */}
        <Section id="projects" title="Projects">
          <div className="flex flex-col gap-6">
            {/* The first two cards are the ones the browser has reported as LCP
                (which of them wins depends on viewport height), so neither
                should be lazy-loaded. The rest stay lazy. */}
            {projects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                eager={i < 2}
              />
            ))}
          </div>
        </Section>

        {/* ── Experience ────────────────────────────────────────────────── */}
        <Section id="experience" title="Experience">
          <div className="relative pl-7">
            {/* Vertical timeline line */}
            <div
              className="absolute bottom-[6px] left-[5px] top-[6px] w-px bg-border"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-9">
              {EXPERIENCE.map((entry, i) => (
                <div key={i} className="relative">
                  <span
                    className="absolute -left-7 top-1 flex h-[11px] w-[11px] items-center justify-center rounded-full border border-border bg-bg"
                    aria-hidden="true"
                  >
                    <span className="h-[5px] w-[5px] rounded-full bg-accent" />
                  </span>
                  <p className="mb-1 font-mono text-[12px] tracking-[0.03em] text-accent">
                    {entry.company}
                  </p>
                  <p className="font-display text-[16px] font-semibold text-heading">
                    {entry.role}
                  </p>
                  <p className="mt-[3px] font-mono text-[12px] tracking-[0.03em] text-muted">
                    {entry.dates}
                  </p>
                  <p className="mt-[10px] max-w-[56ch] text-[15px] leading-[1.7] text-body">
                    {entry.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Contact ───────────────────────────────────────────────────── */}
        <Section id="contact" title="Contact">
          <p className="text-[16px] leading-[1.7] text-body">
            Reach me at{" "}
            <a href={`mailto:${EMAIL}`} className="text-accent hover:text-accent-hover">
              {EMAIL}
            </a>
          </p>
        </Section>

      </main>
    </>
  );
}
