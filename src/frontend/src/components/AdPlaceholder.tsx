interface AdPlaceholderProps {
  className?: string;
}

export function AdPlaceholder({ className = '' }: AdPlaceholderProps) {
  // Component exists but renders nothing to prevent accidental reintroduction
  return null;
}
