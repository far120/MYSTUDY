# Lesson 18: Higher-Order Components 🔄

## Welcome to Component Enhancement! 🚀

**Higher-Order Components (HOCs)** are like superpowers for your components! They're functions that take a component and return a new component with additional features. Think of them as decorators that add capabilities without changing the original component.

## 🎯 Basic HOC Pattern

```tsx
import React, { Component, ComponentType } from "react";

// Basic HOC that adds loading state
interface WithLoadingProps {
  isLoading: boolean;
}

function withLoading<P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<P & WithLoadingProps> {
  return function WithLoadingComponent(props: P & WithLoadingProps) {
    const { isLoading, ...restProps } = props;

    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          <span className="ml-3 text-gray-600">Loading...</span>
        </div>
      );
    }

    return <WrappedComponent {...(restProps as P)} />;
  };
}

// Components to enhance
interface UserProfileProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    </div>
  );
}

interface ProductListProps {
  products: Array<{
    id: number;
    name: string;
    price: number;
  }>;
}

function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="p-4 border rounded-lg bg-white shadow-sm"
        >
          <h4 className="font-semibold">{product.name}</h4>
          <p className="text-lg text-blue-600 font-bold">${product.price}</p>
        </div>
      ))}
    </div>
  );
}

// Enhanced components
const UserProfileWithLoading = withLoading(UserProfile);
const ProductListWithLoading = withLoading(ProductList);

function BasicHOCExample() {
  const [userLoading, setUserLoading] = React.useState(false);
  const [productsLoading, setProductsLoading] = React.useState(false);

  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://via.placeholder.com/64/3B82F6/FFFFFF?text=JD",
  };

  const mockProducts = [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Phone", price: 599 },
    { id: 3, name: "Tablet", price: 399 },
  ];

  const simulateLoading = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Basic HOC Pattern</h2>

      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">User Profile</h3>
            <button
              onClick={() => simulateLoading(setUserLoading)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reload User
            </button>
          </div>

          <UserProfileWithLoading user={mockUser} isLoading={userLoading} />
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Product List</h3>
            <button
              onClick={() => simulateLoading(setProductsLoading)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Reload Products
            </button>
          </div>

          <ProductListWithLoading
            products={mockProducts}
            isLoading={productsLoading}
          />
        </section>
      </div>
    </div>
  );
}

export default BasicHOCExample;
```

## 🎯 Authentication HOC

```tsx
import React, { ComponentType, useEffect, useState } from "react";

// Mock authentication service
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
}

class AuthService {
  private static currentUser: User | null = null;

  static login(email: string, password: string): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === "admin@example.com" && password === "admin") {
          const user = {
            id: 1,
            name: "Admin User",
            email,
            role: "admin" as const,
          };
          this.currentUser = user;
          resolve(user);
        } else if (email === "user@example.com" && password === "user") {
          const user = {
            id: 2,
            name: "Regular User",
            email,
            role: "user" as const,
          };
          this.currentUser = user;
          resolve(user);
        } else {
          resolve(null);
        }
      }, 1000);
    });
  }

  static logout() {
    this.currentUser = null;
  }

  static getCurrentUser(): User | null {
    return this.currentUser;
  }

  static hasRole(role: User["role"]): boolean {
    return this.currentUser?.role === role;
  }
}

// Authentication HOC
interface WithAuthProps {
  user: User | null;
  isAuthenticated: boolean;
}

function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>
): ComponentType<Omit<P, keyof WithAuthProps>> {
  return function WithAuthComponent(props: Omit<P, keyof WithAuthProps>) {
    const [user, setUser] = useState<User | null>(AuthService.getCurrentUser());

    useEffect(() => {
      // In a real app, you'd check with your auth service
      const currentUser = AuthService.getCurrentUser();
      setUser(currentUser);
    }, []);

    const authProps: WithAuthProps = {
      user,
      isAuthenticated: user !== null,
    };

    return <WrappedComponent {...(props as P)} {...authProps} />;
  };
}

// Role-based access HOC
function withRoleAccess<P extends object>(
  allowedRoles: User["role"][],
  fallbackComponent?: ComponentType<any>
) {
  return function (WrappedComponent: ComponentType<P>): ComponentType<P> {
    return function WithRoleAccessComponent(props: P) {
      const currentUser = AuthService.getCurrentUser();

      if (!currentUser || !allowedRoles.includes(currentUser.role)) {
        if (fallbackComponent) {
          const FallbackComponent = fallbackComponent;
          return <FallbackComponent />;
        }

        return (
          <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Access Denied
            </h3>
            <p className="text-red-600">
              You don't have permission to access this resource.
            </p>
            <p className="text-sm text-red-500 mt-2">
              Required roles: {allowedRoles.join(", ")}
            </p>
          </div>
        );
      }

      return <WrappedComponent {...props} />;
    };
  };
}

// Components that need authentication
interface DashboardProps extends WithAuthProps {
  title: string;
}

function Dashboard({ title, user, isAuthenticated }: DashboardProps) {
  if (!isAuthenticated) {
    return (
      <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          Please Login
        </h3>
        <p className="text-yellow-600">
          You need to be logged in to view the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="space-y-3">
        <p>
          Welcome back, <strong>{user?.name}</strong>!
        </p>
        <p className="text-sm text-gray-600">Email: {user?.email}</p>
        <p className="text-sm text-gray-600">Role: {user?.role}</p>
        <div className="pt-3 border-t">
          <p className="text-green-600">✅ You have access to this dashboard</p>
        </div>
      </div>
    </div>
  );
}

function AdminPanel() {
  return (
    <div className="p-6 border rounded-lg bg-red-50 border-red-200">
      <h2 className="text-xl font-bold text-red-800 mb-4">Admin Panel</h2>
      <div className="space-y-3">
        <p className="text-red-700">This is a restricted admin area.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Manage Users
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            System Settings
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            View Logs
          </button>
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Database Management
          </button>
        </div>
      </div>
    </div>
  );
}

function UserSettings() {
  return (
    <div className="p-6 border rounded-lg bg-blue-50 border-blue-200">
      <h2 className="text-xl font-bold text-blue-800 mb-4">User Settings</h2>
      <div className="space-y-3">
        <p className="text-blue-700">Manage your account settings.</p>
        <div className="space-y-2">
          <button className="block w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-left">
            Change Password
          </button>
          <button className="block w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-left">
            Update Profile
          </button>
          <button className="block w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-left">
            Notification Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

// Enhanced components
const DashboardWithAuth = withAuth(Dashboard);
const AdminPanelWithAuth = withRoleAccess(["admin"])(AdminPanel);
const UserSettingsWithAuth = withRoleAccess(["admin", "user"])(UserSettings);

function AuthenticationExample() {
  const [currentUser, setCurrentUser] = useState<User | null>(
    AuthService.getCurrentUser()
  );
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [isLogging, setIsLogging] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLogging(true);

    const user = await AuthService.login(loginForm.email, loginForm.password);
    setCurrentUser(user);
    setIsLogging(false);

    if (!user) {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    AuthService.logout();
    setCurrentUser(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Authentication HOCs</h2>

      {/* Login/Logout section */}
      <div className="mb-8 p-6 bg-gray-50 rounded-lg">
        {currentUser ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Logged in as: {currentUser.name}</p>
              <p className="text-sm text-gray-600">Role: {currentUser.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <h3 className="text-lg font-semibold">Login</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                placeholder="Email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm((prev) => ({ ...prev, email: e.target.value }))
                }
                className="px-3 py-2 border border-gray-300 rounded"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
                className="px-3 py-2 border border-gray-300 rounded"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLogging}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isLogging ? "Logging in..." : "Login"}
            </button>

            <div className="text-sm text-gray-600">
              <p>
                <strong>Demo accounts:</strong>
              </p>
              <p>Admin: admin@example.com / admin</p>
              <p>User: user@example.com / user</p>
            </div>
          </form>
        )}
      </div>

      {/* Components with different access levels */}
      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-semibold mb-4">
            Dashboard (Requires Login)
          </h3>
          <DashboardWithAuth title="User Dashboard" />
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4">
            Admin Panel (Admin Only)
          </h3>
          <AdminPanelWithAuth />
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4">
            User Settings (User + Admin)
          </h3>
          <UserSettingsWithAuth />
        </section>
      </div>
    </div>
  );
}

export { AuthenticationExample };
```

## 🎯 Performance & Analytics HOCs

```tsx
import React, { ComponentType, useEffect, useRef, useState } from 'react';

// Performance monitoring HOC
interface PerformanceData {
  componentName: string;
  renderTime: number;
  renderCount: number;
  avgRenderTime: number;
}

function withPerformanceMonitoring<P extends object>(
  componentName: string
) {
  return function (WrappedComponent: ComponentType<P>): ComponentType<P> {
    return function WithPerformanceComponent(props: P) {
      const renderCountRef = useRef(0);
      const totalRenderTimeRef = useRef(0);
      const [performanceData, setPerformanceData] = useState<PerformanceData | null>(null);

      useEffect(() => {
        const startTime = performance.now();

        return () => {
          const endTime = performance.now();
          const renderTime = endTime - startTime;

          renderCountRef.current += 1;
          totalRenderTimeRef.current += renderTime;

          const avgRenderTime = totalRenderTimeRef.current / renderCountRef.current;

          setPerformanceData({
            componentName,
            renderTime,
            renderCount: renderCountRef.current,
            avgRenderTime
          });

          console.log(`📊 Performance [${componentName}]:`, {
            renderTime: `${renderTime.toFixed(2)}ms`,
            renderCount: renderCountRef.current,
            avgRenderTime: `${avgRenderTime.toFixed(2)}ms`
          });
        };
      });

      return (
        <div className="relative">
          <WrappedComponent {...props} />

          {process.env.NODE_ENV === 'development' && performanceData && (
            <div className="absolute top-0 right-0 bg-black bg-opacity-75 text-white text-xs p-2 rounded-bl">
              <div>Renders: {performanceData.renderCount}</div>
              <div>Last: {performanceData.renderTime.toFixed(1)}ms</div>
              <div>Avg: {performanceData.avgRenderTime.toFixed(1)}ms</div>
            </div>
          )}
        </div>
      );
    };
  };
}

// Analytics/tracking HOC
interface AnalyticsEvent {
  event: string;
  component: string;
  timestamp: number;
  data?: any;
}

class AnalyticsService {
  private static events: AnalyticsEvent[] = [];

  static track(event: string, component: string, data?: any) {
    const analyticsEvent: AnalyticsEvent = {
      event,
      component,
      timestamp: Date.now(),
      data
    };

    this.events.push(analyticsEvent);
    console.log('📈 Analytics:', analyticsEvent);
  }

  static getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  static clearEvents() {
    this.events = [];
  }
}

function withAnalytics<P extends object>(
  componentName: string,
  trackProps: (keyof P)[] = []
) {
  return function (WrappedComponent: ComponentType<P>): ComponentType<P> {
    return function WithAnalyticsComponent(props: P) {
      const mountTimeRef = useRef<number | null>(null);

      useEffect(() => {
        // Track component mount
        mountTimeRef.current = Date.now();
        AnalyticsService.track('component_mount', componentName);

        return () => {
          // Track component unmount and session duration
          if (mountTimeRef.current) {
            const sessionDuration = Date.now() - mountTimeRef.current;
            AnalyticsService.track('component_unmount', componentName, {
              sessionDuration: `${sessionDuration}ms`
            });
          }
        };
      }, []);

      // Track prop changes
      useEffect(() => {
        if (trackProps.length > 0) {
          const trackedPropValues = trackProps.reduce((acc, propName) => {
            acc[propName as string] = props[propName];
            return acc;
          }, {} as any);

          AnalyticsService.track('props_changed', componentName, trackedPropValues);
        }
      }, trackProps.map(prop => props[prop]));

      return <WrappedComponent {...props} />;
    };
  };
}

// Error boundary HOC
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

function withErrorBoundary<P extends object>(
  fallbackComponent?: ComponentType<{ error: Error }>
) {
  return function (WrappedComponent: ComponentType<P>): ComponentType<P> {
    return class WithErrorBoundaryComponent extends React.Component<P, ErrorBoundaryState> {
      constructor(props: P) {
        super(props);
        this.state = { hasError: false, error: null };
      }

      static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
      }

      componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('🚨 Error caught by HOC:', error, errorInfo);
        AnalyticsService.track('component_error', WrappedComponent.name || 'Unknown', {
          error: error.message,
          stack: error.stack
        });
      }

      render() {
        if (this.state.hasError) {
          if (fallbackComponent) {
            const FallbackComponent = fallbackComponent;
            return <FallbackComponent error={this.state.error!} />;
          }

          return (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h3>
              <p className="text-red-600">This component encountered an error.</p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm text-red-700">
                    Error details
                  </summary>
                  <pre className="mt-1 text-xs text-red-600 bg-red-100 p-2 rounded overflow-auto">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
            </div>
          );
        }

        return <WrappedComponent {...this.props} />;
      }
    };
  };
}

// Test components
interface CounterProps {
  initialValue?: number;
  step?: number;
}

function Counter({ initialValue = 0, step = 1 }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  // Intentional error for testing
  if (count > 10) {
    throw new Error('Counter value too high!');
  }

  return (
    <div className="p-4 border rounded-lg bg-white">
      <h3 className="text-lg font-semibold mb-3">Counter Component</h3>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setCount(count - step)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -
        </button>
        <span className="text-2xl font-bold">{count}</span>
        <button
          onClick={() => setCount(count + step)}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +
        </button>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Initial: {initialValue}, Step: {step}
      </p>
    </div>
  );
}

function HeavyComponent({ size = 1000 }: { size?: number }) {
  // Simulate heavy computation
  const heavyComputation = () => {
    let result = 0;
    for (let i = 0; i < size * 1000; i++) {
      result += Math.random();
    }
    return result;
  };

  const result = heavyComputation();

  return (
    <div className="p-4 border rounded-lg bg-purple-50">
      <h3 className="text-lg font-semibold mb-3">Heavy Component</h3>
      <p>Computation size: {size * 1000} iterations</p>
      <p className="text-sm text-gray-600">Result: {result.toFixed(2)}</p>
    </div>
  );
}

// Enhanced components
const CounterWithPerformance = withPerformanceMonitoring('Counter')(Counter);
const CounterWithAnalytics = withAnalytics('Counter', ['initialValue', 'step'])(Counter);
const CounterWithErrorBoundary = withErrorBoundary()(Counter);
const HeavyComponentWithPerformance = withPerformanceMonitoring('HeavyComponent')(HeavyComponent);

// Compose multiple HOCs
const FullyEnhancedCounter = withErrorBoundary()(
  withAnalytics('EnhancedCounter', ['initialValue', 'step'])(
    withPerformanceMonitoring('EnhancedCounter')(Counter)
  )
);

function AdvancedHOCsExample() {
  const [counterProps, setCounterProps] = useState({ initialValue: 0, step: 1 });
  const [heavySize, setHeavySize] = useState(1);
  const [showAnalytics, setShowAnalytics] = useState(false);

  const events = AnalyticsService.getEvents();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Advanced HOCs: Performance & Analytics</h2>

      <div className="space-y-8">
        {/* Controls */}
        <section className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Component Controls</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Initial Value</label>
              <input
                type="number"
                value={counterProps.initialValue}
                onChange={(e) => setCounterProps(prev => ({
                  ...prev,
                  initialValue: parseInt(e.target.value) || 0
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Step</label>
              <input
                type="number"
                value={counterProps.step}
                onChange={(e) => setCounterProps(prev => ({
                  ...prev,
                  step: parseInt(e.target.value) || 1
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Heavy Component Size</label>
              <select
                value={heavySize}
                onChange={(e) => setHeavySize(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value={1}>Light (1k iterations)</option>
                <option value={5}>Medium (5k iterations)</option>
                <option value={10}>Heavy (10k iterations)</option>
                <option value={20}>Very Heavy (20k iterations)</option>
              </select>
            </div>
          </div>
        </section>

        {/* Enhanced components */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Enhanced Components</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">Performance Monitoring</h4>
              <CounterWithPerformance {...counterProps} />
            </div>

            <div>
              <h4 className="font-medium mb-2">Analytics Tracking</h4>
              <CounterWithAnalytics {...counterProps} />
            </div>

            <div>
              <h4 className="font-medium mb-2">Error Boundary (Try count > 10)</h4>
              <CounterWithErrorBoundary {...counterProps} />
            </div>

            <div>
              <h4 className="font-medium mb-2">Heavy Component Performance</h4>
              <HeavyComponentWithPerformance size={heavySize} />
            </div>
          </div>
        </section>

        {/* Fully enhanced component */}
        <section>
          <h3 className="text-lg font-semibold mb-4">Multiple HOCs Composed</h3>
          <FullyEnhancedCounter {...counterProps} />
        </section>

        {/* Analytics display */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Analytics Dashboard</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                {showAnalytics ? 'Hide' : 'Show'} Analytics
              </button>
              <button
                onClick={() => AnalyticsService.clearEvents()}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Clear Events
              </button>
            </div>
          </div>

          {showAnalytics && (
            <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
              <p className="text-sm text-gray-600 mb-2">
                Total Events: {events.length}
              </p>
              <div className="space-y-1">
                {events.slice(-10).map((event, index) => (
                  <div key={index} className="text-xs bg-white p-2 rounded">
                    <span className="font-mono text-blue-600">{event.event}</span>
                    <span className="text-gray-500 ml-2">[{event.component}]</span>
                    <span className="text-gray-400 ml-2">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                    {event.data && (
                      <div className="text-gray-600 mt-1">
                        {JSON.stringify(event.data)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export { AdvancedHOCsExample };
```

## 🎯 What You've Learned

### ✅ HOC Fundamentals:

1. **Basic HOC pattern** for component enhancement
2. **Authentication & authorization** HOCs
3. **Performance monitoring** and analytics
4. **Error boundary** HOCs for fault tolerance
5. **Composing multiple HOCs** for complex features

### ✅ Advanced Patterns:

1. **Type-safe HOCs** with TypeScript generics
2. **Props injection** and enhancement
3. **Cross-cutting concerns** handling
4. **Development tools** integration
5. **Production monitoring** capabilities

## 🚀 What's Next?

In **Lesson 19: Render Props**, we'll learn:

- Render props pattern for flexible components
- Function as children pattern
- State sharing through render props
- Building reusable logic components

You now have powerful tools for enhancing components with cross-cutting concerns! 🔄

---

**💡 Pro Tip**: HOCs are great for cross-cutting concerns, but modern React favors hooks for most use cases. Use HOCs when you need to enhance components you don't control or for legacy compatibility!
