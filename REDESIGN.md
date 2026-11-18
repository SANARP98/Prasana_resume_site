# FDE portfolio redesign (branch `redesign/fde-portfolio`)

Positioning: **"The FDE who ships agentic AI into regulated enterprises, and also runs the platform under it."**

## What changed
- **Content moved into typed data files.** No content is hard-coded in JSX:
  - `data/profile.ts`: identity, positioning, hero metrics, the two halves, the FDE loop, education and languages
  - `data/experience.ts`: every role, with the original CV bullets kept verbatim in `responsibilities`, plus a new `aiAngle` line and `highlights` tagged `ai` / `platform`
  - `data/cases.ts`: the original case studies plus `track`, `headline` and `stack`. Adds two CV projects that weren't on the site before (self-balancing wheel, leaf identification). Re-exports `allExperiences` for backwards compatibility.
  - `data/skills.ts`: every skill category (moved out of `app/skills/page.tsx`), tagged by track
- **Design system:** CSS-variable tokens in `app/globals.css` and light/dark themes (follows the system, with a manual toggle and no flash on load). Two motifs: `tag-ai` (rounded, glowing, violet) and `tag-platform` (square, gridded, green). The blueprint grid appears in the hero only. Legacy `cream` / `darkGray` / `mediumGray` colours now map to the tokens, so `/admin` themes too.
- **Home page:** hero with count-up metrics, then Two halves, the FDE loop (auto-advancing, clickable, pauses on hover), filterable case studies, an experience timeline with an AI / Platform lens, the skill map, and study + contact.
- **/cases:** filter by half, plus a stack search. **/cases/[slug]:** Problem → What I built → Result, with a stack sidebar and KPIs from `kpis.json`.
- **/experience/[slug]:** FDE lens callout, KPI grid, highlights split by half, full responsibilities and prev/next links.
- **Chatbot (bottom right):** `POST /api/chat` with `{ message, history: [{role, content}] }`, expecting `{ reply: string }`. If the backend is missing or errors, it falls back to a local retriever over `lib/knowledge.ts`, which is generated from the data files. `knowledgeBase` (a string) is exported to use as the system context in the backend.
- **Kept as before:** `/js/track.js`, CV downloads from `/cv/*` with the download beacon, the `/admin` dashboard, and static export.
- **Accessibility and motion:** skip link, `MotionConfig reducedMotion="user"`, a CSS reduced-motion override, keyboard-operable tabs, menus and chat (Esc closes them), and no horizontal scroll at 390px.

## [TODO] before publishing
- [ ] Add a photo: set `profile.photo` in `data/profile.ts` (falls back to the "PR" monogram)
- [ ] Confirm `profile.location`
- [ ] Re-check every number: `heroMetrics` and `kpis.json` (recruiters check these)
- [ ] Export the FDE CV to PDF and drop it in `public/cv/` (it's listed automatically)
- [ ] Implement `/api/chat` in `backend/` (contract above)
