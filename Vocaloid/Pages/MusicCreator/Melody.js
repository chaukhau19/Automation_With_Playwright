import { expect } from '@playwright/test';


class MelodyPage {
  constructor(page) {
    this.page = page;
  }

  async createMelody() {
    try {
        await this.page.getByRole('link', { name: 'Text to Melody' }).click();
        await this.page.getByRole('button', { name: 'Get Random Prompt' }).click();

      await this.page.getByPlaceholder('Naming your masterpiece...').click();
      await this.page.getByPlaceholder('Naming your masterpiece...').fill('CreateMelody');
  
      await this.page.getByRole('button', { name: 'Generate' }).click();
      
      const validLinkMessage = await this.page.getByText('Generate melody successfully!');
      await expect(validLinkMessage).toBeVisible();
      if (await validLinkMessage.isVisible()) {
        console.log('Generate melody successfully!');
      }
    } catch (error) {
      console.error('Error during initial setup steps:', error);
      throw new Error('Failed in initial steps like clicking links or filling the form.');
    }
  }
}
  export default MelodyPage;