import type {
  MarkedText,
  PracticeBlock,
  PracticeItem,
  PracticeOption,
  PracticePart,
} from "./practice";

type PracticeSeed = Omit<PracticeItem, "sourceOrder" | "sourceLabel">;

export const gen = (text: string): MarkedText => ({ text, generated: true });
export const plain = (text: string): MarkedText => ({ text });

export const heading = (text: string, level: 3 | 4 = 4): PracticeBlock => ({
  type: "heading",
  level,
  text: plain(text),
});

export const paragraph = (text: string): PracticeBlock => ({
  type: "paragraph",
  text: plain(text),
});

export const list = (items: string[], ordered = false, title?: string): PracticeBlock => ({
  type: "list",
  ordered,
  title: title ? plain(title) : undefined,
  items: items.map(plain),
});

export const answerInstruction = (text: string): PracticeBlock => ({
  type: "answerInstruction",
  text: plain(text),
});

export const option = (label: string, text: string, generated = false): PracticeOption => ({
  label,
  text: generated ? gen(text) : plain(text),
});

export const mcq = (
  id: string,
  correctAnswer: string,
  options: PracticeOption[],
  explanation: string,
  prompt?: string,
  title?: string
): PracticePart => ({
  id,
  title: title ? gen(title) : undefined,
  prompt: prompt ? gen(prompt) : undefined,
  interaction: "single_choice",
  options,
  correctAnswer,
  explanation: gen(explanation),
});

export const chooseN = (
  id: string,
  correctAnswers: string[],
  options: PracticeOption[],
  explanation: string,
  exactSelectionCount: number,
  prompt?: string,
  title?: string
): PracticePart => ({
  id,
  title: title ? gen(title) : undefined,
  prompt: prompt ? gen(prompt) : undefined,
  interaction: "multi_select_exact_n",
  options,
  correctAnswers,
  exactSelectionCount,
  explanation: gen(explanation),
});

const sourceLabelFor = (item: PracticeSeed): string => {
  if (item.controlWork === 0) {
    return `Итоговый тест, вариант ${item.variant}, задание ${item.exerciseNumber}`;
  }

  const base = `Контрольная работа № ${item.controlWork}, вариант ${item.variant}, задание ${item.exerciseNumber}`;
  return item.fragmentKey ? `${base}${item.fragmentKey}` : base;
};

export function buildPracticeItems(seeds: PracticeSeed[]): PracticeItem[] {
  return seeds.map((item, index) => ({
    ...item,
    sourceOrder: index + 1,
    sourceLabel: sourceLabelFor(item),
  }));
}
