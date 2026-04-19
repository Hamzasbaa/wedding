# Design Direction — mariameandhamza.com

North Star for Phase 2 implementation. Derived from the top-design skill's Seven Pillars, calibrated for a wedding invitation (not an Awwwards portfolio — aiming 9/10, not 10/10 everywhere).

## 1. Concept

**Context:** The civil wedding already happened April 11, 2026 at the Mairie du 11e arrondissement in Paris. November 14, 2026 in Casablanca is the _celebration_ — where la Dada, Mariame's grandmother, and Hamza's father can finally be part of the day.

**BRAND ESSENCE:** _Retrouvailles._ Reunion. The people who couldn't travel in April come together in November. The invitation carries that weight.

**VISUAL CONTINUITY:** A physical invitation card was already used for the civil wedding — classical French serif, blush ampersand, centered stack (_Mariame / & / Hamza_), `بسم الله الرحمن الرحيم` as the opener, hairline dividers, "ont la joie de vous convier" phrasing. The website must _extend_ this aesthetic, not reinvent it. Guests who came to Paris should recognize the language when they open the Casablanca invite.

**VISUAL TENSION:** Two scripts in dialogue. French classical serif ↔ Arabic calligraphy. The site holds both with equal weight, never hiding one behind a toggle afterthought. Secondary tension: architectural typography (viewport-filling names) ↔ intimate hand-drawn details (wax seal, floral accents, monogram).

**SIGNATURE MOMENT (the thing people screenshot):** The envelope-open. Tap the wax seal, the monogram splits — H falls left, ﻢ falls right — the envelope unfolds, and "Mariame & Hamza" reveals itself letter by letter at viewport-filling scale, with a gold under-line drawing beneath the blush ampersand. Language switching re-performs a gentle fold-and-reveal, so the two scripts feel like two sides of the same letter.

**TECHNICAL AMBITION:** Bilingual, genuinely. Arabic isn't an afterthought — the type pairings are chosen for both scripts, the language toggle is a designed moment (not a toggle button), and the layout flips with grace.

**VOICE:** Their actual voice, not generic wedding prose. Witty, specific, self-deprecating, tender. Reference points from how Hamza talks about Mariame (from the Joëlle-Morel responses):
- Mariame solaire and expressive, Hamza discret and direct — they complete and lift each other
- 292 days without doubt
- Mariame talking through every movie, Hamza bribing her for silence
- Hamza sells dreams in marketing, Mariame checks we can afford them
- Preference: understated French humor, not flowery declarations

## 2. Palette (confirmed)

| Token | Hex | Use |
|---|---|---|
| `--color-paper` | `#FAF7F2` | Background — warm off-white, not sterile |
| `--color-blush` | `#E8C7C3` | Accent — aged rose, for ampersand, underlines, illustrations |
| `--color-ink` | `#3D2E35` | Primary text — deep plum, intimate but high-contrast |
| `--color-ink-soft` | `#3D2E3599` | Secondary text (60% ink) — captions, meta |
| `--color-gold` | `#C9A66B` | Rare accent — monogram, wax seal outline only |
| `--color-line` | `#3D2E3519` | Hairline dividers (10% ink) |

No pure black. No pure white. No grey fills. Opacity-based variants only.

## 3. Typography (LOCKED via web-typography skill)

Primary constraint: _match the civil wedding invitation's typographic language_ (Garamond-family classical French serif). The web version extends the card, does not replace it.

### The four faces

| Role | Family | Use | Weight(s) |
|---|---|---|---|
| Latin display | **Cormorant Garamond** | Names, section headings | 600 (SemiBold) |
| Latin body | **Cormorant Garamond** | Body, meta, small caps | 400 (Regular), 500 (Medium) for emphasis |
| Arabic display | **Aref Ruqaa** | Names in AR mode, section headings | Regular + Bold |
| Arabic body + invocation | **Amiri** | Body + `بسم الله الرحمن الرحيم` | Regular + Bold |
| Script accent | **Parisienne** | Monogram on wax seal ONLY | Regular — one use |

Rationale — why this pairing actually works:
- Cormorant Garamond SemiBold (not Regular) at display solves the "anemic hairline beside heavy Arabic" risk. Garamond DNA preserved, stem weight carries at 200+px.
- Aref Ruqaa shares classical/calligraphic DNA with Cormorant's book-serif heritage — they read as two siblings of the same tradition, not a clash.
- Amiri is the canonical face for the `بسم الله` opener and matches Cormorant's calm body rhythm.
- No fourth Arabic font. Invocation and body use Amiri, just at different sizes.

### Type scale (locked)

```css
/* Fluid scale using clamp() */
--fs-display:   clamp(5rem, 22vw, 16rem);     /* 80px → 22vw → 256px — the names */
--fs-section:   clamp(2rem, 6vw, 5rem);       /* 32 → 6vw → 80 */
--fs-body-lg:   clamp(1.125rem, 1vw, 1.25rem);/* 18–20px — hero subtext, lead */
--fs-body:      1.125rem;                     /* 18px — story, schedule */
--fs-meta:      0.75rem;                      /* 12px, small caps, letter-spaced 0.2em */
--fs-monogram:  2.5rem;                       /* 40px — Parisienne on wax seal */
--fs-invocation: 1rem;                        /* 16px — بسم الله... always visible */

/* Line height */
--lh-display: 1.02;     /* tight at huge sizes */
--lh-section: 1.15;
--lh-body:    1.65;     /* Latin */
--lh-body-ar: 1.75;     /* Arabic — taller ascenders + diacritics need more room */

/* Tracking */
--tracking-display: -0.035em;  /* Latin only — NEVER apply to Arabic */
--tracking-meta:    0.2em;     /* small caps, letter-spaced */
```

Scale ratio display:body = 256:18 = **14:1** at max. Passes the skill's 10:1 minimum.

### Self-hosting via Fontsource

No Google Fonts CDN. Self-host via `@fontsource` npm packages — pre-subsetted, versioned, zero third-party DNS, no FOIT.

```bash
pnpm add @fontsource/cormorant-garamond @fontsource/amiri @fontsource/aref-ruqaa @fontsource/parisienne
```

Import strategy (in `src/main.tsx` or a dedicated `src/styles/fonts.ts`):
```ts
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/600.css'
import '@fontsource/amiri/400.css'
import '@fontsource/amiri/700.css'
import '@fontsource/aref-ruqaa/400.css'
import '@fontsource/aref-ruqaa/700.css'
import '@fontsource/parisienne/400.css'
```

Fontsource ships `font-display: swap` by default — correct for our use.

### Preload strategy

Preload only the critical faces for first paint. In `index.html`:
```html
<!-- French mode: Cormorant Garamond 600 is the hero name face. Preload both subsets. -->
<link rel="preload" as="font" type="font/woff2" crossorigin
      href="/fonts/cormorant-garamond-latin-600-normal.woff2" />
<link rel="preload" as="font" type="font/woff2" crossorigin
      href="/fonts/amiri-arabic-400-normal.woff2" />
```

Copy the two files from `node_modules/@fontsource/.../files/` into `public/fonts/` at build time, or use a Vite plugin. Simpler: copy once, commit.

### CSS system

```css
/* Latin stack */
--font-serif: 'Cormorant Garamond', 'Hoefler Text', Georgia, serif;
--font-script: 'Parisienne', 'Apple Chancery', cursive;

/* Arabic stack — Geeza Pro is the macOS/iOS system Arabic, best fallback */
--font-arabic-display: 'Aref Ruqaa', 'Amiri', 'Geeza Pro', 'Noto Naskh Arabic', serif;
--font-arabic-body: 'Amiri', 'Geeza Pro', 'Noto Naskh Arabic', serif;

body { font-family: var(--font-serif); }
html[dir='rtl'] body { font-family: var(--font-arabic-body); line-height: var(--lh-body-ar); }

.display { font-family: var(--font-serif); font-weight: 600; letter-spacing: var(--tracking-display); }
html[dir='rtl'] .display { font-family: var(--font-arabic-display); letter-spacing: normal; }
```

### Gotchas on mixing Latin + Arabic

- **Never apply negative tracking to Arabic.** Compresses glyphs, makes it unreadable. CSS above handles this via `html[dir='rtl']` override.
- **Line-height needs +0.1** in Arabic (1.75 vs 1.65) for the taller ascenders and diacritics on the invocation.
- **Numerals: Western (0-9) in both languages.** Modern Moroccan convention. Consistent, avoids guests confused by Arabic-Indic digits (٠-٩).
- **Ampersand (&) is Latin-only.** In Arabic the connector is "و" (see existing `ar.json`).
- **Diacritics on بسم الله:** Keep the shadda/fatha marks — they're part of the traditional rendering. Amiri handles them beautifully.
- **Fontsource Amiri ships two weights** (400, 700). That's enough — don't chase a third.

**Scale:** 10:1 minimum between display and body.
- Hero name: `clamp(4rem, 22vw, 18rem)` — viewport-filling on desktop
- Section headings: `clamp(2rem, 6vw, 5rem)`
- Body: `1.125rem / 1.65` (18px generous leading)
- Meta / small caps: `0.75rem` letter-spacing 0.2em uppercase

**Tracking:** -0.035em on display Latin. Arabic gets its natural tracking (don't compress).

## 4. Composition (section by section)

Mobile-first (390px). Desktop enrichments noted.

**1. Envelope cover (viewport fill)**
- Centered envelope illustration, ~60% viewport width on mobile, 30% on desktop
- Wax seal monogram in gold, glows softly (subtle box-shadow)
- "Tap to open" hint below, in small caps, 60% opacity, blush color
- Background: paper color with a very faint blush radial gradient behind the envelope

**2. Hero**
- `بسم الله الرحمن الرحيم` at the top, small, centered, ink-soft, always visible regardless of language — this is the cultural/religious anchor of the invitation, not a language string
- `Mariame / & / Hamza` stacked vertically, matching the civil wedding card composition. Letters at viewport-filling scale, tracked tight. Ampersand in blush, italic, centered on its own line.
- Hairline divider (1px, 10% ink, short — maybe 60px) below the names
- `14 novembre 2026` in body serif, italic or regular, centered
- `Casablanca` below, smaller, centered
- Subtle reference to the civil: a single line in small caps, ink-soft — something like `après Paris, Casablanca` or equivalent in the final copy pass

**3. Notre histoire (Our story)**
- Two-column on desktop (70/30 or reversed), single column mobile
- Photo portrait at 70% column, offset down to create reading rhythm — use the civil wedding photo Hamza shared
- Text flows in book-serif at reading size, generous line height
- Opening drop cap (first letter of story, 4 lines tall, blush)
- Maximum three short paragraphs, in THEIR voice:
  - P1: how they met (Hamza took the train to Reims, she smiled all day, they'd been waiting for someone who was worth it, June 22 they stopped waiting)
  - P2: who they are together (Mariame solaire + expressive, Hamza discret + direct, they complete and lift each other)
  - P3: where the story has gone (Paris April 11, Indonesia, and now Casablanca, where the family can finally gather)
- No headings within the section. Just prose.

**4. Schedule**
- Vertical timeline, hairline line down the left (or right in RTL)
- Four entries: Ceremony / Cocktail / Dinner / Party
- Each entry: time in display serif at 4rem, one-line description in body below
- Blush dot markers on the line at each time
- Generous vertical rhythm — each entry gets 8rem of breathing room

**5. Venues**
- Two cards, side-by-side desktop, stacked mobile
- Each card: venue name in display, address in body, custom hand-drawn illustrated map (no Google Maps embed)
- Hover desktop: map illustration slightly shifts (2-3px parallax)

**6. RSVP**
- Form inputs styled as _letters_ — no borders, underline-only, ink color
- Placeholder text in blush italic
- Radio for attending: two large options, "Avec joie" / "Avec regret" (both poetic, not "yes/no")
- Submit button: ink background, paper text, tiny gold detail on hover
- Confirmation screen: handwritten-style "Merci, [name]" with the ampersand motif

**7. Footer**
- Tiny monogram (30px) centered
- `14.11.2026` below in small caps
- Nothing else

## 5. Motion (Pillar 3)

Custom easing only:
- `--ease-expo-out: cubic-bezier(0.16, 1, 0.3, 1)` — reveals
- `--ease-quart-out: cubic-bezier(0.25, 1, 0.5, 1)` — hovers
- `--ease-expo-in-out: cubic-bezier(0.87, 0, 0.13, 1)` — envelope open

**Page load choreography:**
- 0–200ms: envelope visible, wax seal fades in
- After tap: wax seal splits (400ms), envelope flaps unfold (800ms, staggered), contents rise (600ms after)
- Hero names: letter stagger 60ms, expo-out, slide up from 0.5em offset
- Ampersand: draws in last, 400ms delay

**Scroll reveals:**
- Each section: clip-path reveal from bottom, 800ms expo-out, triggers at 20% viewport entry
- Photos: scale-in from 1.05 to 1.0, 1.2s, on enter

**Language toggle:**
- Click → full-page crossfade (300ms) + dir flip + font swap
- Names perform the letter-stagger entrance again in the new script
- 600ms total. No jarring jump.

**Reduced motion:**
- All reveals become instant fades (100ms)
- Envelope skips animation, shows open state
- Language toggle instant

## 6. Details & micro-interactions (Pillar 7)

- `::selection` color: blush background, ink text
- Focus states: 2px blush outline with 4px offset, rounded corners match element
- Every button: magnetic pull effect (translate toward cursor, max 8px) on desktop
- All apostrophes: smart quotes (’ not ')
- No orphans on headlines: CSS `text-wrap: balance`
- Arabic: ensure proper RTL for number formats, punctuation flip
- No custom cursor (dropped for simplicity)

## 7. Performance budget

- LCP < 2s
- CLS near 0 (reserve aspect ratios on all photos and the envelope SVG)
- Self-host fonts, subset to only glyphs used (Fraunces Latin subset, Aref Ruqaa Arabic subset)
- Images: WebP with AVIF where supported, responsive srcset
- Animations: `transform` + `opacity` only, GPU-accelerated
- Lenis for smooth scroll, with reduced-motion fallback

## 8. What's NOT in the design (ship with restraint — Pillar 5 of process)

- No custom cursor (dropped per user preference)
- No page transitions between `/` and `/admin` — admin is utility, not part of the experience
- No 3D, no WebGL, no particle effects
- No photo gallery carousel (we have ONE portrait in "Notre histoire")
- No live countdown timer (dated 14 novembre 2026, pure text, no ticking)
- No ambient music (explicitly out of scope)
- No scroll hijacking, no horizontal scroll sections
- No live-streaming or social media integration (explicitly out — "ce qui se passe à la Mairie du 11e reste à la Mairie du 11e" carries forward to Casablanca)

## 9. Self-score target (for post-implementation review)

- Typography: 9/10
- Composition: 8/10
- Motion: 8/10
- Color: 9/10
- Details: 8/10
- **Weighted total: 8.6/10** — strong professional, few signature moments, wouldn't embarrass on Awwwards but not the target

## 10. Implementation order (Phase 2 breakdown)

2a. Fonts (self-host, subset, preload) + `::selection` + cursor + CSS tokens
2b. Hero: names + date at scale, letter-stagger entrance animation
2c. Envelope cover + open animation (signature moment)
2d. Language toggle motion (not just state change)
2e. Remaining sections: story, schedule, venues (static layout first)
2f. RSVP form styling (still no backend wiring — that's Phase 3)
2g. Scroll reveals with Lenis
2h. Micro-details pass: focus states, magnetic buttons, small caps micro-typography
2i. Illustration integration (monogram, envelope, hand-drawn map) — generated via ai-image-generation skill
2j. Real-device QA in both FR and AR
