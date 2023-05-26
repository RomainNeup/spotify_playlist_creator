import { ReactElement } from 'react';
import clsx from 'clsx';

export default function Checkbox({
  label, checked, disabled, onChange, className,
}: CheckboxProps): ReactElement {
  const labelClass = clsx(
    className,
    [
      'inline-flex',
      'items-center',
    ]
  );
  const inputClass = clsx(
    [
      'w-6',
      'h-6',
      'rounded-full',
      'bg-basic',
      'checked:bg-primary',
      'focus:checked:bg-primary',
      'hover:focus:checked:bg-secondary',
      'hover:checked:bg-secondary',
      'hover:bg-primary',
      'focus:ring-0',
      'hover:ring-offset-1',
      'hover:ring-offset-primary',
      'hover:ring-primary',
    ],
  );

  return (
    <label className={labelClass} htmlFor={label}>
      <input
        id={label}
        type="checkbox"
        disabled={disabled}
        onChange={onChange}
        checked={checked}
        className={inputClass}
      />
      <span className="ml-3">{label}</span>
    </label>
  );
}
