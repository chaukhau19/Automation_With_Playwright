const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://ai-cover-v2.playgroundx.site/dashboard/');
  await page.locator('.close-button').first().click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByPlaceholder('Enter your email').click();
  await page.getByPlaceholder('Enter your email').click({
    modifiers: ['ControlOrMeta']
  });
  await page.getByPlaceholder('Enter your email').fill('chaukhau2000@gmail.com');
  await page.getByPlaceholder('Enter your password').click({
    modifiers: ['ControlOrMeta']
  });
  await page.getByPlaceholder('Enter your password').fill('wgh1p58o');
  await page.getByText('Sign In AccountEmailPasswordRemember meForgot password?Sign InDon’t have an').click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('.close-button').first().click();
  await page.getByText('Login success').click();
  await page.getByRole('link', { name: 'Convert Voice' }).click();
  await page.locator('section').filter({ hasText: 'Step 1:Select a voiceMore voicesStep 2:Provide input for generating' }).getByRole('button').nth(2).click();
  await page.getByPlaceholder('Paste a Youtube link...').click();
  await page.getByText('Valid YouTube link!').click();
  await page.getByRole('button', { name: 'Generate' }).click();
  await page.getByText('Step 2:Provide input for').click();
  await page.getByRole('link', { name: 'logo ari' }).click();
  await page.locator('.close-button').first().click();
  await page.getByRole('link', { name: 'Create Music' }).click();
  await page.getByRole('button', { name: 'Get Random Prompt' }).click();
  await page.getByPlaceholder('Naming your masterpiece...').click();
  await page.getByPlaceholder('Naming your masterpiece...').press('CapsLock');
  await page.getByPlaceholder('Naming your masterpiece...').fill('C');
  await page.getByPlaceholder('Naming your masterpiece...').press('CapsLock');
  await page.getByPlaceholder('Naming your masterpiece...').fill('Create');
  await page.getByPlaceholder('Naming your masterpiece...').press('CapsLock');
  await page.getByPlaceholder('Naming your masterpiece...').fill('CreateM');
  await page.getByPlaceholder('Naming your masterpiece...').press('CapsLock');
  await page.getByPlaceholder('Naming your masterpiece...').fill('CreateMusic');
  await page.getByRole('button', { name: 'Generate' }).click();
  await page.getByText('Create music successfully!').click();
  await page.getByRole('link', { name: 'Text to Melody' }).click();
  await page.getByRole('button', { name: 'Get Random Prompt' }).click();
  await page.getByPlaceholder('Naming your masterpiece...').click();
  await page.getByPlaceholder('Naming your masterpiece...').press('CapsLock');
  await page.getByPlaceholder('Naming your masterpiece...').fill('c');
  await page.getByPlaceholder('Naming your masterpiece...').press('CapsLock');
  await page.getByPlaceholder('Naming your masterpiece...').fill('C');
  await page.getByPlaceholder('Naming your masterpiece...').press('CapsLock');
  await page.getByPlaceholder('Naming your masterpiece...').fill('Create');
  await page.getByPlaceholder('Naming your masterpiece...').press('CapsLock');
  await page.getByPlaceholder('Naming your masterpiece...').fill('CreateM');
  await page.getByPlaceholder('Naming your masterpiece...').press('CapsLock');
  await page.getByPlaceholder('Naming your masterpiece...').fill('CreateMelody');
  await page.getByRole('button', { name: 'Generate' }).click();
  await page.getByText('Generate melody successfully!').click();
  await page.getByRole('link', { name: 'Create Lyrics' }).click();
  await page.getByRole('button', { name: 'Get Random Prompt' }).click();
  await page.getByPlaceholder('Naming your masterpiece...').click();
  await page.getByPlaceholder('Naming your masterpiece...').fill('lo');
  await page.getByRole('button', { name: 'Generate' }).click();
  await page.getByText('Create lyrics successfully!').click();
  await page.getByRole('link', { name: 'Create Music' }).click();
  await page.getByRole('link', { name: 'Create Lyrics' }).click();
  await page.getByRole('button', { name: 'Get Random Prompt' }).click();
  await page.getByRole('link', { name: 'AI Mastering' }).click();
  await page.getByText('or Drop a File here...').first().click();
  await page.locator('body').setInputFiles('Các “trang giấy trắng” đã sẵn sàng cho khoá học PHÁT ÂM cấp tốc 4 buổi cùng Cô Tiên Tinker chưa nè_ (1).mp4');
  await page.getByRole('link', { name: 'Remove Vocal' }).click();
  await page.getByText('Remove VocalInput Removing').click();
  await page.getByRole('heading', { name: 'Input Removing Vocal Audio' }).click({
    clickCount: 13
  });
  await page.getByRole('link', { name: 'AI Mastering' }).click();
  await page.getByText('or Drop a File here...').first().click();
  await page.locator('body').setInputFiles('file_example_MP3_700KB.mp3');
  await page.getByRole('button', { name: 'Start Mastering' }).click();
  await page.getByText('Generate mastering').click();
  await page.getByText('or Drop a File here...').nth(1).click();
  await page.getByText('or Drop a File here...').first().click();
  await page.locator('body').setInputFiles('file_example_MP3_5MG.mp3');
  await page.getByRole('button', { name: 'Start Mastering' }).click();
  await page.getByText('Generate mastering').click();
  await page.getByText('🙌Generate mastering').click();
  await page.getByText('Generate mastering').click();

  // ---------------------
  await context.close();
  await browser.close();
})();