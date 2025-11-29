import { Before, After } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

Before({ timeout: 60000 }, async function () {
  // Detect CI environment - GitHub Actions sets CI=true
  const isCI = process.env.CI === 'true';
  
  const launchOptions: any = {
    timeout: 60000
  };
  
  if (isCI) {
    // Always headless in CI
    launchOptions.headless = true;
  } else {
    // Headless based on HEADED env var locally
    launchOptions.headless = process.env.HEADED !== 'true';
    launchOptions.slowMo = process.env.HEADED === 'true' ? 500 : 0;
  }
  
  browser = await chromium.launch(launchOptions);
  context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  page = await context.newPage();
  this.page = page;
});

After(async function () {
  try {
    if (page) await page.close();
    if (context) await context.close();
    if (browser) await browser.close();
  } catch (error) {
    console.error('Error in After hook:', error);
  }
});