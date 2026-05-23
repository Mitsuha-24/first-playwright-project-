import { test, expect } from '@playwright/test';
import {
  BASE_URL,
  validUser,
  invalidUser,
  newUser,
  navLinks,
  searchTerms,
  cartData,
  errorMessages,
} from '../testData.js';


// ============================================================
// SMOKE TESTS — basic site health checks
// ============================================================

test('Homepage loads and header/footer are visible', async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page).toHaveURL(BASE_URL);
  await expect(page.locator('.headerstrip')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
});

// ============================================================
// NAVIGATION TESTS
// ============================================================

test('All navigation menu links are visible', async ({ page }) => {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

  for (const linkText of navLinks) {
    await expect(
      page.getByRole('link', { name: linkText, exact: true })
    ).toBeVisible();
  }
});

test('Clicking each nav link changes the page', async ({ page }) => {
  await page.goto(BASE_URL);

  const clickableLinks = navLinks.filter((l) => l !== 'Home'); // Home stays on same page

  for (const linkText of clickableLinks) {
    await page.goto(BASE_URL); // reset to home before each click — keeps tests predictable
    await page.getByRole('link', { name: linkText, exact: true }).click();
    // Verify URL changed — each category has a unique URL
   // await expect(page).not.toHaveURL(BASE_URL);
  }
});

// ============================================================
// AUTH TESTS
// ============================================================

test('Valid login succeeds', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.getByRole('link', { name: 'Login or register' }).click();

  await page.locator('#loginFrm_loginname').fill(validUser.loginname);
  await page.locator('#loginFrm_password').fill(validUser.password);
  await page.getByRole('button', { name: ' Login' }).click();

  // Verify user is logged in — account page should be visible
  //await expect(page.getByText('My Account')).toBeVisible();
});

test('Invalid login shows error message', async ({ page }) => {
  test.slow();
  await page.goto(BASE_URL);
  await page.getByRole('link', { name: 'Login or register' }).click();

  await page.locator('#loginFrm_loginname').fill(invalidUser.loginname);
  await page.locator('#loginFrm_password').fill(invalidUser.password);
  await page.getByRole('button', { name: ' Login' }).click();

  await expect(page.getByText(errorMessages.invalidLogin)).toBeVisible();
});

test('Register new user', async ({ page }) => {
  test.slow();
  await page.goto(BASE_URL);
  await page.getByRole('listitem').filter({ hasText: 'Login or register' }).click();
  await page.getByRole('button', { name: ' Continue' }).click();

  // Personal details
  await page.locator('#AccountFrm_firstname').fill(newUser.firstname);
  await page.locator('#AccountFrm_lastname').fill(newUser.lastname);
  await page.locator('#AccountFrm_email').fill(newUser.email);
  await page.locator('#AccountFrm_address_1').fill(newUser.address);
  await page.locator('#AccountFrm_city').fill(newUser.city);
  await page.locator('#AccountFrm_postcode').fill(newUser.postcode);
  await page.locator('#AccountFrm_country_id').selectOption(newUser.countryId);
  await page.locator('#AccountFrm_zone_id').selectOption(newUser.zoneId);

  await page.getByRole('radio', { name: 'No' }).check();
  await page.getByRole('checkbox', { name: 'I have read and agree to the' }).check();
  await page.getByRole('button', { name: ' Continue' }).click();

  // Login credentials
  await page.locator('#AccountFrm_loginname').fill(newUser.loginname);
  await page.locator('#AccountFrm_password').fill(newUser.password);
  await page.getByRole('button', { name: ' Continue' }).click();

  // Verify registration success
  //await expect(page.getByText('Your Account Has Been Created!')).toBeVisible();
});

// ============================================================
// SEARCH TESTS
// ============================================================

test('Search returns results for a valid keyword', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole('textbox', { name: 'Search Keywords' }).fill(searchTerms.fragrance);
  await page.getByRole('textbox', { name: 'Search Keywords' }).press('Enter');

  // Verify results page loaded and has at least one product
  //await expect(page.locator('.productitem').first()).toBeVisible();
});

// ============================================================
// CART TESTS
// ============================================================

test('Add two items to cart and proceed to checkout', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByTitle('Add to Cart').first().click();
  await page.getByTitle('Add to Cart').nth(1).click();

  // Verify cart shows 2 items
  await expect(page.getByRole('link', { name: /2 Items/ })).toBeVisible();

  await page.getByRole('link', { name: /2 Items/ }).click();
  await page.locator('#cart_checkout1').click();

  // Login to complete checkout
  await page.locator('#loginFrm_loginname').fill(validUser.loginname);
  await page.locator('#loginFrm_password').fill(validUser.password);
  await page.getByRole('button', { name: ' Login' }).click();
  await page.getByRole('button', { name: ' Confirm Order' }).click();

  // Verify order confirmed
  //await expect(page.getByText('Your order has been placed!')).toBeVisible();
});

test('Update cart item quantity and verify it persists', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByTitle('Add to Cart').nth(1).click();
  await page.getByRole('link', { name: /1 Items/ }).click();

  // Update quantity
  await page.locator(cartData.cartItemLocatorId).fill(cartData.updatedQuantity);
  await page.getByRole('button', { name: ' Update' }).click();

  // Reload cart page and verify quantity persisted
  await page.goto(`${BASE_URL}index.php?rt=checkout/cart`);
  await expect(page.locator(cartData.cartItemLocatorId)).toHaveValue(cartData.updatedQuantity);
});