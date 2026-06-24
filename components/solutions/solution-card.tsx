import Link from "next/link";
import { ui } from "@/components/ui/styles";

type Solution = {
  id: string | number;
  title: string;
  summary: string;
  topic: string;
  difficulty: string;
  duration: string;
  tags: string[];
  groupTitle: string;
  groupSlug: string;
  status: string;
  accuracy: number;
  steps: number;
  updated: string;
};

export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <Link href={`/problems/${solution.groupSlug}`} className={`${ui.cardInteractive} flex min-h-[240px] flex-col justify-between p-5`}>
      <div>
        <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
          <div className="flex flex-wrap items-center gap-2">
            <StatusDot status={solution.status} />
            <span>{solution.topic}</span>
            <span>{solution.groupTitle}</span>
          </div>
          <span>{solution.accuracy}% score</span>
        </div>

        <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-[var(--color-text-strong)]">
          {solution.title}
        </h2>
        <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{solution.summary}</p>
      </div>

      <div className="mt-5 space-y-4 border-t border-[var(--color-line-soft)] pt-4">
        <div className="flex flex-wrap gap-2">
          {solution.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={ui.microBadge}>
              {tag}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--color-muted)]">
          <span>{solution.steps} steps</span>
          <span>{solution.difficulty}</span>
          <span>{solution.duration}</span>
          <span>Upd. {solution.updated}</span>
        </div>
      </div>
    </Link>
  );
}

function StatusDot({ status }: { status: string }) {
  const dotColor =
    status === "Verified"
      ? "bg-emerald-500"
      : status === "Draft"
        ? "bg-amber-500"
        : "bg-rose-500";

  return (
    <span className="inline-flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${dotColor}`} />
      <span>{status}</span>
    </span>
  );
}
