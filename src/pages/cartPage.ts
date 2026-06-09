import { expect, Page } from "@playwright/test";
import { SauceDemoProduct } from "../types/products";

export class CartPage {
  constructor(private readonly page: Page) {}

  async validateCartContents(
    expectedProducts: SauceDemoProduct[],
  ): Promise<void> {
    const cartItems = this.page.getByTestId("inventory-item");
    const expectedProductNames = expectedProducts.map(
      (product) => product.name,
    );

    await expect(cartItems).toHaveCount(expectedProducts.length);
    await expect(cartItems.getByTestId("inventory-item-name")).toHaveText(
      expectedProductNames,
    );
  }

  async validateCartIsEmpty(): Promise<void> {
    await this.validateCartContents([]);
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.getByTestId("checkout").click();
  }
}
