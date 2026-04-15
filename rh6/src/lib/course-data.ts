import {
  chapter1StudyCards,
  chapter1SummaryEntries,
} from "./chapter1-course-data";
import {
  chapter2StudyCards,
  chapter2SummaryEntries,
} from "./chapter2-course-data";
import {
  chapter3StudyCards,
  chapter3SummaryEntries,
} from "./chapter3-course-data";
import {
  chapter4StudyCards,
  chapter4SummaryEntries,
} from "./chapter4-course-data";

export type ChapterStatus = "ready" | "planned";

export interface Chapter {
  id: number;
  label: string;
  title: string;
  periodLabel: string;
  summary: string;
  status: ChapterStatus;
}

export interface StudyCardVisual {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface StudyCard {
  id: string;
  chapterId: number;
  title: string;
  sortKey: number;
  time?: string;
  place?: string;
  participants?: string[];
  essence: string;
  causes?: string;
  results?: string;
  visual?: StudyCardVisual;
  supportsPracticeItemIds: string[];
}

export interface ChapterSummaryEntry {
  id: string;
  chapterId: number;
  sortKey: number;
  dateLabel: string;
  title: string;
  body: string;
}

export const chapters: Chapter[] = [
  {
    id: 1,
    label: "Глава I",
    title: "Народы и государства на территории нашей страны в древности. Русь в IX - первой половине XII в.",
    periodLabel: "IX - первая половина XII в.",
    summary:
      "Восточные славяне, начало династии Рюриковичей, объединение Киева и Новгорода, Крещение Руси и правление Владимира Мономаха.",
    status: "ready",
  },
  {
    id: 2,
    label: "Глава II",
    title: "Русь в середине XII - начале XIII в.",
    periodLabel: "середина XII - начало XIII в.",
    summary:
      "Политическая раздробленность, возвышение Владимиро-Суздальской земли, особый строй Новгорода и культура русских земель.",
    status: "ready",
  },
  {
    id: 3,
    label: "Глава III",
    title: "Русские земли в середине XIII - XIV в.",
    periodLabel: "середина XIII - XIV в.",
    summary:
      "Монголы и Батый, Невская битва и Ледовое побоище, Золотая Орда, возвышение Москвы и победа на Куликовом поле.",
    status: "ready",
  },
  {
    id: 4,
    label: "Глава IV",
    title: "Формирование единого Русского государства",
    periodLabel: "конец XIV - первая треть XVI в.",
    summary:
      "Василий I и Василий II, автокефалия церкви, Иван III, падение ордынского владычества, Судебник и завершение объединения земель при Василии III.",
    status: "ready",
  },
];

export const studyCards: StudyCard[] = [
  ...chapter1StudyCards,
  ...chapter2StudyCards,
  ...chapter3StudyCards,
  ...chapter4StudyCards,
];

const chapterSummaryEntries: ChapterSummaryEntry[] = [
  ...chapter1SummaryEntries,
  ...chapter2SummaryEntries,
  ...chapter3SummaryEntries,
  ...chapter4SummaryEntries,
];

export function getChapter(id: number): Chapter | undefined {
  return chapters.find((chapter) => chapter.id === id);
}

export function getStudyCardsByChapter(chapterId: number): StudyCard[] {
  return studyCards
    .filter((card) => card.chapterId === chapterId)
    .sort((a, b) => a.sortKey - b.sortKey);
}

export function getChapterSummaryByChapter(chapterId: number): ChapterSummaryEntry[] {
  return chapterSummaryEntries
    .filter((entry) => entry.chapterId === chapterId)
    .sort((a, b) => a.sortKey - b.sortKey);
}

export function getSupportingStudyCardsByPracticeItem(practiceItemId: string): StudyCard[] {
  return studyCards.filter((card) => card.supportsPracticeItemIds.includes(practiceItemId));
}

export function getReadyChapterCount(): number {
  return chapters.filter((chapter) => chapter.status === "ready").length;
}
