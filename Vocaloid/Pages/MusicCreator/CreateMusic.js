import { expect } from '@playwright/test';
import { config } from '../../Utils/config';

class CreateMusicPage {
  constructor(page) {
    this.page = page;
  }

  logTimeTaken(startTime) {
    const endTime = Date.now();
    const timeTaken = Math.round((endTime - startTime) / 1000);
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    console.log(`✅ Time taken from header appearance to success message: ${minutes} minutes and ${seconds} seconds`);
  }
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async createMusic() {
    try {
      await this.page.getByRole('link', { name: 'Create Music' }).click();
      
      const randomPromptButton = this.page.getByRole('button', { name: 'Get Random Prompt' });
      await randomPromptButton.click();

      await this.page.getByPlaceholder('Naming your masterpiece...').fill(config.CreateMusics_Name);
      await this.page.getByRole('button', { name: 'Generate' }).click();
      
      const validLinkMessage = await this.page.getByText('Create music successfully!');
      await expect(validLinkMessage).toBeVisible();
      console.log(validLinkMessage.isVisible() ? '✅ Create music successfully!' : '❌ Create music failed.');

      const textsToCheck = [
        `LYRIC VIDEO: ${config.CreateMusics_Name}`,  
        `LYRIC VIDEO: ${config.CreateMusics_Name} Option 2`
      ];
      
      let startTime; 
      for (const text of textsToCheck) {
        const locator = this.page.getByText(text);
        if (await locator.count() > 0) {
          if (!startTime) {
            startTime = Date.now();
          }
          const isVisible = await locator.first().isVisible();
          console.log(isVisible ? `"${text}" is present.` : `"${text}" not found.`);
        } else {
          console.log(`"${text}" not found in the document.`);
        }
      }

      const successMessages = await Promise.all([
        this.page.getByText('Success').first().waitFor({ timeout: 200000 }),
        this.page.getByText('Success').nth(1).waitFor({ timeout: 200000 })
      ]);
      successMessages.forEach((msg, index) => {
        console.log(`Success message ${index + 1} is visible.`);
      });
      if (startTime) {
        this.logTimeTaken(startTime);
      }

      await this.page.getByRole('link', { name: 'History Activities' }).click();
      await this.page.waitForSelector(`//h6[text()='${config.CreateMusics_Name}']`, { state: 'visible' });
      await this.page.waitForSelector(`(//td[.//div[text()='Create Music'] and .//h6[text()='${config.CreateMusics_Name}']])[1]`, { state: 'visible' });
      const successTd = this.page.locator(`//tr[.//h6[text()='${config.CreateMusics_Name}']][1]//p[text()='Success']`);
      const isSuccessVisible = await successTd.count() > 0 && await successTd.isVisible();
      const failedTd = this.page.locator(`//tr[.//h6[text()='${config.CreateMusics_Name}']][1]//p[text()='Failed']`);
      const isFailedVisible = await failedTd.count() > 0 && await failedTd.isVisible();
      if (isSuccessVisible) {
        console.log('✅ Test Passed: Song created with Success status on history summary page');
      } else if (isFailedVisible) {
        console.log('❌ Test Failed: Song created with Failed status on history summary page');
      } else {
        console.log('❌ Test status unknown: No success or failure message found.');
      }
      await this.page.waitForSelector(`//tr[.//h6[text()='${config.CreateMusics_Name}']][1]//button[contains(@class, 'delete-button')]`, { state: 'visible' });
      await this.page.locator(`//tr[.//h6[text()='${config.CreateMusics_Name}']][1]//button[contains(@class, 'delete-button')]`).click();
      await expect(this.page.getByText('Delete success!')).toBeVisible();
      console.log('✅ Test Passed: Delete success on history!');

    } catch (error) {
      console.error('❌ Error during music creation process:', error);
      throw new Error('❌ Failed in initial steps like clicking links or filling the form.');
    }
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

export default CreateMusicPage;
