import Link from "next/link";
import { ui } from "@/components/ui/styles";

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
    <Link href={`/problems/${group.slug}`} className={`${ui.cardInteractive} flex min-h-[180px] flex-col justify-between p-5`}>
      <div>
        <div className="flex items-center justify-between gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]">
          <div className="flex flex-wrap items-center gap-2">
            <span>{group.topic}</span>
            <span>{group.difficulty}</span>
          </div>
          <span>{group.count} items</span>
        </div>

        <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-[var(--color-text-strong)]">
          {group.title}
        </h2>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-[var(--color-line-soft)] pt-4 text-sm text-[var(--color-muted)]">
        <div className="flex flex-wrap gap-3">
          <span>E: {group.easyCount}</span>
          <span>M: {group.mediumCount}</span>
          <span>H: {group.hardCount}</span>
        </div>
        <span aria-hidden="true">→</span>
      </div>
    </Link>
  );
}
