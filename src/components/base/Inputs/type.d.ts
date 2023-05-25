interface InputProps {
  className?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  type?: 'text' | 'password' | 'email' | 'number' | 'textarea' | 'file' | 'select';
  accept?: string;
  value?: string | number;
  placeholder?: string;
  label?: string;
  border?: boolean;
  rows?: number;
  autocomplete?: string;
  color?: 'primary' | 'secondary' | 'basic';
  inputRef?: React.RefObject<HTMLInputElement>;
  options?: {value: string, label: string, default?: boolean}[];
}

interface CheckboxProps {
  className?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  label?: string;
}
