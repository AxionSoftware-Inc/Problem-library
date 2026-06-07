import Link from "next/link";

type Solution = {
  id: string | number;
  title: string;
  summary: string;
  topic: string;
  difficulty: string;
  duration: string;
  tags: string[];
  groupTitle: string;
  status: string;
  accuracy: number;
  steps: number;
  updated: string;
};

export function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <Link
      href={`/solutions/${solution.id}`}
      className="group flex flex-col justify-between p-4 bg-white border border-stone-100 transition-all duration-300 hover:border-stone-300 hover:shadow-[0_8px_24px_rgb(0,0,0,0.02)] rounded-sm min-h-[220px]"
    >
      {/* Yuqori qism: Status, Fan va Toʻplam nomi */}
      <div>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-stone-400 font-light">
          <div className="flex items-center gap-1.5">
            <StatusDot status={solution.status} />
            <span>{solution.topic}</span>
            <span className="text-stone-200">/</span>
            <span className="text-stone-600 font-medium truncate max-w-[120px]">{solution.groupTitle}</span>
          </div>
          <span className="tabular-nums font-medium text-stone-900 text-xs">{solution.accuracy}% score</span>
        </div>

        {/* Sarlavha */}
        <h2 className="mt-2.5 text-sm font-medium tracking-tight text-stone-900 group-hover:text-stone-600 transition-colors line-clamp-1">
          {solution.title}
        </h2>

        {/* Qisqa Tavsif */}
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-stone-400 font-light">
          {solution.summary}
        </p>

        {/* Teglar (Tags) - Kichik va yengil */}
        <div className="mt-3 flex flex-wrap gap-1">
          {solution.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="px-1.5 py-0.5 bg-stone-50 text-stone-500 rounded-sm text-[9px] font-light tracking-wide uppercase border border-stone-100/50"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Pastki qism: Metrikalar va Yangilanish vaqti */}
      <div className="mt-4 flex items-end justify-between border-t border-stone-50 pt-3">
        {/* Metrikalar - Zich va bir qatorda */}
        <div className="flex items-center gap-4 text-[11px] tabular-nums text-stone-500">
          <div>
            <span className="text-stone-400 font-light">Steps:</span>{" "}
            <span className="font-medium text-stone-700">{solution.steps}</span>
          </div>
          <div>
            <span className="text-stone-400 font-light">Level:</span>{" "}
            <span className="font-medium text-stone-700">{solution.difficulty}</span>
          </div>
          <div>
            <span className="text-stone-400 font-light">Time:</span>{" "}
            <span className="font-medium text-stone-700">{solution.duration}</span>
          </div>
        </div>

        {/* Sana yoki Yoʻnalish oʻqi */}
        <div className="flex items-center gap-2 text-[10px] text-stone-400 font-light">
          <span className="hidden sm:inline">Upd. {solution.updated}</span>
          <span className="text-stone-400 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-stone-900 text-xs shrink-0">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

{/* Katta nishonlar (badge) oʻrniga oʻta ixcham premium status nuqtasi */}
export function StatusDot({ status }: { status: string }) {
  const dotColor =
    status === "Verified"
      ? "bg-emerald-500"
      : status === "Draft"
        ? "bg-amber-500"
        : "bg-rose-500";

  return (
    <div className="flex items-center gap-1.5 pr-1">
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span className="text-stone-600 font-normal">{status}</span>
    </div>
  );
}