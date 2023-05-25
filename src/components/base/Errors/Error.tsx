import { ReactElement } from 'react';
import clsx from 'clsx';
import Icon from '../Icons/Icon';
import P from '../Texts/P';

export default function Error(): ReactElement {
  const errorClass = clsx(
    [
      'flex',
      'justify-between',
      'bg-red',
      'text-primary',
      'px-8',
      'py-4',
      'rounded-lg',
    ],
  );

  return (
    <div className={errorClass}>
      <P color="primary">
        <Icon name="error" className="mr-2" />
      </P>
      <Icon onClick={() => {}} name="close" />
    </div>
  );
}
