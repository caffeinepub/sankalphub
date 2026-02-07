import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingIndicator } from './LoadingIndicator';
import { Download } from 'lucide-react';

interface ToolShellProps {
  title: string;
  description: string;
  children: ReactNode;
  actionButton?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  isLoading?: boolean;
  loadingText?: string;
  result?: {
    content: ReactNode;
  };
  download?: {
    onClick: () => void;
    label?: string;
  };
}

export function ToolShell({
  title,
  description,
  children,
  actionButton,
  isLoading,
  loadingText,
  result,
  download,
}: ToolShellProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input Area */}
          <div className="space-y-4">
            {children}
          </div>

          {/* Action Button */}
          {actionButton && (
            <Button
              onClick={actionButton.onClick}
              disabled={actionButton.disabled || isLoading}
              className="w-full"
              size="lg"
            >
              {actionButton.label}
            </Button>
          )}

          {/* Loading State */}
          {isLoading && <LoadingIndicator text={loadingText} />}

          {/* Result Output */}
          {result && !isLoading && (
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-sm">Result:</h3>
              <div className="text-sm">{result.content}</div>
              
              {/* Download Button */}
              {download && (
                <Button onClick={download.onClick} variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  {download.label || 'Download'}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
