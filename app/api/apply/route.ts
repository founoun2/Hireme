import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const jobTitle = formData.get('jobTitle') as string;
    const company = formData.get('company') as string;
    const jobEmail = formData.get('jobEmail') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const website = formData.get('website') as string;
    const coverLetter = formData.get('coverLetter') as string;
    const cv = formData.get('cv') as File | null;

    if (!jobTitle || !company || !firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Les champs obligatoires ne sont pas remplis.' },
        { status: 400 }
      );
    }

    // Build the email content
    const applicantName = `${firstName} ${lastName}`;
    const subject = `Candidature - ${jobTitle} chez ${company}`;

    let cvInfo = '';
    if (cv && cv.size > 0) {
      cvInfo = `
        <div style="background:#f5f5f5;padding:12px;border-radius:8px;margin-top:16px;">
          <p style="font-size:12px;font-weight:bold;color:#666;margin:0;">CV ATTACHÉ</p>
          <p style="font-size:14px;color:#333;margin:4px 0 0;">${cv.name} (${(cv.size / 1024 / 1024).toFixed(1)} Mo)</p>
        </div>`;
    }

    const html = `
      <div style="font-family:system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:24px;">
        <div style="background:linear-gradient(135deg,#c1272d,#a12024);padding:24px;border-radius:12px 12px 0 0;text-align:center;">
          <h1 style="color:white;font-size:20px;margin:0;">Nouvelle candidature</h1>
          <p style="color:rgba(255,255,255,0.8);font-size:13px;margin:6px 0 0;">${jobTitle} chez ${company}</p>
        </div>
        <div style="background:white;padding:24px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 12px 12px;">
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 0;font-size:12px;font-weight:bold;color:#666;width:120px;">CANDIDAT</td>
              <td style="padding:8px 0;font-size:14px;color:#111;">${applicantName}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:12px;font-weight:bold;color:#666;">EMAIL</td>
              <td style="padding:8px 0;font-size:14px;color:#111;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;font-size:12px;font-weight:bold;color:#666;">TÉLÉPHONE</td>
              <td style="padding:8px 0;font-size:14px;color:#111;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            ${website ? `
            <tr>
              <td style="padding:8px 0;font-size:12px;font-weight:bold;color:#666;">SITE WEB</td>
              <td style="padding:8px 0;font-size:14px;color:#111;"><a href="${website}">${website}</a></td>
            </tr>` : ''}
          </table>
          ${coverLetter ? `
          <div style="background:#fafafa;border-left:3px solid #c1272d;padding:16px;border-radius:0 8px 8px 0;margin-top:16px;">
            <p style="font-size:12px;font-weight:bold;color:#666;margin:0 0 8px;">LETTRE DE MOTIVATION</p>
            <p style="font-size:13px;color:#333;margin:0;white-space:pre-wrap;line-height:1.6;">${coverLetter}</p>
          </div>` : ''}
          ${cvInfo}
          <hr style="border:none;border-top:1px solid #e5e5e5;margin:20px 0;" />
          <p style="font-size:11px;color:#999;margin:0;">
            Candidature envoyée via HireMe Maroc &bull; ${new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>`;

    // Send email via Resend
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey && jobEmail && jobEmail !== '') {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(resendKey);

        const emailPayload: {
          from: string;
          to: string[];
          subject: string;
          html: string;
          replyTo?: string;
          attachments?: Array<{ filename: string; content: string }>;
        } = {
          from: 'HireMe Maroc <noreply@hirememaroc.online>',
          to: [jobEmail],
          subject,
          html,
          replyTo: email,
        };

        // Attach CV as base64 if present
        if (cv && cv.size > 0) {
          const bytes = await cv.arrayBuffer();
          const base64 = Buffer.from(bytes).toString('base64');
          emailPayload.attachments = [
            { filename: cv.name, content: base64 },
          ];
        }

        const { error } = await resend.emails.send(emailPayload);
        if (error) {
          console.error('Resend error:', error);
        }
      } catch (emailErr) {
        console.error('Email send failed:', emailErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Apply API error:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'envoi de votre candidature.' },
      { status: 500 }
    );
  }
}
