import { chromium, test } from '@playwright/test';
import TGHomePage from '../Pages/TG_Actions.js';

let tgHomePage;

test.beforeAll(async () => {
  const browser = await chromium.launch(); // Launch the browser
  const page = await browser.newPage(); // Create a new page
  tgHomePage = new TGHomePage(page); // Initialize the page class
});

test.afterAll(async () => {
  await tgHomePage.page.close(); // Close the page
  const browser = tgHomePage.page.context().browser(); // Get the browser instance
  await browser.close(); // Close the browser
});

test('Login with Telegram', async () => {
  await tgHomePage.Login(); // Perform the login
});

test('Interact with Categories', async () => {
  await tgHomePage.Login(); 
  await tgHomePage.Categories(); 
});

test('Interact with DEX', async () => {
  await tgHomePage.Login(); 
  await tgHomePage.changeDEX();
});

test('Open Game', async () => {
});
    
test('Review Game', async () => {
});

test('Share Game', async () => {
});

test('Join telegram', async () => {
});

test('News page', async () => {
});

test('Submit App', async () => {
});

test('Contact US', async () => {
});

test('Logout', async () => {
});