import { test, expect } from "@playwright/test";
import { apiConfig } from "../../src/config/apiConfig";

test.describe("DummyJSON API negative scenarios", () => {
  test("1. Attempt to perform a Login with invalid data", async ({
    request,
  }) => {
    const response = await request.post(
      `${apiConfig.dummyJsonBaseUrl}/auth/login`,
      {
        data: {
          username: "notAUser",
          password: "notAPassword",
        },
      },
    );
    expect(response.status()).toBe(400);
    const responseBody = await response.json();
    expect(responseBody.message).toBe("Invalid credentials");
  });

  test("2. Get an AUTH token with no session", async ({ request }) => {
    const response = await request.get(
      `${apiConfig.dummyJsonBaseUrl}/auth/me`,
      {
        headers: {
          Authorization: "Bearer notAToken",
        },
      },
    );
    expect(response.status()).toBe(401);
    const responseBody = await response.json();
    expect(responseBody.message).toBe("Invalid/Expired Token!");
  });
});
