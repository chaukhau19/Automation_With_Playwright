import { chromium, test } from '@playwright/test';
import TGHomePage from '../Pages/TG_Actions.js';

let tgHomePage;

test.beforeAll(async () => {
  const browser = await chromium.launch(); 
  const page = await browser.newPage(); 
  tgHomePage = new TGHomePage(page); 
});

test.afterAll(async () => {
  await tgHomePage.page.close(); 
  const browser = tgHomePage.page.context().browser(); 
  await browser.close(); 
});

test('Interact with Categories', async () => {
  console.log('------- TCs Interact with Categories -------');
  await tgHomePage.Login(); 
  await tgHomePage.Categories(); 
});

test('Interact with DEX', async () => {
  console.log('------- TCs Interact with DEX -------');
  await tgHomePage.Login(); 
  await tgHomePage.changeDEX(); 
});

test('Open Game', async () => {
  console.log('------- TCs Open Game -------');
});

test('Review Game', async () => {
  console.log('------- TCs Review Game -------');
});

test('Share Game', async () => {
  console.log('------- TCs Share Game -------');
});

test('Join Telegram', async () => {
  console.log('------- TCs Join Telegram -------');
});

test('News Page', async () => {
  console.log('------- TCs News Page -------');
});

test('Submit App', async () => {
  console.log('------- TCs Submit App -------');
});

test('Contact Us', async () => {
  console.log('------- TCs Contact Us -------');
});

test('Logout', async () => {
  console.log('------- TCs Logout -------');
});
