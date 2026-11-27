# Categories and subcategories
 
## General rules
 
- There are **two levels**: category and subcategory. A subcategory has exactly one parent.
- Each post has **one** category, plus a subcategory if applicable.
- **Any account type** can publish in any category. There are no restrictions by account type.
- Categories are **data**, not code constants. Creating, approving or merging a category must
  not require a deploy.
- The catalog **will grow**. The categories in this file are a starting point, not the final
  list. Do not assume in the code that the list is fixed.
## Initial categories
 
All of them are part of the first stage:
 
| Category (UI name in Spanish)      | English name                     | `slug`           |
|------------------------------------|----------------------------------|------------------|
| Compra y venta                     | Buy and sell                     | `marketplace`    |
| Arriendos y propiedades            | Rentals and real estate          | `real-estate`    |
| Vehículos                          | Vehicles                         | `vehicles`       |
| Empleos                            | Jobs                             | `jobs`           |
| Servicios                          | Services                         | `services`       |
| Eventos                            | Events                           | `events`         |
| Mascotas perdidas o en adopción    | Lost pets and pets for adoption  | `pets`           |
| Objetos perdidos y encontrados     | Lost and found                   | `lost-found`     |
| Promociones y negocios locales     | Local deals and businesses       | `local-business` |
| Avisos comunitarios                | Community notices                | `community`      |
| Noticias e información local       | Local news and information       | `news`           |
 
<!-- TODO: initial subcategories for each category -->
 
## Attributes per category — TO BE DEFINED (with the team)
 
It is not decided yet which fields each category has, its maximum validity, whether it has a
price, or how many images it allows and whether they are required. **Do not invent them.** Until
they are defined:
 
- Use only the **general fields** (see below).
- Keep the model ready for each category to define its own configuration.
### What each category defines (structure already decided)
 
| Setting              | Description                                                       |
|----------------------|-------------------------------------------------------------------|
| `attributes`         | List of category-specific fields: name, type, whether it is required and whether it is filterable |
| `hasPrice`           | Whether the category has a price and whether it is required       |
| `maxExpirationDays`  | **Maximum** validity. The author picks a validity within that maximum |
| `maxImages`          | Maximum number of images                                          |
| `imagesRequired`     | Whether at least one image is required                            |
 
Filterable attributes are stored in a queryable way. They are **not** stored as free text.
 
### General fields (every post)
 
Title, description, communes, sector, price (if the category allows it) and images. See
`domain.md`.
 
## User-proposed categories
 
Users can **propose new categories and subcategories**. The team reviews them.
 
### Category statuses
 
| Status      | Meaning                                         | Shown in menus and filters?        |
|-------------|-------------------------------------------------|------------------------------------|
| `proposed`  | Proposed by a user and pending review           | Yes, labeled **"new"** (UI: "nueva") |
| `approved`  | Reviewed and approved by the team               | Yes                                |
| `rejected`  | Rejected                                        | No                                 |
| `merged`    | Merged into another existing category           | No, redirects to the target category |
 
### How it works
 
1. A user cannot find a suitable category and **proposes a new one** while publishing.
2. **The post goes live immediately** with the proposed category. It does not wait for approval.
3. Fields that post has:
   - **Proposed subcategory:** inherits the attributes of its parent category.
   - **Proposed main category (no parent):** general fields only.
4. **Review:** an AI analyzes proposals and suggests duplicates, merges or better names. **The
   team makes the final decision.** The AI never approves, rejects or merges on its own.
5. When approving it, the team can add category-specific attributes.
### TO BE DEFINED
 
- What happens to posts in a **rejected or merged** category: do they move to a category the
  team picks, to the parent category, or must the author recategorize them?
- How to avoid duplicate proposals while they are pending. For example, by suggesting existing
  or already-proposed categories as the user types.
 