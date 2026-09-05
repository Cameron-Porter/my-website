# my-website

Personal portfolio website for [Cameron Porter](https://cameron-porter.com): a living resume, project showcase, lab notebook, and contact surface built with Next.js.

The site also links into [G.R.I.T.](https://app.cameron-porter.com), Cameron's hypertrophy training product, but this repository is the personal marketing/portfolio site rather than the app itself.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- Lucide icons
- Nodemailer-backed contact form
- Vitest for tests

## Routes

- `/` — portfolio landing page
- `/resume` — resume summary and downloadable resume link
- `/projects` — project index
- `/projects/grit` — G.R.I.T. project detail page
- `/lab` — workflow and engineering lab notes
- `/about` — personal background
- `/contact` — contact form and external links
- `/features` — G.R.I.T. feature overview
- `/pricing` — G.R.I.T. pricing and app access details
- `/methodology` — training methodology
- `/research` — research backing
- `/privacy` — privacy policy
- `/terms` — terms of service
- `/grit` — permanent redirect to the hosted G.R.I.T. app

Metadata, robots, and sitemap routes live in `app/layout.tsx`, `app/robots.ts`, and `app/sitemap.ts`.

## Project Structure

```text
app/                  Next.js routes, layouts, metadata, sitemap, robots, and API handlers
app/(marketing)/      Public marketing and portfolio pages
app/api/contact/      Contact form email endpoint
components/marketing/ Reusable page sections and marketing UI
components/theme/     Theme controls
lib/config/           Site copy, navigation, projects, and resume content
lib/utils.ts          The `cn` class-name helper
public/               Static assets and downloadable files
```

## Environment Variables

Create a local `.env.local` file for development when you need to exercise the contact form. Do not commit real credentials.

```env
NEXT_PUBLIC_APP_URL=https://app.cameron-porter.com

SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your-brevo-login-email
SMTP_PASS=your-brevo-smtp-key
SMTP_FROM=contact@cameron-porter.com
SMTP_TO=info@cameron-porter.com
```

Notes:

- `NEXT_PUBLIC_APP_URL` controls where G.R.I.T. app links point.
- `SMTP_USER` and `SMTP_PASS` are required for `/api/contact` to send mail.
- `SMTP_FROM` should be a verified sender/domain in the SMTP provider.
- `SMTP_TO` defaults to `info@cameron-porter.com` if unset.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` unless Next.js reports a different local port.

## Available Scripts

```bash
npm run dev          # start the local Next.js dev server
npm run build        # create a production build
npm run start        # serve the production build
npm run lint         # run ESLint
npm run typecheck    # run TypeScript without emitting files
npm test             # run Vitest once
npm run test:watch   # run Vitest in watch mode
```

## Quality Checks

Run the full local gate before shipping changes:

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm audit --audit-level=moderate
```

## Design and Content Notes

- Brand direction: dark-first, minimal, jade accent, warm lantern glow, and disciplined portfolio storytelling.
- Primary site content is configured in `lib/config/personal-site.ts`.
- G.R.I.T.-specific feature, methodology, pricing, and research copy is split across the config files in `lib/config/`.
- Motion should respect reduced-motion preferences and avoid unnecessary work on small/mobile viewports.
- Contact form submissions use a honeypot field and server-side validation before sending email.

## Deployment

The site is deployed on Vercel.

1. Configure the environment variables above in the Vercel project settings.
2. Keep secrets out of git and out of client-side `NEXT_PUBLIC_*` variables unless they are intentionally public.
3. Run the quality checks locally.
4. Push the intended branch and verify the Vercel build/deployment logs.
