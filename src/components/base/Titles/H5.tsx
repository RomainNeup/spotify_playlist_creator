import { ReactElement } from 'react';
import clsx from 'clsx';

export default function H5({ children, className }: TitleProps): ReactElement {
  const componentClass = clsx(
    className,
    [
      'text-primary',
      'text-xl',
      'font-medium',
      'tracking-tight',
    ],
  );
  return (
    <h5 className={componentClass}>
      {children}
    </h5>
  );
}
