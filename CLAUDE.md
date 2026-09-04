# CLAUDE.md

Claude Code guidance for working in this repository.

Start by reading `AGENTS.md`; it is the canonical cross-agent guide for this project. This file adds Claude-specific operating notes and repeats the critical project facts so Claude has useful context even when only `CLAUDE.md` is loaded.

## Project Summary

`my-website` is Cameron Porter's personal portfolio and marketing site. It is a standard Next.js 16 App Router project using React 19, TypeScript, Tailwind CSS 4, Framer Motion, Vitest, Testing Library, and Nodemailer.

Do not describe this repository as "not typical Next.js." The important nuance is simply that it uses modern Next.js 16 App Router conventions, so framework behavior should be checked against the installed version when needed.

The site contains:

- Personal portfolio, resume, projects, lab, about, and contact pages.
- G.R.I.T. project/marketing content and links to the hosted G.R.I.T. app.
- A server-side contact form endpoint at `app/api/contact/route.ts`.
- Vercel-oriented deployment configuration through normal Next.js settings.

## Claude Workflow

1. Inspect before editing: read the relevant files and trace imports/usages.
2. Keep changes narrow; avoid drive-by refactors and style churn.
3. Match existing conventions for TypeScript, App Router routes, components, Tailwind classes, and config-driven content.
4. Prefer edits to `lib/config/` for durable site copy and data.
5. Run the relevant verification commands before reporting success.
6. Show an honest final status with files changed and commands run.

Do not commit or push unless Cameron explicitly asks.

## Important Files

- `app/(marketing)/` — public route group for pages.
- `app/api/contact/route.ts` — contact endpoint; preserve validation, honeypot behavior, SMTP checks, and safe error handling.
- `components/marketing/` — reusable marketing and page sections.
- `components/ui/` — shared UI primitives.
- `components/theme/` — theme controls.
- `lib/config/personal-site.ts` — primary portfolio/resume/projects/content source.
- `lib/config/site.ts` — site config, nav/footer/legal links, and `APP_URL`.
- `lib/config/` — additional G.R.I.T. marketing copy/config.
- `lib/animations/` — motion hooks and variants.
- `lib/utils/` — validation and rate-limit utilities.
- `next.config.mjs` — Turbopack root, security headers, cache headers, and redirects.
- `vitest.config.ts`, `vitest.setup.ts` — test configuration.

## Commands

Use npm.

```bash
npm install
npm run dev
npm test
npm run lint
npm run typecheck
npm run build
```

For docs-only edits, run:

```bash
git diff --check
```

For code edits, run the relevant subset and usually the full gate:

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

## Environment Variables

Never print or commit real secrets. Redact any credential values in summaries.

- `NEXT_PUBLIC_APP_URL` controls hosted G.R.I.T. app links and defaults to `https://app.cameron-porter.com`.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, and `SMTP_TO` support the contact form.
- `SMTP_USER` and `SMTP_PASS` are required for `/api/contact` to send email.

## Implementation Notes

- Use the `@/*` import alias.
- Respect strict TypeScript and `noUncheckedIndexedAccess`.
- Keep route additions in `app/(marketing)/` unless there is a clear reason not to.
- Keep page metadata accurate when adding or changing pages.
- Preserve the dark-first, minimal, jade-accented visual direction.
- Use accessible, reduced-motion-aware animation patterns.
- Be careful changing `next.config.mjs`; CSP and cache header edits can break production behavior.
- Contact form changes should include validation and failure-path tests when behavior changes.
