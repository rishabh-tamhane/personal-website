# rishabhtamhane.com

The source for Rishabh Tamhane's personal website: writing, projects, and current interests.

V1 is a statically exported Next.js site deployed as Cloudflare Worker static
assets. The Worker serves the generated files directly; V1 does not run
request-time application code.

## Prerequisites

- Node.js `24.21.x`
- npm `11.19.x`

If you use a Node version manager, run its command for reading `.nvmrc` before installing dependencies.

## Local development

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>.

## Useful commands

```bash
npm run typecheck     # Check TypeScript types without producing files
npm run lint          # Check code-quality and Next.js rules
npm run format:check  # Check formatting without changing files
npm run format        # Apply Prettier formatting
npm run build         # Create the static website in out/
npm run verify        # Type-check, lint, and build
npm run test:e2e      # Run browser tests once they are added
```

## Deployment contract

Cloudflare Workers Builds uses:

- Production branch: `main`
- Build command: `npm run build`
- Deploy command: `npx wrangler@4.147.0 deploy --name personal-website-1 --assets ./out --compatibility-date 2026-10-01`
- Node.js major version: `24`

The `docs/` directory contains local planning and learning notes and is intentionally excluded from Git.
