# Hero sonar background

Adapted the user-supplied SonarGrid to the project's established React JSX/Vite structure. The reusable component lives in `src/components/ui/SonarGrid.jsx`; the existing `ui.jsx` remains the shared UI module. No TypeScript/shadcn migration or additional dependency was needed for this background-only integration.

`HomePage.jsx` wraps its existing hero in SonarGrid. `homepage.css` handles canvas layering and a soft mask behind the copy. Existing headline, actions, product artwork and blue palette are preserved. Defaults use Suffix blue `#0072bc`, 28px dot spacing, 170px/second waves, an ambient ping every 4.5 seconds and at most three rings. Clicking a non-control area emits a wave; links and buttons keep their normal behavior.

The canvas reserves the existing hero dimensions, caps device pixel ratio at two and paints at up to 30fps. Intersection/visibility observers stop scheduling offscreen or in hidden tabs. Idle periods use a timer. Resize observers refresh the canvas size. Reduced motion renders a static grid and disables pointer waves. Event listeners, observers, timers and animation frames are cleaned up on unmount.

Validation: build and lint passed; five responsive checks, normal/reduced-motion interaction checks and automated accessibility checks passed. A dedicated browser test verifies changing canvas output, static reduced-motion output and the hero product link. Desktop preview: `artifacts/hero-sonar-desktop.png`.
