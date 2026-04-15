import { expect, test } from "@playwright/test";

test.describe("rh6 shell", () => {
  test("renders the empty course home page", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: "История России, 6 класс" })
    ).toBeVisible();
    await expect(page.getByTestId("home-empty-state")).toBeVisible();
    await expect(page.getByTestId("sidebar-empty-chapters")).toBeVisible();
    await expect(page.locator('[data-testid^="home-chapter-link-"]')).toHaveCount(0);
  });

  test("shows chapter not found when no chapters exist yet", async ({ page }) => {
    await page.goto("/chapter/1");

    await expect(page.getByRole("heading", { name: "Глава не найдена" })).toBeVisible();
  });
});
