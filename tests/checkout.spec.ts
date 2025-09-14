import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { Users } from '../config/users';
import { CheckoutData } from '../test-data/checkout';
import { Products } from '../test-data/products';

test.describe('Checkout Tests', { tag: '@checkout' }, () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await test.step('Login with standard user', async () => {
      await loginPage.goto();
      await loginPage.loginUser(Users.standard);
    });
  });

  test('Complete a full checkout flow', async () => {
    const { firstName, lastName, zipCode } = CheckoutData.defaultUser;
    const { backpack, bikeLight } = Products;

    await test.step('Add 2 products to cart', async () => {
      await inventoryPage.addProductsToCart(backpack, bikeLight);
    });

    await test.step('Verify both products were added and cart total is 2', async () => {
      await inventoryPage.verifyProductsAdded(backpack, bikeLight);
      await inventoryPage.verifyCartCount(2);
    });

    await test.step('Remove 1 product and verify cart total is 1', async () => {
      await inventoryPage.removeProductsFromCart(bikeLight);
      await inventoryPage.verifyProductsRemovable(bikeLight);
      await inventoryPage.verifyProductsAdded(backpack);
      await inventoryPage.verifyCartCount(1);
      await inventoryPage.goToCart();
    });

    await test.step('Verify cart contents reflect removal', async () => {
      await cartPage.verifyItemPresent(backpack);
      await cartPage.verifyItemAbsent(bikeLight);
    });

    await test.step('Checkout and verify order success', async () => {
      await cartPage.proceedToCheckout();
      await checkoutPage.completeFullCheckoutFlow(firstName, lastName, zipCode);
      await checkoutPage.verifyOrderCompletion();
    });
  });
});
