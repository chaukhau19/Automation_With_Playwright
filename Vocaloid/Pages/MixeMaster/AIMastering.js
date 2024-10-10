import { expect } from '@playwright/test';

class AIMasteringPage {
  constructor(page) {
    this.page = page;
  }
  async AIMastering() {
    try {
      await this.page.getByRole('link', { name: 'AI Mastering' }).click();

      const filePath1 = 'D:/Git/Automation_With_Playwright/Vocaloid/Data/Ca khúc Cám ơn tình yêu.mp3';
      await this.page.setInputFiles("(//input[@type='file'])", filePath1); 
      console.log('First file uploaded');

      // await this.page.locator("(//div[@class='sc-hnwOTO gDNkLc']//label[@id='file-upload'])[2]").click();
      // const filePath2 = 'D:/Git/Automation_With_Playwright/Vocaloid/Data/Another_File.mp3';
      // await this.page.setInputFiles("(//input[@type='file'])", filePath2); 
      // console.log('Second file uploaded');

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
