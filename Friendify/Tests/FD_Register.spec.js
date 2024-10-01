import { test } from '@playwright/test';
import { RegisterPage } from '../Pages/FD_Register';

test.describe('Register Account', () => {
  test('should register and login', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.registerAndLogin();
  });
});
