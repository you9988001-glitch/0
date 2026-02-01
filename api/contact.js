// /api/contact.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const { name, email, vision } = req.body || {};

    if (!name || !email || !vision) {
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !toEmail) {
      return res.status(500).json({
        ok: false,
        error: "Server env missing (RESEND_API_KEY / CONTACT_TO_EMAIL)",
      });
    }

    // Resend API 호출 (외부 라이브러리 설치 없이 fetch로 바로 보냄)
    const subject = `[CODE ARCHE] Guardian Application - ${name}`;
    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;">
        <h2>Guardian Application</h2>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Vision:</b></p>
        <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px;">${escapeHtml(vision)}</pre>
        <hr />
        <p style="color:#666;font-size:12px;">Sent from Code Arche index page</p>
      </div>
    `;

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Code Arche <onboarding@resend.dev>", // 테스트용 기본 from
        to: [toEmail],
        subject,
        html,
        reply_to: email,
      }),
    });

    const j = await r.json().catch(() => ({}));

    if (!r.ok) {
      return res.status(502).json({
        ok: false,
        error: "Resend failed",
        details: j,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) });
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
