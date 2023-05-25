import { ReactElement } from 'react';
import clsx from 'clsx';

export default function Checkbox({
  label, checked, disabled, onChange,
}: CheckboxProps): ReactElement {
  const inputClass = clsx(
    [
      'w-6',
      'h-6',
      'rounded-full',
      'bg-basic',
      'checked:bg-secondary',
      'hover:checked:bg-secondary',
      'focus:checked:bg-secondary',
      'focus:ring-offset-1',
      'focus:ring-offset-secondary',
      'focus:ring-secondary',
    ],
  );

  return (
    <label className="inline-flex items-center" htmlFor={label}>
      <input
        id={label}
        type="checkbox"
        disabled={disabled}
        onChange={onChange}
        checked={checked}
        className={inputClass}
      />
      <span className="ml-4">{label}</span>
    </label>
  );
}
