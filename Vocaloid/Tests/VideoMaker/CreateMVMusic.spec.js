import { chromium, test } from '@playwright/test';
import LoginUserPage from '../../Pages/Login/AccountUser.js';
import MVScriptsPage from '../../Pages/VideoMaker/CreateMVMusic.js';

let loginUserPage; 
let mvScriptsPage;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  loginUserPage = new LoginUserPage(page); 
  mvScriptsPage = new MVScriptsPage(page);
});

test.afterAll(async () => {
  await loginUserPage.page.context().browser().close(); 
});

test('Create MV Music', async () => {
  console.log('------- TCs Create MV Music -------');
  await loginUserPage.loginUser(); 
  await mvScriptsPage.MVScripts();
});
