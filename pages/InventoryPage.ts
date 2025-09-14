import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

export class InventoryPage {
  private readonly cartIcon = this.page.locator('.shopping_cart_link');
  private readonly cartBadge = this.page.locator('.shopping_cart_badge');
  private readonly addToCartLocator = (productName: string) =>
    this.page.locator(`[data-test="add-to-cart-sauce-labs-${productName}"]`);
  private readonly removeFromCartLocator = (productName: string) =>
    this.page.locator(`[data-test="remove-sauce-labs-${productName}"]`);

  constructor(private readonly page: Page) {}

  async addProductsToCart(...productNames: string[]) {
    for (const productName of productNames) {
      await this.addToCartLocator(productName).click();
    }
  }

  async removeProductsFromCart(...productNames: string[]) {
    for (const productName of productNames) {
      await this.removeFromCartLocator(productName).click();
    }
  }

  async verifyProductAdded(productName: string) {
    await expect(
      this.removeFromCartLocator(productName),
      `Expected product '${productName}' to be in cart (remove button visible)`,
    ).toBeVisible();
    await expect(
      this.addToCartLocator(productName),
      `Add button for '${productName}' should disappear after adding`,
    ).toHaveCount(0);
  }

  async verifyProductRemovable(productName: string) {
    await expect(
      this.addToCartLocator(productName),
      `Add button for '${productName}' should be visible (product not in cart)`,
    ).toBeVisible();
    await expect(
      this.removeFromCartLocator(productName),
      `Remove button for '${productName}' should not be visible when not in cart`,
    ).toHaveCount(0);
  }

  async verifyProductsAdded(...productNames: string[]) {
    for (const name of productNames) await this.verifyProductAdded(name);
  }

  async verifyProductsRemovable(...productNames: string[]) {
    for (const name of productNames) await this.verifyProductRemovable(name);
  }

  async verifyCartCount(expected: number) {
    if (expected === 0) {
      await expect(this.cartBadge, 'Cart badge should not exist when cart count is 0').toHaveCount(
        0,
      );
      return;
    }
    await expect(this.cartBadge, `Cart badge should show count ${expected}`).toHaveText(
      String(expected),
    );
  }

  async goToCart() {
    await this.cartIcon.click();
  }
}
