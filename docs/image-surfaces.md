# Illustration surfaces and client logo frames

Client marquee logos now occupy equal 186 × 126 px cards (150 × 110 px on small screens), with contain sizing, light-blue backgrounds and blue liquid hover fill. Logos retain their original pixels and proportions. The existing two-direction marquee and pause controls remain.

`SiteImage.jsx` automatically wraps transparent generated illustrations from `/assets/generated/unique/` and `/assets/generated/illustrations/` in `.image-surface`. All backgrounds begin light blue and fill with company blue on hover; the artwork gently tilts and zooms. Opaque carousel scenes, Vision/Mission backgrounds, portraits and logos are excluded. Home hero uses its existing sculpted backdrop with the same light-to-blue treatment; its image opts out of a second wrapper. Zoom gallery includes matching surfaces around all seven illustrations. Card hover/focus activates the treatment even where a stretched link sits over the image.

All shared styling is in `src/image-surfaces.css`, imported last by `main.jsx`. Reduced motion keeps the color change but disables tilt, zoom and transition animation. Original visible words and image assignments are preserved.

Validation: production build, typecheck and lint pass; all 28 browser checks pass. Logo frames and liquid illustration hover were visually inspected (`artifacts/client-logo-frames.png`, `artifacts/illustration-liquid-hover.png`).

## Spacing repair

The universal `height: 100%` wrapper interacted with automatic card height and inherited image margins. Frames now have an intrinsic 3:2 ratio, controlled inner padding and contained artwork with no inherited margins. Product-image panels retain their explicit height; compact desktop bento illustrations use square frames while mobile uses 3:2 and a separate text-to-art gap. Company cards use a 24px image/title gap. Capability sections use flexible columns, bounded copy width and 28px mobile gaps. Existing words and liquid/tilt/zoom behavior remain.

`tests/image-layout.spec.js` checks image containment, frame proportions, company-title spacing and overflow across representative pages at 390px and 1440px.
Spacing repair verification: all 30 browser checks passed, followed by both focused layout checks against the final desktop/mobile styles. Production build, typecheck, lint and formatting passed.
