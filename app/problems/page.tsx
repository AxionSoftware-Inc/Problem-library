"use client";

import { useDeferredValue, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { allProblems } from "@/app/data";
import { ProjectCreateModal } from "@/components/library/project-create-modal";
import { ProblemDetailCard } from "@/components/problems/problem-detail-card";
import { PageContainer, PageSection, PageShell } from "@/components/ui/page-shell";
import { ui } from "@/components/ui/styles";

export default function ProblemsPage() {
  const router = useRouter();
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return new URLSearchParams(window.location.search).get("create") === "1";
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [form, setForm] = useState({
    title: "",
    topic: "",
    difficulty: "Medium",
    description: "",
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("create") === "1") {
      router.replace("/problems", { scroll: false });
    }
  }, [router]);

  const deferredQuery = useDeferredValue(query);
  const filteredProblems = (() => {
    const normalized = deferredQuery.trim().toLowerCase();
    const matches = allProblems.filter((problem) => {
      if (!normalized) {
        return true;
      }

      return [
        problem.title,
        problem.topic,
        problem.difficulty,
        problem.summary,
        ...problem.tags,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalized);
    });

    return [...matches].sort((left, right) => {
      if (sortBy === "difficulty") {
        return left.difficulty.localeCompare(right.difficulty);
      }

      if (sortBy === "topic") {
        return left.topic.localeCompare(right.topic);
      }

      return left.title.localeCompare(right.title);
    });
  })();

  async function createProject() {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:8000/api/projects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: form.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, ""),
          title: form.title,
          topic: form.topic,
          difficulty: form.difficulty,
          description: form.description,
          status: "draft",
        }),
      });

      if (!response.ok) {
        throw new Error("Create failed");
      }

      setMessage("Project created.");
      setForm({
        title: "",
        topic: "",
        difficulty: "Medium",
        description: "",
      });
      setOpen(false);
    } catch {
      setMessage("Backend connection failed. Check Django server on port 8000.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <PageShell>
      <PageSection className="pt-5 sm:pt-6">
        <PageContainer>
          <section className="space-y-5">
            <div className="flex flex-col gap-3 border-b border-[var(--color-line)] pb-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <p className={ui.overline}>Library</p>
                <h1 className="text-3xl tracking-[-0.04em] text-[var(--color-text-strong)] sm:text-4xl">
                  Problems
                </h1>
                <p className="max-w-3xl text-sm leading-6 text-[var(--color-muted)]">
                  Searchable and sortable technical case library for a professional global
                  learning platform.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button type="button" className={ui.buttonPrimary} onClick={() => setOpen(true)}>
                  Create project
                </button>
                <button type="button" className={ui.buttonSecondary}>
                  Export outline
                </button>
              </div>
            </div>

            <div className="grid gap-3 border border-[var(--color-line)] bg-[var(--color-surface)] p-3 lg:grid-cols-[minmax(0,1fr)_180px_140px] lg:items-end">
              <div>
                <label htmlFor="problem-search" className={ui.caption}>
                  Search
                </label>
                <input
                  id="problem-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Title, topic, difficulty, tag"
                  className={`${ui.input} mt-2`}
                />
              </div>

              <div>
                <label htmlFor="problem-sort" className={ui.caption}>
                  Sort
                </label>
                <select
                  id="problem-sort"
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className={`${ui.input} mt-2`}
                >
                  <option value="title">Title</option>
                  <option value="topic">Topic</option>
                  <option value="difficulty">Difficulty</option>
                </select>
              </div>

              <div className="border border-[var(--color-line-soft)] bg-[var(--color-surface-soft)] px-3 py-2 text-sm text-[var(--color-muted)]">
                {filteredProblems.length} result{filteredProblems.length === 1 ? "" : "s"}
              </div>
            </div>

            <div className="grid gap-3">
              {filteredProblems.map((problem, index) => (
                <ProblemDetailCard key={problem.id} index={index} problem={problem} />
              ))}
            </div>
          </section>

          <ProjectCreateModal
            open={open}
            form={form}
            message={message}
            saving={saving}
            onClose={() => setOpen(false)}
            onSubmit={createProject}
            onChange={(field, value) => setForm((current) => ({ ...current, [field]: value }))}
          />
        </PageContainer>
      </PageSection>
    </PageShell>
  );
}
