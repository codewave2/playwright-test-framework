import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';

export class CheckoutPage {
  private readonly firstNameInput = this.page.locator('[data-test="firstName"]');
  private readonly lastNameInput = this.page.locator('[data-test="lastName"]');
  private readonly zipCodeInput = this.page.locator('[data-test="postalCode"]');
  private readonly continueButton = this.page.locator('[data-test="continue"]');
  private readonly finishButton = this.page.locator('[data-test="finish"]');
  private readonly completeHeader = this.page.locator('.complete-header');
  private readonly completeIcon = this.page.locator('[data-test="pony-express"]');

  constructor(private readonly page: Page) {}

  async completeFullCheckoutFlow(firstName: string, lastName: string, zipCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
    await this.continueButton.click();
    await this.finishButton.click();
  }

  async verifyOrderCompletion() {
    await expect(
      this.completeHeader,
      'Order completion header should display thank you message',
    ).toHaveText('Thank you for your order!');
    await expect(this.completeIcon, 'Order completion icon should be visible').toBeVisible();
  }
}
