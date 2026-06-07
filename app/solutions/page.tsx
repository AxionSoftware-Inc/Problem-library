"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SolutionCard, StatusDot } from "@/components/solutions/solution-card";
import { EmptyState } from "@/components/ui/primitives";
import { PageContainer, PageShell } from "@/components/ui/page-shell";
import { allProblems, problemGroups } from "../data";

const statusOptions = ["All", "Verified", "Draft", "Needs review"];
const difficultyOptions = ["All", "Easy", "Medium", "Hard"];

export default function SolutionsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All topics");

  const solutionItems = useMemo(
    () =>
      allProblems.map((problem, index) => {
        const group = problemGroups.find((item) => item.slug === problem.group);
        const itemStatus =
          index % 5 === 0
            ? "Needs review"
            : index % 3 === 0
              ? "Draft"
              : "Verified";

        return {
          id: problem.id,
          title: problem.title,
          summary: problem.summary,
          topic: problem.topic,
          difficulty: problem.difficulty,
          duration: problem.duration,
          tags: problem.tags,
          groupTitle: group?.title ?? "Ungrouped",
          groupSlug: group?.slug ?? "",
          status: itemStatus,
          accuracy: itemStatus === "Verified" ? 98 - (index % 7) : 72 + (index % 18),
          steps: 4 + (index % 6),
          updated:
            index % 2 === 0 ? "Today" : index % 3 === 0 ? "Yesterday" : "3d ago",
        };
      }),
    [],
  );

  const topics = useMemo(
    () => ["All topics", ...new Set(solutionItems.map((item) => item.topic))],
    [solutionItems],
  );

  const visibleSolutions = useMemo(
    () =>
      solutionItems.filter((solution) => {
        const matchesQuery =
          query.trim().length === 0 ||
          [
            solution.title,
            solution.summary,
            solution.topic,
            solution.groupTitle,
            solution.difficulty,
            solution.status,
            ...solution.tags,
          ]
            .join(" ")
            .toLowerCase()
            .includes(query.trim().toLowerCase());

        const matchesStatus = status === "All" || solution.status === status;
        const matchesDifficulty =
          difficulty === "All" || solution.difficulty.includes(difficulty);
        const matchesTopic = topic === "All topics" || solution.topic === topic;

        return matchesQuery && matchesStatus && matchesDifficulty && matchesTopic;
      }),
    [difficulty, query, solutionItems, status, topic],
  );

  const verifiedCount = visibleSolutions.filter((item) => item.status === "Verified").length;
  const draftCount = visibleSolutions.filter((item) => item.status === "Draft").length;
  const reviewCount = visibleSolutions.filter((item) => item.status === "Needs review").length;
  
  const avgAccuracy =
    visibleSolutions.length === 0
      ? 0
      : Math.round(
          visibleSolutions.reduce((sum, item) => sum + item.accuracy, 0) /
            visibleSolutions.length,
        );

  return (
    <PageShell>
      <PageContainer>
        {/* Header Section */}
        <header className="py-8 border-b border-stone-100">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-baseline gap-2.5">
                <h1 className="text-xl font-medium tracking-tight text-stone-900">
                  Solutions
                </h1>
                <span className="text-xs font-light text-stone-400 tabular-nums">
                  {visibleSolutions.length} items total
                </span>
              </div>
              <p className="mt-1 text-xs font-light text-stone-400 max-w-xl leading-relaxed">
                Review structured solutions, verification status, steps, and linked problem groups in a unified workspace.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium">
              <button type="button" className="px-3 py-1.5 bg-white border border-stone-150 hover:border-stone-300 text-stone-600 rounded-sm transition-colors">
                Export
              </button>
              <button type="button" className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-sm transition-colors font-normal">
                New Solution
              </button>
            </div>
          </div>

          {/* Filters Control Panel */}
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-[1fr_150px_150px_180px_auto]">
            <div className="relative">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search solutions, tags, topics..."
                className="w-full h-9 pl-8 pr-3 text-xs bg-stone-50/50 border border-stone-150 focus:border-stone-300 focus:bg-white rounded-sm outline-none transition-all placeholder:text-stone-400 font-light"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 font-light pointer-events-none">
                src
              </span>
            </div>

            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              className="h-9 px-2 text-xs bg-white border border-stone-150 text-stone-600 rounded-sm outline-none focus:border-stone-300 cursor-pointer font-light"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>{option} Status</option>
              ))}
            </select>

            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value)}
              className="h-9 px-2 text-xs bg-white border border-stone-150 text-stone-600 rounded-sm outline-none focus:border-stone-300 cursor-pointer font-light"
            >
              {difficultyOptions.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <select
              value={topic}
              onChange={(event) => setTopic(event.target.value)}
              className="h-9 px-2 text-xs bg-white border border-stone-150 text-stone-600 rounded-sm outline-none focus:border-stone-300 cursor-pointer font-light truncate"
            >
              {topics.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => {
                setQuery("");
                setStatus("All");
                setDifficulty("All");
                setTopic("All topics");
              }}
              className="h-9 px-4 text-xs text-stone-400 hover:text-stone-900 transition-colors font-light border border-dashed border-stone-200 hover:border-stone-300 rounded-sm"
            >
              Reset
            </button>
          </div>
        </header>

        {/* Main Section Content */}
        <div className="grid gap-6 py-6 xl:grid-cols-[1fr_300px]">
          {/* Cards Grid */}
          <main>
            {visibleSolutions.length > 0 ? (
              <div className="grid gap-3 md:grid-cols-2">
                {visibleSolutions.map((solution) => (
                  <SolutionCard key={solution.id} solution={solution} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No solutions found"
                description="Try refining your search keywords or resetting active filter presets."
              />
            )}
          </main>

          {/* Sidebar Analytics & Navigation maps */}
          <aside className="space-y-6">
            {/* Quick Metrics */}
            <section className="p-4 bg-stone-50/50 border border-stone-100 rounded-sm space-y-3.5">
              <p className="text-[11px] font-medium uppercase tracking-wider text-stone-500">Quality Metrics</p>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-light">
                <div className="space-y-0.5">
                  <span className="text-stone-400 block text-[10px]">Avg Accuracy</span>
                  <span className="text-stone-900 font-medium text-sm tabular-nums">{avgAccuracy}%</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-stone-400 block text-[10px]">Verified Set</span>
                  <span className="text-stone-700 font-medium text-sm tabular-nums">{verifiedCount}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-stone-400 block text-[10px]">Draft Items</span>
                  <span className="text-stone-700 font-medium text-sm tabular-nums">{draftCount}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-stone-400 block text-[10px]">In Review</span>
                  <span className="text-stone-700 font-medium text-sm tabular-nums">{reviewCount}</span>
                </div>
              </div>
            </section>

            {/* Review Queue List */}
            <section className="space-y-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-stone-500">Review Queue</p>
              <div className="space-y-1.5">
                {visibleSolutions
                  .filter((item) => item.status !== "Verified")
                  .slice(0, 4)
                  .map((solution) => (
                    <Link
                      key={solution.id}
                      href={`/solutions/${solution.id}`}
                      className="group flex flex-col p-3 bg-white border border-stone-100 hover:border-stone-200 transition-all rounded-sm"
                    >
                      <span className="text-[13px] font-normal text-stone-800 group-hover:text-stone-600 transition-colors line-clamp-1">
                        {solution.title}
                      </span>
                      <div className="mt-1.5 flex items-center justify-between text-[10px] text-stone-400 font-light">
                        <StatusDot status={solution.status} />
                        <span className="tabular-nums">{solution.steps} steps</span>
                      </div>
                    </Link>
                  ))}

                {visibleSolutions.filter((item) => item.status !== "Verified").length === 0 && (
                  <div className="p-4 border border-dashed border-stone-150 rounded-sm text-center">
                    <p className="text-xs font-light text-stone-400">Queue is pristine</p>
                  </div>
                )}
              </div>
            </section>

            {/* Topic Navigation Map */}
            <section className="space-y-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-stone-500">Active Topics</p>
              <div className="flex flex-wrap gap-1">
                {topics.filter(t => t !== "All topics").slice(0, 12).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTopic(item)}
                    className={`px-2 py-1 text-[10px] font-light rounded-sm transition-all border ${
                      topic === item 
                        ? "bg-stone-900 text-white border-stone-900" 
                        : "bg-white text-stone-500 border-stone-150 hover:border-stone-300"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </PageContainer>
    </PageShell>
  );
}