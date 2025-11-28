import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './features',
  use: {
    baseURL: 'https://www.learnaqa.info', 
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
  timeout: 60000, 
});