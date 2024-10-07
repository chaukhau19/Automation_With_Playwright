class ConvertVoicePage {
    constructor(page) {
        this.page = page;
    }

    async ConvertVoice() {
        try {
            // Click on "Convert Voice" link
            await this.page.getByRole('link', { name: 'Convert Voice' }).click();
            
            // Click on "More voices"
            await this.page.getByRole('button', { name: 'More voices' }).click();
            
            // Select a specific voice (nth-child 13)
            await this.page.locator('div:nth-child(13) > .sc-fpOQxu').click();

            // Fill YouTube link and start generation
            const youtubeLink = 'https://youtu.be/q2YUtZum9wc?si=mFe9GGfunznZaimb';
            await this.page.getByPlaceholder('Paste a Youtube link...').fill(youtubeLink);
            await this.page.locator('button:has-text("Generate")').click();
        } catch (error) {
            console.error('Error during initial setup steps:', error);
            throw new Error('Failed in initial steps like clicking links or filling the form.');
        }
        
        const maxRetries = 10;
        let attempts = 0;
        const pendingXPath = "//div[@style='display: flex; flex-direction: row; align-items: center; gap: 2px;' and contains(text(), 'Pending')]";
        const successXPath = "//div[@style='display: flex; flex-direction: row; align-items: center; gap: 2px;' and contains(text(), 'Success')]";

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

                        await this.page.waitForTimeout(5000);

                        // Check if success appears
                        const successVisible = await this.page.locator(successXPath).isVisible();
                        if (successVisible) {
                            const endTime = new Date();
                            const timeTaken = Math.round((endTime - startTime) / 1000);
                            const minutes = Math.floor(timeTaken / 60);
                            const seconds = timeTaken % 60;

                            console.log(`Music generation successful! Time taken: ${minutes} minutes ${seconds} seconds`);
                        } else {
                            throw new Error('Music generation did not reach the success state.');
                        }
                        break; // Exit loop after handling the process
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

export default ConvertVoicePage;
