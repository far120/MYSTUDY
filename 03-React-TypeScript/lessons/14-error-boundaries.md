# Lesson 14: Error Boundaries 🛡️

## Welcome to Error Handling! 🚨

Imagine your app is like a ship with multiple watertight compartments. If one compartment gets damaged, **Error Boundaries** prevent the entire ship from sinking by containing the damage. They're React's safety nets that catch JavaScript errors and show fallback UIs instead of crashing your entire app!

## 🤔 What are Error Boundaries?

**Error Boundaries** are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.

### Real-World Analogy:

Think of Error Boundaries like **circuit breakers in your house**:

- 🏠 **House** is your app
- ⚡ **Electrical circuits** are your components
- 🔌 **Circuit breaker** is the error boundary
- 💡 **Lights going out** is a component error

When there's an electrical fault, only that circuit fails—not your entire house!

## 🎯 Basic Error Boundary

### 1. **Class Component Error Boundary**

```tsx
import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to console or error reporting service
    console.error("Error Boundary caught an error:", error, errorInfo);

    // Update state with error info for debugging
    this.setState({
      error,
      errorInfo,
    });

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-red-500 text-2xl">🚨</div>
              <h2 className="text-xl font-bold text-red-700">
                Oops! Something went wrong
              </h2>
            </div>

            <p className="text-gray-600 mb-4">
              We encountered an unexpected error. Don't worry, this has been
              reported to our team.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Reload Page
            </button>

            {/* Development mode: Show error details */}
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-4 p-4 bg-gray-50 rounded border">
                <summary className="cursor-pointer font-semibold text-gray-700 mb-2">
                  🔍 Error Details (Development Only)
                </summary>
                <div className="text-sm">
                  <p className="font-semibold text-red-600 mb-2">Error:</p>
                  <pre className="bg-red-100 p-2 rounded text-xs overflow-auto mb-3">
                    {this.state.error.toString()}
                  </pre>

                  {this.state.errorInfo && (
                    <>
                      <p className="font-semibold text-red-600 mb-2">
                        Component Stack:
                      </p>
                      <pre className="bg-red-100 p-2 rounded text-xs overflow-auto">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </>
                  )}
                </div>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

## 🎮 Let's Build: Smart Error Boundaries

```tsx
import React, { Component, ErrorInfo, ReactNode, useState } from "react";

// Enhanced Error Boundary with different fallback strategies
interface SmartErrorBoundaryProps {
  children: ReactNode;
  level: "page" | "section" | "component";
  name?: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface SmartErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorId: string | null;
  retryCount: number;
}

class SmartErrorBoundary extends Component<
  SmartErrorBoundaryProps,
  SmartErrorBoundaryState
> {
  private maxRetries = 3;

  constructor(props: SmartErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorId: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(
    error: Error
  ): Partial<SmartErrorBoundaryState> {
    const errorId = `error_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    return {
      hasError: true,
      error,
      errorId,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { name, onError } = this.props;

    // Enhanced error logging
    const errorReport = {
      timestamp: new Date().toISOString(),
      boundaryName: name || "Unknown",
      boundaryLevel: this.props.level,
      error: {
        message: error.message,
        stack: error.stack,
        name: error.name,
      },
      componentStack: errorInfo.componentStack,
      retryCount: this.state.retryCount,
      userAgent: navigator.userAgent,
      url: window.location.href,
      errorId: this.state.errorId,
    };

    console.error("Smart Error Boundary Report:", errorReport);

    // Call external error handler
    if (onError) {
      onError(error, errorInfo);
    }

    // In a real app, you might send this to an error reporting service
    // Example: Sentry, LogRocket, or your own error API
    this.reportError(errorReport);
  }

  reportError = async (errorReport: any) => {
    try {
      // Simulate error reporting service
      console.log("📊 Reporting error to service...", errorReport);

      // In a real app:
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorReport)
      // });
    } catch (reportingError) {
      console.error("Failed to report error:", reportingError);
    }
  };

  handleRetry = () => {
    if (this.state.retryCount < this.maxRetries) {
      this.setState((prevState) => ({
        hasError: false,
        error: null,
        errorId: null,
        retryCount: prevState.retryCount + 1,
      }));
    }
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorId: null,
      retryCount: 0,
    });
  };

  renderFallback() {
    const { level, name } = this.props;
    const { error, errorId, retryCount } = this.state;
    const canRetry = retryCount < this.maxRetries;

    // Different fallback UIs based on error boundary level
    const getFallbackConfig = () => {
      switch (level) {
        case "page":
          return {
            icon: "🚨",
            title: "Page Error",
            bgColor: "bg-red-50",
            containerClass: "min-h-screen flex items-center justify-center p-4",
          };
        case "section":
          return {
            icon: "⚠️",
            title: "Section Error",
            bgColor: "bg-yellow-50",
            containerClass: "p-6 rounded-lg border border-yellow-200",
          };
        case "component":
          return {
            icon: "🔧",
            title: "Component Error",
            bgColor: "bg-orange-50",
            containerClass: "p-4 rounded border border-orange-200",
          };
        default:
          return {
            icon: "❌",
            title: "Error",
            bgColor: "bg-gray-50",
            containerClass: "p-4 rounded border",
          };
      }
    };

    const config = getFallbackConfig();

    return (
      <div className={config.containerClass}>
        <div className={`${config.bgColor} rounded-lg p-6 max-w-lg mx-auto`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{config.icon}</span>
            <h3 className="text-lg font-bold text-gray-800">
              {config.title}
              {name && `: ${name}`}
            </h3>
          </div>

          <p className="text-gray-600 mb-4">
            {level === "page"
              ? "We're sorry, but this page encountered an error. Please try refreshing or contact support."
              : level === "section"
              ? "This section is temporarily unavailable. You can continue using other parts of the app."
              : "This component couldn't load properly. Try refreshing the component."}
          </p>

          <div className="flex gap-2 mb-4">
            {canRetry && (
              <button
                onClick={this.handleRetry}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
              >
                🔄 Retry ({this.maxRetries - retryCount} left)
              </button>
            )}

            <button
              onClick={this.handleReset}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
            >
              🔄 Reset
            </button>

            {level === "page" && (
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
              >
                🔄 Reload Page
              </button>
            )}
          </div>

          {errorId && (
            <div className="text-xs text-gray-500 mb-3">
              Error ID:{" "}
              <code className="bg-gray-200 px-1 rounded">{errorId}</code>
            </div>
          )}

          {/* Development error details */}
          {process.env.NODE_ENV === "development" && error && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-semibold text-gray-700 mb-2">
                🔍 Debug Information
              </summary>
              <div className="text-xs">
                <div className="bg-red-100 p-2 rounded mb-2">
                  <strong>Error:</strong> {error.message}
                </div>
                <div className="bg-gray-100 p-2 rounded">
                  <strong>Retry Count:</strong> {retryCount}/{this.maxRetries}
                </div>
              </div>
            </details>
          )}
        </div>
      </div>
    );
  }

  render() {
    if (this.state.hasError) {
      return this.renderFallback();
    }

    return this.props.children;
  }
}

// Problematic components for testing
function BuggyComponent() {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error("Intentional crash for testing error boundaries!");
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
      <h4 className="font-semibold text-green-800 mb-2">
        ✅ Working Component
      </h4>
      <p className="text-green-700 text-sm mb-3">
        This component is working fine!
      </p>
      <button
        onClick={() => setShouldCrash(true)}
        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors"
      >
        💥 Trigger Error
      </button>
    </div>
  );
}

function RandomErrorComponent() {
  const [attempts, setAttempts] = useState(0);

  // Randomly throw error (30% chance)
  if (Math.random() < 0.3 && attempts > 0) {
    throw new Error(`Random error occurred! Attempt: ${attempts}`);
  }

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <h4 className="font-semibold text-blue-800 mb-2">🎲 Random Component</h4>
      <p className="text-blue-700 text-sm mb-3">
        This component has a 30% chance of crashing when you click the button.
      </p>
      <p className="text-xs text-blue-600 mb-3">Attempts: {attempts}</p>
      <button
        onClick={() => setAttempts((prev) => prev + 1)}
        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors"
      >
        🎯 Try Your Luck
      </button>
    </div>
  );
}

function AsyncErrorComponent() {
  const [error, setError] = useState<string | null>(null);

  if (error) {
    throw new Error(error);
  }

  const simulateAsyncError = async () => {
    try {
      // Simulate async operation that might fail
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.5) {
            reject(new Error("Async operation failed!"));
          } else {
            resolve("Success!");
          }
        }, 1000);
      });
    } catch (asyncError) {
      setError((asyncError as Error).message);
    }
  };

  return (
    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h4 className="font-semibold text-purple-800 mb-2">⏱️ Async Component</h4>
      <p className="text-purple-700 text-sm mb-3">
        This component simulates async errors that might occur during API calls.
      </p>
      <button
        onClick={simulateAsyncError}
        className="px-3 py-1 bg-purple-500 hover:bg-purple-600 text-white text-sm rounded transition-colors"
      >
        🔄 Simulate Async Operation
      </button>
    </div>
  );
}

// Main demo component
function ErrorBoundaryDemo() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Error Boundaries Demo
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Click the buttons below to see how error boundaries handle different
          types of errors
        </p>

        {/* Page-level error boundary */}
        <SmartErrorBoundary level="page" name="Main Page">
          {/* Section-level error boundaries */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <SmartErrorBoundary level="section" name="Buggy Section">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Intentional Error
                </h3>
                <BuggyComponent />
              </div>
            </SmartErrorBoundary>

            <SmartErrorBoundary level="section" name="Random Section">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Random Error</h3>
                <RandomErrorComponent />
              </div>
            </SmartErrorBoundary>

            <SmartErrorBoundary level="section" name="Async Section">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Async Error</h3>
                <AsyncErrorComponent />
              </div>
            </SmartErrorBoundary>
          </div>

          {/* Component-level error boundaries */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">
              Multiple Components with Individual Error Boundaries
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SmartErrorBoundary level="component" name="Component A">
                <BuggyComponent />
              </SmartErrorBoundary>

              <SmartErrorBoundary level="component" name="Component B">
                <RandomErrorComponent />
              </SmartErrorBoundary>

              <SmartErrorBoundary level="component" name="Component C">
                <AsyncErrorComponent />
              </SmartErrorBoundary>

              <SmartErrorBoundary level="component" name="Component D">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">
                    ✅ Stable Component
                  </h4>
                  <p className="text-green-700 text-sm">
                    This component never crashes!
                  </p>
                </div>
              </SmartErrorBoundary>
            </div>
          </div>

          {/* Error boundary best practices info */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">
              🛡️ Error Boundary Best Practices
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">✅ Do:</h4>
                <ul className="text-blue-600 space-y-1">
                  <li>• Wrap components at different levels</li>
                  <li>• Provide meaningful fallback UIs</li>
                  <li>• Log errors for debugging</li>
                  <li>• Implement retry mechanisms</li>
                  <li>• Report errors to monitoring services</li>
                  <li>• Show user-friendly error messages</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-blue-700 mb-2">❌ Don't:</h4>
                <ul className="text-blue-600 space-y-1">
                  <li>• Wrap every single component</li>
                  <li>• Show technical error messages to users</li>
                  <li>• Ignore errors silently</li>
                  <li>• Forget to handle async errors</li>
                  <li>• Use error boundaries for control flow</li>
                  <li>• Wrap event handlers (they won't catch)</li>
                </ul>
              </div>
            </div>
          </div>
        </SmartErrorBoundary>
      </div>
    </div>
  );
}

export default ErrorBoundaryDemo;
```

## 🔧 Error Reporting Integration

```tsx
import React, { Component, ErrorInfo, ReactNode } from "react";

// Simulated error reporting service
class ErrorReportingService {
  static async reportError(errorData: {
    error: Error;
    errorInfo: ErrorInfo;
    userContext?: any;
    metadata?: any;
  }) {
    // In a real app, this would send to services like:
    // - Sentry: Sentry.captureException(error, { contexts: { react: errorInfo } })
    // - LogRocket: LogRocket.captureException(error)
    // - Bugsnag: Bugsnag.notify(error, event => { event.addMetadata('react', errorInfo) })

    console.log("📊 Error Report:", {
      timestamp: new Date().toISOString(),
      error: {
        message: errorData.error.message,
        stack: errorData.error.stack,
        name: errorData.error.name,
      },
      componentStack: errorData.errorInfo.componentStack,
      userContext: errorData.userContext,
      metadata: errorData.metadata,
      url: window.location.href,
      userAgent: navigator.userAgent,
    });

    // Simulate API call
    return new Promise((resolve) => setTimeout(resolve, 100));
  }
}

interface ProductionErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  userContext?: {
    userId?: string;
    email?: string;
    plan?: string;
  };
}

interface ProductionErrorBoundaryState {
  hasError: boolean;
  errorId: string | null;
}

class ProductionErrorBoundary extends Component<
  ProductionErrorBoundaryProps,
  ProductionErrorBoundaryState
> {
  constructor(props: ProductionErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorId: null,
    };
  }

  static getDerivedStateFromError(): ProductionErrorBoundaryState {
    const errorId = `error_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    return {
      hasError: true,
      errorId,
    };
  }

  async componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const { userContext } = this.props;

    try {
      // Report error to monitoring service
      await ErrorReportingService.reportError({
        error,
        errorInfo,
        userContext,
        metadata: {
          errorId: this.state.errorId,
          environment: process.env.NODE_ENV,
          buildVersion: process.env.REACT_APP_VERSION || "unknown",
        },
      });
    } catch (reportingError) {
      console.error("Failed to report error:", reportingError);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-red-500 text-4xl mb-4">🚨</div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600 mb-6">
              We've been notified about this error and are working to fix it.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Reload Application
              </button>

              <button
                onClick={() => window.history.back()}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Go Back
              </button>
            </div>

            {this.state.errorId && (
              <p className="text-xs text-gray-500 mt-4">
                Error ID: {this.state.errorId}
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Usage example with user context
function AppWithErrorBoundary() {
  // Simulated user data
  const userContext = {
    userId: "user_123",
    email: "user@example.com",
    plan: "premium",
  };

  return (
    <ProductionErrorBoundary userContext={userContext}>
      <ErrorBoundaryDemo />
    </ProductionErrorBoundary>
  );
}

export { ProductionErrorBoundary, AppWithErrorBoundary };
```

## 🎯 Error Boundary Limitations

### ⚠️ Error Boundaries DO NOT catch:

- **Event handlers** (use try-catch instead)
- **Asynchronous code** (setTimeout, promises, async/await)
- **Errors during server-side rendering**
- **Errors thrown in error boundaries themselves**

### 💡 Solutions for Uncaught Errors:

```tsx
import React, { useState, useEffect } from "react";

function AsyncErrorHandler() {
  const [asyncError, setAsyncError] = useState<Error | null>(null);

  // Handle async errors manually
  const handleAsyncOperation = async () => {
    try {
      const response = await fetch("/api/data");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      console.log("Data:", data);
    } catch (error) {
      setAsyncError(error as Error);
    }
  };

  // Handle event errors manually
  const handleButtonClick = () => {
    try {
      // Some operation that might throw
      throw new Error("Event handler error");
    } catch (error) {
      setAsyncError(error as Error);
    }
  };

  // Global error handling
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
      setAsyncError(new Error(`Unhandled promise rejection: ${event.reason}`));
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);

  if (asyncError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <h4 className="font-semibold text-red-800 mb-2">Async Error Caught</h4>
        <p className="text-red-700 text-sm mb-3">{asyncError.message}</p>
        <button
          onClick={() => setAsyncError(null)}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded"
        >
          Clear Error
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleAsyncOperation}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
      >
        Test Async Error
      </button>

      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
      >
        Test Event Error
      </button>
    </div>
  );
}

export default AsyncErrorHandler;
```

## 🎯 What You've Learned

### ✅ Error Boundary Fundamentals:

1. **Class component** error boundaries
2. **getDerivedStateFromError** for UI updates
3. **componentDidCatch** for error logging
4. **Fallback UI** strategies
5. **Error reporting** integration

### ✅ Production-Ready Features:

1. **Smart error boundaries** with levels
2. **Retry mechanisms** for transient errors
3. **Error reporting** to monitoring services
4. **User-friendly** error messages
5. **Development debugging** tools

### ✅ Best Practices:

1. **Strategic placement** of error boundaries
2. **Graceful degradation** patterns
3. **Error context** and reporting
4. **Manual handling** for async/event errors
5. **User experience** considerations

## 🚀 Congratulations! 🎉

You've completed **Week 2: Building Interactive UIs**! You now have the skills to:

- ✅ **Render dynamic lists** with proper keys
- ✅ **Handle forms and user input** effectively
- ✅ **Compose complex UIs** from simple components
- ✅ **Manage side effects** with useEffect
- ✅ **Create custom hooks** for reusable logic
- ✅ **Share global state** with Context API
- ✅ **Handle errors gracefully** with Error Boundaries

## 🎯 What's Next in Week 3?

Next week, we'll dive into **Advanced React Patterns**:

- **Performance optimization** techniques
- **Advanced TypeScript** patterns
- **Testing** strategies and best practices
- **State management** with external libraries
- **Advanced hooks** and patterns
- **Build optimization** and deployment
- **Real-world project** architecture

You're becoming a React expert! Keep building amazing things! 🚀

---

**💡 Remember**: Error boundaries are safety nets, not replacements for proper error handling. Always handle errors where they can occur, and use boundaries as the last line of defense!
