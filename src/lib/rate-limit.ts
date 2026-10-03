// One-process guard for the documented single systemd service.
// For multiple replicas, replace this adapter with a shared Redis limit.
const entries = new Map<string, { count: number; expires: number }>();
export function allowRequest(key: string, now = Date.now()) {
  for (const [id, value] of entries) if (value.expires <= now) entries.delete(id);
  const item = entries.get(key);
  if (!item) {
    if (entries.size >= 10000) return false;
    entries.set(key, { count: 1, expires: now + 10 * 60 * 1000 });
    return true;
  }
  item.count++;
  return item.count <= 20;
}
