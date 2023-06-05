import { ReactElement } from 'react';
import clsx from 'clsx';

export default function Button({
  children,
  className,
  color,
  disabled,
  fullWidth,
  onClick,
  plain,
  size,
  to,
  textAlignment,
  border = true,
}: ButtonProps): ReactElement {
  const componentClass = clsx(
    className,
    [
      'block',
      'rounded-lg',
      'h-fit',
    ],
    {
      border,

      'p-1': size === 'small' && !border,
      'p-1 px-2': size === 'small' && border,
      'p-3 px-4': size === 'medium' || !size,
      'p-4 px-6': size === 'large',

      'border-primary': color === 'primary' || !color,
      'border-secondary': color === 'secondary',
      'border-basic': color === 'basic',

      'bg-primary text-basic hover:text-primary': (color === 'primary' || !color) && plain,
      'bg-secondary text-basic hover:text-secondary': color === 'secondary' && plain,
      'bg-basic text-primary hover:text-basic': color === 'basic' && plain,

      'text-primary hover:bg-primary/50 hover:text-basic fill-primary hover:fill-basic': (color === 'primary' || !color) && !plain && !border,
      'text-secondary hover:bg-secondary/50 hover:text-basic fill-secondary hover:fill-basic': color === 'secondary' && !plain && !border,
      'text-basic hover:bg-basic/50 hover:text-primary fill-basic hover:fill-primary': color === 'basic' && !plain && !border,

      'text-primary hover:bg-primary hover:text-basic fill-primary hover:fill-basic': (color === 'primary' || !color) && !plain && border,
      'text-secondary hover:bg-secondary hover:text-basic': color === 'secondary' && !plain && border,
      'text-basic hover:bg-basic hover:text-primary': color === 'basic' && !plain && border,

      'hover:bg-transparent': plain,

      'w-full': fullWidth,
      'w-fit': !fullWidth,
      'text-left': textAlignment === 'left',
      'text-center': textAlignment === 'center' || !textAlignment,
      'text-right': textAlignment === 'right',
    },
  );

  if (to) {
    return (
      <a
        className={componentClass}
        href={to}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={componentClass}
      type={onClick ? 'button' : 'submit'}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
