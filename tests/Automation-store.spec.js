import { test, expect } from '@playwright/test';

//test.describe.configure({ mode: 'serial' });
// Go to the site 
test('Goto the testing site', async ({ page }) => {
    await page.goto('https://automationteststore.com/');
});

// Check if the headers and footers are visible 
test('Check if the headers and footers are visible', async ({ page }) => {
    await page.goto('https://automationteststore.com/');
    
    // Fixed 'except' to 'expect'
    await expect(page.locator('.headerstrip')).toBeVisible(); 
    await expect(page.locator('footer')).toBeVisible();
    
    // Verify the URL matches exactly what was loaded
    await expect(page).toHaveURL('https://automationteststore.com/');
    
    // Verify header text (Make sure '.main-header' actually contains this exact text)
   // await expect(page.locator('.main-header')).toContainText('Automation Test Store');
});
// Check if the navigation menu and items are present
test('Verify navigation menu and items are present using loop', async ({ page }) => {
await page.goto('https://automationteststore.com/', { waitUntil: 'domcontentloaded' });
    const expectedLinks = ['Home', 'Apparel & accessories']// 'Makeup', 'Skincare' ,'Fragrance','Men' , 'Books'];
    
    for (const linkText of expectedLinks) {
        const navItem = page.getByRole('link', { name: linkText, exact: true });
        await expect(navItem).toBeVisible();
    }
    for (const linktxt of expectedLinks) {
        const navItem = page.getByRole('link' , {name: linktxt , exact: true}).click({force:true});
       // await page.goto('https://automationteststore.com/', { waitUntil: 'domcontentloaded' });
    }
});

// Test navigation by clicking on each category link and verifying the URL changes accordingly
test('Test navigation ', async ({ page }) => {
  await page.goto('https://automationteststore.com/');
  await page.getByRole('link', { name: 'Apparel & accessories' }).click();
  await page.getByRole('link', { name: 'Makeup' }).click();
  await page.getByRole('link', { name: 'Skincare' }).click();
  await page.getByRole('link', { name: 'Fragrance' }).click();
 // await page.locator('#categorymenu').getByRole('link', { name: 'Men' }).click();
  await page.getByRole('link', { name: 'Hair Care' }).click();
  await page.getByRole('link', { name: 'Books' }).click();
});

// test login scenARIO
test('rEGISTER ', async ({ page }) => {
  await page.goto('https://automationteststore.com/');
  await page.getByRole('listitem').filter({ hasText: 'Login or register' }).click();
  await page.getByRole('button', { name: ' Continue' }).click();
  await page.locator('#AccountFrm_firstname').click();
  await page.locator('#AccountFrm_firstname').fill('hinata');
  await page.locator('#AccountFrm_lastname').click();
  await page.locator('#AccountFrm_lastname').fill('shoyo');
  await page.locator('#AccountFrm_email').click();
  await page.locator('#AccountFrm_email').fill('hinata@g.com');
  await page.locator('#AccountFrm_address_1').fill('tokyo, japan');
  await page.locator('#AccountFrm_city').click();
  await page.locator('#AccountFrm_city').fill('tokyo');
  await page.locator('#AccountFrm_zone_id').selectOption('3522');
  await page.locator('#AccountFrm_postcode').click();
  await page.locator('#AccountFrm_postcode').fill('123456');
  await page.locator('#AccountFrm_country_id').selectOption('107');
  await page.locator('#AccountFrm_zone_id').selectOption('1697');
  await page.getByRole('radio', { name: 'No' }).check();
  await page.getByRole('checkbox', { name: 'I have read and agree to the' }).check();
  await page.getByRole('button', { name: ' Continue' }).click();
  await page.locator('#AccountFrm_password').click();
  await page.locator('#AccountFrm_password').fill('hinata');
  await page.locator('#AccountFrm_loginname').fill('littlegaint');
  await page.getByRole('button', { name: ' Continue' }).click();
});

//test cart functionality
test('test cart functionality' , async ({page}) =>{
  await page.goto('https://automationteststore.com/');//, { waitUntil: 'domcontentloaded' });
  await page.getByTitle('Add to Cart').first().click();
  await page.getByTitle('Add to Cart').nth(1).click();
  await page.getByRole('link', { name: '   2 Items - $' }).click();
  await page.locator('#cart_checkout1').click();
  await page.locator('#loginFrm_loginname').click();
  await page.locator('#loginFrm_loginname').fill('littlegaient');
  await page.locator('#loginFrm_password').click();
  await page.locator('#loginFrm_password').fill('hinata');
  await page.getByRole('button', { name: ' Login' }).click();
  await page.getByRole('button', { name: ' Confirm Order' }).click();
});

// valid login scenario
test('Test valid login', async ({ page }) => {
  await page.goto('https://automationteststore.com/');
  await page.getByRole('link', { name: 'Login or register' }).click();
  await page.locator('#loginFrm_loginname').click();
  await page.locator('#loginFrm_loginname').fill('littlegaient');
  await page.locator('#loginFrm_password').click();
  await page.locator('#loginFrm_password').fill('hinata');
  await page.getByRole('button', { name: ' Login' }).click();
});

//invalid login scenario
test('Test invalid login', async ({ page }) => {
  await page.goto('https://automationteststore.com/');
  await page.getByRole('link', { name: 'Login or register' }).click();
  await page.locator('#loginFrm_loginname').click();
  await page.locator('#loginFrm_loginname').fill('littlegaint');
  await page.locator('#loginFrm_password').click();
  await page.locator('#loginFrm_password').fill('hinata');
  await page.getByRole('button', { name: ' Login' }).click();
  await expect(page.getByText(' Error: Incorrect login or password provided.')).toBeVisible();
});

// Test search functionality
test('Test search functionality', async ({ page }) => {
  await page.goto('https://automationteststore.com/');
   await page.getByRole('textbox', { name: 'Search Keywords' }).click();
  await page.getByRole('textbox', { name: 'Search Keywords' }).fill('fragrance');
  await page.getByRole('textbox', { name: 'Search Keywords' }).press('Enter');
});

//Dynamic Cart Updates & Validations
test ('test dynamic cart updates and validations ' , async ({page}) =>{
  await page.goto('https://automationteststore.com/');
  await page.getByRole('link', { name: 'Home', exact: true }).click();
  await page.getByTitle('Add to Cart').nth(1).click();
  await page.getByRole('link', { name: '    1 Items - $' }).click();
  await page.locator('#cart_quantity51').click();
  await page.locator('#cart_quantity51').fill('13');
  await page.getByRole('button', { name: ' Update' }).click();
  await page.goto('https://automationteststore.com/index.php?rt=checkout/cart');
  const quantityInput = page.locator('#cart_quantity51');
  await expect(quantityInput).toHaveValue('13');
});