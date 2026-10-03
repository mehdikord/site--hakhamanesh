import { test, expect } from '@playwright/test';
import { properties } from '../../src/data/properties';
import { articles } from '../../src/data/articles';
import { filterProperties, defaultFilters } from '../../src/lib/search';

test.beforeEach(async ({ page }) => {
  // An external map is not part of the site's responsive layout or build.
  await page.route('https://www.google.com/**', (route) =>
    route.fulfill({
      status: 200,
      contentType: 'text/html',
      body: '<html lang="fa"><body></body></html>',
    }),
  );
});
const routes = [
  '/',
  '/properties',
  '/search?deal=sale&budget=35',
  '/properties/hx-1042',
  '/properties/hx-1019',
  '/blog',
  '/blog/buying-apartment-north-tehran-1405',
  '/about',
  '/contact',
  '/terms',
  '/favorites',
];
for (const width of [320, 360, 390, 480, 640, 768, 1024, 1280, 1440, 1920]) {
  test(`responsive routes at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('#preloader')).toHaveClass('hide');
      const overflow = await page.evaluate(() => {
        // Ignore the intentionally clipped marquee, fixed overlays, and animated image zoom.
        return [...document.querySelectorAll<HTMLElement>('main *, #header *, footer *')]
          .filter((el) => {
            if (
              el.closest('.marquee-track') ||
              el.tagName === 'IMG' ||
              el.tagName === 'SVG' ||
              el.closest('svg')
            )
              return false;
            const r = el.getBoundingClientRect();
            if (!r.width || !r.height) return false;
            return r.left < -1 || r.right > innerWidth + 1;
          })
          .map(
            (el) =>
              `${el.tagName}#${el.id}.${String(el.className)}: ${Math.round(el.getBoundingClientRect().left)} / ${Math.round(el.getBoundingClientRect().right)}`,
          );
      });
      expect(overflow, `${width}: ${route}`).toEqual([]);
      const rootOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      );
      expect(rootOverflow, `root width ${width}: ${route}`).toBe(false);
    }
    expect(errors).toEqual([]);
  });
}
test('all 20 details are independent, refreshable pages with real metadata', async ({ page }) => {
  for (const p of properties) {
    await page.goto('/properties/' + p.code.toLowerCase());
    await expect(page.locator('h1')).toHaveText(p.title);
    await expect(page).toHaveTitle(new RegExp(p.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  for (const b of articles) {
    await page.goto('/blog/' + b.slug);
    await expect(page.locator('h1')).toHaveText(b.title);
  }
  await page.reload();
  await expect(page.locator('h1')).toHaveText(articles.at(-1)!.title);
});
test('home search, persistent price filter, sort, direct refresh and back', async ({ page }) => {
  await page.goto('/');
  await page.locator('#heroPrice').selectOption('35');
  await page.locator('#heroSearchBtn').click();
  await expect(page).toHaveURL(/\/search\?.*budget=35/);
  const expected = filterProperties(properties, { ...defaultFilters, deal: 'sale', budget: '35' });
  await expect(page.locator('#listGrid article')).toHaveCount(expected.length);
  await page.locator('#sortSelect').selectOption('cheap');
  await page.reload();
  await expect(page.locator('#sortSelect')).toHaveValue('cheap');
  await expect(page.locator('#activeChips')).toContainText('۳۵');
  await page.locator('#filterType').selectOption('apartment');
  const count = filterProperties(properties, {
    ...defaultFilters,
    deal: 'sale',
    budget: '35',
    type: 'apartment',
  }).length;
  await expect(page.locator('#listGrid article')).toHaveCount(count);
  await page
    .locator('#listGrid article')
    .first()
    .getByRole('link', { name: 'جزئیات', exact: true })
    .click();
  await expect(page).toHaveURL(/\/properties\/hx-/);
  await page.goBack();
  await expect(page.locator('#filterType')).toHaveValue('apartment');
  await expect(page.locator('#activeChips')).toContainText('۳۵');
  await page.locator('#resetFilters').click();
  await expect(page.locator('#listGrid article')).toHaveCount(9);
  await page.locator('#loadMoreBtn').click();
  await expect(page.locator('#listGrid article')).toHaveCount(14);
});
test('Persian code search, no-results, amenities, rooms and featured filters', async ({ page }) => {
  await page.goto('/search');
  await expect(page.locator('#preloader')).toHaveClass('hide');
  await page.locator('#searchInput').fill('hx-۱۰۴۲');
  await expect(page.locator('#listGrid article')).toHaveCount(1);
  await page.locator('#searchInput').fill('ناموجود');
  await expect(page.locator('#emptyState')).toBeVisible();
  await page.locator('#resetFilters').click();
  await page.locator('#roomSeg').getByRole('button', { name: '۴+', exact: true }).click();
  await page.locator('#onlyFeatured').check();
  await page.locator('#amenWrap').getByRole('button', { name: 'استخر', exact: true }).click();
  const expected = filterProperties(properties, {
    ...defaultFilters,
    rooms: '4',
    onlyFeatured: true,
    amen: ['استخر'],
  });
  await expect(page.locator('#listGrid article')).toHaveCount(expected.length);
  await page.reload();
  await expect(page.locator('#onlyFeatured')).toBeChecked();
  await expect(
    page.locator('#amenWrap').getByRole('button', { name: 'استخر', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true');
});
test('favorites persist, synchronize across pages and are removable', async ({ page }) => {
  await page.goto('/properties/hx-1042');
  await page.getByRole('button', { name: 'افزودن به علاقه‌مندی‌ها', exact: true }).first().click();
  await expect(page.locator('#favCount')).toHaveText('۱');
  await page.goto('/favorites');
  await expect(page.locator('#favGrid article')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('#favGrid article')).toHaveCount(1);
  await page
    .locator('#favGrid')
    .getByRole('button', { name: 'حذف از علاقه‌مندی‌ها', exact: true })
    .click();
  await expect(page.locator('#favEmpty')).toBeVisible();
  await expect(page.locator('#favCount')).toHaveText('۰');
});
test('invalid local storage does not crash the app', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('hx_favs', 'not json'));
  await page.goto('/favorites');
  await expect(page.locator('#favEmpty')).toBeVisible();
  await expect(page.locator('#favCount')).toHaveText('۰');
});
test('gallery changes main image; dialog traps focus, closes on Escape and restores focus', async ({
  page,
}) => {
  await page.goto('/properties/hx-1042');
  await page.locator('#propThumbs button').nth(1).click();
  await expect(page.locator('#propGalleryMain')).toHaveAttribute('src', properties[0].images[1]);
  const trigger = page.getByRole('button', { name: 'بزرگ‌نمایی تصویر ملک' });
  await trigger.click();
  await expect(page.locator('#lightbox img')).toHaveAttribute('src', properties[0].images[1]);
  await page.keyboard.press('Tab');
  expect(await page.evaluate(() => !!document.activeElement?.closest('#lightbox'))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(page.locator('#lightbox')).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
test('mobile drawer navigation and consultation keyboard behavior', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto('/');
  await page.getByRole('button', { name: 'باز کردن منو' }).click();
  await expect(page.locator('#mobileDrawer')).toBeVisible();
  await page.locator('#mobileDrawer').getByRole('link', { name: 'املاک', exact: true }).click();
  await expect(page).toHaveURL('/properties');
  await expect(page.locator('#mobileDrawer')).toHaveCount(0);
  await page.getByRole('button', { name: 'باز کردن منو' }).click();
  await page.locator('#mobileDrawer').getByRole('button', { name: 'رزرو مشاوره رایگان' }).click();
  await expect(page.locator('#consultModal')).toBeVisible();
  await expect(page.locator('#qName')).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(
    page.locator('#consultModal').getByRole('button', { name: 'بستن', exact: true }),
  ).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(page.locator('#consultModal')).toHaveCount(0);
});
test('blog category, search and detail navigation preserve query state', async ({ page }) => {
  await page.goto('/blog');
  await expect(page.locator('#blogGrid article')).toHaveCount(6);
  await page.locator('#blogCats').getByRole('button', { name: 'حقوق ملکی', exact: true }).click();
  await expect(page.locator('#blogGrid article')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('#blogGrid article')).toHaveCount(1);
  await page.locator('#blogGrid a').click();
  await expect(page).toHaveURL('/blog/property-contract-legal-traps');
  await page.goBack();
  await expect(
    page.locator('#blogCats').getByRole('button', { name: 'حقوق ملکی', exact: true }),
  ).toHaveAttribute('aria-pressed', 'true');
  await page.locator('#blogSearch').fill('ناموجود');
  await expect(page.locator('#blogGrid')).toContainText('مقاله‌ای یافت نشد');
});
test('calculator updates and FAQ toggles', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#preloader')).toHaveClass('hide');
  await page.locator('#calcLoan').scrollIntoViewIfNeeded();
  await page.locator('#calcLoan').fill('5000');
  await expect(page.locator('#loanVal')).toContainText('۵ میلیارد');
  await expect(page.locator('#calcResult')).not.toHaveText('۶۰٬۲۷۴٬۰۰۰ تومان');
  await page.goto('/contact');
  const q = page.locator('#faqWrap button').nth(1);
  await expect(q).toHaveAttribute('aria-expanded', 'false');
  await q.click();
  await expect(q).toHaveAttribute('aria-expanded', 'true');
});
test('unknown property / article use the branded not-found page', async ({ page }) => {
  for (const path of ['/properties/not-real', '/blog/not-real', '/missing-route']) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.locator('h1')).toHaveText('صفحه مورد نظر یافت نشد');
  }
});
test('content is server-rendered with JavaScript disabled', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://localhost:3000/properties/hx-1042');
  await expect(page.locator('h1')).toHaveText(properties[0].title);
  await expect(page.locator('#preloader')).toBeHidden();
  await page.goto('http://localhost:3000/blog/buying-apartment-north-tehran-1405');
  await expect(page.locator('article p').first()).toHaveText(articles[0].excerpt);
  await context.close();
});

test('detail return links retain the last filtered result set', async ({ page }) => {
  await page.goto('/search?deal=sale&budget=35');
  await expect(page.locator('#preloader')).toHaveClass('hide');
  await page
    .locator('#listGrid article')
    .first()
    .getByRole('link', { name: 'جزئیات', exact: true })
    .click();
  await page.getByRole('link', { name: 'بازگشت به املاک', exact: true }).click();
  await expect(page).toHaveURL(/\/search\?deal=sale&budget=35/);
  await expect(page.locator('#activeChips')).toContainText('۳۵');
  await page.goto('/blog?category=' + encodeURIComponent('حقوق ملکی'));
  await page.locator('#blogGrid a').first().click();
  await page.getByRole('link', { name: 'بازگشت به مجله', exact: true }).click();
  await expect(page.locator('#blogGrid article')).toHaveCount(1);
});

test('share copies a real, independently loadable detail URL', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/properties/hx-1042');
  await page.getByRole('button', { name: 'اشتراک', exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'http://localhost:3000/properties/hx-1042',
  );
  await page.goto('/blog/buying-apartment-north-tehran-1405');
  await page.getByRole('button', { name: 'اشتراک', exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'http://localhost:3000/blog/buying-apartment-north-tehran-1405',
  );
});
