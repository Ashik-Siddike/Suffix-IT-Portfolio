# Our Company circuit layout

The About page's existing three company values use the supplied reference's branching, bent blue line treatment. These statements describe the company; they are not dated milestones or numbered process steps. All titles, the introductory paragraph and the three unique illustrations remain sourced from the existing project data.

The palette follows Suffix IT's blue `#0072bc`, dark heading `#093f64`, pale background `#f8fcff`, illustration surface `#e5f4fe` and quiet track `#d3eafb`. Existing Manrope headings and Inter body copy are reused. Desktop illustrations sit at different heights above the circuit; mobile stacks them beside a bent vertical rail. Rounded diagonal transitions, two small branches and three circular nodes provide the reference's visual character without its unrelated employment history.

- `src/components/HomeRestoredSections.jsx`: `CompanyValuesSection` supplies the original titles and image mapping; `src/pages/CompanyPage.jsx` places it at `/about#our-company`.
- `src/components/ui/CompanyCircuit.tsx`: SVG path geometry, circular HTML nodes, image/title rendering and one-time viewport-triggered Motion animations. `desktopRoutes` and `mobileRoutes` define the line bends.
- `src/company-circuit.css`: spacing, staggered heights, asymmetrical illustration frames and responsive layout. The mobile breakpoint is 700px.
- `src/components/ui/useMotionPreference.ts`: a live reduced-motion setting displays the content and complete paths immediately.

The trace draws once over 2.2 seconds after it reaches the viewport. Each value reveals independently when visible. There are no videos, canvases, mouse tracking or repeating animation loops in this section. Desktop/tablet nodes are separate circular elements so stretching the SVG cannot distort their proportions. The boss-approved homepage sections are outside this change.
