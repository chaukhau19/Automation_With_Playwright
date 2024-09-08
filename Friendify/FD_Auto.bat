@REM Friendify AI
cd /d D:\Git\Automation_With_Playwright\Friendify

call npx playwright test FD_Register.spec.js --headed --reporter=line --workers=1
call npx playwright test FD_Login.spec.js --headed --reporter=line --workers=1
call npx playwright test FD_Actions.spec.js --headed --reporter=line --workers=1
