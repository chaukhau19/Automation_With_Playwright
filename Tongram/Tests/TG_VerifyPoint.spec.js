import { test } from '@playwright/test';
import VerifyPointFunction from '../Pages/TG_VerifyPoint.js';

test.describe('Verify Point', () => {
  test('Login with Telegram and Verify Point', async ({ browser }) => {
    const page = await browser.newPage();
    const verifyPointFunction = new VerifyPointFunction(page);

    await test.step('Login with Telegram', async () => {
      await verifyPointFunction.Login();
    });
    await test.step('Verify Point', async () => {
      await verifyPointFunction.verifyPoint();
    });
  });
});
