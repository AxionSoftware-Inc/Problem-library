import type { ReactNode } from "react";
import { ui } from "./styles";

export function Badge({ children }: { children: ReactNode }) {
  return <span className={ui.badge}>{children}</span>;
}

export function StatCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className={`${ui.softCard} px-3 py-3`}>
      <p className="text-xl font-semibold tracking-[-0.04em] text-[#151f1a]">
        {value}
      </p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#81776b]">
        {label}
      </p>
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
    <div className="rounded-2xl border border-dashed border-[#cfc3b3] bg-white px-6 py-16 text-center">
      <p className="text-lg font-semibold tracking-[-0.025em] text-[#17231d]">
        {title}
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#756b5f]">
        {description}
      </p>
    </div>
  );
}
