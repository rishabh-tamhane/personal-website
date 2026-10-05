# Project Instructions

## Project goal

Build `rishabhtamhane.com`, a minimal, elegant personal website for Rishabh's writing, projects, and current interests. The project is also a hands-on way for Rishabh to learn full-stack software development, so explain important implementation decisions and concepts in plain language.

## Read before changing the project

- Read `README.md` for setup, commands, and the deployment contract.
- When available locally, read `docs/releases/v1/requirements.md`, `docs/releases/v1/technical-design.md`, and `docs/releases/v1/tasks.md` before making architectural or scope changes.
- `docs/` is intentionally ignored by Git. Do not remove that ignore rule or stage the directory unless Rishabh changes this decision.
- Preserve unrelated user changes. Do not discard or rewrite them.

## V1 architecture

- Next.js App Router with TypeScript and a `src/` directory.
- React components use `.tsx`; non-UI TypeScript uses `.ts`.
- Next.js static export produces deployable files in `out/`.
- Cloudflare Workers Static Assets hosts the static output; V1 has no Worker request handler.
- Writing will be stored as repository-local MDX.
- Styling uses global design tokens and CSS Modules. Do not add Tailwind unless the design decision is explicitly revisited.
- The design is dark, minimal, accessible, and mobile-first. It must remain usable at 320px wide.

The deployment path is:

```text
source code → npm run build → out/ → Cloudflare Workers Static Assets
```

## Keep V1 small

Do not add these without an explicit scope change:

- a database, CMS, server API, or Worker request handler;
- authentication;
- comments, reactions, subscriptions, or search;
- analytics;
- light-theme switching;
- complex animations;
- automatic social-preview image generation.

Prefer the smallest implementation that satisfies the current milestone. Avoid abstractions that have only one speculative use.

## Static-export constraints

- Keep `output: "export"` in `next.config.ts`.
- Do not use features that require a continuously running Next.js server.
- All public routes must be known and renderable at build time.
- Keep framework image optimization disabled unless the hosting architecture changes.
- Verify that `npm run build` creates `out/index.html`.

## Dependencies and versions

- Use Node.js `24.21.x` and npm `11.19.x`.
- Keep direct dependency versions exact; `.npmrc` sets `save-exact=true`.
- Commit `package-lock.json` and change it through npm commands, not manual editing.
- Use `npm ci` when verifying that the lockfile can reproduce the installation.
- Do not run `npm audit fix --force` automatically. Inspect the dependency path and compatibility impact first.
- Do not add a dependency when a small, clear local implementation is sufficient. Explain why any new package is needed.

## Code and design conventions

- Keep TypeScript strict and avoid `any` unless there is a documented reason.
- Prefer Server Components. Add `"use client"` only when browser state, effects, or event handlers require it.
- Use semantic HTML before adding ARIA attributes.
- Ensure keyboard access, visible focus, sufficient contrast, and meaningful media alternatives.
- Build mobile styles first, then add wider-screen enhancements.
- Put reusable site-wide values in global design tokens; put component-specific styles in a colocated CSS Module.
- Keep components focused and names descriptive.
- Use the `@/*` import alias for source imports when it improves readability.

## Content conventions

- Writing content belongs under `content/writing/<slug>/index.mdx` once the MDX milestone begins.
- Treat article metadata as data: validate it and fail the build with a useful error when it is invalid.
- Keep drafts out of public pages, metadata, feeds, and static route generation.
- Rich MDX elements should be reusable components rather than one-off HTML fragments.

## Commands and verification

Run the checks relevant to a change. Before handing off an implementation change, normally run:

```bash
npm run format:check
npm run verify
```

`npm run verify` performs type checking, linting, and a production build. Also run browser tests after Playwright tests are implemented in Milestone 5.

Do not claim a check passed unless it was run successfully. If a check cannot run, clearly state why and what remains unverified.

## Communication and learning

- Explain the purpose of each significant file or tool when introducing it.
- Distinguish source files, configuration files, dependencies, caches, and build artifacts.
- When there is a tradeoff, explain the simplest option, the alternative, and why the chosen option fits this version.
- Update the local milestone learning notes when work introduces a concept worth retaining.
- Mark a task complete only after its checkpoint is genuinely satisfied.

## Git and generated files

- Keep `node_modules/`, `.next/`, `out/`, test output, environment files, and TypeScript caches out of Git.
- Never commit secrets or local `.env` values. An intentionally safe `.env.example` may be committed.
- Keep commits focused and describe the outcome in the commit message.
- Do not manually edit generated build output.
