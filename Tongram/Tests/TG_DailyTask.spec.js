import { test } from '@playwright/test';
import TGDailyTaskPage from '../Pages/TG_DailyTask.js';

test.describe('Tongram Actions', () => {
  test('Login with Telegram and Daily Task', async ({ browser }) => {
    const page = await browser.newPage();
    const dailyTaskPage = new TGDailyTaskPage(page);

    await test.step('Login with Telegram', async () => {
      await dailyTaskPage.Login();
    });

    await test.step('Daily Task', async () => {
      await dailyTaskPage.DailyLogin();
      await dailyTaskPage.AppExplorer();
      await dailyTaskPage.AppReviewer();
      await dailyTaskPage.AppSharer();
    });
  });
});
