// /Pages/Friendify/FD_Actions.js
import { expect } from '@playwright/test';
import { config } from '../Utils/FD_config';

export class ActionsPage {
    constructor(page) {
        this.page = page;
        this.chatPointSelector = config.chatPointSelector;
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////                  FUNCTION                ////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async loginWithAccount() {
        await this.page.goto(config.url);
        await this.page.getByText('Login').click();
        await this.page.getByPlaceholder('Email...').fill(config.email);
        await this.page.getByPlaceholder('Password...').fill(config.password);
        await this.page.getByRole('button', { name: 'Login' }).click();
        // await expect(this.page).toHaveTitle('Friendify GPT - Your AI Personal Assistant');
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////                 TEST CASE                ////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async performFirstChat() {
        console.log('🔍 Checking current points...');
        await this.page.waitForTimeout(3000); 
        const pointBeforeFirstChat = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
        console.log('🔍 Point before first chat: ', pointBeforeFirstChat);

        await this.page.getByText('AskContactChatFeedAssist').first().click();
        await this.page.getByRole('link', { name: 'Ask' }).click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('link', { name: 'AI Chat GPT Start new chat' }).click();
        await this.page.getByText('AI Chat GPTNew chat').click();
        await this.page.waitForTimeout(2000);
        await this.page.getByRole('link', { name: 'New chat' }).click();
        await this.page.getByPlaceholder('Type something...').fill(config.message1);
        console.log('📝 Typed message: ', config.message1);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);
        try {
            console.log('🔍 Checking for expected message...');
            const isMessageVisible = await this.page.getByText(config.expect_message1).isVisible();
            if (isMessageVisible) {
                console.log('✅ Expected message is visible');
            } else {
                console.log('❌ Expected message is NOT visible');
            }
        } catch (error) {
            console.error('❌ Error while checking expected message:', error);
        }        
        await this.page.waitForTimeout(10000); 
        const pointAfterFirstChat = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
        console.log('🔍 Point of Speed after first chat: ', pointAfterFirstChat);
        const totalPointUsedFirstChat = pointBeforeFirstChat - pointAfterFirstChat;
        console.log('⚡⚡⚡ Total of Speed points used after chat: ', totalPointUsedFirstChat);
        if (totalPointUsedFirstChat === 1) {
            console.log('✅ The points decreased correctly by 1 after the first chat.');
        } else {
            console.log('❌ The points did not decrease correctly after the first chat.');
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async performSecondChat() {
        console.log('🔍 Checking current points...');
        await this.page.waitForTimeout(3000); 
        const pointBeforeSecondChat = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
        console.log('🔍 Point before second chat: ', pointBeforeSecondChat);

        await this.page.getByRole('link', { name: 'New chat' }).click();
        await this.page.getByRole('switch', { name: 'Speed Intelligent' }).click();
        console.log('🖱️ Clicked "Speed Intelligent" switch');
        await this.page.getByPlaceholder('Type something...').fill(config.message2);
        console.log('📝 Typed message: ', config.message2);
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);
        try {
            console.log('🔍 Checking for expected message...');
            const isMessageVisible = await this.page.getByText(config.expect_message2).isVisible();
            if (isMessageVisible) {
                console.log('✅ Expected message is visible');
            } else {
                console.log('❌ Expected message is NOT visible');
            }
        } catch (error) {
            console.error('❌ Error while checking expected message:', error);
        }   
        await this.page.waitForTimeout(10000); 
        const pointAfterSecondChat = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
        console.log('🔍 Point of Intelligent after second chat: ', pointAfterSecondChat);
        const totalPointUsedSecondChat = pointBeforeSecondChat - pointAfterSecondChat;
        console.log('⚡⚡⚡ Total of Intelligent points used after chat: ', totalPointUsedSecondChat);
        if (totalPointUsedSecondChat === 1) {
            console.log('✅ The points decreased correctly by 1 after the second chat.');
        } else {
            console.log('❌ The points did not decrease correctly after the second chat.');
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async generateImage_1() {
        console.log('🔍 Checking current points...');
        await this.page.waitForTimeout(3000); 
        const pointBeforeSecondChat = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
        console.log('🔍 Point before second chat: ', pointBeforeSecondChat);
    
        try {
            await this.page.getByRole('link', { name: 'Chat', exact: true }).click();
            await this.page.getByRole('link', { name: 'Ask' }).click();
            await this.page.getByRole('link', { name: 'AI Generate Image Create new' }).click();
            
            await this.page.getByPlaceholder('Describe your image...').fill('Tao ảnh con mèo');
            await this.page.getByRole('button', { name: 'Generate' }).click();
            console.log('🚀 Generating image...');

            await this.page.waitForTimeout(2000); 
            console.log('🔍 Waiting for the generated image to appear...');
            const generatedImage = this.page.getByRole('img', { name: 'Generated Image' }).nth(1);
            try {
                await expect(generatedImage).toBeVisible({ timeout: 60000 });
                console.log('✅ Expected image is visible');
            } catch (error) {
                console.error('❌ The expected image is not visible:', error);
            }
        } catch (error) {
            console.error('❌ Error while generating image or checking visibility:', error);
        }   
        
        try {
            await this.page.waitForTimeout(10000); 
            const pointAfterSecondChat = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
            console.log('🔍 Point of Intelligent after second chat: ', pointAfterSecondChat);
            const totalPointUsedSecondChat = pointBeforeSecondChat - pointAfterSecondChat;
            console.log('⚡⚡⚡ Total of Intelligent points used after second chat: ', totalPointUsedSecondChat);

            if (totalPointUsedSecondChat === 5) {
                console.log('✅ The points decreased correctly by 5 after the second chat.');
            } else {
                console.log('❌ The points did not decrease correctly after the second chat.');
            }
        } catch (error) {
            console.error('❌ Error while checking points after second chat:', error);
        }
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async generateImage_2() {
        console.log('🔍 Checking current points...');
        await this.page.waitForTimeout(3000); 
        const pointBeforeSecondChat = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
        console.log('🔍 Point before second chat: ', pointBeforeSecondChat);
        
        try {
            await this.page.getByRole('link', { name: 'Chat', exact: true }).click();
            await this.page.getByRole('link', { name: 'Ask' }).click();
            await this.page.getByRole('link', { name: 'AI Generate Image Create new' }).click();
            await this.page.getByRole('button', { name: 'Pro •' }).click();
            
            await this.page.getByPlaceholder('Describe your image...').fill('Tao ảnh con mèo');
            await this.page.getByRole('button', { name: 'Generate' }).click();
            console.log('🚀 Generating image...');

            console.log('🔍 Waiting for the generated image to appear...');
            const generatedImage = this.page.getByRole('img', { name: 'Generated Image' }).nth(2);
            try {
                await expect(generatedImage).toBeVisible({ timeout: 60000 });
                console.log('✅ Expected image is visible');
            } catch (error) {
                console.error('❌ The expected image is not visible:', error);
            }
        } catch (error) {
            console.error('❌ Error while generating image or checking visibility:', error);
        }   
        
        try {
            await this.page.waitForTimeout(10000); 
            const pointAfterSecondChat = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
            console.log('🔍 Point of Intelligent after second chat: ', pointAfterSecondChat);
            const totalPointUsedSecondChat = pointBeforeSecondChat - pointAfterSecondChat;
            console.log('⚡⚡⚡ Total of Intelligent points used after second chat: ', totalPointUsedSecondChat);

            if (totalPointUsedSecondChat === 25) {
                console.log('✅ The points decreased correctly by 25 after the second chat.');
            } else {
                console.log('❌ The points did not decrease correctly after the second chat.');
            }
        } catch (error) {
            console.error('❌ Error while checking points after second chat:', error);
        }
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async performOtherActions() {
        await this.page.getByText('AskContactChatFeedAssist').first().click();
        await this.page.getByRole('link', { name: 'Ask' }).click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('link', { name: 'AI Generate Image Create new' }).click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('button', { name: 'Standard •' }).click();
        await this.page.getByPlaceholder('Describe your image...').click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('button', { name: 'Pro •' }).click();
        await this.page.getByPlaceholder('Describe your image...').click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('link', { name: 'Contact' }).click();
        await this.page.locator('div').filter({ hasText: /^Contact$/ }).getByRole('img').nth(1).click();
        await this.page.locator('div').filter({ hasText: /^Huy ThienAdd$/ }).getByRole('button').click();
        await this.page.getByRole('button', { name: 'Revoke' }).click();
        await this.page.locator('div').filter({ hasText: /^Add Friend$/ }).getByRole('img').click();
        await this.page.getByRole('link', { name: 'Chat' }).click();
        await this.page.getByRole('link', { name: 'Feed' }).click();
        await this.page.getByRole('button', { name: 'Community' }).click();
        await this.page.getByRole('option', { name: 'My feeds' }).click();
        await this.page.getByRole('button', { name: 'My feeds' }).click();
        await this.page.getByRole('option', { name: 'Community' }).click();
        await this.page.getByRole('link', { name: 'Assist' }).click();
        await this.page.locator('label').filter({ hasText: 'Upload File (Max 5MB .pdf)' }).locator('div').first().waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator('text=Audio').waitFor({ state: 'visible', timeout: 10000 });
        await this.page.getByText('Audio').click();
        await this.page.locator('div').filter({ hasText: /^Upload File \(Max 5MB \.mp3\) Small or poor-quality sound may limit summarization\.$/ }).nth(1).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.locator('text=Image').waitFor({ state: 'visible', timeout: 10000 });
        await this.page.getByText('Image').click();
        await this.page.locator('label:has-text("Upload File (Max 5MB .png | .")').waitFor({ state: 'visible', timeout: 10000 });
        // await this.page.getByText('Video').click();
        // await this.page.locator('label:has-text("Upload File (Max 5MB .mp4")').waitFor({ state: 'visible', timeout: 10000 });
        // await this.page.getByText('Document').click();
        // await this.page.getByText('Done').click();
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async generateDoc() {
        console.log('🔍 Checking current points...');
        await this.page.waitForTimeout(3000);
        const pointBeforeGenerate = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
        console.log('🔍 Point before second chat: ', pointBeforeGenerate);

        try {
            console.log('📁 Clicking on Assist link...');
            await this.page.getByRole('link', { name: 'Assist' }).click();
            
            const uploadLocator = this.page.locator('label').filter({ hasText: 'Upload File (Max 5MB .pdf)' }).locator('div').first();
            await uploadLocator.waitFor({ state: 'visible', timeout: 10000 });
            console.log('🖱️ Uploading file...');
            await uploadLocator.click();
        
            const filePath = config.path_generateDocs;
            await this.page.setInputFiles('input[type="file"]', filePath);
            console.log('✅ File uploaded');
        
            console.log('🚀 Starting Summary...');
            await this.page.getByRole('button', { name: 'Start Summary' }).click();
        } catch (error) {
            console.error('❌ Failed to generate docs:', error);
        }

        try {
            console.log('🔍 Verifying generated docs...');
            await expect(this.page.getByText(config.expect_text_Docs)).toBeVisible({ timeout: 30000 });
            console.log('✅ Message is visible:', config.expect_text_Docs);
        } catch (error) {
            console.error('❌ Failed to verify generate docs:', error);
        }

        await this.page.waitForTimeout(15000); 

        const pointAfterGenerate = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
        console.log('🔍 Point after generate: ', pointAfterGenerate);

        const totalPointUsedGenerate = pointBeforeGenerate - pointAfterGenerate;
        console.log('⚡⚡⚡ Total points used after generate: ', totalPointUsedGenerate);

        if (totalPointUsedGenerate === 5) {
            console.log('✅ The points decreased correctly by 5 after the first chat.');
        } else {
            console.log('❌ The points did not decrease correctly after the first chat.');
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async deleteGenerateDocs() { 
        await this.page.getByRole('link', { name: 'Ask' }).click();
        await this.page.getByRole('link', { name: 'Assist' }).click();
        await this.page.locator('#scrollableDiv').getByRole('img').nth(1).click();
        await this.page.getByRole('button', { name: 'Confirm' }).click();
        console.log('✅ Delete Docs');
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async generateAudio() {
        console.log('🔍 Checking current points...');
        await this.page.waitForTimeout(3000);
        const pointBeforeGenerate = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
        console.log('🔍 Point before audio generation: ', pointBeforeGenerate);

        try {
            await this.page.getByRole('link', { name: 'Assist' }).click();
            await this.page.getByText('Audio').click();
            await this.page.locator('div').filter({ hasText: /^Upload File \(Max 5MB \.mp3\) Small or poor-quality sound may limit summarization\.$/ }).nth(1).waitFor({ state: 'visible', timeout: 10000 });
            await this.page.locator('div').filter({ hasText: /^Upload File \(Max 5MB \.mp3\) Small or poor-quality sound may limit summarization\.$/ }).nth(1).click();

            const filePath = config.path_generateAudio;
            await this.page.setInputFiles('input[type="file"]', filePath);
            console.log('📂 File uploaded');
            await this.page.getByRole('button', { name: 'Start Summary' }).click();

        } catch (error) {
            console.error('❌ Failed to generate:', error);
        }

        try {
            await expect(this.page.getByText(config.expect_text_Audio)).toBeVisible({ timeout: 30000 });
            console.log('✅ Message is visible:', config.expect_text_Audio);

        } catch (error) {
            console.error('❌ Failed to verify generate:', error);
        }

        await this.page.waitForTimeout(15000); 

        const pointAfterGenerate = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
        console.log('🔍 Point after audio generation: ', pointAfterGenerate);
        const totalPointUsedGenerate = pointBeforeGenerate - pointAfterGenerate;
        console.log('⚡⚡⚡ Total points used after generate: ', totalPointUsedGenerate);

        if (totalPointUsedGenerate === 5) {
            console.log('✅ The points decreased correctly by 5 after the audio generation.');
        } else {
            console.log('❌ The points did not decrease correctly after the audio generation.');
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async deleteGenerateAudio() {
        try {
            await this.page.getByRole('link', { name: 'Ask' }).click();
            await this.page.getByRole('link', { name: 'Assist' }).click();
            await this.page.getByText('Audio').click();
            await this.page.locator('#scrollableDiv').getByRole('img').click();
            await this.page.getByRole('button', { name: 'Confirm' }).click();
            console.log('✅ Delete Audio');
    
        } catch (error) {
            console.error('❌ Failed to delete audio:', error);
        }
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async generateImage_Summary() {
        console.log('🔍 Checking current points...');
        await this.page.waitForTimeout(3000);
        const pointBeforeGenerate = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
        console.log('🔍 Point before generating image: ', pointBeforeGenerate);
    
        try {
            await this.page.getByRole('link', { name: 'Assist' }).click();
            await this.page.getByText('Image', { exact: true }).click();
            await expect(this.page.getByText('New features release')).toBeVisible();
    
            const uploadLocator = await this.page.locator('label:has-text("Upload File (Max 5MB .png | .")');
            await uploadLocator.waitFor({ state: 'visible', timeout: 10000 });
            await uploadLocator.click();
            
            const fileInput = this.page.locator('input[type="file"]');
            await fileInput.setInputFiles(config.path_generateImage_Summary);
            console.log('📂 File uploaded');

            await this.page.locator('div').filter({ hasText: /^Summary$/ }).getByRole('button').click();
            console.log('✅ Clicked Summary');
    
            await this.page.getByRole('button', { name: 'Let\'s start' }).click();
            console.log('✅ Clicked Start');
    
            await expect(this.page.locator('div').filter({ hasText: /^Image_4KB\.png$/ }).nth(1)).toBeVisible();
            console.log('🔍 Verify generate image on this page');
    
            await expect(this.page.getByRole('img', { name: 'avt' })).toBeVisible({ timeout: 30000 });
            console.log('✅ Answer done');

            await this.page.waitForTimeout(15000); 

            const pointAfterGenerate = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
            console.log('🔍 Point after generate: ', pointAfterGenerate);
            const totalPointUsedGenerate = pointBeforeGenerate - pointAfterGenerate;
            console.log('⚡⚡⚡ Total points used after generate: ', totalPointUsedGenerate);

            if (totalPointUsedGenerate === 5) {
                console.log('✅ The points decreased correctly by 5 after generating the image summary.');
            } else {
                console.log('❌ The points did not decrease correctly after generating the image summary.');
            }
        } catch (error) {
            console.error('❌ An error occurred during the generate image summary operation:', error);
        }
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async deleteGenerateImage_Summary() {
        try {
            await this.page.getByRole('link', { name: 'Ask' }).click();
            await this.page.getByRole('link', { name: 'Assist' }).click();
            await this.page.getByText('Image', { exact: true }).click();
            await this.page.locator('#scrollableDiv').getByRole('img').click();
            await this.page.getByRole('button', { name: 'Confirm' }).click();
            console.log('✅ Delete Image');
    
        } catch (error) {
            console.error('❌ Failed to delete image:', error);
        }
    }
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async generateImage_Text() {
        console.log('🔍 Checking current points...');
        await this.page.waitForTimeout(3000);
        const pointBeforeGenerate = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
        console.log('🔍 Point before generating image summary: ', pointBeforeGenerate);
    
        try {
            await this.page.getByRole('link', { name: 'Assist' }).click();
            await this.page.getByText('Image', { exact: true }).click();
            await expect(this.page.getByText('New features release')).toBeVisible();

            await this.page.locator('label').filter({ hasText: 'Upload File (Max 5MB .png | .' }).locator('div').first().click();
            console.log('📂 Clicked to upload file');
    
            const filePath = config.path_generateImage_RemoveText;
            await this.page.setInputFiles('input[type="file"]', filePath);
            console.log('📤 File uploaded');
    
            await this.page.locator('div').filter({ hasText: /^Remove text$/ }).getByRole('button').click();
            console.log('✏️ Clicked button Remove Text');
    
            await this.page.getByRole('button', { name: 'Let\'s start' }).click();
            console.log('🚀 Started Remove');

            const downloadPromise = this.page.waitForEvent('download');
            await this.page.getByRole('button', { name: 'Download image' }).click();
            const download = await downloadPromise;
            console.log('📥 Download Successfully');

        } catch (error) {
            console.error('❌ Failed to generate image with remove text:', error);
        }
    
        try {
            await expect(this.page.getByRole('img', { name: 'Image result' })).toBeVisible({ timeout: 30000 });
            console.log('✅ Answer done');
        } catch (error) {
            console.error('❌ Failed to verify image visibility:', error);
        }

        await this.page.waitForTimeout(15000); 

        try {
            const pointAfterGenerate = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
            console.log('🔍 Point after generate: ', pointAfterGenerate);
            const totalPointUsedGenerate = pointBeforeGenerate - pointAfterGenerate;
            console.log('⚡⚡⚡ Total points used after generate: ', totalPointUsedGenerate);

            if (totalPointUsedGenerate === 15) {
                console.log('✅ The points decreased correctly by 15 after generating the image summary.');
            } else {
                console.log('❌ The points did not decrease correctly after generating the image summary.');
            }
        } catch (error) {
            console.error('❌ An error occurred during the generate image summary operation:', error);
        }
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async deleteGenerateImage_Text() {
        try {
            await this.page.getByRole('link', { name: 'Ask' }).click();
            await this.page.getByRole('link', { name: 'Assist' }).click();
            await this.page.getByText('Image', { exact: true }).click();
            await this.page.locator('#scrollableDiv').getByRole('img').click();
            await this.page.getByRole('button', { name: 'Confirm' }).click();
            console.log('✅ Delete Image');
    
        } catch (error) {
            console.error('❌ Failed to delete image:', error);
        }
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async generateImage_Object() {
        console.log('🔍 Checking current points...');
        await this.page.waitForTimeout(3000);
        const pointBeforeGenerate = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
        console.log('🔍 Point before generating image: ', pointBeforeGenerate);
    
        try {
            await this.page.getByRole('link', { name: 'Assist' }).click();
            await this.page.getByText('Image', { exact: true }).click();
            await expect(this.page.getByText('New features release')).toBeVisible();
    
            await this.page.locator('label').filter({ hasText: 'Upload File (Max 5MB .png | .' }).locator('div').first().click();
            console.log('📂 Clicked to upload file');

            const filePath = config.path_generateImage_RemoveObject;
            await this.page.setInputFiles('input[type="file"]', filePath);
            console.log('📤 File uploaded');

            await this.page.locator('div').filter({ hasText: /^Remove object$/ }).getByRole('button').click();
            await this.page.getByRole('button', { name: 'Let\'s start' }).click();
            console.log('🚀 Started Remove');

            await this.page.getByRole('slider').fill('100');
            await this.page.locator('canvas').nth(1).click({ position: { x: 186, y: 83 } });
            await this.page.locator('canvas').nth(1).click({ position: { x: 432, y: 90 } });
            await this.page.getByRole('main').getByRole('button').first().click();
            await this.page.getByRole('main').getByRole('button').nth(1).click();
            await expect(this.page.locator('canvas').nth(1)).toBeVisible({ position: { x: 432, y: 90 } });
            await this.page.getByRole('main').getByRole('button').nth(2).click();
            await this.page.locator('canvas').nth(1).click({ position: { x: 185, y: 89 } });
            await this.page.getByRole('button', { name: 'Clean •' }).click();
            console.log('🧹 Clean action executed');

            const downloadPromise = this.page.waitForEvent('download');
            await this.page.getByRole('button', { name: 'Download image' }).click();
            const download = await downloadPromise;
            console.log('📥 Download successfully initiated');

            await expect(this.page.getByRole('img', { name: 'Image result' })).toBeVisible({ timeout: 30000 });
            console.log('✅ Answer done');

        } catch (error) {
            console.error('❌ Failed to generate image with remove object:', error);
        }

        await this.page.waitForTimeout(15000); 

        try {
            const pointAfterGenerate = parseInt(await this.page.locator(this.chatPointSelector).innerText(), 10);
            console.log('🔍 Point after generate: ', pointAfterGenerate);
            const totalPointUsedGenerate = pointBeforeGenerate - pointAfterGenerate;
            console.log('⚡⚡⚡ Total points used after generate: ', totalPointUsedGenerate);

            if (totalPointUsedGenerate === 15) {
                console.log('✅ The points decreased correctly by 15 after generating the image summary.');
            } else {
                console.log('❌ The points did not decrease correctly after generating the image summary.');
            }
        } catch (error) {
            console.error('❌ An error occurred while checking points after generation:', error);
        }
    }



    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async deleteGenerateImage_Object() {
        try {
            await this.page.getByRole('link', { name: 'Ask' }).click();
            await this.page.getByRole('link', { name: 'Assist' }).click();
            await this.page.getByText('Image', { exact: true }).click();
            await this.page.locator('#scrollableDiv').getByRole('img').click();
            await this.page.getByRole('button', { name: 'Confirm' }).click();
            console.log('✅ Delete Image');
    
        } catch (error) {
            console.error('❌ Failed to delete image:', error);
        }
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

}
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
