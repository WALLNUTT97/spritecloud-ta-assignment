import { expect, Page } from '@playwright/test';
import { sauceDemoCredentials } from '../types/UserCredentials';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('/');
  }

  async login(credentials: sauceDemoCredentials): Promise<void> {
    await this.page.getByTestId('username').fill(credentials.username);
    await this.page.getByTestId('password').fill(credentials.password);
    await this.page.getByTestId('login-button').click();
  }

  async expectLoginError(expectedMessage: string): Promise<void> {
    await expect(this.page.getByTestId('error')).toContainText(expectedMessage);
  }

  async expectVisible(): Promise<void> {
    await expect(this.page.getByTestId('login-button')).toBeVisible();
  }
}