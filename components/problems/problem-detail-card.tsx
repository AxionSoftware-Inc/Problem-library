import { ui } from "@/components/ui/styles";

type ProblemDetailCardProps = {
  index: number;
  problem: {
    id: string | number;
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
  return (
    <article className={`${ui.flatCard} group flex h-full flex-col p-4 lg:p-4`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-light uppercase tracking-[0.18em] text-stone-400">
            <span className="font-medium tabular-nums text-stone-900">
              #{String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-stone-200">/</span>
            <span>{problem.topic}</span>
            <span className="text-stone-200">/</span>
            <span className="font-normal text-stone-600">{problem.difficulty}</span>
          </div>

          <h2 className="line-clamp-2 text-[15px] font-medium leading-5 tracking-[-0.02em] text-stone-900 transition-colors group-hover:text-stone-700">
            {problem.title}
          </h2>
        </div>

        <span className="shrink-0 rounded-md bg-stone-50 px-2 py-1 text-[10px] font-light tabular-nums text-stone-500">
          {problem.duration}
        </span>
      </div>

      <p className="mt-3 line-clamp-3 text-[11px] leading-[1.55] font-light text-stone-500">
        {problem.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-stone-100 pt-3">
        {problem.tags.map((tag) => (
          <span key={tag} className={ui.microBadge}>
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
