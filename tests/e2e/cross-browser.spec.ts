import { test, expect } from '@playwright/test';
// Keep engine-heavy layout checks serial within each browser project.
test.describe.configure({ mode: 'serial' });
for (const width of [390, 768, 1440]) {
  test(`cross-browser layout and interactions at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.route('https://www.google.com/**', (r) =>
      r.fulfill({ status: 200, body: '', contentType: 'text/html' }),
    );
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    for (const path of [
      '/',
      '/properties',
      '/search?budget=35',
      '/properties/hx-1042',
      '/properties/hx-1019',
      '/blog',
      '/blog/buying-apartment-north-tehran-1405',
      '/about',
      '/contact',
      '/terms',
      '/favorites',
    ]) {
      await page.goto(path);
      await expect(page.locator('h1')).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('#preloader')).toHaveClass('hide');
      const overflow = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>('main *, #header *, footer *')]
          .filter((e) => {
            if (
              e.closest('.marquee-track') ||
              e.tagName === 'IMG' ||
              e.tagName === 'SVG' ||
              e.closest('svg')
            )
              return false;
            const r = e.getBoundingClientRect();
            return r.width > 0 && r.height > 0 && (r.left < -1 || r.right > innerWidth + 1);
          })
          .map((e) => e.tagName + '.' + e.className),
      );
      expect(overflow, path).toEqual([]);
    }
    await page.goto('/search');
    await expect(page.locator('#preloader')).toHaveClass('hide');
    await page.locator('#searchInput').fill('hx-۱۰۴۲');
    await expect(page.locator('#listGrid article')).toHaveCount(1);
    await page.reload();
    await expect(page.locator('#listGrid article')).toHaveCount(1);
    await page
      .locator('#listGrid article')
      .getByRole('link', { name: 'جزئیات', exact: true })
      .click();
    await expect(page.locator('#propTitle')).toContainText('پنت‌هاوس');
    await page.locator('#propThumbs button').nth(2).click();
    await expect(page.locator('#propThumbs button').nth(2)).toHaveAttribute('aria-pressed', 'true');
    expect(errors).toEqual([]);
  });
}
