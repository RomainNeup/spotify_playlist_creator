import { ReactElement } from 'react';
import clsx from 'clsx';

export default function Link({ children, to, className, newTab = false }: LinkProps): ReactElement {
  const componentClass = clsx(
    className,
    [
      'w-full',
      'block',
      'rounded-lg',
      'bg-transparent',
      'text-primary',
      'hover:text-primary/75',
      'text-start',
      'underline',
    ],
  );
  return (
    <div>
      <a
        className={componentClass}
        href={to}
        target={newTab ? "_blank" : "_self"}
      >
        {children}
      </a>
    </div>
  );
}
