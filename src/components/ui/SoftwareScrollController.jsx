import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function SoftwareScrollController({ section }) {
  useGSAP(
    () => {
      const root = section.current;
      if (!root) return;
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
      let currentMilestones = [];
      let currentTravelDistance = 0;
      let currentHoldRatio = 0;

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
        if (progressPath) progressPath.style.strokeDashoffset = '1';
        nodes.forEach((node, nodeIndex) => {
          node.dataset.active = String(nodeIndex === 0);
          node.dataset.current = String(nodeIndex === 0);
        });
        if (counter) counter.textContent = '01';
        if (currentName && scenes[0]) {
          const h3 = scenes[0].querySelector('h3');
          if (h3) currentName.textContent = h3.textContent;
        }
      };

      media.add(
        { desktop: '(min-width: 1000px)', motion: '(prefers-reduced-motion: no-preference)' },
        (mediaContext) => {
          if (!mediaContext.conditions.desktop || !mediaContext.conditions.motion) {
            reset();
            return;
          }

          // Desktop story mode is always horizontal
          root.dataset.storyMode = 'horizontal';

          const getHeaderHeight = () => (header ? header.getBoundingClientRect().height : 92);
          root.style.setProperty('--story-header-height', `${getHeaderHeight()}px`);

          const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
          const scrollTrackDistance = () => {
            const transitions = Math.max(1, scenes.length - 1);
            // Allocate ~210px of scroll per transition instead of full viewport width (1400px+).
            // Total pinned scroll distance drops from ~15,000px to ~2,100px (~2 viewport heights),
            // creating a snappy, engaging flow where visitors don't get stuck scrolling for too long.
            const perTransition = Math.max(170, Math.min(240, (viewport.clientHeight || 700) * 0.26));
            return Math.round(transitions * perTransition);
          };
          const hold = () => Math.min(60, Math.round((probe ? probe.clientHeight : 700) * 0.08));
          const getHoldRatio = () => {
            const std = scrollTrackDistance();
            return std ? hold() / std : 0.03;
          };

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
            currentTravelDistance = travelDistance;
            currentMilestones = milestones;
            currentHoldRatio = getHoldRatio();
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
            if (progressPath) progressPath.style.strokeDashoffset = String(1 - progress);
            root.dataset.storyProgress = progress.toFixed(4);
            root.dataset.storyCurrentIndex = String(index);
            if (index !== lastChapter) {
              if (counter) counter.textContent = String(index + 1).padStart(2, '0');
              if (currentName) {
                const h3 = scenes[index]?.querySelector('h3');
                if (h3) currentName.textContent = h3.textContent;
              }
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
            focusBounds.forEach(
              ({ link, left, right }) =>
                (link.tabIndex =
                  left - moved >= -1 && right - moved <= viewportWidth + 1 ? 0 : -1),
            );
          };

          gsap.set(track, { x: 0 });
          measureFocusBounds();
          const holdRatio = getHoldRatio();

          const timeline = gsap.timeline({
            onUpdate: renderProgress,
            scrollTrigger: {
              id: 'software-horizontal-story',
              trigger: root,
              pin,
              start: () => `top ${getHeaderHeight()}px`,
              end: () => `+=${scrollTrackDistance() + hold() * 2}`,
              scrub: 0.6,
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

          renderProgress();

          // Refresh metrics in-place on resize, font loaded, or image load WITHOUT destroying the pin
          const refreshTrigger = () => {
            if (disposed) return;
            const h = getHeaderHeight();
            root.style.setProperty('--story-header-height', `${h}px`);
            measureFocusBounds();
            timeline.scrollTrigger?.refresh();
          };

          const onImageLoad = () => {
            refreshTrigger();
          };

          const onResize = () => {
            refreshTrigger();
          };

          root.addEventListener('load', onImageLoad, true);
          window.addEventListener('resize', onResize, { passive: true });
          if (document.fonts?.ready) {
            document.fonts.ready.then(() => {
              refreshTrigger();
            });
          }

          const initTimer = setTimeout(refreshTrigger, 200);

          return () => {
            clearTimeout(initTimer);
            root.removeEventListener('load', onImageLoad, true);
            window.removeEventListener('resize', onResize);
            timeline.kill();
            ScrollTrigger.getById('software-horizontal-story')?.kill();
            reset();
          };
        },
      );

      const onNodeJump = (event) => {
        const targetIndex = event.detail?.index;
        if (typeof targetIndex !== 'number' || targetIndex < 0 || targetIndex >= scenes.length) return;

        if (root.dataset.storyMode === 'horizontal') {
          const trigger = ScrollTrigger.getById('software-horizontal-story');
          if (trigger && currentTravelDistance) {
            const targetOffset = currentMilestones[targetIndex] || 0;
            const scrollFraction = Math.max(0, Math.min(1, targetOffset / currentTravelDistance));
            const timelineFraction = (currentHoldRatio + scrollFraction) / (1 + currentHoldRatio * 2);
            const targetScroll = trigger.start + timelineFraction * (trigger.end - trigger.start);
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
          }
        } else {
          const headerHeight = header ? header.getBoundingClientRect().height : 70;
          const sceneTop =
            scenes[targetIndex].getBoundingClientRect().top + window.scrollY - headerHeight;
          window.scrollTo({ top: sceneTop, behavior: 'smooth' });
        }
      };
      root.addEventListener('circuit-node-jump', onNodeJump);

      return () => {
        disposed = true;
        root.removeEventListener('circuit-node-jump', onNodeJump);
        media.revert();
        reset();
      };
    },
    { scope: section },
  );

  return null;
}

