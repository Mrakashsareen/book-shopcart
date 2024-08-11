import { test, expect } from '@playwright/test';

test('should navigate to the React app homepage', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveTitle(/React App/);
});