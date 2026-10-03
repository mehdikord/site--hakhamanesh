import { createDecipheriv } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
const key = Buffer.from(process.env.LEADS_ENCRYPTION_KEY || '', 'base64');
if (key.length !== 32)
  throw new Error(
    'Missing 32-byte key. Run with --env-file=.env.local or a secure service EnvironmentFile.',
  );
const directory = resolve(process.env.DATA_DIR || './runtime/requests');
const files = await readdir(directory).catch((error) => {
  if (error.code === 'ENOENT') return [];
  throw error;
});
for (const file of files.filter((x) => /^HX-[A-F0-9]{16}\.json\.enc$/.test(x)).sort()) {
  const envelope = JSON.parse(await readFile(join(directory, file), 'utf8'));
  if (envelope.version !== 1) throw new Error('Unknown storage format');
  const decipher = createDecipheriv('aes-256-gcm', key, Buffer.from(envelope.iv, 'base64'));
  decipher.setAuthTag(Buffer.from(envelope.tag, 'base64'));
  const json = Buffer.concat([
    decipher.update(Buffer.from(envelope.ciphertext, 'base64')),
    decipher.final(),
  ]).toString('utf8');
  console.log(JSON.stringify(JSON.parse(json), null, 2));
}
if (!files.length) console.log('No requests recorded.');
