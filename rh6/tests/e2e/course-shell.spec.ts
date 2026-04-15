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

  for (let attempt = 0; attempt < 40; attempt += 1) {
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

test.describe("RH6 course flow", () => {
  test("opens home, shows chapters, and navigates into the course", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "История России, 6 класс" })
    ).toBeVisible();
    await expect(page.getByTestId("home-chapter-link-1")).toBeVisible();
    await expect(page.getByTestId("home-chapter-link-4")).toBeVisible();

    await page.getByTestId("home-chapter-link-1").click();
    await expect(
      page.getByRole("heading", {
        name: /Народы и государства на территории нашей страны в древности/,
      })
    ).toBeVisible();

    await page.getByTestId("sidebar-chapter-link-4").click();
    await expect(
      page.getByRole("heading", { name: /Формирование единого Русского государства/ })
    ).toBeVisible();
    await expect(page.getByTestId("chapter-practice")).toBeVisible();
  });

  test("opens the reader from chronology and study cards", async ({ page }) => {
    await page.goto("/chapter/1");

    await page.getByTestId("chapter-summary-toggle").click();
    await page.locator('[data-testid^="summary-entry-"]').first().click();
    await expect(page.getByTestId("book-reader")).toBeVisible();

    await closeReaderIfOpen(page);

    await page.locator('[data-testid="study-card-c1-s8"]').click();
    await expect(page.getByTestId("book-reader")).toBeVisible();
    await expect(page.getByTestId("book-reader-frame")).toBeVisible();
  });

  test("answers practice questions and opens the textbook from feedback", async ({ page }) => {
    await page.goto("/chapter/3");

    await expect(page.getByTestId("practice-session")).toBeVisible();

    for (let attempt = 0; attempt < 3; attempt += 1) {
      await answerCurrentQuestion(page);
      await expect(page.getByTestId("practice-open-book")).toBeVisible();
      await page.getByTestId("practice-open-book").click();
      await expect(page.getByTestId("book-reader")).toBeVisible();
      await closeReaderIfOpen(page);
      await expect(page.getByTestId("practice-next")).toBeVisible();
      await page.getByTestId("practice-next").click({ force: true });
    }
  });

  test("keeps the targeted anchor when opening the textbook from a study card", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
    await page.goto("/chapter/4");

    await page.getByTestId("study-card-c4-s11").click();
    await expect(page.getByTestId("book-reader")).toBeVisible();
    await expect(page.getByTestId("book-reader-frame")).toHaveAttribute(
      "src",
      /#c4-sudebnik$/
    );
  });

  test("keeps the targeted anchor when opening the textbook from practice feedback", async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });
    await page.goto("/chapter/4");

    await advanceToQuestionWithTitle(page, ["Судебник Ивана III"]);
    await answerCurrentQuestion(page);
    await expect(page.getByTestId("practice-open-book")).toBeVisible();
    await page.getByTestId("practice-open-book").click();
    await expect(page.getByTestId("book-reader")).toBeVisible();
    await expect(page.getByTestId("book-reader-frame")).toHaveAttribute(
      "src",
      /#c4-sudebnik$/
    );
  });
});
