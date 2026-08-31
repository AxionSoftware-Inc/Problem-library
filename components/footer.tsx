import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[var(--ax-line)] bg-white">
      <div className="ax-landing-container grid gap-8 py-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <div className="font-[family-name:var(--ax-font-display)] text-[24px] tracking-[-0.035em] text-[var(--ax-text)]">Axion Science</div>
          <p className="mt-2 max-w-md text-[11px] leading-5 text-[var(--ax-text-faint)]">One Project context across computation, reasoning, visualization and publication.</p>
          <div className="mt-6 text-[10px] text-[var(--ax-text-faint)]">&copy; {new Date().getFullYear()} Axion Science</div>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-semibold text-[var(--ax-text-soft)]" aria-label="Footer">
          <Link href="/#product" className="hover:text-[var(--ax-text)]">Product</Link>
          <Link href="/#workflow" className="hover:text-[var(--ax-text)]">Workflow</Link>
          <Link href="/#ecosystem" className="hover:text-[var(--ax-text)]">Ecosystem</Link>
          <Link href="/projects" className="text-[var(--ax-accent)] hover:text-[var(--ax-accent-strong)]">Open Projects →</Link>
        </nav>
      </div>
    </footer>
  );
}
