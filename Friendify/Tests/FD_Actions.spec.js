import { chromium, test } from '@playwright/test';
import { ActionsPage } from '../Pages/FD_Actions';

let actionsPage;

test.beforeAll(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  actionsPage = new ActionsPage(page);
});

test.afterAll(async () => {
  await actionsPage.page.close();
  const browser = actionsPage.page.context().browser();
  await browser.close();
});

test('Login with Account and Perform First and Second Chats', async () => {
  console.log('------- TCs Login with Account and Perform First and Second Chats -------');
  await actionsPage.loginWithAccount();
  await actionsPage.performFirstChat();
  await actionsPage.performSecondChat();
  await actionsPage.performOtherActions();
});

test('Login with Account and User Chat', async () => {
  console.log('------- TCs Login with Account and User Chat -------');
  //Small Happiness
  //Big Happiness
  //Enter your amount
});
test('Login with Account and Generate Docs', async () => {
  console.log('------- TCs Login with Account and Generate Docs -------');
});
test('Login with Account and Generate Audio', async () => {
  console.log('------- TCs Login with Account and Generate Audio -------');
});
test('Login with Account and Generate Image', async () => {
  console.log('------- TCs Login with Account and Generate Image -------');
});
