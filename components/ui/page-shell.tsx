import type { ReactNode } from "react";
import { ui } from "./styles";

export function PageShell({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "alt";
}) {
  return <main className={tone === "alt" ? ui.pageAlt : ui.page}>{children}</main>;
}

export function PageContainer({ children }: { children: ReactNode }) {
  return <div className={ui.container}>{children}</div>;
}
