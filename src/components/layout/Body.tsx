import React, { ReactElement } from 'react';
import clsx from 'clsx';
import Errors from './Errors';
// import Errors from './Errors';

export default function Body({ children, className, size }: BodyProps): ReactElement {
  const bodyClass = clsx(
    className,
    [
      'flex',
      'flex-col',
      'justify-center',
      'w-full',
      'content-center',
      'space-y-4',
    ],
    {
      'max-w-md': size === 'small',
      'max-w-lg': size === 'medium',
      'max-w-3xl': size === 'large',
    },
  );

  return (
    <div className={bodyClass}>
      <Errors />
      {children}
    </div>
  );
}
