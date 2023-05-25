import { ReactElement } from 'react';
import clsx from 'clsx';

export default function Input({
  className,
  disabled,
  label,
  border = true,
  onChange,
  placeholder,
  type = 'text',
  accept,
  value,
  rows = 4,
  autocomplete = 'off',
  color = 'primary',
  inputRef,
  options = [],
}: InputProps): ReactElement {
  const componentClass = clsx(
    className,
    {
      'text-primary': color === 'primary',
      'text-secondary': color === 'secondary',
      'text-basic': color === 'basic',
    },
  );
  const inputClass = clsx(
    [
      'w-full',
      'block',
      'rounded-lg',
      'bg-transparent',
      'placeholder:text-primary/50',
    ],
    {
      'border border-primary': border,
      'border-0': !border,
      'focus:ring-primary focus:border-primary': color === 'primary',
      'focus:ring-secondary focus:border-secondary': color === 'secondary',
      'focus:ring-basic focus:border-basic': color === 'basic',
      'p-2': border && type !== 'file',
      'mt-2': !!label,
    },
    type === 'file' ? [
      'file:bg-primary',
      'file:p-2',
      'file:mr-2',
      'file:cursor-pointer',
      'hover:file:bg-transparent',
      'hover:file:text-primary',
      'file:border-primary',
      'file:border-0',
      'file:border-r',
      'file:border-solid',
    ] : 'px-2',
  );

  return (
    <div className={componentClass}>
      <label hidden={!label} htmlFor={label}>{label}</label>
      {
        type === 'textarea' ? (
          <textarea
            id={label}
            className={inputClass}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            rows={rows}
          />
        ) : (
          type === 'select' ? (
            <select className={inputClass} onChange={onChange} value={value}>
              {
                options.map((option) => (
                  <option value={option.value} key={option.value}>{option.label}</option>
                ))
              }
            </select>
          ) : (
          <input
            id={label}
            className={inputClass}
            type={type}
            accept={accept}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            autoComplete={autocomplete}
            ref={inputRef}
          />
        ))
      }
    </div>
  );
}
