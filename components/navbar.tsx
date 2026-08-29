"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/problems", label: "Explore" },
];

function ScienceMark() {
  return (
    <svg viewBox="0 0 36 36" className="h-8 w-8 text-[var(--ax-accent)]" aria-hidden="true">
      <circle cx="18" cy="18" r="15.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <ellipse cx="18" cy="18" rx="7" ry="15.5" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.72" />
      <ellipse cx="18" cy="18" rx="15.5" ry="6.8" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.72" />
      <path d="M3 18h30M18 2.5v31" stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
    </svg>
  );
}

const navLink = "rounded-[var(--ax-radius-control)] px-2 py-1.5 text-[12px] font-semibold text-[var(--ax-text-soft)] outline-none transition-colors duration-[var(--ax-motion-fast)] hover:bg-[var(--ax-surface-soft)] hover:text-[var(--ax-text)] focus-visible:shadow-[var(--ax-focus-ring)]";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--ax-line)] bg-[color-mix(in_srgb,var(--ax-surface)_96%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex h-[64px] w-full max-w-[var(--ax-content-max)] items-center justify-between gap-5 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3 rounded-[var(--ax-radius-control)] outline-none focus-visible:shadow-[var(--ax-focus-ring)]" aria-label="Axion Science home">
          <ScienceMark />
          <span className="truncate text-[19px] font-medium tracking-[-0.025em] text-[var(--ax-text)] sm:text-[20px]">
            Axion Science
          </span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-3" aria-label="Science Hub">
          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`${navLink} ${active ? "bg-[var(--ax-surface-soft)] text-[var(--ax-text)]" : ""}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <Link
            href="/projects"
            className="ml-1 inline-flex h-9 items-center rounded-[var(--ax-radius-control)] border border-transparent bg-[var(--ax-accent-strong)] px-4 text-[11px] font-semibold text-white outline-none transition-colors duration-[var(--ax-motion-fast)] hover:bg-[var(--ax-accent)] focus-visible:shadow-[var(--ax-focus-ring)]"
          >
            New Project
          </Link>
        </nav>
      </div>
    </header>
  );
}
