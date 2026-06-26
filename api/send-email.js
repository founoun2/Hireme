// Vercel Serverless Function for SendGrid Email
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
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

    // Get SendGrid config from environment variables
    const apiKey = process.env.SENDGRID_API_KEY;
    const fromEmail = process.env.SENDGRID_FROM_EMAIL;
    const fromName = process.env.SENDGRID_FROM_NAME || 'HireMe Maroc';

    if (!apiKey || !fromEmail) {
      console.error('Missing SendGrid configuration');
      return res.status(500).json({ 
        error: 'Missing SendGrid configuration',
        details: 'Server environment variables not configured'
      });
    }

    // Prepare SendGrid payload
    const emailData = {
      personalizations: [{
        to: [{ email: to, name: toName }],
        subject: subject
      }],
      from: {
        email: fromEmail,
        name: fromName
      },
      reply_to: {
        email: replyToEmail,
        name: replyToName
      },
      content: [{
        type: 'text/plain',
        value: content
      }]
    };

    // Add attachment if provided
    if (attachment) {
      emailData.attachments = [{
        content: attachment.content,
        filename: attachment.filename,
        type: attachment.type,
        disposition: 'attachment'
      }];
    }

    // Call SendGrid API
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (response.status === 202) {
      console.log('✅ Email sent successfully via SendGrid');
      return res.status(200).json({ 
        success: true, 
        message: 'Email sent successfully' 
      });
    } else {
      const errorData = await response.json();
      console.error('SendGrid API Error:', errorData);
      return res.status(response.status).json({ 
        error: 'SendGrid API error', 
        details: errorData 
      });
    }

  } catch (error) {
    console.error('Error in send-email function:', error);
    return res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    });
  }
}
