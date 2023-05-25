interface DropdownItemProps {
  id: string;
  type: 'link' | 'button' | 'text' | 'divider';
  text?: string;
  icon?: string;
  image?: string;
  disabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  to?: string;
}

interface DropdownProps {
  children: React.ReactNode;
  items: DropdownItemProps[];
}
