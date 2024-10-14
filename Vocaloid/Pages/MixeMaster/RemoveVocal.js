import { expect } from '@playwright/test';
import { config } from '../../Utils/config';
class RemoveVocalPage {
  constructor(page) {
    this.page = page;
  }

  async removeVocalbyLink() {
    try {
      await this.page.getByRole('link', { name: 'Remove Vocal' }).click();
      
      const youtubeLink = config.Youtube_1;
      await this.page.getByPlaceholder('Paste a Youtube link...').fill(youtubeLink);
      const removeVocalButton = this.page.locator("//span[text()='Remove Vocal']");
      if (await removeVocalButton.isVisible()) {
          console.log("✅ 'Remove Vocal' button is present. Clicking...");
          await this.page.waitForTimeout(10000);
          await this.page.waitForLoadState('networkidle');
          for (let i = 0; i < 2; i++) {
            await removeVocalButton.click();
          } 
      } else {
          console.log("❌ 'Remove Vocal' button is not present.");
      }
      
      const validLinkMessage = await this.page.getByText('Valid YouTube link!');
      if (await validLinkMessage.isVisible()) {
        console.log('✅ Valid YouTube link!');
      } else {
        console.log('❌ Invalid YouTube link!');
      }
      
      const headerLocator = this.page.locator(`//div[@class='header']//h2[text()='${config.Youtube_Text_1}']`);
      const startTime = Date.now();
      await expect(headerLocator).toBeVisible({ timeout: 120000 });   
      
      const successMessageLocator = this.page.locator(`//span[div[contains(text(), 'Success')]]`);
      try {
        await expect(successMessageLocator).toBeVisible({ timeout: 500000 });
        this.logTimeTaken(startTime);
        console.log(`✅ Success message is displayed.`);
      } catch (error) {
        console.error(`❌ Success message is not present:`, error);
        throw new Error('❌ Failed at Step: Check Success Message');
      }

      await this.page.getByRole('link', { name: 'History Activities' }).click();
      await this.page.waitForSelector(`//h6[text()='${config.Youtube_Text_1}']`, { state: 'visible' });
      await this.page.waitForSelector(`(//td[.//div[text()='Remove Vocal'] and .//h6[text()='${config.Youtube_Text_1}']])[1]`, { state: 'visible' });
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
    const deleteSuccessMessage = this.page.getByText('Delete success!');
    try {
        await expect(deleteSuccessMessage).toBeVisible(); 
        console.log('✅ Test Passed: Delete success on history!');
    } catch (error) {
        console.log('❌ Delete operation failed: Delete success message not visible.');
    }

    } catch (error) {
      console.error('❌ Error during the Remove Vocal process:', error);
      throw new Error(`❌ Failed in the Remove Vocal process due to an error: ${error.message}`);
    }
  }

  logTimeTaken(startTime) {
    const endTime = Date.now();
    const timeTaken = Math.round((endTime - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    console.log(`🕒 Time taken from header appearance to success message: ${minutes} minutes and ${seconds} seconds`);
  }
}

export default RemoveVocalPage;
