# Portfolio design and provenance

The catalogue presents 17 independent apps, with paired French and English copy.
The visual direction is graphite, oversized Space Grotesk type, thin generative
lines and real product images. The opening is a swipeable app deck; the three following
chapters introduce training, a virtual ride and family journals. The full catalogue
remains searchable by use or name. The publisher name identifies the editor only.

## Discovery and motion

`assets/discovery.mjs` selects an app from a shuffled bag. A complete cycle visits
all 17 apps; adjacent visits never select the same app or the same family of lines.
The discovery also changes the accent and parameters of the drawing.
`bd-app-discovery-v1` in local storage holds only catalogue IDs and a visual mode.
There are no visitor identifiers, timestamps, cookies, analytics or network writes.
If storage is unavailable, the current page still rotates in memory. A reload or
return from the browser's page cache starts another discovery. Clearing browser
storage starts a new cycle.

The deck accepts a horizontal mouse, touch or pen gesture. Left passes to the next
app; right keeps the outgoing app in “My selection” before moving on. Buttons offer
the same actions, and arrow keys act only while the card itself is focused. A short
drag springs back. Vertical scrolling, pinch zoom and product links retain their
native behavior. The last 32 swipe actions can be undone, including an app added by
that action; manual selection changes clear that undo history.

`bd-app-selection-v1` holds only the selected catalogue IDs in this browser. The
selection is shared by the French and English pages and can be removed from its
native modal drawer or from catalogue hearts. Reading this list is independent of
the discovery state. Invalid or retired IDs are discarded; blocked browser storage
falls back to an in-memory selection. The selection synchronizes between tabs.
No account, identifier or network write is introduced.

The next product image is decoded before committing the transition. A failed image
keeps the visible card and selection intact, restores the controls and displays a
retry message. During a transition, selection mutation controls are visibly disabled.
The dialog preserves focus when its list refreshes and pauses background animation.

`assets/experience.mjs` draws three parametric line families on a decorative 2D
canvas. Rendering is capped at about 30 fps, 1.5 device pixel ratio and fewer lines
on phones; it pauses when the page is hidden or the opening is off-screen. Native
scrolling drives the opening transforms and the three overlapping product chapters.
No scroll hijacking, WebGL runtime or production framework is used.

Masked title entrances, staggered catalogue reveals, a visible-only app marquee,
card exit/entry springs and the selection drawer complete the motion. Gesture
animation is finite and owned by `assets/swipe-gesture.mjs`; it distinguishes a
child's implicit touch capture from losing capture of the swipe surface itself.

The animation control pauses both the drawing and the scroll transformations.
Reduced-motion preferences select a static, unpinned presentation. On phones and
short screens, the chapters flow normally. The page is complete without JavaScript:
LoadSense remains the initial discovery, and all 17 product links stay available.
Filtering is a separate progressive enhancement.

## Sources and assets

- `content/catalog.json`: names, site paths, store IDs and icons.
- `content/copy.mjs`: paired editorial copy and categories.
- `content/explorer-copy.mjs`: paired deck, gesture and selection copy.
- `content/preview-media.json`: dimensions, source paths, media type and normalized
  `[x, y, width, height]` framing for every real preview, plus a separate vertical
  catalogue offset expressed as a fraction of the framed image's width.
- `scripts/build-site.mjs`: generates the EN/FR pages and sitemaps.
- `styles.css` and `assets/experience.css`: base presentation and immersive layer.
- `assets/product-media.css`: shared image viewports and product presentation.
- `assets/swipe.css`: deck, responsive opening, selection drawer and motion.
- `scripts/og-card.html`: reproducible source of the 1200 × 630 social image.

All product images are existing public app or game captures. No interface was
invented. Échappée uses `site/assets/img/world/monde-col-1520.webp`; its story caption
preserves seed 52025, km 8.3 and 17:45. Other preview provenance is recorded per
locale in `preview-media.json`. App icons and the publisher avatar are reused.
Decorative lines are procedural geometry, separate from the product media.
Fonts are served locally with their SIL Open Font License texts in `assets/fonts/`.

The portfolio uses unchanged copies of the published 880 px originals where
available. CSS viewports remove the surrounding poster headlines and margins;
they do not redraw or retouch the interface. The manifest distinguishes interface
captures from composed marketing media, including FastZen's existing composition.
The swipe deck and catalogue show larger interface details with individual focal
points; the story chapters show the framed product face-on. The 422 px watch capture is
capped at 210 CSS pixels to avoid enlarging its limited source resolution. Styles and scripts use content
hashes in their URLs so returning visitors receive the matching presentation.
The experience hash covers its imported modules and is propagated to their URLs.

## Public content

The homepage stays English at `/`, with French at `/fr/`. Product sites retain
their own repositories, paths, languages and legal content. Each support link goes
to its product. Prices and device compatibility refer to the current store pages;
Échappée explicitly identifies the Apple silicon Mac release, with iPhone/iPad
coming later. The retired Nova Station Pinball is excluded. No career, client,
employer, consulting or other non-catalogue project content is published.

The changes and local evidence for this design are described in
[redesign-20260907.md](redesign-20260907.md).
The swipe follow-up and its checks are recorded in
[swipe-explorer-20260907.md](swipe-explorer-20260907.md).
