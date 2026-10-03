import 'server-only';
import { createCipheriv, randomBytes } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import type { CustomerRequest } from './validation';

export function encryptionKey() {
  const key = Buffer.from(process.env.LEADS_ENCRYPTION_KEY ?? '', 'base64');
  if (key.length !== 32)
    throw new Error(
      'LEADS_ENCRYPTION_KEY must be a base64-encoded 32-byte key. Run npm run setup.',
    );
  return key;
}
export async function storeRequest(data: CustomerRequest) {
  const key = encryptionKey();
  const code = 'HX-' + randomBytes(8).toString('hex').toUpperCase();
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', key, iv);
  const plaintext = JSON.stringify({ code, receivedAt: new Date().toISOString(), ...data });
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const envelope = JSON.stringify({
    version: 1,
    iv: iv.toString('base64'),
    tag: cipher.getAuthTag().toString('base64'),
    ciphertext: ciphertext.toString('base64'),
  });
  // Runtime-only writable storage must never be traced into a deployment bundle.
  const directory = resolve(/*turbopackIgnore: true*/ process.env.DATA_DIR || './runtime/requests');
  await mkdir(directory, { recursive: true, mode: 0o700 });
  await writeFile(join(directory, code + '.json.enc'), envelope, { mode: 0o600, flag: 'wx' });
  return code;
}
