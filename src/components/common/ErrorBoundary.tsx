import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { theme } from '../../theme';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetOnPropsChange?: boolean;
  resetKeys?: Array<string | number | boolean | null | undefined>;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string;
}

export class ErrorBoundary extends Component<Props, State> {
  private resetTimeoutId: number | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Generate unique error ID for tracking
    const errorId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      hasError: true,
      error,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    this.setState({
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Report to error tracking service (Sentry, Bugsnag, etc.)
    this.reportError(error, errorInfo);
  }

  componentDidUpdate(prevProps: Props) {
    const { resetKeys, resetOnPropsChange } = this.props;
    const { hasError } = this.state;

    // Reset error state if resetKeys changed
    if (hasError && resetKeys && prevProps.resetKeys) {
      const hasResetKeyChanged = resetKeys.some((key, index) => 
        key !== prevProps.resetKeys![index]
      );

      if (hasResetKeyChanged) {
        this.resetErrorBoundary();
      }
    }

    // Reset error state if any props changed and resetOnPropsChange is true
    if (hasError && resetOnPropsChange && prevProps !== this.props) {
      this.resetErrorBoundary();
    }
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }
  }

  private reportError = (error: Error, errorInfo: ErrorInfo) => {
    // In a real app, send to error tracking service
    const errorReport = {
      errorId: this.state.errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location?.href,
    };

    // Example: Send to error tracking service
    // ErrorTrackingService.captureException(errorReport);
    
    console.warn('Error report:', errorReport);
  };

  private resetErrorBoundary = () => {
    if (this.resetTimeoutId) {
      clearTimeout(this.resetTimeoutId);
    }

    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: '',
    });
  };

  private handleRetry = () => {
    this.resetErrorBoundary();
  };

  private handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  private toggleErrorDetails = () => {
    // Implementation for showing/hiding error details
    // Could use a modal or expandable section
  };

  render() {
    const { hasError, error, errorInfo, errorId } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Custom fallback UI if provided
      if (fallback) {
        return fallback;
      }

      // Default error UI
      return (
        <View style={tw`flex-1 bg-gray-50 p-6 justify-center`}>
          <ScrollView contentContainerStyle={tw`flex-grow justify-center`}>
            {/* Error Icon */}
            <View style={tw`items-center mb-6`}>
              <View 
                style={[
                  tw`w-20 h-20 rounded-full items-center justify-center mb-4`,
                  { backgroundColor: theme.colors.red }
                ]}
              >
                <Text style={[tw`text-4xl`, { color: theme.colors.white }]}>!</Text>
              </View>
              
              <Text style={[tw`text-2xl font-bold text-center mb-2`, { color: theme.colors.carbon[90] }]}>
                Oops! Something went wrong
              </Text>
              
              <Text style={[tw`text-base text-center mb-6`, { color: theme.colors.carbon[70] }]}>
                We're sorry for the inconvenience. The app has encountered an unexpected error.
              </Text>
            </View>

            {/* Error Actions */}
            <View style={tw`space-y-4 mb-6`}>
              <TouchableOpacity
                style={[
                  tw`py-4 px-6 rounded-lg items-center`,
                  { backgroundColor: theme.colors.carbon.base }
                ]}
                onPress={this.handleRetry}
              >
                <Text style={[tw`text-white font-semibold text-lg`]}>
                  Try Again
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  tw`py-3 px-6 rounded-lg items-center border-2`,
                  { borderColor: theme.colors.carbon[50] }
                ]}
                onPress={this.handleReload}
              >
                <Text style={[tw`font-semibold`, { color: theme.colors.carbon[70] }]}>
                  Reload App
                </Text>
              </TouchableOpacity>
            </View>

            {/* Error Details (Development Mode) */}
            {__DEV__ && error && (
              <View style={tw`mt-6`}>
                <TouchableOpacity 
                  style={tw`mb-4`}
                  onPress={this.toggleErrorDetails}
                >
                  <Text style={[tw`text-sm font-medium`, { color: theme.colors.carbon[70] }]}>
                    Error Details (Tap to view)
                  </Text>
                </TouchableOpacity>

                <View style={[tw`p-4 rounded-lg`, { backgroundColor: theme.colors.carbon[10] }]}>
                  <Text style={[tw`text-xs mb-2 font-mono`, { color: theme.colors.carbon[70] }]}>
                    Error ID: {errorId}
                  </Text>
                  
                  <Text style={[tw`text-xs mb-2 font-bold`, { color: theme.colors.red }]}>
                    {error.name}: {error.message}
                  </Text>
                  
                  {error.stack && (
                    <ScrollView style={tw`max-h-40`}>
                      <Text style={[tw`text-xs font-mono`, { color: theme.colors.carbon[70] }]}>
                        {error.stack}
                      </Text>
                    </ScrollView>
                  )}
                  
                  {errorInfo?.componentStack && (
                    <View style={tw`mt-4`}>
                      <Text style={[tw`text-xs font-bold mb-2`, { color: theme.colors.carbon[80] }]}>
                        Component Stack:
                      </Text>
                      <ScrollView style={tw`max-h-32`}>
                        <Text style={[tw`text-xs font-mono`, { color: theme.colors.carbon[70] }]}>
                          {errorInfo.componentStack}
                        </Text>
                      </ScrollView>
                    </View>
                  )}
                </View>
              </View>
            )}

            {/* Support Information */}
            <View style={tw`mt-8 p-4 rounded-lg bg-blue-50`}>
              <Text style={[tw`text-sm font-medium mb-2`, { color: theme.colors.carbon[80] }]}>
                Need Help?
              </Text>
              <Text style={[tw`text-sm`, { color: theme.colors.carbon[70] }]}>
                If this problem persists, please contact our support team with Error ID: {errorId}
              </Text>
            </View>
          </ScrollView>
        </View>
      );
    }

    return children;
  }
}

// Higher-order component for easier usage
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

// Hook for error boundary integration with functional components
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, resetError };
};
