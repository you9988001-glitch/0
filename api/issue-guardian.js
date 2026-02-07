import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  let current = await kv.get('guardian_count');
  current = current ? Number(current) : 0;

  if (current >= 100) {
    return res.status(403).json({
      error: 'LIMIT_REACHED',
      message: 'ALL GUARDIANS HAVE BEEN ORDAINED'
    });
  }

  const next = current + 1;
  await kv.set('guardian_count', next);

  const code = `CODE-ARCHE-2026-THIA-${String(next).padStart(4, '0')}`;

  return res.status(200).json({
    success: true,
    code
  });
}
