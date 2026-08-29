"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/problems", label: "Explore" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--ax-line)] bg-[color-mix(in_srgb,var(--ax-surface)_96%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-[var(--ax-content-max)] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3 outline-none focus-visible:shadow-[var(--ax-focus-ring)]" aria-label="Axion Science home">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--ax-radius-control)] border border-[var(--ax-line-strong)] bg-[var(--ax-surface)]">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--ax-accent)]" />
            <span className="absolute h-6 w-6 rounded-full border border-[var(--ax-line-strong)]" />
          </div>
          <div className="min-w-0 leading-none">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ax-accent)]">Axion Science</p>
            <p className="mt-1 truncate text-xs font-semibold text-[var(--ax-text)]">Project environment</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden h-9 items-center gap-1 rounded-[var(--ax-radius-control)] border border-[var(--ax-line)] bg-[var(--ax-surface-soft)] p-1 md:flex" aria-label="Science Hub">
            {links.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex h-7 items-center rounded-[7px] px-3 text-[11px] font-semibold outline-none transition-colors duration-[var(--ax-motion-fast)] focus-visible:shadow-[var(--ax-focus-ring)] ${
                    isActive
                      ? "bg-[var(--ax-surface)] text-[var(--ax-text)] shadow-[0_1px_2px_rgb(23_36_54_/_0.06)]"
                      : "text-[var(--ax-text-soft)] hover:text-[var(--ax-text)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/projects"
            className="inline-flex h-9 items-center justify-center rounded-[var(--ax-radius-control)] border border-[var(--ax-line-strong)] bg-[var(--ax-surface)] px-3 text-[11px] font-semibold text-[var(--ax-text)] outline-none transition-colors duration-[var(--ax-motion-fast)] hover:bg-[var(--ax-surface-soft)] focus-visible:shadow-[var(--ax-focus-ring)]"
          >
            New project
          </Link>
        </div>
      </div>
    </header>
  );
}
