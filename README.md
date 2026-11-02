# N29 — Personal portfolio

Source for **[n29.kz](https://n29.kz/)**, the personal portfolio of Nurlybek Yesbolganov (N29).

## Site structure

| File | Purpose |
| --- | --- |
| `index.html` | Homepage, introduction, project showcase, About section, and contact links |
| `site.css` | Responsive visual design and reduced-motion support |
| `site.js` | Optional project-category filters, navigation state, scroll progress |
| `assets/hunger.avif` | Optimized high-detail portrait used when AVIF is supported |
| `assets/hunger.webp` | Compatibility fallback for the portrait |
| `favicon.svg` | N29 brand icon |
| `robots.txt`, `sitemap.xml` | Search-engine discovery |
| `CNAME` | Custom domain: `n29.kz` |

## Design and features

- Editorial, dark portfolio with the user's Hunger artwork.
- Mobile and desktop layouts, keyboard-visible focus and reduced-motion behavior.
- Six project cards grouped into **All projects / BL:R / Algorithms**.
- Direct links to GitHub, Codeforces, BL:R tools, Roblox, Discord and other public profiles.
- No framework, analytics tracker, artificial counters or build step.
- Project cards and external links work without JavaScript.

## Deployment

This is a static GitHub Pages repository. Merge approved changes into the configured publishing branch (normally `main`). The repository already contains `CNAME` for `n29.kz`. Check **Settings → Pages** if deployment does not update.

The BL:R companion site at [blr.n29.kz](https://blr.n29.kz/) lives in the separate [N29dev/blr](https://github.com/N29dev/blr) repository. Deploy this portfolio's portrait assets before merging a BL:R design that references them.

## Edit content

Project cards, About copy and social links are intentionally plain HTML in `index.html`. CSS can be updated in `site.css`, and the enhancement script is isolated in `site.js`. Images are static assets and do not send user-uploaded artwork to a third-party image service.
