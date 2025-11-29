import { Page, Locator } from '@playwright/test';

export class SignInPage {
  readonly page: Page;
  
  // Element locators
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly logoutButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;
  readonly dashboard: Locator;
  readonly userProfile: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize locators
    this.emailInput = page.locator('input[type="email"], input[name="email"], #email, input[placeholder*="email" i]');
    this.passwordInput = page.locator('input[type="password"], input[name="password"], #password, input[placeholder*="password" i]');
    this.submitButton = page.locator('button[type="submit"]');
    this.logoutButton = page.locator('button:has-text("Logout")');
    this.errorMessage = page.locator('.error, .alert-danger, .text-red-500, [data-testid*="error"]');
    this.successMessage = page.locator('.success, .alert-success');
    this.dashboard = page.locator('.dashboard, [data-testid="dashboard"], main');
    this.userProfile = page.locator('.user-profile, [data-testid="user-profile"], .profile');
  }

  /**
   * Enters credentials into the sign-in form
   */
  async enterCredentials(email: string, password: string): Promise<void> {
    await this.emailInput.clear();
    await this.passwordInput.clear();
    
    if (email && email.trim() !== '') {
      await this.emailInput.fill(email);
    }
    if (password && password.trim() !== '') {
      await this.passwordInput.fill(password);
    }
  }

  /**
   * Submits the sign-in form
   */
  async submit(): Promise<void> {
    await this.submitButton.click();
  }

  /**
   * Performs complete login flow
   */
  async login(email: string, password: string): Promise<void> {
    await this.enterCredentials(email, password);
    await this.submit();
  }
}