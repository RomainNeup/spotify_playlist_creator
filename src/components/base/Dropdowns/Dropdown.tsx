import {
  ReactElement, useEffect, useRef, useState,
} from 'react';
import clsx from 'clsx';
import Icon from '../Icons/Icon';
import Image from '../Images/Image';

function DropdownItem({
  id, text, type, icon, image, disabled, className, onClick, to,
}: DropdownItemProps): ReactElement {
  const itemClass = clsx(
    className,
    type === 'divider'
      ? 'border-t border-basic'
      : [
        'block',
        'w-full',
        'px-4',
        'py-2',
        'text-left',
      ],
  );
  const buttonClass = clsx(
    itemClass,
    [
      'hover:bg-basic',
      'hover:text-secondary',
    ],
  );

  switch (type) {
    case 'link':
      if (to) {
        return (
          <a
            href={disabled ? '#' : to}
            className={buttonClass}
            onClick={onClick}
          >
            {icon && <Icon name={icon} className="mr-2" />}
            {image && <Image src={image} alt={id} className="mr-2 p-1 h-6 w-6 inline" background="none" />}
            {text}
          </a>
        );
      }
      break;
    case 'button':
      if (onClick) {
        return (
          <button
            type="button"
            className={buttonClass}
            onClick={onClick}
            disabled={disabled}
          >
            {icon && <Icon name={icon} className="mr-2" />}
            {image && <Image src={image} alt={id} className="mr-2 p-1 h-6 w-6 inline" background="none" />}
            {text}
          </button>
        );
      }
      break;
    case 'divider':
      return (
        <hr className={itemClass} />
      );
    default:
      break;
  }
  return (
    <span className={itemClass}>
      {icon && <Icon name={icon} className="mr-2" />}
      {image && <Image src={image} alt={id} className="mr-2 p-1 h-6 w-6 inline" background="none" />}
      {text}
    </span>
  );
}

export default function Dropdown({ children, items }: DropdownProps): ReactElement {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener('click', handleClickOutside, true);
    return () => {
      window.removeEventListener('click', handleClickOutside, true);
    };
  }, [ref]);

  return (
    <div className="relative inline-block h-full w-full" ref={ref}>
      <button className="contents" onClick={() => setOpen(!open)} type="button">
        {children}
      </button>
      {
        open && (
          <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg overflow-hidden bg-secondary border border-secondary text-basic shadow-lg focus:outline-none"
          >
            {items.map(({
              id, text, type, className, disabled, icon, image, onClick, to,
            }) => (
              <DropdownItem
                key={id}
                id={id}
                text={text}
                type={type}
                className={className}
                disabled={disabled}
                icon={icon}
                image={image}
                onClick={(e) => {
                  setOpen(false);
                  if (onClick) {
                    onClick(e);
                  }
                }}
                to={to}
              />
            ))}
          </div>
        )
      }
    </div>
  );
}
