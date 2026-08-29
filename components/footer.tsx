import Link from "next/link";

const footerLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/problems", label: "Explore" },
  { href: "/", label: "Science Hub" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--ax-line)] bg-[var(--ax-surface)]">
      <div className="mx-auto grid w-full max-w-[var(--ax-content-max)] gap-6 px-4 py-7 sm:px-6 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="max-w-2xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ax-accent)]">Axion Science</p>
          <p className="mt-2 text-sm leading-6 text-[var(--ax-text-soft)]">
            One Project context across computation, reasoning, visualization, and publication. Each instrument stays focused; the research trail stays connected.
          </p>
        </div>

        <div className="flex flex-wrap items-start gap-x-8 gap-y-3 lg:justify-end">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[var(--ax-radius-control)] px-1 py-1 text-[11px] font-semibold text-[var(--ax-text-soft)] outline-none transition-colors duration-[var(--ax-motion-fast)] hover:text-[var(--ax-text)] focus-visible:shadow-[var(--ax-focus-ring)]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
