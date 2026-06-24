import Link from "next/link";
import { ui } from "@/components/ui/styles";

type ProblemDetailCardProps = {
  index: number;
  problem: {
    id: string | number;
    group?: string;
    title: string;
    topic: string;
    difficulty: string;
    duration: string;
    summary: string;
    tags: string[];
  };
};

export function ProblemDetailCard({
  index,
  problem,
}: ProblemDetailCardProps) {
  const content = (
    <article className={`${ui.cardInteractive} grid h-full gap-4 p-4 lg:grid-cols-[80px_minmax(0,220px)_160px_minmax(0,1fr)_140px] lg:items-start`}>
      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
        #{String(index + 1).padStart(2, "0")}
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
          Topic
        </p>
        <p className="mt-1 text-sm font-medium text-[var(--color-text-strong)]">{problem.topic}</p>
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
          Difficulty
        </p>
        <p className="mt-1 text-sm font-medium text-[var(--color-text-strong)]">{problem.difficulty}</p>
      </div>

      <div>
        <h2 className="text-base font-semibold tracking-[-0.02em] text-[var(--color-text-strong)]">
          {problem.title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{problem.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {problem.tags.map((tag) => (
            <span key={tag} className={ui.microBadge}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">
          Duration
        </p>
        <p className="mt-1 text-sm font-medium text-[var(--color-text-strong)]">{problem.duration}</p>
      </div>
    </article>
  );

  if (!problem.group) {
    return content;
  }

  return <Link href={`/problems/${problem.group}`}>{content}</Link>;
}
