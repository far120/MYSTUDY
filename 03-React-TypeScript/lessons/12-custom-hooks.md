# Lesson 12: Custom Hooks 🔧

## Welcome to Reusable Logic! ♻️

Imagine writing the same code over and over again in different components - fetch data, manage timers, handle forms. Pretty repetitive, right? **Custom hooks** let you extract and share stateful logic between components, making your code DRY (Don't Repeat Yourself) and super maintainable!

## 🤔 What are Custom Hooks?

**Custom hooks** are JavaScript functions that:

- Start with the word "use" (naming convention)
- Can call other hooks (useState, useEffect, etc.)
- Allow you to extract component logic into reusable functions
- Share stateful logic between multiple components

### Real-World Analogy:

Think of custom hooks like **cooking recipes**:

- 📝 **Recipe** is your custom hook
- 🥘 **Ingredients** are the built-in hooks (useState, useEffect)
- 👨‍🍳 **Chef** is your component
- 🍽️ **Dish** is the final result

Different chefs can use the same recipe to create the same dish!

## 🎯 Your First Custom Hook

### 1. **useCounter - Simple State Logic**

```tsx
import { useState } from "react";

// Custom hook for counter logic
function useCounter(initialValue: number = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(initialValue);
  const setValue = (value: number) => setCount(value);

  return {
    count,
    increment,
    decrement,
    reset,
    setValue,
  };
}

// Usage in components
function CounterExample() {
  const counter1 = useCounter(0);
  const counter2 = useCounter(100);
  const counter3 = useCounter(-10);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center">
        Custom Hook: useCounter
      </h2>

      {/* Counter 1 */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-3">Counter 1 (starts at 0)</h3>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={counter1.decrement}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
          >
            -
          </button>
          <span className="text-2xl font-bold w-16 text-center">
            {counter1.count}
          </span>
          <button
            onClick={counter1.increment}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
          >
            +
          </button>
          <button
            onClick={counter1.reset}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Counter 2 */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-3">
          Counter 2 (starts at 100)
        </h3>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={counter2.decrement}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
          >
            -
          </button>
          <span className="text-2xl font-bold w-16 text-center">
            {counter2.count}
          </span>
          <button
            onClick={counter2.increment}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
          >
            +
          </button>
          <button
            onClick={counter2.reset}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Counter 3 with Input */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-3">
          Counter 3 (starts at -10)
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={counter3.decrement}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
            >
              -
            </button>
            <span className="text-2xl font-bold w-16 text-center">
              {counter3.count}
            </span>
            <button
              onClick={counter3.increment}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
            >
              +
            </button>
          </div>

          <div className="flex items-center justify-center gap-2">
            <input
              type="number"
              placeholder="Set value"
              className="px-3 py-2 border border-gray-300 rounded w-24 text-center"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  const value = parseInt((e.target as HTMLInputElement).value);
                  if (!isNaN(value)) {
                    counter3.setValue(value);
                    (e.target as HTMLInputElement).value = "";
                  }
                }
              }}
            />
            <button
              onClick={counter3.reset}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CounterExample;
```

### 2. **useFetch - Data Fetching Logic**

```tsx
import { useState, useEffect } from "react";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useFetch<T>(url: string, options?: RequestInit): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock different responses based on URL
      let mockData: any;

      if (url.includes("users")) {
        mockData = [
          { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
          {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            role: "User",
          },
          {
            id: 3,
            name: "Bob Johnson",
            email: "bob@example.com",
            role: "Editor",
          },
        ];
      } else if (url.includes("posts")) {
        mockData = [
          {
            id: 1,
            title: "React Hooks Guide",
            content: "Learn about React hooks...",
            author: "John",
          },
          {
            id: 2,
            title: "TypeScript Tips",
            content: "Improve your TypeScript...",
            author: "Jane",
          },
          {
            id: 3,
            title: "Custom Hooks",
            content: "Building reusable logic...",
            author: "Bob",
          },
        ];
      } else {
        throw new Error("Unknown endpoint");
      }

      // Simulate random failures
      if (Math.random() < 0.2) {
        throw new Error("Network error: Failed to fetch data");
      }

      setData(mockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}

// Usage Example
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

function DataFetchingExample() {
  const [activeTab, setActiveTab] = useState<"users" | "posts">("users");

  const usersQuery = useFetch<User[]>("/api/users");
  const postsQuery = useFetch<Post[]>("/api/posts");

  const currentQuery = activeTab === "users" ? usersQuery : postsQuery;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        Custom Hook: useFetch
      </h2>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              activeTab === "users"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            👥 Users
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-4 py-2 rounded font-medium transition-colors ${
              activeTab === "posts"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            📝 Posts
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {activeTab === "users" ? "Users List" : "Posts List"}
          </h3>
          <button
            onClick={currentQuery.refetch}
            disabled={currentQuery.loading}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded transition-colors"
          >
            {currentQuery.loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {currentQuery.loading ? (
            <div className="text-center py-8">
              <div className="animate-spin text-4xl mb-4">⏳</div>
              <p className="text-gray-600">Loading {activeTab}...</p>
            </div>
          ) : currentQuery.error ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">⚠️</div>
              <h4 className="text-lg font-semibold text-red-800 mb-2">
                Error Loading Data
              </h4>
              <p className="text-red-600 mb-4">{currentQuery.error}</p>
              <button
                onClick={currentQuery.refetch}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {activeTab === "users"
                ? (currentQuery.data as User[])?.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {user.name}
                        </h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {user.role}
                      </span>
                    </div>
                  ))
                : (currentQuery.data as Post[])?.map((post) => (
                    <div key={post.id} className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-1">
                        {post.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        {post.content}
                      </p>
                      <p className="text-xs text-gray-500">By {post.author}</p>
                    </div>
                  ))}
            </div>
          )}
        </div>
      </div>

      {/* Debug Info */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Debug Information:</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• Current tab: {activeTab}</p>
          <p>• Loading: {currentQuery.loading ? "True" : "False"}</p>
          <p>• Has error: {currentQuery.error ? "True" : "False"}</p>
          <p>
            • Data length:{" "}
            {currentQuery.data ? (currentQuery.data as any[]).length : 0}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DataFetchingExample;
```

## 🎮 Let's Build: Advanced Custom Hooks

### 1. **useLocalStorage - Persistent State**

```tsx
import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Remove from localStorage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue] as const;
}

// Usage Example
function LocalStorageExample() {
  const [name, setName, removeName] = useLocalStorage("user-name", "");
  const [preferences, setPreferences, removePreferences] = useLocalStorage(
    "user-preferences",
    {
      theme: "light" as "light" | "dark",
      notifications: true,
      language: "en",
    }
  );
  const [todos, setTodos, removeTodos] = useLocalStorage<string[]>("todos", []);

  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos((prev) => [...prev, newTodo.trim()]);
      setNewTodo("");
    }
  };

  const removeTodo = (index: number) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-center">
        Custom Hook: useLocalStorage
      </h2>

      {/* User Name */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-3">User Name (Persistent)</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={removeName}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
          >
            Clear
          </button>
        </div>
        {name && <p className="mt-2 text-gray-600">Hello, {name}! 👋</p>}
      </div>

      {/* Preferences */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-3">Preferences (Persistent)</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span>Theme:</span>
            <select
              value={preferences.theme}
              onChange={(e) =>
                setPreferences((prev) => ({
                  ...prev,
                  theme: e.target.value as "light" | "dark",
                }))
              }
              className="px-3 py-1 border border-gray-300 rounded"
            >
              <option value="light">🌞 Light</option>
              <option value="dark">🌙 Dark</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span>Notifications:</span>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={(e) =>
                  setPreferences((prev) => ({
                    ...prev,
                    notifications: e.target.checked,
                  }))
                }
                className="w-4 h-4"
              />
              <span>{preferences.notifications ? "Enabled" : "Disabled"}</span>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span>Language:</span>
            <select
              value={preferences.language}
              onChange={(e) =>
                setPreferences((prev) => ({
                  ...prev,
                  language: e.target.value,
                }))
              }
              className="px-3 py-1 border border-gray-300 rounded"
            >
              <option value="en">🇺🇸 English</option>
              <option value="es">🇪🇸 Spanish</option>
              <option value="fr">🇫🇷 French</option>
            </select>
          </div>

          <button
            onClick={removePreferences}
            className="w-full px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
          >
            Reset Preferences
          </button>
        </div>
      </div>

      {/* Todo List */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="text-lg font-semibold mb-3">Todo List (Persistent)</h3>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
          >
            Add
          </button>
        </div>

        {todos.length > 0 ? (
          <div className="space-y-2">
            {todos.map((todo, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <span>{todo}</span>
                <button
                  onClick={() => removeTodo(index)}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  ×
                </button>
              </div>
            ))}

            <button
              onClick={removeTodos}
              className="w-full mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
            >
              Clear All Todos
            </button>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-4">
            No todos yet. Add one above!
          </p>
        )}
      </div>

      {/* Persistence Demo */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">
          💡 Persistence Demo
        </h4>
        <p className="text-blue-700 text-sm">
          Try refreshing the page or closing/reopening the browser. Your data
          will persist because it's stored in localStorage!
        </p>
      </div>
    </div>
  );
}

export default LocalStorageExample;
```

### 2. **useToggle & useDebounce - Utility Hooks**

```tsx
import { useState, useEffect, useCallback } from "react";

// useToggle hook
function useToggle(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse, setValue };
}

// useDebounce hook
function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage Example
function UtilityHooksExample() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const sidebar = useToggle(false);
  const darkMode = useToggle(false);
  const notifications = useToggle(true);

  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search function
  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Simulate API call
    const searchTimeout = setTimeout(() => {
      const mockResults = [
        "React Documentation",
        "TypeScript Handbook",
        "Custom Hooks Guide",
        "useEffect Tutorial",
        "useState Examples",
        "Component Patterns",
      ].filter((item) =>
        item.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );

      setSearchResults(mockResults);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [debouncedSearchTerm]);

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode.value ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          Custom Hooks: useToggle & useDebounce
        </h2>

        {/* Control Panel */}
        <div
          className={`rounded-lg shadow-md p-4 mb-6 ${
            darkMode.value ? "bg-gray-800" : "bg-white"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Control Panel</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between">
              <span>Sidebar</span>
              <button
                onClick={sidebar.toggle}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  sidebar.value
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-500 hover:bg-gray-600 text-white"
                }`}
              >
                {sidebar.value ? "Hide" : "Show"}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span>Dark Mode</span>
              <button
                onClick={darkMode.toggle}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  darkMode.value
                    ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                    : "bg-gray-700 hover:bg-gray-800 text-white"
                }`}
              >
                {darkMode.value ? "🌞" : "🌙"}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span>Notifications</span>
              <button
                onClick={notifications.toggle}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  notifications.value
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                {notifications.value ? "🔔" : "🔕"}
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar */}
          {sidebar.value && (
            <div
              className={`w-64 rounded-lg shadow-md p-4 ${
                darkMode.value ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <nav className="space-y-2">
                <a
                  href="#"
                  className={`block p-2 rounded transition-colors ${
                    darkMode.value ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  🏠 Home
                </a>
                <a
                  href="#"
                  className={`block p-2 rounded transition-colors ${
                    darkMode.value ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  👥 Users
                </a>
                <a
                  href="#"
                  className={`block p-2 rounded transition-colors ${
                    darkMode.value ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  ⚙️ Settings
                </a>
                <a
                  href="#"
                  className={`block p-2 rounded transition-colors ${
                    darkMode.value ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  📊 Analytics
                </a>
              </nav>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Search Section */}
            <div
              className={`rounded-lg shadow-md p-4 mb-6 ${
                darkMode.value ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3 className="text-lg font-semibold mb-4">Debounced Search</h3>

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search documentation..."
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  darkMode.value
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-gray-900"
                }`}
              />

              <div className="mt-4 text-sm">
                <p
                  className={darkMode.value ? "text-gray-400" : "text-gray-600"}
                >
                  Immediate value: "{searchTerm}"
                </p>
                <p
                  className={darkMode.value ? "text-gray-400" : "text-gray-600"}
                >
                  Debounced value: "{debouncedSearchTerm}"
                </p>
                <p
                  className={darkMode.value ? "text-gray-400" : "text-gray-600"}
                >
                  Search will trigger 500ms after you stop typing
                </p>
              </div>

              {/* Search Results */}
              <div className="mt-4">
                {isSearching ? (
                  <div className="text-center py-4">
                    <div className="animate-spin text-2xl mb-2">🔍</div>
                    <p
                      className={
                        darkMode.value ? "text-gray-400" : "text-gray-600"
                      }
                    >
                      Searching...
                    </p>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-2">
                    <p
                      className={`font-medium ${
                        darkMode.value ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Found {searchResults.length} results:
                    </p>
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded-lg transition-colors ${
                          darkMode.value
                            ? "bg-gray-700 hover:bg-gray-600"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        {result}
                      </div>
                    ))}
                  </div>
                ) : debouncedSearchTerm ? (
                  <p
                    className={`text-center py-4 ${
                      darkMode.value ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    No results found for "{debouncedSearchTerm}"
                  </p>
                ) : (
                  <p
                    className={`text-center py-4 ${
                      darkMode.value ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Start typing to search...
                  </p>
                )}
              </div>
            </div>

            {/* Status Display */}
            <div
              className={`rounded-lg shadow-md p-4 ${
                darkMode.value ? "bg-gray-800" : "bg-white"
              }`}
            >
              <h3 className="text-lg font-semibold mb-4">Current Status</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  className={`p-3 rounded-lg ${
                    darkMode.value ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <h4 className="font-medium mb-2">Toggle States</h4>
                  <div className="space-y-1 text-sm">
                    <p>Sidebar: {sidebar.value ? "✅ Visible" : "❌ Hidden"}</p>
                    <p>
                      Dark Mode: {darkMode.value ? "🌙 Enabled" : "☀️ Disabled"}
                    </p>
                    <p>
                      Notifications: {notifications.value ? "🔔 On" : "🔕 Off"}
                    </p>
                  </div>
                </div>

                <div
                  className={`p-3 rounded-lg ${
                    darkMode.value ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <h4 className="font-medium mb-2">Search Info</h4>
                  <div className="space-y-1 text-sm">
                    <p>Search length: {searchTerm.length} chars</p>
                    <p>Debounced length: {debouncedSearchTerm.length} chars</p>
                    <p>Results: {searchResults.length} found</p>
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

export default UtilityHooksExample;
```

## 🎯 Best Practices for Custom Hooks

### ✅ Do's:

- **Start with "use"** prefix for naming convention
- **Return objects or arrays** for multiple values
- **Use TypeScript** for better type safety
- **Include cleanup** in useEffect when needed
- **Make hooks reusable** and focused on single responsibility

### ❌ Don'ts:

- **Don't call hooks conditionally** (React rules apply)
- **Don't create overly complex** custom hooks
- **Don't forget to handle edge cases** and errors
- **Don't duplicate built-in hooks** unnecessarily
- **Don't ignore performance** implications

## 🎯 What You've Learned

### ✅ Core Custom Hook Concepts:

1. **Extracting reusable logic** into custom functions
2. **Sharing stateful behavior** between components
3. **Building utility hooks** for common patterns
4. **Combining built-in hooks** for complex functionality
5. **TypeScript integration** with custom hooks

### ✅ Practical Skills:

1. **useCounter** for increment/decrement logic
2. **useFetch** for API data management
3. **useLocalStorage** for persistent state
4. **useToggle** for boolean state management
5. **useDebounce** for performance optimization

## 🚀 What's Next?

In **Lesson 13: Context API**, we'll learn how to:

- Share state across multiple components
- Avoid prop drilling in deep component trees
- Create global application state
- Build theme and user authentication systems

You've mastered reusable logic! Custom hooks are the secret to maintainable React applications! 🎉

---

**💡 Remember**: Custom hooks are about sharing logic, not UI. If you find yourself copying the same useState/useEffect patterns, it's time to create a custom hook!
