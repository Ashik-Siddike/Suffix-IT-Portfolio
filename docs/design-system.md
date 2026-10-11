# Design system

The original `Suffix-Logo.73142c9b.png` was downloaded from the live site's published bundle and visually inspected. Preserve its full shape, lettering, and tagline. No replacement wordmark.

Browser canvas sampling of the original 2083 ? 789 PNG found 186,044 fully opaque blue pixels, all `#0072BC`. The primary token now matches that measured logo blue. Accessible button/deep blue: `#075A91`; heading `#172433`; body `#536475`; white canvas; soft blue `#EFF7FC`; border `#E2EAF1`. These are implementation tokens, not official brand guidelines. All centralized in `src/styles.css`.

Manrope headings (600, 700, 800), Inter body (400, 500, 600), locally served WOFF2 Latin subsets, font-display swap. Original Bengali content remains in original product images. Add a locally hosted Noto Sans Bengali subset if Bengali text pages are commissioned; none invented here.

1280px content, 8px spacing scale, 80â€“104px desktop / 56px mobile sections, 16â€“20px card corners, 10px buttons, restrained borders/shadows, responsive clamp typography. White and soft-blue sections only.

Visual approach: editorial left-aligned typography, genuine field-force product visual, structured capability lists, a large product showcase, and restrained technical grid details. No fabricated dashboard, metrics, certifications or stock customer logos.

Interaction: outline Lucide icons; hover lift 4px / 220ms; Motion entry 20px / 600ms; reduced-motion disables translation and transitions. Visible keyboard focus, minimum 44px controls, keyboard and click operated disclosure navigation, native details for secondary accordions.
