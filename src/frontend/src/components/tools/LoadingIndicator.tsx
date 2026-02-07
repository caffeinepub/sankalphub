import { Loader2 } from 'lucide-react';

interface LoadingIndicatorProps {
  text?: string;
}

export function LoadingIndicator({ text = 'Processing...' }: LoadingIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      <Loader2 className="w-5 h-5 animate-spin text-primary" />
      <span className="text-sm text-muted-foreground">{text}</span>
    </div>
  );
}
