import { test } from '@playwright/test';
import TGHomePage from '../../Pages/Tongram/TG_Actions.js';

test.describe('Tongram Actions', () => {
  test('Login with Telegram and Perform Actions', async ({ browser }) => {
    const page = await browser.newPage();
    const tgHomePage = new TGHomePage(page);

    await test.step('Login with Telegram', async () => {
      await tgHomePage.load();
    });

    // OK
    await test.step('Verify Point', async () => {
      await tgHomePage.verifyPoint();
    });

    // OK
    await test.step('Calculate Points', async () => {
      await tgHomePage.CalculatePoints();
    });

    // OK
    await test.step('Interact with Categories', async () => {
      await tgHomePage.categories();
    });

    // OK
    await test.step('Search Game', async () => {
      await tgHomePage.searchGame();
    });

    // OK-Cần bổ sung thêm check point
    await test.step('Share Game', async () => {
      await tgHomePage.shareGame();
    });

    // Cần check lại
    // await test.step('Comment Game', async () => {
    //   await tgHomePage.commentGame();
    // });

    // Cần check lại
    // await test.step('Change Language', async () => {
    //   await tgHomePage.changeLanguage();
    // });

    // Cần check lại
    // await test.step('Open Game', async () => {
    //   await tgHomePage.openGame();
    // });

    // Earn Point khi Open
    // Earn Point khi Share
    // Earn Point khi Comment
    // Thông báo khi Earn Point
    // Verify DEX

  });
});
