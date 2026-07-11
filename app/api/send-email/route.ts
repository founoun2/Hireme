import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, content, replyToEmail, attachment } = body;

    if (!to || !subject || !content) {
      return NextResponse.json(
        { error: 'Les champs "to", "subject" et "content" sont requis.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const emailPayload: {
      from: string;
      to: string[];
      subject: string;
      html: string;
      replyTo?: string;
      attachments?: Array<{ filename: string; content: string }>;
    } = {
      from: 'HireMe Maroc <noreply@hirememaroc.online>',
      to: Array.isArray(to) ? to : [to],
      subject,
      html: content,
    };

    if (replyToEmail) {
      emailPayload.replyTo = replyToEmail;
    }

    if (attachment) {
      emailPayload.attachments = [
        {
          filename: attachment.filename || 'document.pdf',
          content: attachment.content,
        },
      ];
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send(emailPayload);

    if (error) {
      return NextResponse.json(
        { error: error.message || 'Erreur lors de l\'envoi de l\'email.' },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Erreur API send-email:', error);
    return NextResponse.json(
      { error: 'Une erreur interne est survenue.' },
      { status: 500, headers: corsHeaders }
    );
  }
}
