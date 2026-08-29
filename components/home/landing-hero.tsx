import { AxActionLink, AxBadge, AxPanel } from "@/components/axion";
import { PageContainer, PageSection } from "@/components/ui/page-shell";

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
          <section className="grid gap-10 border-b border-[var(--ax-line)] pb-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:items-end lg:pb-14">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ax-accent)]">Axion Science · one project, many instruments</p>
              <h1 className="mt-4 max-w-5xl font-[family-name:var(--ax-font-display)] text-5xl font-medium leading-[0.98] tracking-[-0.045em] text-[var(--ax-text)] sm:text-6xl lg:text-[72px]">
                Scientific work should stay connected.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--ax-text-soft)] sm:text-lg">
                Calculate, visualize, think, and write without rebuilding context every time the tool changes. A Project keeps the work together while each instrument stays focused on what it does best.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <AxActionLink href="/projects" variant="primary">Start a project</AxActionLink>
                <AxActionLink href="/problems">Explore examples</AxActionLink>
              </div>
            </div>

            <AxPanel className="relative min-h-[330px] overflow-hidden p-5 sm:p-7">
              <div className="flex items-center justify-between border-b border-[var(--ax-line)] pb-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--ax-text-faint)]">Project</p>
                  <p className="mt-1 text-sm font-semibold text-[var(--ax-text)]">Turbulence study</p>
                </div>
                <AxBadge tone="accent">Local first</AxBadge>
              </div>

              <div className="relative mt-7 space-y-5">
                {flow.map((item, index) => (
                  <div key={item.label} className="relative grid grid-cols-[34px_minmax(0,1fr)] gap-4">
                    <div className="relative flex h-8 w-8 items-center justify-center rounded-[var(--ax-radius-control)] border border-[var(--ax-line-strong)] bg-[var(--ax-surface-soft)] text-[11px] font-semibold text-[var(--ax-text)]">
                      {index + 1}
                      {index < flow.length - 1 ? (
                        <span className="absolute left-1/2 top-8 h-6 w-px -translate-x-1/2 bg-[var(--ax-line)]" />
                      ) : null}
                    </div>
                    <div className="border-b border-[var(--ax-line)] pb-5">
                      <div className="text-base font-semibold tracking-[-0.02em] text-[var(--ax-text)]">{item.label}</div>
                      <div className="mt-1 text-sm leading-6 text-[var(--ax-text-soft)]">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between gap-4 text-[11px] text-[var(--ax-text-faint)]">
                <span>One active Project</span>
                <span>Math · Notebook · Writer</span>
              </div>
            </AxPanel>
          </section>
        </PageContainer>
      </PageSection>

      <PageSection>
        <PageContainer>
          <div className="grid divide-y divide-[var(--ax-line)] border-y border-[var(--ax-line)] md:grid-cols-3 md:divide-x md:divide-y-0">
            <div className="px-0 py-5 md:px-6 md:first:pl-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--ax-text-faint)]">Local by default</p>
              <p className="mt-2 text-sm leading-6 text-[var(--ax-text-soft)]">Ordinary computation stays on the user device whenever practical. The core workflow does not wait for a compute server.</p>
            </div>
            <div className="px-0 py-5 md:px-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--ax-text-faint)]">Keep the result</p>
              <p className="mt-2 text-sm leading-6 text-[var(--ax-text-soft)]">Save a calculation with its Project, then reuse the same result instead of rebuilding it in the next tool.</p>
            </div>
            <div className="px-0 py-5 md:px-6 md:last:pr-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--ax-text-faint)]">Built to expand</p>
              <p className="mt-2 text-sm leading-6 text-[var(--ax-text-soft)]">Math is the first instrument. Physics and future scientific domains can join the same Project workflow without changing its basic shape.</p>
            </div>
          </div>
        </PageContainer>
      </PageSection>
    </>
  );
}
