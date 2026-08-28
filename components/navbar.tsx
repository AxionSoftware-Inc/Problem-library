"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ui } from "@/components/ui/styles";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/problems", label: "Explore" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className={`sticky top-0 z-50 ${ui.glassBar}`}>
      <div className={`${ui.container} flex h-14 items-center justify-between gap-4`}>
        <Link href="/" className="flex items-center gap-3" aria-label="Axion Science home">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] bg-white">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
            <span className="absolute h-6 w-6 rounded-full border border-[var(--color-line-strong)]" />
          </div>
          <div className="space-y-0.5 leading-none">
            <p className={ui.overline}>Axion Science</p>
            <p className="text-xs font-medium text-[var(--color-text-strong)]">
              Project environment
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 rounded-md border border-[var(--color-line)] bg-white p-1 md:flex">
            {links.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link key={link.href} href={link.href} className={isActive ? ui.navLinkActive : ui.navLink}>
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link href="/projects" className={ui.buttonSecondary}>
            New project
          </Link>
        </div>
      </div>
    </header>
  );
}
