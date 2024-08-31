import { expect } from '@playwright/test';
import fs from 'fs';
import { config } from '../../Utils/TG_config.js'; // Ensure correct path

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

  async load() {
    try {
    const cookies = JSON.parse(fs.readFileSync(config.cookiesFile, 'utf-8'));
    await this.page.context().addCookies(cookies);
    await this.page.goto(config.tongramUrl);
    // await this.page.waitForLoadState('networkidle');
    console.log('Page loaded successfully.');
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

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
  

  async verifyPoint() {
    try {
      // Lấy giá trị x từ phần tử HTML
      const pointElement = this.page.locator('span.font-bold.leading-none.text-black');
      const pointText = await pointElement.innerText();
      const x = parseInt(pointText.trim(), 10); // Chuyển đổi giá trị thành số
  
      // Nhấp chuột vào liên kết 'TONGRAM {x}'
      await this.page.getByRole('link', { name: `TONGRAM ${x}` }).click();
  
      // Xác minh rằng liên kết 'TONGRAM {x}' hiển thị
      await expect(this.page.getByRole('link', { name: `TONGRAM ${x}` })).toBeVisible();
  
      // Xác minh rằng văn bản 'Tongram{x}' hiển thị
      await expect(this.page.getByText(`Tongram${x}`)).toBeVisible();
  
      // In giá trị của linkVisible và textVisible
      const linkVisible = await this.page.getByRole('link', { name: `TONGRAM ${x}` }).isVisible();
      const textVisible = await this.page.getByText(`Tongram${x}`).isVisible();
      console.log(`linkVisible: ${linkVisible}`);
      console.log(`textVisible: ${textVisible}`);
  
      // Ghi log dựa trên điều kiện
      if (linkVisible && textVisible) {
        console.log(`Both 'TONGRAM ${x}' and 'Tongram${x}' are visible as expected.`);
      } else {
        console.log(`Visibility check failed for 'TONGRAM ${x}' or 'Tongram${x}'.`);
      }
  
    } catch (error) {
      console.error('Error during verification:', error);
    }
  }
  

  async changeLanguage() {
    try {
      // Click to change language to Vietnamese
      await this.page.getByRole('button', { name: 'en', exact: true }).click();
      await this.page.getByRole('link', { name: 'Vietnamese' }).click();
  
      // Wait for the page to update or navigate
      await this.page.waitForTimeout(2000); // Adjust as necessary
  
      // Verify Vietnamese language elements
      await expect(this.page.getByRole('button', { name: 'Danh mục' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: 'Trò chơi Trò chơi' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: 'Sản phẩm Sản phẩm' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: 'Xã hội Xã hội' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: 'Giải trí Giải trí' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: 'Tài chính Tài chính' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: 'Giáo dục Giáo dục' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: 'Phong cách sống Phong cách số' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: 'Quản trị Quản trị' })).toBeVisible();
      await expect(this.page.getByText('Dành cho bạnXem thêm')).toBeVisible();
      await expect(this.page.getByText('MớiXem thêm')).toBeVisible();
      await expect(this.page.getByText('Đề xuấtXem thêm')).toBeVisible();
      await expect(this.page.getByText('Xu hướngXem thêm')).toBeVisible();
      await expect(this.page.getByText('HotXem thêm')).toBeVisible();
      await expect(this.page.getByText('Xếp hạng cao nhấtXem thêm')).toBeVisible();
      await expect(this.page.getByText('Play to EarnXem thêm')).toBeVisible();
      await expect(this.page.getByText('Được tài trợ nhiềuXem thêm')).toBeVisible();
      await expect(this.page.getByText('Danh sách được tài trợXem thêm')).toBeVisible();
  
      // Click to change language to Korean
      await this.page.getByRole('button', { name: 'vi' }).click();
      await this.page.getByRole('link', { name: 'Korean' }).click();
  
      // Wait for the page to update or navigate
      await this.page.waitForTimeout(2000); // Adjust as necessary
  
      // Verify Korean language elements
      await expect(this.page.getByRole('main').getByRole('link', { name: '게임 게임' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: '생산성 생산성' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: '소셜 네트워킹 소셜 네트워킹' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: '금융 금융' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: '교육 교육' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: '라이프스타일 라이프스타일' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: '관리 관리' })).toBeVisible();
      await expect(this.page.getByText('당신을 위해모두 보기')).toBeVisible();
      await expect(this.page.getByText('새로운모두 보기')).toBeVisible();
      await expect(this.page.getByText('추천모두 보기')).toBeVisible();
      await expect(this.page.getByText('트렌딩모두 보기')).toBeVisible();
      await expect(this.page.getByText('인기모두 보기')).toBeVisible();
      await expect(this.page.getByText('가장 높은 순위모두 보기')).toBeVisible();
      await expect(this.page.getByText('플레이하여 수익 창출모두 보기')).toBeVisible();
      await expect(this.page.getByText('많은 스폰서모두 보기')).toBeVisible();
      await expect(this.page.getByText('스폰서 목록모두 보기')).toBeVisible();
  
      // Click to revert language to English
      await this.page.getByRole('button', { name: 'kr' }).click();
      await this.page.getByRole('link', { name: 'English' }).click();
  
    } catch (error) {
      console.error('Error during language change:', error);
    }
  }


  async categories() {
    try {
      await this.page.getByRole('link', { name: 'Tongram Logo' }).click();
      await this.page.getByRole('main').getByRole('link', { name: 'Games Games' }).click();
      await expect(this.page.getByText('GamesLatestHigh ratingSort')).toBeVisible();
      await this.page.getByRole('button', { name: 'High rating' }).click();
      await expect(this.page.getByRole('button', { name: 'Latest' })).toBeVisible();
      await this.page.getByRole('button', { name: 'Latest' }).click();
      await expect(this.page.getByRole('link', { name: 'Home' })).toBeVisible();
      await this.page.getByRole('link', { name: 'Home' }).click();
      await expect(this.page.getByRole('button', { name: 'Categories' })).toBeVisible();
  
      await this.page.getByRole('button', { name: 'Categories' }).click();
      await this.page.getByRole('banner').getByRole('link', { name: 'Management Management' }).click();
      await this.page.locator('section').filter({ hasText: 'ManagementLatestHigh' }).waitFor({ state: 'visible' });
    
    } catch (error) {
      console.error('An error occurred during the Categories step:', error);
      throw error;
    }
  }

  async searchGame() {
    try {
      await this.page.getByPlaceholder('Search', { exact: true }).click();
      await this.page.getByPlaceholder('Search', { exact: true }).fill(config.Search_Query);
      await this.page.getByPlaceholder('Search', { exact: true }).press('Enter');
      await this.page.getByRole('banner').getByRole('link', { name: config.Search_Query_Data }).click();
      await expect(this.page.getByRole('heading', { name: config.Verify_Search_Query })).toBeVisible();
  
    } catch (error) {
      console.error('Error during search:', error);
    }
  }

  async openGame() {
    try {
      await this.page.getByRole('link', { name: 'Tongram Logo' }).click();
      // Đi đến mục game
      await this.page.getByRole('main').getByRole('link', { name: 'Games Games' }).click();
      await this.page.waitForLoadState('networkidle');
      
      // Click vào game
      await this.page.getByRole('link', { name: config.Click_Game_Query }).click();
      await this.page.waitForLoadState('networkidle');
      
      // Click on the button in the section with specific text
      await this.page.locator('section').filter({ hasText: config.Click_Open_Game }).getByRole('button').first().click();
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
