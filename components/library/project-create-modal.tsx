"use client";

import { ui } from "@/components/ui/styles";

type ProjectForm = {
  title: string;
  topic: string;
  difficulty: string;
  description: string;
};

export function ProjectCreateModal({
  open,
  form,
  message,
  saving,
  onClose,
  onChange,
  onSubmit,
}: {
  open: boolean;
  form: ProjectForm;
  message: string;
  saving: boolean;
  onClose: () => void;
  onChange: (field: keyof ProjectForm, value: string) => void;
  onSubmit: () => void;
}) {
  if (!open) {
    return null;
  }

  return (
    <div className={ui.modalOverlay}>
      <div className={ui.modalCard}>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3">
            <p className={ui.overline}>New project</p>
            <h2 className="font-display text-3xl tracking-[-0.05em] text-[var(--color-text-strong)]">
              Yangi case yoki project yarating
            </h2>
            <p className="max-w-xl text-sm leading-7 text-[var(--color-muted)]">
              Shu modal ham umumiy design system bilan qurilgan: input, radius, shadow va
              action button lar markazlashgan.
            </p>
          </div>
          <button type="button" onClick={onClose} className={ui.buttonGhost}>
            Close
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 sm:col-span-2">
            <span className={ui.caption}>Project title</span>
            <input
              value={form.title}
              onChange={(event) => onChange("title", event.target.value)}
              placeholder="LED power optimization"
              className={ui.input}
            />
          </label>

          <label className="space-y-2">
            <span className={ui.caption}>Topic</span>
            <input
              value={form.topic}
              onChange={(event) => onChange("topic", event.target.value)}
              placeholder="Electronics"
              className={ui.input}
            />
          </label>

          <label className="space-y-2">
            <span className={ui.caption}>Difficulty</span>
            <select
              value={form.difficulty}
              onChange={(event) => onChange("difficulty", event.target.value)}
              className={ui.input}
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className={ui.caption}>Description</span>
            <textarea
              value={form.description}
              onChange={(event) => onChange("description", event.target.value)}
              placeholder="Bu project nimani o‘rgatadi, qanday natija beradi?"
              rows={5}
              className={ui.textarea}
            />
          </label>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--color-muted)]">{message}</p>
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className={ui.buttonSecondary}>
              Bekor qilish
            </button>
            <button type="button" onClick={onSubmit} disabled={saving} className={ui.buttonPrimary}>
              {saving ? "Creating..." : "Create project"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
