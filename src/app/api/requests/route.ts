import { NextRequest, NextResponse } from 'next/server';
import { requestSchema } from '@/lib/validation';
import { storeRequest } from '@/lib/request-store';
import { allowRequest } from '@/lib/rate-limit';
import { properties } from '@/data/properties';
export const runtime = 'nodejs';
const MAX_BYTES = 16_384;
const response = (body: unknown, status: number) =>
  NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  if (origin) {
    let host: string;
    try {
      host = new URL(origin).host;
    } catch {
      return response({ error: 'درخواست نامعتبر است.' }, 403);
    }
    const allowed = new Set([request.headers.get('host')]);
    if (process.env.SITE_URL) allowed.add(new URL(process.env.SITE_URL).host);
    if (process.env.TRUST_PROXY === '1')
      allowed.add(request.headers.get('x-forwarded-host')?.split(',')[0].trim() ?? '');
    if (!allowed.has(host)) return response({ error: 'مبدأ درخواست معتبر نیست.' }, 403);
  }
  if (!request.headers.get('content-type')?.includes('application/json'))
    return response({ error: 'فرمت درخواست نامعتبر است.' }, 415);
  const ip =
    process.env.TRUST_PROXY === '1'
      ? request.headers.get('x-real-ip') || 'unknown'
      : 'single-server';
  if (!allowRequest(ip))
    return response({ error: 'تعداد درخواست‌ها زیاد است؛ ده دقیقه دیگر دوباره تلاش کنید.' }, 429);
  if (Number(request.headers.get('content-length')) > MAX_BYTES)
    return response({ error: 'حجم درخواست بیش از حد مجاز است.' }, 413);
  let raw = '';
  try {
    const reader = request.body?.getReader();
    if (!reader) return response({ error: 'درخواست خالی است.' }, 400);
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > MAX_BYTES) {
        await reader.cancel();
        return response({ error: 'حجم درخواست بیش از حد مجاز است.' }, 413);
      }
      chunks.push(chunk.value);
    }
    raw = Buffer.concat(chunks).toString('utf8');
    const payload = JSON.parse(raw);
    if (payload?.website) return response({ error: 'درخواست نامعتبر است.' }, 400);
    const result = requestSchema.safeParse(payload);
    if (!result.success) return response({ error: result.error.issues[0].message }, 400);
    const propertyCode = 'propertyCode' in result.data ? result.data.propertyCode : undefined;
    if (propertyCode && !properties.some((p) => p.code === propertyCode))
      return response({ error: 'ملک مورد نظر یافت نشد.' }, 400);
    try {
      const code = await storeRequest(result.data);
      return response({ ok: true, code }, 201);
    } catch (error) {
      // Do not log personal data, request bodies or encryption keys.
      console.error(
        '[requests] Storage failed:',
        error instanceof Error ? error.message : 'unknown',
      );
      return response(
        { error: 'ثبت درخواست فعلاً در دسترس نیست. لطفاً با دفتر تماس بگیرید.' },
        503,
      );
    }
  } catch {
    return response({ error: 'درخواست قابل پردازش نیست.' }, 400);
  }
}
