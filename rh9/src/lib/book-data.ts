import {
  chapter3BookSections,
  chapter3StudyCardTargets,
  chapter3SummaryTargets,
} from "./chapter3-book-data";
import {
  chapter4BookSections,
  chapter4StudyCardTargets,
  chapter4SummaryTargets,
} from "./chapter4-book-data";

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

export const bookSections: BookSection[] = [
  {
    id: "c1-b1",
    chapterId: 1,
    title: "§1. Россия и мир на рубеже XVIII—XIX вв.",
    sortKey: 100,
    sourcePath: "books/russian-history/part-1/1.php.html",
  },
  {
    id: "c1-b2",
    chapterId: 1,
    title: "§2. Александр I: начало правления. Реформы М. М. Сперанского",
    sortKey: 110,
    sourcePath: "books/russian-history/part-1/2.php.html",
  },
  {
    id: "c1-b3",
    chapterId: 1,
    title: "§3. Внешняя политика Александра I в 1801—1812 гг.",
    sortKey: 120,
    sourcePath: "books/russian-history/part-1/3.php.html",
  },
  {
    id: "c1-b4",
    chapterId: 1,
    title: "§4. Отечественная война 1812 г.",
    sortKey: 130,
    sourcePath: "books/russian-history/part-1/4.php.html",
  },
  {
    id: "c1-b5",
    chapterId: 1,
    title: "§5. Заграничные походы русской армии. Внешняя политика Александра I в 1813—1825 гг.",
    sortKey: 140,
    sourcePath: "books/russian-history/part-1/5.php.html",
  },
  {
    id: "c1-b6",
    chapterId: 1,
    title: "§6. Либеральные и охранительные тенденции во внутренней политике Александра I в 1815—1825 гг.",
    sortKey: 150,
    sourcePath: "books/russian-history/part-1/6.php.html",
  },
  {
    id: "c1-b7",
    chapterId: 1,
    title: "Национальная политика Александра I",
    sortKey: 160,
    sourcePath: "books/russian-history/part-1/7.php.html",
  },
  {
    id: "c1-b8",
    chapterId: 1,
    title: "§7. Социально-экономическое развитие страны в первой четверти XIX в.",
    sortKey: 170,
    sourcePath: "books/russian-history/part-1/8.php.html",
  },
  {
    id: "c1-b9",
    chapterId: 1,
    title: "§8-9. Общественное движение при Александре I. Выступление декабристов",
    sortKey: 180,
    sourcePath: "books/russian-history/part-1/9.php.html",
  },
  {
    id: "c2-b1",
    chapterId: 2,
    title: "§10. Реформаторские и консервативные тенденции во внутренней политике Николая I",
    sortKey: 200,
    sourcePath: "books/russian-history/part-1/10.php.html",
  },
  {
    id: "c2-b2",
    chapterId: 2,
    title: "§11. Социально-экономическое развитие страны во второй четверти XIX в.",
    sortKey: 210,
    sourcePath: "books/russian-history/part-1/11.php.html",
  },
  {
    id: "c2-b3",
    chapterId: 2,
    title: "§12. Общественное движение при Николае I",
    sortKey: 220,
    sourcePath: "books/russian-history/part-1/12.php.html",
  },
  {
    id: "c2-b4",
    chapterId: 2,
    title: "Национальная и религиозная политика Николая I. Этнокультурный облик страны",
    sortKey: 230,
    sourcePath: "books/russian-history/part-1/13.php.html",
  },
  {
    id: "c2-b5",
    chapterId: 2,
    title: "§13-14. Внешняя политика Николая I. Кавказская война 1817—1864 гг. Крымская война 1853—1856 гг.",
    sortKey: 240,
    sourcePath: "books/russian-history/part-1/14.php.html",
  },
  {
    id: "c2-b6",
    chapterId: 2,
    title: "Культурное пространство империи в первой половине XIX в.: Наука и образование",
    sortKey: 250,
    sourcePath: "books/russian-history/part-1/15.php.html",
  },
  {
    id: "c2-b7",
    chapterId: 2,
    title: "Культурное пространство империи в первой половине XIX в.: Художественная культура народов России",
    sortKey: 260,
    sourcePath: "books/russian-history/part-1/16.php.html",
  },
  ...chapter3BookSections,
  ...chapter4BookSections,
];

const studyCardTargets: Record<string, BookTarget> = {
  "c1-s1": { sectionId: "c1-b1", anchorId: "c1-intro-overview" },
  "c1-s2": { sectionId: "c1-b2", anchorId: "c1-neg-committee" },
  "c1-s3": { sectionId: "c1-b2", anchorId: "c1-admin-reform" },
  "c1-s4": { sectionId: "c1-b2", anchorId: "c1-peasant-policy" },
  "c1-s5": { sectionId: "c1-b2", anchorId: "c1-speransky-plan" },
  "c1-s6": { sectionId: "c1-b2", anchorId: "c1-education-reform" },
  "c1-s7": { sectionId: "c1-b3", anchorId: "c1-france-tilsit" },
  "c1-s8": { sectionId: "c1-b3", anchorId: "c1-eastern-policy" },
  "c1-s9": { sectionId: "c1-b8", anchorId: "c1-socio-economic" },
  "c1-s10": { sectionId: "c1-b4", anchorId: "c1-war-1812" },
  "c1-s11": { sectionId: "c1-b4", anchorId: "c1-napoleon-moscow" },
  "c1-s12": { sectionId: "c1-b5", anchorId: "c1-foreign-campaigns" },
  "c1-s13": { sectionId: "c1-b5", anchorId: "c1-vienna-congress" },
  "c1-s14": { sectionId: "c1-b8", anchorId: "c1-military-settlements" },
  "c1-s15": { sectionId: "c1-b9", anchorId: "c1-secret-societies" },
  "c1-s16": { sectionId: "c1-b9", anchorId: "c1-dynastic-crisis" },
  "c1-s17": { sectionId: "c1-b9", anchorId: "c1-dynastic-crisis" },
  "c1-s18": { sectionId: "c1-b8", anchorId: "c1-military-settlements" },
  "c2-s1": { sectionId: "c2-b1", anchorId: "c2-nicholas-start" },
  "c2-s2": { sectionId: "c2-b1", anchorId: "c2-state-apparatus" },
  "c2-s3": { sectionId: "c2-b1", anchorId: "c2-nobility-policy" },
  "c2-s4": { sectionId: "c2-b1", anchorId: "c2-peasant-reform" },
  "c2-s5": { sectionId: "c2-b2", anchorId: "c2-industrial-revolution" },
  "c2-s6": { sectionId: "c2-b2", anchorId: "c2-transport-kankrin" },
  "c2-s7": { sectionId: "c2-b3", anchorId: "c2-official-nationality" },
  "c2-s8": { sectionId: "c2-b3", anchorId: "c2-liberal-movement" },
  "c2-s9": { sectionId: "c2-b3", anchorId: "c2-radical-movement" },
  "c2-s10": { sectionId: "c2-b4", anchorId: "c2-poland-uprising" },
  "c2-s11": { sectionId: "c2-b5", anchorId: "c2-caucasus-war" },
  "c2-s12": { sectionId: "c2-b5", anchorId: "c2-eastern-question" },
  "c2-s13": { sectionId: "c2-b5", anchorId: "c2-europe-1849" },
  "c2-s14": { sectionId: "c2-b5", anchorId: "c2-crimean-war-start" },
  "c2-s15": { sectionId: "c2-b6", anchorId: "c2-science-travel" },
  "c2-s16": { sectionId: "c2-b6", anchorId: "c2-education" },
  "c2-s17": { sectionId: "c2-b7", anchorId: "c2-art-music" },
  "c2-s18": { sectionId: "c2-b7", anchorId: "c2-architecture" },
  "c2-s19": { sectionId: "c2-b2", anchorId: "c2-transport-kankrin" },
  "c2-s20": { sectionId: "c2-b5", anchorId: "c2-crimean-war-start" },
  ...chapter3StudyCardTargets,
  ...chapter4StudyCardTargets,
};

const summaryTargets: Record<string, BookTarget> = {
  "c1-t1": { sectionId: "c1-b1", anchorId: "c1-intro-overview" },
  "c1-t2": { sectionId: "c1-b2", anchorId: "c1-alexander-start" },
  "c1-t3": { sectionId: "c1-b2", anchorId: "c1-neg-committee" },
  "c1-t4": { sectionId: "c1-b2", anchorId: "c1-education-reform" },
  "c1-t5": { sectionId: "c1-b3", anchorId: "c1-france-tilsit" },
  "c1-t6": { sectionId: "c1-b3", anchorId: "c1-eastern-policy" },
  "c1-t7": { sectionId: "c1-b8", anchorId: "c1-industry-trade" },
  "c1-t8": { sectionId: "c1-b2", anchorId: "c1-speransky-plan" },
  "c1-t9": { sectionId: "c1-b4", anchorId: "c1-war-1812" },
  "c1-t10": { sectionId: "c1-b5", anchorId: "c1-foreign-campaigns" },
  "c1-t11": { sectionId: "c1-b5", anchorId: "c1-vienna-congress" },
  "c1-t12": { sectionId: "c1-b7", anchorId: "c1-poland-constitution" },
  "c1-t13": { sectionId: "c1-b6", anchorId: "c1-reform-retreat" },
  "c1-t14": { sectionId: "c1-b9", anchorId: "c1-secret-societies" },
  "c1-t15": { sectionId: "c1-b9", anchorId: "c1-dynastic-crisis" },
  "c1-t16": { sectionId: "c1-b9", anchorId: "c1-chernigov-regiment" },
  "c2-t1": { sectionId: "c2-b1", anchorId: "c2-nicholas-start" },
  "c2-t2": { sectionId: "c2-b1", anchorId: "c2-state-apparatus" },
  "c2-t3": { sectionId: "c2-b5", anchorId: "c2-eastern-question" },
  "c2-t4": { sectionId: "c2-b5", anchorId: "c2-eastern-question" },
  "c2-t5": { sectionId: "c2-b4", anchorId: "c2-poland-uprising" },
  "c2-t6": { sectionId: "c2-b3", anchorId: "c2-official-nationality" },
  "c2-t7": { sectionId: "c2-b1", anchorId: "c2-peasant-reform" },
  "c2-t8": { sectionId: "c2-b2", anchorId: "c2-industrial-revolution" },
  "c2-t9": { sectionId: "c2-b3", anchorId: "c2-liberal-movement" },
  "c2-t10": { sectionId: "c2-b5", anchorId: "c2-caucasus-war" },
  "c2-t11": { sectionId: "c2-b5", anchorId: "c2-europe-1849" },
  "c2-t12": { sectionId: "c2-b5", anchorId: "c2-crimean-war-start" },
  "c2-t13": { sectionId: "c2-b5", anchorId: "c2-crimean-war-start" },
  "c2-t14": { sectionId: "c2-b5", anchorId: "c2-sevastopol-defense" },
  "c2-t15": { sectionId: "c2-b5", anchorId: "c2-paris-peace" },
  "c2-t16": { sectionId: "c2-b6", anchorId: "c2-science-travel" },
  "c2-t17": { sectionId: "c2-b7", anchorId: "c2-architecture" },
  ...chapter3SummaryTargets,
  ...chapter4SummaryTargets,
};

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
