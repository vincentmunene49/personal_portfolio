import Image from "next/image";

// ── CDN icons (Simple Icons) ──────────────────────────────────────────────────
// Browse slugs at https://simpleicons.org
// Color d4a25a = --color-accent token.
const ICON_SLUGS: Record<string, string> = {
  // Tech stack
  Flutter:       "flutter",
  Dart:          "dart",
  Firebase:      "firebase",
  Python:        "python",
  Railway:       "railway",
  Java:          "openjdk",      // Oracle C&D'd the Java logo; openjdk is the recommended sub
  Kotlin:        "kotlin",
  "Spring Boot": "springboot",
  Kafka:         "apachekafka",
  Docker:        "docker",
  Kubernetes:    "kubernetes",
  Jenkins:       "jenkins",
  Android:       "android",
  SQL:           "sqlite",
  Supabase:      "supabase",
  // Social
  GitHub:        "github",
  Upwork:        "upwork",
  // LinkedIn was removed in Simple Icons v14 (Dec 2024) — see INLINE_SVGS below
};

// ── Inline SVGs for icons removed from Simple Icons ───────────────────────────
// Keyed by the same name strings used in ICON_SLUGS / STACK / social buttons.
// viewBox is always "0 0 24 24". fill="currentColor" picks up text-accent from parent.
const INLINE_SVG_PATHS: Record<string, string> = {
  // LinkedIn — removed from Simple Icons v14 via Microsoft policy (Dec 2024)
  LinkedIn:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 " +
    "1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 " +
    "3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 " +
    "2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 " +
    "0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 " +
    "24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
};

// ── Text marks — last resort for anything not in the maps above ───────────────
const TEXT_MARKS: Record<string, string> = {
  FlutterFlow: "FF",
  "CI/CD":     "CD",
};

type Props = {
  name: string;   // exact string from the stack array or social list, e.g. "Spring Boot"
  size?: number;  // px — default 14 fits the 18×18 chip mark box
};

export default function TechIcon({ name, size = 14 }: Props) {
  // 1. Inline SVG path (for icons removed from Simple Icons)
  const inlinePath = INLINE_SVG_PATHS[name];
  if (inlinePath) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        width={size}
        height={size}
        aria-label={`${name} logo`}
        className="shrink-0 text-accent"
        style={{ width: size, height: size }}
      >
        <path d={inlinePath} />
      </svg>
    );
  }

  // 2. CDN icon (Simple Icons)
  const slug = ICON_SLUGS[name];
  if (slug) {
    return (
      <Image
        src={`https://cdn.simpleicons.org/${slug}/d4a25a`}
        alt={`${name} logo`}
        width={size}
        height={size}
        className="shrink-0"
        style={{ width: size, height: size }}
        unoptimized // SVGs don't benefit from next/image format conversion
      />
    );
  }

  // 3. Two-letter text mark fallback
  const mark = TEXT_MARKS[name] ?? name.slice(0, 2);
  return (
    <span className="font-mono text-[9px] leading-none text-accent" aria-label={name}>
      {mark}
    </span>
  );
}
