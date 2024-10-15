import { expect } from '@playwright/test';
import { config } from '../../Utils/config';

class AIMasteringPage {
  constructor(page) {
    this.page = page;
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////
  async uploadFile(filePath) {
    await this.page.setInputFiles("(//input[@type='file'])", filePath);
    console.log(`✅ File uploaded: ${filePath}`);
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////
  logTimeTaken(startTime) {
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    console.log(`🕒 Time taken: ${minutes} minutes and ${seconds} seconds`);
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////
  async AIMastering() {
    try {
      await this.page.getByRole('link', { name: 'AI Mastering' }).click();
      const filePath1 = config.Music_Audio_1;
      await this.uploadFile(filePath1);
      
      await this.page.getByRole('button', { name: 'Start Mastering' }).click();
      // await expect(this.page.getByText('Generate mastering')).toBeVisible();
      const successGenerate = this.page.getByText('Generate mastering');
      await successGenerate.waitFor({ state: 'visible', timeout: 100000 });      
      console.log('✅ Generate mastering visible');

      const headerLocator = this.page.locator(`//div[@class='header']//h2[text()='${config.Music_Text_1}']`);
      const startTime = Date.now();
      await expect(headerLocator).toBeVisible({ timeout: 100000 });

      const successMessageLocator = this.page.locator(`//span[div[contains(text(), 'Success')]]`);
      await successMessageLocator.waitFor({ state: 'visible', timeout: 400000 });
      this.logTimeTaken(startTime);

      await this.page.getByRole('link', { name: 'History Activities' }).click();
      await this.page.waitForSelector(`//h6[text()='${config.Music_Text_1}']`, { state: 'visible' });
      await this.page.waitForSelector(`(//td[.//div[text()='AI Mastering'] and .//h6[text()='${config.Music_Text_1}']])[1]`, { state: 'visible' });

      const successTd = this.page.locator(`//tr[.//h6[text()='${config.Music_Text_1}']][1]//p[text()='Success']`);
      const failedTd = this.page.locator(`//tr[.//h6[text()='${config.Music_Text_1}']][1]//p[text()='Failed']`);
      
      const isSuccessVisible = await successTd.count() > 0 && await successTd.isVisible();
      const isFailedVisible = await failedTd.count() > 0 && await failedTd.isVisible();
      
      if (isSuccessVisible) {
        console.log('✅ Test Passed: Song created with Success status on history summary page');
      } else if (isFailedVisible) {
        console.log('❌ Test Failed: Song created with Failed status on history summary page');
      } else {
        console.log('❌ Test status unknown: No success or failure message found.');
      }

      await this.page.waitForSelector(`//tr[.//h6[text()='${config.Music_Text_1}']][1]//button[contains(@class, 'delete-button')]`, { state: 'visible' });
      await this.page.locator(`//tr[.//h6[text()='${config.Music_Text_1}']][1]//button[contains(@class, 'delete-button')]`).click();

      const deleteSuccessMessage = this.page.getByText('Delete success!');
      await expect(deleteSuccessMessage).toBeVisible();
      console.log('✅ Test Passed: Delete success on history!');

    } catch (error) {
      console.error('❌ Error during the AI Mastering process:', error);
      throw new Error('❌ Failed in the AI Mastering process: ' + error.message);
    }
  }
///////////////////////////////////////////////////////////////////////////////////////////////////////
}
export default AIMasteringPage;
