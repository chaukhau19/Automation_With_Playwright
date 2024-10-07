import { test } from '@playwright/test'; // Ensure expect is imported
import TGLanguagePage from '../Pages/TG_Languages.js'; // Adjust the path if necessary


test.describe('Tongram Languages', () => {
  test('Login with Telegram and Tongram Languages', async ({ browser }) => {
    const page = await browser.newPage();
    const tgLanguagePage = new TGLanguagePage(page);

    await test.step('Login with Telegram', async () => {
          await tgLanguagePage.Login();
        });

    await test.step('Change Language English', async () => {
      console.log("Changing language to English...");
      await tgLanguagePage.changeLanguageEN(); 
    });

    await test.step('Change Language Vietnamese', async () => {
      console.log("Changing language to Vietnamese...");
      await tgLanguagePage.changeLanguageVI();  
    });

    await test.step('Change Language Korean', async () => {
      console.log("Changing language to Korean...");
      await tgLanguagePage.changeLanguageKR(); 
    });

  });
});
