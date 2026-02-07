import { Resend } from 'resend';

export default async function handler(req, res) {
  // OPTIONS 요청 처리 (CORS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // POST만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { timestamp } = req.body;

    // 이메일 전송
    await resend.emails.send({
      from: 'CODE ARCHE <onboarding@resend.dev>', // Resend 도메인 인증 후 변경 가능
      to: 'you9988001@gmail.com',
      subject: 'CODE ARCHE - Guardian Certificate Verification',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #fffdf5; border: 2px solid #aa8913;">
          <h2 style="color: #aa8913; text-align: center; font-size: 24px; margin-bottom: 20px;">
            ✓ Guardian Certificate Verified
          </h2>
          
          <div style="background: #f9f1c0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Verification Time:</strong> ${timestamp}</p>
            <p style="margin: 10px 0;"><strong>Certificate Type:</strong> Guardian Certificate</p>
            <p style="margin: 10px 0;"><strong>Status:</strong> ✓ Authentic - Verified</p>
          </div>
          
          <p style="text-align: center; color: #666; font-size: 14px; margin-top: 30px;">
            — CODE ARCHE Guardian System
          </p>
        </div>
      `
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
