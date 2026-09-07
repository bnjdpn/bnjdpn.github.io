# Portfolio design and provenance

The portfolio presents 17 independent apps with paired English and French copy.
The current design starts from a new page composition: warm off-white surfaces,
charcoal text, orange accents and generous spacing. Oversized Bricolage Grotesque
headings meet an italic Instrument Serif accent; DM Sans handles the supporting
copy and controls. The publisher name identifies the editor only.

## Page composition

The opening pairs a large typographic statement with a static composition of
real LoadSense and Petites Bouchées captures, existing app icons, a colored disc
and simple decorative shapes. It leads directly to the collection.

Three spotlights follow: Échappée with a landscape capture, LoadSense with a real
app screen, and the four Petites family apps. The full catalogue uses product
icons, descriptions, platform labels, product-site links and App Store links.
Four categories cover training, everyday life, baby and family, and play and
escape. The support section links each visitor to the selected app's own support
destination. There is no portfolio contact form.

The layout adapts from three catalogue columns to two and then one. The opening
and feature blocks also reflow for smaller screens. Standard browser scrolling
and links remain in control; the site has no canvas, WebGL scene or scroll-driven
story sequence.

## Progressive enhancement and accessibility

`assets/site.js` adds category filtering, accent-insensitive search, a live result
count, a reset action and the support picker. Search matches all entered words
against each product's name and descriptive copy. Category links jump to the
catalogue and apply the corresponding filter. The support action appears only
after an app has been selected.

Without JavaScript, all 17 catalogue entries and their links remain visible. A
native disclosure provides the full support directory. JavaScript replaces that
directory with the picker and reveals the filtering controls only after they
are connected.

The page includes a skip link, visible keyboard focus, native form controls,
pressed states for category buttons and polite announcements for result counts.
Motion is limited to brief desktop entrances and hover transitions; reduced
motion disables animations, transitions and smooth scrolling. There is no
continuous animation.

The previous swipe deck, favorites, shuffled discovery and generative animation
have been removed. The current site neither reads nor writes browser storage,
including any values left by the earlier design. It uses no cookies or analytics
and performs no network writes. Search and support choices are ordinary page
state, with reconciliation when a browser restores the page from its history.

## Sources and assets

- `content/catalog.json`: names, site paths, store IDs and icons.
- `content/copy.mjs`: `productCopy`, with paired product descriptions, platforms
  and categories.
- `content/studio-copy.mjs`: paired page headings, navigation, spotlights,
  catalogue controls and support copy.
- `content/profile.json`: the public publisher identity used by structured data.
- `content/preview-media.json`: dimensions, original source paths, media types
  and normalized `[x, y, width, height]` framing for real previews.
- `scripts/build-site.mjs`: generates the EN/FR pages, structured data and
  sitemaps from the content sources.
- `styles.css` and `assets/site.js`: presentation and progressive enhancement.
- `assets/fonts/`: locally served fonts and their SIL Open Font License texts.
- `scripts/og-card.html` and `scripts/render-social.mjs`: reproducible source
  and renderer for the 1200 × 630 `assets/social/og.jpg` preview.

All product images are existing public app or game captures and icons. The
composition does not invent an app interface. Image frames crop the source
media through CSS; they do not redraw or retouch it. The preview manifest records
the distinction between interface captures and composed marketing media.
Échappée uses the existing `site/assets/img/world/monde-col-1520.webp` source,
copied to `assets/previews/echappee.webp`; the visible caption preserves seed
52025, km 8.3 and 17:45. Locale-specific phone previews retain their source
provenance in the manifest.

Styles, the page script and the social preview use content hashes in their generated URLs so their
versions stay aligned with the generated HTML. The site ships plain HTML, CSS
and JavaScript without a production framework.

## Public content and verification

The homepage is English at `/`, with French at `/fr/`. Product sites retain their
own repositories, paths, languages and legal content. Support destinations are
product-specific: Échappée uses its support page and the other apps use their
contact sections. Current prices and device compatibility are delegated to the
App Store. Échappée explicitly identifies the Apple silicon Mac release, with
iPhone and iPad coming later. The retired Nova Station Pinball remains excluded.
No career, client, employer, consulting or other non-catalogue project content
is published.

`npm run check` validates the generated site and local invariants.
`npm run check:links` checks public destinations. Optional
`npm run check:browser` runs `scripts/check-redesign-browser.mjs` against a chosen
base URL and writes screenshots plus a machine-readable report. It covers both
languages, desktop/tablet/mobile widths, enlarged text, keyboard access, filters,
support destinations and the no-JavaScript presentation. It can use an existing
Playwright runtime through `PLAYWRIGHT_MODULE`; Playwright is not a visitor
dependency. See the [README](../README.md) for commands.

The [current validation report](refonte-complete-20260907.md) records the executed
checks for this redesign. These commands alone do not prove a deployment succeeded. Local checks, the Pages workflow and the publicly
served result must be verified separately for each delivery.

The reports [redesign-20260907.md](redesign-20260907.md),
[swipe-explorer-20260907.md](swipe-explorer-20260907.md),
[media-presentation-20260907.md](media-presentation-20260907.md) and
[verification.md](verification.md) retain historical evidence for previous
iterations. Their graphite presentation, swipe interactions, storage behavior
and recorded checks do not describe or validate the current redesign.
