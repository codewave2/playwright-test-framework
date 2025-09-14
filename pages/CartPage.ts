import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';

export class CartPage {
  private readonly checkoutButton: Locator = this.page.locator('[data-test="checkout"]');
  private readonly cartItemName = (name: string) =>
    this.page.locator('.cart_item .inventory_item_name', { hasText: name });

  constructor(private readonly page: Page) {}

  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  async verifyItemPresent(displayName: string) {
    await expect(
      this.cartItemName(displayName),
      `Expected cart to contain item: ${displayName}`,
    ).toBeVisible();
  }

  async verifyItemAbsent(displayName: string) {
    await expect(
      this.cartItemName(displayName),
      `Expected cart NOT to contain item: ${displayName}`,
    ).toHaveCount(0);
  }
}
