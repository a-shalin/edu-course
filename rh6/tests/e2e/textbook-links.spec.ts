import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, type Page, test } from "@playwright/test";
import {
  chapters,
  getChapterSummaryByChapter,
  getStudyCardsByChapter,
  getSupportingStudyCardsByPracticeItem,
} from "../../src/lib/course-data";
import {
  buildBookReaderHref,
  getBookSection,
  getBookTargetForStudyCard,
  getBookTargetForSummaryEntry,
  getBookTargetForSupportingCards,
  type BookTarget,
} from "../../src/lib/book-data";
import { getPracticeItemsByChapter } from "../../src/lib/practice";
import { TEXTBOOK_ROOT_PATH } from "../../src/lib/course-config";

type LinkCase = {
  label: string;
  target: BookTarget | undefined;
};

function collectTextbookLinkCases(): LinkCase[] {
  return chapters.flatMap((chapter) => {
    if (chapter.status !== "ready") {
      return [];
    }

    const studyCardCases = getStudyCardsByChapter(chapter.id).map((card) => ({
      label: `chapter ${chapter.id} study card ${card.id} (${card.title})`,
      target: getBookTargetForStudyCard(card.id),
    }));

    const summaryCases = getChapterSummaryByChapter(chapter.id).map((entry) => ({
      label: `chapter ${chapter.id} summary entry ${entry.id} (${entry.title})`,
      target: getBookTargetForSummaryEntry(entry.id),
    }));

    const practiceCases = getPracticeItemsByChapter(chapter.id).map((item) => {
      const supportingCards = getSupportingStudyCardsByPracticeItem(item.id);

      return {
        label: `chapter ${chapter.id} practice item ${item.id} (${item.title})`,
        target: getBookTargetForSupportingCards(supportingCards.map((card) => card.id)),
      };
    });

    return [...studyCardCases, ...summaryCases, ...practiceCases];
  });
}

async function answerCurrentQuestion(page: Page) {
  if (await page.getByTestId("practice-open-book").isVisible().catch(() => false)) {
    return;
  }

  const session = page.getByTestId("practice-session");
  const multiSelect = session.getByTestId("practice-multi-select");
  const singleChoice = session.getByTestId("practice-single-choice");

  if (await multiSelect.isVisible().catch(() => false)) {
    const submit = multiSelect.getByTestId("practice-submit");
    const options = multiSelect.locator('[data-testid^="practice-option-"]');
    const count = await options.count();

    for (let index = 0; index < count; index += 1) {
      if (await submit.isEnabled()) {
        break;
      }

      await options.nth(index).click();
    }

    await expect(submit).toBeEnabled();
    await submit.click();
    return;
  }

  if (await singleChoice.isVisible().catch(() => false)) {
    await singleChoice.locator('[data-testid^="practice-option-"]').first().click();
    return;
  }

  throw new Error("No visible scorable practice interaction found.");
}

async function advanceToQuestionWithTitle(page: Page, titles: string[]) {
  const titleLocator = page.getByTestId("practice-question-title");

  for (let attempt = 0; attempt < 80; attempt += 1) {
    const currentTitle = (await titleLocator.textContent())?.trim();

    if (currentTitle && titles.includes(currentTitle)) {
      return currentTitle;
    }

    await answerCurrentQuestion(page);
    await expect(page.getByTestId("practice-next")).toBeVisible();
    await page.getByTestId("practice-next").click({ force: true });
  }

  throw new Error(`Could not find any of the expected question titles: ${titles.join(", ")}`);
}

async function advanceToQuestionContainingText(page: Page, text: string) {
  const session = page.getByTestId("practice-session");
  await expect(session).toBeVisible();

  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (await session.getByText(text, { exact: true }).isVisible().catch(() => false)) {
      return;
    }

    await answerCurrentQuestion(page);
    await expect(page.getByTestId("practice-next")).toBeVisible();
    await page.getByTestId("practice-next").click({ force: true });
  }

  throw new Error(`Could not find question text: ${text}`);
}

async function expectReaderAtAnchor(page: Page, anchorId: string, textPattern: RegExp) {
  const frameElement = page.getByTestId("book-reader-frame");
  await expect(frameElement).toHaveAttribute("src", new RegExp(`#${anchorId}$`));

  const frame = page.frameLocator('[data-testid="book-reader-frame"]');
  await expect(frame.locator(`#${anchorId}`)).toHaveCount(1);
  await expect(frame.locator(".course-reader-highlight")).toContainText(textPattern);

  const anchorTop = await frame.locator(`#${anchorId}`).evaluate((node) => {
    return node.getBoundingClientRect().top;
  });

  expect(anchorTop).toBeGreaterThanOrEqual(-4);
  expect(anchorTop).toBeLessThanOrEqual(120);
}

test.describe("RH6 textbook links", () => {
  test("all card, summary, and practice links resolve to anchored reader targets", () => {
    const failures = collectTextbookLinkCases().flatMap((linkCase) => {
      const errors: string[] = [];
      const target = linkCase.target;

      if (!target) {
        return [`${linkCase.label}: missing target`];
      }

      const section = getBookSection(target.sectionId);

      if (!section) {
        errors.push(`${linkCase.label}: unknown section ${target.sectionId}`);
      }

      if (!target.anchorId) {
        errors.push(`${linkCase.label}: missing anchorId`);
      }

      const href = buildBookReaderHref(target);

      if (!href) {
        errors.push(`${linkCase.label}: could not build reader href`);
      }

      if (section && target.anchorId) {
        const sourceHtml = readFileSync(
          path.join(process.cwd(), TEXTBOOK_ROOT_PATH, section.sourcePath),
          "utf8"
        );

        if (!sourceHtml.includes(`id="${target.anchorId}"`)) {
          errors.push(
            `${linkCase.label}: anchor ${target.anchorId} missing in ${section.sourcePath}`
          );
        }
      }

      return errors;
    });

    expect(failures).toEqual([]);
  });

  test("opens a study card at the highlighted textbook passage", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
    await page.goto("/chapter/1");

    await page.getByTestId("study-card-c1-f25").click();
    await expect(page.getByTestId("book-reader")).toBeVisible();
    await expectReaderAtAnchor(page, "c1-oleg-kiev", /Объединение двух центров славян Олегом/);
  });

  test("opens practice feedback at the supporting textbook passage", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
    await page.goto("/chapter/1");

    await advanceToQuestionWithTitle(page, [
      "В каком году произошло объединение Киева и Новгор...",
    ]);
    await answerCurrentQuestion(page);
    await expect(page.getByTestId("practice-open-book")).toBeVisible();
    await page.getByTestId("practice-open-book").click();
    await expect(page.getByTestId("book-reader")).toBeVisible();
    await expectReaderAtAnchor(page, "c1-oleg-kiev", /Объединение двух центров славян Олегом/);
  });

  test("opens the вотчина term question at the textbook ownership passage", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
    await page.goto("/chapter/1");

    await advanceToQuestionContainingText(
      page,
      "«Так называли на Руси земельное владение, которое передавалось по наследству»."
    );
    await answerCurrentQuestion(page);
    await expect(page.getByTestId("practice-open-book")).toBeVisible();
    await page.getByTestId("practice-open-book").click();
    await expect(page.getByTestId("book-reader")).toBeVisible();
    await expectReaderAtAnchor(page, "c1-votchina", /Развитие Руси в 1054—1132 гг/);
  });

  test("resets the reader to the current chapter after sidebar navigation", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
    await page.goto("/chapter/1");

    await page.getByTestId("study-card-c1-f25").click();
    await expect(page.getByTestId("book-reader")).toBeVisible();
    await expectReaderAtAnchor(page, "c1-oleg-kiev", /Объединение двух центров славян Олегом/);

    await page.getByTestId("sidebar-chapter-link-4").click();
    await expect(
      page.getByRole("heading", { name: /Формирование единого Русского государства/ })
    ).toBeVisible();
    await expect(page.getByTestId("book-reader")).toBeHidden();

    await page.getByTestId("book-reader-toggle").click();
    await expect(page.getByTestId("book-reader-frame")).toHaveAttribute(
      "src",
      /\/reader\/book\/books\/russian-history\/part-1\/26\.php\.html$/
    );
  });
});
