"use client";

import { useState } from "react";
import type {
  CalculationEntry,
  CodeSample,
  FormulaEntry,
  GraphSeries,
  ProblemModule,
} from "@/app/problems/problem-data";
import { Badge } from "@/components/ui/primitives";
import { SectionFrame, SectionHeading } from "@/components/ui/section";
import { ui } from "@/components/ui/styles";

export function ProblemNarrative({ problem }: { problem: ProblemModule }) {
  return (
    <section className="border border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="border-b border-[var(--color-line)] px-4 py-3 sm:px-5">
        <p className={ui.overline}>Problem file</p>
      </div>

      <div className="grid gap-4 px-4 py-4 sm:px-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge>{problem.meta.domain}</Badge>
            <Badge>{problem.meta.audience}</Badge>
            <Badge>{problem.meta.difficulty}</Badge>
          </div>

          <div>
            <h1 className="text-3xl leading-tight tracking-[-0.04em] text-[var(--color-text-strong)] sm:text-4xl">
              {problem.meta.title}
            </h1>
            <p className="mt-3 max-w-4xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
              {problem.meta.subtitle}
            </p>
          </div>

          <div className="grid gap-3 border-t border-[var(--color-line-soft)] pt-4 lg:grid-cols-3">
            <InfoBlock label="Overview" text={problem.story.overview} />
            <InfoBlock label="Origin" text={problem.story.origin} />
            <InfoBlock label="Impact" text={problem.story.impact} />
          </div>
        </div>

        <aside className="border border-[var(--color-line-soft)] bg-[var(--color-surface-soft)]">
          <div className="border-b border-[var(--color-line-soft)] px-4 py-3">
            <p className={ui.caption}>Quick summary</p>
          </div>
          <div className="grid gap-0">
            <MetricRow label="Difficulty" value={problem.meta.difficulty} />
            <MetricRow label="Read time" value={problem.meta.estimatedTime} />
            <MetricRow label="Outcome" value={problem.meta.outcome} />
            <MetricRow label="Why it matters" value={problem.story.whyItMatters} multiline />
          </div>
        </aside>
      </div>
    </section>
  );
}

export function ProblemStory({ problem }: { problem: ProblemModule }) {
  return (
    <SectionFrame className="p-4 sm:p-5">
      <SectionHeading
        eyebrow="Context"
        title="Learning objective and operating context"
        description="This section fixes the target outcome and the practical scenario before moving into formulas and calculations."
      />
      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <InfoBlock label="Learning objective" text={problem.meta.outcome} />
        <InfoBlock label="Context" text={problem.story.origin} />
      </div>
    </SectionFrame>
  );
}

export function ProvenanceSection({ problem }: { problem: ProblemModule }) {
  return (
    <SectionFrame className="p-4 sm:p-5">
      <SectionHeading
        eyebrow="Provenance"
        title="Source model"
        description="Each content type is tied back to what it is supposed to prove or explain."
      />
      <div className="mt-4 grid gap-3 lg:grid-cols-3">
        <InfoBlock label="Formula source" text={problem.provenance.formulaSource} />
        <InfoBlock label="Code purpose" text={problem.provenance.codePurpose} />
        <InfoBlock label="Graph meaning" text={problem.provenance.graphMeaning} />
      </div>
    </SectionFrame>
  );
}

export function ConstraintList({ constraints }: { constraints: string[] }) {
  return (
    <SectionFrame className="p-4 sm:p-5">
      <SectionHeading
        eyebrow="Constraints"
        title="Engineering constraints"
        description="Non-negotiable limits that shape the design and validation path."
      />
      <div className="mt-4 overflow-hidden border border-[var(--color-line-soft)]">
        {constraints.map((constraint, index) => (
          <div
            key={constraint}
            className={`grid gap-3 px-4 py-3 text-sm leading-6 text-[var(--color-muted)] sm:grid-cols-[120px_minmax(0,1fr)] ${
              index !== constraints.length - 1 ? "border-b border-[var(--color-line-soft)]" : ""
            }`}
          >
            <div className="font-semibold text-[var(--color-text-strong)]">C{index + 1}</div>
            <div>{constraint}</div>
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}

export function FormulaSection({ formulas }: { formulas: FormulaEntry[] }) {
  return (
    <SectionFrame className="p-4 sm:p-5">
      <SectionHeading
        eyebrow="Formula set"
        title="Formula definitions"
        description="Definitions are shown as compact technical records rather than decorative cards."
      />
      <div className="mt-4 grid gap-3">
        {formulas.map((item) => (
          <article key={item.label} className="border border-[var(--color-line-soft)] bg-[var(--color-surface)]">
            <div className="grid gap-4 px-4 py-4 lg:grid-cols-[220px_minmax(0,1fr)_220px]">
              <div>
                <p className={ui.caption}>{item.label}</p>
                <p className="mt-2 font-mono text-lg text-[var(--color-text-strong)]">{item.expression}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{item.units}</p>
              </div>
              <div>
                <p className="text-sm leading-6 text-[var(--color-muted)]">{item.meaning}</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <TextPair label="Origin" text={item.origin} />
                  <TextPair label="Interpretation" text={item.interpretation} />
                </div>
              </div>
              <TextPair label="Use case" text={item.useCase} />
            </div>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}

export function CalculationSection({
  calculations,
}: {
  calculations: CalculationEntry[];
}) {
  return (
    <SectionFrame className="p-4 sm:p-5">
      <SectionHeading
        eyebrow="Calculation path"
        title="Worked calculations"
        description="Each worked block isolates inputs, formula, and output so review is faster."
      />
      <div className="mt-4 grid gap-3">
        {calculations.map((item) => (
          <article key={item.title} className="border border-[var(--color-line-soft)] bg-[var(--color-surface)]">
            <div className="grid gap-4 px-4 py-4 lg:grid-cols-[minmax(0,1fr)_240px]">
              <div className="space-y-4">
                <div>
                  <p className={ui.caption}>Calculation</p>
                  <h3 className="mt-2 text-lg font-semibold tracking-[-0.02em] text-[var(--color-text-strong)]">
                    {item.title}
                  </h3>
                </div>

                <dl className="grid gap-0 overflow-hidden border border-[var(--color-line-soft)]">
                  {Object.entries(item.inputs).map(([label, value], index, entries) => (
                    <div
                      key={label}
                      className={`grid gap-2 px-4 py-3 sm:grid-cols-[220px_minmax(0,1fr)] ${
                        index !== entries.length - 1 ? "border-b border-[var(--color-line-soft)]" : ""
                      }`}
                    >
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
                        {label}
                      </dt>
                      <dd className="text-sm font-medium text-[var(--color-text-strong)]">{value}</dd>
                    </div>
                  ))}
                </dl>

                <div className="border border-[var(--color-line-soft)] bg-[var(--color-surface-soft)] px-4 py-3">
                  <p className={ui.caption}>Formula</p>
                  <p className="mt-2 font-mono text-sm leading-6 text-[var(--color-text-strong)]">
                    {item.formula}
                  </p>
                </div>
              </div>

              <div className="border border-[var(--color-line-soft)] bg-[#0f172a] px-4 py-4 text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">
                  Output
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.04em]">{item.result}</p>
                <p className="mt-3 text-sm leading-6 text-white/72">{item.note}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SectionFrame>
  );
}

export function GraphSection({
  title,
  description,
  xLabel,
  yLabel,
  series,
}: {
  title: string;
  description: string;
  xLabel: string;
  yLabel: string;
  series: GraphSeries[];
}) {
  const minX = Math.min(...series.flatMap((item) => item.points.map((point) => point.x)));
  const maxX = Math.max(...series.flatMap((item) => item.points.map((point) => point.x)));
  const minY = Math.min(...series.flatMap((item) => item.points.map((point) => point.y)));
  const maxY = Math.max(...series.flatMap((item) => item.points.map((point) => point.y)));
  const width = 720;
  const height = 320;
  const pad = 44;

  const scaleX = (value: number) =>
    pad + ((value - minX) / Math.max(1, maxX - minX)) * (width - pad * 2);
  const scaleY = (value: number) =>
    height - pad - ((value - minY) / Math.max(1, maxY - minY)) * (height - pad * 2);

  return (
    <SectionFrame className="p-4 sm:p-5">
      <SectionHeading eyebrow="Data view" title={title} description={description} />
      <div className="mt-4 border border-[var(--color-line-soft)] bg-white p-3">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
          <line x1={pad} y1={height - pad} x2={width - pad} y2={height - pad} stroke="#94a3b8" />
          <line x1={pad} y1={pad} x2={pad} y2={height - pad} stroke="#94a3b8" />
          {series.map((item) => {
            const path = item.points
              .map((point, index) => `${index === 0 ? "M" : "L"} ${scaleX(point.x)} ${scaleY(point.y)}`)
              .join(" ");

            return (
              <g key={item.name}>
                <path d={path} fill="none" stroke={item.color} strokeWidth="2.5" strokeLinejoin="round" />
                {item.points.map((point) => (
                  <circle
                    key={`${item.name}-${point.x}`}
                    cx={scaleX(point.x)}
                    cy={scaleY(point.y)}
                    r="3.5"
                    fill={item.color}
                  />
                ))}
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
        <div className="text-sm text-[var(--color-muted)]">
          {xLabel} | {yLabel}
        </div>
        <div className="flex flex-wrap gap-2">
          {series.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2 rounded-md border border-[var(--color-line-soft)] bg-white px-2 py-1 text-[11px] font-medium text-[var(--color-muted)]"
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}

export function CodeSection({ samples }: { samples: CodeSample[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSample = samples[activeIndex] ?? samples[0];

  return (
    <SectionFrame className="p-4 sm:p-5">
      <SectionHeading
        eyebrow="Automation"
        title="Reference code"
        description="Code is presented as a working technical artifact rather than a showcase block."
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {samples.map((sample, index) => (
          <button
            key={sample.filename}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={index === activeIndex ? ui.buttonPrimary : ui.buttonSecondary}
          >
            {sample.filename}
          </button>
        ))}
      </div>

      <article className={`${ui.codePanel} mt-4`}>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-xs text-white/62">
          <span>{activeSample.filename}</span>
          <span>{activeSample.language}</span>
        </div>

        <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <p className="mb-3 text-sm leading-6 text-white/64">{activeSample.summary}</p>
            <pre className="overflow-x-auto text-sm leading-6 text-stone-100">
              <code>{activeSample.code}</code>
            </pre>
          </div>

          <div className="border border-white/10 bg-white/5 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/60">
              Output
            </p>
            <pre className="mt-3 whitespace-pre-wrap font-mono text-sm leading-6 text-emerald-200">
              {activeSample.output}
            </pre>
          </div>
        </div>
      </article>
    </SectionFrame>
  );
}

export function NotesSection({ notes }: { notes: string[] }) {
  return (
    <SectionFrame className="p-4 sm:p-5">
      <SectionHeading
        eyebrow="Summary"
        title="Conclusions and next steps"
        description="Final notes are listed as operational takeaways."
      />
      <div className="mt-4 overflow-hidden border border-[var(--color-line-soft)]">
        {notes.map((note, index) => (
          <div
            key={note}
            className={`px-4 py-3 text-sm leading-6 text-[var(--color-muted)] ${
              index !== notes.length - 1 ? "border-b border-[var(--color-line-soft)]" : ""
            }`}
          >
            {note}
          </div>
        ))}
      </div>
    </SectionFrame>
  );
}

function MetricRow({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div className="border-b border-[var(--color-line-soft)] px-4 py-3 last:border-b-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
        {label}
      </p>
      <p className={`mt-1 text-sm text-[var(--color-text-strong)] ${multiline ? "leading-6" : "font-medium"}`}>
        {value}
      </p>
    </div>
  );
}

function InfoBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="border border-[var(--color-line-soft)] bg-[var(--color-surface-soft)] px-4 py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{text}</p>
    </div>
  );
}

function TextPair({ label, text }: { label: string; text: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{text}</p>
    </div>
  );
}
