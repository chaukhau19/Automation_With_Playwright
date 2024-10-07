const fs = require('fs');
const path = require('path'); 
import { expect } from '@playwright/test';
import { config } from '../Utils/TG_config.js'; // Ensure correct path

class TGHomePage {
  constructor(page) {
    this.page = page;
    this.summaryElement = page.locator(config.chatPointSelector);
    this.engagementElement = page.locator('div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600');
    this.reviewElement = page.locator('div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600');
    this.shareElement = page.locator('div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600');
    this.launchPlusButton = page.locator('button:has-text("Launch +")');
    this.launchButton = page.locator('button:has-text("Launch")');
    this.pointSelector = 'span.font-bold.leading-none.text-black';
    this.searchInput = page.locator('input[placeholder="Search"]');
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////                  FUNCTION                //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async Login() {
    try {
      const cookiesPath = path.join(config.cookiesDir, config.cookiesFile);
      const cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf-8'));
      await this.page.context().addCookies(cookies);
      await this.page.goto(config.tongramUrl);
      await this.page.waitForLoadState('networkidle');  
      console.log('Page loaded successfully with cookies.');
    } catch (error) {
      console.error('Error during login:', error.message);
      throw error;  
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  convertToPoints(pointText) {
    if (pointText.includes('K')) {
      return parseFloat(pointText.replace('K', '')) * 1000;
    } else if (pointText.includes('M')) {
      return parseFloat(pointText.replace('M', '')) * 1000000;
    } else if (pointText.includes('B')) {
      return parseFloat(pointText.replace('B', '')) * 1000000000;
    } else if (pointText.includes('T')) {
      return parseFloat(pointText.replace('T', '')) * 1000000000000;
    } else {
      return parseFloat(pointText);
    }
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////                 TEST CASE                //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async Categories() {
  try {
    console.log('Clicking on Tongram Logo link...');
    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();
    
    console.log('Navigating to Games section...');
    await this.page.getByRole('main').getByRole('link', { name: 'Games Games' }).click();
    
    console.log('Checking visibility of GamesLatestHigh ratingSort text...');
    await expect(this.page.getByText('GamesLatestHigh ratingSort')).toBeVisible();
    
    console.log('Clicking on High rating button...');
    await this.page.getByRole('button', { name: 'High rating' }).click();
    
    console.log('Verifying Latest button is visible...');
    await expect(this.page.getByRole('button', { name: 'Latest' })).toBeVisible();
    
    console.log('Clicking on Latest button...');
    await this.page.getByRole('button', { name: 'Latest' }).click();
    
    console.log('Verifying Home link is visible...');
    await expect(this.page.getByRole('link', { name: 'Home' })).toBeVisible();
    
    console.log('Clicking on Home link...');
    await this.page.getByRole('link', { name: 'Home' }).click();
    
    console.log('Verifying Categories button is visible...');
    await expect(this.page.getByRole('button', { name: 'Categories' })).toBeVisible();
    
    console.log('Clicking on Categories button...');
    await this.page.getByRole('button', { name: 'Categories' }).click();
    
    console.log('Navigating to Management category...');
    await this.page.getByRole('banner').getByRole('link', { name: 'Management Management' }).click();
    
    console.log('Waiting for Management section to be visible...');
    await this.page.locator('section').filter({ hasText: 'ManagementLatestHigh' }).waitFor({ state: 'visible' });
    
    console.log('Categories navigation completed successfully.');
  
  } catch (error) {
    console.error('An error occurred during the Categories step:', error);
    throw error;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async verifyPoint() {
  try {
      const pointText1 = await this.page.locator("(//span[@class='whitespace-nowrap font-semibold'])[1]").innerText();
      const pointElement1 = this.convertToPoints(pointText1);
      console.log(`Điểm hiện tại (1): ${pointElement1}`);

      await this.page.locator("(//span[@class='whitespace-nowrap font-semibold'])[1]").click(); 
      await this.page.getByRole('button', { name: 'Earn More' }).click();

      const pointText2 = await this.page.locator("(//p[@class='text-[28px] font-bold text-[#111111] md:text-3xl'])").innerText();
      const pointElement2 = this.convertToPoints(pointText2);
      console.log(`Điểm hiện tại (2): ${pointElement2}`);

      const pointText3 = await this.page.locator("//span[contains(text(), 'TOTAL EARNED')]").innerText();
      const earnedPoints = pointText3.split(': ')[1];
      const pointElement3 = this.convertToPoints(earnedPoints);
      console.log(`Tổng điểm: ${pointElement3}`);

      if (pointElement1 === pointElement2 && pointElement2 === pointElement3) {
          console.log("Tất cả các điểm đều khớp!");
      } else {
          console.log("Điểm không khớp!");
      }
  } catch (error) {
      console.error('Lỗi trong quá trình kiểm tra điểm:', error);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async DailyLogin() { 
  try {
    await this.page.locator("(//span[@class='whitespace-nowrap font-semibold'])[1]").click(); 
    await this.page.getByRole('button', { name: 'Earn More' }).click();

    const taskContainer = this.page.locator("//div[contains(@class, 'flex flex-row items-center justify-between rounded-[20px]')]");
    
    const claimButton = taskContainer.locator(".bg-claim-button:has-text('Claim')");
    const completeIcon = taskContainer.locator("img[alt='Complete']");

    const pointTextBeforeClaim = await this.page.locator("(//p[@class='text-[28px] font-bold text-[#111111] md:text-3xl'])").innerText();
    const pointsBeforeClaim = this.convertToPoints(pointTextBeforeClaim);
    console.log(`Current Points before claim: ${pointsBeforeClaim}`); 

    if (await claimButton.count() > 0) {
      console.log("Claim button found, clicking...");
      await claimButton.click();

      const pointTextAfterClaim = await this.page.locator("(//p[@class='text-[28px] font-bold text-[#111111] md:text-3xl'])").innerText();
      const pointsAfterClaim = this.convertToPoints(pointTextAfterClaim);
      console.log(`Current Points after claim: ${pointsAfterClaim}`); 

      if (pointsAfterClaim === pointsBeforeClaim + 10) {
        console.log("Points increased by 10 after claiming!");
      } else {
        console.log("Points did not increase by 10 as expected.");
      }
    } else if (await completeIcon.count() > 0) {
      console.log("Claim already completed, skipping...");
    } else {
      console.log("No relevant elements found.");
    }
    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();

  } catch (error) {
    console.error('Error during DailyLogin task:', error);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async AppExplorer() {
  try {
    await this.page.getByPlaceholder('Search for your favorite apps').first().click();
    await this.page.getByPlaceholder('Search for your favorite apps').first().fill('PISTON');

    await this.page.getByRole('banner').getByRole('link', { name: config.Search_Query_Data_1 }).click();
    await this.page.getByRole('main').getByRole('button', { name: 'Open' }).click();

    const page2Promise = this.page.waitForEvent('popup');
    await this.page.getByRole('button', { name: 'Launch' }).click();
    const page2 = await page2Promise;

    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();

    await this.page.locator("(//span[@class='whitespace-nowrap font-semibold'])[1]").click();
    await this.page.getByRole('button', { name: 'Earn More' }).click();

    const claimButton = await this.page.locator('button:has-text("Claim")');
    const completedImage = await this.page.locator('img[alt="Complete"]');

    const pointTextBeforeClaim = await this.page.locator("(//p[@class='text-[28px] font-bold text-[#111111] md:text-3xl'])").innerText();
    const pointsBeforeClaim = this.convertToPoints(pointTextBeforeClaim);
    console.log(`Current Points before claim: ${pointsBeforeClaim}`);

    if (await claimButton.count() > 0) {
      await claimButton.click();

      const pointTextAfterClaim = await this.page.locator("(//p[@class='text-[28px] font-bold text-[#111111] md:text-3xl'])").innerText();
      const pointsAfterClaim = this.convertToPoints(pointTextAfterClaim);
      console.log(`Current Points after claim: ${pointsAfterClaim}`);

      if (pointsAfterClaim === pointsBeforeClaim + 50) {
        console.log("Points increased by 50 after claiming!");
      } else {
        console.log("Points did not increase as expected.");
      }
    } else if (await completedImage.count() > 0) {
      console.log("Claim already completed, skipping...");
    } else {
      console.log("No relevant elements found.");
    }
    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();
  } catch (error) {
    console.error('Error during AppExplorer task:', error);
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async AppReviewer() {
  try {
    const searchPlaceholder = this.page.getByPlaceholder('Search for your favorite apps').first();
    const feedbackMessageSelector = "//div[@class='relative flex h-[240px] flex-col items-center justify-center gap-y-4']//div[h5[text()='Submitted']]";
    const alreadyReviewedSelector = "//div[@class='go2072408551']//div[@role='status' and @aria-live='polite' and text()='You have already reviewed this app!']";
    const claimButtonLocator = this.page.locator('button:has-text("Claim")');
    const completedImageLocator = this.page.locator('img[alt="Complete"]');
    const pointsLocator = this.page.locator("(//p[@class='text-[28px] font-bold text-[#111111] md:text-3xl'])");

    await searchPlaceholder.click();
    await searchPlaceholder.fill(config.Search_Query_4);
    await this.page.getByRole('banner').getByRole('link', { name: config.Search_Query_Data_4 }).click();
    await this.page.waitForLoadState('networkidle');

    await this.page.locator('body > main > section.mt-8.flex.flex-col.gap-y-6.pt-6 > div.flex.flex-col.gap-y-4 > div:nth-child(1) > div > div > div > svg:nth-child(5)').first().click();
    await this.page.getByPlaceholder('What is on your mind?').fill(config.Content_Comment_Game);
    await this.page.getByRole('button', { name: 'Submit', exact: true }).click();

 
    await this.page.waitForTimeout(1000); 

    const feedbackSubmitted = await this.page.locator(feedbackMessageSelector).isVisible({ timeout: 5000 }).catch(() => false);
    const alreadyReviewed = await this.page.locator(alreadyReviewedSelector).isVisible({ timeout: 5000 }).catch(() => false);

    console.log("Feedback Submitted:", feedbackSubmitted);
    console.log("Already Reviewed:", alreadyReviewed);

    if (feedbackSubmitted && !alreadyReviewed) {
      console.log("Feedback submitted successfully.");

      // const gameText = config.Content_Comment_Game;
      // const confirmationVisible = await this.page.locator('div').filter({ hasText: new RegExp(^a few seconds ago ${gameText}$) }).first().isVisible({ timeout: 5000 }).catch(() => false);
    
    } else if (alreadyReviewed) {
      console.log("The game has already been reviewed.");      
    } else {
      console.error("Feedback submission failed or unexpected state.");
    }

    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();
    await this.page.locator("(//span[@class='whitespace-nowrap font-semibold'])[1]").click();
    await this.page.getByRole('button', { name: 'Earn More' }).click();

    const pointTextBeforeClaim = await pointsLocator.innerText();
    const pointsBeforeClaim = this.convertToPoints(pointTextBeforeClaim);
    console.log(`Current Points before claim: ${pointsBeforeClaim}`);

    if (await claimButtonLocator.count() > 0) {
      await claimButtonLocator.click();

      const pointTextAfterClaim = await pointsLocator.innerText();
      const pointsAfterClaim = this.convertToPoints(pointTextAfterClaim);
      console.log(`Current Points after claim: ${pointsAfterClaim}`);
      
      if (pointsAfterClaim === pointsBeforeClaim + 20) {
        console.log("Points increased by 20 after claiming!");
      } else {
        console.log("Points did not increase as expected.");
      }
    } else if (await completedImageLocator.count() > 0) {
      console.log("Claim already completed, skipping...");
    } else {
      console.log("No relevant elements found.");
    }

    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();

  } catch (error) {
    console.error('Error during AppReviewer task:', error);
  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async AppSharer() {
  try {
    const searchPlaceholder = this.page.getByPlaceholder('Search for your favorite apps').first();
    const claimButtonLocator = this.page.locator('button:has-text("Claim")');
    const completedImageLocator = this.page.locator('img[alt="Complete"]');
    const pointsLocator = this.page.locator("(//p[@class='text-[28px] font-bold text-[#111111] md:text-3xl'])");

    await searchPlaceholder.click();
    await searchPlaceholder.fill(config.Search_Query_4);
    await this.page.getByRole('banner').getByRole('link', { name: config.Search_Query_Data_4 }).click();
    await this.page.waitForLoadState('networkidle');

    await this.page.getByRole('button', { name: 'Share' }).click();
    await this.page.waitForTimeout(1000); 

    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();
    await this.page.locator("(//span[@class='whitespace-nowrap font-semibold'])[1]").click();
    await this.page.getByRole('button', { name: 'Earn More' }).click();

    const pointTextBeforeClaim = await pointsLocator.innerText();
    const pointsBeforeClaim = this.convertToPoints(pointTextBeforeClaim);
    console.log(`Current Points before claim: ${pointsBeforeClaim}`);

    if (await claimButtonLocator.count() > 0) {
      await claimButtonLocator.click();

      const pointTextAfterClaim = await pointsLocator.innerText();
      const pointsAfterClaim = this.convertToPoints(pointTextAfterClaim);
      console.log(`Current Points after claim: ${pointsAfterClaim}`);

      if (pointsAfterClaim === pointsBeforeClaim + 20) {
        console.log("Points increased by 20 after claiming!");
      } else {
        console.log("Points did not increase as expected.");
      }
    } else if (await completedImageLocator.count() > 0) {
      console.log("Claim already completed, skipping...");
    } else {
      console.log("No relevant elements found.");
    }

    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();

  } catch (error) {
    console.error('Error during AppSharer task:', error);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async changeDEX() {
  try {
    console.log('Clicking on the DEX button...');
    await this.page.getByRole('button', { name: 'DEX' }).click();
    
    console.log('Clicking on the first link in the list...');
    await this.page.locator('a').first().click();

    console.log('DEX change action completed successfully.');

  } catch (error) {
    console.error('Error during changeDEX:', error);
    throw error; // Re-throwing the error if you want the calling function to handle it too
  }
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async CalculatePoints() {
    try {
      // Lấy giá trị summaryPoint từ phần tử HTML
      const summaryElement = this.page.locator('span.font-bold.leading-none.text-black');
      await summaryElement.waitFor({ state: 'visible' });
    
      // Sử dụng evaluate để lấy giá trị văn bản từ phần tử
      const summaryPoint = await summaryElement.evaluate(el => {
        const text = el.textContent.trim();
        return parseInt(text, 10);
      });
    
      // Nhấp vào liên kết với tên tương ứng và đợi tải trang
      await this.page.getByRole('link', { name: `TONGRAM ${summaryPoint}` }).click();
      await this.page.waitForLoadState('networkidle');
    
      // Nhấp vào nút Engagement và lấy giá trị của biến engagement
      await this.page.getByRole('button', { name: 'Engagement' }).click();
      const engagementElement = this.page.locator('div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600');
      await engagementElement.waitFor({ state: 'visible' });
      const engagement = await engagementElement.evaluate(el => parseInt(el.textContent.trim(), 10));
    
      // Nhấp vào nút Review và lấy giá trị của biến review
      await this.page.getByRole('button', { name: 'Review' }).click();
      const reviewElement = this.page.locator('div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600');
      await reviewElement.waitFor({ state: 'visible' });
      const review = await reviewElement.evaluate(el => parseInt(el.textContent.trim(), 10));
    
      // Nhấp vào nút Share và lấy giá trị của biến share
      await this.page.getByRole('button', { name: 'Share' }).click();
      const shareElement = this.page.locator('div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600');
      await shareElement.waitFor({ state: 'visible' });
      const share = await shareElement.evaluate(el => parseInt(el.textContent.trim(), 10));
    
      // Tính tổng và in ra log
      const total = engagement + review + share;
      console.log(`Engagement: ${engagement}`);
      console.log(`Review: ${review}`);
      console.log(`Share: ${share}`);
      console.log(`Total: ${total}`);
  
      // So sánh tổng với giá trị summaryPoint
      if (total === summaryPoint) {
        console.log(`The total value matches ${summaryPoint}`);
      } else {
        console.log(`The total value does not match ${summaryPoint}`);
      }
    } catch (error) {
      console.error('Error during verification and calculation:', error);
    }
  }
  

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async searchGame() {
    try {
      await this.page.getByPlaceholder('Search', { exact: true }).click();
      await this.page.getByPlaceholder('Search', { exact: true }).fill(config.Search_Query);
      await this.page.getByPlaceholder('Search', { exact: true }).press('Enter');
      await this.page.getByRole('banner').getByRole('link', { name: config.Search_Query_Data_1 }).click();
      await expect(this.page.getByRole('heading', { name: config.Verify_Search_Query_1 })).toBeVisible();
  
    } catch (error) {
      console.error('Error during search:', error);
    }
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async openGame() {
    try {
      await this.page.getByRole('link', { name: 'Tongram Logo' }).click();
      // Đi đến mục game
      await this.page.getByRole('main').getByRole('link', { name: 'Games Games' }).click();
      await this.page.waitForLoadState('networkidle');
      
      // Click vào game
      await this.page.getByRole('link', { name: config.Search_Query_Data_6 }).click();
      await this.page.waitForLoadState('networkidle');
      
      // Click on the button in the section with specific text
      await this.page.locator('section').filter({ hasText: config.Click_Open_Game_6 }).getByRole('button').first().click();
      await this.page.waitForLoadState('networkidle');
      
      // Sleep for 2 seconds to allow observation
      await page.waitForTimeout(2000);
      
      // Xác định và click vào nút "Launch" hoặc "Launch +"
      const launchPlusButton = this.page.locator('button:has-text("Launch +")');
      const launchButton = this.page.locator('button:has-text("Launch")');

      // Lấy giá trị hiện tại của point
      let point = await this.page.textContent('font-bold leading-none text-black lg:text-xl');
      point = parseInt(point, 10);

      if (await launchPlusButton.count() > 0) {
        // Click vào "Launch + 10" và kiểm tra point tăng
        await launchPlusButton.click();
        const newPoint = await this.page.textContent('font-bold leading-none text-black lg:text-xl');
        expect(parseInt(newPoint, 10)).toBe(point + 10);
      } else if (await launchButton.count() > 0) {
        // Click vào "Launch" và kiểm tra point không thay đổi
        await launchButton.click();
        const newPoint = await this.page.textContent('font-bold leading-none text-black lg:text-xl');
        expect(parseInt(newPoint, 10)).toBe(point);
      } else {
        throw new Error('Không tìm thấy nút "Launch" hoặc "Launch +".');
      }
    } catch (error) {
      console.error('Error during actions:', error);
    } 
    await this.page.getByRole('button', { name: 'Cancel' }).nth(1).click();
    await this.page.waitForLoadState('networkidle');
  }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async shareGame() {
    try {
      // Navigate to the main page
      await this.page.getByRole('link', { name: 'Tongram Logo' }).click();
      
      // Go to the game section
      await this.page.getByRole('main').getByRole('link', { name: 'Games Games' }).click();
      
      // Wait for the page to load completely
      await this.page.waitForLoadState('networkidle');
  
      // Ensure the game link is visible before clicking
      const gameLink = await this.page.getByRole('link', { name: config.Click_Share_Game });
      await gameLink.waitFor({ state: 'visible' });
      console.log('Game link is visible.');
  
      // Click on the game link
      await gameLink.click();
  
      // Wait for the game page to load if necessary
      await this.page.waitForLoadState('networkidle');
  
      // Ensure the Share button is visible before clicking
      const shareButton = await this.page.getByRole('button', { name: 'Share' });
      await shareButton.waitFor({ state: 'visible' });
      console.log('Share button is visible.');
  
      // Click on the Share button
      await shareButton.click();
  
      // Sleep for 2 seconds to allow observation
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.error('Error during Share Game actions:', error);
    }
  }
  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async commentGame() {
    try {
      // Đi đến mục game
      await this.page.getByRole('main').getByRole('link', { name: 'Games Games' }).click();
      await this.page.waitForLoadState('networkidle');
      
      // Click vào game
      await this.page.getByRole('link', { name: config.Comment_Game }).click();
      await this.page.waitForLoadState('networkidle');
      
      // Click on the button in the section with specific text
      await this.page.locator('//div[contains(@class, "flex")]/*[local-name() = "svg"][5]/*[local-name() = "path"]').first().click();
      // await this.page.getByPlaceholder('What is on your mind?').click();
      // await this.page.locator('div').filter({ hasText: /^\(0\/1000\)$/ }).click();
      await this.page.getByPlaceholder('What is on your mind?').fill(config.Content_Comment_Game);
      await this.page.getByRole('button', { name: 'Submit', exact: true }).click();

      const gameText = config.Content_Comment_Game;
      await expect(locator('div').filter({ hasText: new RegExp(`^a few seconds ago${gameText}$`) }).first()).toBeVisible();

      await expect(this.page.getByText(config.Content_Comment_Game)).toBeVisible();
      
      // Sleep for 2 seconds to allow observation
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.error('Error during Share Game actions:', error);
    }
  }
}

export default TGHomePage;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////