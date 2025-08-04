# Lesson 26: Performance and Optimization ⚡

## Welcome to Blazing Fast React Apps! 🚀

**Performance optimization** is crucial for great user experience! Let's learn advanced techniques to make your React TypeScript applications lightning fast with code splitting, memoization, lazy loading, and performance monitoring.

## 🎯 React.memo and Memoization

```tsx
import React, {
  useState,
  useMemo,
  useCallback,
  memo,
  useRef,
  useEffect,
} from "react";

// Types for our optimization examples
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: string;
}

interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  edited?: boolean;
}

interface ChatProps {
  users: User[];
  messages: Message[];
  currentUserId: string;
}

// Expensive computation example
interface AnalyticsData {
  totalMessages: number;
  activeUsers: number;
  averageResponseTime: number;
  popularWords: { word: string; count: number }[];
  userActivity: { userId: string; messageCount: number }[];
}

// Heavy computation hook with memoization
function useAnalytics(messages: Message[], users: User[]): AnalyticsData {
  return useMemo(() => {
    console.log("🔄 Computing analytics (expensive operation)...");

    // Simulate expensive computation
    const startTime = performance.now();

    const totalMessages = messages.length;
    const activeUsers = users.filter((user) => user.isOnline).length;

    // Calculate average response time (simulated)
    const averageResponseTime =
      messages.reduce((acc, message, index) => {
        if (index === 0) return 0;
        const prevMessage = messages[index - 1];
        const timeDiff =
          new Date(message.timestamp).getTime() -
          new Date(prevMessage.timestamp).getTime();
        return acc + timeDiff;
      }, 0) / Math.max(1, messages.length - 1);

    // Find popular words (expensive text processing)
    const wordCounts: Record<string, number> = {};
    messages.forEach((message) => {
      const words = message.content
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter((word) => word.length > 3);

      words.forEach((word) => {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      });
    });

    const popularWords = Object.entries(wordCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));

    // User activity analysis
    const userMessageCounts: Record<string, number> = {};
    messages.forEach((message) => {
      userMessageCounts[message.userId] =
        (userMessageCounts[message.userId] || 0) + 1;
    });

    const userActivity = Object.entries(userMessageCounts)
      .sort(([, a], [, b]) => b - a)
      .map(([userId, messageCount]) => ({ userId, messageCount }));

    const endTime = performance.now();
    console.log(
      `📊 Analytics computed in ${(endTime - startTime).toFixed(2)}ms`
    );

    return {
      totalMessages,
      activeUsers,
      averageResponseTime: Math.round(averageResponseTime),
      popularWords,
      userActivity,
    };
  }, [messages, users]); // Only recompute when messages or users change
}

// Memoized user card component
interface UserCardProps {
  user: User;
  onClick: (userId: string) => void;
  isSelected: boolean;
}

const UserCard = memo(function UserCard({
  user,
  onClick,
  isSelected,
}: UserCardProps) {
  console.log(`🎨 Rendering UserCard for ${user.name}`);

  // Use useCallback to prevent unnecessary re-renders of child components
  const handleClick = useCallback(() => {
    onClick(user.id);
  }, [onClick, user.id]);

  return (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
        isSelected
          ? "bg-blue-50 border-blue-300"
          : "bg-white border-gray-200 hover:border-gray-300"
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
          <div
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              user.isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          ></div>
        </div>

        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500">
            {user.isOnline ? "Online" : `Last seen ${user.lastSeen}`}
          </p>
        </div>
      </div>
    </div>
  );
});

// Memoized message component
interface MessageItemProps {
  message: Message;
  user: User;
  isOwn: boolean;
}

const MessageItem = memo(function MessageItem({
  message,
  user,
  isOwn,
}: MessageItemProps) {
  console.log(`💬 Rendering message ${message.id}`);

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isOwn ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"
        }`}
      >
        {!isOwn && (
          <p className="text-xs font-medium mb-1 opacity-70">{user.name}</p>
        )}
        <p className="text-sm">{message.content}</p>
        <p
          className={`text-xs mt-1 ${
            isOwn ? "text-blue-100" : "text-gray-500"
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString()}
          {message.edited && " (edited)"}
        </p>
      </div>
    </div>
  );
});

// Virtual scrolling hook for large lists
function useVirtualScroll<T>(
  items: T[],
  itemHeight: number,
  containerHeight: number,
  overscan: number = 5
) {
  const [scrollTop, setScrollTop] = useState(0);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  const visibleItems = items.slice(startIndex, endIndex + 1);
  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    startIndex,
    endIndex,
    setScrollTop,
  };
}

// Virtualized list component for performance
interface VirtualizedMessageListProps {
  messages: Message[];
  users: User[];
  currentUserId: string;
  height: number;
}

function VirtualizedMessageList({
  messages,
  users,
  currentUserId,
  height,
}: VirtualizedMessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemHeight = 80; // Approximate height per message

  const { visibleItems, totalHeight, offsetY, startIndex, setScrollTop } =
    useVirtualScroll(messages, itemHeight, height);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      setScrollTop(e.currentTarget.scrollTop);
    },
    [setScrollTop]
  );

  const getUserById = useCallback(
    (userId: string) => {
      return users.find((user) => user.id === userId);
    },
    [users]
  );

  return (
    <div
      ref={containerRef}
      className="overflow-auto border rounded-lg bg-white"
      style={{ height }}
      onScroll={handleScroll}
    >
      <div style={{ height: totalHeight, position: "relative" }}>
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {visibleItems.map((message, index) => {
            const user = getUserById(message.userId);
            if (!user) return null;

            return (
              <div
                key={message.id}
                style={{ height: itemHeight }}
                className="px-4 py-2"
              >
                <MessageItem
                  message={message}
                  user={user}
                  isOwn={message.userId === currentUserId}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Virtual scroll indicators */}
      <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
        Showing {startIndex + 1}-
        {Math.min(startIndex + visibleItems.length, messages.length)} of{" "}
        {messages.length}
      </div>
    </div>
  );
}

// Optimized chat application
function OptimizedChatApp() {
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice@example.com",
      avatar: "https://via.placeholder.com/40",
      isOnline: true,
      lastSeen: "",
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob@example.com",
      avatar: "https://via.placeholder.com/40",
      isOnline: false,
      lastSeen: "2 hours ago",
    },
    {
      id: "3",
      name: "Charlie Brown",
      email: "charlie@example.com",
      avatar: "https://via.placeholder.com/40",
      isOnline: true,
      lastSeen: "",
    },
  ]);

  // Generate large message dataset for performance testing
  const [messages] = useState<Message[]>(() => {
    const msgs: Message[] = [];
    const contents = [
      "Hey everyone! How's it going?",
      "Just finished my morning coffee ☕",
      "Anyone working on anything interesting today?",
      "The weather is beautiful today!",
      "I'm working on a new React project",
      "TypeScript makes everything so much better",
      "Performance optimization is fascinating",
      "Virtual scrolling saves the day!",
      "React.memo is a lifesaver",
      "useCallback and useMemo are essential",
    ];

    for (let i = 0; i < 1000; i++) {
      msgs.push({
        id: `msg-${i}`,
        userId: users[i % users.length].id,
        content: contents[i % contents.length],
        timestamp: new Date(Date.now() - (1000 - i) * 60000).toISOString(),
        edited: Math.random() < 0.1,
      });
    }
    return msgs;
  });

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [filter, setFilter] = useState("");
  const currentUserId = "1";

  // Memoized filtered messages
  const filteredMessages = useMemo(() => {
    console.log("🔍 Filtering messages...");

    if (!filter.trim()) return messages;

    return messages.filter((message) =>
      message.content.toLowerCase().includes(filter.toLowerCase())
    );
  }, [messages, filter]);

  // Memoized analytics
  const analytics = useAnalytics(messages, users);

  // Memoized callbacks to prevent child re-renders
  const handleUserSelect = useCallback((userId: string) => {
    setSelectedUserId(userId);
  }, []);

  const handleFilterChange = useCallback((value: string) => {
    setFilter(value);
  }, []);

  return (
    <div className="h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto h-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          ⚡ Optimized Chat App
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-5/6">
          {/* Users Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4 h-full">
              <h2 className="text-xl font-semibold mb-4">
                Users ({users.length})
              </h2>

              <div className="space-y-3">
                {users.map((user) => (
                  <UserCard
                    key={user.id}
                    user={user}
                    onClick={handleUserSelect}
                    isSelected={selectedUserId === user.id}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow h-full flex flex-col">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold mb-2">
                  Messages ({filteredMessages.length})
                </h2>

                <input
                  type="text"
                  placeholder="Filter messages..."
                  value={filter}
                  onChange={(e) => handleFilterChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex-1">
                <VirtualizedMessageList
                  messages={filteredMessages}
                  users={users}
                  currentUserId={currentUserId}
                  height={400}
                />
              </div>
            </div>
          </div>

          {/* Analytics Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-4 h-full">
              <h2 className="text-xl font-semibold mb-4">📊 Analytics</h2>

              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-sm text-blue-600">Total Messages</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {analytics.totalMessages.toLocaleString()}
                  </p>
                </div>

                <div className="bg-green-50 p-3 rounded">
                  <p className="text-sm text-green-600">Active Users</p>
                  <p className="text-2xl font-bold text-green-800">
                    {analytics.activeUsers}
                  </p>
                </div>

                <div className="bg-orange-50 p-3 rounded">
                  <p className="text-sm text-orange-600">Avg Response Time</p>
                  <p className="text-lg font-bold text-orange-800">
                    {Math.round(analytics.averageResponseTime / 60000)}m
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Popular Words
                  </h3>
                  <div className="space-y-1">
                    {analytics.popularWords
                      .slice(0, 5)
                      .map(({ word, count }) => (
                        <div
                          key={word}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-600">{word}</span>
                          <span className="font-medium">{count}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">
                    Most Active
                  </h3>
                  <div className="space-y-1">
                    {analytics.userActivity
                      .slice(0, 3)
                      .map(({ userId, messageCount }) => {
                        const user = users.find((u) => u.id === userId);
                        return (
                          <div
                            key={userId}
                            className="flex justify-between text-sm"
                          >
                            <span className="text-gray-600">{user?.name}</span>
                            <span className="font-medium">{messageCount}</span>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 🎯 Code Splitting and Lazy Loading

```tsx
import React, { Suspense, lazy, useState, useTransition } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

// Lazy-loaded components
const Dashboard = lazy(() => import("./components/Dashboard"));
const UserProfile = lazy(() => import("./components/UserProfile"));
const Settings = lazy(() => import("./components/Settings"));
const Analytics = lazy(() => import("./components/Analytics"));

// Lazy loading with custom delay (for better UX)
const lazyWithDelay = (importFunc: () => Promise<any>, delay: number = 0) => {
  return lazy(() =>
    Promise.all([
      importFunc(),
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]).then(([moduleExports]) => moduleExports)
  );
};

// Heavy components that should be code-split
const HeavyChart = lazyWithDelay(() => import("./components/HeavyChart"), 500);
const DataTable = lazyWithDelay(() => import("./components/DataTable"), 300);

// Loading fallbacks
function LoadingSpinner({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </div>
  );
}

// Resource preloading utilities
class ResourcePreloader {
  private static cache = new Set<string>();

  static preloadRoute(routeComponent: () => Promise<any>) {
    if (!this.cache.has(routeComponent.toString())) {
      this.cache.add(routeComponent.toString());
      routeComponent().catch(console.error);
    }
  }

  static preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = src;
    });
  }

  static preloadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.onload = () => resolve();
      script.onerror = reject;
      script.src = src;
      document.head.appendChild(script);
    });
  }
}

// Navigation with preloading
function NavigationWithPreload() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const handleNavigation = (
    path: string,
    preloadComponent?: () => Promise<any>
  ) => {
    // Preload the component before navigation
    if (preloadComponent) {
      ResourcePreloader.preloadRoute(preloadComponent);
    }

    // Use transition for smoother navigation
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 border-b-2 border-transparent hover:border-gray-300"
              onMouseEnter={() =>
                ResourcePreloader.preloadRoute(
                  () => import("./components/Dashboard")
                )
              }
            >
              Dashboard
            </Link>

            <Link
              to="/profile"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
              onMouseEnter={() =>
                ResourcePreloader.preloadRoute(
                  () => import("./components/UserProfile")
                )
              }
            >
              Profile
            </Link>

            <Link
              to="/analytics"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
              onMouseEnter={() =>
                ResourcePreloader.preloadRoute(
                  () => import("./components/Analytics")
                )
              }
            >
              Analytics
            </Link>

            <Link
              to="/settings"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700"
              onMouseEnter={() =>
                ResourcePreloader.preloadRoute(
                  () => import("./components/Settings")
                )
              }
            >
              Settings
            </Link>
          </div>

          {isPending && (
            <div className="flex items-center">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

// Error boundary for lazy loading
class LazyLoadErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Lazy loading error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-8 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Failed to load component
            </h2>
            <p className="text-gray-600 mb-4">
              There was an error loading this part of the application.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Reload Page
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Code-split app with optimized loading
function CodeSplitApp() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavigationWithPreload />

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <LazyLoadErrorBoundary>
            <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route
                  path="/analytics"
                  element={
                    <Suspense fallback={<SkeletonLoader />}>
                      <Analytics />
                    </Suspense>
                  }
                />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Suspense>
          </LazyLoadErrorBoundary>
        </main>
      </div>
    </Router>
  );
}
```

## 🎯 Performance Monitoring and DevTools

```tsx
import React, { useEffect, useState, useRef } from "react";

// Performance monitoring utilities
class PerformanceMonitor {
  private static metrics: Record<string, number[]> = {};
  private static observers: PerformanceObserver[] = [];

  static startMeasurement(name: string) {
    performance.mark(`${name}-start`);
  }

  static endMeasurement(name: string) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);

    const entries = performance.getEntriesByName(name, "measure");
    const latestEntry = entries[entries.length - 1];

    if (latestEntry) {
      if (!this.metrics[name]) {
        this.metrics[name] = [];
      }
      this.metrics[name].push(latestEntry.duration);
    }

    // Clean up marks
    performance.clearMarks(`${name}-start`);
    performance.clearMarks(`${name}-end`);
    performance.clearMeasures(name);
  }

  static getMetrics(name: string) {
    const values = this.metrics[name] || [];
    if (values.length === 0) return null;

    const sum = values.reduce((a, b) => a + b, 0);
    const avg = sum / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    return { avg, min, max, count: values.length };
  }

  static getAllMetrics() {
    return Object.keys(this.metrics).map((name) => ({
      name,
      ...this.getMetrics(name)!,
    }));
  }

  static observeLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log("🎯 LCP:", lastEntry.startTime.toFixed(2) + "ms");
    });

    observer.observe({ entryTypes: ["largest-contentful-paint"] });
    this.observers.push(observer);
  }

  static observeFID() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log("⚡ FID:", entry.processingStart - entry.startTime);
      }
    });

    observer.observe({ entryTypes: ["first-input"] });
    this.observers.push(observer);
  }

  static observeCLS() {
    let clsValue = 0;
    let clsEntries: PerformanceEntry[] = [];

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
          clsEntries.push(entry);
        }
      }
      console.log("📐 CLS:", clsValue);
    });

    observer.observe({ entryTypes: ["layout-shift"] });
    this.observers.push(observer);
  }

  static cleanup() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
    this.metrics = {};
  }
}

// Performance monitoring hook
function usePerformanceMonitoring(enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;

    PerformanceMonitor.observeLCP();
    PerformanceMonitor.observeFID();
    PerformanceMonitor.observeCLS();

    return () => {
      PerformanceMonitor.cleanup();
    };
  }, [enabled]);
}

// Component render profiler
interface ProfilerData {
  id: string;
  phase: "mount" | "update";
  actualDuration: number;
  baseDuration: number;
  startTime: number;
  commitTime: number;
}

function useRenderProfiler(componentName: string) {
  const renderCount = useRef(0);
  const [profilerData, setProfilerData] = useState<ProfilerData[]>([]);

  const onRender = (
    id: string,
    phase: "mount" | "update",
    actualDuration: number,
    baseDuration: number,
    startTime: number,
    commitTime: number
  ) => {
    renderCount.current++;

    const data: ProfilerData = {
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime,
    };

    setProfilerData((prev) => [...prev.slice(-9), data]); // Keep last 10 renders

    console.log(`🔍 ${componentName} render #${renderCount.current}:`, {
      phase,
      duration: `${actualDuration.toFixed(2)}ms`,
      baseTime: `${baseDuration.toFixed(2)}ms`,
    });
  };

  return { onRender, renderCount: renderCount.current, profilerData };
}

// Memory usage monitor
function useMemoryMonitor() {
  const [memoryInfo, setMemoryInfo] = useState<{
    used: number;
    total: number;
    percentage: number;
  } | null>(null);

  useEffect(() => {
    const checkMemory = () => {
      if ("memory" in performance) {
        const memory = (performance as any).memory;
        const used = memory.usedJSHeapSize;
        const total = memory.totalJSHeapSize;

        setMemoryInfo({
          used: Math.round(used / 1024 / 1024), // MB
          total: Math.round(total / 1024 / 1024), // MB
          percentage: Math.round((used / total) * 100),
        });
      }
    };

    checkMemory();
    const interval = setInterval(checkMemory, 5000);

    return () => clearInterval(interval);
  }, []);

  return memoryInfo;
}

// Performance dashboard component
function PerformanceDashboard() {
  usePerformanceMonitoring(true);
  const memoryInfo = useMemoryMonitor();
  const [metrics, setMetrics] = useState<
    ReturnType<typeof PerformanceMonitor.getAllMetrics>
  >([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(PerformanceMonitor.getAllMetrics());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg z-50"
      >
        📊
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl border max-w-sm w-full z-50">
      <div className="p-4 border-b bg-gray-50 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">⚡ Performance Monitor</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {/* Memory Usage */}
        {memoryInfo && (
          <div className="bg-blue-50 p-3 rounded">
            <h4 className="font-medium text-blue-900 mb-1">Memory Usage</h4>
            <div className="text-sm text-blue-700">
              <p>
                {memoryInfo.used}MB / {memoryInfo.total}MB (
                {memoryInfo.percentage}%)
              </p>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-1">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${memoryInfo.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Custom Metrics */}
        {metrics.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900">Custom Metrics</h4>
            {metrics.map((metric) => (
              <div key={metric.name} className="bg-gray-50 p-2 rounded text-sm">
                <div className="font-medium text-gray-900">{metric.name}</div>
                <div className="text-gray-600 text-xs grid grid-cols-3 gap-2 mt-1">
                  <span>Avg: {metric.avg?.toFixed(1)}ms</span>
                  <span>Min: {metric.min?.toFixed(1)}ms</span>
                  <span>Max: {metric.max?.toFixed(1)}ms</span>
                </div>
                <div className="text-gray-500 text-xs">
                  {metric.count} measurements
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Performance Tips */}
        <div className="bg-yellow-50 p-3 rounded">
          <h4 className="font-medium text-yellow-900 mb-1">💡 Tips</h4>
          <ul className="text-xs text-yellow-800 space-y-1">
            <li>• Use React.memo for expensive components</li>
            <li>• Implement virtual scrolling for large lists</li>
            <li>• Code-split routes and heavy components</li>
            <li>• Monitor Core Web Vitals in production</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Performance-optimized component example
interface OptimizedComponentProps {
  data: any[];
  onUpdate: (id: string, data: any) => void;
  isLoading: boolean;
}

const OptimizedComponent = memo(function OptimizedComponent({
  data,
  onUpdate,
  isLoading,
}: OptimizedComponentProps) {
  const { onRender } = useRenderProfiler("OptimizedComponent");

  // Use performance monitoring
  useEffect(() => {
    PerformanceMonitor.startMeasurement("data-processing");

    // Simulate data processing
    const processData = () => {
      console.log("Processing data...");
    };

    processData();
    PerformanceMonitor.endMeasurement("data-processing");
  }, [data]);

  const memoizedCallback = useCallback(
    (id: string, newData: any) => {
      PerformanceMonitor.startMeasurement("update-operation");
      onUpdate(id, newData);
      PerformanceMonitor.endMeasurement("update-operation");
    },
    [onUpdate]
  );

  const processedData = useMemo(() => {
    PerformanceMonitor.startMeasurement("data-computation");

    const result = data.map((item) => ({
      ...item,
      processed: true,
      timestamp: Date.now(),
    }));

    PerformanceMonitor.endMeasurement("data-computation");
    return result;
  }, [data]);

  return (
    <React.Profiler id="OptimizedComponent" onRender={onRender}>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Optimized Component</h2>

        {isLoading ? (
          <LoadingSpinner message="Processing data..." />
        ) : (
          <div className="space-y-2">
            {processedData.slice(0, 10).map((item, index) => (
              <div
                key={item.id || index}
                className="p-2 bg-gray-50 rounded flex justify-between"
              >
                <span>{item.name || `Item ${index}`}</span>
                <button
                  onClick={() => memoizedCallback(item.id, { updated: true })}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  Update
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </React.Profiler>
  );
});

// Complete performance-optimized app
export function PerformanceOptimizedApp() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = useCallback((id: string, newData: any) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...newData } : item))
    );
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);

    PerformanceMonitor.startMeasurement("data-loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newData = Array.from({ length: 100 }, (_, i) => ({
      id: `item-${i}`,
      name: `Item ${i + 1}`,
      value: Math.random() * 100,
    }));

    setData(newData);
    PerformanceMonitor.endMeasurement("data-loading");
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          ⚡ Performance Optimization Demo
        </h1>

        <div className="mb-6">
          <button
            onClick={loadData}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white px-6 py-2 rounded-md"
          >
            {isLoading ? "Loading..." : "Load Data"}
          </button>
        </div>

        <OptimizedComponent
          data={data}
          onUpdate={handleUpdate}
          isLoading={isLoading}
        />

        <PerformanceDashboard />
      </div>
    </div>
  );
}
```

## 🎯 What You've Learned

### ✅ React Performance Optimization:

1. **React.memo** for preventing unnecessary re-renders
2. **useMemo and useCallback** for expensive computations
3. **Virtual scrolling** for large datasets
4. **Component profiling** with React.Profiler
5. **Memoized event handlers** and computed values

### ✅ Code Splitting & Lazy Loading:

1. **Dynamic imports** with React.lazy()
2. **Route-based code splitting** for better performance
3. **Component-level lazy loading** with suspense
4. **Resource preloading** strategies
5. **Error boundaries** for lazy-loaded components

### ✅ Performance Monitoring:

1. **Core Web Vitals** tracking (LCP, FID, CLS)
2. **Custom performance metrics** and measurements
3. **Memory usage monitoring** and leak detection
4. **Real-time performance dashboard**
5. **Production performance monitoring**

## 🚀 What's Next?

In **Lesson 27: Testing and Quality Assurance**, we'll learn:

- Unit testing with Jest and React Testing Library
- Integration testing strategies
- E2E testing with Playwright
- Test-driven development (TDD)

Your React app is now blazing fast! ⚡

---

**💡 Pro Tip**: Performance optimization is about finding the right balance. Don't over-optimize early - measure first, then optimize the actual bottlenecks!
