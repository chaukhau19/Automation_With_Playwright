import { test } from '@playwright/test';
import { ActionsPage } from '../../Pages/Busai/BS_Actions'; // Đảm bảo đường dẫn chính xác
import { config } from '../../Utils/BS_config'; // Đảm bảo đường dẫn chính xác

test('Chat with GPT using saved cookies', async ({ browser }) => {
  const chatPage = new ActionsPage(browser);

  await chatPage.openWithSavedCookies();
  await chatPage.sendMessage(config.message); // Đảm bảo 'message' được định nghĩa trong config
});
