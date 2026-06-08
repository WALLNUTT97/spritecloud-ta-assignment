import { expect, Page } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

    async addItem(itemName: string): Promise<void> {
        await this.page.getByTestId(itemName).click();
    }

    async removeItem(itemName: string): Promise<void> {
        await this.page.getByTestId(itemName).click();
    }
}