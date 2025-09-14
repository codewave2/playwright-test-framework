import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  workers: 3,
  timeout: 60_000,
  use: {
    headless: true,
    viewport: { width: 1920, height: 1080 },
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
    trace: 'retain-on-failure',
  },
  projects: [
    // Local Development - chromium only
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },

    // CI - safari, mobile ios/android, tablet
    ...(process.env.CI
      ? [
          {
            name: 'webkit',
            use: { browserName: 'webkit' as const },
          },
          {
            name: 'mobile-chrome-android',
            use: {
              ...devices['Pixel 7'],
            },
          },
          {
            name: 'mobile-safari-ios',
            use: {
              ...devices['iPhone 14'],
            },
          },
          {
            name: 'tablet-safari',
            use: {
              ...devices['iPad Pro 11'],
            },
          },
        ]
      : []),
  ],
  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: 'playwright-report',
        open: 'never',
        printSteps: true,
      },
    ],
  ],
  fullyParallel: true,
  testDir: './tests',
});
