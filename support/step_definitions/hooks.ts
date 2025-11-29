import { Before, After } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

Before({ timeout: 60000 }, async function () {
  // Read headed mode from environment variable
  const headed = process.env.HEADED === 'true';
  
  browser = await chromium.launch({ 
    headless: false, // Always show browser when HEADED=true
    slowMo: 500, // Slow down by 500ms to see what's happening
    timeout: 60000
  });
  context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  page = await context.newPage();
  this.page = page;
});

After(async function () {
  try {
    if (process.env.HEADED === 'true') {
      await this.page.waitForTimeout(2000);
    }
    
    if (page) await page.close();
    if (context) await context.close();
    if (browser) await browser.close();
  } catch (error) {
    console.error('Error in After hook:', error);
  }
});