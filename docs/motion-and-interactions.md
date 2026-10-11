# Motion and interactions

Added on 11 October 2026 using the existing Motion dependency and CSS.

- Section reveals run once with a 1050ms easing curve: rise (24px), left/right (32px), gentle zoom (94% to full size), unfolding mask and fade. Reduced motion removes entrances and delays.
- Featured product tabs have a shared moving underline (250ms) and short content entrances (320ms). Outgoing content is removed immediately, preserving one accessible tab panel and its keyboard controls.
- Buttons have subtle hover lift, pressed feedback and a focus halo. Service and product cards have arrow feedback and gentle image zoom; keyboard focus receives equivalent feedback.
- Navigation chevrons, mobile menu entry and native accordion expansion use short transitions. Native disclosure semantics and Escape handling remain intact.
- A decorative progress line follows scroll position. A back-to-top button appears after 600px and restores focus to the main content before scrolling.
- Reduced-motion preferences disable decorative transforms, entrances, smooth scrolling and the progress line. No continuous floating, parallax or cursor tracking is used.

Styles are in `src/interactions.css`, loaded after the established design styles. Scroll tools use Motion values; scroll position does not trigger page-wide React renders.

Browser coverage includes normal and reduced motion, product keyboard navigation, back-to-top visibility and focus restoration, plus the existing responsive and accessibility checks.

## Site-wide scroll choreography

Home and About company sections, Contact details/form, page heroes and illustrated solution capabilities reveal their two columns from opposite sides. Home service columns enter from left, below and right; product showcases and CTA sections use a gentle zoom. Cards unfold, testimonials fade, and process steps enter from the right. Careers and Webmail panels have distinct entrances; article, package and policy body blocks use a simple fade to preserve reading flow.

Shared images reveal through a soft mask, with short staggered delays for client logo collections. Custom vector icons scale into place; the hero connection paths draw once. Paired solution illustrations use their column entrance instead of a second image mask. Header navigation and the brand logo stay steady.

Horizontal entrances are clipped at the main page boundary to avoid sideways scrolling. Focused content is immediately visible, and image dimensions remain reserved during animation. Effects do not repeat when scrolling back.

## Slower, later scroll reveals

Section entrances now take 1050ms, image reveals 1100ms, vector icons 1000ms and connection drawing 1500ms. Heading words use a 100ms stagger and 900ms movement. The intersection area ends 140px above the viewport bottom, so entering the bottom edge alone does not trigger a reveal. A low proportional threshold keeps tall sections reachable. Reduced motion still removes movement and delay; marquee speeds and immediate button feedback remain unchanged.
