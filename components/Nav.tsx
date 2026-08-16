"use client";

// Nav needs "use client" only because the mobile hamburger requires useState.
// The desktop link list is static JSX — no browser API involved.
// Analogue: a Flutter StatefulWidget where only the Scaffold drawer needs state,
// but the AppBar title is static.

import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/#about",      label: "About" },
  { href: "/#stack",      label: "Stack" },
  { href: "/#projects",   label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact",    label: "Contact" },
];

function HamburgerIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true">
      <rect y="0"    width="18" height="1.5" rx="0.75" fill="currentColor" />
      <rect y="5.25" width="18" height="1.5" rx="0.75" fill="currentColor" />
      <rect y="10.5" width="18" height="1.5" rx="0.75" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M1 1L13 13M13 1L1 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-20 bg-bg" aria-label="Main navigation">
      {/* ── Bar ── */}
      <div className="mx-auto flex max-w-[720px] items-center justify-between px-5 py-[22px]">
        <Link
          href="/"
          className="font-mono text-[13px] font-medium tracking-[0.06em] text-heading"
        >
          Vincent Munene
        </Link>

        {/* Desktop links — hidden on small screens */}
        <div className="hidden items-center gap-[22px] sm:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-mono text-[13px] tracking-[0.04em] text-body transition-colors hover:text-heading"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Hamburger button — visible only on small screens */}
        <button
          className="flex h-[34px] w-[34px] items-center justify-center rounded-[var(--radius-chip)] border border-border text-body transition-colors hover:border-border-bright hover:text-heading sm:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <CloseIcon /> : <HamburgerIcon />}
        </button>
      </div>

      {/* ── Mobile dropdown — slides in below the bar ── */}
      {open && (
        <div id="mobile-menu" className="border-t border-border sm:hidden">
          <div className="mx-auto max-w-[720px] flex flex-col px-5">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-hairline py-4 font-mono text-[14px] tracking-[0.04em] text-body transition-colors last:border-b-0 hover:text-heading"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
