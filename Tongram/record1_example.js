const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://cms-staging-f69d.tongram.app/admin/');
  await page.goto('https://cms-staging-f69d.tongram.app/admin/login');
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('sangccino@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('sangccino@gmail.com');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Login successful!').click();
  await page.getByRole('link', { name: 'Review Rating' }).click();
  await page.getByRole('row', { name: 'Good game 5 PizzaTon 2024-10-' }).getByLabel('').check();
  await page.getByText('Xóa').click();
  await page.getByRole('button', { name: 'Ok' }).click();
  await page.goto('https://cms-staging-f69d.tongram.app/admin/review-ratings?page=1&limit=10&locale=en');
  await page.getByRole('cell', { name: 'I see it verry good for me,' }).click();
  await page.getByRole('row', { name: 'I see it verry good for me,' }).getByLabel('').check();
  await page.getByText('Xóa').click();
  await page.getByRole('button', { name: 'Ok' }).click();
  await page.goto('https://cms-staging-f69d.tongram.app/admin/review-ratings?page=1&limit=10&locale=en');
  await page.getByRole('cell', { name: 'I see it verry good for me,' }).click();
  await page.getByRole('row', { name: 'I see it verry good for me,' }).getByLabel('').check();
  await page.getByRole('row', { name: 'I see it verry good for me,' }).getByLabel('').uncheck();
  await page.getByRole('row', { name: 'I see it verry good for me,' }).getByLabel('').check();

  // ---------------------
  await context.close();
  await browser.close();
})();