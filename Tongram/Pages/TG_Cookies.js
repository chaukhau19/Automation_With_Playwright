// /Pages/Tongram/TongramPage.js
const fs = require('fs');
const path = require('path'); 
import { config } from '../Utils/TG_config';

export class TongramPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToTongram() {
    await this.page.goto(config.tongramUrl);
  }

  async logInWithTelegram() {
    const page1Promise = this.page.waitForEvent('popup');
    await this.page.getByRole('button', { name: 'Log In' }).click();
    
    const page1 = await page1Promise;
    await page1.goto(config.telegramAuthUrl);
    await page1.locator('#login-phone').fill(config.phoneNumber);
    await page1.getByRole('button', { name: 'Next' }).click();
    await this.page.waitForTimeout(10000);
  }

  async saveCookies() {
    const dir = config.cookiesDir;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const cookies = await this.page.context().cookies();  
    const filePath = path.join(dir, config.cookiesFile); 
    fs.writeFileSync(filePath, JSON.stringify(cookies, null, 2));
  }
}


  
//   async saveCookies() {
//     const dir = config.cookiesDir;
//     if (!fs.existsSync(dir)) {
//       fs.mkdirSync(dir, { recursive: true });
//     }

//     // Lấy tất cả các cookie hiện tại
//     const cookies = await this.page.context().cookies();

//     // Tính thời gian hết hạn là 365 ngày (365 ngày = 365 * 24 * 60 * 60 giây)
//     const expires = Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60;

//     // Cập nhật thời gian hết hạn của mỗi cookie
//     const updatedCookies = cookies.map(cookie => ({
//       ...cookie,
//       expires, // Gia hạn 365 ngày
//     }));

//     // Lưu cookie với thời gian hết hạn mới
//     const filePath = path.join(dir, config.cookiesFile);
//     fs.writeFileSync(filePath, JSON.stringify(updatedCookies, null, 2));
//   }
// }




// OLD COOKIES xuất cookie session hiện tại time hết hạn default 3 day
