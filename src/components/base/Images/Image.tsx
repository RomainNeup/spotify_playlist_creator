import { ReactElement } from 'react';
import clsx from 'clsx';

export default function Image({
  className, round, border, background = 'secondary', alt, src,
}: ImageProps): ReactElement {
  const imageClass = clsx(
    className,
    [
      'object-cover'
    ],
    {
      'w-full': !className?.includes("w-"),
      'h-full': !className?.includes("h-"),
      'rounded-full': round,
      border: !!border,
      'border-primary': border === 'primary',
      'border-secondary': border === 'secondary',
      'border-basic': border === 'basic',
      'bg-primary': background === 'primary',
      'bg-secondary': background === 'secondary',
      'bg-basic': background === 'basic',
    },
  );

  return (
    <img
      className={imageClass}
      src={src}
      alt={alt}
    />
  );
}
