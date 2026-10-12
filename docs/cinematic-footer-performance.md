# Cinematic footer and rendering changes

Update: the cinematic footer was reverted at the user's request. The active footer is `SiteFooter.jsx` with its original layout. The lightweight cinematic treatment now belongs to the three-row capability marquee below Why Choose Us, styled in `home-final-treatments.css`. Visible homepage pause buttons were removed; hover/focus, keyboard Space, reduced-motion and offscreen pausing remain. Client cards use pointer-driven blue border glow on only the hovered card. Hero renderer removal and the measurement notes below still apply.

- Adapted supplied cinematic-footer reference in `src/components/ui/motion-footer.tsx` around the existing footer content. Blue brand lettering, static grid/glow and glass link pills; original company/contact/credential content remains intact.
- Uses the installed Motion library for a single viewport reveal. Avoids adding GSAP, a fixed full-screen footer, continuous scroll scrubbing, animated large blur surfaces and unrelated demo marketing/download links.
- Removed HeroNeonFlow and SonarGrid from HomePage; hero has no canvas or WebGL renderer. Removed pointer tracking from HeroTechnologyStage while keeping its entrance and image hover presentation.
- ClientMarquee now pauses offscreen and while the browser tab is hidden; three-row capability marquee already does this.
- Local Chromium CDP exploratory comparison using 90 mouse moves: before 2 hero canvases, 12.542423 seconds TaskDuration / .542651 ScriptDuration; after 0 canvases, .203229 / .018494. Software-rendered headless browser results are environment-specific, not a universal speed percentage or Core Web Vitals benchmark.
- Browser layout checks at 390, 768 and 1440 pixels found no horizontal overflow. All six original footer credential images loaded.
