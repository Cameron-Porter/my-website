# AGENTS.md

Guidance for AI agents and contributors working in this repository.

## Project Overview

`my-website` is Cameron Porter's personal portfolio and marketing site built with the Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS 4.

It is a normal App Router application with a public marketing route group, shared UI/components, configuration-driven content, and a small server API for the contact form. It is not the G.R.I.T. app repository; it links to the hosted G.R.I.T. app and contains G.R.I.T. marketing/project pages.

Primary surfaces:

- Personal portfolio, resume, projects, lab notes, about, and contact pages.
- G.R.I.T. marketing/project pages for features, pricing, methodology, research, privacy, and terms.
- `/api/contact`, which validates contact form submissions and sends email with Nodemailer through SMTP.
- `/grit`, a permanent redirect to the hosted G.R.I.T. app URL.

## Architecture and Important Files

- `app/` — Next.js routes, root layout, metadata, sitemap, robots, and API handlers.
- `app/(marketing)/` — public portfolio and marketing pages.
- `app/api/contact/route.ts` — contact form endpoint with honeypot, validation, SMTP configuration checks, and email sending.
- `components/marketing/` — reusable page sections and marketing UI.
- `components/theme/` — theme controls.
- `lib/config/personal-site.ts` — primary source of truth for Cameron's portfolio content, resume, projects, links, and metadata.
- `lib/config/site.ts` — exported site config, nav/footer links, legal links, and G.R.I.T. app URL.
- `lib/utils.ts` — the `cn` class-name helper.
- `public/` — static assets and downloadable files.

## Development Commands

Use npm. Do not switch package managers unless Cameron asks.

```bash
npm install
npm run dev
npm test
npm run lint
npm run typecheck
npm run build
```

Before calling work complete, run the relevant local checks. For documentation-only changes, at minimum run:

```bash
git diff --check
```

For code changes, run the full gate unless there is a clear external blocker:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

## Environment and Secrets

Never commit real credentials. Never print API keys, tokens, passwords, SMTP credentials, connection strings, or secret env values in summaries.

Relevant variables:

- `NEXT_PUBLIC_APP_URL` — hosted G.R.I.T. app URL; defaults to `https://app.cameron-porter.com` in `lib/config/site.ts`.
- `SMTP_HOST` — SMTP host; defaults to Brevo's relay host in the contact API.
- `SMTP_PORT` — SMTP port; defaults to `587`.
- `SMTP_USER` — SMTP auth user; required for contact form email sending.
- `SMTP_PASS` — SMTP auth password/key; required for contact form email sending.
- `SMTP_FROM` — verified sender address/domain.
- `SMTP_TO` — destination inbox; defaults to `info@cameron-porter.com`.

If SMTP credentials are missing, `/api/contact` returns a 503 JSON error instead of attempting to send mail.

## Code and Content Conventions

- Keep changes narrow and style-consistent.
- Preserve the App Router structure; add new pages under `app/(marketing)/` unless a different route boundary is needed.
- Prefer configuration-driven content in `lib/config/` instead of scattering durable site copy across components.
- Keep personal portfolio content in `lib/config/personal-site.ts` unless it is page-specific presentation copy.
- Use the `@/*` path alias configured in `tsconfig.json` and `vitest.config.ts`.
- Respect strict TypeScript settings, including `noUncheckedIndexedAccess`.
- Keep motion tasteful and accessible; honour `prefers-reduced-motion`, which `app/globals.css` already disables transitions under.
- Keep the visual direction dark-first and minimal: pine accent, campfire ember, warm paper in light mode.
- Contact form changes must preserve server-side validation and bot/honeypot handling.
- Security header changes belong in `next.config.mjs`; be careful with CSP relaxations.

## Next.js Version Note

This repo uses Next.js 16. Treat it as a real, standard Next.js App Router project, but verify version-specific APIs against the installed package or current Next.js docs before making framework-level changes. Do not rely on older Pages Router assumptions.

## Git and Delivery Expectations

- Check `git status --short --branch` before editing and before reporting completion.
- Inspect the final diff before summarizing.
- Do not commit, push, or rewrite history unless Cameron explicitly asks in the current task.
- If changing deployed behavior, verify the build and inspect Vercel deployment logs after deployment.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
