import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './features',
  use: {
    baseURL: 'https://www.learnaqa.info',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});