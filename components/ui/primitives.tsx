import type { ReactNode } from "react";
import { ui } from "./styles";

export function Badge({ children }: { children: ReactNode }) {
  return <span className={ui.badge}>{children}</span>;
}

export function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail?: string;
}) {
  return (
    <div className={ui.statTile}>
      <p className={ui.caption}>{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[var(--color-text-strong)]">
        {value}
      </p>
      {detail ? <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{detail}</p> : null}
    </div>
  );
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[var(--radius-panel)] border border-dashed border-[var(--color-line-strong)] bg-white/72 px-6 py-16 text-center">
      <p className="text-xl font-semibold tracking-[-0.03em] text-[var(--color-text-strong)]">
        {title}
      </p>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--color-muted)]">
        {description}
      </p>
    </div>
  );
}
