import { ReactElement } from 'react';
import clsx from 'clsx';
import H3 from '../base/Titles/H3';
import Link from '../base/Links/Link';

export default function Header({ className }: BasicProps): ReactElement {
  const headerClass = clsx(
    className,
    [
      'flex',
      'justify-between',
      'w-full',
      'items-center',
    ],
  );

  return (
    <div className={headerClass}>
      <H3>Playlist creator</H3>
      <Link to="/" className="no-underline">
        Logout
      </Link>
    </div>
  );
}
