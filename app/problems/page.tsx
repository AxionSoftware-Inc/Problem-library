"use client";

import { useMemo, useState } from "react";
import { GroupCard } from "@/components/problems/group-card";
import { EmptyState, Badge } from "@/components/ui/primitives";
import { PageContainer, PageShell } from "@/components/ui/page-shell";
import { ui } from "@/components/ui/styles";
import { allProblems, problemGroups } from "../data";

const difficultyOptions = [
  "All",
  "Easy",
  "Medium",
  "Hard",
  "Easy to Medium",
  "Medium to Hard",
  "Easy to Hard",
];

export default function ProblemsPage() {
  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All topics");

  const topics = useMemo(
    () => ["All topics", ...new Set(problemGroups.map((group) => group.topic))],
    [],
  );

  const enrichedGroups = useMemo(
    () =>
      problemGroups.map((group) => {
        const problems = allProblems.filter((problem) => problem.group === group.slug);
        const matchesQuery =
          query.trim().length === 0 ||
          [
            group.title,
            group.topic,
            group.description,
            ...problems.flatMap((problem) => [
              problem.title,
              problem.topic,
              problem.summary,
              problem.difficulty,
              ...problem.tags,
            ]),
          ]
            .join(" ")
            .toLowerCase()
            .includes(query.trim().toLowerCase());
        const matchesDifficulty =
          difficulty === "All" || group.difficulty === difficulty;
        const matchesTopic = topic === "All topics" || group.topic === topic;

        return {
          ...group,
          problems,
          count: problems.length,
          hardCount: problems.filter((item) => item.difficulty === "Hard").length,
          mediumCount: problems.filter((item) =>
            item.difficulty.includes("Medium"),
          ).length,
          easyCount: problems.filter((item) => item.difficulty === "Easy").length,
          visible: matchesQuery && matchesDifficulty && matchesTopic,
        };
      }),
    [difficulty, query, topic],
  );

  const visibleGroups = enrichedGroups.filter((group) => group.visible);
  const visibleProblemsCount = visibleGroups.reduce(
    (sum, group) => sum + group.count,
    0,
  );

  return (
    <PageShell>
      <PageContainer>
        <header className={ui.headerBorder}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-[-0.035em]">
                  Problems
                </h1>
                <Badge>{visibleGroups.length} groups</Badge>
                <Badge>{visibleProblemsCount} problems</Badge>
              </div>
              <p className="mt-1 text-sm text-[#756b5f]">
                Browse curated problem groups by topic, level, and tags.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button type="button" className={ui.buttonSecondary}>
                Import
              </button>
              <button type="button" className={ui.buttonPrimary}>
                New group
              </button>
            </div>
          </div>

          <div className="mt-5 grid gap-2 md:grid-cols-[minmax(0,1fr)_180px_220px_auto]">
            <div className="relative">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search groups, problems, topics, tags..."
                className={ui.searchInput}
              />
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#8f8579]">
                ⌕
              </span>
            </div>

            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
              className={ui.input}
            >
              {difficultyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <select
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              className={ui.input}
            >
              {topics.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => {
                setQuery("");
                setDifficulty("All");
                setTopic("All topics");
              }}
              className={`${ui.buttonSecondary} text-[#756b5f] hover:text-[#17231d]`}
            >
              Reset
            </button>
          </div>
        </header>

        <section className="py-5">
          {visibleGroups.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visibleGroups.map((group) => (
                <GroupCard key={group.slug} group={group} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No problem groups found"
              description="Try changing the search query, topic, or difficulty filter."
            />
          )}
        </section>
      </PageContainer>
    </PageShell>
  );
}
