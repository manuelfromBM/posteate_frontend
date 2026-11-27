# Architecture
 
> **TO BE DEFINED** = pending decision. Do not make it yourself: ask, or state your assumption
> in the PR. **PROPOSAL** = a suggestion the team has not confirmed yet.
 
## Overview
 
```
┌──────────────────────────┐        HTTPS/JSON        ┌──────────────────────────┐
│ Frontend (Turborepo)     │ ───────────────────────► │ Backend (Go + Gin)       │
│  apps/web  → Next.js     │                          │  Modular monolith        │
│  apps/mobile → Expo      │                          │  Deploy: Render          │
│  (future)                │                          └───────┬──────────┬───────┘
│  Web deploy: Vercel      │                                  │          │
└──────────────────────────┘                          ┌───────▼───┐ ┌────▼──────────┐
                                                      │PostgreSQL │ │ S3 / R2       │
                                                      │           │ │ (images)      │
                                                      └───────────┘ └───────────────┘
```
 
Backend and frontend live in **separate repositories**.
 
<!-- TODO: repository names / URLs -->
 
## Backend (Go + Gin)
 
### Style
 
**Modular monolith.** A single deployable service split into domain modules. Each module has
**4 layers**:
 
```
handler  →  service  →  repository  →  model
```
 
| Layer        | Responsibility                                                       | Must not                               |
|--------------|----------------------------------------------------------------------|----------------------------------------|
| `handler`    | HTTP (Gin): read the request, validate input, call the service, respond | Contain business logic or SQL       |
| `service`    | Business rules: statuses, validity, permissions, attribute validation | Know about Gin or write SQL           |
| `repository` | PostgreSQL access                                                    | Contain business rules                 |
| `model`      | Domain structs and types                                             | Depend on the other layers             |
 
Rules:
 
- Dependencies point **downward only** (handler → service → repository → model).
- A module does **not** use another module's repository. If it needs something from another
  module, it calls that module's service.
- Services receive their dependencies as interfaces, so they can be tested.
### Modules — PROPOSAL
 
| Module        | Contents                                                          |
|---------------|-------------------------------------------------------------------|
| `auth`        | Sign-up, login (email, Google, SMS/WhatsApp code), tokens         |
| `accounts`    | Person/business/organization accounts, profile, WhatsApp, verification |
| `posts`       | Posts, statuses, validity, renewal, feed                          |
| `categories`  | Categories, subcategories, user proposals, review                 |
| `communes`    | Commune catalog                                                   |
| `media`       | Image upload and management                                       |
| `curation`    | Posts uploaded by Posteate and claims                             |
| `search`      | Search and filters (see "Search")                                 |
 
<!-- TODO: confirm modules and the real folder structure -->
```
cmd/api/main.go
internal/
  posts/
    handler/
    service/
    repository/
    model/
  accounts/
  ...
  platform/        # PROPOSAL: shared config, db, logger, middlewares
```
 
### Database
 
- **PostgreSQL.**
- Category attributes: **PROPOSAL** to store them in a `JSONB` column validated by the service
  against the category configuration, with indexes for filterable attributes.
- Communes and categories are tables, not enums or constants.
- A post can have several communes, so the relationship is many-to-many.
- **TO BE DEFINED:** database access library (sqlc + pgx, GORM, plain pgx) and migration tool.
### Search — TO BE DEFINED
 
Options: PostgreSQL full-text search (`tsvector` with the Spanish configuration + `pg_trgm`) or a
separate engine (Meilisearch, Typesense). Whichever is chosen must follow `principles.md`:
ordering is by relevance, not audience, and renewing does not bump a post.
 
Until this is decided, keep search behind an interface in the `search` module. That way the
implementation can change without touching the rest.
 
### Pagination
 
**Cursor-based** for every list: feed, search, categories, an account's posts. Do not use
offset.
 
### Authentication
 
- **Custom implementation in Go.** No external auth service is used.
- Methods: email and password, Google (OAuth), code sent by SMS or WhatsApp.
- Session: **short-lived JWT access token + refresh token**.
- Passwords hashed with a secure algorithm (bcrypt or argon2). Never stored in plain text.
- **TO BE DEFINED:** provider for sending SMS/WhatsApp codes, where the web app stores the token
  (httpOnly cookie or memory), and how refresh tokens are revoked.
### Images
 
- Stored in **S3-compatible storage**: Amazon S3 or Cloudflare R2. **TO BE DEFINED:** which one.
- **PROPOSAL:** the frontend uploads directly to the bucket using presigned URLs generated by the
  backend. Images do not go through the Go server.
- The image limit and whether images are required are set by the category (see
  `categories.md`).
- **TO BE DEFINED:** resizing/optimization and accepted formats.
### API
 
- REST + JSON.
- **TO BE DEFINED:** versioning in the path (`/api/v1/...`).
- **TO BE DEFINED:** source of truth for the contract (OpenAPI generated from Go, hand-written
  OpenAPI, or hand-written types).
### AI for reviewing proposed categories
 
The AI suggests duplicates, merges and names, and **the team decides** (see `categories.md`).
**TO BE DEFINED:** provider and model, and whether it runs inline or in a separate process.
 
## Frontend (Turborepo + pnpm)
 
### Apps
 
| App           | Technology                              | Stage        |
|---------------|-----------------------------------------|--------------|
| `apps/web`    | Next.js + TypeScript + CSS Modules      | **First**    |
| `apps/mobile` | Expo / React Native + TypeScript        | Future       |
 
### Shared packages
 
| Package              | Contents                                        |
|----------------------|-------------------------------------------------|
| Types / domain       | Types for `Post`, `Account`, `Category`, etc.   |
| API client           | Functions to call the backend                   |
| Configs              | `tsconfig`, ESLint                              |
 
<!-- TODO: real package names (e.g. @posteate/types) -->
 
- Types and the API client are imported from the packages. They are **not** duplicated in the
  apps.
- UI components are **not** shared for now. Each app has its own.
### Web app structure (`apps/web`) — PROPOSAL
 
Layers depend only downward: `app` → `features` → `data` / `shared` → `domain`.
 
```
app/                    Next.js routes only: read params, render a feature page
src/
  domain/               Framework-agnostic types and pure rules (future types package)
  data/                 Repository interfaces + implementations (future API client package)
    repositories.ts     PostRepository, CatalogRepository
    index.ts            getRepositories(): the only place that picks mock vs HTTP (server-only)
    mock/               In-memory implementation and generated fixtures
  shared/               Cross-feature code with no domain logic: ui, hooks, lib, config
  features/<name>/      One folder per feature (search, posts...). Public API in index.ts
    components/  hooks/  lib/  server/  ...
```
 
- Routes import a feature only through its `index.ts`.
- Features never import mock data directly; they go through `getRepositories()`.
- Until the shared packages exist, `domain/` and `data/` live in the app and must stay free of
  Next.js and React imports so they can be moved as they are.
- Import alias: `@/` → `apps/web/src/`.
 
### Maps
 
- The search map uses the Google Maps JavaScript API, loaded with a script tag (no npm
  dependency). Public variables: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` and
  `NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID` (needed for advanced markers; `DEMO_MAP_ID` is used in
  development).
- Without an API key, or if Google Maps fails, the page shows a server-rendered schematic map.
- `turbo.json` passes `NEXT_PUBLIC_*` to the build so Next.js can inline them.
### Web rendering
 
- Public pages (post detail, categories, search, feed) use **SSR / Server Components**, so Google
  can index them and they preview well when shared on WhatsApp.
- Every post has a stable public URL with metadata (title, description, image) for SEO and share
  previews.
- Paused, expired and closed posts keep their URL and show "unavailable".
- **PROPOSAL:** the post URL is `/posts/{id}` (`postHref()` in `features/posts`). Unavailable
  posts are served with `noindex, follow` and hide the WhatsApp contact; posts that do not exist
  return 404.
- `NEXT_PUBLIC_SITE_URL` is the absolute base URL used for canonical and Open Graph URLs
  (`metadataBase`). It falls back to `http://localhost:3000`.
- **PROPOSAL (API contract):** posts include an optional `location` (`placeId`, `name`,
  `address`, `position: { lat, lng }`), and post search and the commune counts accept
  `withLocation=true` to return only posts that have one (used by the map view).
- **PROPOSAL (API contract):** post search accepts `sort=relevance|newest` (default
  `relevance`). `newest` orders by the original publication date only, so renewing never bumps a
  post. The search page's browsing carousels use it.
- **PROPOSAL (API contract):** the post detail needs `GET /posts/{id}` (any status, 404 when it
  does not exist) and `GET /posts/{id}/related?limit=` (active posts of the same category, same
  commune first, then newest; never by popularity).
## Deploy
 
| Component   | Platform       |
|-------------|----------------|
| Backend     | Render         |
| Web         | Vercel         |
| Database    | **TO BE DEFINED** (Render Postgres or another provider?) |
| Images      | S3 or R2       |
 
<!-- TODO: environments (dev/staging/prod), environment variables, CI/CD -->
 
## Recorded decisions
 
| Decision                                         | Reason                                               |
|--------------------------------------------------|------------------------------------------------------|
| Modular monolith, 4 layers per module            | Simple deployment with clear boundaries between domains |
| PostgreSQL                                       | Relational + JSONB for variable attributes           |
| Cursor-based pagination                          | Stable lists over constantly changing content        |
| Custom auth with JWT + refresh                   | Full control over login methods                      |
| Images in S3-compatible storage                  | Scalable and kept off the server                     |
| Web first, with SSR                              | SEO and share previews                               |
| Backend and frontend in separate repositories    | —                                                    |
| Communes and categories as data                  | Expand and create categories without a deploy        |
 