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
        try {
          await expect(headerLocator).toBeVisible({ timeout: 120000 });
          console.log(`✅ ${config.CreateMelody_Name} is displayed`);
        } catch (error) {
          console.error(`❌ ${config.CreateMelody_Name} is not present:`, error);
          throw new Error('Failed at Step: Check Header Visibility');
        }

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
