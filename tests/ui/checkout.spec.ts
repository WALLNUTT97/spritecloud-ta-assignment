import { test, expect } from '@playwright/test';
import { SauceDemoUsers } from '../../src/data/sauceDemoUsers';
import { LoginPage } from '../../src/pages/loginPage';
import { CartPage } from '../../src/pages/cartPage';
import { CheckoutPage } from '../../src/pages/checkoutPage';
import { InventoryPage } from '../../src/pages/inventoryPage';
import { SauceDemoProductInfo } from '../../src/data/sauceDemoProducts';
import { HeaderComponent } from '../../src/pages/components';

let loginPage: LoginPage;
let checkoutPage: CheckoutPage;
let inventoryPage: InventoryPage;
let headerComponent: HeaderComponent;
let cartPage: CartPage;


test.describe("Full checkout flow from logged out state", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    headerComponent = new HeaderComponent(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await page.goto('/');
  });

  test('Complete checkout with two products and validates the final price', async ({page}) => {
    await test.step('Log in as a standard user', async () => {
        await loginPage.login(SauceDemoUsers.standard);
    });

    await test.step('Add two products to the basket', async () => {
        await inventoryPage.addItem(SauceDemoProductInfo.backpack);
        await inventoryPage.addItem(SauceDemoProductInfo.bikeLight);
    });

    await test.step('Validate basket contents', async () => {
        await headerComponent.openCart();
        await cartPage.validateCartContents([SauceDemoProductInfo.backpack, SauceDemoProductInfo.bikeLight]);
        await cartPage.proceedToCheckout();
    });

    await test.step('Complete checkout information', async () => {
        await checkoutPage.enterCustomerInformation("Test", "User", "9876WE")
    });

    await test.step('Validate checkout totals', async () => {
        await checkoutPage.validatePriceTotal([SauceDemoProductInfo.backpack, SauceDemoProductInfo.bikeLight]);
    });

    await test.step('Place order and validate success', async () => {
        await checkoutPage.finishOrder();
        await checkoutPage.validateOrderComplete();
        await headerComponent.openCart();
        await cartPage.validateCartIsEmpty();
    });
  });
});