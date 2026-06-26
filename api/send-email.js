// Vercel Serverless Function for Resend Email
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      to,
      toName,
      subject,
      content,
      replyToEmail,
      replyToName,
      attachment
    } = req.body;

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'applications@hirememaroc.online';
    const fromName = process.env.RESEND_FROM_NAME || 'HireMe Maroc';

    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY');
      return res.status(500).json({
        error: 'Missing Resend configuration',
        details: 'RESEND_API_KEY not set'
      });
    }

    const emailOptions = {
      from: `${fromName} <${fromEmail}>`,
      to: [to],
      subject: subject,
      text: content,
      replyTo: replyToEmail,
    };

    if (attachment) {
      emailOptions.attachments = [{
        filename: attachment.filename,
        content: attachment.content,
      }];
    }

    const { data, error } = await resend.emails.send(emailOptions);

    if (error) {
      console.error('Resend API Error:', error);
      return res.status(400).json({
        error: 'Resend API error',
        details: error
      });
    }

    console.log('✅ Email sent via Resend:', data?.id);
    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      id: data?.id
    });

  } catch (error) {
    console.error('Error in send-email function:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}
