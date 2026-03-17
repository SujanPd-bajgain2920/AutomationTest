import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  timeout: 60000,  // 60s per test
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    headless: true,
    trace: 'on-first-retry',
    actionTimeout: 30000,       // 30s per action
    navigationTimeout: 30000,   // 30s for page.goto
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});