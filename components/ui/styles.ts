export const ui = {
  page: "relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]",
  pageAlt: "relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]",
  container: "mx-auto w-full max-w-[1520px] px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20",
  pageSection: "py-10 sm:py-12 lg:py-16",
  sectionGap: "space-y-4 sm:space-y-5",
  sectionHeader: "max-w-4xl space-y-2",
  overline:
    "text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-muted)]",
  titleHero:
    "text-4xl leading-tight tracking-[-0.05em] text-[var(--color-text-strong)] sm:text-5xl lg:text-6xl",
  titlePage:
    "text-3xl leading-tight tracking-[-0.04em] text-[var(--color-text-strong)] sm:text-4xl",
  titleSection:
    "text-2xl leading-tight tracking-[-0.03em] text-[var(--color-text-strong)] sm:text-[28px]",
  titleCard: "text-lg font-semibold tracking-[-0.02em] text-[var(--color-text-strong)]",
  lead: "text-base leading-7 text-[var(--color-muted)]",
  body: "text-sm leading-6 text-[var(--color-muted)] sm:text-[15px]",
  caption:
    "text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)]",
  heroSurface:
    "relative rounded-[var(--radius-hero)] border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[var(--shadow-hero)]",
  panel:
    "rounded-[var(--radius-panel)] border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[var(--shadow-panel)]",
  panelSoft:
    "rounded-[var(--radius-panel)] border border-[var(--color-line-soft)] bg-[var(--color-surface-soft)] shadow-[var(--shadow-soft)]",
  panelMuted:
    "rounded-[var(--radius-panel)] border border-[var(--color-line-soft)] bg-white",
  cardInteractive:
    "group rounded-[var(--radius-panel)] border border-[var(--color-line)] bg-[var(--color-surface)] shadow-[var(--shadow-soft)] transition-colors duration-150 hover:border-[var(--color-line-strong)]",
  glassBar:
    "border-b border-[var(--color-line)] bg-[rgba(243,246,250,0.98)]",
  badge:
    "inline-flex items-center rounded-md border border-[var(--color-line-soft)] bg-white px-2 py-1 text-[11px] font-medium text-[var(--color-muted)]",
  microBadge:
    "inline-flex items-center rounded-md border border-[var(--color-line-soft)] bg-[var(--color-surface-soft)] px-2 py-1 text-[10px] font-medium uppercase tracking-[0.08em] text-[var(--color-muted)]",
  statTile:
    "rounded-[10px] border border-[var(--color-line-soft)] bg-white p-4 shadow-[var(--shadow-soft)]",
  metricTile:
    "rounded-[10px] border border-[var(--color-line-soft)] bg-[var(--color-surface-soft)] p-4",
  buttonPrimary:
    "inline-flex h-10 items-center justify-center rounded-md border border-[var(--color-accent-strong)] bg-[var(--color-accent)] px-4 text-sm font-semibold text-white transition hover:bg-[#1d4ed8]",
  buttonSecondary:
    "inline-flex h-10 items-center justify-center rounded-md border border-[var(--color-line-strong)] bg-white px-4 text-sm font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-surface-soft)]",
  buttonGhost:
    "inline-flex h-10 items-center justify-center rounded-md border border-transparent px-3 text-sm font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-surface-soft)]",
  input:
    "h-10 w-full rounded-md border border-[var(--color-line-strong)] bg-white px-3 text-sm text-[var(--color-text-strong)] outline-none transition placeholder:text-[var(--color-muted)]/75 focus:border-[var(--color-accent-strong)] focus:ring-2 focus:ring-[var(--color-accent)]/15",
  textarea:
    "w-full rounded-md border border-[var(--color-line-strong)] bg-white px-3 py-3 text-sm text-[var(--color-text-strong)] outline-none transition placeholder:text-[var(--color-muted)]/75 focus:border-[var(--color-accent-strong)] focus:ring-2 focus:ring-[var(--color-accent)]/15",
  navLink:
    "rounded-md px-3 py-2 text-sm font-medium text-[var(--color-muted)] transition hover:bg-white hover:text-[var(--color-text-strong)]",
  navLinkActive:
    "rounded-md bg-white px-3 py-2 text-sm font-semibold text-[var(--color-text-strong)] shadow-[var(--shadow-soft)]",
  modalOverlay:
    "fixed inset-0 z-50 flex items-center justify-center bg-[rgba(18,29,24,0.45)] px-4",
  modalCard:
    "w-full max-w-2xl rounded-[14px] border border-[var(--color-line)] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.12)] sm:p-8",
  appHeader:
    "grid gap-4 rounded-[var(--radius-hero)] border border-[var(--color-line)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-panel)] lg:grid-cols-[1.25fr_0.75fr] lg:p-5",
  sectionStack: "grid gap-4 lg:gap-5",
  codePanel:
    "overflow-hidden rounded-[var(--radius-panel)] border border-[rgba(255,255,255,0.09)] bg-[#0f172a] text-stone-100 shadow-[0_8px_20px_rgba(15,23,42,0.18)]",
};
