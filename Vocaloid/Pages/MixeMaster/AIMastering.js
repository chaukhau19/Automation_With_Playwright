import { expect } from '@playwright/test';

class AIMasteringPage {
  constructor(page) {
    this.page = page;
  }

  async AIMastering() {
    try {
      await this.page.getByRole('link', { name: 'AI Mastering' }).click();
      await this.page.getByText('or Drop a File here...').first().click();

      const filePath = config.path_generateDocs;
      await this.page.setInputFiles('input[type="file"]', filePath);
      console.log('File uploaded');
      
      await this.page.getByRole('button', { name: 'Generate' }).click();
      
      const validLinkMessage = await this.page.getByText('Create lyrics successfully!');
      await expect(validLinkMessage).toBeVisible();

      if (await validLinkMessage.isVisible()) {
        console.log('Create lyrics successfully!');
      }
    } catch (error) {
      console.error('Error during the Create Lyrics process:', error);
      throw new Error('Failed in the Create Lyrics process due to an error.');
    }
  }
}

export default AIMasteringPage;
