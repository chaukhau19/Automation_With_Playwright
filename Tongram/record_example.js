const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://tongram.app/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Log In' }).click();
  const page1 = await page1Promise;
  await page1.locator('#login-phone').click();
  await page1.locator('#login-phone').fill('339824931');
  await page1.locator('#login-phone').press('Enter');
  await page1.close();
  await page.goto('https://tongram.app/');
  await page.getByRole('button', { name: 'DEX' }).click();
  await page.locator('div').filter({ hasText: /^Swap$/ }).nth(2).click();
  await page.locator('div').filter({ hasText: /^TON\/GM$/ }).first().click();
  await page.locator('a').first().click();
  await page.getByRole('link', { name: 'Tongram Logo' }).click();
  await page.getByRole('link', { name: '1.7K 1.7K' }).click();
  await page.getByText('HistoryEarn MoreSwapComing').click();
  await page.getByRole('link', { name: 'Tongram Logo' }).click();
  await page.getByRole('link', { name: 'PISTON Hub PISTON Hub', exact: true }).click();
  await page.getByRole('button', { name: 'Share' }).click();
  await page.getByRole('button', { name: 'Share' }).click();
  await page.getByRole('link', { name: 'Tongram Logo' }).click();
  await page.getByRole('link', { name: '1.7K 1.7K' }).click();
  await page.getByRole('button', { name: 'Earn More' }).click();
  await page.getByRole('link', { name: 'Tongram Logo' }).click();
  await page.getByRole('link', { name: '1.7K 1.7K' }).click();
  await page.getByRole('link', { name: 'Tongram Logo' }).click();
  await page.getByRole('link', { name: 'Watchlist Topup Watchlist Topup', exact: true }).click();
  await page.getByRole('button', { name: 'Share' }).click();
  await page.getByRole('button', { name: 'Share' }).click();
  await page.getByRole('button', { name: 'Share' }).click();
  await page.getByRole('button', { name: 'Share' }).click();
  await page.locator('div').filter({ hasText: 'No DataCancel' }).nth(1).click();
  await page.locator('.w-full > div').first().click();
  await page.getByRole('link', { name: 'Tongram Logo' }).click();
  await page.getByRole('link', { name: '1.7K 1.7K' }).click();
  await page.getByRole('button', { name: 'Earn More' }).click();
  await page.getByRole('link', { name: 'Tongram Logo' }).click();
  await page.getByRole('link', { name: 'PISTON Hub PISTON Hub', exact: true }).click();
  await page.getByRole('button', { name: 'Share' }).click();
  await page.getByRole('button', { name: 'Share' }).click();
  await page.getByRole('link', { name: 'Tongram Logo' }).click();
  await page.getByPlaceholder('Search for your favorite apps').first().click();
  await page.getByPlaceholder('Search for your favorite apps').first().press('CapsLock');
  await page.getByPlaceholder('Search for your favorite apps').first().fill('P');
  await page.getByPlaceholder('Search for your favorite apps').first().press('CapsLock');
  await page.getByPlaceholder('Search for your favorite apps').first().fill('Pizza');
  await page.getByRole('banner').getByRole('link', { name: 'PizzaTon PizzaTon PizzaTon' }).click();
  await page.getByPlaceholder('What is on your mind?').click();
  await page.getByPlaceholder('What is on your mind?').press('CapsLock');
  await page.getByPlaceholder('What is on your mind?').fill('G');
  await page.getByPlaceholder('What is on your mind?').press('CapsLock');
  await page.getByPlaceholder('What is on your mind?').fill('Go');
  await page.getByPlaceholder('What is on your mind?').press('Shift+ArrowLeft');
  await page.getByPlaceholder('What is on your mind?').press('Shift+ArrowLeft');
  await page.getByPlaceholder('What is on your mind?').fill('Good');

  // ---------------------
  await context.close();
  await browser.close();
})();