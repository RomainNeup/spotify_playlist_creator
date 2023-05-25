import React, { ReactElement } from 'react';
import clsx from 'clsx';

export default function H1({ children, className }: TitleProps): ReactElement {
  const componentClass = clsx(
    className,
    [
      'text-primary',
      'text-5xl',
      'font-black',
      'tracking-wider',
    ],
  );
  return (
    <h1 className={componentClass}>
      {children}
    </h1>
  );
}
