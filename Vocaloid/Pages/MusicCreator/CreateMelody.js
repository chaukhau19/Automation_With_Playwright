import { expect } from '@playwright/test';
import { config } from '../../Utils/config';

class MelodyPage {
  constructor(page) {
    this.page = page;
  }

  async createMelody() {
    try {
        await this.page.getByRole('link', { name: 'Text to Melody' }).click();
        await this.page.getByRole('button', { name: 'Get Random Prompt' }).click();

        await this.page.getByPlaceholder('Naming your masterpiece...').click();
        await this.page.getByPlaceholder('Naming your masterpiece...').fill(config.CreateMelody_Name);
  
        await this.page.getByRole('button', { name: 'Generate' }).click();
        
        const validLinkMessage = await this.page.getByText('Generate melody successfully!');
        await expect(validLinkMessage).toBeVisible();
        if (await validLinkMessage.isVisible()) {
          console.log('✅ Generate melody successfully!');
        }

        const headerLocator = this.page.locator(`//div[@class='header']//h2[text()='${config.CreateMelody_Name}']`);
        const startTime = Date.now();  
        await expect(headerLocator).toBeVisible(); 

        const successMessageLocator = this.page.locator(`//span[div[contains(text(), 'Success')]]`);
        const failedMessageLocator = this.page.locator(`//span[div[contains(text(), 'Failed')]]`);
        await Promise.race([
            successMessageLocator.waitFor({ state: 'visible', timeout: 240000 }),
            failedMessageLocator.waitFor({ state: 'visible', timeout: 240000 })
        ]);
        if (await successMessageLocator.isVisible()) {
            this.logTimeTaken(startTime); 
            console.log('✅ Test Passed: The song is created with Success status on the Text to Melody history page');
        } else if (await failedMessageLocator.isVisible()) {
            console.log('❌ Test Failed: The song is created with Failed status on the Text to Melody history page');
        } else {
            console.log('❌ Neither Success nor Failed message appeared.');
        }
        
        await this.page.getByRole('link', { name: 'History Activities' }).click();
        await this.page.waitForSelector(`//h6[text()='${config.CreateMelody_Name}']`, { state: 'visible' });
        await this.page.waitForSelector(`(//td[.//div[text()='Melody'] and .//h6[text()='${config.CreateMelody_Name}']])[1]`, { state: 'visible' });
        const successTd = this.page.locator(`//tr[.//h6[text()='${config.CreateMelody_Name}']][1]//p[text()='Success']`);
        const isSuccessVisible = await successTd.count() > 0 && await successTd.isVisible();
        const failedTd = this.page.locator(`//tr[.//h6[text()='${config.CreateMelody_Name}']][1]//p[text()='Failed']`);
        const isFailedVisible = await failedTd.count() > 0 && await failedTd.isVisible();
        if (isSuccessVisible) {
          console.log('✅ Test Passed: Song created with Success status on history summary page');
        } else if (isFailedVisible) {
          console.log('❌ Test Failed: Song created with Failed status on history summary page');
        } else {
          console.log('❌ Test status unknown: No success or failure message found.');
        }
        await this.page.waitForSelector(`//tr[.//h6[text()='${config.CreateMelody_Name}']][1]//button[contains(@class, 'delete-button')]`, { state: 'visible' });
        await this.page.locator(`//tr[.//h6[text()='${config.CreateMelody_Name}']][1]//button[contains(@class, 'delete-button')]`).click();
        await expect(this.page.getByText('Delete success!')).toBeVisible();
        console.log('✅ Test Passed: Delete success on history!');

    } catch (error) {
      console.error('❌ Error during initial setup steps:', error);
      throw new Error('❌ Failed in initial steps like clicking links or filling the form.');
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

export default MelodyPage;
