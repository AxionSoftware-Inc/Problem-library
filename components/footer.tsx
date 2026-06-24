import Link from "next/link";
import { ui } from "@/components/ui/styles";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/problems", label: "Problems" },
  { href: "/problems/led-design", label: "Featured case" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className={`${ui.container} grid gap-5 py-5 lg:grid-cols-[1.3fr_0.7fr]`}>
        <div className="space-y-2">
          <p className={ui.overline}>Problem Library</p>
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
            Professional scientific interface with centralized tokens, compact panels,
            and reusable workspace components.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <p className={ui.caption}>Navigation</p>
            <div className="flex flex-col gap-2 text-sm text-[var(--color-muted)]">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="transition hover:text-[var(--color-text-strong)]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className={ui.caption}>System</p>
            <div className="space-y-2 text-sm text-[var(--color-muted)]">
              <p>Theme tokens</p>
              <p>Component architecture</p>
              <p>Reusable layout shell</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
