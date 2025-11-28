import { Before, After } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

Before({ timeout: 60000 }, async function () {
  try {
    browser = await chromium.launch({ 
      headless: true,
      timeout: 60000
    });
    context = await browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    page = await context.newPage();
    this.page = page;
  } catch (error) {
    console.error('Error in Before hook:', error);
    throw error;
  }
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