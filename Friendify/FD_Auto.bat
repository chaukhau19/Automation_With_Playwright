@REM Friendify AI

@REM call npx playwright test FD_Register.spec.js --headed --reporter=line --workers=1
@REM call npx playwright test FD_Login.spec.js --headed --reporter=line --workers=1
call npx playwright test FD_Actions.spec.js --headed 
