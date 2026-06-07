import Link from "next/link";
import { notFound } from "next/navigation";
import { ProblemDetailCard } from "@/components/problems/problem-detail-card";
import { PageContainer, PageShell } from "@/components/ui/page-shell";
import { ui } from "@/components/ui/styles";
import {
  allProblems,
  getProblemGroup,
  getProblemsByGroup,
  problemGroups,
} from "../../data";

export function generateStaticParams() {
  return problemGroups.map((group) => ({ slug: group.slug }));
}

export default async function ProblemGroupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const group = getProblemGroup(slug);

  if (!group) {
    notFound();
  }

  const problems = getProblemsByGroup(slug);
  const easyCount = problems.filter((item) => item.difficulty === "Easy").length;
  const mediumCount = problems.filter((item) =>
    item.difficulty.includes("Medium"),
  ).length;
  const hardCount = problems.filter((item) => item.difficulty === "Hard").length;

  return (
    <PageShell>
      <section className={`${ui.sectionBorder} py-9`}>
        <PageContainer>
          <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <p className={ui.overline}>
                Problem Set Group
              </p>
              <h1 className={ui.title}>{group.title}</h1>
            </div>
            <Link
              href="/problems"
              className="inline-flex h-8 items-center rounded-md border border-stone-200 bg-white px-3 text-xs font-light text-stone-500 transition-colors hover:border-stone-300"
            >
              ← Back
            </Link>
          </header>

          <p className={`${ui.mutedText} mt-4 max-w-3xl`}>
            {group.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-stone-100 pt-4 text-xs font-light text-stone-500">
            <div className="rounded-md bg-stone-50 px-2.5 py-1.5">
              <span className="text-stone-400">Total Problems:</span>{" "}
              <span className="font-medium text-stone-900 tabular-nums">{problems.length}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-md bg-stone-50 px-2.5 py-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              <span className="text-stone-400">Easy:</span>{" "}
              <span className="font-medium text-stone-700 tabular-nums">{easyCount}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-md bg-stone-50 px-2.5 py-1.5">
              <span className="w-1 h-1 rounded-full bg-amber-500" />
              <span className="text-stone-400">Medium:</span>{" "}
              <span className="font-medium text-stone-700 tabular-nums">{mediumCount}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-md bg-stone-50 px-2.5 py-1.5">
              <span className="w-1 h-1 rounded-full bg-rose-500" />
              <span className="text-stone-400">Hard:</span>{" "}
              <span className="font-medium text-stone-700 tabular-nums">{hardCount}</span>
            </div>
          </div>
        </PageContainer>
      </section>

      <section className={`${ui.subtleSection} py-7`}>
        <PageContainer>
          <div className="grid gap-3 md:grid-cols-2 2xl:grid-cols-3">
            {problems.map((problem, index) => (
              <ProblemDetailCard
                key={problem.id}
                index={index}
                problem={problem}
              />
            ))}
          </div>
        </PageContainer>
      </section>

      <footer className="border-t border-stone-100 bg-white py-5 text-center">
        <PageContainer>
          <span className="text-[10px] font-light uppercase tracking-[0.18em] text-stone-300 tabular-nums">
            Source Workspace: local data node · {allProblems.length} total matrix elements
          </span>
        </PageContainer>
      </footer>
    </PageShell>
  );
}
