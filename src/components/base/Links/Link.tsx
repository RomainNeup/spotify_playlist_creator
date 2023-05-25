import React, { ReactElement } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import clsx from 'clsx';

export default function Link({ children, to, className }: LinkProps): ReactElement {
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
      <ReactLink
        className={componentClass}
        to={to}
      >
        {children}
      </ReactLink>
    </div>
  );
}
