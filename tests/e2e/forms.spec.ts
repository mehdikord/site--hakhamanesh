import { test, expect } from '@playwright/test';
test.describe.configure({ mode: 'serial' });
test.beforeEach(async ({ page }) => {
  await page.route('https://www.google.com/**', (route) =>
    route.fulfill({ status: 200, contentType: 'text/html', body: '' }),
  );
});
test('API rejects bad requests and cross-origin submissions', async ({ request }) => {
  const bad = await request.post('/api/requests', { data: { kind: 'newsletter', email: 'bad' } });
  expect(bad.status()).toBe(400);
  const consent = await request.post('/api/requests', {
    data: {
      kind: 'contact',
      name: 'کاربر آزمون',
      phone: '09123456789',
      subject: 'خرید',
      budget: '۲۰',
      agree: false,
    },
  });
  expect(consent.status()).toBe(400);
  const cross = await request.post('/api/requests', {
    headers: { origin: 'https://untrusted.example' },
    data: { kind: 'newsletter', email: 'test@example.com' },
  });
  expect(cross.status()).toBe(403);
  const huge = await request.post('/api/requests', { data: { message: 'a'.repeat(17000) } });
  expect(huge.status()).toBe(413);
});
test('contact form stores a real request with Persian mobile digits', async ({ page }) => {
  await page.goto('/contact');
  await page.locator('#cName').fill('کاربر آزمون');
  await page.locator('#cPhone').fill('۰۹۱۲۳۴۵۶۷۸۹');
  await page.locator('#cMsg').fill('درخواست آزمایشی؛ داده واقعی مشتری نیست.');
  await page.locator('#contactForm').getByRole('button', { name: 'ثبت و ارسال درخواست' }).click();
  await expect(page.locator('#contactSuccess')).toBeVisible();
  await expect(page.locator('#trackCode')).toHaveText(/^HX-[A-F0-9]{16}$/);
});
test('consultation validates server-side then stores its property reference', async ({ page }) => {
  await page.goto('/properties/hx-1042');
  await page.getByRole('button', { name: 'بازدید VIP', exact: true }).click();
  await page.locator('#qName').fill('کاربر آزمون');
  await page.locator('#qPhone').fill('123');
  await page.locator('#consultBody').getByRole('button', { name: 'تأیید رزرو مشاوره' }).click();
  await expect(page.locator('#consultBody [role=alert]')).toBeVisible();
  await page.locator('#qPhone').fill('09123456789');
  await page.locator('#consultBody').getByRole('button', { name: 'تأیید رزرو مشاوره' }).click();
  await expect(page.locator('#consultCode')).toHaveText(/^HX-[A-F0-9]{16}$/);
});
test('visit and newsletter forms submit to the server', async ({ page }) => {
  await page.goto('/properties/hx-1042');
  await page.locator('#visitName').fill('کاربر آزمون');
  await page.locator('#visitPhone').fill('09123456789');
  await page.locator('#visitForm').getByRole('button', { name: 'تأیید رزرو بازدید' }).click();
  await expect(page.locator('#visitForm [role=status]')).toContainText('کد پیگیری');
  await page.locator('footer input[type=email]').fill('test@example.com');
  await page.locator('footer').getByRole('button', { name: 'عضویت', exact: true }).click();
  await expect(page.locator('#toastWrap')).toContainText('درخواست عضویت');
});
test('server error does not display fake success or discard entered data', async ({ page }) => {
  await page.route('**/api/requests', (route) =>
    route.fulfill({
      status: 503,
      contentType: 'application/json',
      body: JSON.stringify({ error: 'ثبت درخواست فعلاً در دسترس نیست.' }),
    }),
  );
  await page.goto('/contact');
  await page.locator('#cName').fill('کاربر آزمون');
  await page.locator('#cPhone').fill('09123456789');
  await page.locator('#contactForm').getByRole('button', { name: 'ثبت و ارسال درخواست' }).click();
  await expect(page.locator('#contactForm [role=alert]')).toBeVisible();
  await expect(page.locator('#contactSuccess')).toHaveCount(0);
  await expect(page.locator('#cName')).toHaveValue('کاربر آزمون');
});
