import { ReactElement } from 'react';
import clsx from 'clsx';
import './style.css';

export default function Icon({
  name, className, onClick, plain, color,
}: IconProps): ReactElement {
  const iconClass = clsx(
    className,
    plain ? 'material-symbols-outlined' : 'material-symbols-rounded',
    {
      'text-primary': color === 'primary',
      'text-secondary': color === 'secondary',
      'text-basic': color === 'basic',
    },
    color && !!onClick && `hover:text-${color}/75`,
  );

  if (onClick) {
    return (
      <button className={iconClass} onClick={onClick} type="button">
        {name}
      </button>
    );
  }
  return (
    <span className={iconClass}>
      {name}
    </span>
  );
}
