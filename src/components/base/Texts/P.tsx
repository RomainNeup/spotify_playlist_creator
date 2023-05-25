import React, { ReactElement } from 'react';
import clsx from 'clsx';

export default function P({ children, className, color = 'primary' }: PProps): ReactElement {
  const componentClass = clsx(
    className,
    [
      'text-base',
      'font-normal',
      'tracking-normal',
      'leading-relaxed',
    ],
    {
      'text-primary': color === 'primary',
      'text-secondary': color === 'secondary',
      'text-basic': color === 'basic',
    },
  );
  return (
    <p className={componentClass}>
      {children}
    </p>
  );
}
