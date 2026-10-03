import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync, chmodSync } from 'node:fs';
const file = '.env.local';
let content = existsSync(file) ? readFileSync(file, 'utf8') : readFileSync('.env.example', 'utf8');
const match = content.match(/^LEADS_ENCRYPTION_KEY=(.*)$/m);
if (match?.[1].trim()) {
  console.log('Existing key preserved. Do not rotate it without re-encrypting stored requests.');
  process.exit(0);
}
const line = 'LEADS_ENCRYPTION_KEY=' + randomBytes(32).toString('base64');
content = match
  ? content.replace(/^LEADS_ENCRYPTION_KEY=.*$/m, line)
  : content + '\n' + line + '\n';
writeFileSync(file, content, { mode: 0o600 });
chmodSync(file, 0o600);
console.log(
  '.env.local configured. Set SITE_URL and DATA_DIR, and back up the encryption key securely.',
);
