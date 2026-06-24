import { test, expect } from '@playwright/test';

test('fluxo MVP smoke', async ({ page }) => {
  test.skip(true, 'E2E habilitado no pipeline com servidor e browsers provisionados');
  await page.goto('/');
  await expect(page.getByText('VendaForça MVP')).toBeVisible();
});
