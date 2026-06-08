import { test, expect } from '@playwright/test';
import { SauceDemoUsers } from '../../src/data/sauceDemoUsers';
import { LoginPage } from '../../src/pages/loginPage';
import { InventoryPage } from '../../src/pages/inventoryPage';
import { SauceDemoProductInfo, SortDirections } from '../../src/data/sauceDemoProducts';

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

test.describe("Full checkout flow from logged out state", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await page.goto('/');
  });

  test('Validate sorting functionality', async ({page}) => {
    await test.step('Log in as a standard user', async () => {
        await loginPage.login(SauceDemoUsers.standard);
    });

    await test.step('Validate A-Z sorting', async () => {
        await inventoryPage.sortBy(SortDirections.nameAscending);
        const gatheredProductNames = await inventoryPage.getVisibleProductNames();
        await inventoryPage.compareProductNameOrder(gatheredProductNames, SortDirections.nameAscending);
    });

    await test.step('Validate Z-A sorting', async () => {
        await inventoryPage.sortBy(SortDirections.nameDescending);
        const gatheredProductNames = await inventoryPage.getVisibleProductNames();
        await inventoryPage.compareProductNameOrder(gatheredProductNames, SortDirections.nameDescending);
    });

    await test.step('Validate Price: Low to High sorting', async () => {
        await inventoryPage.sortBy(SortDirections.priceLowHigh);
        const gatheredProductPrices = await inventoryPage.getVisibleProductPrices();
        await inventoryPage.compareProductPriceOrder(gatheredProductPrices, SortDirections.priceLowHigh);
    });

    await test.step('Validate Price: High to Low sorting', async () => {
        await inventoryPage.sortBy(SortDirections.priceHighLow);
        const gatheredProductPrices = await inventoryPage.getVisibleProductPrices();
        await inventoryPage.compareProductPriceOrder(gatheredProductPrices, SortDirections.priceHighLow);
    });
  });
});