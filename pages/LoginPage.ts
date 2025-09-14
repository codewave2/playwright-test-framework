import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import type { User } from '../config/users';
import { PageUrls } from '../config/urls';

export class LoginPage {
  private readonly usernameInput = this.page.locator('[data-test="username"]');
  private readonly passwordInput = this.page.locator('[data-test="password"]');
  private readonly loginButton = this.page.locator('[data-test="login-button"]');
  private readonly inventoryContainer = this.page.locator('.inventory_container');
  private readonly errorMessage = this.page.locator('[data-test="error"]');

  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto(PageUrls.base);
  }

  async loginUser(user: User) {
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.loginButton.click();
  }

  async verifySuccessfulLogin() {
    await expect(this.page, 'URL should be inventory page after successful login').toHaveURL(
      PageUrls.inventory,
    );
    await expect(
      this.inventoryContainer,
      'Inventory container should be visible after successful login',
    ).toBeVisible();
  }

  async verifyLoginError(expectedErrorMessage: string) {
    await expect(
      this.errorMessage,
      'Error message element should be visible on failed login',
    ).toBeVisible();
    await expect(
      this.errorMessage,
      `Error message text should contain '${expectedErrorMessage}'`,
    ).toContainText(expectedErrorMessage);
    await expect(this.page, 'URL should remain on base page after failed login').toHaveURL(
      PageUrls.base,
    );
  }
}
