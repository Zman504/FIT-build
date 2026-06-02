# FIT-build

Public-safe landing page contractor sandbox for FIT / LifeClock.

This repo is for front-end landing-page design and UI/UX polish only.

## Goal

Create a high-converting public landing experience for a nutrition app that
helps users log meals and get a Life Score — a simple meal-impact score based on
real nutrition data.

## Scope

Allowed:
- Improve the main public landing page
- Use provided meal-card assets in `public/`
- Add small supporting front-end components if needed
- Add a simple contact page component if needed
- Improve responsive layout, hero, CTA hierarchy, visual polish, and section order

Not allowed:
- No backend work
- No payment or Stripe work
- No Supabase/auth/database work
- No Rewardful/affiliate logic
- No API/secrets access
- No full app rebuild
- No new dependencies without approval

## Product positioning

Primary message:
Simple meal-impact tracking without diet-app bloat.

Core explanation:
Log a meal by photo, text, or voice. FIT / LifeClock gives you a Life Score and
shows what helped, what hurt, and why.

## CTA labels

Use:
- iPhone / Web Version
- Get now on Google Play

Do not change CTA destinations unless approved.

## Required disclaimer/footer

Keep:
- Nutrition awareness only — not medical advice.
- Division of SVG Holdings LLC

## Local commands

    npm install
    npm run dev
    npm run build

## Notes for this sandbox (read before starting)

- **Current code vs. brand direction.** The page in this repo currently ships
  with "F.I.T. — Food Impact Tracker" branding and uses "Food Impact" /
  "balance minutes" language with a single **"Try it"** CTA. The brand direction
  in `CONTRACTOR_BRIEF.md` ("LifeClock / Life Score", dual app-store CTAs) is the
  target to move toward. Treat the current page as the layout to polish and
  re-skin.
- **Asset names.** The brief references `re-web-*.png` meal-card images. Those
  filenames do **not** exist in the real project. The actual app screenshots are
  `public/1.jpg … 10.jpg` plus the `FIT *.jpg` banners. See `ASSET_INVENTORY.md`.
- **No tracking / CSP.** Production `index.html` carries marketing pixels,
  affiliate scripts, and a strict CSP. Those were stripped here on purpose — do
  not re-add them.
- `@vercel/analytics` is present only because `PublicLandingPage.tsx` calls a
  fire-and-forget `track()`; it no-ops locally. Leave it as-is.
