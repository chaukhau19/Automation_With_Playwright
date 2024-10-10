import { expect } from '@playwright/test';


class CreateMusicPage {
  constructor(page) {
    this.page = page;
  }

  async createMusic() {
    try {
      await this.page.getByRole('link', { name: 'Create Music' }).click();
      
      await this.page.getByRole('button', { name: 'Get Random Prompt' }).click();

      await this.page.getByPlaceholder('Naming your masterpiece...').click();
      await this.page.getByPlaceholder('Naming your masterpiece...').fill('CreateMusic');
  
      await this.page.getByRole('button', { name: 'Generate' }).click();
      
      const validLinkMessage = await this.page.getByText('Create music successfully!');
      await expect(validLinkMessage).toBeVisible();
      if (await validLinkMessage.isVisible()) {
        console.log('Create music successfully!');
      }
    } catch (error) {
      console.error('Error during initial setup steps:', error);
      throw new Error('Failed in initial steps like clicking links or filling the form.');
    }
  }
  

  async performCreateMusic() {
    const maxRetries = 10;
    let attempts = 0;

    const pendingXPath = "//div[contains(text(), 'Pending')]";
    const successXPath = "//div[contains(text(), 'Success')]";

    try {
      while (attempts < maxRetries) {
        try {
          // Check for the pending status
          const pendingElement = await this.page.locator(pendingXPath).isVisible();

          if (pendingElement) {
            console.log('Current status: Pending');

            const startTime = new Date();
            console.log(`Started generating music at: ${startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`);

            // Wait for percentage to reach 100%
            let percentage;
            do {
              percentage = await this.page.locator('p.sc-kPTPQs.htnvaK').textContent();
              console.log(`Current generation percentage: ${percentage}`);
              await this.page.waitForTimeout(1000);
            } while (parseInt(percentage) < 100);

            await this.page.waitForTimeout(5000); // Additional wait after reaching 100%

            // Check if success appears
            const successVisible = await this.page.locator(successXPath).isVisible();
            if (successVisible) {
              const endTime = new Date();
              const timeTaken = Math.round((endTime - startTime) / 1000);
              const minutes = Math.floor(timeTaken / 60);
              const seconds = timeTaken % 60;

              console.log(`Music generation successful! Time taken: ${minutes} minutes ${seconds} seconds`);
              break; // Exit loop after handling the process
            } else {
              throw new Error('Music generation did not reach the success state.');
            }
          }
        } catch (retryError) {
          console.warn(`Attempt ${attempts + 1}: "Pending" not visible, retrying...`);
          await this.page.waitForTimeout(1000);
        }
        attempts++;
      }
    } catch (error) {
      console.error('Error during the music generation process:', error);
      throw new Error('Failed during the music generation process.');
    }
  }
}

export default CreateMusicPage;
