# SendGrid Setup Guide

This guide will help you configure SendGrid for sending job application emails with CV attachments.

## Why SendGrid?

- ✅ **3,000 emails/month FREE** (100 emails/day)
- ✅ Supports file attachments (CV, documents)
- ✅ Professional email delivery
- ✅ Detailed analytics and tracking
- ✅ No credit card required for free tier

**Comparison with EmailJS:**
- SendGrid: 3,000/month (15x more than EmailJS)
- EmailJS: 200/month

## Step 1: Create SendGrid Account

1. Go to [SendGrid](https://signup.sendgrid.com/)
2. Sign up with your email (free tier)
3. Verify your email address
4. Complete the onboarding questionnaire

## Step 2: Verify Sender Identity

**Important:** SendGrid requires sender verification before sending emails.

### Option A: Single Sender Verification (Quick Setup)
1. Navigate to **Settings** → **Sender Authentication** → **Single Sender Verification**
2. Click **Create New Sender**
3. Fill in the form:
   - **From Name**: Your name or company name
   - **From Email**: Your email address (must be accessible)
   - **Reply To**: Same as From Email
   - **Company Address**: Your address
4. Click **Create**
5. Check your email and click the verification link

### Option B: Domain Authentication (Professional Setup)
1. Navigate to **Settings** → **Sender Authentication** → **Authenticate Your Domain**
2. Select your DNS host (e.g., GoDaddy, Namecheap, Cloudflare)
3. Follow the instructions to add DNS records (CNAME)
4. Wait for DNS propagation (up to 48 hours)
5. Verify authentication

## Step 3: Create API Key

1. Go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Enter a name: `HireMe Maroc Production`
4. Select **Restricted Access**:
   - Mail Send: **FULL ACCESS** ✅
   - All others: No Access
5. Click **Create & View**
6. **⚠️ COPY THE API KEY NOW** (shown only once!)
   - Example: `SG.xxxxxxxxxxxxxxxxxx.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy`

## Step 4: Configure Environment Variables

### Local Development (.env)
```env
# SendGrid Configuration
VITE_SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxx.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
```

### Production (Vercel)
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add new variable:
   - **Name**: `VITE_SENDGRID_API_KEY`
   - **Value**: `SG.xxxxxxxxxxxxxxxxxx.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy`
   - **Environments**: Production, Preview, Development
4. Click **Save**
5. Redeploy your application

## Step 5: Test Email Sending

1. Build your application:
   ```bash
   npm run build
   npm run preview
   ```

2. Open the application in your browser
3. Find a job with email contact
4. Click "Postuler maintenant"
5. Upload your CV
6. Generate cover letter
7. Confirm email and send

## Step 6: Monitor Email Activity

1. Go to **Activity** in SendGrid dashboard
2. View sent emails, delivery status, and analytics
3. Check for errors or bounces

## API Usage Limits (Free Tier)

- **Daily Limit**: 100 emails/day
- **Monthly Limit**: 3,000 emails/month
- **Attachment Size**: Up to 30MB total per email
- **Rate Limiting**: Automatic throttling if limits exceeded

## Troubleshooting

### Error: "401 Unauthorized"
- **Cause**: Invalid API key
- **Solution**: Verify your API key in SendGrid dashboard and .env file

### Error: "403 Forbidden"
- **Cause**: Sender not verified or API key lacks permissions
- **Solution**: Complete sender verification (Step 2) and check API key permissions

### Error: "429 Too Many Requests"
- **Cause**: Daily limit exceeded (100 emails/day)
- **Solution**: Wait 24 hours or upgrade to paid plan

### Error: "400 Bad Request"
- **Cause**: Invalid email format or missing required fields
- **Solution**: Check console logs for detailed error message

### Emails Not Received
1. Check **Activity** in SendGrid dashboard
2. Look for bounce/spam reports
3. Verify recipient email is correct
4. Check spam folder
5. Ensure sender is verified

## Code Implementation

The application uses SendGrid Web API v3 directly:

```typescript
const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${sendGridApiKey}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    personalizations: [{
      to: [{ email: targetEmail }],
      subject: 'Job Application'
    }],
    from: { email: userEmail },
    content: [{ type: 'text/plain', value: message }],
    attachments: [{
      content: cvBase64,
      filename: 'CV.pdf',
      type: 'application/pdf',
      disposition: 'attachment'
    }]
  })
});
```

## Best Practices

1. **Rate Limiting**: Don't send more than 100 emails/day on free tier
2. **Email Validation**: Validate user emails before sending
3. **Error Handling**: Always catch and log errors
4. **Analytics**: Monitor email performance in SendGrid dashboard
5. **Sender Reputation**: Use consistent sender email/domain
6. **Spam Prevention**: Include unsubscribe links for bulk emails
7. **Testing**: Test emails to multiple providers (Gmail, Outlook, Yahoo)

## Security Notes

- ⚠️ **Never commit API keys to Git**
- ✅ Always use environment variables
- ✅ Use restricted API keys (only Mail Send permission)
- ✅ Rotate API keys periodically
- ✅ Keep keys in .env (ignored by Git)

## Support Resources

- [SendGrid Documentation](https://docs.sendgrid.com/)
- [SendGrid API Reference](https://docs.sendgrid.com/api-reference/how-to-use-the-sendgrid-v3-api/authentication)
- [SendGrid Support](https://support.sendgrid.com/)
- [Status Page](https://status.sendgrid.com/)

## Migration from EmailJS

If you previously used EmailJS:

1. ✅ Remove EmailJS dependencies (already done)
2. ✅ Update ApplicationWizard.tsx to use SendGrid (already done)
3. ✅ Create SendGrid account and get API key
4. ✅ Update environment variables
5. ✅ Test email sending
6. ✅ Remove old EMAILJS_SETUP.md

---

**Current Version**: 0.4.3  
**Email Service**: SendGrid (3,000/month FREE)  
**Previous Service**: EmailJS (200/month)  
**Migration Date**: 2025
