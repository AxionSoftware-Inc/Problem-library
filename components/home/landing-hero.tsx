import Link from "next/link";
import { PageContainer, PageSection } from "@/components/ui/page-shell";
import { ui } from "@/components/ui/styles";

const flow = [
  { label: "Solve in Math", detail: "Compute and visualize on this device." },
  { label: "Save to Project", detail: "Keep the result with the work it belongs to." },
  { label: "Use it anywhere", detail: "Bring it into Notebook reasoning or a Writer draft." },
];

export function LandingHero() {
  return (
    <>
      <PageSection className="pt-5 sm:pt-8 lg:pt-12">
        <PageContainer>
          <section className="grid gap-10 border-b border-[var(--color-line)] pb-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:items-end lg:pb-14">
            <div>
              <p className={ui.overline}>Axion Science · one project, many instruments</p>
              <h1 className="mt-4 max-w-5xl text-5xl leading-[0.98] tracking-[-0.065em] text-[var(--color-text-strong)] sm:text-6xl lg:text-[76px]">
                Scientific work should stay connected.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
                Calculate, visualize, think, and write without rebuilding context every time the tool changes. A Project keeps the work together while each instrument stays focused on what it does best.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/projects" className={ui.buttonPrimary}>
                  Start a project
                </Link>
                <Link href="/problems" className={ui.buttonSecondary}>
                  Explore examples
                </Link>
              </div>
            </div>

            <div className="relative min-h-[330px] overflow-hidden border border-[var(--color-line)] bg-white p-5 sm:p-7">
              <div className="flex items-center justify-between border-b border-[var(--color-line)] pb-4">
                <div>
                  <p className={ui.caption}>Project</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-text-strong)]">Turbulence study</p>
                </div>
                <span className={ui.microBadge}>Local first</span>
              </div>

              <div className="relative mt-7 space-y-5">
                {flow.map((item, index) => (
                  <div key={item.label} className="relative grid grid-cols-[34px_minmax(0,1fr)] gap-4">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-line-strong)] bg-[var(--color-surface-soft)] text-[11px] font-semibold text-[var(--color-text-strong)]">
                      {index + 1}
                      {index < flow.length - 1 ? (
                        <span className="absolute left-1/2 top-8 h-6 w-px -translate-x-1/2 bg-[var(--color-line)]" />
                      ) : null}
                    </div>
                    <div className="border-b border-[var(--color-line-soft)] pb-5">
                      <div className="text-base font-semibold tracking-[-0.02em] text-[var(--color-text-strong)]">{item.label}</div>
                      <div className="mt-1 text-sm leading-6 text-[var(--color-muted)]">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between gap-4 text-[11px] text-[var(--color-muted)]">
                <span>One active Project</span>
                <span>Math · Notebook · Writer</span>
              </div>
            </div>
          </section>
        </PageContainer>
      </PageSection>

      <PageSection>
        <PageContainer>
          <div className="grid divide-y divide-[var(--color-line)] border-y border-[var(--color-line)] md:grid-cols-3 md:divide-x md:divide-y-0">
            <div className="px-0 py-5 md:px-6 md:first:pl-0">
              <p className={ui.caption}>Local by default</p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">Ordinary computation stays on the user device whenever practical. The core workflow does not wait for a compute server.</p>
            </div>
            <div className="px-0 py-5 md:px-6">
              <p className={ui.caption}>Keep the result</p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">Save a calculation with its Project, then reuse the same result instead of rebuilding it in the next tool.</p>
            </div>
            <div className="px-0 py-5 md:px-6 md:last:pr-0">
              <p className={ui.caption}>Built to expand</p>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">Math is the first instrument. Physics and future scientific domains can join the same Project workflow without changing its basic shape.</p>
            </div>
          </div>
        </PageContainer>
      </PageSection>
    </>
  );
}
