# Native homepage section stacking

The three existing homepage sections now form full-width opaque panels in this order: white Experience, Suffix blue Field Force, light-blue Call Center. The existing illustrations, original copy and CTA destinations are preserved.

## Implementation

- `src/components/ui/StickyShowcase.tsx` renders ordinary semantic sections, with no Motion scroll subscriptions, panel transforms, opacity effects or animated wrappers. A ResizeObserver measures the actual header height and whether the content fits; it does not run on scroll. A covered keyboard link is brought into its own panel when focused.
- `src/sticky-showcases.css` sets a shared sticky top equal to the header height, increasing z-index values 1/2/3, and identical panel heights of `100svh - header height`. Only the inner content has a maximum width of 1280px. Panels have no outer margins, borders, radii, shadows or frame layers.
- `src/components/HomeRestoredSections.jsx` continues to provide the existing Experience, Field Force and Call Center content.
- `tests/sticky-showcases.spec.js` checks real browser rectangles and hit testing, native wheel and keyboard input, reverse scrolling, header changes, mobile readability, contrast and the final exit.

All three panels share a single containing block. Consecutive panels stay in normal flow, one usable viewport apart. When the first panel pins, the next panel starts at the viewport bottom. Scrolling one usable viewport moves that next panel to the same pin position, completely covering the first. The sequence repeats for the third panel.

There is no trailing spacer. At the point where the third panel completely covers the second, the shared container's bottom reaches the viewport bottom. Further scrolling releases the final panel and moves the next Services section upward at the same rate. Earlier panels remain fully covered during the exit. Reverse scrolling follows the same geometry.

The header remains above the stack. Its measured height is shared by all panel offsets; the previous 112/122/132px offsets are removed. Ancestor overflow is visible or `clip`, with no transformed or nested scrolling ancestor. The existing `main { overflow-x: clip }` does not establish a separate scrolling container.

## Responsive and reduced motion

Pinning is enabled when every panel's actual content plus padding fits within the available viewport. It works on ordinary 1366x768 and 1280x720 laptops, not just tall desktop windows. If content is taller than the usable screen, all three panels return to ordinary document flow with full-width backgrounds and every feature and CTA readable. Resizing back restores pinning. No content is hidden and there are no nested scroll areas.

The native overlap also works with reduced motion because no artificial animation runs. No wheel interception, snapping, crossfade, scale, parallax or timed advancement is used.

## Existing brand text

The separate `src/components/ui/text-hover-effect.tsx` and capability-marquee watermark are unchanged by this geometry fix. The project's existing TypeScript, Tailwind v4 and shadcn-compatible `src/components/ui` structure need no additional dependencies.
