import { expect } from '@playwright/test';
import { config } from '../../Utils/config';

class CreateLyricsPage {
  constructor(page) {
    this.page = page;
  }
  
    async createLyrics() {
      try {
        await this.page.getByRole('link', { name: 'Create Lyrics' }).click();
        await this.page.getByRole('button', { name: 'Get Random Prompt' }).click();
        const placeholder = await this.page.getByPlaceholder('Naming your masterpiece...');
        await placeholder.click();
        await placeholder.fill(config.CreateLyrics_Name);
        await this.page.getByRole('button', { name: 'Generate' }).click();
  
        await this.page.waitForSelector('text=Create lyrics successfully!', { timeout: 100000 });
        const validLinkMessage = await this.page.getByText('Create lyrics successfully!');
        await expect(validLinkMessage).toBeVisible();
        console.log('✅ Test Passed: Create script successfully!');
  
        const headerLocator = this.page.locator(`//div[@class='header']//h2[text()='${config.CreateLyrics_Name}']`);
        const startTime = Date.now();
        await expect(headerLocator).toBeVisible({ timeout: 100000 });
  
        const successMessageLocator = this.page.locator(`//span[text()='Success']`);
        await successMessageLocator.waitFor({ state: 'visible', timeout: 300000 });
         
        if (await successMessageLocator.isVisible()) {
          this.logTimeTaken(startTime);
          console.log('✅ Test Passed: The song is created with Success status on the Create Lyrics history page');
        } else {
          console.log('❌ Test Failed: The song is created with Failed status on the Create Lyrics history page');
        }
  
        await this.page.getByRole('link', { name: 'History Activities' }).click();
        await this.page.waitForSelector(`//h6[text()='${config.CreateLyrics_Name}']`, { state: 'visible' });
        await this.page.waitForSelector(`(//td[.//div[text()='Lyrics'] and .//h6[text()='${config.CreateLyrics_Name}']])[1]`, { state: 'visible' });
        const successTd = this.page.locator(`//tr[.//h6[text()='${config.CreateLyrics_Name}']][1]//p[text()='Success']`);
        const isSuccessVisible = await successTd.count() > 0 && await successTd.isVisible();
        const failedTd = this.page.locator(`//tr[.//h6[text()='${config.CreateLyrics_Name}']][1]//p[text()='Failed']`);
        const isFailedVisible = await failedTd.count() > 0 && await failedTd.isVisible();
        if (isSuccessVisible) {
          console.log('✅ Test Passed: Song created with Success status on history summary page');
        } else if (isFailedVisible) {
          console.log('❌ Test Failed: Song created with Failed status on history summary page');
        } else {
          console.log('❌ Test status unknown: No success or failure message found.');
        }
        await this.page.waitForSelector(`//tr[.//h6[text()='${config.CreateLyrics_Name}']][1]//button[contains(@class, 'delete-button')]`, { state: 'visible' });
        await this.page.locator(`//tr[.//h6[text()='${config.CreateLyrics_Name}']][1]//button[contains(@class, 'delete-button')]`).click();
        await expect(this.page.getByText('Delete success!')).toBeVisible();
        console.log('✅ Test Passed: Delete success on history!');
  
      } catch (error) {
        console.error('❌ Error during the Create Lyrics process:', error);
        throw new Error('❌ Failed in the Create Lyrics process due to an error.');
      }
    }
  
    logTimeTaken(startTime) {
      const endTime = Date.now();
      const timeTaken = Math.round((endTime - startTime) / 1000);
      const minutes = Math.floor(timeTaken / 60);
      const seconds = timeTaken % 60;
      console.log(`✅ Time taken from header appearance to success message: ${minutes} minutes and ${seconds} seconds`);
    }
  }
  
export default CreateLyricsPage;
