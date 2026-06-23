# Changelog

## 3.8.0 — Gmail compose form

- Removed Web3Forms and every Web3Forms environment variable.
- Removed the temporary `Contact.tsx` compatibility module.
- `SiteShell.tsx` now imports `ContactSection.tsx` directly.
- The project brief form opens a pre-filled Gmail Compose draft addressed to `work.jashpr@gmail.com`.
- Added a normal email-client fallback when Gmail cannot open in a new tab.
- Removed the Web3Forms domain from the Content Security Policy.
- Preserved the latest gallery, responsive layout, animations, artwork and security headers.

## 3.7.0 — Contact import compatibility investigation

- Investigated recurring contact import path issues from mixed project folders.
- Superseded by the clean direct import in V3.8.

## 3.6.0

- Renamed the contact module to `ContactSection.tsx`.

## 3.3.0 — Gallery copy separation

- Moved the desktop 3D gallery stage below the selected-work heading.
- Prevented title and instruction copy from overlaying project artwork.
- Preserved orbit, drag, scroll, controls, mobile rail and project viewer behaviour.

## 3.2.0

- Rebuilt mobile navigation spacing.
- Added safe-area-aware sizing for phones, tablets and short landscape screens.
- Reduced and reflowed oversized mobile headings.
- Converted hero speciality pills into a stable two-column mobile grid.
- Improved mobile contact spacing, button sizing, modal behaviour and form controls.

## 3.1.0

- Removed the foreground 3D pillar from the project orbit.
- Kept the full scroll-driven and drag-driven 3D gallery interaction.

## 3.0.0

- Replaced placeholder work with Jash's supplied projects.
- Replaced the hero artwork with Jash's supplied portrait.
- Added a scroll-driven CSS-3D project orbit.
- Added pointer drag and orbit navigation controls.
- Added mobile horizontal scroll-snap fallback.
- Added full-screen uncropped project viewer.
- Added a sticky scroll-story section with reversible transitions.
- Added fixed chapter navigation on large screens.
- Optimised supplied artwork to lightweight WebP derivatives.
