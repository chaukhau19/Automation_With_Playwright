#!/bin/bash
# Friendify AI

# Navigate to the directory where the tests are located
# cd /d D:/Git/Automation_With_Playwright/Friendify

# Run the Playwright tests
npx playwright test FD_Register.spec.js --reporter=line --workers=1
npx playwright test FD_Login.spec.js --reporter=line --workers=1
npx playwright test FD_Actions.spec.js --reporter=line --workers=1
