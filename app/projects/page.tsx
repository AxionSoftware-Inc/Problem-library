"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import { PageContainer, PageSection, PageShell } from "@/components/ui/page-shell";
import { ui } from "@/components/ui/styles";
import { getEcosystemHref } from "@/lib/ecosystem/apps";
import {
  createLocalProject,
  deleteLocalProject,
  listLocalProjects,
  type LocalScienceProject,
} from "@/lib/ecosystem/local-projects";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<LocalScienceProject[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const refresh = () => setProjects(listLocalProjects());

  useEffect(() => {
    refresh();
  }, []);

  const hasProjects = projects.length > 0;
  const recentProject = useMemo(() => projects[0], [projects]);

  const handleCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const project = createLocalProject(title, description);
    setTitle("");
    setDescription("");
    setShowCreate(false);
    refresh();

    const mathHref = getEcosystemHref("math", "science", project.id);
    if (mathHref !== "#") window.location.assign(mathHref);
  };

  return (
    <PageShell>
      <PageSection className="pt-5 sm:pt-8">
        <PageContainer>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <section>
              <p className={ui.overline}>Projects</p>
              <h1 className="mt-3 max-w-4xl text-4xl leading-[1.04] tracking-[-0.05em] text-[var(--color-text-strong)] sm:text-5xl">
                One place for the whole research trail.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
                Start locally. A Project carries the same identity through computation, notebook reasoning, and publication. Cloud sync is optional infrastructure, not a requirement to begin working.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button type="button" className={ui.buttonPrimary} onClick={() => setShowCreate(true)}>
                  New project
                </button>
                {recentProject ? (
                  <a href={getEcosystemHref("math", "science", recentProject.id)} className={ui.buttonSecondary}>
                    Continue in Math
                  </a>
                ) : null}
              </div>
            </section>

            <aside className="border-l border-[var(--color-line)] pl-0 lg:pl-7">
              <p className={ui.overline}>Execution philosophy</p>
              <div className="mt-4 space-y-4 text-sm leading-6 text-[var(--color-muted)]">
                <p><span className="font-semibold text-[var(--color-text-strong)]">Local first.</span> Ordinary computation stays on the user device whenever practical.</p>
                <p><span className="font-semibold text-[var(--color-text-strong)]">Object native.</span> Results move between tools by reference, not manual export/import loops.</p>
                <p><span className="font-semibold text-[var(--color-text-strong)]">Open exit.</span> Standard formats remain part of the product contract.</p>
              </div>
            </aside>
          </div>
        </PageContainer>
      </PageSection>

      <PageSection>
        <PageContainer>
          {showCreate ? (
            <form onSubmit={handleCreate} className="mb-7 grid gap-4 border border-[var(--color-line)] bg-white p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end">
              <label className="grid gap-2">
                <span className={ui.caption}>Project name</span>
                <input autoFocus className={ui.input} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Turbulence study" required />
              </label>
              <label className="grid gap-2">
                <span className={ui.caption}>Context · optional</span>
                <input className={ui.input} value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What are you investigating?" />
              </label>
              <div className="flex gap-2">
                <button type="submit" className={ui.buttonPrimary}>Create</button>
                <button type="button" className={ui.buttonGhost} onClick={() => setShowCreate(false)}>Cancel</button>
              </div>
            </form>
          ) : null}

          {!hasProjects ? (
            <div className="border-y border-[var(--color-line)] py-14 text-center">
              <p className="text-lg font-semibold tracking-[-0.02em] text-[var(--color-text-strong)]">No project yet.</p>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[var(--color-muted)]">Create one without signing in. The first project stays on this device until sync is enabled.</p>
              <button type="button" onClick={() => setShowCreate(true)} className={`${ui.buttonPrimary} mt-5`}>Create first project</button>
            </div>
          ) : (
            <div className="divide-y divide-[var(--color-line)] border-y border-[var(--color-line)]">
              {projects.map((project) => (
                <article key={project.id} className="grid gap-4 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-lg font-semibold tracking-[-0.025em] text-[var(--color-text-strong)]">{project.title}</h2>
                      <span className={ui.microBadge}>Local</span>
                    </div>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">{project.description || "No description yet."}</p>
                    <p className="mt-2 text-[11px] text-[var(--color-muted)]">Updated {new Date(project.updatedAt).toLocaleString()}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <a href={getEcosystemHref("math", "science", project.id)} className={ui.buttonPrimary}>Math</a>
                    <a href={getEcosystemHref("notebook", "science", project.id)} className={ui.buttonSecondary}>Notebook</a>
                    <a href={getEcosystemHref("writer", "science", project.id)} className={ui.buttonSecondary}>Writer</a>
                    <button
                      type="button"
                      className={ui.buttonGhost}
                      onClick={() => {
                        if (window.confirm(`Delete local project “${project.title}”?`)) {
                          deleteLocalProject(project.id);
                          refresh();
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </PageContainer>
      </PageSection>
    </PageShell>
  );
}
