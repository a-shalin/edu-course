import { expect, type Page, test } from "@playwright/test";

async function closeReaderIfOpen(page: Page) {
  const reader = page.getByTestId("book-reader");

  if (await reader.isVisible().catch(() => false)) {
    await reader.getByRole("button", { name: "Скрыть", exact: true }).click();
    await expect(reader).toBeHidden();
  }
}

async function answerCurrentQuestion(page: Page) {
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
    await expect(
      multiSelect.getByText(/Верно|Нужно было выбрать другой набор пунктов/)
    ).toBeVisible();
    return;
  }

  if (await singleChoice.isVisible().catch(() => false)) {
    await singleChoice.locator('[data-testid^="practice-option-"]').first().click();
    await expect(
      singleChoice.getByText(/Верно|Неверно — правильный ответ:/)
    ).toBeVisible();
    return;
  }

  throw new Error("No supported visible practice interaction found.");
}

async function advanceToQuestionWithTitle(page: Page, titles: string[]) {
  const titleLocator = page.getByTestId("practice-question-title");

  for (let attempt = 0; attempt < 60; attempt += 1) {
    const currentTitle = (await titleLocator.textContent())?.trim();

    if (currentTitle && titles.includes(currentTitle)) {
      return currentTitle;
    }

    await answerCurrentQuestion(page);
    await expect(page.getByTestId("practice-next")).toBeVisible();
    await page.getByTestId("practice-next").click();
  }

  throw new Error(`Could not find any of the expected question titles: ${titles.join(", ")}`);
}

test.describe("course flow", () => {
  test("opens home, navigates chapters, and shows ready chapter 2", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "История России, 9 класс" })
    ).toBeVisible();

    await page.getByTestId("home-chapter-link-1").click();
    await expect(
      page.getByRole("heading", { name: /Россия в первой четверти XIX в\./ })
    ).toBeVisible();

    await page.getByTestId("sidebar-chapter-link-2").click();
    await expect(
      page.getByRole("heading", { name: /Россия во второй четверти XIX в\./ })
    ).toBeVisible();
    await expect(page.getByTestId("chapter-practice")).toBeVisible();
  });

  test("opens and navigates the textbook reader from summary and study cards", async ({ page }) => {
    await page.goto("/chapter/1");

    await page.getByTestId("book-reader-toggle").click();
    await expect(page.getByTestId("book-reader")).toBeVisible();
    await expect(page.getByTestId("book-reader-frame")).toBeVisible();

    await closeReaderIfOpen(page);

    await page.getByTestId("chapter-summary-toggle").click();
    await page.locator('[data-testid^="summary-entry-"]').first().click();
    await expect(page.getByTestId("book-reader")).toBeVisible();
    await expect(page.getByTestId("book-reader-frame")).toBeVisible();

    const sectionButtons = page.locator('[data-testid^="book-reader-section-"]');
    await expect(sectionButtons.first()).toBeVisible();

    if ((await sectionButtons.count()) > 1) {
      await sectionButtons.nth(1).click();
      await expect(page.getByTestId("book-reader-frame")).toBeVisible();
    }

    await closeReaderIfOpen(page);

    await page.locator('[data-testid^="study-card-"]').first().click();
    await expect(page.getByTestId("book-reader")).toBeVisible();
    await expect(page.getByTestId("book-reader-frame")).toBeVisible();
  });

  test("answers a practice question and opens the textbook from feedback", async ({ page }) => {
    await page.goto("/chapter/1");

    await expect(page.getByTestId("chapter-practice")).toBeVisible();
    await expect(page.getByTestId("practice-session")).toBeVisible();

    await answerCurrentQuestion(page);
    await expect(page.getByTestId("practice-open-book")).toBeVisible();
    await page.getByTestId("practice-open-book").click();
    await expect(page.getByTestId("book-reader")).toBeVisible();
    await closeReaderIfOpen(page);
    await expect(page.getByTestId("practice-next")).toBeVisible();
  });

  test("keeps the targeted anchor when opening the textbook from a study card", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
    await page.goto("/chapter/2");

    await page.getByTestId("study-card-c2-s18").click();
    await expect(page.getByTestId("book-reader")).toBeVisible();
    await expect(page.getByTestId("book-reader-frame")).toHaveAttribute(
      "src",
      /#c2-architecture$/
    );
  });

  test("keeps the targeted anchor when opening the textbook from question feedback", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
    await page.goto("/chapter/2");

    await advanceToQuestionWithTitle(page, [
      "Памятник архитектуры первой половины XIX века",
      "Архитектурный памятник первой половины XIX века",
    ]);

    await answerCurrentQuestion(page);
    await expect(page.getByTestId("practice-open-book")).toBeVisible();
    await page.getByTestId("practice-open-book").click();
    await expect(page.getByTestId("book-reader")).toBeVisible();
    await expect(page.getByTestId("book-reader-frame")).toHaveAttribute(
      "src",
      /#c2-architecture$/
    );
  });
});
