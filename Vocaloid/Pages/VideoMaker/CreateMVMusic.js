import { expect } from '@playwright/test';
import { config } from '../../Utils/config';

class MVScriptsPage {
    constructor(page) {
        this.page = page;
    }

    async MVScripts() {
        try {
            await this.page.getByRole('link', { name: 'Create MV Script' }).click();
            await this.page.getByRole('button', { name: 'Get Random Prompt' }).click();

            const placeholder = this.page.getByPlaceholder('Naming your masterpiece...');
            await placeholder.click();
            await placeholder.fill(config.MVScripts_Name); 

            console.log('Generating the script');
            await this.page.getByRole('button', { name: 'Generate' }).click();

            await this.page.waitForSelector('text=Create script successfully!', { timeout: 10000 });
            const validLinkMessage = await this.page.getByText('Create script successfully!');
            await expect(validLinkMessage).toBeVisible();

            await expect(this.page.locator(`//div[@class='header']//h2[text()='${config.MVScripts_Name}']`)).toBeVisible();
            await expect(this.page.locator(`//div[@class='header']//span[text()='Success']`)).toBeVisible();
            console.log('✅ Test Passed: Create script successfully!');

            await this.page.getByRole('link', { name: 'History Activities' }).click();
            await this.page.waitForSelector(`//h6[text()='${config.MVScripts_Name}']`, { state: 'visible' });
            const successTd = this.page.locator(`//tr[.//h6[text()='${config.MVScripts_Name}']]//p[text()='Success']`);
            const isSuccessVisible = await successTd.count() > 0 && await successTd.isVisible();
            const failedTd = this.page.locator(`//tr[.//h6[text()='${config.MVScripts_Name}']]//p[text()='Failed']`);
            const isFailedVisible = await failedTd.count() > 0 && await failedTd.isVisible();
            if (isSuccessVisible) {
                console.log('✅ Test Passed: Success message is visible.');
            } else if (isFailedVisible) {
                console.log('❌ Test Failed: Failure message is visible.');
            } else {
                console.log('❌ Test status unknown: No success or failure message found.');
            }
            await this.page.waitForSelector(`//tr[.//h6[text()='${config.MVScripts_Name}']]//button[contains(@class, 'delete-button')]`, { state: 'visible' });
            await this.page.locator(`//tr[.//h6[text()='${config.MVScripts_Name}']]//button[contains(@class, 'delete-button')]`).click();
            await expect(this.page.getByText('Delete success!')).toBeVisible();
            console.log('✅ Test Passed: Delete success on history!');

        } catch (error) {
            console.error('❌ Error during the MV Scripts process:', error.message || error);
            throw new Error(`❌ Failed in the MV Scripts process: ${error.message || error}`);
        }
    }
}

export default MVScriptsPage;
