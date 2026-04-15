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
    title: "§ 19-20. Культура и быт в IX — начале XIII в.",
    sortKey: 240,
    sourcePath: "books/russian-history/part-1/15.php.html",
  },
];

export const chapter2StudyCardTargets: Record<string, BookTarget> = {
  "c2-s1": { sectionId: "c2-b2", anchorId: "c2-yuri-moscow" },
  "c2-s2": { sectionId: "c2-b5", anchorId: "c2-igor-word" },
  "c2-s3": { sectionId: "c2-b1", anchorId: "c2-fragmentation" },
  "c2-s4": { sectionId: "c2-b2", anchorId: "c2-yuri-moscow" },
  "c2-s5": { sectionId: "c2-b2", anchorId: "c2-andrei" },
  "c2-s6": { sectionId: "c2-b3", anchorId: "c2-novgorod-government" },
  "c2-s7": { sectionId: "c2-b4", anchorId: "c2-galicia" },
  "c2-s8": { sectionId: "c2-b5", anchorId: "c2-novgorod-architecture" },
};

export const chapter2SummaryTargets: Record<string, BookTarget> = {
  "c2-t1": { sectionId: "c2-b2", anchorId: "c2-yuri-moscow" },
  "c2-t2": { sectionId: "c2-b5", anchorId: "c2-igor-word" },
};
