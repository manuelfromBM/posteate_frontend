# Product: what Posteate is and why it exists
 
## In one sentence
 
> Local information already exists; the problem is that it is scattered.
 
Posteate is a **local information and listings platform**. It brings together in one place what
people currently share across Facebook, Instagram, WhatsApp, groups and forums. It is designed so
that **posting is simple, finding is fast and discovering feels natural**.
 
**It is not a social network.** It is a specialized space where local information can be found
quickly, in an organized and persistent way.
 
## The problem we solve
 
Someone who wants to sell something, rent out a place, offer a service, find a job, report a lost
pet or announce an event has to post across many channels. That causes several problems:
 
- Posts get buried quickly under new content.
- Old or specific information is hard to find.
- The search and filters on those platforms are not designed for this kind of information.
- Reach depends on followers, friends or belonging to certain groups.
- The same post has to be shared again and again on different channels.
- There is no clear way to show whether something is still valid.
- There is no central place to see what is happening, being offered or being sought in the
  community.
People who are searching also have to go through several platforms to find what they need.
 
## The solution
 
- You post **once**.
- The post can be found later through **search, categories, filters, location and
  recommendations**.
- Visibility does **not** depend on followers, groups or the first few hours after posting.
  **Relevance matters more than the size of the author's audience.**
- A post is **structured information** (price, location, category, status, date and attributes
  that depend on its type).
- The same post can appear in several contexts: search results, categories, recommendations and
  related content.
Core flow: **post → find → discover → contact**.
 
## Initial geographic scope
 
Posteate starts in **Melipilla and its surroundings**:
 
- **Melipilla province:** Melipilla, Curacaví, María Pinto, Alhué, San Pedro
- **Talagante province (partial):** Talagante, Padre Hurtado, Peñaflor
- **Coast:** San Antonio, Cartagena
Melipilla is the center of the strategy, and the other communes are in scope from day one. If the
model works, it will be replicated in other communes and cities.
 
## Who uses Posteate
 
| Role                          | What they do                                                     |
|-------------------------------|------------------------------------------------------------------|
| Visitor (no account)          | Views, searches and browses **everything**, including contact details. No account needed. |
| Registered person             | Publishes.                                                       |
| Business                      | Publishes with its own business profile.                         |
| Organization / institution    | Publishes with its own profile (municipality, neighborhood council, etc.). |
| Posteate team                 | Uploads local information that is public or provided by people and businesses, so the platform does not start empty. |
 
**An account is required only to publish.** Viewing and contacting are open to everyone.
 
## First stage (what is being built now)
 
- **Web only** (Next.js). The mobile app (Expo) comes later.
- Publishing with categories and type-specific attributes.
- Search and filters.
- A feed for discovering new posts.
- Business and organization profiles.
- **Contact through WhatsApp** (external link).
## Future stages (do not build yet)
 
These are planned but **not part of the first stage**. Do not build them unless explicitly
asked. Avoid decisions that would block them later.
 
- **Mobile app** with Expo / React Native.
- **In-app chat** to replace or complement WhatsApp.
- **Limited social features.** Posteate is still not a social network, but it may add some
  interaction between users later. Those features must never override the principle of relevance
  over audience.
- **Expansion** to other communes and cities.
## To be defined
 
- **Moderation:** it is not decided yet whether posts are reviewed before they go live, after the
  fact through reports, or depending on the category. Until then, do not assume a pre-approval
  flow, but keep the model ready to support one (see `domain.md`).
- **Business model:** not defined and not part of this stage. Do not add payments, featured
  posts or ads.
## What Posteate is NOT
 
- It is not another social network.
- It is not an endless feed of short-lived content.
- It is not a platform where whoever has the most followers wins.
 