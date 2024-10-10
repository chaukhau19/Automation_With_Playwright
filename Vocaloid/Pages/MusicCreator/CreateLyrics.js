import { expect } from '@playwright/test';

class CreateLyricsPage {
  constructor(page) {
    this.page = page;
  }

  async createLyrics() {
    try {
      // Navigate to the Create Lyrics page
      await this.page.getByRole('link', { name: 'Create Lyrics' }).click();
      
      // Get a random prompt
      await this.page.getByRole('button', { name: 'Get Random Prompt' }).click();

      // Fill the name for the lyrics
      const placeholder = await this.page.getByPlaceholder('Naming your masterpiece...');
      await placeholder.click();
      await placeholder.fill('CreateLyrics'); // Corrected the typo

      // Generate the lyrics
      await this.page.getByRole('button', { name: 'Generate' }).click();
      
      // Validate success message
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

export default CreateLyricsPage;
