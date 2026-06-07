import Link from "next/link";

type GroupCardProps = {
  group: {
    slug: string;
    title: string;
    topic: string;
    difficulty: string;
    count: number;
    easyCount: number;
    mediumCount: number;
    hardCount: number;
  };
};

export function GroupCard({ group }: GroupCardProps) {
  return (
    <Link
      href={`/problems/${group.slug}`}
      className="group flex flex-col justify-between p-4 bg-white border border-stone-100 transition-all duration-300 hover:border-stone-300 hover:shadow-[0_8px_24px_rgb(0,0,0,0.02)] rounded-sm min-h-[140px]"
    >
      {/* Yuqori qism: Meta ma'lumotlar va umumiy soni */}
      <div>
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-stone-400 font-light">
          <div className="flex items-center gap-1.5">
            <span>{group.topic}</span>
            <span className="text-stone-200">/</span>
            <span className="text-stone-600 font-medium">{group.difficulty}</span>
          </div>
          <span className="tabular-nums font-medium text-stone-500">{group.count} items</span>
        </div>

        {/* Sarlavha */}
        <h2 className="mt-2.5 text-sm font-medium tracking-tight text-stone-900 group-hover:text-stone-600 transition-colors line-clamp-2">
          {group.title}
        </h2>
      </div>

      {/* Pastki qism: Darajalar bo'yicha status raqamlari va o'q belgi */}
      <div className="mt-4 flex items-end justify-between border-t border-stone-50 pt-3">
        {/* Raqamli statuslar - o'ta toza va ixcham kombinatsiya */}
        <div className="flex items-center gap-3 text-[11px] tabular-nums">
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-500" />
            <span className="text-stone-400 font-light">E:</span>
            <span className="text-stone-700 font-medium">{group.easyCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-amber-500" />
            <span className="text-stone-400 font-light">M:</span>
            <span className="text-stone-700 font-medium">{group.mediumCount}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-rose-500" />
            <span className="text-stone-400 font-light">H:</span>
            <span className="text-stone-700 font-medium">{group.hardCount}</span>
          </div>
        </div>

        {/* Harakat belgisi */}
        <span className="text-stone-400 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-stone-900 text-xs shrink-0">
          →
        </span>
      </div>
    </Link>
  );
}