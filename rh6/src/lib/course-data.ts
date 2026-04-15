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

export const chapters: Chapter[] = [];
export const studyCards: StudyCard[] = [];
const chapterSummaryEntries: ChapterSummaryEntry[] = [];

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
