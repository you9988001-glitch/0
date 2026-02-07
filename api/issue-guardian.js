let counter = 1;

export default function handler(req, res) {
  counter += 1;

  const code =
    `CODE-ARCHE-2026-THIA-${String(counter).padStart(4,'0')}`;

  console.log('ISSUED:', code);

  res.status(200).json({ code });
}
