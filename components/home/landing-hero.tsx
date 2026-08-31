import { ArrowRight, BookOpenText, FileText, FlaskConical, Sigma } from "lucide-react";

import { AxActionLink } from "@/components/axion";
import { ScienceHeroScene } from "@/components/home/science-hero-scene";
import { PageContainer } from "@/components/ui/page-shell";

function ProjectPreview() {
  return (
    <div className="overflow-hidden rounded-[18px] border border-[var(--ax-line)] bg-[var(--ax-surface)] shadow-[var(--ax-shadow-floating)]">
      <div className="flex h-10 items-center justify-between border-b border-[var(--ax-line)] px-4 text-[10px] text-[var(--ax-text-faint)]"><span>Project · Turbulence Study</span><span>Local · active</span></div>
      <div className="grid min-h-[520px] lg:grid-cols-[205px_minmax(0,1fr)]">
        <aside className="border-b border-[var(--ax-line)] bg-[var(--ax-surface-soft)] p-5 lg:border-b-0 lg:border-r">
          <div className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--ax-text-faint)]">Project</div>
          <div className="mt-4 space-y-1.5 text-[11px] font-semibold text-[var(--ax-text-soft)]">
            {['Overview', 'Calculations', 'Notebook', 'Documents', 'Activity'].map((item, index) => (
              <div key={item} className={`rounded-[7px] px-3 py-2.5 ${index === 0 ? 'bg-[var(--ax-surface)] text-[var(--ax-text)] shadow-[0_1px_2px_rgb(23_36_54_/_0.05)]' : ''}`}>{item}</div>
            ))}
          </div>
          <div className="mt-8 border-t border-[var(--ax-line)] pt-5 text-[10px] leading-5 text-[var(--ax-text-faint)]">One research context<br />Three focused instruments<br />Local by default</div>
        </aside>

        <div className="p-5 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-4 border-b border-[var(--ax-line)] pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[var(--ax-accent)]">Research project</p><h3 className="mt-2 font-[family-name:var(--ax-font-display)] text-[36px] tracking-[-0.04em]">Turbulence Study</h3><p className="mt-2 text-[12px] text-[var(--ax-text-soft)]">A connected trail from model to publication.</p></div>
            <div className="text-[10px] font-semibold text-[var(--ax-text-faint)]">5 objects · 3 instruments</div>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[10px] border border-[var(--ax-line)] bg-[var(--ax-surface-soft)] p-5">
              <div className="flex items-center justify-between"><span className="text-[9px] uppercase tracking-[0.12em] text-[var(--ax-text-faint)]">Latest scientific object</span><span className="text-[9px] font-semibold text-[var(--ax-accent)]">Math</span></div>
              <div className="mt-5 font-[family-name:var(--ax-font-display)] text-[23px]">∂u/∂t + u·∇u = −∇p + ν∇²u</div>
              <svg viewBox="0 0 360 170" className="mt-5 h-[170px] w-full" aria-hidden="true">
                <g fill="none" stroke="#7fa9df" strokeWidth="1.2" opacity="0.72">
                  <path d="M6 84 C48 34 93 35 135 84 C177 132 220 132 263 84 C305 36 333 47 354 67" />
                  <path d="M6 105 C49 63 92 62 134 91 C177 121 219 118 262 84 C305 50 333 55 354 89" opacity="0.62" />
                  <path d="M6 63 C49 104 92 109 135 82 C178 55 219 55 262 82 C305 109 332 105 354 83" opacity="0.46" />
                </g>
              </svg>
            </div>

            <div className="space-y-3">
              {[['01','Math','Compute and visualize.'],['02','Notebook','Reason and observe.'],['03','Writer','Publish the finding.']].map(([step,title,text], index) => (
                <div key={title} className="grid grid-cols-[38px_minmax(0,1fr)] gap-3 rounded-[10px] border border-[var(--ax-line)] bg-[var(--ax-surface)] p-4">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-[8px] text-[10px] font-semibold ${index === 0 ? 'bg-[var(--ax-accent-soft)] text-[var(--ax-accent)]' : 'bg-[var(--ax-surface-soft)] text-[var(--ax-text-faint)]'}`}>{step}</div>
                  <div><div className="font-[family-name:var(--ax-font-display)] text-[21px] tracking-[-0.03em]">{title}</div><div className="mt-1 text-[11px] leading-5 text-[var(--ax-text-soft)]">{text}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LandingHero() {
  return (
    <>
      <PageContainer>
        <section className="relative grid min-h-[620px] items-center gap-6 overflow-hidden pb-8 pt-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-0 lg:pb-5 lg:pt-5">
          <div className="relative z-10 max-w-[570px] py-10 lg:py-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--ax-accent)]">Axion Science · one project, many instruments</p>
            <h1 className="mt-4 font-[family-name:var(--ax-font-display)] text-[clamp(3.75rem,5.9vw,6.8rem)] font-medium leading-[0.92] tracking-[-0.058em] text-[var(--ax-text)]">Science,<br />kept <span className="italic">connected.</span></h1>
            <div className="mt-7 flex items-center gap-2" aria-hidden="true"><span className="h-[3px] w-16 rounded-full bg-[var(--ax-accent)]" /><span className="h-1.5 w-1.5 rounded-full bg-[#9b8cf0]" /></div>
            <p className="mt-6 max-w-[480px] text-[17px] leading-8 text-[var(--ax-text-soft)] sm:text-[18px]">Move from computation to reasoning to publication without rebuilding context every time the scientific instrument changes.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3"><AxActionLink href="/projects" variant="primary">Open Projects <ArrowRight className="h-4 w-4" /></AxActionLink><AxActionLink href="#product" variant="quiet">Explore the product <ArrowRight className="h-3.5 w-3.5 text-[var(--ax-text-faint)]" /></AxActionLink></div>
          </div>
          <div className="relative min-w-0 lg:-ml-14 lg:-mr-8 xl:-ml-20 xl:-mr-12"><ScienceHeroScene /></div>
        </section>
      </PageContainer>

      <section className="border-y border-[var(--ax-line)] bg-[var(--ax-surface)]"><PageContainer><div className="grid md:grid-cols-3 md:divide-x md:divide-[var(--ax-line)]">{[["Compute","Solve and visualize in focused scientific instruments."],["Reason","Keep observations, models and evidence in the research trail."],["Publish","Turn the same evidence into a clear scientific document."]].map(([title,text]) => <div key={title} className="border-b border-[var(--ax-line)] py-7 last:border-b-0 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0"><div className="font-[family-name:var(--ax-font-display)] text-[24px] tracking-[-0.035em]">{title}</div><p className="mt-2 max-w-sm text-[13px] leading-6 text-[var(--ax-text-soft)]">{text}</p></div>)}</div></PageContainer></section>

      <section id="product" className="py-20 md:py-24 lg:py-28"><PageContainer><div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"><div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--ax-accent)]">The product</p><h2 className="mt-4 max-w-[650px] font-[family-name:var(--ax-font-display)] text-[clamp(2.8rem,4.2vw,5.1rem)] leading-[0.98] tracking-[-0.05em]">One Project for the entire scientific trail.</h2></div><p className="max-w-[650px] text-[16px] leading-8 text-[var(--ax-text-soft)] lg:justify-self-end">Projects hold the context while each instrument stays focused on its job. The computation, reasoning and manuscript remain connected instead of becoming isolated files and screenshots.</p></div><div className="mt-12"><ProjectPreview /></div></PageContainer></section>

      <section id="workflow" className="border-y border-[var(--ax-line)] bg-[var(--ax-surface)] py-20 md:py-24"><PageContainer><div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--ax-accent)]">Scientific workflow</p><h2 className="mt-4 font-[family-name:var(--ax-font-display)] text-[clamp(2.8rem,4vw,4.7rem)] leading-[1] tracking-[-0.05em]">From question to publication without resetting the context.</h2><p className="mt-5 max-w-[450px] text-[15px] leading-7 text-[var(--ax-text-soft)]">The Project is the stable home. Instruments come and go around the work without owning the research itself.</p></div><div className="divide-y divide-[var(--ax-line)] border-y border-[var(--ax-line)]">{[["01","Question","Define the scientific problem and its context."],["02","Model","Represent assumptions, equations and structure."],["03","Math","Compute, solve and visualize the result."],["04","Notebook","Interpret observations and develop the finding."],["05","Writer","Turn evidence and reasoning into publication."]].map(([step,title,text]) => <div key={step} className="grid gap-3 py-5 sm:grid-cols-[60px_150px_1fr] sm:items-center"><div className="font-[family-name:var(--ax-font-display)] text-[18px] text-[var(--ax-text-faint)]">{step}</div><div className="font-[family-name:var(--ax-font-display)] text-[25px] tracking-[-0.035em]">{title}</div><div className="text-[12px] leading-6 text-[var(--ax-text-soft)]">{text}</div></div>)}</div></div></PageContainer></section>

      <section id="capabilities" className="py-20 md:py-24 lg:py-28"><PageContainer><div className="max-w-[780px]"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--ax-accent)]">Foundation</p><h2 className="mt-4 font-[family-name:var(--ax-font-display)] text-[clamp(2.9rem,4.4vw,5.2rem)] leading-[0.98] tracking-[-0.05em]">Simple by default. Serious underneath.</h2></div><div className="mt-14 divide-y divide-[var(--ax-line)] border-y border-[var(--ax-line)]">
        <article className="grid gap-8 py-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:py-14"><div><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ax-text-faint)]">01 · Local first</div><h3 className="mt-3 font-[family-name:var(--ax-font-display)] text-[34px] tracking-[-0.04em]">Ordinary scientific work should not wait for a compute server.</h3><p className="mt-4 max-w-[480px] text-sm leading-7 text-[var(--ax-text-soft)]">Projects and normal computation can live on the user device. Shared infrastructure stays optional until collaboration actually needs it.</p></div><div className="lg:border-l lg:border-[var(--ax-line)] lg:pl-12">{[["Storage","This device"],["Computation","Browser / local execution"],["Account","Not required for local work"],["Sync","Optional future layer"]].map(([label,value]) => <div key={label} className="grid grid-cols-[120px_1fr] border-b border-[var(--ax-line)] py-3 text-[12px]"><span className="text-[var(--ax-text-faint)]">{label}</span><span className="font-semibold">{value}</span></div>)}</div></article>
        <article className="grid gap-8 py-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:py-14"><div className="order-2 grid gap-3 sm:grid-cols-2 lg:order-1">{['Calculation','Visualization','Notebook','Finding','Document','Dataset'].map(item => <div key={item} className="border-t border-[var(--ax-line)] py-4 font-[family-name:var(--ax-font-display)] text-[22px] tracking-[-0.03em]">{item}</div>)}</div><div className="order-1 lg:order-2 lg:pl-10"><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ax-text-faint)]">02 · Object native</div><h3 className="mt-3 font-[family-name:var(--ax-font-display)] text-[34px] tracking-[-0.04em]">Keep scientific results as objects, not screenshots.</h3><p className="mt-4 max-w-[470px] text-sm leading-7 text-[var(--ax-text-soft)]">A calculation can remain structured and traceable as it moves into reasoning, visualization and publication.</p></div></article>
        <article className="grid gap-8 py-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:py-14"><div><div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ax-text-faint)]">03 · Open exit</div><h3 className="mt-3 font-[family-name:var(--ax-font-display)] text-[34px] tracking-[-0.04em]">The research should never be trapped in the product.</h3><p className="mt-4 max-w-[480px] text-sm leading-7 text-[var(--ax-text-soft)]">Standard scientific and publishing formats remain part of the product philosophy from the beginning.</p></div><div className="grid gap-3 sm:grid-cols-2 lg:border-l lg:border-[var(--ax-line)] lg:pl-12">{['ipynb · JSON · CSV','LaTeX · BibTeX','SVG · PNG · PDF','DOCX · project bundle'].map(item => <div key={item} className="border-t border-[var(--ax-line)] py-4 font-mono text-[12px] text-[var(--ax-text-soft)]">{item}</div>)}</div></article>
      </div></PageContainer></section>

      <section id="ecosystem" className="border-y border-[var(--ax-line)] bg-[var(--ax-surface)] py-20 md:py-24 lg:py-28"><PageContainer><div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center"><div><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--ax-accent)]">One ecosystem</p><h2 className="mt-4 font-[family-name:var(--ax-font-display)] text-[clamp(2.8rem,4.2vw,5rem)] leading-[1] tracking-[-0.05em]">Different instruments. One research context.</h2><p className="mt-5 max-w-[510px] text-[15px] leading-7 text-[var(--ax-text-soft)]">Each application has one clear job. The Project keeps them from becoming disconnected islands.</p></div><div className="grid md:grid-cols-3">{[{step:'01',title:'Math',text:'Compute and visualize.',icon:Sigma},{step:'02',title:'Notebook',text:'Reason and observe.',icon:BookOpenText},{step:'03',title:'Writer',text:'Publish the work.',icon:FileText}].map((item,index)=><div key={item.title} className={`relative border-t border-[var(--ax-line)] py-6 md:border-t-0 md:px-7 ${index?'md:border-l':''}`}><div className="flex items-center justify-between"><item.icon className="h-5 w-5 text-[var(--ax-accent)]" /><span className="font-[family-name:var(--ax-font-display)] text-[18px] text-[var(--ax-text-faint)]">{item.step}</span></div><div className="mt-8 font-[family-name:var(--ax-font-display)] text-[28px] tracking-[-0.04em]">{item.title}</div><p className="mt-2 text-[12px] leading-6 text-[var(--ax-text-soft)]">{item.text}</p>{index<2?<ArrowRight className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-[var(--ax-text-faint)] md:block" />:null}</div>)}</div></div></PageContainer></section>

      <section className="py-24 md:py-32"><PageContainer><div className="mx-auto max-w-[980px] text-center"><p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--ax-accent)]">Axion Science</p><h2 className="mt-5 font-[family-name:var(--ax-font-display)] text-[clamp(3rem,5.2vw,6.2rem)] leading-[0.95] tracking-[-0.055em]">Scientific work without the broken <span className="italic">handoffs.</span></h2><p className="mx-auto mt-6 max-w-[630px] text-[16px] leading-8 text-[var(--ax-text-soft)]">Start a Project locally, choose the instrument you need and keep the research trail connected from computation to publication.</p><AxActionLink href="/projects" variant="primary" className="mt-8">Open Projects <ArrowRight className="h-4 w-4" /></AxActionLink></div></PageContainer></section>
    </>
  );
}
