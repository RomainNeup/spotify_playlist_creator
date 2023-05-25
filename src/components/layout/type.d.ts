interface BasicProps {
  className?: string;
}

interface BodyProps extends BasicProps {
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
}

interface LayoutProps extends BasicProps {
  children: React.ReactNode;
}
