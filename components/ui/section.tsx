import type { ReactNode } from "react";
import { ui } from "./styles";

export function SectionFrame({
  children,
  tone = "default",
  className = "",
}: {
  children: ReactNode;
  tone?: "default" | "soft" | "muted";
  className?: string;
}) {
  const toneClass =
    tone === "soft" ? ui.panelSoft : tone === "muted" ? ui.panelMuted : ui.panel;

  return <section className={`${toneClass} ${className}`.trim()}>{children}</section>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className={ui.sectionHeader}>
        {eyebrow ? <p className={ui.overline}>{eyebrow}</p> : null}
        <h2 className={ui.titleSection}>{title}</h2>
        {description ? <p className={ui.body}>{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function StatTile({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
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
