import React, { ReactElement } from 'react';
import clsx from 'clsx';
import useErrors from '../../store/reducers/error/hooks';
import Error from '../base/Errors/Error';

export default function Errors({ className }: BasicProps): ReactElement {
  const { errors } = useErrors();
  const containerClass = clsx(
    className,
    [
      'space-y-4',
      'mb-8',
    ],
    {
      hidden: errors.length === 0,
    },
  );

  return (
    <div className={containerClass}>
      {errors.map((error) => <Error key={error.code} code={error.code} />)}
    </div>
  );
}
