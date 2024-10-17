import { chromium, test } from '@playwright/test';
import LoginUserPage from '../../Pages/Login/AccountUser.js';
import MusicSplitterPage from '../../Pages/MixeMaster/MusicSplitter.js';

let loginUserPage; 
let musicSplitterPage;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  loginUserPage = new LoginUserPage(page); 
  musicSplitterPage = new MusicSplitterPage(page);
});

test.afterAll(async () => {
  await loginUserPage.page.context().browser().close(); 
});

test('Music Splitter by Link', async () => {
  console.log('============== Testcase Music Splitter by Link ==============');
  await loginUserPage.loginUser(); 
  await musicSplitterPage.MusicSplitterbyLink();
});

test('Music Splitter  by File', async () => {
  console.log('============== Testcase Music Splitter by File ==============');
});
