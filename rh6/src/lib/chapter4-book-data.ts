import type { BookSection, BookTarget } from "./book-data";

export const chapter4BookSections: BookSection[] = [
  {
    id: "c4-b1",
    chapterId: 4,
    title: "Дополнение: Витовт и Грюнвальдская битва",
    sortKey: 390,
    sourcePath: "books/russian-history/part-1/21.php.html",
  },
  {
    id: "c4-b2",
    chapterId: 4,
    title: "§ 34-35. Московское княжество в конце XIV — первой половине XV в.",
    sortKey: 400,
    sourcePath: "books/russian-history/part-1/26.php.html",
  },
  {
    id: "c4-b3",
    chapterId: 4,
    title: "§ 36-37. Иван III — государь всея Руси",
    sortKey: 410,
    sourcePath: "books/russian-history/part-1/27.php.html",
  },
  {
    id: "c4-b4",
    chapterId: 4,
    title: "§ 38-39. Российское государство и общество во второй половине XV в.",
    sortKey: 420,
    sourcePath: "books/russian-history/part-1/28.php.html",
  },
  {
    id: "c4-b5",
    chapterId: 4,
    title: "§ 40-41. Правление Василия III",
    sortKey: 430,
    sourcePath: "books/russian-history/part-1/29.php.html",
  },
];

const summaryTargetsFor = (targets: Record<string, BookTarget>): Record<string, BookTarget> =>
  Object.fromEntries(
    Object.entries(targets).map(([cardId, target]) => [`${cardId}-summary`, target])
  );

export const chapter4StudyCardTargets: Record<string, BookTarget> = {
  "c4-f1": { sectionId: "c3-b1" },
  "c4-f2": { sectionId: "c3-b3" },
  "c4-f3": { sectionId: "c3-b8" },
  "c4-f4": { sectionId: "c4-b3", anchorId: "c4-ugra" },
  "c4-f5": { sectionId: "c4-b2", anchorId: "c4-autocephaly" },
  "c4-f6": { sectionId: "c4-b2" },
  "c4-f7": { sectionId: "c4-b3" },
  "c4-f8": { sectionId: "c4-b3" },
  "c4-f9": { sectionId: "c4-b3" },
  "c4-f10": { sectionId: "c4-b5", anchorId: "c4-smolensk" },
  "c4-f11": { sectionId: "c4-b4", anchorId: "c4-sudebnik" },
  "c4-f12": { sectionId: "c4-b4", anchorId: "c4-sudebnik" },
  "c4-f13": { sectionId: "c4-b4", anchorId: "c4-sudebnik" },
  "c4-f14": { sectionId: "c4-b4" },
  "c4-f15": { sectionId: "c4-b4" },
  "c4-f16": { sectionId: "c4-b4" },
  "c4-f17": { sectionId: "c4-b4" },
  "c4-f18": { sectionId: "c4-b5", anchorId: "c4-smolensk" },
  "c4-f19": { sectionId: "c4-b4" },
  "c4-f20": { sectionId: "c4-b3" },
  "c4-f21": { sectionId: "c4-b3", anchorId: "c4-symbols" },
  "c4-f22": { sectionId: "c4-b5" },
  "c4-f23": { sectionId: "c1-b6" },
  "c4-f24": { sectionId: "c2-b2" },
  "c4-f25": { sectionId: "c4-b3" },
  "c4-f26": { sectionId: "c4-b5" },
};

export const chapter4SummaryTargets: Record<string, BookTarget> = summaryTargetsFor(
  chapter4StudyCardTargets
);
