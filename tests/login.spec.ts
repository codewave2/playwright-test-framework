import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { Users } from '../config/users';
import { ErrorMessages } from '../config/errors';

test.describe.parallel('Login Tests', { tag: '@login' }, () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });
  });

  test('Verify successful login', async () => {
    await test.step('Login with standard user', async () => {
      await loginPage.loginUser(Users.standard);
    });
    await test.step('Validate successful login', async () => {
      await loginPage.verifySuccessfulLogin();
    });
  });

  test('Verify failed login', { tag: '@negative' }, async () => {
    await test.step('Attempt login with locked user', async () => {
      await loginPage.loginUser(Users.locked);
    });
    await test.step('Validate locked user error', async () => {
      await loginPage.verifyLoginError(ErrorMessages.lockedUser);
    });
  });
});
