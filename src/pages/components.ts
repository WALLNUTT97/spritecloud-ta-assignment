import { Page } from '@playwright/test';

export class HeaderComponent {
  constructor(private readonly page: Page) {}

  async openCart(): Promise<void> {
    await this.page.getByTestId('shopping-cart-link').click();
  }

  async burgerMenu(): Promise<void> {
    await this.page.getByTestId('react-burger-menu-btn').click();
  }
}