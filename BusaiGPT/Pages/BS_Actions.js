import { expect } from '@playwright/test';
import fs from 'fs';
import { config } from '../Utils/BS_config';
// const { chromium } = require('playwright');
// // import { chromium } from 'playwright'; // Sử dụng import ES6 thay vì require

export class ActionsPage {
  constructor(browser) {
    this.browser = browser;
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////                  FUNCTION                //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async openWithSavedCookies() {
    try {
      const cookiesFilePath = config.cookiesFilePath;
      if (!fs.existsSync(cookiesFilePath)) {
        throw new Error(`Cookie file does not exist at path: ${cookiesFilePath}`);
      }
      const cookies = JSON.parse(fs.readFileSync(cookiesFilePath, 'utf-8'));
      this.context = await this.browser.newContext();
      await this.context.addCookies(cookies);
      this.page = await this.context.newPage();
      await this.page.goto(config.busaiUrl);
      // await expect(this.page.getByText('AI Chat GPTNew chat')).toBeVisible();
    } catch (error) {
      console.error('Failed to open with saved cookies:', error);
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  convertToPoints(pointText) {
    if (pointText.includes('K')) {
      return parseFloat(pointText.replace('K', '')) * 1000;
    } else if (pointText.includes('M')) {
      return parseFloat(pointText.replace('M', '')) * 1000000;
    } else if (pointText.includes('B')) {
      return parseFloat(pointText.replace('B', '')) * 1000000000;
    } else if (pointText.includes('T')) {
      return parseFloat(pointText.replace('T', '')) * 1000000000000;
    } else {
      return parseFloat(pointText);
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async getPoints() {
    try {
      const pointsText = await this.page.locator(config.Locator_GetPoint).innerText();
      return this.convertToPoints(pointsText);
    } catch (error) {
      console.error('Error retrieving points:', error);
      throw error;
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async checkPointsUsed(expectedPointsUsed) {
    try {
      const pointBefore = await this.getPoints();
      console.log(`Point before operation: ${pointBefore}`);
      await this.page.waitForTimeout(15000);
      const pointAfter = await this.getPoints();
      console.log(`Point after operation: ${pointAfter}`);
      const totalPointsUsed = pointBefore - pointAfter;
      console.log(`Total points used: ${totalPointsUsed}`);
      expect(totalPointsUsed).toBe(expectedPointsUsed);
    } catch (error) {
      console.error('Error checking points used:', error);
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async performActionsIfElementExists() {
    const locator = this.page.locator('.w-\\[24px\\]');
    if (await locator.count() > 0) {
      await locator.first().click();
      
      await this.page.getByRole('button', { name: 'Confirm' }).click();
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async uploadFile(filePath) {
    try {
      const fileInput = this.page.locator('input[type="file"]');
      await fileInput.setInputFiles(filePath);
      console.log('File uploaded');
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////                 TEST CASE                //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async performFirstChat(message1) {
  console.log('📝 ------- TCs 1: performFirstChat -------');
  const pointBeforeFirstChat = await this.getPoints();
  console.log('💰 Point before first chat:', pointBeforeFirstChat);
  
  try {
    console.log('💬 Initiating new chat...');
    await this.page.locator('form div').first().click();
    await this.page.waitForTimeout(10000); 
    await this.page.getByPlaceholder('Type something...').fill(message1);
    await this.page.locator('form').getByRole('button').click();
    await this.page.waitForTimeout(5000); 
  
    await expect(this.page.getByText(config.expect_message1)).toBeVisible();
    console.log('✅ Message is visible:', config.expect_message1);

  } catch (error) {
    console.error('❌ Failed to send or verify message:', error);
    return; 
  }

  await this.page.locator('#scrollableDiv').getByRole('img').click();
  await this.page.getByRole('button', { name: 'Confirm' }).click();
  
  try {
    console.log('🗑️ Deleting the message...');
    await expect(this.page.getByText('Delete sucessfully')).toBeVisible();
    console.log('🗑️ Message deleted successfully');
  } catch (error) {
    console.error('❌ Failed to delete the message:', error);
    return; 
  }

  const pointAfterFirstChat = await this.getPoints();
  console.log('💰 Point after first chat:', pointAfterFirstChat);
  
  const totalPointUsedFirstChat = pointBeforeFirstChat - pointAfterFirstChat;
  console.log('🔢 Total points used after first chat:', totalPointUsedFirstChat);
  
  if (totalPointUsedFirstChat === 250) {
    console.log('✅ PASS: The points decreased correctly by 250 after the first chat.');
  } else {
    console.log('❌ FAIL: The points did not decrease correctly after the first chat.');
  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async performSecondChat(message2) {
  console.log('📝 ------- TCs 2: performSecondChat -------');
  const pointBeforeFirstChatText = await this.page.locator(config.Locator_GetPoint).innerText();
  const pointBeforeFirstChat = this.convertToPoints(pointBeforeFirstChatText);
  console.log('💰 Point before second chat:', pointBeforeFirstChat);

  try {
    console.log('💬 Initiating new chat...');
    await this.page.locator('form div').first().click();
    await this.page.waitForTimeout(10000);
    await this.page.getByRole('link', { name: 'New chat' }).click();
    await this.page.locator('//span[text()="Intelligent"]').click();
    await this.page.getByPlaceholder('Type something...').fill(message2);
    await this.page.locator('form').getByRole('button').click();
    await this.page.waitForTimeout(5000);
    console.log('✅ Message sent successfully');
  } catch (error) {
    console.error('❌ Failed to send message:', error);
    return; 
  }

  try {
    console.log('🔍 Verifying if the message is visible...');
    await expect(this.page.getByText(config.expect_message2)).toBeVisible();
    console.log('✅ Message is visible:', config.expect_message2);
  } catch (error) {
    console.error('❌ Failed to verify message:', error);
    return;
  }

  try {
    console.log('🗑️ Deleting the message...');
    await this.page.locator('#scrollableDiv').getByRole('img').click();
    await this.page.getByRole('button', { name: 'Confirm' }).click();
    await expect(this.page.getByText('Delete sucessfully')).toBeVisible();
    console.log('✅ Message deleted successfully');
  } catch (error) {
    console.error('❌ Failed to delete the message:', error);
    return; 
  }

  const pointAfterSecondChatText = await this.page.locator(config.Locator_GetPoint).innerText();
  const pointAfterSecondChat = this.convertToPoints(pointAfterSecondChatText);
  console.log('💰 Point after second chat:', pointAfterSecondChat);
  
  const totalPointUsedSecondChat = pointBeforeFirstChat - pointAfterSecondChat;
  console.log('🔢 Total points used after second chat:', totalPointUsedSecondChat);
  
  if (totalPointUsedSecondChat === 250) {
    console.log('✅ PASS: The points decreased correctly by 250 after the second chat.');
  } else {
    console.log('❌ FAIL: The points did not decrease correctly after the second chat.');
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async performGenerateDocs() {
  console.log('🚀 ------- TCs 3 performGenerateDocs -------');

  console.log('🔍 Checking current points...');
  await this.page.waitForTimeout(3000); 
  const pointBeforeGenerateDocsText = await this.page.locator(config.Locator_GetPoint).innerText();
  console.log('💰 Current inner text:', pointBeforeGenerateDocsText);
  const pointBeforeGenerateDocs = this.convertToPoints(pointBeforeGenerateDocsText);
  console.log('💰 Point before generate docs: ', pointBeforeGenerateDocs);
  
  try {
    console.log('📁 Clicking on Assist link...');
    await this.page.getByRole('link', { name: 'Assist' }).click();
    
    const uploadLocator = this.page.locator('label').filter({ hasText: 'Upload File (Max 5MB .pdf)' }).locator('div').first();
    await uploadLocator.waitFor({ state: 'visible', timeout: 10000 });
    console.log('🖱️ Uploading file...');
    await uploadLocator.click();

    const filePath = config.path_generateDocs;
    await this.page.setInputFiles('input[type="file"]', filePath);
    console.log('✅ File uploaded');

    console.log('🚀 Starting Summary...');
    await this.page.getByRole('button', { name: 'Start Summary' }).click();
  } catch (error) {
    console.error('❌ Failed to generate docs:', error);
  }

  try {
    console.log('🔍 Verifying generated docs...');
    await expect(this.page.getByText(config.expect_text_Docs)).toBeVisible({ timeout: 30000 });
    console.log('✅ Message is visible:', config.expect_text_Docs);
  } catch (error) {
    console.error('❌ Failed to verify generate docs:', error);
  }

  await this.page.waitForTimeout(15000);
  const pointAfterGenerateDocsText = await this.page.locator(config.Locator_GetPoint).innerText();
  const pointAfterGenerateDocs = this.convertToPoints(pointAfterGenerateDocsText);
  console.log('💰 Point after generate docs: ', pointAfterGenerateDocs);

  const totalPointUsedGenerateDocs = Math.round(pointBeforeGenerateDocs - pointAfterGenerateDocs);
  console.log('💳 Total points used after generate docs: ', totalPointUsedGenerateDocs);
  
  if (totalPointUsedGenerateDocs === 1000) {
    console.log('🎉 PASS: The points decreased correctly by 1000 after generate docs.');
  } else {
    console.log('❌ FAIL: The points did not decrease correctly after generate docs.');
  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async deleteGenerateDocs() {
  console.log('🚀 ------- TCs 4 deleteGenerateDocs -------');

  await this.page.getByRole('link', { name: 'Ask' }).click();
  await this.page.getByRole('link', { name: 'Assist' }).click();
  await this.page.locator('#scrollableDiv').getByRole('img').nth(1).click();
  await this.page.getByRole('button', { name: 'Confirm' }).click();
  console.log('✅ Delete Docs');
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async performGenerateAudio() {
  console.log('🎤 ------- TCs 5 performGenerateAudio -------');

  console.log('🔍 Checking current points...');
  await this.page.waitForTimeout(3000); 
  const pointBeforeFirstChatText = await this.page.locator(config.Locator_GetPoint).innerText();
  console.log('💰 Current inner text:', pointBeforeFirstChatText);
  const pointBeforeFirstChat = this.convertToPoints(pointBeforeFirstChatText);
  console.log('💰 Point before first generate: ', pointBeforeFirstChat);

  try {
      await this.page.getByRole('link', { name: 'Assist' }).click();
      await this.page.getByText('Audio').click();
      await this.page.locator('div').filter({ hasText: /^Upload File \(Max 5MB \.mp3\) Small or poor-quality sound may limit summarization\.$/ }).nth(1).waitFor({ state: 'visible', timeout: 10000 });
      await this.page.locator('div').filter({ hasText: /^Upload File \(Max 5MB \.mp3\) Small or poor-quality sound may limit summarization\.$/ }).nth(1).click();
      
      const filePath = config.path_generateAudio;
      await this.page.setInputFiles('input[type="file"]', filePath);
      console.log('📂 File uploaded');

      await this.page.getByRole('button', { name: 'Start Summary' }).click();

      // await expect(this.page.locator('div').filter({ hasText: config.expect_title_Audio }).nth(1)).toBeVisible();

  } catch (error) {
      console.error('❌ Failed to generate:', error);
  }

  try {
      await expect(this.page.getByText(config.expect_text_Audio)).toBeVisible({ timeout: 30000 });
      console.log('✅ Message is visible:', config.expect_text_Audio);

  } catch (error) {
      console.error('❌ Failed to verify generate:', error);
  }

  await this.page.waitForTimeout(15000);
  const pointAfterFirstChatText = await this.page.locator(config.Locator_GetPoint).innerText();
  const pointAfterFirstChat = this.convertToPoints(pointAfterFirstChatText);
  console.log('🔍 Point after first generate: ', pointAfterFirstChat);
  
  const totalPointUsedFirstChat = Math.round(pointBeforeFirstChat - pointAfterFirstChat);
  console.log('🔢 Total points used after first generate: ', totalPointUsedFirstChat);
  
  if (totalPointUsedFirstChat === 1000) {
      console.log('✅ PASS: The points decreased correctly by 1000 after the first chat.');
  } else {
      console.log('❌ FAIL: The points did not decrease correctly after the first chat.');
  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async deleteGenerateAudio() {
  console.log('🚀 ------- TCs 6 deleteGenerateAudio -------');

  try {
      await this.page.getByRole('link', { name: 'Ask' }).click();
      await this.page.getByRole('link', { name: 'Assist' }).click();
      await this.page.getByText('Audio').click();
      await this.page.locator('#scrollableDiv').getByRole('img').click();
      await this.page.getByRole('button', { name: 'Confirm' }).click();
      console.log('✅ Delete Audio');

  } catch (error) {
      console.error('❌ Failed to delete audio:', error);
  }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async performGenerateImage_Summary() {
  console.log('🖼️ ------- TCs 7 performGenerateImage_Summary -------');

  console.log('🔍 Checking current points...');
  await this.page.waitForTimeout(3000); 
  const pointBefore = await this.getPoints();
  console.log('🔍 Point before first generate: ', pointBefore);

  try {
      await this.page.getByRole('link', { name: 'Assist' }).click();
      await this.page.getByText('Image', { exact: true }).click();
      await expect(this.page.getByText('New features release')).toBeVisible();

      await this.page.locator('label:has-text("Upload File (Max 5MB .png | .")').waitFor({ state: 'visible', timeout: 10000 });
      await this.page.locator('label').filter({ hasText: 'Upload File (Max 5MB .png | .' }).locator('div').first().click();
      
      const fileInput = this.page.locator('input[type="file"]');
      await fileInput.setInputFiles(config.path_generateImage_Summary);
      console.log('📂 File uploaded');

      await this.page.getByRole('button', { name: 'icon action Summary' }).click();
      console.log('✅ Clicked Summary');
      await expect(this.page.getByText('points to Summary')).toBeVisible();
      console.log('🔍 Verify Start Page');

      await this.page.getByRole('button', { name: 'Let\'s start' }).click();
      console.log('✅ Clicked Start');

      await expect(this.page.locator('div').filter({ hasText: /^Image_4KB\.png$/ }).nth(1)).toBeVisible();
      console.log('🔍 Verify generate image on this page');

      await expect(this.page.getByRole('img', { name: 'avt' })).toBeVisible({ timeout: 30000 });
      console.log('✅ Answer done');

  } catch (error) {
      console.error('❌ An error occurred during the generate image summary operation:', error);
  }

  console.log('🔍 Before calling checkPointsUsed');
  await this.checkPointsUsed(1000);
  console.log('✅ After calling checkPointsUsed');
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async deleteGenerateImage_Summary() {
  console.log('🚀 ------- TCs 8 deleteGenerateImage_Summary -------');

  try {
      await this.page.getByRole('link', { name: 'Ask' }).click();
      await this.page.getByRole('link', { name: 'Assist' }).click();
      await this.page.getByText('Image', { exact: true }).click();
      await this.page.locator('#scrollableDiv').getByRole('img').click();
      await this.page.getByRole('button', { name: 'Confirm' }).click();
      console.log('✅ Delete Image');

  } catch (error) {
      console.error('❌ Failed to delete image summary:', error);
  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async performGenerateImage_RemoveObject() {
  console.log('🖼️ ------- TCs 9 performGenerateImage_RemoveObject -------');

  console.log('🔍 Checking current points...');
  await this.page.waitForTimeout(3000); 
  const pointBeforeFirstChatText = await this.page.locator(config.Locator_GetPoint).innerText();
  const pointBeforeFirstChat = this.convertToPoints(pointBeforeFirstChatText);
  console.log('🔍 Point before first generate: ', pointBeforeFirstChat);

  try {
    await this.page.locator('label').filter({ hasText: 'Upload File (Max 5MB .png | .' }).locator('div').first().click();
    console.log('📂 Clicked to upload file');

    const filePath = config.path_generateImage_RemoveObject;
    await this.page.setInputFiles('input[type="file"]', filePath);
    console.log('📤 File uploaded');

    console.log('🔄 Waiting for Remove object button to be visible');
    await this.page.getByRole('button', { name: 'icon action Remove object' }).click();
    await expect(this.page.getByRole('heading', { name: 'Quick tip' })).toBeVisible();
    console.log('✅ Remove object button clicked and Quick tip is visible');

    await this.page.getByRole('button', { name: 'Let\'s start' }).click();
    console.log('🚀 Started Remove');

    await this.page.getByRole('slider').fill('100');
    await this.page.locator('canvas').nth(1).click({ position: { x: 186, y: 83 } });
    await this.page.locator('canvas').nth(1).click({ position: { x: 432, y: 90 } });
    await this.page.getByRole('main').getByRole('button').first().click();
    await this.page.getByRole('main').getByRole('button').nth(1).click();
    await expect(this.page.locator('canvas').nth(1)).toBeVisible({ position: { x: 432, y: 90 } });
    await this.page.getByRole('main').getByRole('button').nth(2).click();
    await this.page.locator('canvas').nth(1).click({ position: { x: 185, y: 89 } });
    await this.page.getByRole('button', { name: 'Clean •' }).click();
    console.log('🧹 Clean action executed');

    const downloadPromise = this.page.waitForEvent('download');
    await this.page.getByRole('button', { name: 'Download image' }).click();
    const download = await downloadPromise;
    console.log('📥 Download successfully initiated');

  } catch (error) {
      console.error('❌ Failed to generate image with remove object:', error);
  }

  try {
      await expect(this.page.getByRole('img', { name: 'Image result' })).toBeVisible({ timeout: 30000 });
      console.log('✅ Answer done');
  } catch (error) {
      console.error('❌ Failed to verify image visibility:', error);
  }

  await this.page.waitForTimeout(15000);
  const pointAfterFirstChatText = await this.page.locator(config.Locator_GetPoint).innerText();
  const pointAfterFirstChat = this.convertToPoints(pointAfterFirstChatText);
  console.log('🔍 Point after first generate: ', pointAfterFirstChat);
  const totalPointUsedFirstChat = pointBeforeFirstChat - pointAfterFirstChat;
  console.log('💰 Total points used after first generate: ', totalPointUsedFirstChat);
  
  if (totalPointUsedFirstChat === 1000) {
      console.log('✅ PASS: The points decreased correctly by 1000 after the first chat.');
  } else {
      console.log('❌ FAIL: The points did not decrease correctly after the first chat.');
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async deleteGenerateImage_RemoveObject() {
  console.log('🚀 ------- TCs 10 deleteGenerateImage_RemoveObject -------');

  try {
      await this.page.getByRole('link', { name: 'Ask' }).click();
      await this.page.getByRole('link', { name: 'Assist' }).click();
      await this.page.getByText('Image', { exact: true }).click();
      await this.page.locator('#scrollableDiv').getByRole('img').click();
      await this.page.getByRole('button', { name: 'Confirm' }).click();
      console.log('✅ Delete Image');

  } catch (error) {
      console.error('❌ Failed to delete image summary:', error);
  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async performGenerateImage_RemoveText() {
  console.log('🖼️ ------- TCs 11 performGenerateImage_RemoveText -------');

  console.log('🔍 Checking current points...');
  await this.page.waitForTimeout(3000); 
  const pointBeforeFirstChatText = await this.page.locator(config.Locator_GetPoint).innerText();
  const pointBeforeFirstChat = this.convertToPoints(pointBeforeFirstChatText);
  console.log('🔍 Point before first generate: ', pointBeforeFirstChat);

  try {
      // 1
      await this.page.locator('label').filter({ hasText: 'Upload File (Max 5MB .png | .' }).locator('div').first().click();
      console.log('📂 Clicked to upload file');

      // 2
      const filePath = config.path_generateImage_RemoveText;
      await this.page.setInputFiles('input[type="file"]', filePath);
      console.log('📤 File uploaded');

      // 3
      await this.page.getByRole('button', { name: 'icon action Remove text' }).click();
      console.log('✏️ Clicked button Remove Text');

      // 4
      await this.page.getByRole('button', { name: 'Let\'s start' }).click();
      console.log('🚀 Started Remove');
      console.log('🔍 Verify generate image on this page');

      // 5
      const downloadPromise = this.page.waitForEvent('download');
      await this.page.getByRole('button', { name: 'Download image' }).click();
      const download = await downloadPromise;
      console.log('📥 Download Successfully');

  } catch (error) {
      console.error('❌ Failed to generate image with remove text:', error);
  }

  try {
      await expect(this.page.getByRole('img', { name: 'Image result' })).toBeVisible({ timeout: 30000 });
      console.log('✅ Answer done');
  } catch (error) {
      console.error('❌ Failed to verify image visibility:', error);
  }

  const pointAfterFirstChatText = await this.page.locator(config.Locator_GetPoint).innerText();
  const pointAfterFirstChat = this.convertToPoints(pointAfterFirstChatText);
  console.log('🔍 Point after first generate: ', pointAfterFirstChat);
  
  const totalPointUsedFirstChat = pointBeforeFirstChat - pointAfterFirstChat;
  console.log('💰 Total points used after first generate: ', totalPointUsedFirstChat);
  
  if (totalPointUsedFirstChat === 1000) {
      console.log('✅ PASS: The points decreased correctly by 1000 after the first chat.');
  } else {
      console.log('❌ FAIL: The points did not decrease correctly after the first chat.');
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async deleteGenerateImage_RemoveText() {
  console.log('🚀 ------- TCs 12 deleteGenerateImage_RemoveText -------');
  try {
    await this.page.getByRole('link', { name: 'Ask' }).click();
    await this.page.getByRole('link', { name: 'Assist' }).click();
    await this.page.getByText('Image', { exact: true }).click();
    await this.page.locator('#scrollableDiv').getByRole('img').click();
    await this.page.getByRole('button', { name: 'Confirm' }).click();
    console.log('✅ Delete Image');

  } catch (error) {
    console.error('❌ Failed to delete image summary:', error);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}