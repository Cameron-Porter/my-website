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

## Marketing Experience

- Hero section uses layered gradients, tactile texture, staggered motion, and desktop-only parallax to give the landing page a polished app-launch feel.
- Motion respects reduced-motion preferences and disables parallax on mobile viewports for accessibility and performance.
- Primary CTA opens the G.R.I.T. app, while the secondary CTA anchors visitors into the methodology content.
- Methodology cards use varied layouts, Lucide icons, and asymmetric surfaces to avoid repetitive template rhythm.

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

## Quality Checks

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm audit --audit-level=moderate
```

## Deploy


Deployed on Vercel. Set the environment variables above in project settings, then push to main.
