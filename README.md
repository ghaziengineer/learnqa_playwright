# 🎯LearnaQa Platform – UI & E2E Tests with Playwright, TypeScript & Cucumber

## Overview 📝
This project contains **end-to-end (E2E)** 🚀 and **UI 🎨 automation tests** for the **Learna QA Automation Platform** 🌐https://www.learnaqa.info/  
It is designed to help practice **real-world automation scenarios** 🧪  
**The tests are built with:**
- ⚡ **Playwright** – Fast and reliable end-to-end testing framework by Microsoft

- 🧩 **Cucumber (Gherkin)** – Behavior-driven testing for readable scenarios

- 💻 **TypeScript** – Type-safe programming language for robust automation

## Project Structure 📂
```
.
├───.github
│   └───workflows
├───cypress
│   ├───e2e
│   │   └───features
│   │       ├───homepage.feautre
│   │       ├───logout.feautre
│   │       ├───dragAndDrop.feautre
│   │       ├───fileOperations.feautre
│   │       ├───footerLinks.feautre
│   │       ├───dynamicElements.feautre
│   │       └───signin.feautre
│   ├───fixtures
│   │   ├───template_data.xlsx
│   │   └───testData.json
│   ├───screenshots
│   └───support
│   │   └───pages
│   │       ├───HomePage.ts
│   │       ├───FooterPage.ts
│   │       ├───FileOperationsPage.ts
│   │       ├───DynamicElements.ts
│   │       ├───DragAndDropPage.ts
│   │       └───SignInPage.ts
│   │   └───step_definitions
│   │       ├───commonSteps.ts
│   │       ├───dragAndDropSteps.ts
│   │       ├───dynamicElementsSteps.ts
│   │       ├───footerLinksSteps.ts
│   │       ├───fileOperationsSteps.ts
│   │       ├───homepageSteps.ts
│   │       ├───homepageSteps.ts
│   │       └───hooks.js
├───playwright.config.js
├───cucumber.json
├───package.json
├───.gitignore
└── README.md
```
## Getting Started 🚀
**1.** Clone the repository:
```bash
git clone https://github.com/ghaziengineer/learnqa_playwright.git
```
**2.** Install dependencies:
```bash
npm install
```
**3.** Run tests:
```bash
npx cypress open
```
## ⚠️ Important Notes
- ⚙️ **Environment Setup** – Ensure Node.js and Cypress are properly installed before running any test.  
- 🏷️ **Tag Management** – Use tags (like @ui, @e2e, @valid etc...) 👉 to easily filter and run specific scenarios with commands such as:  
```bash
npx cucumber-js --tags "@ui"
```

![Profile view counter on GitHub](https://komarev.com/ghpvc/?username=ghaziengineer)

