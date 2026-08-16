import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title?: string;
  children: ReactNode;
};

// Reusable padded section block with optional heading.
// scroll-mt-20 keeps anchor links from hiding behind the sticky nav.
export default function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-20">
      {title && (
        <h2 className="mb-5 font-display text-[22px] font-bold tracking-[-0.01em] text-heading">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
