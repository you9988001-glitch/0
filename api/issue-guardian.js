// Vercel Serverless Function
let count = 0;

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'POST only' });
  }

  count += 1;

  // 개발자가 "서버가 알고 있는 숫자"를 확인하는 유일한 증거
  console.log('[ISSUE-GUARDIAN] current count =', count);

  res.status(200).json({
    ok: true,
    issuedNumber: count
  });
}
