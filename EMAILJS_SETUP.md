# EmailJS Setup Guide

## Why EmailJS?
EmailJS allows sending emails directly from the browser without a backend server. Perfect for the AI Application Wizard!

## Free Tier
- ✅ 200 emails/month free
- ✅ No credit card required
- ✅ No backend needed
- ✅ Attachments up to 5MB supported

---

## Setup Steps

### 1. Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Click **"Sign Up"** (free)
3. Verify your email

### 2. Add Email Service
1. Go to **"Email Services"** tab
2. Click **"Add New Service"**
3. Choose **Gmail** (recommended) or other provider
4. Connect your Gmail account
5. Copy the **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template
1. Go to **"Email Templates"** tab
2. Click **"Create New Template"**
3. **Enable Attachments**: Click "Settings" → Enable "Allow Attachments"
4. Use this template:

```
Subject: {{subject}}

Bonjour {{to_name}},

Je vous contacte pour postuler au poste de {{job_title}} au sein de {{company_name}}.

{{message}}

Vous trouverez mon CV en pièce jointe.

Cordialement,
{{from_name}}
{{from_email}}

---
Ce message a été envoyé via HireMe Maroc
```

**Important Template Settings:**
- ✅ Enable "Allow Attachments" in template settings
- ✅ Set "From Name" to: `{{from_name}}`
- ✅ Set "From Email" to: Your verified sender email (e.g., `noreply@yourdomain.com`)
- ✅ Set "Reply To" to: `{{reply_to}}`

5. Copy the **Template ID** (e.g., `template_xyz789`)

### 4. Get Public Key
1. Go to **"Account"** tab
2. Find **"Public Key"** section
3. Copy your **Public Key** (e.g., `user_abcXYZ123`)

### 5. Update .env File
Add these values to your `.env` file:

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
```

### 6. Rebuild & Deploy
```bash
npm run build
git add .
git commit -m "Configure EmailJS for direct email sending"
git push origin master
```

---

## Email Template Variables

These are automatically filled by the application:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{to_email}}` | Company email | `hr@company.com` |
| `{{to_name}}` | Company name | `TechCorp` |
| `{{from_name}}` | User name (from email) | `John Doe` |
| `{{from_email}}` | User email | `john@gmail.com` |
| `{{reply_to}}` | Reply-to address | `john@gmail.com` |
| `{{job_title}}` | Job position | `Développeur Full Stack` |
| `{{company_name}}` | Company name | `TechCorp` |
| `{{subject}}` | Email subject | `Candidature pour [Job] - [Company]` |
| `{{message}}` | AI cover letter | Full letter text |
| **Attachment** | CV file | PDF/Word file automatically attached |

**Note:** The CV is sent as a file attachment, not embedded in the email body.

---

## Testing

1. Apply to a test job with your own email as company email
2. Fill out the wizard
3. Click "Envoyer la candidature"
4. Check your inbox for the application email

---

## Troubleshooting

### "EmailJS not configured" Error
- Check that all 3 env variables are set in `.env`
- Make sure they start with `VITE_` prefix
- Rebuild the project: `npm run build`

### Email Not Received
- Check EmailJS dashboard for sent emails
- Verify Service ID and Template ID are correct
- Check spam folder
- Ensure Gmail service is connected properly
- **Verify "Allow Attachments" is enabled in template**
- Check if CV file size is under 5MB

### Rate Limit (200 emails/month)
- Upgrade to EmailJS paid plan ($15/month for 1000 emails)
- Or use alternative: SendGrid, Mailgun, AWS SES

---

## Alternative: SendGrid (if EmailJS limit reached)

SendGrid offers 100 emails/day free:
1. Sign up at https://sendgrid.com/
2. Get API key
3. Update code to use SendGrid API instead of EmailJS

---

## Security Notes

✅ **Safe**: EmailJS keys can be public (they're frontend keys)  
✅ **CORS**: EmailJS handles CORS automatically  
✅ **Spam**: EmailJS has built-in spam protection  
❌ **Don't**: Expose backend API keys in frontend code
