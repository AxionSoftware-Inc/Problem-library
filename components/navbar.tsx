"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/problems", label: "Problems" },
  { href: "/solutions", label: "Solutions" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-stone-100 bg-white/60 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 h-16 sm:px-10">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-stone-900 text-[11px] font-medium tracking-widest text-white transition-transform duration-300 group-hover:scale-95">
            RM
          </span>
          <div className="leading-none space-y-0.5">
            <p className="text-[9px] uppercase tracking-[0.25em] text-stone-400 font-light">
              Roadmap
            </p>
            <p className="text-sm font-medium tracking-tight text-stone-900">
              Problem Library
            </p>
          </div>
        </Link>

        {/* Navigation Menu - Clean & Borderless */}
        <nav className="flex items-center gap-6">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === link.href
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-xs font-medium tracking-wide transition-colors duration-200 ${
                  isActive 
                    ? "text-stone-900" 
                    : "text-stone-400 hover:text-stone-900"
                }`}
              >
                {link.label}
                
                {/* Active Indicator Dot */}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-stone-900" />
                )}
              </Link>
            );
          })}
        </nav>

      </div>
    </header>
  );
}