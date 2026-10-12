import { cn } from '@/lib/utils';
import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
interface MarqueeProps extends ComponentPropsWithoutRef<'div'> {
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: ReactNode;
  vertical?: boolean;
  repeat?: number;
  speed?: 'slow' | 'normal' | 'fast';
}
export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 3,
  speed = 'normal',
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn('ui-marquee', className)}
      data-reverse={reverse}
      data-hover-pause={pauseOnHover}
      data-vertical={vertical}
      data-speed={speed}
    >
      {Array.from({ length: repeat }, (_, index) => (
        <div className="ui-marquee-group" key={index} aria-hidden={index > 0 ? true : undefined}>
          {index === 0
            ? children
            : Children.map(children, (child) =>
                isValidElement<HTMLAttributes<HTMLElement>>(child)
                  ? cloneElement(child, { tabIndex: -1 })
                  : child,
              )}
        </div>
      ))}
    </div>
  );
}
