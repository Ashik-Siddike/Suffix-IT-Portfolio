import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

export function StickyShowcaseStack({ children }: { children: ReactNode }) {
  const stack = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = stack.current;
    const header = document.querySelector<HTMLElement>('.site-header');
    if (!element || !header) return;

    // Only layout changes need measuring. Scrolling itself is entirely native CSS.
    const measure = () => {
      const headerHeight = header.getBoundingClientRect().height;
      element.style.setProperty('--sticky-header-height', `${headerHeight}px`);
      const panels = Array.from(element.querySelectorAll<HTMLElement>('.sticky-showcase-panel'));
      // min-height resolves the same viewport calculation in sticky and ordinary flow modes.
      const availableHeight = panels[0] ? parseFloat(getComputedStyle(panels[0]).minHeight) : 0;
      const fits = panels.every((panel) => {
        const grid = panel.querySelector<HTMLElement>('.sticky-showcase-grid');
        const style = getComputedStyle(panel);
        const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
        return grid && grid.getBoundingClientRect().height + padding <= availableHeight + 1;
      });
      element.dataset.scrollMode = fits ? 'sticky' : 'flow';
    };

    const observer = new ResizeObserver(measure);
    observer.observe(header);
    // Viewport units can settle after the window's resize event, without resizing the content.
    element
      .querySelectorAll('.sticky-showcase-panel, .sticky-showcase-grid')
      .forEach((panel) => observer.observe(panel));
    window.addEventListener('resize', measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div ref={stack} className="home-sticky-showcases" data-scroll-mode="sticky">
      {children}
    </div>
  );
}

type Props = {
  id: string;
  className: string;
  index: number;
  side: 'left' | 'right';
  image: ReactNode;
  children: ReactNode;
};

export default function StickyShowcase({ id, className, index, side, image, children }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`sticky-showcase-panel ${className} is-image-${side}`}
      style={{ '--panel-layer': index + 1 } as CSSProperties}
      onFocusCapture={(event) => {
        const panel = event.currentTarget;
        const stack = panel.parentElement;
        const target = event.target as HTMLElement;
        if (stack?.dataset.scrollMode !== 'sticky' || !target.closest('a, button')) return;
        const rect = target.getBoundingClientRect();
        const visiblePanel = document
          .elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2)
          ?.closest('.sticky-showcase-panel');
        if (visiblePanel !== panel) {
          // Native focus scrolling does not account for a later sticky sibling covering a link.
          const headerHeight = parseFloat(
            getComputedStyle(stack).getPropertyValue('--sticky-header-height'),
          );
          const start = stack.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: start + index * panel.offsetHeight - headerHeight,
            behavior: 'instant',
          });
        }
      }}
    >
      <div className="sticky-showcase-grid restored-split">
        <div className="sticky-showcase-art">{image}</div>
        <div className="sticky-showcase-copy">{children}</div>
      </div>
    </section>
  );
}
