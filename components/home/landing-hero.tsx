import Link from "next/link";
import { PageContainer, PageSection } from "@/components/ui/page-shell";
import { ui } from "@/components/ui/styles";

export function LandingHero() {
  return (
    <PageSection className="pt-4">
      <PageContainer>
        <section className="border border-[var(--color-line)] bg-[var(--color-surface)]">
          <div className="grid gap-6 px-5 py-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-end">
            <div>
              <p className={ui.overline}>Problem Library</p>
              <h1 className="mt-3 max-w-4xl text-4xl leading-tight tracking-[-0.05em] text-[var(--color-text-strong)] sm:text-5xl">
                Engineering problems, explained clearly.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                Deep technical cases with formulas, calculations, graphs, and code in one
                structured workspace.
              </p>
            </div>

            <div className="grid gap-3">
              <Link href="/problems" className={ui.buttonPrimary}>
                Open library
              </Link>
              <Link href="/problems/led-design" className={ui.buttonSecondary}>
                Open featured case
              </Link>
            </div>
          </div>

          <div className="border-t border-[var(--color-line)] px-5 py-3 text-sm text-[var(--color-muted)]">
            Featured case:{" "}
            <Link href="/problems/led-design" className="font-medium text-[var(--color-text-strong)]">
              LED Design
            </Link>
          </div>
        </section>
      </PageContainer>
    </PageSection>
  );
}
