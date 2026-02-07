import React, { Component, type ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-4 bg-background">
                    <Alert variant="destructive" className="max-w-lg">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Something went wrong</AlertTitle>
                        <AlertDescription className="mt-2">
                            <p className="mb-4">
                                An unexpected error occurred. Please try refreshing the page.
                            </p>
                            <Button
                                variant="outline"
                                onClick={() => window.location.reload()}
                            >
                                Refresh Page
                            </Button>
                        </AlertDescription>
                    </Alert>
                </div>
            );
        }

        return this.props.children;
    }
}
