import { test, expect } from '@playwright/test';
import fs from 'fs';


test.describe('Tongram Actions 1', () => {
  test('Login with Telegram and Perform Actions', async ({ browser }) => {
    let page;

    await test.step('Login with Telegram', async () => {
      try {
        const cookies = JSON.parse(fs.readFileSync('./Cookies/cookies_tongram.json', 'utf-8'));
        const context = await browser.newContext();
        await context.addCookies(cookies);
        page = await context.newPage();
        await page.goto('https://tongram.app/en');
        await page.waitForLoadState('networkidle');
      } catch (error) {
        console.error('Error during login:', error);
      }
    });


    await test.step('Verify and Calculate Points', async () => {
      try {
        // Lấy giá trị summaryPoint từ phần tử HTML
        const summaryElement = page.locator('span.font-bold.leading-none.text-black');
        await summaryElement.waitFor({ state: 'visible' });
    
        // Sử dụng evaluate để lấy giá trị văn bản từ phần tử
        const summaryPoint = await summaryElement.evaluate(el => {
          const text = el.textContent.trim();
          return parseInt(text, 10);
        });
    
        await page.getByRole('link', { name: `TONGRAM ${summaryPoint}` }).click();
    
        // Nhấp vào nút Engagement và lấy giá trị của biến engagement
        await page.getByRole('button', { name: 'Engagement' }).click();
        const engagementElement = page.locator('div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600');
        await engagementElement.waitFor({ state: 'visible' });
        const engagement = await engagementElement.evaluate(el => parseInt(el.textContent.trim(), 10));
        
        // Nhấp vào nút Review và lấy giá trị của biến review
        await page.getByRole('button', { name: 'Review' }).click();
        const reviewElement = page.locator('div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600');
        await reviewElement.waitFor({ state: 'visible' });
        const review = await reviewElement.evaluate(el => parseInt(el.textContent.trim(), 10));
        
        // Nhấp vào nút Share và lấy giá trị của biến share
        await page.getByRole('button', { name: 'Share' }).click();
        const shareElement = page.locator('div.flex.items-center.justify-between.text-lg p:has-text("Last one month") + p span.text-primary-600');
        await shareElement.waitFor({ state: 'visible' });
        const share = await shareElement.evaluate(el => parseInt(el.textContent.trim(), 10));
        
        // Tính tổng và in ra log
        const total = engagement + review + share;
        console.log(`Engagement: ${engagement}`);
        console.log(`Review: ${review}`);
        console.log(`Share: ${share}`);
        console.log(`Total: ${total}`);

        // So sánh tổng với giá trị summaryPoint
        const x = summaryPoint; // Sử dụng giá trị summaryPoint cho biến x
        if (total === x) {
          console.log(`The total value matches ${summaryPoint}`);
        } else {
          console.log(`The total value does not match ${summaryPoint}`);
        }
      } catch (error) {
        console.error('Error during verification and calculation:', error);
      }
    });
    
    
    await test.step('Verify Point', async () => {
      try {
        // Lấy giá trị x từ phần tử HTML
        const pointElement = page.locator('span.font-bold.leading-none.text-black');
        const pointText = await pointElement.innerText();
        const x = parseInt(pointText.trim(), 10); // Chuyển đổi giá trị thành số
    
        // Nhấp chuột vào liên kết 'TONGRAM {x}'
        await page.getByRole('link', { name: `TONGRAM ${x}` }).click();
    
        // Xác minh rằng liên kết 'TONGRAM {x}' hiển thị
        const linkVisible = await page.getByRole('link', { name: `TONGRAM ${x}` }).isVisible();
        await expect(page.getByRole('link', { name: `TONGRAM ${x}` })).toBeVisible();
    
        // Xác minh rằng văn bản 'Tongram{x}' hiển thị
        const textVisible = await page.getByText(`Tongram${x}`).isVisible();
        await expect(page.getByText(`Tongram${x}`)).toBeVisible();
        
        // In giá trị của linkVisible và textVisible
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
    });
    
    
    

    await test.step('Change Language', async () => {
      try {
        await page.getByRole('button', { name: 'en', exact: true }).click();
        await page.getByRole('link', { name: 'Vietnamese' }).click();

        await expect(page.getByRole('button', { name: 'Danh mục' })).toBeVisible();
        await expect(page.getByRole('main').getByRole('link', { name: 'Trò chơi Trò chơi' })).toBeVisible();
        await expect(page.getByRole('main').getByRole('link', { name: 'Sản phẩm Sản phẩm' })).toBeVisible();
        await expect(page.getByRole('main').getByRole('link', { name: 'Xã hội Xã hội' })).toBeVisible();
        await expect(page.getByRole('main').getByRole('link', { name: 'Giải trí Giải trí' })).toBeVisible();
        await expect(page.getByRole('main').getByRole('link', { name: 'Tài chính Tài chính' })).toBeVisible();
        await expect(page.getByRole('main').getByRole('link', { name: 'Giáo dục Giáo dục' })).toBeVisible();
        await expect(page.getByRole('main').getByRole('link', { name: 'Phong cách sống Phong cách số' })).toBeVisible();
        await expect(page.getByRole('main').getByRole('link', { name: 'Quản trị Quản trị' })).toBeVisible();
        await expect(page.getByText('Dành cho bạnXem thêm')).toBeVisible();
        await expect(page.getByText('MớiXem thêm')).toBeVisible();
        await expect(page.getByText('Đề xuấtXem thêm')).toBeVisible();
        await expect(page.getByText('Xu hướngXem thêm')).toBeVisible();
        await expect(page.getByText('HotXem thêm')).toBeVisible();
        await expect(page.getByText('Xếp hạng cao nhấtXem thêm')).toBeVisible();
        await expect(page.getByText('Play to EarnXem thêm')).toBeVisible();
        await expect(page.getByText('Được tài trợ nhiềuXem thêm')).toBeVisible();
        await expect(page.getByText('Danh sách được tài trợXem thêm')).toBeVisible();

        await page.getByRole('button', { name: 'vi' }).click();
        await page.getByRole('link', { name: 'Korean' }).click();

        await expect(page.getByRole('main').getByRole('link', { name: '게임 게임' })).toBeVisible();
        await expect(page.getByRole('main').getByRole('link', { name: '생산성 생산성' })).toBeVisible();
        await expect(page.getByRole('main').getByRole('link', { name: '소셜 네트워킹 소셜 네트워킹' })).toBeVisible();
        await expect(page.getByRole('main').getByRole('link', { name: '금융 금융' })).toBeVisible();
        await expect(page.getByRole('main').getByRole('link', { name: '교육 교육' })).toBeVisible();
        await expect(page.getByRole('main').getByRole('link', { name: '라이프스타일 라이프스타일' })).toBeVisible();
        await expect(page.getByRole('main').getByRole('link', { name: '관리 관리' })).toBeVisible();
        await expect(page.getByText('당신을 위해모두 보기')).toBeVisible();
        await expect(page.getByText('새로운모두 보기')).toBeVisible();
        await expect(page.getByText('추천모두 보기')).toBeVisible();
        await expect(page.getByText('트렌딩모두 보기')).toBeVisible();
        await expect(page.getByText('인기모두 보기')).toBeVisible();
        await expect(page.getByText('가장 높은 순위모두 보기')).toBeVisible();
        await expect(page.getByText('플레이하여 수익 창출모두 보기')).toBeVisible();
        await expect(page.getByText('많은 스폰서모두 보기')).toBeVisible();
        await expect(page.getByText('스폰서 목록모두 보기')).toBeVisible();

        await page.getByRole('button', { name: 'kr' }).click();
        await page.getByRole('link', { name: 'English' }).click();

      } catch (error) {
        console.error('Error during login:', error);
      }
    });
    
    await test.step('Categories', async () => {
      try {
        await page.getByRole('main').getByRole('link', { name: 'Games Games' }).click();
        await expect(page.getByText('GamesLatestHigh ratingSort')).toBeVisible();
        await page.getByRole('button', { name: 'High rating' }).click();
        await expect(page.getByRole('button', { name: 'Latest' })).toBeVisible();
        await page.getByRole('button', { name: 'Latest' }).click();
        await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
        await page.getByRole('link', { name: 'Home' }).click();
        await expect(page.getByRole('button', { name: 'Categories' })).toBeVisible();
    
        await page.getByRole('button', { name: 'Categories' }).click();
        await page.getByRole('banner').getByRole('link', { name: 'Management Management' }).click();
        await page.locator('section').filter({ hasText: 'ManagementLatestHigh' }).waitFor({ state: 'visible' });
      
      } catch (error) {
        console.error('An error occurred during the Categories step:', error);
        throw error;
      }
    });
    
    await test.step('Search Game', async () => {
      try {
        await page.getByPlaceholder('Search', { exact: true }).click();
        await page.getByPlaceholder('Search', { exact: true }).fill('PISTON');
        await page.getByPlaceholder('Search', { exact: true }).press('Enter');
        await page.getByRole('banner').getByRole('link', { name: 'PISTON Hub PISTON Hub PISTON' }).click();
        await expect(page.getByRole('heading', { name: 'PISTON Hub' })).toBeVisible();
    
      } catch (error) {
        console.error('Error during search:', error);
      }
    });

    await test.step('Open Game', async () => {
      try {
        // Đi đến mục game
        await page.getByRole('main').getByRole('link', { name: 'Games Games' }).click();
        await page.waitForLoadState('networkidle');
        
        // Click vào game
        await page.getByRole('link', { name: 'PISTON Farm PISTON Farm Tap' }).click();
        await page.waitForLoadState('networkidle');
        
        // Click on the button in the section with specific text
        await page.locator('section').filter({ hasText: 'PISTON FarmGrow your super' }).getByRole('button').first().click();
        await page.waitForLoadState('networkidle');
        
        // Sleep for 2 seconds to allow observation
        await page.waitForTimeout(2000);
        
        // Xác định và click vào nút "Launch" hoặc "Launch +"
        const launchPlusButton = page.locator('button:has-text("Launch +")');
        const launchButton = page.locator('button:has-text("Launch")');

        // Lấy giá trị hiện tại của point
        let point = await page.textContent('font-bold leading-none text-black lg:text-xl');
        point = parseInt(point, 10);

        if (await launchPlusButton.count() > 0) {
          // Click vào "Launch + 10" và kiểm tra point tăng
          await launchPlusButton.click();
          const newPoint = await page.textContent('font-bold leading-none text-black lg:text-xl');
          expect(parseInt(newPoint, 10)).toBe(point + 10);
        } else if (await launchButton.count() > 0) {
          // Click vào "Launch" và kiểm tra point không thay đổi
          await launchButton.click();
          const newPoint = await page.textContent('font-bold leading-none text-black lg:text-xl');
          expect(parseInt(newPoint, 10)).toBe(point);
        } else {
          throw new Error('Không tìm thấy nút "Launch" hoặc "Launch +".');
        }
      } catch (error) {
        console.error('Error during actions:', error);
      } 
      await page.getByRole('button', { name: 'Cancel' }).nth(1).click();
      await page.waitForLoadState('networkidle');
    });

    await test.step('Share Game', async () => {
      try {
        // Đi đến mục game
        await page.getByRole('main').getByRole('link', { name: 'Games Games' }).click();
        await page.waitForLoadState('networkidle');
        
        // Click vào game
        await page.getByRole('link', { name: 'PISTON Farm PISTON Farm Tap' }).click();
        await page.waitForLoadState('networkidle');
        
        // Click on the button in the section with specific text
        await page.getByRole('button', { name: 'Share' }).click();
        
        // Sleep for 2 seconds to allow observation
        await page.waitForTimeout(2000);
      } catch (error) {
        console.error('Error during Share Game actions:', error);
      }
    });

    await test.step('Comment Game', async () => {
      try {
        // Đi đến mục game
        await page.getByRole('main').getByRole('link', { name: 'Games Games' }).click();
        await page.waitForLoadState('networkidle');
        
        // Click vào game
        await page.getByRole('link', { name: 'PISTON Farm PISTON Farm Tap' }).click();
        await page.waitForLoadState('networkidle');
        
        // Click on the button in the section with specific text
        await page.locator('.flex > svg:nth-child(5) > path').first().click();
        await page.locator('div').filter({ hasText: /^\(0\/1000\)$/ }).click();
        await page.getByPlaceholder('What is on your mind?').fill('Good Game');
        await page.getByRole('button', { name: 'Submit', exact: true }).click();

        await expect(locator('div').filter({ hasText: /^a few seconds agoGood Game$/ }).first()).toBeVisible();
        await expect(page.getByText('Good Game')).toBeVisible();
        
        // Sleep for 2 seconds to allow observation
        await page.waitForTimeout(2000);
      } catch (error) {
        console.error('Error during Share Game actions:', error);
      }
    });
  });
});