"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ui } from "@/components/ui/styles";

const links = [
  { href: "/", label: "Home" },
  { href: "/problems", label: "Library" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className={`sticky top-0 z-50 ${ui.glassBar}`}>
      <div className={`${ui.container} flex h-14 items-center justify-between gap-4`}>
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-line)] bg-white">
            <span className="text-sm font-semibold tracking-[-0.03em] text-[var(--color-text-strong)]">
              PL
            </span>
          </div>
          <div className="space-y-0.5 leading-none">
            <p className={ui.overline}>Problem Library</p>
            <p className="text-xs font-medium text-[var(--color-text-strong)]">
              Scientific workspace
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 rounded-md border border-[var(--color-line)] bg-white p-1 md:flex">
            {links.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === link.href
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={isActive ? ui.navLinkActive : ui.navLink}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <Link href="/problems?create=1" className={ui.buttonSecondary}>
            New project
          </Link>
        </div>
      </div>
    </header>
  );
}
