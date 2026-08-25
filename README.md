# porter-performance-app

Marketing website for [G.R.I.T.](https://app.cameron-porter.com) — a hypertrophy training app by Porter Programming.

## Pages

- `/` — landing page
- `/features` — feature overview
- `/pricing` — pricing and app access details
- `/methodology` — training methodology
- `/research` — research backing
- `/about` — about
- `/contact` — contact form
- `/privacy` — privacy policy
- `/terms` — terms of service

## Environment Variables

```env
NEXT_PUBLIC_APP_URL=https://app.cameron-porter.com
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=        # your Brevo login email
SMTP_PASS=        # your Brevo SMTP key
SMTP_TO=info@cameron-porter.com
```

## Local Development

```bash
npm install
npm run dev
```

## Deploy


Deployed on Vercel. Set the environment variables above in project settings, then push to main.
