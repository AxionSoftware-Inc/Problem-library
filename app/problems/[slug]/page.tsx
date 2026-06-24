import { notFound } from "next/navigation";
import { PageContainer, PageSection, PageShell } from "@/components/ui/page-shell";
import {
  CalculationSection,
  CodeSection,
  ConstraintList,
  FormulaSection,
  GraphSection,
  NotesSection,
  ProblemNarrative,
  ProblemStory,
  ProvenanceSection,
} from "@/components/problems/problem-sections";
import { ledDesignProblem } from "../problem-data";

export function generateStaticParams() {
  return [{ slug: ledDesignProblem.meta.slug }];
}

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (slug !== ledDesignProblem.meta.slug) {
    notFound();
  }

  return (
    <PageShell tone="alt">
      <PageSection className="pt-4 sm:pt-5">
        <PageContainer>
          <div className="grid gap-3">
            <ProblemNarrative problem={ledDesignProblem} />
            <ProblemStory problem={ledDesignProblem} />
            <ConstraintList constraints={ledDesignProblem.constraints} />
            <ProvenanceSection problem={ledDesignProblem} />
            <FormulaSection formulas={ledDesignProblem.formulas} />
            <CalculationSection calculations={ledDesignProblem.calculations} />
            <GraphSection {...ledDesignProblem.graphs} />
            <CodeSection samples={ledDesignProblem.codeSamples} />
            <NotesSection notes={ledDesignProblem.notes} />
          </div>
        </PageContainer>
      </PageSection>
    </PageShell>
  );
}
