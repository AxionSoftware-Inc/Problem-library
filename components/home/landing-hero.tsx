import { ArrowRight, BookOpenText, FlaskConical, Sigma } from "lucide-react";

import { AxActionLink } from "@/components/axion";
import { ScienceHeroScene } from "@/components/home/science-hero-scene";
import { PageContainer } from "@/components/ui/page-shell";

export function LandingHero() {
  return (
    <>
      <PageContainer>
        <section className="relative grid min-h-[600px] items-center gap-4 overflow-hidden pb-6 pt-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-0 lg:pb-4 lg:pt-4">
          <div className="relative z-10 max-w-[560px] py-8 lg:py-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--ax-accent)]">Axion Science · one project, many instruments</p>
            <h1 className="mt-4 font-serif text-[clamp(3.65rem,5.9vw,6.65rem)] font-medium leading-[0.92] tracking-[-0.058em] text-[var(--ax-text)]">
              Science,
              <br />
              kept <span className="italic">connected.</span>
            </h1>
            <div className="mt-7 flex items-center gap-2" aria-hidden="true"><span className="h-[3px] w-16 rounded-full bg-[var(--ax-accent)]" /><span className="h-1.5 w-1.5 rounded-full bg-[#9b8cf0]" /></div>
            <p className="mt-6 max-w-[470px] text-[17px] leading-8 text-[var(--ax-text-soft)] sm:text-[18px]">Move from computation to reasoning to publication without rebuilding context every time the scientific instrument changes.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <AxActionLink href="/projects" variant="primary">Start a project <ArrowRight className="h-4 w-4" /></AxActionLink>
              <AxActionLink href="/problems" variant="quiet">Explore examples <ArrowRight className="h-3.5 w-3.5 text-[var(--ax-text-faint)]" /></AxActionLink>
            </div>
          </div>
          <div className="relative min-w-0 lg:-ml-14 lg:-mr-12 xl:-ml-20 xl:-mr-20"><ScienceHeroScene /></div>
        </section>
      </PageContainer>

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
