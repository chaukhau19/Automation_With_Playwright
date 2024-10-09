import { chromium, test } from '@playwright/test';
import VerifyPointFunction from '../Pages/TG_VerifyPoint.js';

let verifyPointFunction;

test.beforeAll(async () => {
  const browser = await chromium.launch(); 
  const page = await browser.newPage();
  verifyPointFunction = new VerifyPointFunction(page); 
});

test.afterAll(async () => {
  await verifyPointFunction.page.close(); 
  const browser = verifyPointFunction.page.context().browser();
  await browser.close(); 
});

test('Login with Telegram', async () => {
  await verifyPointFunction.Login(); 
});

test('Verify Point', async () => {
  await verifyPointFunction.Login();
  await verifyPointFunction.verifyPoint(); 
});
