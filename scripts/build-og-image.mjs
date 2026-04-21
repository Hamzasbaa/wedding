// Generates public/og-image.png (1200×630) from a palette-matched SVG.
// Run: node scripts/build-og-image.mjs
//
// The OG image is what WhatsApp / iMessage / Facebook / Twitter show
// when someone pastes the invitation link. It's a 2:1 card — any text
// below 48px gets unreadable on mobile previews, so names go BIG.
//
// Rendered with sharp (no API key, no headless browser). SVG uses
// system-common font fallbacks because embedding woff2 in SVG is
// sharp-dependent and unreliable. Good enough for a social card.

import sharp from 'sharp'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const OUT_PNG = resolve('public/og-image.png')
const OUT_SVG = resolve('public/og-image.svg')
const WIDTH = 1200
const HEIGHT = 630

// Design tokens — mirror src/index.css so the card feels like the site.
const PAPER = '#FAF7F2'
const INK = '#3D2E35'
const INK_SOFT = 'rgba(61, 46, 53, 0.6)'
const BLUSH = '#E8C7C3'
const GOLD = '#C9A66B'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <!-- Paper backdrop -->
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${PAPER}"/>

  <!-- Hairline frame 32px from the edges -->
  <rect x="32" y="32" width="${WIDTH - 64}" height="${HEIGHT - 64}"
        fill="none" stroke="${GOLD}" stroke-width="1" opacity="0.45"/>

  <!-- Eyebrow: APRÈS PARIS -->
  <text x="${WIDTH / 2}" y="160"
        text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="22" letter-spacing="6"
        fill="${INK_SOFT}">
    APRÈS PARIS
  </text>

  <!-- Names: one centered line, italic blush ampersand as tspan. -->
  <text x="${WIDTH / 2}" y="310"
        text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif"
        font-weight="600"
        font-size="96"
        letter-spacing="-1"
        fill="${INK}">
    Mariame<tspan dx="14" dy="-6"
                  font-style="italic"
                  font-family="'Apple Chancery', 'Brush Script MT', cursive"
                  font-weight="400"
                  font-size="72"
                  fill="${BLUSH}"> &amp; </tspan><tspan dx="8" dy="6">Hamza</tspan>
  </text>

  <!-- Gold hairline -->
  <line x1="${WIDTH / 2 - 50}" y1="390" x2="${WIDTH / 2 + 50}" y2="390"
        stroke="${GOLD}" stroke-width="1" opacity="0.55"/>

  <!-- Date + city -->
  <text x="${WIDTH / 2}" y="450"
        text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif"
        font-style="italic"
        font-size="34"
        fill="${INK}">
    14 novembre 2026 · Casablanca
  </text>

  <!-- Subline -->
  <text x="${WIDTH / 2}" y="520"
        text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif"
        font-style="italic"
        font-size="24"
        fill="${INK_SOFT}">
    Paris, c'était entre nous. Casablanca, c'est avec vous.
  </text>
</svg>`

// Keep a copy of the SVG so designers can tweak later without re-reading this script.
writeFileSync(OUT_SVG, svg)

await sharp(Buffer.from(svg))
  .resize(WIDTH, HEIGHT)
  .png({ quality: 92, compressionLevel: 9 })
  .toFile(OUT_PNG)

console.log(`Wrote ${OUT_PNG}`)
console.log(`Wrote ${OUT_SVG}`)
