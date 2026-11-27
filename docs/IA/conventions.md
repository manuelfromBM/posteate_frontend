# Conventions
 
> **PROPOSAL** = a suggestion the team has not confirmed yet. **TO BE DEFINED** = pending
> decision.
 
## Language
 
| What                                                           | Language            |
|----------------------------------------------------------------|---------------------|
| Code: variables, functions, types, tables, columns, endpoints  | **English**         |
| Comments, documentation, commits and PR descriptions           | **English**         |
| User-facing text (UI, emails, notifications)                   | **Chilean Spanish** |
 
Use the glossary in `domain.md` to name domain concepts (`Post`, `Account`, `Category`,
`Commune`...). Do not invent synonyms: do not use `Listing`, `Ad` or `Publication` for a post.
 
### Naming — PROPOSAL
 
| Context                  | Style           | Example                       |
|--------------------------|-----------------|-------------------------------|
| SQL tables and columns   | `snake_case`    | `posts`, `expires_at`         |
| API JSON                 | `camelCase`     | `expiresAt`                   |
| API routes               | `kebab-case`, plural | `/posts`, `/category-proposals` |
| Go                       | Go conventions (`PascalCase` exported, `camelCase` internal) | `PostService`, `findByID` |
| TypeScript               | `camelCase`; types and components in `PascalCase` | `getPosts`, `PostCard` |
| Component files          | `PascalCase.tsx` + `PascalCase.module.css` | `PostCard.tsx` |
 
## Git
 
### Branches
 
```
main      ← production
  ▲
develop   ← integration
  ▲
feat/...  fix/...  docs/...  refactor/...  chore/...
```
 
- Work branches are created from `develop` and go back to `develop` through a PR.
- `develop` → `main` only for releases.
- Branch name: `type/short-description` in lowercase. Example: `feat/commune-filter`.
- **No** direct commits to `main` or `develop`.
### Commits
 
**Conventional Commits in English**, in the imperative mood and lowercase:
 
```
feat: add commune filter to search
fix: correct expiration date when renewing a post
docs: update rules for proposed categories
refactor: move attribute validation into the service
test: add integration tests for posts
chore: update dependencies
```
 
Allowed types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `perf`, `style`, `ci`.
 
### Pull requests
 
A PR can be merged only when it has:
 
1. **At least 1 approving review.**
2. **Tests passing in CI.**
3. **Lint and formatting passing.**
Also:
 
- A PR contains a single coherent change.
- The description is in English and explains what changes and why.
- If the change affects the domain, categories, principles or architecture, update `docs/IA/`
  in the same PR.
- If the API changes, state in the PR how it affects the other repository.
- If the PR assumes something about an item marked **TO BE DEFINED** in `docs/IA/`, say so
  explicitly in the description.
## Backend (Go)
 
### Formatting and linting
 
- `gofmt` is required.
- `golangci-lint` with no errors.
<!-- TODO: .golangci.yml with the enabled linters -->
 
### Code
 
- Follow the 4 layers per module: handler → service → repository → model. See
  `architecture.md`.
- Explicit error handling. No `panic` in business logic.
- Services receive their dependencies as interfaces.
- No SQL in handlers or services, and no business logic in repositories.
### Tests
 
| Type                         | What it covers                                                  | How                           |
|------------------------------|-----------------------------------------------------------------|-------------------------------|
| Service unit tests           | Business rules: statuses, validity, renewal, attribute validation, permissions | Mocked repositories |
| Integration with Postgres    | Repositories and real queries                                   | Real Postgres (PROPOSAL: testcontainers) |
| Handler tests (HTTP)         | Request/response, status codes, input validation                | `httptest` + Gin              |
 
Every business rule in `domain.md` must have at least one unit test in its service.
 
## Frontend (TypeScript)
 
### Formatting and linting
 
- **ESLint + Prettier**, using the configuration from the shared configs package.
  Until that package exists, Prettier is configured in the root `.prettierrc` (`printWidth: 100`).
- TypeScript in `strict` mode. No `any`.
### Code
 
- Styling with **CSS Modules**.
- Domain types and the API client are imported from the shared packages and are not redefined in
  the app.
- Public pages use SSR / Server Components (see `architecture.md`).
### Tests
 
| Type                  | Tool                                             |
|-----------------------|--------------------------------------------------|
| Unit / components     | Testing Library + **TO BE DEFINED:** Vitest or Jest |
| E2E                   | Playwright                                       |
 
**PROPOSAL:** have E2E tests at least for the core flows: publishing, searching with filters,
viewing a post's detail, contacting via WhatsApp and sharing.
 