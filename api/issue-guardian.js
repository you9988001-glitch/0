let count = 0;

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  count += 1;

  const padded = String(count).padStart(4, "0");
  const code = `CODE-ARCHE-2026-THIA-${padded}`;

  res.status(200).json({ code });
}
