# Asset Inventory

All assets below live in `public/` and are public-safe (already shipped on the
live marketing site). Backend-only files, the patent PDF, presentations, and
sample data exports were **not** copied.

## ⚠️ `re-web-*.png` do not exist

The original brief referenced meal-card images named `re-web-1.png …
re-web-12.png`. **No `re-web-*.png` files exist in the source project**, and the
landing page does not reference them. The real meal-card / app-screenshot assets
are the numbered **JPGs** below. The brief's hero-rotation intent is preserved in
`CONTRACTOR_BRIEF.md`; map it onto these real files.

## Meal-card / app-screenshot images (real assets)

Referenced by `src/pages/PublicLandingPage.tsx`. The hero carousel rotates
through all of these; the "How it Works" steps reuse `9.jpg`, `3.jpg`, `2.2.jpg`.

    public/1.jpg     (carousel slide 1 + image-error fallback)
    public/2.1.jpg   (carousel slide)
    public/2.2.jpg   (carousel slide + how-it-works step 3)
    public/3.jpg     (carousel slide + how-it-works step 2)
    public/4.jpg     (carousel slide)
    public/5.jpg     (carousel slide)
    public/6.jpg     (carousel slide)
    public/7.jpg     (carousel slide)
    public/8.jpg     (carousel slide)
    public/9.jpg     (carousel slide + how-it-works step 1)
    public/10.jpg    (carousel slide)

## Brand banners + logo

    public/FIT Header.jpg   (header wordmark/logo; also used on privacy/terms)
    public/FIT Ribbon.jpg   (bottom brand ribbon)
    public/FIT Logo.jpg     (standalone logo, design source; not used inline)

## Project reference docs (added at owner's request)

Added so the developer has product/context reference. The owner explicitly
approved publishing these in the public repo, including the pitch deck's
confidential stamp and personal contact info.

    public/LifeClock_Presentation.pptx   (19-slide product/pitch deck + UI mockups)
    public/lifeclock_meal_history.xlsx   (sample meal-history export — no PII)

## Icons / PWA / legal

    public/icons/fit-icon-32.png    (favicon)
    public/icons/fit-icon-180.png   (apple-touch-icon)
    public/icons/fit-icon-192.png   (favicon / manifest)
    public/icons/fit-icon-512.png   (manifest)
    public/manifest.json            (PWA manifest)
    public/privacy.html             (footer "Privacy" link)
    public/terms.html               (footer "Terms" link)

## Recommended hero set (original brief intent)

The brief recommended `re-web-12 / re-web-2 / re-web-4 / re-web-8 / re-web-7`.
Translate to the real files by leading with the most appealing/positive
screenshots and confirming the order with the creator:

    Recommended (intent): lead with positive cards
    Lower-page / tradeoff examples: heavier cards last

Reorder the `SCREENSHOT_PATHS` array in `PublicLandingPage.tsx` to set the order.

## Intentionally excluded (not copied — not public-safe or not needed)

    patent.pdf                              (proprietary / IP)
    lifeclock_meals_history_download.pdf    (duplicate of the .xlsx export, in PDF)
    public/app/stripe/**                    (payment/backend bridge)
    FIT Web Page.png, fit-app-logo.png,     (unused by the landing page;
    logo.png, lifeclock_1024.png,            available on request)
    In App Icon.jpg
