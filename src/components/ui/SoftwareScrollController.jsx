import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SoftwareScrollController({ section }) {
  useGSAP(
    () => {
      const root = section.current;
      const pin = root.querySelector('.software-story-pin');
      const viewport = root.querySelector('.software-story-viewport');
      const track = root.querySelector('.software-story-track');
      const scenes = [...root.querySelectorAll('.software-story-scene')];
      const progressPath = root.querySelector('.software-circuit-progress');
      const nodes = [...root.querySelectorAll('.software-circuit-node')];
      const counter = root.querySelector('[data-story-counter]');
      const currentName = root.querySelector('[data-story-current]');
      const header = document.querySelector('.site-header');
      const probe = root.querySelector('.software-story-size-probe');
      const media = gsap.matchMedia();
      let disposed = false;
      const allLinks = [...track.querySelectorAll('a, button')].filter(
        (link) => !link.closest('dialog'),
      );
      const originalTabIndexes = allLinks.map((link) => link.getAttribute('tabindex'));

      const reset = () => {
        root.dataset.storyMode = 'vertical';
        delete root.dataset.storyProgress;
        delete root.dataset.storyCurrentIndex;
        delete root.dataset.storyStart;
        delete root.dataset.storyEnd;
        scenes.forEach((scene) => scene.removeAttribute('aria-hidden'));
        allLinks.forEach((link, index) => {
          if (originalTabIndexes[index] === null) link.removeAttribute('tabindex');
          else link.setAttribute('tabindex', originalTabIndexes[index]);
        });
        progressPath.style.removeProperty('stroke-dashoffset');
        nodes.forEach((node) => {
          node.dataset.active = 'true';
          node.dataset.current = 'false';
        });
        counter.textContent = '01';
        currentName.textContent = scenes[0].querySelector('h3').textContent;
      };

      media.add(
        { desktop: '(min-width: 1000px)', motion: '(prefers-reduced-motion: no-preference)' },
        (mediaContext, mediaSafe) => {
          if (!mediaContext.conditions.desktop || !mediaContext.conditions.motion) {
            reset();
            return;
          }
          let animationContext;
          let signature = '';
          let timer = 0;
          let alive = true;
          let pending = false;
          let lastActivity = performance.now();
          let contentHeights = '';
          const measureContentHeights = () =>
            scenes
              .map(
                (scene) =>
                  scene.querySelector('.software-story-scene-inner').getBoundingClientRect().height,
              )
              .join('/');

          // Use the media context's own wrapper. Re-entering the outer React context here
          // would record parent and child contexts inside one another during Strict Mode cleanup.
          const rebuild = mediaSafe(() => {
            if (!alive || disposed) return;
            animationContext?.revert();
            reset();
            const headerHeight = header.getBoundingClientRect().height;
            root.style.setProperty('--story-header-height', `${headerHeight}px`);
            signature = `${root.clientWidth}/${probe.clientHeight}/${headerHeight}`;
            root.dataset.storyMode = 'horizontal';
            const fits = scenes.every((scene) => {
              const inner = scene.querySelector('.software-story-scene-inner');
              const style = getComputedStyle(scene);
              return (
                inner.getBoundingClientRect().height +
                  parseFloat(style.paddingTop) +
                  parseFloat(style.paddingBottom) <=
                viewport.clientHeight + 1
              );
            });
            if (!fits) {
              reset();
              return;
            }
            contentHeights = measureContentHeights();
            const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
            const hold = () => Math.min(140, probe.clientHeight * 0.16);
            let travelDistance = distance();
            let milestones = scenes.map((scene) => scene.offsetLeft);
            let sceneWidths = scenes.map((scene) => scene.offsetWidth);
            let viewportWidth = viewport.clientWidth;
            let focusBounds = [];
            let lastChapter = -1;
            const measureFocusBounds = () => {
              travelDistance = distance();
              milestones = scenes.map((scene) => scene.offsetLeft);
              sceneWidths = scenes.map((scene) => scene.offsetWidth);
              viewportWidth = viewport.clientWidth;
              const rect = track.getBoundingClientRect();
              focusBounds = allLinks.map((link) => {
                const box = link.getBoundingClientRect();
                return { link, left: box.left - rect.left, right: box.right - rect.left };
              });
            };
            const renderProgress = () => {
              const moved = Math.max(
                0,
                Math.min(travelDistance, -Number(gsap.getProperty(track, 'x'))),
              );
              const progress = travelDistance ? moved / travelDistance : 0;
              const index = milestones.reduce(
                (closest, position, next) =>
                  Math.abs(position - moved) < Math.abs(milestones[closest] - moved)
                    ? next
                    : closest,
                0,
              );
              progressPath.style.strokeDashoffset = String(1 - progress);
              root.dataset.storyProgress = progress.toFixed(4);
              root.dataset.storyCurrentIndex = String(index);
              if (index !== lastChapter) {
                counter.textContent = String(index + 1).padStart(2, '0');
                currentName.textContent = scenes[index].querySelector('h3').textContent;
                nodes.forEach((node, nodeIndex) => {
                  node.dataset.active = String(nodeIndex <= index);
                  node.dataset.current = String(nodeIndex === index);
                });
                lastChapter = index;
              }
              scenes.forEach((scene, sceneIndex) => {
                const visible =
                  milestones[sceneIndex] - moved < viewportWidth &&
                  milestones[sceneIndex] + sceneWidths[sceneIndex] - moved > 0;
                scene.setAttribute('aria-hidden', String(!visible));
              });
              // Only links actually within the canvas enter the keyboard tab order.
              // Page Down / Arrow Down remain native; no forced focus scroll or wheel handling.
              focusBounds.forEach(
                ({ link, left, right }) =>
                  (link.tabIndex =
                    left - moved >= -1 && right - moved <= viewportWidth + 1 ? 0 : -1),
              );
            };

            animationContext = gsap.context(() => {
              gsap.set(track, { x: 0 });
              measureFocusBounds();
              const holdRatio = hold() / travelDistance;
              const timeline = gsap.timeline({
                onUpdate: renderProgress,
                scrollTrigger: {
                  id: 'software-horizontal-story',
                  trigger: root,
                  pin,
                  start: () => `top ${header.getBoundingClientRect().height}px`,
                  end: () => `+=${distance() + hold() * 2}`,
                  scrub: true,
                  pinSpacing: true,
                  invalidateOnRefresh: true,
                  onRefresh: (trigger) => {
                    measureFocusBounds();
                    root.dataset.storyStart = String(trigger.start);
                    root.dataset.storyEnd = String(trigger.end);
                    renderProgress();
                  },
                },
              });
              timeline.to(track, { x: 0, duration: holdRatio, ease: 'none' });
              timeline.to(track, { x: () => -distance(), duration: 1, ease: 'none' });
              timeline.to(track, { x: () => -distance(), duration: holdRatio, ease: 'none' });
              timeline.scrollTrigger.refresh();
              renderProgress();
            }, root);
          });
          const flush = () => {
            // Pin measurement briefly restores document scroll. Wait for native scrolling
            // to finish so a late import or image load cannot cancel Back to top's smooth scroll.
            if (!pending || !alive || disposed) return;
            const remaining = 220 - (performance.now() - lastActivity);
            if (remaining > 0 || ScrollTrigger.isScrolling()) {
              clearTimeout(timer);
              timer = setTimeout(flush, Math.max(remaining, 100));
              return;
            }
            pending = false;
            rebuild();
          };
          const noteActivity = () => {
            // Input can request smooth scrolling before the browser emits its first scroll event.
            lastActivity = performance.now();
            if (pending) {
              clearTimeout(timer);
              timer = setTimeout(flush, 220);
            }
          };
          const schedule = () => {
            pending = true;
            clearTimeout(timer);
            timer = setTimeout(flush, 60);
          };
          const onImageLoad = () => {
            // The mosaic reserves image space before loading. Rebuilding an unchanged pin
            // removes its spacer briefly and can clamp document scroll near the last chapter.
            if (
              root.dataset.storyMode === 'horizontal' &&
              measureContentHeights() === contentHeights
            )
              return;
            schedule();
          };
          const observer = new ResizeObserver(() => {
            const height = header.getBoundingClientRect().height;
            root.style.setProperty('--story-header-height', `${height}px`);
            if (`${root.clientWidth}/${probe.clientHeight}/${height}` !== signature) schedule();
          });
          observer.observe(root);
          observer.observe(header);
          observer.observe(probe);
          root.addEventListener('load', onImageLoad, true);
          window.addEventListener('scroll', noteActivity, { passive: true });
          window.addEventListener('pointerdown', noteActivity, { passive: true, capture: true });
          window.addEventListener('keydown', noteActivity, true);
          ScrollTrigger.addEventListener('scrollEnd', flush);
          if (document.fonts.status !== 'loaded') {
            document.fonts.ready.then(() => {
              if (alive) schedule();
            });
          }
          schedule();
          return () => {
            alive = false;
            clearTimeout(timer);
            observer.disconnect();
            root.removeEventListener('load', onImageLoad, true);
            window.removeEventListener('scroll', noteActivity);
            window.removeEventListener('pointerdown', noteActivity, true);
            window.removeEventListener('keydown', noteActivity, true);
            ScrollTrigger.removeEventListener('scrollEnd', flush);
            animationContext?.revert();
            reset();
          };
        },
      );
      return () => {
        disposed = true;
        media.revert();
        reset();
      };
    },
    { scope: section },
  );
  return null;
}
