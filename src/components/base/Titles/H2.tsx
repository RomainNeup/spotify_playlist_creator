import React, { ReactElement } from 'react';
import clsx from 'clsx';

export default function H2({ children, className }: TitleProps): ReactElement {
  const componentClass = clsx(
    className,
    [
      'text-primary',
      'text-4xl',
      'font-extrabold',
      'tracking-wider',
    ],
  );
  return (
    <h2 className={componentClass}>
      {children}
    </h2>
  );
}
