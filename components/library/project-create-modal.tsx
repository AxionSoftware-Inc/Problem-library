"use client";

import { AxButton, AxField, AxInput, AxSelect, AxTextarea } from "@/components/axion";

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
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgb(15_23_42_/_0.28)] px-4 py-8 backdrop-blur-[3px]" role="dialog" aria-modal="true" aria-labelledby="new-project-title">
      <div className="w-full max-w-[680px] overflow-hidden rounded-[var(--ax-work-panel-radius)] border border-[var(--ax-work-line)] bg-[var(--ax-surface)] shadow-[0_24px_80px_rgb(15_23_42_/_0.16)]">
        <div className="grid gap-5 border-b border-[var(--ax-work-line)] px-5 py-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:px-6 sm:py-6">
          <div>
            <p className="ax-work-kicker">New project</p>
            <h2 id="new-project-title" className="mt-2 font-[family-name:var(--ax-font-display)] text-[32px] font-medium tracking-[-0.045em] text-[var(--ax-text)]">Start with the research context.</h2>
            <p className="mt-3 max-w-xl text-[12px] leading-6 text-[var(--ax-text-soft)]">Create a case or research Project. Math, Notebook and Writer can continue from the same context.</p>
          </div>
          <AxButton variant="quiet" size="sm" onClick={onClose}>Close</AxButton>
        </div>

        <div className="grid gap-4 px-5 py-5 sm:grid-cols-2 sm:px-6 sm:py-6">
          <AxField label="Project title" className="sm:col-span-2">
            <AxInput value={form.title} onChange={(event) => onChange("title", event.target.value)} placeholder="LED power optimization" autoFocus />
          </AxField>
          <AxField label="Topic">
            <AxInput value={form.topic} onChange={(event) => onChange("topic", event.target.value)} placeholder="Electronics" />
          </AxField>
          <AxField label="Difficulty">
            <AxSelect value={form.difficulty} onChange={(event) => onChange("difficulty", event.target.value)}>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </AxSelect>
          </AxField>
          <AxField label="Context" hint="Optional" className="sm:col-span-2">
            <AxTextarea value={form.description} onChange={(event) => onChange("description", event.target.value)} placeholder="What are you trying to understand, optimize or prove?" rows={4} />
          </AxField>
        </div>

        <div className="flex flex-col gap-4 border-t border-[var(--ax-work-line)] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="min-h-4 text-[10px] text-[var(--ax-text-faint)]">{message}</p>
          <div className="flex justify-end gap-2">
            <AxButton variant="quiet" onClick={onClose}>Cancel</AxButton>
            <AxButton variant="primary" onClick={onSubmit} disabled={saving}>{saving ? "Creating…" : "Create project"}</AxButton>
          </div>
        </div>
      </div>
    </div>
  );
}
