# Client marquee ribbons

The supplied reference replaces the previous grid of logo cards with two full-width, slightly tilted strips. Each item pairs an original client logo with a bold company name. The visible words come from the existing logo artwork, not the foreign companies in the reference. Original image paths and logo colors remain intact.

- `src/components/ClientMarquee.jsx`: heading, two rows, duplicate groups for continuous looping, keyboard Space pause, viewport and tab visibility handling. Duplicate groups are hidden from assistive technology; empty image alt text avoids repeating the adjacent client name.
- `src/data/client-logos.json`: the 21 original logo sources and their names.
- `src/clients-footer.css`: complete client section styling before the shared footer rules. Desktop bands have 82px items, 48px logos and 28px company names; mobile uses 64px items, 36px logos and 20px names. The frame rotates -1 degree.

The first row runs left over 100 seconds and the second runs right over 110 seconds. Only CSS transforms run continuously. Hover or keyboard focus pauses both rows; offscreen and hidden-tab states also pause. There is no visible pause button or pointer-tracking handler. Reduced motion removes the rotation and animation, hides duplicate groups and wraps all 21 names into a readable static list.

Old rounded-card, liquid-fill and pointer-border CSS was removed from `image-surfaces.css` and `home-final-treatments.css` so those rules cannot override the ribbon design. Other image hover surfaces and capability marquee styling retain their own rules.
