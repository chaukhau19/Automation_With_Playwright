import { test } from '@playwright/test';
import { BusaiPage } from '../../Pages/Busai/BS_Cookies';
import { config } from '../../Utils/BS_config';

test('Cookie Busai', async ({ page }) => {
  const busaiPage = new BusaiPage(page);

  await busaiPage.navigateToBusai();
  await busaiPage.logInWithTelegram();
  await busaiPage.saveCookies();
});
