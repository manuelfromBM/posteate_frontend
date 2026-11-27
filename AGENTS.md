Posteate — Instructions for AI agents

Posteate is a local information and listings platform for Melipilla and its surrounding communes (Chile). It is not a social network. People post once, and the post can be found later through search, categories, filters, commune and recommendations.

Core flow: post → find → discover → contact.

What to read for each task
If you are going to...	Read
Do any task (minimum context)	docs/IA/product.md
Model data, create endpoints, forms or types	docs/IA/domain.md
Work with categories, subcategories or user proposals	docs/IA/categories.md
Decide on features, UX, feed ordering or search	docs/IA/principles.md
Touch structure, dependencies, infrastructure or deploy	docs/IA/architecture.md
Write code, commits or PRs	docs/IA/conventions.md
Stack
Backend: Go + Gin, modular monolith (handler → service → repository → model), PostgreSQL, custom auth with JWT + refresh tokens, images in S3/R2. Deployed on Render.
Frontend: Turborepo + pnpm. First stage: web only (Next.js + TypeScript + CSS Modules, SSR). The Expo mobile app comes later. Web deployed on Vercel.
Backend and frontend live in separate repositories.
Commands
<!-- TODO: fill in with this repo's real commands -->
Install: ...
Development: ...
Tests: ...
Lint / format: ...
Fixed rules
Relevance over audience. Verification, account type, account age and popularity never give more visibility. Renewing a post does not bump it.
First stage only. Do not build the mobile app, in-app chat, social features, payments or ads unless explicitly asked. Also avoid decisions that would block them later.
Browsing requires no account. Searching, viewing, contacting (WhatsApp) and sharing are open to everyone. An account is required only to publish.
Communes and categories are data, not constants. Nothing in the code is tied to Melipilla. Users can propose categories.
Every post is structured information: it has a category, one or more communes, dates and a validity status. See docs/IA/domain.md.
Cursor-based pagination, never offset.
Everything is in English (code, comments, docs, commits, PRs) except user-facing text, which is Chilean Spanish.
Do not invent anything marked TO BE DEFINED in docs/IA/. Ask, or state your assumption explicitly in the PR. Anything marked PROPOSAL is a suggestion that is not confirmed yet.
What AI agents must NOT do

These restrictions apply even if a task seems to require breaking them. In that case, stop and ask a human.

Git
Do not push to or merge into main or develop.
Do not force push or rewrite history (push --force, rebase of shared branches, reset of published commits, commit --amend on pushed commits).
Do not create or delete remote branches.
Do not commit unless you are asked to. By default, leave changes in the working tree for a human to review.
Code and dependencies
Do not add, remove or upgrade dependencies without approval. This covers Go modules and npm/pnpm packages. Propose the dependency and explain why, then wait.
Do not change the API contract without flagging it. This includes routes, request or response fields, formats and status codes. If a change is needed, say so explicitly and describe the impact on the other repository.
Do not delete, skip or weaken tests to make them pass. If a test fails, fix the code or explain why the test is wrong and let a human decide.
Security
Do not read or modify .env files or any secrets (API keys, tokens, credentials, certificates). If you need a configuration value, ask for the variable name, not its value.
Keeping this documentation up to date

If a change modifies a domain rule, a category, a principle or an architecture decision, update the matching file in docs/IA/ in the same PR. When something marked TO BE DEFINED or PROPOSAL gets decided, replace it with the final decision.