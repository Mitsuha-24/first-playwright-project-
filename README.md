# 🎭 Playwright Practice & Test Suite

A lightweight, well-structured end-to-end (E2E) automation testing repository. This project focuses on mastering web automation, modern selector strategies, and robust assertion validation using Microsoft Playwright.

---

## 🏬 Target Application
The scripts in this repository target the **[Automation Test Store](https://automationteststore.com/)**, verifying critical e-commerce workflows including:
* **User Lifecycle:** Registration and authentication mechanics (Valid/Invalid logins).
* **Search & Navigation:** Categorized browsing paths and dynamic input keyword filtering.
* **Cart Operations:** Multi-item additions, continuous checkout validation, and dynamic quantity state updates.

---

## 📂 Project Structure
```text
├── .github/workflows/   # Automated CI/CD execution pipeline
├── tests/               # Main automated test scripts & test specs
├── .gitignore           # Excludes local reports, caches, and node_modules
├── package.json         # Project metadata, dependencies, and execution scripts
└── playwright.config.js # Centralized multi-browser Playwright execution settings
```

## 🛠️ How to Run
1. Install dependencies: `npm install`
2. Install browsers: `npx playwright install`
3. Run the tests: `npx playwright test`
4. See the UI mode: `npx playwright test --ui`
