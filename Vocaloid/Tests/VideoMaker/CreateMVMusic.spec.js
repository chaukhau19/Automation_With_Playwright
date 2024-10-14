import { chromium, test } from '@playwright/test';
import LoginUserPage from '../../Pages/Login/AccountUser.js';
import MVScriptsPage from '../../Pages/VideoMaker/CreateMVMusic.js';

let loginUserPage; 
let mvScriptsPage;
let browser; 

test.beforeAll(async () => {
  browser = await chromium.launch({ headless: false }); 
  const page = await browser.newPage();
  loginUserPage = new LoginUserPage(page); 
  mvScriptsPage = new MVScriptsPage(page);
});

test.afterAll(async () => {
  await browser.close(); 
});

test('Avatar MV', async () => {
  console.log('------- TCs Create MV Music -------');
  await loginUserPage.loginUser(); 
  await mvScriptsPage.MVScripts();
});
