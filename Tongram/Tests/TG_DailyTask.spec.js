import { chromium, test } from '@playwright/test';
import TGDailyTaskPage from '../Pages/TG_DailyTask.js';

let dailyTaskPage; 

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  dailyTaskPage = new TGDailyTaskPage(page); 
});

test.afterAll(async () => {
  await dailyTaskPage.page.context().browser().close(); 
});

test('Daily Login', async () => {
  console.log('------- TCs Daily Login -------');
  await dailyTaskPage.Login();
  await dailyTaskPage.DailyLogin(); 
});

test('Daily App Opener', async () => {
  console.log('------- TCs Daily App Opener -------');
  await dailyTaskPage.Login();
  await dailyTaskPage.AppExplorer(); 
});

test('Daily App Reviewer', async () => {
  console.log('------- TCs Daily App Reviewer -------');
  await dailyTaskPage.Login();
  await dailyTaskPage.AppReviewer(); 
  await dailyTaskPage.LoginCMS();
  await dailyTaskPage.DeleteReviewAdmin(); 
});

test('Daily App Sharer', async () => {
  console.log('------- TCs Daily App Sharer -------');
  await dailyTaskPage.Login();
  await dailyTaskPage.AppSharer(); 
});

