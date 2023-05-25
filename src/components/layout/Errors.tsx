import { ReactElement } from 'react';
import clsx from 'clsx';
import Error from '../base/Errors/Error';

export default function Errors({ className }: BasicProps): ReactElement {
  const containerClass = clsx(
    className,
    [
      'space-y-4',
      'mb-8',
    ]
  );

  return (
    <div className={containerClass}>
      <Error key={"error"} />
    </div>
  );
}
