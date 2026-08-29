"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

import { AxActionLink, AxBadge, AxButton, AxEmptyState, AxField, AxInput, AxPanel } from "@/components/axion";
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
    window.location.assign(getEcosystemHref("math", "science", project.id));
  };

  return (
    <PageShell>
      <PageSection className="pt-5 sm:pt-8">
        <PageContainer>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
            <section>
              <p className={ui.overline}>Projects</p>
              <h1 className="mt-3 max-w-4xl text-4xl leading-[1.04] tracking-[-0.05em] text-[var(--ax-text)] sm:text-5xl">
                One place for the whole research trail.
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[var(--ax-text-soft)] sm:text-base">
                Start locally. A Project carries the same context through computation, notebook reasoning, and publication. Cloud sync is not required to begin working.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <AxButton variant="primary" onClick={() => setShowCreate(true)}>New project</AxButton>
                {recentProject ? (
                  <AxActionLink href={getEcosystemHref("math", "science", recentProject.id)} variant="secondary">Continue in Math</AxActionLink>
                ) : null}
              </div>
            </section>

            <aside className="border-l border-[var(--ax-line)] pl-0 lg:pl-7">
              <p className={ui.overline}>How it works</p>
              <div className="mt-4 space-y-4 text-sm leading-6 text-[var(--ax-text-soft)]">
                <p><span className="font-semibold text-[var(--ax-text)]">Local first.</span> Ordinary computation stays on the user device whenever practical.</p>
                <p><span className="font-semibold text-[var(--ax-text)]">Save once.</span> Keep a result with its Project, then reuse it in the next tool instead of rebuilding context.</p>
                <p><span className="font-semibold text-[var(--ax-text)]">Open exit.</span> Standard formats remain part of the product direction.</p>
              </div>
            </aside>
          </div>
        </PageContainer>
      </PageSection>

      <PageSection>
        <PageContainer>
          {showCreate ? (
            <AxPanel className="mb-7">
              <form onSubmit={handleCreate} className="grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end">
                <AxField label="Project name">
                  <AxInput autoFocus value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Turbulence study" required />
                </AxField>
                <AxField label="Context" hint="Optional">
                  <AxInput value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What are you investigating?" />
                </AxField>
                <div className="flex gap-2">
                  <AxButton type="submit" variant="primary">Create</AxButton>
                  <AxButton variant="quiet" onClick={() => setShowCreate(false)}>Cancel</AxButton>
                </div>
              </form>
            </AxPanel>
          ) : null}

          {!hasProjects ? (
            <AxEmptyState
              title="No project yet."
              description="Create one without signing in. The first project stays on this device."
              action={<AxButton variant="primary" onClick={() => setShowCreate(true)}>Create first project</AxButton>}
            />
          ) : (
            <div className="divide-y divide-[var(--ax-line)] border-y border-[var(--ax-line)]">
              {projects.map((project) => (
                <article key={project.id} className="grid gap-4 py-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="truncate text-lg font-semibold tracking-[-0.025em] text-[var(--ax-text)]">{project.title}</h2>
                      <AxBadge>Local</AxBadge>
                    </div>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--ax-text-soft)]">{project.description || "No description yet."}</p>
                    <p className="mt-2 text-[11px] text-[var(--ax-text-faint)]">Updated {new Date(project.updatedAt).toLocaleString()}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <AxActionLink href={getEcosystemHref("math", "science", project.id)} variant="primary">Math</AxActionLink>
                    <AxActionLink href={getEcosystemHref("notebook", "science", project.id)}>Notebook</AxActionLink>
                    <AxActionLink href={getEcosystemHref("writer", "science", project.id)}>Writer</AxActionLink>
                    <AxButton
                      variant="quiet"
                      onClick={() => {
                        if (window.confirm(`Delete local project “${project.title}”?`)) {
                          deleteLocalProject(project.id);
                          refresh();
                        }
                      }}
                    >
                      Delete
                    </AxButton>
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
