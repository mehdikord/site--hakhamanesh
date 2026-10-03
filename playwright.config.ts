import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  // One worker also keeps software-rendered WebKit stable on a small Linux VM.
  workers: 1,
  timeout: 120_000,
  expect: { timeout: 8_000 },
  reporter: [['list'], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    baseURL: process.env.TEST_BASE_URL || 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: '**/cross-browser.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      testMatch: '**/cross-browser.spec.ts',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      testMatch: '**/cross-browser.spec.ts',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  // The production server is started separately: npm run build && npm start.
});
