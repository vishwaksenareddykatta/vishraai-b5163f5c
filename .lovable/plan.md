## 1. Rebrand `/contact` as a simple "Get in Touch" form

- `src/routes/contact.tsx`: replace the 3-step "Request Intelligence Mapping" wizard with a single, clean contact form.
  - Hero heading → **"Get in Touch"**, subtitle → short line about reaching the team.
  - Page `head()` → title `"Get in Touch — Vishra AI"`, matching og tags.
  - Fields (single screen): Name, Work email, Company (optional), Message (textarea), Submit.
  - On submit → `apiPost("/api/contact", { ... source: "contact_page" })`.
  - Success state stays inside the page (✓ + "We'll reply within 24 hours").
- Keep the existing route path `/contact` so the Nav/Footer "Contact" link still works.

## 2. Contact submissions go ONLY to nexvarkindustries@gmail.com

- `server/src/routes/contact.js`: after saving to MongoDB, send a notification email via Resend.
  - `to: "nexvarkindustries@gmail.com"` (hard‑coded — this is the business inbox, not a per‑user value).
  - Subject: `New contact form submission — {name or email}`.
  - Body: all submitted fields, plus timestamp and source.
  - `reply_to: <submitter's email>` so replies go straight to them.
  - Remove the existing user‑facing confirmation email (per "submissions of that ONLY contact form should be sent to nexvarkindustries@gmail.com").
- `server/.env.example`: add `CONTACT_INBOX=nexvarkindustries@gmail.com` so it's overridable later, default already wired in code.
- `server/src/models/ContactSubmission.js`: relax `company` from required to optional, add `name` and `message` fields (the new form's primary inputs). Old fields (`workflows`, `stack`, `goals`, `scale`, `role`, `company_size`) stay in schema but become optional and unused by the new form.

## 3. Point every "Request Intelligence Mapping" CTA at `/discovery`

These currently link to `/contact` and must move:

| File | Line | Current | New |
|---|---|---|---|
| `src/routes/index.tsx` | 86–87 | `<Link to="/contact">Request Intelligence Mapping</Link>` | `<Link to="/discovery">` |
| `src/routes/index.tsx` | 239–240 | `<Link to="/contact">Book Intelligence Mapping</Link>` | `<Link to="/discovery">` |
| `src/routes/about.tsx` | 87 | `<Link to="/contact">` (RIM CTA) | `<Link to="/discovery">` |

Nav primary CTA and Pricing CTAs already point to `/discovery` — leave them.
Nav/Footer "Contact" link stays → `/contact` (that's the new Get in Touch page).

## 4. Fix the mobile menu in `src/components/site/Nav.tsx`

Current issues: text-only "Menu / Close" button, cramped dropdown, no CTA in mobile menu, links stacked tightly inside the rounded pill.

Plan:
- Replace text button with a proper **hamburger / X icon** (Lucide `Menu` / `X`), still inside a glass round button, with `aria-expanded` state.
- Open state: animated **full‑width glass panel** that drops below the pill (still inside the fixed header), with:
  - Each nav link as a large tappable row (min 48px height, generous padding, divider lines).
  - Active link highlighted with `bg-white/5` and primary glow.
  - The **"Request Intelligence Mapping"** CTA appears as a full‑width primary button at the bottom of the menu (it's currently hidden on mobile).
  - Tapping any link auto‑closes the menu (already wired) and the menu also closes on route change.
- Add smooth `transition` / `animate-in` (fade + slide‑down) for open/close.
- Lock body scroll while the mobile menu is open so the page behind doesn't scroll.

No changes to the desktop nav layout.

## 5. Out of scope (intentionally untouched)

- `/discovery` route, Razorpay flow, MongoDB `rim_submissions` — all stay exactly as built.
- Newsletter footer form — stays on Mongo via `/api/newsletter`.
- No new routes, no removal of existing routes.

### Technical notes
- Resend send call already exists in `server/src/lib/email.js`; just pass `reply_to` through (small signature extension).
- All edits are surgical line‑replaces — no file rewrites except the contact page body, which is a focused rewrite.
- After plan approval I'll verify by visiting `/contact`, `/`, `/about` in preview and resizing to mobile to confirm the new menu.