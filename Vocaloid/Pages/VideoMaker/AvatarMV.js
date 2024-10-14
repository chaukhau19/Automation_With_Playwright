import { expect } from '@playwright/test';
import { config } from '../../Utils/config';

class AvatarMVPage {
  constructor(page) {
    this.page = page;
  }

  async generateAvatarMV() {
    try {
      await this.page.getByRole('link', { name: 'Avatar MV (Beta)' }).click();
      await this.page.locator('section').filter({ hasText: 'Step 1:Select a voiceMore voicesStep 2:Select an AVATAR ImageUse Vocaloid’s' }).getByRole('button').nth(2).click();
      await this.page.getByText('Use Vocaloid’s Systemized').click();
      await this.page.locator('div').filter({ hasText: /^more voices$/ }).getByRole('button').nth(2).click();
      await this.page.getByPlaceholder('Paste a Youtube link...').fill(config.Youtube_2);

      await this.page.getByRole('button', { name: 'Generate AVATAR MV' }).click();
      const validLinkMessage = await this.page.getByText('Valid YouTube link!');
      await expect(validLinkMessage).toBeVisible();
      console.log('✅ Valid YouTube link!');

      const headerLocator = this.page.locator(`//div[@class='header']//h2[text()='${config.Youtube_Text_2}']`);
      const startTime = Date.now(); 
      await expect(headerLocator).toBeVisible({ timeout: 100000 });

      const successMessageLocator = this.page.locator(`//span[div[contains(text(), 'Success')]]`);
      await successMessageLocator.waitFor({ state: 'visible', timeout: 900000 });
      this.logTimeTaken(startTime);

      await this.page.getByRole('link', { name: 'History Activities' }).click();
        await this.page.waitForSelector(`//h6[text()='${config.Youtube_Text_2}']`, { state: 'visible' });
        await this.page.waitForSelector(`(//td[.//div[text()='Avatar MV'] and .//h6[text()='${config.Youtube_Text_2}']])[1]`, { state: 'visible' });
        const successTd = this.page.locator(`//tr[.//h6[text()='${config.Youtube_Text_2}']][1]//p[text()='Success']`);
        const isSuccessVisible = await successTd.count() > 0 && await successTd.isVisible();
        const failedTd = this.page.locator(`//tr[.//h6[text()='${config.Youtube_Text_2}']][1]//p[text()='Failed']`);
        const isFailedVisible = await failedTd.count() > 0 && await failedTd.isVisible();
        if (isSuccessVisible) {
          console.log('✅ Test Passed: Song created with Success status on history summary page');
        } else if (isFailedVisible) {
          console.log('❌ Test Failed: Song created with Failed status on history summary page');
        } else {
          console.log('❌ Test status unknown: No success or failure message found.');
        }
        await this.page.waitForSelector(`//tr[.//h6[text()='${config.Youtube_Text_2}']][1]//button[contains(@class, 'delete-button')]`, { state: 'visible' });
        await this.page.locator(`//tr[.//h6[text()='${config.Youtube_Text_2}']][1]//button[contains(@class, 'delete-button')]`).click();
        await expect(this.page.getByText('Delete success!')).toBeVisible();
        console.log('✅ Test Passed: Delete success on history!');

    } catch (error) {
      console.error('❌ Error during the Avatar MV process:', error);
      throw new Error(`❌ Failed in the Avatar MV process: ${error.message}`);
    }
  }

  logTimeTaken(startTime) {
    const endTime = Date.now();
    const timeTaken = Math.round((endTime - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    console.log(`✅ Time taken from header appearance to success message: ${minutes} minutes and ${seconds} seconds`);
    console.log('✅ Success message displayed immediately: Success');
  }
}

export default AvatarMVPage;
