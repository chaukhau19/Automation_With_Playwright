import { expect } from '@playwright/test';
import { config } from '../../Utils/config';

class MusicSplitterPage {
  constructor(page) {
    this.page = page;
  }

  logTimeTaken(startTime) {
    const endTime = Date.now();
    const timeTaken = Math.round((endTime - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    console.log(`🕒 Time taken from header appearance to success message: ${minutes} minutes and ${seconds} seconds`);
  }

  async MusicSplitterbyLink() {
    let startTime;

    try {
      await this.page.getByRole('link', { name: 'Music Splitter' }).click();
    } catch (error) {
      console.error('❌ Error clicking Music Splitter link:', error);
      throw new Error('Failed at Step: Click Music Splitter Link');
    }

    const youtubeLink = config.Youtube_6;
    try {
      await this.page.getByPlaceholder('Paste a Youtube link...').fill(youtubeLink);
    } catch (error) {
      console.error('❌ Error filling YouTube link:', error);
      throw new Error('Failed at Step: Fill YouTube Link');
    }

    const splitMusicButton = this.page.locator("//span[text()='Split Music']");
    try {
      if (await splitMusicButton.isVisible()) {
        console.log("✅ Split Music button is present. Clicking...");
        await this.page.waitForTimeout(10000);
        await this.page.waitForLoadState('networkidle');
        for (let i = 0; i < 2; i++) {
          await splitMusicButton.click();
        }
      } else {
        console.log("❌ Split Music button is not present.");
        throw new Error('Split Music button not visible');
      }
    } catch (error) {
      console.error('❌ Error clicking Split Music button:', error);
      throw new Error('Failed at Step: Click Split Music Button');
    }

    try {
      const validLinkMessage = await this.page.getByText('Valid YouTube link!');
      if (await validLinkMessage.isVisible()) {
        console.log('✅ Valid YouTube link!');
      } else {
        console.log('❌ Invalid YouTube link!');
        throw new Error('Invalid YouTube link message not displayed');
      }
    } catch (error) {
      console.error('❌ Error checking valid link message:', error);
      throw new Error('Failed at Step: Check Valid Link Message');
    }

    const headerLocator = this.page.locator(`//div[@class='header']//h2[text()='${config.Youtube_Text_6}']`);
    try {
      await expect(headerLocator).toBeVisible({ timeout: 120000 });
      startTime = Date.now();
      console.log(`✅ ${config.Youtube_Text_6} is displayed`);
    } catch (error) {
      console.error(`❌ ${config.Youtube_Text_6} is not present:`, error);
      throw new Error('Failed at Step: Check Header Visibility');
    }

    const successMessageLocator = this.page.locator(`//span[div[contains(text(), 'Success')]]`);
    try {
      await expect(successMessageLocator).toBeVisible({ timeout: 500000 });
      this.logTimeTaken(startTime);
      console.log(`✅ Success message is displayed.`);
    } catch (error) {
      console.error(`❌ Success message is not present:`, error);
      throw new Error('Failed at Step: Check Success Message');
    }

    const successStartTime = Date.now(); 
    const successDisplayPlaybutton1 = this.page.locator(`(//div[contains(@class, 'header')]//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)])[4]`);
    const successDisplayPlaybutton2 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)][1])[10]`);
    const successDisplayPlaybutton3 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)][1])[15]`);
    const successDisplayPlaybutton4 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)][1])[20]`);
    const successDisplayPlaybutton5 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)][1])[25]`);
    const successDisplayPlaybutton6 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)][1])[30]`);
    const successDisplayPlaybutton7 = this.page.locator(`(//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)][1])[35]`);
    
    const successDisplayDownloadbutton = this.page.locator(`(//div[contains(@class, 'header')]//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)])[8]`);
    const successDisplayDeletebutton = this.page.locator(`(//div[contains(@class, 'header')]//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)])[9]`);
    
    try {
      await this.page.waitForTimeout(5000);
      await expect(successDisplayPlaybutton1).toBeVisible({ timeout: 120000 });
      await expect(successDisplayPlaybutton2).toBeVisible({ timeout: 120000 });
      await expect(successDisplayPlaybutton3).toBeVisible({ timeout: 120000 });
      await expect(successDisplayPlaybutton4).toBeVisible({ timeout: 120000 });
      await expect(successDisplayPlaybutton5).toBeVisible({ timeout: 120000 });
      await expect(successDisplayPlaybutton6).toBeVisible({ timeout: 120000 });
      await expect(successDisplayPlaybutton7).toBeVisible({ timeout: 120000 });

      console.log(`✅ Play Button is displayed`);
      await successDisplayPlaybutton1.click();
      await successDisplayPlaybutton2.click();
      await successDisplayPlaybutton3.click();
      await successDisplayPlaybutton4.click();
      await successDisplayPlaybutton5.click();
      await successDisplayPlaybutton6.click();
      await successDisplayPlaybutton7.click();
      await this.page.waitForTimeout(5000);
      await successDisplayPlaybutton1.click();
      await successDisplayPlaybutton2.click();
      await successDisplayPlaybutton3.click();
      await successDisplayPlaybutton4.click();
      await successDisplayPlaybutton5.click();
      await successDisplayPlaybutton6.click();
      await successDisplayPlaybutton7.click();
    } catch (error) {
      console.error(`❌ Play Audio is not present:`, error);
      throw new Error('Failed at Step: Check Play Button Visibility');
    }
    
    try {
      await this.page.waitForTimeout(5000);
      await expect(successDisplayDownloadbutton).toBeVisible({ timeout: 120000 });
      console.log(`✅ Download Button is displayed`);
      await successDisplayDownloadbutton.click();
    } catch (error) {
      console.error(`❌ Download Button is not present:`, error);
      throw new Error('Failed at Step: Check Download Button Visibility');
    }
    
    try {
      await this.page.waitForTimeout(5000);
      await expect(successDisplayDeletebutton).toBeVisible({ timeout: 120000 });
      console.log(`✅ Delete Button is displayed`);
    } catch (error) {
      console.error(`❌ Delete Button is not present:`, error);
      throw new Error('Failed at Step: Check Delete Button Visibility');
    }
    this.logTimeTaken(successStartTime);
    
    try {
      await this.page.getByRole('link', { name: 'History Activities' }).click();
      await this.page.waitForSelector(`//h6[text()='${config.Youtube_Text_6}']`, { state: 'visible' });
    } catch (error) {
      console.error('❌ Error accessing History Activities:', error);
      throw new Error('Failed at Step: Access History Activities');
    }

    const successTd = this.page.locator(`//tr[.//h6[text()='${config.Youtube_Text_6}']][1]//p[text()='Success']`);
    const isSuccessVisible = await successTd.count() > 0 && await successTd.isVisible();
    const failedTd = this.page.locator(`//tr[.//h6[text()='${config.Youtube_Text_6}']][1]//p[text()='Failed']`);
    const isFailedVisible = await failedTd.count() > 0 && await failedTd.isVisible();
    if (isSuccessVisible) {
      console.log('✅ Test Passed: Song created with Success status on history summary page');
    } else if (isFailedVisible) {
      console.log('❌ Test Failed: Song created with Failed status on history summary page');
    } else {
      console.log('❌ Test status unknown: No success or failure message found.');
    }

    try {
      await this.page.waitForSelector(`//tr[.//h6[text()='${config.Youtube_Text_6}']][1]//button[contains(@class, 'delete-button')]`, { state: 'visible' });
      await this.page.locator(`//tr[.//h6[text()='${config.Youtube_Text_6}']][1]//button[contains(@class, 'delete-button')]`).click();
      const deleteSuccessMessage = this.page.getByText('Delete success!');
      await expect(deleteSuccessMessage).toBeVisible();
      console.log('✅ Test Passed: Delete success on history!');
    } catch (error) {
      console.error('❌ Delete operation failed or Delete success message not visible:', error);
      throw new Error('Failed at Step: Delete Operation');
    }
  }
}

export default MusicSplitterPage;
