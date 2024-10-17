import { expect } from '@playwright/test';
import { config } from '../../Utils/config';

class ConvertVoicePage {
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

  async convertVoicebyLink() {
    try {
      await this.page.getByRole('link', { name: 'Convert Voice' }).click();
      await this.page.locator('section').filter({ 
        hasText: 'Step 1:Select a voiceMore voicesStep 2:Provide input for generating' 
      }).getByRole('button').nth(2).click();

      const youtubeLink = config.Youtube_1;
      await this.page.getByPlaceholder('Paste a Youtube link...').fill(youtubeLink);
 
      const convertVoiceButton = this.page.locator('button:has-text("Generate")');
      try {
        if (await convertVoiceButton.isVisible()) {
          console.log("✅ Convert Voice button is present. Clicking...");
          await this.page.waitForTimeout(1000);
          await this.page.waitForLoadState('networkidle');
          for (let i = 0; i < 2; i++) {
            await convertVoiceButton.click();
          }
        } else {
          console.log("❌ Convert Voice button is not present.");
          throw new Error('Convert Voice button not visible');
        }
      } catch (error) {
        console.error('❌ Error clicking Convert Voice button:', error);
        throw new Error('Failed at Step: Click Convert Voice Button');
      }
            
      const headerLocator = this.page.locator(`//div[@class='header']//h2[text()='${config.Youtube_Text_1}']`);
      const startTime = Date.now();
      try {
        await expect(headerLocator).toBeVisible({ timeout: 120000 });
        console.log(`✅ ${config.Youtube_Text_1} is displayed`);
      } catch (error) {
        console.error(`❌ ${config.Youtube_Text_1} is not present:`, error);
        throw new Error('Failed at Step: Check Header Visibility');
      }
      
      const successMessageLocator = this.page.locator(`//span[div[contains(text(), 'Success')]]`);
      try {
        await expect(successMessageLocator).toBeVisible({ timeout: 500000 });
        this.logTimeTaken(startTime); 
        console.log(`✅ Success message is displayed.`);
      } catch (error) {
        console.error(`❌ Success message is not present:`, error);
        throw new Error('❌ Failed at Step: Check Success Message');
      }

      const successStartTime = Date.now(); 
      const successDisplayPlaybutton = this.page.locator(`(//div[contains(@class, 'header')]//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)])[4]`);
      const successDisplayDownloadbutton = this.page.locator(`(//div[contains(@class, 'header')]//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)])[7]`);
      const successDisplayDeletebutton = this.page.locator(`(//div[contains(@class, 'header')]//div[preceding-sibling::div[contains(., 'Success')]]//div[not(preceding-sibling::svg)])[8]`);
      
      try {
        await this.page.waitForTimeout(5000);
        await expect(successDisplayPlaybutton).toBeVisible({ timeout: 120000 });
        console.log(`✅ Play Button is displayed`);
        await successDisplayPlaybutton.click();
        await this.page.waitForTimeout(5000);
        await successDisplayPlaybutton.click();
      } catch (error) {
        console.error(`❌ Play Audio is not present:`, error);
        throw new Error('Failed at Step: Check Play Button Visibility');
      }

      try {
        await this.page.waitForTimeout(5000);
        await expect(successDisplayDownloadbutton).toBeVisible({ timeout: 120000 });
        console.log(`✅ Download Button is displayed`);
      } catch (error) {
        console.error(`❌ Download Button is not present:`, error);
        throw new Error('Failed at Step: Check Download Button Visibility');
      }

      try {
        await expect(successDisplayDeletebutton).toBeVisible({ timeout: 120000 });
        console.log(`✅ Delete Button is displayed`);
      } catch (error) {
        console.error(`❌ Delete Button is not present:`, error);
        throw new Error('Failed at Step: Check Delete Button Visibility');
      }

      this.logTimeTaken(successStartTime);
    
      await this.page.getByRole('link', { name: 'History Activities' }).click();
      await this.page.waitForSelector(`//h6[text()='${config.Youtube_Text_1}']`, { state: 'visible' });
      await this.page.waitForSelector(`(//td[.//div[text()='Convert Voice'] and .//h6[text()='${config.Youtube_Text_1}']])[1]`, { state: 'visible' });
      const successTd = this.page.locator(`//tr[.//h6[text()='${config.Youtube_Text_1}']][1]//p[text()='Success']`);
      const isSuccessVisible = await successTd.count() > 0 && await successTd.isVisible();
      const failedTd = this.page.locator(`//tr[.//h6[text()='${config.Youtube_Text_1}']][1]//p[text()='Failed']`);
      const isFailedVisible = await failedTd.count() > 0 && await failedTd.isVisible();
      if (isSuccessVisible) {
        console.log('✅ Test Passed: Song created with Success status on history summary page');
      } else if (isFailedVisible) {
        console.log('❌ Test Failed: Song created with Failed status on history summary page');
      } else {
        console.log('❌ Test status unknown: No success or failure message found.');
      }
      await this.page.waitForSelector(`//tr[.//h6[text()='${config.Youtube_Text_1}']][1]//button[contains(@class, 'delete-button')]`, { state: 'visible' });
      await this.page.locator(`//tr[.//h6[text()='${config.Youtube_Text_1}']][1]//button[contains(@class, 'delete-button')]`).click();
      await expect(this.page.getByText('Delete success!')).toBeVisible();
      console.log('✅ Test Passed: Delete success on history!');

    } catch (error) {
      console.error('❌ Error during initial setup steps:', error);
      throw new Error('❌ Failed in initial steps like clicking links or filling the form.');
    }
  }
}

export default ConvertVoicePage;
