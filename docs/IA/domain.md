# Domain: entities, statuses and glossary
 
> Anything marked **TO BE DEFINED** is not decided yet. Do not invent it: ask, or state your
> assumption in the PR.
 
## Glossary
 
The left column is the term the team and the UI use in Spanish. The middle column is the name to
use in code.
 
| Spanish (UI / team)    | Name in code     | Description                                                   |
|------------------------|------------------|---------------------------------------------------------------|
| Publicación            | `Post`           | Core unit: something someone offers, is looking for or announces. |
| Categoría              | `Category`       | Main classification (Jobs, Rentals, Pets...).                 |
| Atributos              | `attributes`     | Category-specific fields (see `categories.md`).               |
| Comuna                 | `Commune`        | Commune (municipality) the post applies to.                   |
| Sector                 | `sector`         | Area or neighborhood within the commune.                      |
| Ubicación              | `location`       | Optional exact place picked in Google Maps.                   |
| Cuenta                 | `Account`        | Whoever logs in and publishes.                                |
| Tipo de cuenta         | `accountType`    | `person`, `business` or `organization`.                       |
| Publicación cargada    | `source=curated` | A post uploaded by the Posteate team on behalf of someone else. |
| Reclamar               | `claim`          | When the real owner takes control of a curated post.          |
 
## Accounts (`Account`)
 
There are three account types, and **each one is independent**, with its own login:
 
| Type           | `accountType`  | Example                                  |
|----------------|----------------|------------------------------------------|
| Person         | `person`       | Juan Pérez                               |
| Business       | `business`     | Ferretería Juan                          |
| Organization   | `organization` | Municipality, neighborhood council       |
 
- A person does **not** manage a business from their personal account. The business has its own
  account.
- **Verification:** `business` and `organization` accounts can be verified. A verified account
  shows a badge. **TO BE DEFINED:** how verification works and who does it.
- **Login:** email and password, Google, or phone with a code sent by SMS or WhatsApp.
- **Contact WhatsApp number:** stored on the account profile and used by all of the account's
  posts.
- **PROPOSAL — contact email (optional):** also stored on the profile and used by all of the
  account's posts. It is a separate field from the login email, which is never shown publicly.
  When it is empty, no email contact is offered.
- The Posteate team has an internal role for uploading posts on behalf of other people (see
  "Posts uploaded by Posteate").
**An account is needed only to publish.** Viewing, searching, contacting and sharing require no
account.
 
## Post (`Post`)
 
Required fields:
 
- `id`
- `title`: short and searchable
- `description`
- `category`: exactly one category, plus a subcategory if applicable. It can be a user-proposed
  category that is not approved yet (see `categories.md`).
- `communes`: **one or more** communes. Example: a service covering both Melipilla and Talagante.
- `status`: see statuses below
- `publishedAt`
- `expiresAt`: chosen by the author, never beyond the category maximum (`maxExpirationDays`)
- `account` (author), or `source=curated` with its source data for a curated post
Optional or category-dependent fields:
 
- `sector`: area or neighborhood.
- `location`: an exact place picked in Google Maps (`placeId`, `name`, `address`, `position` with
  `lat`/`lng`). Optional for **every** category. It does not replace `communes`, which are always
  required: communes are what search, filters and the commune counts use. Warning the author about
  the risks of sharing a location (for example, a home address) depends on the category and is the
  publish form's job.
- `price`: see "Price".
- `images`: the maximum number and whether they are required depend on the category (see
  `categories.md`).
- `attributes`: category-specific fields.
### Price
 
Two forms, both in **CLP**:
 
- **Fixed amount:** `{ type: "fixed", amount }`
- **Range:** `{ type: "range", min, max }`. Useful for services and salaries.
There is no "negotiable" or "free" option. If a category has no price, the field is not shown.
 
## Statuses (`status`)
 
```
              ┌──────────┐
   create ──► │  active  │ ◄──── renew ─────┐
              └──────────┘                  │
               │   ▲    │                   │
         pause │   │    │ expiresAt         │
               ▼   │    │ reached           │
          ┌────────┐    ▼                   │
          │ paused │  ┌─────────┐           │
          └────────┘  │ expired │ ──────────┘
                      └─────────┘
   active / paused ──► closed   (sold, rented, found, position filled)
```
 
| Status    | Meaning                                  | Shown in search and feed? | Does the link work?        |
|-----------|------------------------------------------|---------------------------|----------------------------|
| `active`  | Visible and valid                        | Yes                       | Yes                        |
| `paused`  | Temporarily hidden by the author         | No                        | Yes, shown as "unavailable" |
| `expired` | Validity period ended; the author can renew it | No                  | Yes, shown as "unavailable" |
| `closed`  | Fulfilled its purpose                    | No                        | Yes, shown as "unavailable" |
 
- There are **no drafts** in this stage. A post is created directly as `active`.
- A `paused`, `expired` or `closed` post is **never deleted** because of that status. Its link
  keeps working and shows that it is no longer available.
- Renewing brings the post back to `active` with a new `expiresAt`, which the author again
  chooses within the category maximum.
- There is **no renewal limit** in this stage. One may be added later.
## Posts uploaded by Posteate (`source=curated`)
 
So the platform does not start empty, the Posteate team uploads posts from other people or
businesses. Example: a rental seen in a Facebook group.
 
- They are labeled in the UI as **"Uploaded by Posteate"** (UI text in Spanish: "Cargada por
  Posteate").
- They store where the information came from.
- Since they have no author account, **they store their own contact WhatsApp number** on the
  post. This is the only exception to the rule that the WhatsApp number comes from the profile.
  The same applies to the optional contact email (PROPOSAL).
- **Claiming:** the real owner can claim the post. Once the claim is approved, the post moves to
  their account and is no longer shown as uploaded by Posteate. **TO BE DEFINED:** how to verify
  that the claimant is the real owner.
## Communes
 
Initial scope (see `product.md`): Melipilla, Curacaví, María Pinto, Alhué, San Pedro, Talagante,
Padre Hurtado, Peñaflor, San Antonio and Cartagena.
 
- Communes are **data**, not code constants. Adding one must not require a deploy.
- Search, filters and the feed can be filtered by one or more communes.
- **PROPOSAL:** each commune stores an approximate `center` (`lat`, `lng`), used to frame the
  map and place the commune pins with their count.
- The search map lists **only posts with a `location`**, and its commune counts count only those.
  Posts without a location still appear everywhere else (list, carousels, detail). Placing each
  post at its own position on the map is pending (Google Maps setup).
## What people who are searching can do (first stage)
 
- View, search, filter and browse.
- Contact through **WhatsApp** (external link with the author's number), or by **email**
  (`mailto:` link) when the author entered a contact email (PROPOSAL). Unavailable posts hide
  both.
- **Share** through a link or WhatsApp.
There are no favorites, reports, comments or chat in this stage.
 
## Moderation — TO BE DEFINED
 
It is not decided whether posts are reviewed before going live, after, or depending on the
category. Until then, do not build a pre-approval flow, and do not make model decisions that
would prevent adding one later.
 