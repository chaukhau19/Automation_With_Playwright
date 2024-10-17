const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://jenkins.playgroundvina.com/login?from=%2F');
  await page.getByLabel('Username').click();
  await page.getByLabel('Username').fill('khauntc');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('KhauNTC123!@#');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'AUTOMATION' }).click();
  await page.getByRole('link', { name: 'FRIENDIFY', exact: true }).click();
  await page.getByRole('button', { name: 'Disable Multibranch Pipeline' }).click();
  await page.goto('https://jenkins.playgroundvina.com/job/AUTOMATION/job/FRIENDIFY/');
  await page.getByRole('link', { name: 'AUTOMATION' }).click();
  await page.getByRole('link', { name: 'TONGRAM', exact: true }).click();
  await page.getByRole('button', { name: 'Disable Multibranch Pipeline' }).click();
  await page.getByRole('link', { name: 'AUTOMATION' }).click();
  await page.getByRole('link', { name: 'VOCALOID', exact: true }).click();
  await page.getByRole('button', { name: 'Disable Multibranch Pipeline' }).click();
  await page.getByRole('link', { name: 'AUTOMATION' }).click();
  await page.getByRole('link', { name: 'BUSAIGPT' }).click();
  await page.getByRole('button', { name: 'Enable' }).click();
  await page.getByRole('button', { name: 'Disable Multibranch Pipeline' }).click();
  await page.getByRole('link', { name: 'AUTOMATION' }).click();
  await page.getByRole('link', { name: 'AUTOMATION' }).click();
  await page.getByRole('link', { name: 'FRIENDIFY' }).click();
  await page.getByRole('button', { name: 'Enable' }).click();
  await page.getByRole('link', { name: 'AUTOMATION' }).click();
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();