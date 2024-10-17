import { chromium, test } from '@playwright/test';
import LoginUserPage from '../../Pages/Login/AccountUser.js';
import AIMasteringPage from '../../Pages/MixeMaster/AIMastering.js';

let loginUserPage; 
let AImasteringPage;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  loginUserPage = new LoginUserPage(page); 
  AImasteringPage = new AIMasteringPage(page);
});

test.afterAll(async () => {
  await loginUserPage.page.context().browser().close(); 
});

test('AI Mastering', async () => {
  console.log('============== Testcase AI Mastering ==============');
  await loginUserPage.loginUser(); 
  await AImasteringPage.AIMastering();
});
