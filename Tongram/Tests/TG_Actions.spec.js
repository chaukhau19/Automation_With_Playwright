import { test } from '@playwright/test';
import TGHomePage from '../Pages/TG_Actions.js';

test.describe('Tongram Interact', () => {
  test('Login with Telegram and Interact Actions', async ({ browser }) => {
    const page = await browser.newPage();
    const tgHomePage = new TGHomePage(page);

    await test.step('Login with Telegram', async () => {
      await tgHomePage.Login();
    });

    await test.step('Interact with Categories', async () => {
      await tgHomePage.Categories();
    });

    await test.step('Interact with  DEX', async () => {
      await tgHomePage.changeDEX();

    });

    
    // Earn Point khi Open
    // Earn Point khi Share
    // Earn Point khi Comment
    // Thông báo khi Earn Point
    // Verify DEX


    // // OLD CODE
    // await test.step('Calculate Points', async () => {
    //   await tgHomePage.CalculatePoints();
    // });

      // // OK
    // await test.step('Search Game', async () => {
    //   await tgHomePage.searchGame();
    // });

    // // OK-Cần bổ sung thêm check point
    // await test.step('Share Game', async () => {
    //   await tgHomePage.shareGame();
    // });

    // Cần check lại
    // await test.step('Comment Game', async () => {
      // await tgHomePage.commentGame();
    // });

    // Cần check lại
    // await test.step('Open Game', async () => {
    //   await tgHomePage.openGame();
    // });
  });
});
