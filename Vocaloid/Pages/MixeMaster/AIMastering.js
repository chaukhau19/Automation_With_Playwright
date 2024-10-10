import { expect } from '@playwright/test';

class AIMasteringPage {
  constructor(page) {
    this.page = page;
  }

  async AIMastering() {
    try {
      await this.page.getByRole('link', { name: 'AI Mastering' }).click();

      await this.page.getByText('or Drop a File here...').first().click();
      const filePath1 = config.Music_Audio_1;
      await this.page.setInputFiles('input[type="file"]', filePath1);
      console.log('File uploaded');

      await this.page.getByText('or Drop a File here...').nth(1).click();
      const filePath2 = config.Music_Audio_3;
      await this.page.setInputFiles('input[type="file"]', filePath2);
      console.log('File uploaded');

      await this.page.getByRole('button', { name: 'Start Mastering' }).click();

      const validLinkMessage = await this.page.getByText('Generate mastering');
      await expect(validLinkMessage).toBeVisible();

      if (await validLinkMessage.isVisible()) {
        console.log('Generate mastering');
      }
    } catch (error) {
      console.error('Error during the Create Lyrics process:', error);
      throw new Error('Failed in the Create Lyrics process due to an error.');
    }
  }
}

export default AIMasteringPage;
