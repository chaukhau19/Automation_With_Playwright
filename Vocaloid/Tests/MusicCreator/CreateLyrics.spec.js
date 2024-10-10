import { chromium, test } from '@playwright/test';
import LoginUserPage from '../../Pages/Login/AccountUser.js';
import CreateLyricsPage from '../../Pages/MusicCreator/CreateLyrics.js';

let loginUserPage; 
let createLyricsPage;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  loginUserPage = new LoginUserPage(page); 
  createLyricsPage = new CreateLyricsPage(page);
});

test.afterAll(async () => {
  await loginUserPage.page.context().browser().close(); 
});

test('Create Lyrics', async () => {
  console.log('------- TCs Create Lyrics -------');
  await loginUserPage.loginUser(); 
  await createLyricsPage.createLyrics();
});
