import { chapter1Seeds } from "./chapter1-practice";
import { chapter2Seeds } from "./chapter2-practice";
import { chapter3Seeds } from "./chapter3-practice";
import { chapter4Seeds } from "./chapter4-practice";
import { buildPracticeItems } from "./practice-builders";

export type MarkedText = {
  text: string;
  generated?: boolean;
};

export type PracticeBlock =
  | {
      type: "heading";
      text: MarkedText;
      level?: 3 | 4;
    }
  | {
      type: "paragraph";
      text: MarkedText;
    }
  | {
      type: "list";
      title?: MarkedText;
      ordered?: boolean;
      items: MarkedText[];
    }
  | {
      type: "table";
      title?: MarkedText;
      headers?: MarkedText[];
      rows: MarkedText[][];
    }
  | {
      type: "image";
      src: string;
      alt: string;
      width?: number;
      height?: number;
      caption?: MarkedText;
    }
  | {
      type: "answerInstruction";
      text: MarkedText;
    }
  | {
      type: "note";
      text: MarkedText;
    };

export type PracticeOption = {
  label: string;
  text: MarkedText;
};

export type GuidedSubtask = {
  id: string;
  title?: MarkedText;
  prompt: MarkedText;
  answer: MarkedText;
  explanation?: MarkedText;
};

export type PracticePart =
  | {
      id: string;
      title?: MarkedText;
      prompt?: MarkedText;
      interaction: "single_choice";
      options: PracticeOption[];
      correctAnswer: string;
      explanation: MarkedText;
      distractorExplanations?: Record<string, MarkedText>;
    }
  | {
      id: string;
      title?: MarkedText;
      prompt?: MarkedText;
      interaction: "multi_select_exact_n";
      options: PracticeOption[];
      correctAnswers: string[];
      exactSelectionCount: number;
      explanation: MarkedText;
      optionExplanations?: Record<string, MarkedText>;
    }
  | {
      id: string;
      title?: MarkedText;
      prompt?: MarkedText;
      interaction: "guided_subtasks";
      subtasks: GuidedSubtask[];
      explanation?: MarkedText;
    }
  | {
      id: string;
      title?: MarkedText;
      prompt?: MarkedText;
      interaction: "reveal_answer";
      answer: MarkedText;
      explanation?: MarkedText;
    };

export type PracticeItem = {
  id: string;
  chapterId: number;
  controlWork: number;
  variant: number;
  exerciseNumber: number;
  fragmentKey?: string;
  sourceOrder: number;
  sourceLabel: string;
  title: string;
  blocks: PracticeBlock[];
  parts: PracticePart[];
};

const practiceItems: PracticeItem[] = buildPracticeItems([
  ...chapter1Seeds,
  ...chapter2Seeds,
  ...chapter3Seeds,
  ...chapter4Seeds,
]);

export function isScorablePracticePart(part: PracticePart): part is Extract<
  PracticePart,
  { interaction: "single_choice" | "multi_select_exact_n" }
> {
  return part.interaction === "single_choice" || part.interaction === "multi_select_exact_n";
}

export function isScorablePracticeItem(item: PracticeItem): boolean {
  return item.parts.some(isScorablePracticePart);
}

export function getScorablePracticeItemCount(items: PracticeItem[]): number {
  return items.filter(isScorablePracticeItem).length;
}

export function getPracticeItemsByChapter(chapterId: number): PracticeItem[] {
  return practiceItems
    .filter((item) => item.chapterId === chapterId)
    .sort((a, b) => a.sourceOrder - b.sourceOrder);
}

export function getPracticeItemCount(): number {
  return practiceItems.length;
}
