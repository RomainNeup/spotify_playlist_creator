interface PProps {
  children: React.ReactNode;
  className?: string;
  color?: "primary" | "secondary" | "basic";
}

interface UserTextProps {
  className?: string;
  text: string;
  handleDelete: () => void;
  handleEdit: (text: string) => void;
  isEditable?: boolean;
  username?: string;
  color?: "primary" | "secondary" | "basic";
}
