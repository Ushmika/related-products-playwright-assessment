# eBay Wallet Product Page - Playwright Automation

##  Project Description
This project automates the testing of the "Related Best Seller Products" section on eBay's Wallet product detail page using Playwright and JavaScript.

##  Features Tested
- Display of main product details
- Visibility and count of related best sellers (max 6)
- Validation of category match
- Navigation functionality of related products

##  Prerequisites
- Node.js installed
- Playwright installed via npm

##  Setup Instructions
```bash
npm install
npx playwright install
```

##  Running Tests
```bash
npx playwright test
```

##  Folder Structure
```
related-products-playwright/
├── config/
│   └── playwright.config.js
├── tests/
│   └── relatedProducts.spec.js
├── pages/
│   └── ProductPage.js
...



## Reports
To view HTML test report:
```bash
npx playwright show-report
```

## 🔗 GitHub
Push this project to GitHub and share the repo link with the interviewer.
*/
