import problems from "./problems/problems.json";

export const libraryTracks = [
  {
    level: "Foundation",
    title: "Simple to Solid",
    description:
      "Core problems for logic, arrays, strings, and clean thinking patterns that build confidence early.",
    count: "48 problems",
  },
  {
    level: "Builder",
    title: "Patterns That Scale",
    description:
      "Binary search, sliding window, stacks, queues, maps, and the reusable ideas behind strong interview solutions.",
    count: "72 problems",
  },
  {
    level: "Advanced",
    title: "RNG to Complex Systems",
    description:
      "Graphs, DP, greedy design, randomized flows, and multi-step reasoning problems with deeper tradeoffs.",
    count: "39 problems",
  },
];

export const solutionCases = [
  {
    title: "Rate Limiter Design",
    type: "Backend Systems",
    stage: "Published",
    summary:
      "A production-style problem with constraints, failure modes, and a step-by-step scalable solution.",
  },
  {
    title: "Fraud Signal Ranking",
    type: "Data Logic",
    stage: "In Review",
    summary:
      "Turn messy real signals into a prioritization engine with explainable scoring and edge-case handling.",
  },
  {
    title: "Delivery Route Optimizer",
    type: "Algorithms",
    stage: "Published",
    summary:
      "A realistic optimization challenge that moves from brute force to structured heuristics and refinement.",
  },
];

export const solutionWorkflow = [
  {
    step: "Problem Context",
    text: "What the system needs, why the problem matters, and where naive solutions fail.",
  },
  {
    step: "Constraints",
    text: "Latency, throughput, edge cases, and the conditions that shape the final design.",
  },
  {
    step: "Solution Path",
    text: "A readable walkthrough from baseline idea to refined implementation strategy.",
  },
  {
    step: "Tradeoffs",
    text: "Where the solution bends, what it costs, and what should improve next.",
  },
];

export type Problem = (typeof problems)[number];

export const problemGroups = [
  {
    slug: "array-string-patterns",
    title: "Array and String Patterns",
    difficulty: "Easy to Medium",
    topic: "Arrays, strings, windows",
    description:
      "Sequence problems focused on indexing, counting, ordering, and compact state transitions.",
  },
  {
    slug: "stack-queue-flows",
    title: "Stack and Queue Flows",
    difficulty: "Easy to Hard",
    topic: "Stacks, queues, parsing",
    description:
      "Problems where order, rollback, and streamed state control the solution shape.",
  },
  {
    slug: "graph-search-systems",
    title: "Graph Search Systems",
    difficulty: "Medium to Hard",
    topic: "BFS, DFS, shortest path",
    description:
      "Traversal-heavy tasks and network-style problems with routing, dependencies, and state space.",
  },
  {
    slug: "dynamic-programming",
    title: "Dynamic Programming",
    difficulty: "Medium to Hard",
    topic: "Optimization, counting, partitioning",
    description:
      "State-driven problems that reward careful transitions and reusable subproblem design.",
  },
];

export const allProblems: Problem[] = problems;

export function getProblemGroup(slug: string) {
  return problemGroups.find((group) => group.slug === slug);
}

export function getProblemsByGroup(slug: string) {
  return allProblems.filter((problem) => problem.group === slug);
}
