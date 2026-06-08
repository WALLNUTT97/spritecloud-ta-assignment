import { expect, Page } from '@playwright/test';
import { SauceDemoProduct } from '../types/products';

export class CheckoutPage {

  constructor(private readonly page: Page) {}
    
    async validatePriceTotal(expectedProducts: SauceDemoProduct[]): Promise<void> {
        const expectedItemTotal = expectedProducts.reduce(
            (total, product) => total + product.price,
            0,
        );
        
        await expect(this.page.getByTestId('subtotal-label')).toHaveText(
            `Item total: $${expectedItemTotal.toFixed(2)}`,
        );
    }

    async finishOrder(): Promise<void> {
        await this.page.getByTestId('finish').click();
    }

    async validateOrderComplete(): Promise<void> {
        await expect(this.page).toHaveURL(/checkout-complete/);

        await expect(this.page.getByTestId('complete-header')).toHaveText(
            'Thank you for your order!',
        );

        await expect(this.page.getByTestId('complete-text')).toContainText(
            'Your order has been dispatched',
        );

        await expect(this.page.getByTestId('back-to-products')).toBeVisible();
        await this.page.getByTestId('back-to-products').click();
    }
}