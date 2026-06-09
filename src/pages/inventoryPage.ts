import { expect, Page } from "@playwright/test";
import { SauceDemoProduct } from "../types/products";
import {
  SauceDemoProductInfo,
  SortDirections,
} from "../data/sauceDemoProducts";

export class InventoryPage {
  constructor(private readonly page: Page) {}

  async addItem(product: SauceDemoProduct): Promise<void> {
    await this.page.getByTestId(product.addToCartTestId).click();
  }

  async removeItem(product: SauceDemoProduct): Promise<void> {
    await this.page.getByTestId(product.removeFromCartTestId).click();
  }

  async navigateToProductPage(product: SauceDemoProduct): Promise<void> {
    await this.page.getByTestId(product.productProductPageLink).click();
  }

  async sortBy(option: string): Promise<void> {
    await this.page.getByTestId("product-sort-container").selectOption(option);
  }

  async getVisibleProductNames(): Promise<string[]> {
    return this.page.getByTestId("inventory-item-name").allTextContents();
  }

  async getVisibleProductPrices(): Promise<number[]> {
    const priceTexts = await this.page
      .getByTestId("inventory-item-price")
      .allTextContents();
    return priceTexts.map((text) => parseFloat(text.replace("$", "")));
  }

  async compareProductNameOrder(
    gatheredProductNames: string[],
    direction: string,
  ): Promise<void> {
    const expectedProductNames = Object.values(SauceDemoProductInfo)
      .map((product) => product.name)
      .sort((a, b) => {
        if (direction === SortDirections.nameAscending) {
          return a.localeCompare(b);
        } else if (direction === SortDirections.nameDescending) {
          return b.localeCompare(a);
        }
        return 0;
      });
    await expect(gatheredProductNames).toEqual(expectedProductNames);
  }

  async compareProductPriceOrder(
    gatheredProductPrices: number[],
    direction: string,
  ): Promise<void> {
    const expectedProductPrices = Object.values(SauceDemoProductInfo)
      .map((product) => product.price)
      .sort((a, b) => {
        if (direction === SortDirections.priceLowHigh) {
          return a - b;
        } else if (direction === SortDirections.priceHighLow) {
          return b - a;
        }
        return 0;
      });
    await expect(gatheredProductPrices).toEqual(expectedProductPrices);
  }
}
