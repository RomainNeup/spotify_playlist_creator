import { ReactElement } from 'react';
import clsx from 'clsx';

export default function H3({ children, className }: TitleProps): ReactElement {
  const componentClass = clsx(
    className,
    [
      'text-primary',
      'text-3xl',
      'font-bold',
      'tracking-wide',
    ],
  );
  return (
    <h3 className={componentClass}>
      {children}
    </h3>
  );
}
