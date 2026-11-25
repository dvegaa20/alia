# Alia — Style Reference
> warm community paper, deep harbor trust. Frame candid Querétaro volunteer and NGO photography inside deep Venice Blue panels, switch on Rock Blue for dark-surface actions, use Merino as the warm paper canvas, and let one serif italic word carry the human feeling.

**Theme:** mixed

Alia is a social-impact directory and social FinTech bridge that alternates deep **Venice Blue / Deep Harbor (`#0C354C` / `#16587B`)** panels with warm **Merino (`#F5EEDD`)** inset sheets, each rounded and layered like a page inside a page. Candid, golden-lit photography of local volunteers, community projects, and youth initiatives in Querétaro carries the emotional weight, while **Rock Blue (`#84B3CE`)** is the bright signal color on dark sections for actions, eyebrows, and active markers, and **Venice Blue (`#16587B`)** anchors filled buttons and emphasis on light Merino sections. A light-weight sans (`Inter Tight` at 300) sets every large headline, and a single `Newsreader` italic word drops into each one (*causa*, *cercano*, *transparente*, *impacto*) so social and financial claims read as deeply human rather than corporate or AI-generic. Sharp `4px` buttons, `8px` cards, `12px`/`24px` inset section sheets, and soft sky-to-merino gradient tiles keep the system calm, editorial, and unshowy.

## Colors

| Name | Value | Role |
|------|-------|------|
| Deep Harbor | `#0C354C` | Hero frame, dark section fields, footer panel, and primary text on Merino — the deep navy-teal anchors Alia's institutional trust |
| Rock Blue | `#84B3CE` | Primary filled buttons on dark sections, outline-button borders, badge text, eyebrow markers, and active row rules — the bright signal on dark sections |
| Merino | `#F5EEDD` | Body canvas, announcement bar, inset feature panels, and impact outcomes section — a warm paper tone, never sterile pure white |
| Paper White | `#FFFFFF` | Display headings and body text on Deep Harbor/Venice Blue, floating nav card, photo-card titles, and footer links |
| Venice Blue | `#16587B` | Primary filled buttons on Merino/light sections, inline clickable emphasis, and secondary dark surfaces |
| Harbor Panel | `#124866` | Badge fills (`INICIATIVA JOVEN`, `NUEVA`) and dark-panel cards — one step lighter than Deep Harbor |
| Oat Merino | `#EAE1CD` | Closing call-to-action field and subtle inset band the footer panel rises from |
| Sea Mist Label | `#A8CBE0` | Footer column headings on Deep Harbor, a softened Rock Blue sitting cleanly above white links |
| Ring Sand | `#DFD5C0` | Unfilled tracks of outcome stat rings and subtle 1px hairline dividers on Merino |
| Ice Mist | `#F4F8FB` | Testimonial and impact-story card surface on gradient/dark fields |
| Harbor Ink | `#1B2D38` | Navigation links in the floating white nav card — a blue-tinted near-black that keeps the menu soft |
| Quote Charcoal | `#222222` | Testimonial quote text inside Ice Mist story cards |
| Quiet Gray | `#616161` | Byline, location, and metadata under testimonial quotes |
| Urgency Coral | `#C84B31` | Semantic-only marker for **Con Urgencia** donation needs inside NGO profiles |
| Verified Emerald | `#1E8E68` | Semantic-only badge for **Donataria Autorizada (ISR)** and verification confirmations |
| Impact Radial | `radial-gradient(circle at 50% 90%, rgba(132, 179, 206, 0.45), rgb(22, 88, 123) 40%, rgb(12, 53, 76))` | Impact stories field and transparency highlight tiles — soft sky light rising from a deep Venice Blue well |
| Sky Fade | `linear-gradient(rgb(132, 179, 206), rgb(245, 238, 221))` | Bento feature tiles that dissolve from Rock Blue into the Merino canvas below them |

## Typography

### Inter Tight (substituting Helvetica Now Display) — The primary voice of the site: `76px/300` hero, `62px` and `56px/300` section headlines, `24px/300` card titles, `18px/500` buttons, and `14px` footer links. Light `300` at display sizes with zero tracking keeps big claims airy and editorial; body sizes tighten slightly (`-0.36px` at `18px`, `-0.48px` at `24px`).
- **Google Font:** `Inter Tight` (loaded via `next/font/google`)
- **Weights:** 300, 400, 500, 600
- **Sizes:** 12px, 14px, 16px, 18px, 24px, 56px, 62px, 76px
- **Line height:** 1.00, 1.20, 1.30, 1.50
- **Letter spacing:** 0 at 56–76px display; -0.48px at 24px; -0.36px at 18px; -0.32px at 14px

### Newsreader Italic (substituting Ivar Display Italic) — Loaded in Italic weight `400` only, set exclusively as the one or two emotive words inside each sans headline (*causa* at `91px`, *cercano* at `69px`, *real* at `62px`), always weight `400` at `1.0` line-height. The high-contrast serif italic is the signature human note against the light sans.
- **Google Font:** `Newsreader` (style: italic, weight: 400)
- **Weights:** 400
- **Sizes:** 62px, 69px, 91px
- **Line height:** 1.00
- **Letter spacing:** normal at 62px, 69px, and 91px

### JetBrains Mono (Alia FinTech & Verification accent) — Used sparingly and strictly for tabular numeric data, ISR tax-deduction figures, verification badges (`DONATARIA ISR`, `INICIATIVA JOVEN`), and urgency tags. Never used for prose or headings.
- **Google Font:** `JetBrains Mono`
- **Weights:** 400, 500
- **Sizes:** 12px, 13px

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing |
|------|--------|--------|------|-------------|----------------|
| eyebrow | Inter Tight | 400 | 14px | 1.5 | 0px |
| footer-link | Inter Tight | 400 | 14px | 1.2 | -0.32px |
| body | Inter Tight | 400 | 16px | 1.5 | 0px |
| button | Inter Tight | 500 | 18px | 1.5 | -0.36px |
| lead | Inter Tight | 400 | 18px | 1.5 | -0.36px |
| card-title | Inter Tight | 300 | 24px | 1.2 | 0px |
| subtitle | Inter Tight | 400 | 24px | 1.5 | -0.48px |
| quote | Inter Tight | 400 | 24px | 1.3 | -0.48px |
| section-heading | Inter Tight | 300 | 56px | 1 | 0px |
| heading | Inter Tight | 300 | 62px | 1 | 0px |
| display | Inter Tight | 300 | 76px | 1 | 0px |
| display-accent | Newsreader (Italic) | 400 | 91px | 1 | 0px |

## Spacing & Layout

**Base unit:** 4px

**Density:** comfortable

- **Section gap:** 96px
- **Card padding:** 32px
- **Element gap:** 16px

### Border Radius

- **buttons:** 4px
- **badges:** 4px
- **cards:** 8px
- **panels:** 12px
- **sections:** 24px
- **inputs:** 0px (underline inputs) or 4px (search/filter controls)
- **dots:** 9999px

## Components

### Floating Nav Card
**Role:** Top-level site navigation

A 64px Paper White `#FFFFFF` card with `4px` radius and a soft `rgba(12, 53, 76, 0.16) 0 0 4px` shadow, floating `15px` down over the Deep Harbor hero frame. Venice Blue wordmark/logo at left, Harbor Ink `#1B2D38` `16px/500` links (`Inicio`, `Todas las causas`, `Sobre el proyecto`, `Impacto`), clean Light/Dark toggle, and a Venice Blue `#16587B` `4px` `Sugerir ONG` button with `0 20px` padding.

### Merino Announcement Bar
**Role:** Optional dismissible top strip (e.g., Youth Initiatives or BTEM/Field campaign)

A 48px Merino `#F5EEDD` strip across the top with centered Deep Harbor `#0C354C` `16px/400` text at `24px` line-height, an underlined action link, and the subtle `rgba(27, 45, 56, 0.12) 0 0 4px 4px` halo.

### Framed Photo Hero
**Role:** Opening statement over real Querétaro community photography

A full-viewport photograph inside a Deep Harbor `#0C354C` frame with `12px` side and bottom padding (and `8px`–`12px` inner image corners). Left-align Paper White `Inter Tight` `76px/300` at `1.0` line-height ending in a `91px` `Newsreader Italic` word, then a `24px/400` subtitle at `36px` line-height and `-0.48px` tracking, then two `4px`-radius buttons with `16px` gap (`Explorar Directorio` in Rock Blue filled + `Sobre el proyecto` in Rock Blue outline).

### Rock Blue Signal Button
**Role:** Primary action on dark sections

Rock Blue `#84B3CE` fill with a `1px` `#84B3CE` border, Deep Harbor `#0C354C` label in `Inter Tight` `18px/500` at `27px` line-height and `-0.36px` tracking, `4px` radius, `10px 24px` padding, no shadow.

### Rock Blue Outline Button
**Role:** Secondary action on dark sections

Transparent fill, `1px` Rock Blue `#84B3CE` border and Rock Blue label at `18px/500` with `-0.36px` tracking, `4px` radius, same padding as the filled button. Sits beside the Rock Blue Signal Button.

### Venice Blue Fill Button
**Role:** Primary action on light Merino/Oat Merino sections

Venice Blue `#16587B` background and `1px` `#16587B` border with a Paper White `18px/500` label at `-0.36px` tracking, `4px` radius, no shadow. Used on Merino and Oat Merino bands (e.g., closing CTA and directory actions).

### Cause Category Photo Card
**Role:** Cause-category or featured-NGO entry tile

A tall `8px`-radius photo card with a dark radial corner fade from `rgb(12, 34, 48)`. A colored status dot in a translucent white `9999px` ring sits top-left; the bottom-left carries a Paper White `24px/300` title at `28.8px` line-height and a `14px/400` caption at `1.0` line-height.

### Youth Initiative / NEW Badge
**Role:** Initiative and addition marker on cards

Harbor Panel `#124866` fill, Rock Blue `#84B3CE` text, `4px` radius and `6px 12px` padding, led by a small Rock Blue `9999px` dot. Used for `INICIATIVA JOVEN` and `NUEVA ADICIÓN` tags.

### Bento Feature Tile
**Role:** Platform capability / FinTech & Transparency tile inside a Merino panel

An `8px`-radius tile with `32px` padding and no shadow inside a `12px`-radius Merino `#F5EEDD` panel. Fill it with a photo, Deep Harbor `#0C354C`, the Impact Radial, or the Sky Fade gradient, and set a Paper White `24px/300` title top-left above a clean UI/metric preview.

### Outcome Ring Stat ("Nuestro Alcance")
**Role:** Impact proof column (replacing generic description cards)

On a Merino `#F5EEDD` band with `24px` top corners, split columns with `1px rgba(12, 53, 76, 0.12)` vertical hairlines. Each column holds a `Ring Sand #DFD5C0` circle track with a Venice Blue-to-Rock Blue gradient arc, a `62px/300` Deep Harbor numeral, and a `16px/300` caption with `500`-weight emphasis.

### Audience & Verification Row
**Role:** Split-section navigation list (e.g., 3-step verification on `/about` or Cause filters)

Full-width rows on Deep Harbor `#0C354C` with a `24px/300` label and a right arrow, separated by `1px rgba(132, 179, 206, 0.2)` hairlines. The active row turns its label Rock Blue `#84B3CE` and fills its bottom rule with Rock Blue.

### Ice Mist Story Card
**Role:** NGO / Volunteer / PyME testimonial

An Ice Mist `#F4F8FB` card with `8px` radius on the Impact Radial field: real field photo at left, quote at right in `24px/400` Quote Charcoal `#222222` at `31.2px` line-height and `-0.48px` tracking, and a `16px/400` name over a `16px/300` Quiet Gray `#616161` role/organization line.

### Directory Organization Card (`/directory`)
**Role:** Scannable NGO & Youth Initiative listing

A Paper White `#FFFFFF` card with `8px` radius and `1px solid #DFD5C0` border sitting on a Merino `#F5EEDD` canvas (no drop shadow). Top row carries category eyebrow + semantic badge (`INICIATIVA JOVEN` in Harbor Panel or `DONATARIA ISR` in Verified Emerald); middle carries `24px/400` org name and 2-line purpose; bottom row shows urgency count (`Urgency Coral` if urgent items exist) and direct `Ver perfil →` link in Venice Blue.

### Harbor Footer Panel
**Role:** Site footer

A Deep Harbor `#0C354C` panel with `24px 24px 0 0` corners rising from Oat Merino `#EAE1CD`. Sea Mist Label `#A8CBE0` column heads, Paper White `14px/400` links at `-0.32px` tracking, social icons limited exclusively to **Instagram, LinkedIn, and Facebook**, and the single legal line `© 2026 Alia. Todos los derechos reservados.`

## Do's and Don'ts

### Do
- Use Deep Harbor `#0C354C` and Venice Blue `#16587B` for the hero frame, dark sections, and footer panel, and Merino `#F5EEDD` for light inset panels.
- Set large headlines in `Inter Tight` `300` at `76px`, `62px`, or `56px` with `1.0` line-height and `0` tracking.
- Pair every major headline with one `Newsreader Italic` `400` word or short phrase at a larger scale than the sans (`91px` against `76px`).
- Reserve Rock Blue `#84B3CE` for primary button fills, outline borders, badge text, and marker dots on dark sections.
- Keep buttons at a `4px` radius with `18px/500` labels and `-0.36px` tracking; switch to Venice Blue `#16587B` fills on Merino/light sections.
- Keep light sections inset into the dark page with `12px` or `24px` corners so each band reads as a warm sheet laid on Deep Harbor.
- Keep Light Mode and Dark Mode cleanly separated in `globals.css` (`:root` Merino/Deep Harbor vs `.dark` `#081C28`/`#0F2B3D`) and never apply `dark:invert` to photos or logos.

### Don't
- Do not set display headlines bold (`600+`); Alia uses `Inter Tight` `300` at `56–76px`.
- Do not use sterile pure white `#FFFFFF` as the main page canvas; light sections are Merino `#F5EEDD` or Oat Merino `#EAE1CD` (reserve `#FFFFFF` for floating nav and directory cards on Merino).
- Do not round buttons into pills (`9999px`); action radius is `4px`, and `9999px` is reserved strictly for status dots.
- Do not set whole headlines or body copy in `Newsreader`; it appears only as italic accent words.
- Do not add gray drop shadows to cards or photos; separate them with tonal steps, `1px` hairlines, and `8px` corners.
- Do not use Rock Blue `#84B3CE` as small text or filled buttons on Merino `#F5EEDD` (contrast is too low ~2.1:1); use Venice Blue `#16587B` there.
- Do not use cold corporate stock photography; use warm, candid Querétaro field and volunteer moments.

## Elevation

- **Announcement Bar Halo:** `rgba(27, 45, 56, 0.12) 0px 0px 4px 4px`
- **Floating Nav Card Edge:** `rgba(12, 53, 76, 0.16) 0px 0px 4px 0px`

## Surfaces

- **Deep Harbor** (`#0C354C`) — Page field, hero frame, dark sections, and footer panel.
- **Venice Blue** (`#16587B`) — Secondary dark bands, light-surface primary buttons, and text links.
- **Merino** (`#F5EEDD`) — Inset features panel, outcomes band, directory canvas, and announcement bar.
- **Oat Merino** (`#EAE1CD`) — Closing call-to-action field around the footer.
- **Harbor Panel** (`#124866`) — Badges and elevated dark panels on Deep Harbor.
- **Ice Mist** (`#F4F8FB`) — Testimonial story cards on the Impact Radial field.

## Imagery

Photography is the emotional core: candid, warm, human-centered moments in Querétaro (volunteers sorting donations, Sofi visiting local shelters, youth initiatives organizing school drives, community kitchens). Images are cropped close to people and hands, sit in `8px`-radius cards or fill framed sections, and carry a subtle dark corner fade where white text sits on them. Product & FinTech visuals (ISR tax-deduction previews, category chips, map markers) sit inside `8px`-radius Bento tiles with soft Sky Fade or Impact Radial backgrounds. Outcome stats use thick gradient ring arcs (`#16587B` → `#84B3CE`) on Ring Sand `#DFD5C0` tracks.

## Layout

The page is a stack of rounded sheets on a Deep Harbor `#0C354C` field under a slim Merino announcement bar (optional) and a floating white `4px`-radius nav card. The hero is a full-viewport photograph framed by `12px` of Deep Harbor, with the left-aligned light sans + serif italic headline, subtitle, and two `4px` Rock Blue buttons in the lower-left third. A centered `62px` statement leads into tall `8px`-radius cause/category photo cards and `NUEVA` / `INICIATIVA JOVEN` tiles. A Merino panel inset with `12px` corners holds a left headline, right lead, and a three-column bento grid of `8px` tiles (including transparency & FinTech ISR). A Merino outcomes band ("Nuestro Alcance") with `24px` top corners presents four ring-stat columns split by hairlines (removing old generic text cards). A split section pairs a headline and 3-step verification rows with a field photo; an Ice Mist testimonial panel, an Oat Merino closing CTA block, and a Deep Harbor footer panel (`24px 24px 0 0` corners) close the page. Sections sit `48px` from viewport edges with `96px` vertical rhythm.

## Similar Brands

- **Maven Clinic** — Direct structural inspiration: deep brand frame, warm paper inset sheets, `300`-weight sans paired with a single serif italic word, `4px` sharp actions, and candid human photography.
- **Calm** — Deep nature-toned fields with light sans headlines that make an emotional topic feel unhurried and trustworthy.
