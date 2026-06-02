import { useEffect, useState, type SyntheticEvent } from 'react';
import { track } from '@vercel/analytics';
import { UserCircle, FileSpreadsheet } from 'lucide-react';

// Auth/sign-in lives at the in-app /login route.
const LOGIN_URL = '/login';
const SCREENSHOT_PATHS = [
  '/1.jpg',
  '/2.1.jpg',
  '/2.2.jpg',
  '/3.jpg',
  '/4.jpg',
  '/5.jpg',
  '/6.jpg',
  '/7.jpg',
  '/8.jpg',
  '/9.jpg',
  '/10.jpg',
];

// "How F.I.T. Works" below-the-fold steps. Images are existing public/ screenshots.
const HOW_IT_WORKS_STEPS = [
  {
    n: '1',
    heading: 'Log your meal',
    body: 'Enter what you ate with text, photo, voice, or barcode.',
    img: '/9.jpg',
    alt: 'Logging a meal in F.I.T. with text, photo, voice, and quick logging tools',
  },
  {
    n: '2',
    heading: 'See your Food Impact',
    body: 'F.I.T. converts nutrition quality into simple balance minutes so you can see whether a meal supports or works against your day.',
    img: '/3.jpg',
    alt: 'F.I.T. meal analysis showing your Food Impact for a logged meal',
  },
  {
    n: '3',
    heading: 'Balance your next choice',
    body: 'Use nutrient drivers to choose your next meal or activity and keep your day moving back toward balance.',
    img: '/2.2.jpg',
    alt: 'Daily Food Impact summary with meal image, contributors, and meal history',
  },
];

// Carousel timing: one dominant screenshot held ~5.5s, then a smooth ~0.75s slide.
const SLIDE_INTERVAL_MS = 5500;
const SLIDE_TRANSITION_MS = 750;

// Web-only campaign source for analytics. Reads ?src= from the current URL.
// Returns 'direct' when absent and 'unknown' when there is no window (SSR-safe).
const getCampaignSource = () => {
  if (typeof window === 'undefined') return 'unknown';
  return new URLSearchParams(window.location.search).get('src') || 'direct';
};

const appendSearchParams = (baseUrl: string, search: string) => {
  if (!search) {
    return baseUrl;
  }

  const normalizedSearch = search.startsWith('?') ? search.slice(1) : search;
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}${normalizedSearch}`;
};

export function PublicLandingPage() {
  const search = window.location.search;
  // CTA routes to the auth/sign-up screen at /login, preserving campaign params.
  const webAppUrl = appendSearchParams(LOGIN_URL, search);
  const campaignSrc = getCampaignSource();

  // Simple crossfade carousel: every slide is always mounted, only opacity
  // changes. activeIndex stays in range via modulo, so the frame can never end
  // up on an empty/clone slide or scroll off-screen (no blank phone).
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Fire-and-forget landing-page view event (web-only, src metadata only).
  useEffect(() => {
    track('go_visit', { src: campaignSrc });
  }, [campaignSrc]);

  // Respect the user's reduced-motion preference (disables auto-rotation).
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener?.('change', update);
    return () => media.removeEventListener?.('change', update);
  }, []);

  // Auto-advance unless paused (hover/focus) or reduced-motion is requested.
  useEffect(() => {
    if (reducedMotion || paused) return;
    const id = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SCREENSHOT_PATHS.length);
    }, SLIDE_INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, paused]);

  // If an image fails to load, fall back to the first screenshot rather than
  // leaving a blank phone frame (guard against an error loop on that fallback).
  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    if (img.src.endsWith(SCREENSHOT_PATHS[0])) return;
    img.src = SCREENSHOT_PATHS[0];
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-b from-white via-blue-50/50 to-blue-100/60 text-slate-900">
      {/* Decorative background — faint navy sweep arcs + soft corner accents, behind content. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
        >
          <defs>
            <linearGradient id="lc-navy-arc" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#0f172a" stopOpacity="0" />
              <stop offset="0.5" stopColor="#0f172a" stopOpacity="0.08" />
              <stop offset="1" stopColor="#0f172a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g style={{ filter: 'blur(0.5px)' }}>
            {/* Faint navy sweep arcs — premium geometry, not a literal clock. */}
            <path d="M -60 250 A 1500 1500 0 0 1 1260 200" stroke="url(#lc-navy-arc)" strokeWidth="2" />
            <path d="M -60 300 A 1700 1700 0 0 1 1260 250" stroke="url(#lc-navy-arc)" strokeWidth="1.25" />
            <path d="M -60 640 A 1700 1700 0 0 0 1260 720" stroke="url(#lc-navy-arc)" strokeWidth="1.25" />
          </g>
        </svg>
        {/* Soft navy depth + pale blue corner glows (top-left, bottom-right only). */}
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-slate-900/[0.04] blur-3xl" />
        <div className="absolute -left-32 -top-32 h-[26rem] w-[26rem] bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.18),transparent_65%)] blur-2xl" />
        <div className="absolute -right-32 -bottom-32 h-[26rem] w-[26rem] bg-[radial-gradient(circle_at_bottom_right,rgba(96,165,250,0.18),transparent_65%)] blur-2xl" />
        <div className="absolute left-1/3 top-1/4 h-72 w-72 rounded-full bg-blue-300/15 blur-3xl" />
      </div>

      {/* Hero block keeps filling the first viewport; new sections flow below it. */}
      <div className="flex min-h-screen flex-col">
      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex flex-col items-center">
          {/* FIT Header asset carries the full F.I.T. wordmark + icon — no separate text. */}
          <img
            src="/FIT%20Header.jpg"
            alt="F.I.T. Food Impact Tracker"
            className="h-[72px] w-auto object-contain sm:h-[84px]"
          />
          {/* Small subtle sub-label, matching the auth page logo treatment. */}
          <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500 sm:text-xs">
            POWERED BY AI
          </span>
        </div>
        <a
          href={LOGIN_URL}
          aria-label="Sign in to F.I.T."
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-600 hover:shadow-md"
        >
          <UserCircle className="h-6 w-6" />
        </a>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-6 py-10">
        <section className="grid w-full items-center gap-4 lg:grid-cols-2 lg:gap-8">
          <div className="order-2 max-w-xl space-y-8 text-center lg:order-1 lg:text-left">
            <div className="space-y-3">
              <p className="text-base font-semibold uppercase tracking-[0.25em] text-blue-600">
                NUTRITION COMPANION
              </p>
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Measure nutrition quality,
                <br />
                not just calories.
              </h1>
              <p className="text-lg font-semibold text-blue-600 sm:text-xl">
                Get your F.I.T. on!
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <a
                href={webAppUrl}
                onClick={() => track('web_click', { src: campaignSrc })}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-blue-600 px-9 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-300/60 transition hover:bg-blue-700"
              >
                Try it
              </a>
            </div>
          </div>

          <div className="order-1 flex justify-center lg:order-2 lg:justify-center">
            {/* One-phone-width carousel takes the place of the reference phone mockup. */}
            <div className="w-full max-w-[300px]">
              <div className="overflow-hidden rounded-[2.5rem] border-[10px] border-slate-900 bg-slate-900 shadow-2xl shadow-blue-300/50">
                <div
                  className="relative h-[58vh] max-h-[560px] min-h-[380px] overflow-hidden rounded-[1.75rem] bg-white outline-none ring-blue-400/60 focus-visible:ring-2"
                  role="group"
                  aria-roledescription="carousel"
                  aria-label="F.I.T. app screenshots"
                  tabIndex={0}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  onFocus={() => setPaused(true)}
                  onBlur={() => setPaused(false)}
                >
                  {SCREENSHOT_PATHS.map((src, slideIndex) => (
                    <img
                      key={src}
                      src={src}
                      alt="F.I.T. app screenshot"
                      onError={handleImageError}
                      aria-hidden={slideIndex === activeIndex ? undefined : true}
                      className={`absolute inset-0 h-full w-full bg-white object-contain transition-opacity ease-in-out ${
                        slideIndex === activeIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                      style={{
                        transitionDuration: reducedMotion ? '0ms' : `${SLIDE_TRANSITION_MS}ms`,
                      }}
                      loading={slideIndex === 0 ? 'eager' : 'lazy'}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom brand ribbon — Focused Nutrition / Meal Impact / Training Balance / Better You. */}
      <section className="relative z-10 mx-auto w-full max-w-[928px] px-6 pb-8">
        <img
          src="/FIT%20Ribbon.jpg"
          alt="Focused Nutrition, Meal Impact, Training Balance, Better You"
          className="mx-auto w-full max-w-[864px] object-contain"
        />
      </section>
      </div>

      {/* Nutrition companion — narrative bridge between the hero and the 1-2-3 flow. */}
      <section className="relative z-10 mx-auto w-full max-w-3xl px-6 pt-12 sm:pt-16">
        <div className="rounded-3xl border border-blue-100 bg-white/70 px-6 py-10 text-center shadow-sm backdrop-blur-sm sm:px-10">
          <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-blue-500/70" />
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Your nutrition companion
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg font-medium text-slate-600">
            See the impact behind your meals, then choose what to do next.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-slate-600">
            Most trackers show calories and macros. F.I.T. helps you understand what your
            meal is doing for your day — the nutrients that support you, the choices that
            may need balance, and the next step that keeps you moving in the right direction.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-medium text-slate-500">
            No complicated diet plan. No calorie-only guessing. Just clear Food Impact you can use.
          </p>
        </div>
      </section>

      {/* Spreadsheet export callout — compact card between the companion card and the 1-2-3 flow. */}
      <section className="relative z-10 mx-auto w-full max-w-2xl px-6 pt-8">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-blue-100 bg-white/70 px-6 py-6 text-center shadow-sm backdrop-blur-sm sm:flex-row sm:gap-5 sm:text-left">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <FileSpreadsheet className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
              Spreadsheet export
            </p>
            <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
              Track more than the moment
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Download your meal history, ingredients, macro and micronutrients, Food Impact, and
              key drivers as a spreadsheet whenever you want a deeper look.
            </p>
          </div>
        </div>
      </section>

      {/* How F.I.T. Works — below-the-fold instructional 1-2-3 flow. */}
      <section className="relative z-10 mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How F.I.T. Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Food Impact turns each meal into simple balance minutes. Positive minutes show choices that
            support your day. Negative minutes highlight meals that may need a better next choice, more
            activity, or balance later.
          </p>
        </div>

        <div className="mt-14 space-y-16">
          {HOW_IT_WORKS_STEPS.map((step) => (
            <div key={step.n} className="flex flex-col items-center text-center">
              <span className="text-5xl font-bold leading-none text-blue-600">{step.n}</span>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
                {step.heading}
              </h3>
              <p className="mt-2 max-w-md text-slate-600">{step.body}</p>
              <img
                src={step.img}
                alt={step.alt}
                loading="lazy"
                className="mt-6 w-full max-w-[320px] rounded-3xl border border-slate-200 shadow-lg shadow-blue-100/60"
              />
            </div>
          ))}
        </div>

        {/* Single CTA — same destination + analytics as the hero CTA. */}
        <div className="mt-16 text-center">
          <a
            href={webAppUrl}
            onClick={() => track('web_click', { src: campaignSrc })}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-blue-600 px-9 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-300/60 transition hover:bg-blue-700"
          >
            Try it
          </a>
        </div>
      </section>

      <footer className="relative z-10 border-t border-slate-200/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-sm text-slate-500 sm:flex-row">
          <p className="text-xs text-slate-400">
            © 2025 LifeClock, a division of SVG Holdings LLC. F.I.T. Food Impact Tracker. All rights reserved. Patent pending. U.S. Provisional Application No. 63/943,767.
          </p>
          <div className="flex items-center gap-4">
            <a href="/privacy.html" className="hover:text-slate-700">
              Privacy
            </a>
            <a href="/terms.html" className="hover:text-slate-700">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
