import type { BookSection, BookTarget } from "./book-data";

export const chapter3BookSections: BookSection[] = [
  {
    id: "c3-b1",
    chapterId: 3,
    title: "§ 21. Чингисхан и его империя",
    sortKey: 300,
    sourcePath: "books/russian-history/part-1/17.php.html",
  },
  {
    id: "c3-b2",
    chapterId: 3,
    title: "§ 22-23. Натиск на русские земли с востока",
    sortKey: 310,
    sourcePath: "books/russian-history/part-1/18.php.html",
  },
  {
    id: "c3-b3",
    chapterId: 3,
    title: "§ 24-25. Отражение агрессии с запада",
    sortKey: 320,
    sourcePath: "books/russian-history/part-1/19.php.html",
  },
  {
    id: "c3-b4",
    chapterId: 3,
    title: "§ 26-27. Русские земли и Золотая Орда",
    sortKey: 330,
    sourcePath: "books/russian-history/part-1/20.php.html",
  },
  {
    id: "c3-b5",
    chapterId: 3,
    title: "§ 28-29. Русь и Великое княжество Литовское",
    sortKey: 340,
    sourcePath: "books/russian-history/part-1/21.php.html",
  },
  {
    id: "c3-b6",
    chapterId: 3,
    title: "§ 30. Северо-Восточная Русь в конце XIII — начале XIV в.",
    sortKey: 350,
    sourcePath: "books/russian-history/part-1/22.php.html",
  },
  {
    id: "c3-b7",
    chapterId: 3,
    title: "§ 31. Возвышение Москвы",
    sortKey: 360,
    sourcePath: "books/russian-history/part-1/23.php.html",
  },
  {
    id: "c3-b8",
    chapterId: 3,
    title: "§ 32-33. Победа на Куликовом поле",
    sortKey: 370,
    sourcePath: "books/russian-history/part-1/24.php.html",
  },
];

export const chapter3StudyCardTargets: Record<string, BookTarget> = {
  "c3-s1": { sectionId: "c3-b1", anchorId: "c3-kalka" },
  "c3-s2": { sectionId: "c3-b2", anchorId: "c3-batu" },
  "c3-s3": { sectionId: "c3-b3", anchorId: "c3-neva" },
  "c3-s4": { sectionId: "c3-b3", anchorId: "c3-ice" },
  "c3-s5": { sectionId: "c3-b4", anchorId: "c3-horde" },
  "c3-s6": { sectionId: "c3-b7", anchorId: "c3-kalita" },
  "c3-s7": { sectionId: "c3-b7", anchorId: "c3-tver-uprising" },
  "c3-s8": { sectionId: "c3-b8", anchorId: "c3-dmitry" },
  "c3-s9": { sectionId: "c3-b8", anchorId: "c3-vozha" },
  "c3-s10": { sectionId: "c3-b8", anchorId: "c3-kulikovo" },
  "c3-s11": { sectionId: "c3-b8", anchorId: "c3-tokhtamysh" },
  "c3-s12": { sectionId: "c3-b1", anchorId: "c3-chinggis" },
  "c3-s13": { sectionId: "c3-b4", anchorId: "c3-horde-rule" },
  "c3-s14": { sectionId: "c3-b6", anchorId: "c3-moscow-tver" },
};

export const chapter3SummaryTargets: Record<string, BookTarget> = {
  "c3-t1": { sectionId: "c3-b1", anchorId: "c3-kalka" },
  "c3-t2": { sectionId: "c3-b2", anchorId: "c3-batu" },
  "c3-t3": { sectionId: "c3-b3", anchorId: "c3-neva" },
  "c3-t4": { sectionId: "c3-b3", anchorId: "c3-ice" },
  "c3-t5": { sectionId: "c3-b4", anchorId: "c3-horde" },
  "c3-t6": { sectionId: "c3-b7", anchorId: "c3-kalita" },
  "c3-t7": { sectionId: "c3-b7", anchorId: "c3-tver-uprising" },
  "c3-t8": { sectionId: "c3-b8", anchorId: "c3-dmitry" },
  "c3-t9": { sectionId: "c3-b8", anchorId: "c3-vozha" },
  "c3-t10": { sectionId: "c3-b8", anchorId: "c3-kulikovo" },
  "c3-t11": { sectionId: "c3-b8", anchorId: "c3-tokhtamysh" },
};
