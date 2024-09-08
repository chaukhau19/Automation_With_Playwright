#!/bin/bash
# Busai GPT

# Uncomment the following lines to run additional tests:
# npx playwright test BS_Cookies.spec.js --headed --reporter=line --workers=1
# npx playwright test BS_Music_Actions.spec.js --headed --reporter=line --workers=1

npx playwright test BS_Actions.spec.js --headed --reporter=line --workers=1
