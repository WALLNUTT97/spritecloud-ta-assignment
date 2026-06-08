import { test, Page } from '@playwright/test';
import { sauceDemoUsers } from '../../src/data/sauceDemoUsers';
import { LoginPage } from '../../src/pages/LoginPage';
import { InventoryPage } from '../../src/pages/inventoryPage';
import { sauceDemoProductInfo } from '../../src/data/sauceDemoProducts';

interface TestPages {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
}

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.describe("Full checkout flow from logged out state", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await page.goto('/');
  });

  test('Complete checkout with two products and validates the final price', async ({page}) => {
    await test.step('Log in as a standard user', async () => {
        await loginPage.login(sauceDemoUsers.standard);
    });

    await test.step('Add two products to the basket', async () => {
        await inventoryPage.addItem(sauceDemoProductInfo.backpack.productButtonLabel);
        await inventoryPage.addItem(sauceDemoProductInfo.bikeLight.productButtonLabel);
    });

    await test.step('Validate basket contents', async () => {
        // assert products are present
    });

    await test.step('Complete checkout information', async () => {
        // enter customer details
    });

    await test.step('Validate checkout totals', async () => {
        // validate item total, tax, final total
    });

    await test.step('Place order and validate success', async () => {
        // finish and assert success
    });
  });
});