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

export const chapter4StudyCardTargets: Record<string, BookTarget> = {
  "c4-s1": { sectionId: "c4-b2", anchorId: "c4-vasily1" },
  "c4-s2": { sectionId: "c4-b2", anchorId: "c4-timur" },
  "c4-s3": { sectionId: "c4-b1", anchorId: "c4-grunwald" },
  "c4-s4": { sectionId: "c4-b2", anchorId: "c4-feudal-war" },
  "c4-s5": { sectionId: "c4-b2", anchorId: "c4-feudal-war" },
  "c4-s6": { sectionId: "c4-b2", anchorId: "c4-autocephaly" },
  "c4-s7": { sectionId: "c4-b3", anchorId: "c4-ivan3" },
  "c4-s8": { sectionId: "c4-b3", anchorId: "c4-novgorod" },
  "c4-s9": { sectionId: "c4-b3", anchorId: "c4-ugra" },
  "c4-s10": { sectionId: "c4-b3", anchorId: "c4-tver" },
  "c4-s11": { sectionId: "c4-b4", anchorId: "c4-sudebnik" },
  "c4-s12": { sectionId: "c4-b5", anchorId: "c4-vasily3" },
  "c4-s13": { sectionId: "c4-b5", anchorId: "c4-pskov" },
  "c4-s14": { sectionId: "c4-b5", anchorId: "c4-smolensk" },
  "c4-s15": { sectionId: "c4-b5", anchorId: "c4-ryazan" },
  "c4-s16": { sectionId: "c4-b3", anchorId: "c4-symbols" },
  "c4-s17": { sectionId: "c4-b4", anchorId: "c4-mestnichestvo" },
};

export const chapter4SummaryTargets: Record<string, BookTarget> = {
  "c4-t1": { sectionId: "c4-b2", anchorId: "c4-vasily1" },
  "c4-t2": { sectionId: "c4-b2", anchorId: "c4-timur" },
  "c4-t3": { sectionId: "c4-b1", anchorId: "c4-grunwald" },
  "c4-t4": { sectionId: "c4-b2", anchorId: "c4-feudal-war" },
  "c4-t5": { sectionId: "c4-b2", anchorId: "c4-feudal-war" },
  "c4-t6": { sectionId: "c4-b2", anchorId: "c4-autocephaly" },
  "c4-t7": { sectionId: "c4-b3", anchorId: "c4-ivan3" },
  "c4-t8": { sectionId: "c4-b3", anchorId: "c4-novgorod" },
  "c4-t9": { sectionId: "c4-b3", anchorId: "c4-ugra" },
  "c4-t10": { sectionId: "c4-b3", anchorId: "c4-tver" },
  "c4-t11": { sectionId: "c4-b4", anchorId: "c4-sudebnik" },
  "c4-t12": { sectionId: "c4-b5", anchorId: "c4-vasily3" },
  "c4-t13": { sectionId: "c4-b5", anchorId: "c4-pskov" },
  "c4-t14": { sectionId: "c4-b5", anchorId: "c4-smolensk" },
  "c4-t15": { sectionId: "c4-b5", anchorId: "c4-ryazan" },
};
