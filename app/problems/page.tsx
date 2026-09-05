"use client";

import { useDeferredValue, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { allProblems } from "@/app/data";
import { ProjectCreateModal } from "@/components/library/project-create-modal";
import { ProblemDetailCard } from "@/components/problems/problem-detail-card";
import { createLocalProject } from "@/lib/ecosystem/local-projects";

export default function ProblemsPage() {
  const router = useRouter();
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("create") === "1";
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [form, setForm] = useState({ title: "", topic: "", difficulty: "Medium", description: "" });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("create") === "1") router.replace("/problems", { scroll: false });
  }, [router]);

  const deferredQuery = useDeferredValue(query);
  const filteredProblems = (() => {
    const normalized = deferredQuery.trim().toLowerCase();
    const matches = allProblems.filter((problem) => {
      if (!normalized) return true;
      return [problem.title, problem.topic, problem.difficulty, problem.summary, ...problem.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalized);
    });

    return [...matches].sort((left, right) => {
      if (sortBy === "difficulty") return left.difficulty.localeCompare(right.difficulty);
      if (sortBy === "topic") return left.topic.localeCompare(right.topic);
      return left.title.localeCompare(right.title);
    });
  })();

  function createProject() {
    setSaving(true);
    setMessage("");

    try {
      const context = [
        form.description.trim(),
        form.topic.trim() ? `Topic: ${form.topic.trim()}` : "",
        form.difficulty ? `Difficulty: ${form.difficulty}` : "",
      ].filter(Boolean).join(" · ");

      createLocalProject(form.title, context);
      setMessage("Project created on this device.");
      setForm({ title: "", topic: "", difficulty: "Medium", description: "" });
      setOpen(false);
      router.push("/projects");
    } catch (error) {
      setMessage(error instanceof Error && error.message === "PROJECT_TITLE_REQUIRED"
        ? "Add a project title first."
        : "The Project could not be created on this device.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="ax-workspace-root">
      <main className="ax-work-container">
        <section className="ax-work-pagehead">
          <div>
            <p className="ax-work-kicker">Scientific library</p>
            <h1 className="ax-work-title">Problems worth exploring.</h1>
            <p className="ax-work-lead">Browse technical cases by topic and difficulty, then turn the useful ones into a local Project and continue the work in the scientific instruments.</p>
            <div className="mt-7">
              <button type="button" className="inline-flex h-10 items-center rounded-[var(--ax-work-control-radius)] bg-[var(--ax-accent-strong)] px-4 text-[11px] font-semibold text-white hover:bg-[var(--ax-accent)]" onClick={() => setOpen(true)}>
                Create project
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="problem-search" className="ax-work-kicker text-[var(--ax-text-faint)]">Search</label>
              <input
                id="problem-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Title, topic, difficulty, tag"
                className="ax-work-input mt-2 h-11 w-full px-3 text-sm"
              />
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_110px] gap-3">
              <select id="problem-sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="ax-work-select h-10 px-3 text-[11px] font-semibold">
                <option value="title">Sort · Title</option>
                <option value="topic">Sort · Topic</option>
                <option value="difficulty">Sort · Difficulty</option>
              </select>
              <div className="flex h-10 items-center justify-center border-y border-[var(--ax-work-line)] text-[10px] font-semibold text-[var(--ax-text-soft)]">
                {filteredProblems.length} results
              </div>
            </div>
          </div>
        </section>

        <section className="ax-work-section">
          <div className="mb-5 flex items-end justify-between gap-5">
            <div><div className="ax-work-kicker">Cases</div><div className="mt-2 font-[family-name:var(--ax-font-display)] text-[26px] tracking-[-0.035em]">Technical problem library</div></div>
            <div className="hidden text-[10px] text-[var(--ax-text-faint)] md:block">Topic · difficulty · duration · tags</div>
          </div>
          <div className="ax-work-list">
            {filteredProblems.map((problem, index) => <ProblemDetailCard key={problem.id} index={index} problem={problem} />)}
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
      </main>
    </div>
  );
}
