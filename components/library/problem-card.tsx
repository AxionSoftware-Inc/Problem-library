import Link from "next/link";
import { Badge } from "@/components/ui/primitives";
import { ui } from "@/components/ui/styles";
import type { ProblemModule } from "@/app/problems/problem-data";

export function ProblemCard({ problem }: { problem: ProblemModule }) {
  return (
    <Link href={`/problems/${problem.meta.slug}`} className={`${ui.cardInteractive} block p-6 sm:p-8`}>
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <Badge>{problem.meta.domain}</Badge>
            <Badge>{problem.meta.audience}</Badge>
            <Badge>{problem.meta.difficulty}</Badge>
          </div>

          <div>
            <p className={ui.overline}>Featured engineering case</p>
            <h2 className="mt-3 font-display text-3xl tracking-[-0.05em] text-[var(--color-text-strong)] sm:text-4xl">
              {problem.meta.title}
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
              {problem.meta.subtitle}
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-muted)]">
              {problem.story.whyItMatters}
            </p>
          </div>
        </div>

        <div className="grid content-start gap-4">
          <div className={ui.metricTile}>
            <p className={ui.caption}>Reading format</p>
            <p className="mt-3 text-lg font-semibold text-[var(--color-text-strong)]">
              {problem.meta.estimatedTime}
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
              Formula, calculation, graph va code bitta narrative ichida.
            </p>
          </div>

          <div className={ui.metricTile}>
            <p className={ui.caption}>Learning outcome</p>
            <p className="mt-3 text-lg font-semibold text-[var(--color-text-strong)]">
              {problem.meta.outcome}
            </p>
          </div>

          <div className="flex items-center justify-between rounded-[22px] border border-[var(--color-line-soft)] bg-white px-5 py-4 text-sm font-semibold text-[var(--color-text-strong)]">
            <span>Open case study</span>
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
