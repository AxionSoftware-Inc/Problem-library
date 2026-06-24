import { ledDesignProblem } from "./problems/problem-data";

export const libraryTracks = [
  {
    level: "Focus",
    title: "Single Case Library",
    description:
      "The product now centers on one deep engineering case instead of a wide catalog.",
    count: "1 featured problem",
  },
];

export const solutionCases = [
  {
    title: "LED Design",
    type: "Electronics / Power",
    stage: "Published",
    summary: ledDesignProblem.story.overview,
  },
];

export const allProblems = [
  {
    id: 1,
    group: ledDesignProblem.meta.slug,
    title: ledDesignProblem.meta.title,
    topic: "Electronics",
    difficulty: ledDesignProblem.meta.difficulty,
    duration: ledDesignProblem.meta.estimatedTime,
    summary: ledDesignProblem.meta.subtitle,
    tags: ["electronics", "power", "thermal"],
  },
];

export const problemGroups = [
  {
    slug: ledDesignProblem.meta.slug,
    title: ledDesignProblem.meta.title,
    topic: ledDesignProblem.meta.domain,
    difficulty: ledDesignProblem.meta.difficulty,
    description: ledDesignProblem.story.overview,
  },
];

export function getProblemGroup(slug: string) {
  return problemGroups.find((group) => group.slug === slug);
}

export function getProblemsByGroup(slug: string) {
  return allProblems.filter((problem) => problem.group === slug);
}

