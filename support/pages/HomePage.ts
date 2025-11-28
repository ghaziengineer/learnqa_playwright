import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  
  // Element locators
  readonly title: Locator;
  readonly topSignInButton: Locator;
  readonly topSignUpButton: Locator;
  readonly middleSignInButton: Locator;
  readonly middleSignUpButton: Locator;
  readonly tryWithoutAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize locators
    this.title = page.locator('h1.text-4xl');
    this.topSignInButton = page.locator('nav').getByRole('button', { name: 'Sign In' });
    this.topSignUpButton = page.locator('nav').getByRole('button', { name: 'Sign Up' });
    this.middleSignInButton = page.locator('section:nth-child(2)').getByRole('button', { name: 'Sign In' });
    this.middleSignUpButton = page.locator('section:nth-child(2)').getByRole('button', { name: 'Sign Up' });
    this.tryWithoutAccountButton = page.locator('section:nth-child(2)').getByRole('button', { name: 'Try Without Account' });
  }

  /**
   * Navigates to the application homepage
   */
  async visit(): Promise<void> {
    await this.page.goto('https://www.learnaqa.info');
  }
}