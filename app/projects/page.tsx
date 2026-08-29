"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpenText, FileText, Sigma } from "lucide-react";

import { AxActionLink, AxBadge, AxButton, AxEmptyState, AxField, AxInput, AxPanel } from "@/components/axion";
import { PageContainer, PageSection, PageShell } from "@/components/ui/page-shell";
import { getEcosystemHref } from "@/lib/ecosystem/apps";
import { createLocalProject, deleteLocalProject, listLocalProjects, type LocalScienceProject } from "@/lib/ecosystem/local-projects";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<LocalScienceProject[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showCreate, setShowCreate] = useState(false);

  const refresh = () => setProjects(listLocalProjects());
  useEffect(() => refresh(), []);

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
      <PageSection className="pt-8 sm:pt-10 lg:pt-12">
        <PageContainer>
          <section className="grid gap-8 border-b border-[var(--ax-line)] pb-9 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-end">
            <div className="max-w-[760px]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ax-accent)]">Projects</p>
              <h1 className="mt-4 font-serif text-[clamp(3rem,5vw,5.2rem)] font-medium leading-[0.98] tracking-[-0.05em] text-[var(--ax-text)]">One place for the research trail.</h1>
              <div className="mt-6 h-[3px] w-14 bg-[var(--ax-accent)]" />
              <p className="mt-5 max-w-[650px] text-[16px] leading-7 text-[var(--ax-text-soft)]">A Project keeps computation, reasoning and publication in the same scientific context. Start locally and open the instrument you need.</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <AxButton variant="primary" onClick={() => setShowCreate(true)}>New project</AxButton>
                {recentProject ? <AxActionLink href={getEcosystemHref("math", "science", recentProject.id)}>Continue recent</AxActionLink> : null}
              </div>
            </div>
            <div className="grid grid-cols-3 divide-x divide-[var(--ax-line)] border-y border-[var(--ax-line)] py-3 text-center">
              <div><div className="font-serif text-2xl">{projects.length}</div><div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-[var(--ax-text-faint)]">Projects</div></div>
              <div><div className="font-serif text-2xl">3</div><div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-[var(--ax-text-faint)]">Instruments</div></div>
              <div><div className="font-serif text-2xl">Local</div><div className="mt-1 text-[9px] uppercase tracking-[0.12em] text-[var(--ax-text-faint)]">Default</div></div>
            </div>
          </section>
        </PageContainer>
      </PageSection>

      <PageSection>
        <PageContainer>
          {showCreate ? (
            <AxPanel className="mb-7 overflow-hidden">
              <div className="border-b border-[var(--ax-line)] px-5 py-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--ax-accent)]">New project</div>
                <div className="mt-1 font-serif text-2xl tracking-[-0.03em]">Start with context, not configuration.</div>
              </div>
              <form onSubmit={handleCreate} className="grid gap-4 p-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end">
                <AxField label="Project name"><AxInput autoFocus value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Turbulence study" required /></AxField>
                <AxField label="Context" hint="Optional"><AxInput value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What are you investigating?" /></AxField>
                <div className="flex gap-2"><AxButton type="submit" variant="primary">Create</AxButton><AxButton variant="quiet" onClick={() => setShowCreate(false)}>Cancel</AxButton></div>
              </form>
            </AxPanel>
          ) : null}

          {!projects.length ? (
            <AxEmptyState title="No project yet." description="Create one without signing in. The first research context stays on this device." action={<AxButton variant="primary" onClick={() => setShowCreate(true)}>Create first project</AxButton>} />
          ) : (
            <div className="divide-y divide-[var(--ax-line)] border-y border-[var(--ax-line)] bg-[var(--ax-surface)]">
              {projects.map((project, index) => (
                <article key={project.id} className="grid gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[44px_minmax(0,1fr)_auto] lg:items-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[var(--ax-radius-control)] border border-[var(--ax-line)] bg-[var(--ax-accent-soft)] font-serif text-lg text-[var(--ax-accent)]">{String(index + 1).padStart(2, "0")}</div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2"><h2 className="truncate font-serif text-[27px] tracking-[-0.035em] text-[var(--ax-text)]">{project.title}</h2><AxBadge>Local</AxBadge></div>
                    <p className="mt-1 max-w-2xl text-[12px] leading-5 text-[var(--ax-text-soft)]">{project.description || "No description yet."}</p>
                    <p className="mt-2 text-[10px] text-[var(--ax-text-faint)]">Updated {new Date(project.updatedAt).toLocaleString()}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <AxActionLink href={getEcosystemHref("math", "science", project.id)} variant="primary" size="sm"><Sigma className="h-3.5 w-3.5" />Math</AxActionLink>
                    <AxActionLink href={getEcosystemHref("notebook", "science", project.id)} size="sm"><BookOpenText className="h-3.5 w-3.5" />Notebook</AxActionLink>
                    <AxActionLink href={getEcosystemHref("writer", "science", project.id)} size="sm"><FileText className="h-3.5 w-3.5" />Writer</AxActionLink>
                    <AxButton variant="quiet" size="sm" onClick={() => { if (window.confirm(`Delete local project “${project.title}”?`)) { deleteLocalProject(project.id); refresh(); } }}>Delete</AxButton>
                    <ArrowRight className="hidden h-4 w-4 text-[var(--ax-text-faint)] xl:block" />
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
