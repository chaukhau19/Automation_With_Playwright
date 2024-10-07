@REM Tongram

@REM call npx playwright test TG_Cookies.spec.js --headed --reporter=line --workers=1
call npx playwright test TG_DailyTask.spec.js --headed --reporter=line --workers=1
call npx playwright test TG_VerifyPoint.spec.js --headed --reporter=line --workers=1
call npx playwright test TG_Actions.spec.js --headed --reporter=line --workers=1
call npx playwright test TG_Languages.spec.js --headed --reporter=line --workers=1