// @ts-check
const { test } = require('@playwright/test');

test('capture full page debug screenshot', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Wait for animations
  await page.waitForTimeout(1000);

  // Capture full page
  await page.screenshot({
    path: 'tests/debug-full-page.png',
    fullPage: true
  });

  // Capture benefits section specifically
  const benefits = page.locator('#form');
  await benefits.scrollIntoViewIfNeeded();
  await page.screenshot({
    path: 'tests/debug-benefits.png'
  });
});
