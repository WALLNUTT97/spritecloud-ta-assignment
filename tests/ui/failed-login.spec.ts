import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/loginPage";
import { SauceDemoUsers } from "../../src/data/sauceDemoUsers";

let loginPage: LoginPage;

test.describe("Full checkout flow from logged out state", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await page.goto("/");
  });

  test("Validate negative login attempts", async ({ page }) => {
    await test.step("Attempt to log in with invalid credentials", async () => {
      await loginPage.login(SauceDemoUsers.lockedOut);
      await loginPage.expectLoginError("Sorry, this user has been locked out.");
    });

    await test.step("Gather API response for locked out user", async () => {
      const [response] = await Promise.all([
        page.waitForResponse(
          (response) =>
            response.url().includes("/api/") && response.status() === 401,
        ),
        loginPage.login(SauceDemoUsers.lockedOut),
      ]);
      const responseBody = await response.json();
      expect(responseBody).toHaveProperty("error");

      const errorPayload =
        typeof responseBody.error === "string"
          ? JSON.parse(responseBody.error)
          : responseBody.error;

      expect(errorPayload).toEqual({
        code: 6,
        message: "Unauthorized request",
      });
    });
  });
});
