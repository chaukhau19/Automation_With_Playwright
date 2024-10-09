import { chromium, test } from '@playwright/test';
import { LoginPage } from '../Pages/FD_Login';

let login;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  login = new LoginPage(page);
});

test.afterAll(async () => {
  await login.page.close();
  const browser = login.page.context().browser();
  await browser.close();
});

test('Login with Account', async () => {
  await login.loginWithAccount(); 
});

test('Login with Google', async () => {
  await login.loginWithGoogle(true); 
});
