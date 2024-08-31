import fs from 'fs';
import { config } from '../../Utils/BS_config'; // Đảm bảo đường dẫn chính xác

export class ActionsPage {
  constructor(browser) {
    this.browser = browser;
  }

  async openWithSavedCookies() {
    try {
      // Đọc cookie từ file
      const cookiesFilePath = config.cookiesFilePath; // Đảm bảo biến cấu hình là chính xác
      if (!fs.existsSync(cookiesFilePath)) {
        throw new Error(`Cookie file does not exist at path: ${cookiesFilePath}`);
      }
      const cookies = JSON.parse(fs.readFileSync(cookiesFilePath, 'utf-8'));

      // Tạo một context mới và thiết lập cookie
      this.context = await this.browser.newContext();
      await this.context.addCookies(cookies);

      // Mở một trang mới với context đã có cookie
      this.page = await this.context.newPage();

      // Điều hướng đến trang GPT
      await this.page.goto(config.gptUrl);
    } catch (error) {
      console.error('Failed to open with saved cookies:', error);
    }
  }

  async sendMessage(message) {
    try {
      // Tương tác với trang
      await this.page.locator('form div').first().click();
      await this.page.waitForTimeout(10000); // Thời gian chờ có thể điều chỉnh tùy thuộc vào ứng dụng
      await this.page.getByPlaceholder('Type something...').fill(message);
      await this.page.locator('form').getByRole('button').click();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }
}
