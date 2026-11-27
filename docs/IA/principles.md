# Product principles (for making decisions)
 
Use these when you have to choose between two implementations or when a feature is not
specified. If a decision conflicts with these principles, ask before implementing it.
 
## 1. Post once, find always
 
As long as a post is valid, it must be findable. Nothing should make it disappear just because
newer content arrived.
 
## 2. Relevance over audience
 
This is the most important principle. The ordering of search, the feed and recommendations is
based on:
 
- match with the query
- category and applied filters
- selected commune or communes
- recency (original publication date)
- information quality: complete, with photos, with a price when applicable
It is **not** based on followers, friends, popularity or the author's account type. A new account
gets the same visibility as an old one.
 
Concrete rules that follow from this principle:
 
- **Verified accounts:** verification shows a badge and does **not** rank a post higher.
- **Posts uploaded by Posteate:** ranked with the same rules as users' posts.
- **Renewing does not bump a post.** A renewed post keeps its original publication date for
  ordering purposes. That way renewing cannot be used to bump a post.
## 3. Feed: a relevance mix
 
The default feed is **not** purely chronological. It combines recency, information quality and
the communes the viewer selected. Since viewing requires no account, communes come from the
visitor's selection, not from a profile.
 
<!-- TODO: define the concrete weights / ranking formula -->
 
## 4. Structured information
 
If a piece of data is useful for searching or filtering, it is collected as a structured field
and not left inside the description. The fields shown depend on the category, so the form does
not become heavy.
 
## 5. Posting must be simple
 
The form asks for the minimum needed for the post to be useful, and optional fields stay in the
background. If you cannot find a suitable category, you can propose one without leaving the
publishing flow (see `categories.md`).
 
## 6. Finding must be fast
 
Search and filters are the core of the product, not an extra. Any change that makes them slower
or less accurate needs a very good reason.
 
## 7. Discovering must feel natural
 
Besides searching, people can browse: what is new in the selected communes, what is related to
what they are viewing, upcoming events.

**PROPOSAL:** the first page of the search list shows browsing carousels that adapt to the
current search (text, categories and communes are kept in every carousel):

- "Lo más reciente": newest first, within the current search.
- One carousel per category, in catalog order: all listed categories when none is picked, or the
  picked ones when there are several.
- Once a category is picked, one carousel per commune ("Eventos en Melipilla"): the picked
  communes when there are several, or otherwise the communes with the most matching results.

Carousels with fewer than 3 posts are hidden, and nothing is shown when only "Lo más reciente"
would remain. They are ordered only by relevance or recency. There are no "featured" or "most
shared" sections, because those would rank by popularity or payment (see anti-patterns).
 
## 8. No barriers for people searching
 
Viewing, searching, filtering, contacting and sharing **require no account**. An account is
needed only to publish.
 
## 9. Validity is visible
 
People must be able to tell whether something is still available. Paused, expired and closed
posts do not appear in results, but their link keeps working and shows that they are no longer
available.
 
## 10. Local first, replicable later
 
Everything is designed for Melipilla and its surroundings, but without depending on those
communes in the code.
 
## 11. Transparency with content uploaded by Posteate
 
What the team uploads is labeled as such, and its real owner can claim it.
 
## 12. A focused first stage
 
Build only what belongs to the first stage (see `product.md`). Future work is taken into account
so it is not blocked, but it is **not built** unless requested.
 
## Anti-patterns (do not do without approval)
 
- An endless feed ranked by engagement (likes, views, clicks).
- Followers or friends as a reach mechanism.
- More visibility based on account type, verification or account age.
- Letting renewing or editing bump a post in the ordering.
- Hiding older posts that are still valid.
- Requiring an account to view, search or contact.
- Payments, featured posts or ads. The business model is not defined.
- Social features (comments, reactions, following) in the first stage.
- Letting an AI approve, reject or merge categories without a team decision.
 