import { ArrowRight, BookOpenText, FlaskConical, Sigma } from "lucide-react";

import { AxActionLink, AxBadge } from "@/components/axion";
import { PageContainer, PageSection } from "@/components/ui/page-shell";

const flow = [
  { label: "Math", detail: "Compute and visualize the scientific result." },
  { label: "Notebook", detail: "Keep reasoning and observations beside the work." },
  { label: "Writer", detail: "Turn evidence into a publication-ready document." },
];

export function LandingHero() {
  return (
    <>
      <PageSection className="pt-0">
        <PageContainer>
          <section className="grid items-center gap-10 pb-12 pt-12 lg:grid-cols-[0.66fr_1.34fr] lg:gap-12 lg:pb-10 lg:pt-10">
            <div className="max-w-[510px] lg:pb-6">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ax-accent)]">Axion Science · one project, many instruments</p>
              <h1 className="mt-4 font-serif text-[clamp(3.35rem,5.4vw,5.9rem)] font-medium leading-[0.95] tracking-[-0.055em] text-[var(--ax-text)]">
                Science,
                <br />
                kept connected.
              </h1>
              <div className="mt-6 h-[3px] w-14 bg-[var(--ax-accent)]" />
              <p className="mt-5 max-w-[440px] text-[17px] leading-7 text-[var(--ax-text-soft)] sm:text-[18px]">
                Move from computation to reasoning to publication without rebuilding context every time the instrument changes.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <AxActionLink href="/projects" variant="primary">Start a project <ArrowRight className="h-4 w-4" /></AxActionLink>
                <AxActionLink href="/problems">Explore examples</AxActionLink>
              </div>
            </div>

            <div className="overflow-hidden rounded-[15px] border border-[var(--ax-line)] bg-[var(--ax-surface)] shadow-[var(--ax-shadow-floating)]">
              <div className="flex h-9 items-center justify-between border-b border-[var(--ax-line)] px-3.5 text-[10px] text-[var(--ax-text-faint)]">
                <span>Project · Turbulence Study</span><AxBadge tone="accent">Local first</AxBadge>
              </div>
              <div className="grid min-h-[390px] md:grid-cols-[160px_1fr]">
                <aside className="border-b border-[var(--ax-line)] bg-[var(--ax-surface-soft)] p-3 md:border-b-0 md:border-r">
                  <div className="text-[8px] font-semibold uppercase tracking-[0.13em] text-[var(--ax-text-faint)]">Project</div>
                  <div className="mt-3 space-y-1 text-[10px] text-[var(--ax-text-soft)]">
                    {['Overview', 'Calculations', 'Notebook', 'Documents', 'Activity'].map((item, index) => (
                      <div key={item} className={`rounded-[6px] px-2 py-2 ${index === 0 ? 'bg-[var(--ax-surface)] font-semibold text-[var(--ax-text)] shadow-[0_1px_2px_rgb(23_36_54_/_0.05)]' : ''}`}>{item}</div>
                    ))}
                  </div>
                </aside>
                <div className="p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-4 border-b border-[var(--ax-line)] pb-5">
                    <div>
                      <div className="font-serif text-[29px] tracking-[-0.035em]">Turbulence Study</div>
                      <div className="mt-1 text-[10px] text-[var(--ax-text-faint)]">Research project · active on this device</div>
                    </div>
                    <div className="text-[10px] font-semibold text-[var(--ax-accent)]">3 instruments</div>
                  </div>
                  <div className="mt-5 grid gap-3 lg:grid-cols-[1.08fr_0.92fr]">
                    <div className="rounded-[9px] border border-[var(--ax-line)] bg-[var(--ax-surface-soft)] p-4">
                      <div className="text-[9px] text-[var(--ax-text-faint)]">Latest scientific object</div>
                      <div className="mt-3 font-serif text-[20px]">∂u/∂t + u·∇u = −∇p + ν∇²u</div>
                      <div className="mt-3 h-[104px] rounded-[7px] border border-[var(--ax-line)] bg-[var(--ax-surface)] p-2">
                        <svg viewBox="0 0 280 90" className="h-full w-full" aria-hidden="true">
                          <g fill="none" stroke="#82a8df" strokeWidth="1" opacity="0.75">
                            <path d="M4 45 C36 9 68 11 100 46 C132 80 164 80 196 45 C228 10 250 13 276 37" />
                            <path d="M4 58 C36 24 68 25 100 53 C132 80 164 76 196 47 C228 20 250 21 276 48" opacity="0.65" />
                            <path d="M4 32 C36 62 68 65 100 43 C132 20 164 20 196 42 C228 64 250 62 276 45" opacity="0.5" />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {flow.map((item, index) => (
                        <div key={item.label} className="grid grid-cols-[28px_minmax(0,1fr)] gap-3 rounded-[9px] border border-[var(--ax-line)] bg-[var(--ax-surface)] p-3">
                          <div className="flex h-7 w-7 items-center justify-center rounded-[7px] bg-[var(--ax-accent-soft)] text-[10px] font-semibold text-[var(--ax-accent)]">{index + 1}</div>
                          <div><div className="text-[11px] font-semibold">{item.label}</div><div className="mt-1 text-[10px] leading-4 text-[var(--ax-text-soft)]">{item.detail}</div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-[var(--ax-line)] pt-4 text-[10px] text-[var(--ax-text-faint)]"><span>One Project context</span><span>Math · Notebook · Writer</span></div>
                </div>
              </div>
            </div>
          </section>
        </PageContainer>
      </PageSection>

      <section className="border-y border-[var(--ax-line)] bg-[var(--ax-surface)]">
        <PageContainer>
          <div className="grid gap-0 md:grid-cols-3">
            {[
              { icon: Sigma, title: "Compute", text: "Solve and visualize in focused scientific workspaces." },
              { icon: BookOpenText, title: "Reason", text: "Keep observations, code and evidence in one research trail." },
              { icon: FlaskConical, title: "Publish", text: "Move results into writing without breaking their scientific context." },
            ].map((item, index) => (
              <div key={item.title} className={`py-6 md:px-7 ${index ? 'md:border-l md:border-[var(--ax-line)]' : ''}`}>
                <item.icon className="h-4 w-4 text-[var(--ax-accent)]" />
                <div className="mt-3 text-sm font-semibold">{item.title}</div>
                <p className="mt-1 text-sm leading-6 text-[var(--ax-text-soft)]">{item.text}</p>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
