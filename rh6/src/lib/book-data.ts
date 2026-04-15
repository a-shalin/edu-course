export interface BookSection {
  id: string;
  chapterId: number;
  title: string;
  sortKey: number;
  sourcePath: string;
}

export interface BookTarget {
  sectionId: string;
  anchorId?: string;
}

const bookSections: BookSection[] = [];
const studyCardTargets: Record<string, BookTarget> = {};
const summaryTargets: Record<string, BookTarget> = {};

export function getBookSectionsByChapter(chapterId: number): BookSection[] {
  return bookSections
    .filter((section) => section.chapterId === chapterId)
    .sort((a, b) => a.sortKey - b.sortKey);
}

export function getBookSection(sectionId: string): BookSection | undefined {
  return bookSections.find((section) => section.id === sectionId);
}

export function getBookTargetForStudyCard(cardId: string): BookTarget | undefined {
  return studyCardTargets[cardId];
}

export function getBookTargetForSummaryEntry(entryId: string): BookTarget | undefined {
  return summaryTargets[entryId];
}

export function getBookTargetForSupportingCards(cardIds: string[]): BookTarget | undefined {
  for (const cardId of cardIds) {
    const target = getBookTargetForStudyCard(cardId);

    if (target) {
      return target;
    }
  }

  return undefined;
}

export function buildBookReaderHref(target: BookTarget | null | undefined): string | null {
  if (!target) {
    return null;
  }

  const section = getBookSection(target.sectionId);

  if (!section) {
    return null;
  }

  const anchor = target.anchorId ? `#${target.anchorId}` : "";
  return `/reader/book/${section.sourcePath}${anchor}`;
}
