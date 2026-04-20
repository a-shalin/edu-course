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

const summaryTargetsFor = (targets: Record<string, BookTarget>): Record<string, BookTarget> =>
  Object.fromEntries(
    Object.entries(targets).map(([cardId, target]) => [`${cardId}-summary`, target])
  );

export const chapter3StudyCardTargets: Record<string, BookTarget> = {
  "c3-f1": { sectionId: "c3-b1", anchorId: "c3-chinggis" },
  "c3-f2": { sectionId: "c3-b1", anchorId: "c3-kalka" },
  "c3-f3": { sectionId: "c3-b2", anchorId: "c3-batu-campaign" },
  "c3-f4": { sectionId: "c3-b2", anchorId: "c3-batu" },
  "c3-f5": { sectionId: "c3-b2", anchorId: "c3-sit" },
  "c3-f6": { sectionId: "c3-b2", anchorId: "c3-kozelsk" },
  "c3-f7": { sectionId: "c3-b2", anchorId: "c3-kiev-fall" },
  "c3-f8": { sectionId: "c3-b3", anchorId: "c3-neva" },
  "c3-f9": { sectionId: "c3-b3", anchorId: "c3-ice" },
  "c3-f10": { sectionId: "c3-b4", anchorId: "c3-horde" },
  "c3-f11": { sectionId: "c3-b4", anchorId: "c3-horde-rule" },
  "c3-f12": { sectionId: "c3-b4", anchorId: "c3-horde-rule" },
  "c3-f13": { sectionId: "c3-b4", anchorId: "c3-horde-rule" },
  "c3-f14": { sectionId: "c3-b4", anchorId: "c3-census" },
  "c3-f15": { sectionId: "c3-b4", anchorId: "c3-horde" },
  "c3-f16": { sectionId: "c3-b8", anchorId: "c3-dmitry" },
  "c3-f17": { sectionId: "c3-b7", anchorId: "c3-kalita" },
  "c3-f18": { sectionId: "c3-b7", anchorId: "c3-kalita" },
  "c3-f19": { sectionId: "c1-b6", anchorId: "c1-yaroslav" },
  "c3-f20": { sectionId: "c3-b8", anchorId: "c3-kulikovo" },
  "c3-f21": { sectionId: "c3-b3", anchorId: "c3-neva" },
  "c3-f22": { sectionId: "c3-b8", anchorId: "c3-vozha" },
  "c3-f23": { sectionId: "c3-b8", anchorId: "c3-kulikovo" },
  "c3-f24": { sectionId: "c3-b8", anchorId: "c3-kulikovo" },
  "c3-f25": { sectionId: "c1-b6", anchorId: "c1-pvl" },
  "c3-f26": { sectionId: "c4-b6", anchorId: "c4-fioravanti" },
  "c3-f27": { sectionId: "c3-b2", anchorId: "c3-batu" },
  "c3-f28": { sectionId: "c1-b4", anchorId: "c1-svyatoslav" },
  "c3-f29": { sectionId: "c1-b6", anchorId: "c1-russkaya-pravda" },
  "c3-f30": { sectionId: "c3-b3", anchorId: "c3-ice" },
  "c3-f31": { sectionId: "c3-b8", anchorId: "c3-kulikovo" },
  "c3-f32": { sectionId: "c3-b1", anchorId: "c3-kalka" },
  "c3-f33": { sectionId: "c4-b3", anchorId: "c4-ugra" },
};

export const chapter3SummaryTargets: Record<string, BookTarget> = summaryTargetsFor(
  chapter3StudyCardTargets
);
