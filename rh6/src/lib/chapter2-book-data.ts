import type { BookSection, BookTarget } from "./book-data";

export const chapter2BookSections: BookSection[] = [
  {
    id: "c2-b1",
    chapterId: 2,
    title: "§ 13. Политическая раздробленность Руси",
    sortKey: 200,
    sourcePath: "books/russian-history/part-1/11.php.html",
  },
  {
    id: "c2-b2",
    chapterId: 2,
    title: "§ 14-15. Владимиро-Суздальская земля",
    sortKey: 210,
    sourcePath: "books/russian-history/part-1/12.php.html",
  },
  {
    id: "c2-b3",
    chapterId: 2,
    title: "§ 16-17. Новгородская земля",
    sortKey: 220,
    sourcePath: "books/russian-history/part-1/13.php.html",
  },
  {
    id: "c2-b4",
    chapterId: 2,
    title: "§ 18. Юго-Западная Русь",
    sortKey: 230,
    sourcePath: "books/russian-history/part-1/14.php.html",
  },
  {
    id: "c2-b5",
    chapterId: 2,
    title: "§ 19-20. Культура и быт в IX — начало XIII в.",
    sortKey: 240,
    sourcePath: "books/russian-history/part-1/15.php.html",
  },
];

const summaryTargetsFor = (targets: Record<string, BookTarget>): Record<string, BookTarget> =>
  Object.fromEntries(
    Object.entries(targets).map(([cardId, target]) => [`${cardId}-summary`, target])
  );

export const chapter2StudyCardTargets: Record<string, BookTarget> = {
  "c2-f1": { sectionId: "c2-b1", anchorId: "c2-fragmentation" },
  "c2-f2": { sectionId: "c2-b1", anchorId: "c2-fragmentation-results" },
  "c2-f3": { sectionId: "c2-b2", anchorId: "c2-yuri-moscow" },
  "c2-f4": { sectionId: "c2-b3", anchorId: "c2-novgorod-government" },
  "c2-f5": { sectionId: "c2-b3", anchorId: "c2-novgorod-government" },
  "c2-f6": { sectionId: "c2-b2", anchorId: "c2-andrei" },
  "c2-f7": { sectionId: "c2-b2", anchorId: "c2-vsevolod" },
  "c2-f8": { sectionId: "c2-b2", anchorId: "c2-yuri-moscow" },
  "c2-f9": { sectionId: "c2-b4", anchorId: "c2-yaroslav-osmomysl" },
  "c2-f10": { sectionId: "c2-b4", anchorId: "c2-galicia" },
  "c2-f11": { sectionId: "c2-b4", anchorId: "c2-daniil" },
  "c2-f12": { sectionId: "c3-b2", anchorId: "c3-kiev-fall" },
  "c2-f13": { sectionId: "c4-b2", anchorId: "c4-feudal-war" },
};

export const chapter2SummaryTargets: Record<string, BookTarget> = summaryTargetsFor(
  chapter2StudyCardTargets
);
