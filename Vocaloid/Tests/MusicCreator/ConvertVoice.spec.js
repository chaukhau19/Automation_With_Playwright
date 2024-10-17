import { chromium, test } from '@playwright/test';
import LoginUserPage from '../../Pages/Login/AccountUser.js';
import ConvertVoicePage from '../../Pages/MusicCreator/ConvertVoice.js';

let loginUserPage; 
let convertVoicePage;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  loginUserPage = new LoginUserPage(page); 
  convertVoicePage = new ConvertVoicePage(page);
});

test.afterAll(async () => {
  await loginUserPage.page.context().browser().close(); 
});

test('Convert Voice by Link', async () => {
  console.log('============== Testcase Convert Voice by Link ==============');
  await loginUserPage.loginUser(); 
  await convertVoicePage.convertVoicebyLink();
});
test('Convert Voice by File', async () => {
  console.log('============== Testcase Convert Voice by File ==============');
});
