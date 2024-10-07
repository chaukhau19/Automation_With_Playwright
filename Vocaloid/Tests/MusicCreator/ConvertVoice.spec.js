import { test } from '@playwright/test';
import LoginUserPage from '../../Pages/Login/AccountUser';
import ConvertVoicePage from '../../Pages/MusicCreator/ConvertVoice';


test('Convert Voice', async ({ browser }) => {
  const page = await browser.newPage();
  const loginUserPage = new LoginUserPage(page);
  const convertVoicePage = new ConvertVoicePage(page);

  await test.step('Login and Convert Voice', async () => {
    await loginUserPage.loginUser(); 
    await convertVoicePage.ConvertVoice();
  });
});
