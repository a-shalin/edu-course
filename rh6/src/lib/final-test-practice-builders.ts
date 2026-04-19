import type { PracticeBlock, PracticeItem, PracticeOption } from "./practice";
import {
  heading,
  list,
  mcq,
  option,
  paragraph,
} from "./practice-builders";

type PracticeSeed = Omit<PracticeItem, "sourceOrder" | "sourceLabel">;

type Choice = {
  label: string;
  text: string;
};

type FinalTestBase = {
  id: string;
  chapterId: number;
  variant: number;
  exerciseNumber: number;
  title: string;
  explanation: string;
};

const FINAL_TEST_SOURCE_ID = 0;

export const choice = (label: string, text: string): Choice => ({ label, text });

export const choices = (...items: string[]): Choice[] =>
  items.map((text, index) => choice(String(index + 1), text));

const choiceOptions = (sourceChoices: Choice[], generated = false): PracticeOption[] =>
  sourceChoices.map(({ label, text }) => option(label, text, generated));

const finalTestSeed = (
  base: Omit<FinalTestBase, "explanation">,
  blocks: PracticeBlock[],
  sourceChoices: Choice[],
  correctAnswer: string,
  explanation: string,
  prompt?: string,
  generatedOptions = false
): PracticeSeed => ({
  id: base.id,
  chapterId: base.chapterId,
  controlWork: FINAL_TEST_SOURCE_ID,
  variant: base.variant,
  exerciseNumber: base.exerciseNumber,
  title: base.title,
  blocks,
  parts: [
    mcq(
      `${base.id}-part`,
      correctAnswer,
      choiceOptions(sourceChoices, generatedOptions),
      explanation,
      prompt
    ),
  ],
});

export const finalMcq = (
  base: FinalTestBase & {
    question: string;
    options: Choice[];
    correctAnswer: string;
  }
): PracticeSeed =>
  finalTestSeed(
    base,
    [heading(`${base.exerciseNumber}. ${base.question}`)],
    base.options,
    base.correctAnswer,
    base.explanation
  );

export const finalTerm = (
  base: FinalTestBase & {
    instruction: string;
    text: string;
    generatedOptions: Choice[];
    correctAnswer: string;
    prompt: string;
  }
): PracticeSeed =>
  finalTestSeed(
    base,
    [
      heading(`${base.exerciseNumber}. ${base.instruction}`),
      paragraph(base.text),
    ],
    base.generatedOptions,
    base.correctAnswer,
    base.explanation,
    base.prompt,
    true
  );

export const finalMatching = (
  base: FinalTestBase & {
    instruction: string;
    lists: { title: string; items: string[] }[];
    generatedOptions: Choice[];
    correctAnswer: string;
  }
): PracticeSeed =>
  finalTestSeed(
    base,
    [
      heading(`${base.exerciseNumber}. ${base.instruction}`),
      ...base.lists.map(({ title, items }) => list(items, false, title)),
    ],
    base.generatedOptions,
    base.correctAnswer,
    base.explanation,
    "Какое соответствие верно?",
    true
  );

export const finalSequence = (
  base: FinalTestBase & {
    instruction: string;
    events: string[];
    generatedOptions: Choice[];
    correctAnswer: string;
  }
): PracticeSeed =>
  finalTestSeed(
    base,
    [
      heading(`${base.exerciseNumber}. ${base.instruction}`),
      ...base.events.map(paragraph),
    ],
    base.generatedOptions,
    base.correctAnswer,
    base.explanation,
    "Какая последовательность верна?",
    true
  );

export const finalExcerpt = (
  base: FinalTestBase & {
    instruction: string;
    excerpt: string;
    generatedOptions: Choice[];
    correctAnswer: string;
    prompt: string;
  }
): PracticeSeed =>
  finalTestSeed(
    base,
    [heading(`${base.exerciseNumber}. ${base.instruction}`), paragraph(base.excerpt)],
    base.generatedOptions,
    base.correctAnswer,
    base.explanation,
    base.prompt,
    true
  );
