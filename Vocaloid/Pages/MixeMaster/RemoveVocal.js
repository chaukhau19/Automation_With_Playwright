import { expect } from '@playwright/test';
import { config } from '../../Utils/config';
class RemoveVocalPage {
  constructor(page) {
    this.page = page;
  }

  async removeVocalbyLink() {
    try {
      await this.page.getByRole('link', { name: 'Remove Vocal' }).click();
      
      const youtubeLink = config.Youtube_8;
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
      
      // const headerLocator = this.page.locator(`//div[@class='header']//h2[text()='${config.Youtube_Text_8}']`);
      // const startTime = Date.now();
      // await expect(headerLocator).toBeVisible({ timeout: 120000 });   
      
      const headerLocator = this.page.locator(`//div[@class='header']//h2[text()='${config.Youtube_Text_8}']`);
      const startTime = Date.now();
      try {
        await expect(headerLocator).toBeVisible({ timeout: 120000 });
        console.log(`✅ ${config.Youtube_Text_8} is displayed`);
      } catch (error) {
        console.error(`❌ ${config.Youtube_Text_8} is not present:`, error);
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
      await this.page.waitForSelector(`//h6[text()='${config.Youtube_Text_8}']`, { state: 'visible' });
      await this.page.waitForSelector(`(//td[.//div[text()='Remove Vocal'] and .//h6[text()='${config.Youtube_Text_8}']])[1]`, { state: 'visible' });
      const successTd = this.page.locator(`//tr[.//h6[text()='${config.Youtube_Text_8}']][1]//p[text()='Success']`);
      const isSuccessVisible = await successTd.count() > 0 && await successTd.isVisible();
      const failedTd = this.page.locator(`//tr[.//h6[text()='${config.Youtube_Text_8}']][1]//p[text()='Failed']`);
      const isFailedVisible = await failedTd.count() > 0 && await failedTd.isVisible();
      if (isSuccessVisible) {
        console.log('✅ Test Passed: Song created with Success status on history summary page');
      } else if (isFailedVisible) {
        console.log('❌ Test Failed: Song created with Failed status on history summary page');
      } else {
        console.log('❌ Test status unknown: No success or failure message found.');
      }

    await this.page.waitForSelector(`//tr[.//h6[text()='${config.Youtube_Text_8}']][1]//button[contains(@class, 'delete-button')]`, { state: 'visible' });
    await this.page.locator(`//tr[.//h6[text()='${config.Youtube_Text_8}']][1]//button[contains(@class, 'delete-button')]`).click();
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
