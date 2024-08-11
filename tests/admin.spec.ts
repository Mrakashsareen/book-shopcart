import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  expect(await page.title()).toBe('React App');
  await page.getByText('Spring Boot in ActionAuthor: William binGenre: Tech39.99BuyHTML').click();
  await page.getByPlaceholder('Search by title').click();
await page.getByPlaceholder('Search by title').fill('Clean');
await page.getByRole('button', { name: 'Search' }).click();
expect(page.getByRole('button', { name: 'Search' })).toContainText('Search');
expect(page.locator('div').filter({ hasText: /^Clean CodeAuthor: Martin cleanGenre: Tech45Buy$/ })).toHaveCount(1);
await page.getByPlaceholder('Search by title').click();
await page.getByPlaceholder('Search by title').fill('');
await page.getByRole('button', { name: 'Search' }).click();
await page.locator('div').filter({ hasText: /^HTML MastercodeAuthor: Tech masterGenre: Tech49\.99Buy$/ }).getByRole('button').click();
});
