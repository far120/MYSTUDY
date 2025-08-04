# Lesson 20: Testing Components 🧪

## Welcome to React Testing! ✅

**Testing** is like having a safety net for your code! It ensures your components work correctly, helps catch bugs early, and gives you confidence when making changes. Let's learn how to test React components with TypeScript!

## 🎯 Testing Setup & Basics

```tsx
// First, install testing dependencies:
// npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom

// src/setupTests.ts
import "@testing-library/jest-dom";

// Simple component to test
import React, { useState } from "react";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  children: React.ReactNode;
}

export function Button({
  onClick,
  disabled = false,
  variant = "primary",
  children,
}: ButtonProps) {
  const getButtonClass = () => {
    const baseClass =
      "px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2";

    switch (variant) {
      case "primary":
        return `${baseClass} bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500`;
      case "secondary":
        return `${baseClass} bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500`;
      case "danger":
        return `${baseClass} bg-red-500 hover:bg-red-600 text-white focus:ring-red-500`;
      default:
        return baseClass;
    }
  };

  return (
    <button
      className={getButtonClass()}
      onClick={onClick}
      disabled={disabled}
      data-testid={`button-${variant}`}
    >
      {children}
    </button>
  );
}

// Counter component for testing state
interface CounterProps {
  initialValue?: number;
  step?: number;
  max?: number;
}

export function Counter({
  initialValue = 0,
  step = 1,
  max = 10,
}: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    if (count < max) {
      setCount(count + step);
    }
  };

  const decrement = () => {
    setCount(Math.max(0, count - step));
  };

  const reset = () => {
    setCount(initialValue);
  };

  return (
    <div data-testid="counter">
      <h3>Counter</h3>
      <div data-testid="count-display">Count: {count}</div>

      <div className="flex gap-2 mt-2">
        <Button
          onClick={decrement}
          disabled={count <= 0}
          variant="danger"
          data-testid="decrement-button"
        >
          -
        </Button>

        <Button onClick={reset} variant="secondary" data-testid="reset-button">
          Reset
        </Button>

        <Button
          onClick={increment}
          disabled={count >= max}
          variant="primary"
          data-testid="increment-button"
        >
          +
        </Button>
      </div>

      {count >= max && (
        <div data-testid="max-message" className="text-red-500 mt-2">
          Maximum value reached!
        </div>
      )}
    </div>
  );
}

// Form component for testing user interactions
interface LoginFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  isLoading?: boolean;
}

export function LoginForm({ onSubmit, isLoading = false }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} data-testid="login-form">
      <h2>Login</h2>

      <div className="mb-4">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          data-testid="email-input"
        />
        {errors.email && (
          <div data-testid="email-error" className="text-red-500 text-sm">
            {errors.email}
          </div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          data-testid="password-input"
        />
        {errors.password && (
          <div data-testid="password-error" className="text-red-500 text-sm">
            {errors.password}
          </div>
        )}
      </div>

      <Button type="submit" disabled={isLoading} data-testid="submit-button">
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
```

## 🎯 Component Tests

```tsx
// Button.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button Component", () => {
  test("renders with correct text", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByText("Click me"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByText("Disabled Button");
    expect(button).toBeDisabled();
  });

  test("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>
    );

    await user.click(screen.getByText("Disabled Button"));

    expect(handleClick).not.toHaveBeenCalled();
  });

  test("applies correct variant classes", () => {
    const { rerender } = render(
      <Button variant="primary" data-testid="test-button">
        Primary
      </Button>
    );

    let button = screen.getByTestId("test-button");
    expect(button).toHaveClass("bg-blue-500");

    rerender(
      <Button variant="secondary" data-testid="test-button">
        Secondary
      </Button>
    );

    button = screen.getByTestId("test-button");
    expect(button).toHaveClass("bg-gray-500");

    rerender(
      <Button variant="danger" data-testid="test-button">
        Danger
      </Button>
    );

    button = screen.getByTestId("test-button");
    expect(button).toHaveClass("bg-red-500");
  });
});

// Counter.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "./Counter";

describe("Counter Component", () => {
  test("renders with initial value", () => {
    render(<Counter initialValue={5} />);

    expect(screen.getByTestId("count-display")).toHaveTextContent("Count: 5");
  });

  test("increments count when + button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} step={2} />);

    const incrementButton = screen.getByTestId("increment-button");
    await user.click(incrementButton);

    expect(screen.getByTestId("count-display")).toHaveTextContent("Count: 2");
  });

  test("decrements count when - button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={5} step={1} />);

    const decrementButton = screen.getByTestId("decrement-button");
    await user.click(decrementButton);

    expect(screen.getByTestId("count-display")).toHaveTextContent("Count: 4");
  });

  test("resets count when reset button is clicked", async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={3} />);

    // First increment
    await user.click(screen.getByTestId("increment-button"));
    expect(screen.getByTestId("count-display")).toHaveTextContent("Count: 4");

    // Then reset
    await user.click(screen.getByTestId("reset-button"));
    expect(screen.getByTestId("count-display")).toHaveTextContent("Count: 3");
  });

  test("does not increment beyond max value", async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={9} max={10} />);

    const incrementButton = screen.getByTestId("increment-button");

    // Increment to max
    await user.click(incrementButton);
    expect(screen.getByTestId("count-display")).toHaveTextContent("Count: 10");

    // Try to increment beyond max
    await user.click(incrementButton);
    expect(screen.getByTestId("count-display")).toHaveTextContent("Count: 10");
  });

  test("shows max message when maximum is reached", async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={9} max={10} />);

    await user.click(screen.getByTestId("increment-button"));

    expect(screen.getByTestId("max-message")).toBeInTheDocument();
    expect(screen.getByTestId("max-message")).toHaveTextContent(
      "Maximum value reached!"
    );
  });

  test("does not decrement below 0", async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} />);

    const decrementButton = screen.getByTestId("decrement-button");
    await user.click(decrementButton);

    expect(screen.getByTestId("count-display")).toHaveTextContent("Count: 0");
  });

  test("disables increment button at max value", async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={9} max={10} />);

    await user.click(screen.getByTestId("increment-button"));

    expect(screen.getByTestId("increment-button")).toBeDisabled();
  });

  test("disables decrement button at minimum value", () => {
    render(<Counter initialValue={0} />);

    expect(screen.getByTestId("decrement-button")).toBeDisabled();
  });
});

// LoginForm.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LoginForm } from "./LoginForm";

describe("LoginForm Component", () => {
  test("renders login form", () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} />);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
  });

  test("submits form with valid data", async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();

    render(<LoginForm onSubmit={mockSubmit} />);

    await user.type(screen.getByTestId("email-input"), "test@example.com");
    await user.type(screen.getByTestId("password-input"), "password123");
    await user.click(screen.getByTestId("submit-button"));

    expect(mockSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  test("shows email validation error", async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();

    render(<LoginForm onSubmit={mockSubmit} />);

    await user.click(screen.getByTestId("submit-button"));

    expect(screen.getByTestId("email-error")).toHaveTextContent(
      "Email is required"
    );
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test("shows invalid email error", async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();

    render(<LoginForm onSubmit={mockSubmit} />);

    await user.type(screen.getByTestId("email-input"), "invalid-email");
    await user.click(screen.getByTestId("submit-button"));

    expect(screen.getByTestId("email-error")).toHaveTextContent(
      "Email is invalid"
    );
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test("shows password validation error", async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();

    render(<LoginForm onSubmit={mockSubmit} />);

    await user.type(screen.getByTestId("email-input"), "test@example.com");
    await user.type(screen.getByTestId("password-input"), "123");
    await user.click(screen.getByTestId("submit-button"));

    expect(screen.getByTestId("password-error")).toHaveTextContent(
      "Password must be at least 6 characters"
    );
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test("shows loading state", () => {
    const mockSubmit = jest.fn();
    render(<LoginForm onSubmit={mockSubmit} isLoading={true} />);

    expect(screen.getByTestId("submit-button")).toBeDisabled();
    expect(screen.getByTestId("submit-button")).toHaveTextContent(
      "Logging in..."
    );
  });

  test("form submission prevented when loading", async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();

    render(<LoginForm onSubmit={mockSubmit} isLoading={true} />);

    await user.type(screen.getByTestId("email-input"), "test@example.com");
    await user.type(screen.getByTestId("password-input"), "password123");
    await user.click(screen.getByTestId("submit-button"));

    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
```

## 🎯 Testing Custom Hooks

```tsx
// Custom hooks to test
import { useState, useEffect, useCallback } from "react";

// useCounter hook
export function useCounter(initialValue = 0, step = 1) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount((prev) => prev + step);
  }, [step]);

  const decrement = useCallback(() => {
    setCount((prev) => prev - step);
  }, [step]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset };
}

// useLocalStorage hook
export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setStoredValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const valueToStore =
          newValue instanceof Function ? newValue(prev) : newValue;
        localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    },
    [key]
  );

  const removeValue = useCallback(() => {
    localStorage.removeItem(key);
    setValue(defaultValue);
  }, [key, defaultValue]);

  return { value, setValue: setStoredValue, removeValue };
}

// useApiCall hook
interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApiCall<T>(url: string) {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 100));

      if (url.includes("error")) {
        throw new Error("API Error");
      }

      const mockData = { message: `Data from ${url}` } as T;
      setState({ data: mockData, loading: false, error: null });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}

// Hook tests
import { renderHook, act } from "@testing-library/react";
import { useCounter, useLocalStorage, useApiCall } from "./hooks";

describe("useCounter Hook", () => {
  test("initializes with default value", () => {
    const { result } = renderHook(() => useCounter());

    expect(result.current.count).toBe(0);
  });

  test("initializes with custom value", () => {
    const { result } = renderHook(() => useCounter(10));

    expect(result.current.count).toBe(10);
  });

  test("increments count", () => {
    const { result } = renderHook(() => useCounter(0, 2));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(2);
  });

  test("decrements count", () => {
    const { result } = renderHook(() => useCounter(10, 3));

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(7);
  });

  test("resets count to initial value", () => {
    const { result } = renderHook(() => useCounter(5));

    // Change the count first
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(6);

    // Then reset
    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(5);
  });
});

describe("useLocalStorage Hook", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("initializes with default value when localStorage is empty", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "default"));

    expect(result.current.value).toBe("default");
  });

  test("initializes with value from localStorage", () => {
    localStorage.setItem("test-key", JSON.stringify("stored-value"));

    const { result } = renderHook(() => useLocalStorage("test-key", "default"));

    expect(result.current.value).toBe("stored-value");
  });

  test("updates localStorage when value changes", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", "initial"));

    act(() => {
      result.current.setValue("new-value");
    });

    expect(result.current.value).toBe("new-value");
    expect(localStorage.getItem("test-key")).toBe('"new-value"');
  });

  test("supports function updates", () => {
    const { result } = renderHook(() => useLocalStorage("test-key", 0));

    act(() => {
      result.current.setValue((prev) => prev + 5);
    });

    expect(result.current.value).toBe(5);
  });

  test("removes value from localStorage", () => {
    localStorage.setItem("test-key", JSON.stringify("stored-value"));

    const { result } = renderHook(() => useLocalStorage("test-key", "default"));

    act(() => {
      result.current.removeValue();
    });

    expect(result.current.value).toBe("default");
    expect(localStorage.getItem("test-key")).toBeNull();
  });

  test("handles JSON parse errors gracefully", () => {
    localStorage.setItem("test-key", "invalid-json");

    const { result } = renderHook(() => useLocalStorage("test-key", "default"));

    expect(result.current.value).toBe("default");
  });
});

describe("useApiCall Hook", () => {
  test("starts with loading state", () => {
    const { result } = renderHook(() => useApiCall("/api/data"));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  test("loads data successfully", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useApiCall("/api/data")
    );

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual({ message: "Data from /api/data" });
    expect(result.current.error).toBeNull();
  });

  test("handles API errors", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useApiCall("/api/error")
    );

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("API Error");
  });

  test("refetches data", async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useApiCall("/api/data")
    );

    await waitForNextUpdate();

    // Refetch
    act(() => {
      result.current.refetch();
    });

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual({ message: "Data from /api/data" });
  });
});
```

## 🎯 Mocking & Integration Tests

```tsx
// Mocking external dependencies
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock fetch globally
global.fetch = jest.fn();

// Component that uses external API
interface User {
  id: number;
  name: string;
  email: string;
}

function UserList() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const userData = await response.json();
      setUsers(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div data-testid="loading">Loading...</div>;
  if (error) return <div data-testid="error">Error: {error}</div>;

  return (
    <div data-testid="user-list">
      <h2>Users</h2>
      <button onClick={fetchUsers} data-testid="refresh-button">
        Refresh
      </button>
      {users.length === 0 ? (
        <div data-testid="no-users">No users found</div>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id} data-testid={`user-${user.id}`}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Tests with mocking
describe("UserList Component", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test("shows loading state initially", () => {
    (fetch as jest.Mock).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<UserList />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("displays users after successful fetch", async () => {
    const mockUsers = [
      { id: 1, name: "John Doe", email: "john@example.com" },
      { id: 2, name: "Jane Smith", email: "jane@example.com" },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByTestId("user-list")).toBeInTheDocument();
    });

    expect(screen.getByTestId("user-1")).toHaveTextContent(
      "John Doe - john@example.com"
    );
    expect(screen.getByTestId("user-2")).toHaveTextContent(
      "Jane Smith - jane@example.com"
    );
  });

  test("displays error message on fetch failure", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });

    expect(screen.getByTestId("error")).toHaveTextContent(
      "Error: Network error"
    );
  });

  test("displays error for non-ok response", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });

    expect(screen.getByTestId("error")).toHaveTextContent(
      "Error: Failed to fetch users"
    );
  });

  test("refetches data when refresh button is clicked", async () => {
    const user = userEvent.setup();
    const mockUsers = [{ id: 1, name: "John Doe", email: "john@example.com" }];

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    });

    render(<UserList />);

    // Wait for initial load
    await waitFor(() => {
      expect(screen.getByTestId("user-list")).toBeInTheDocument();
    });

    // Click refresh
    await user.click(screen.getByTestId("refresh-button"));

    expect(fetch).toHaveBeenCalledTimes(2);
  });

  test("shows no users message when array is empty", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<UserList />);

    await waitFor(() => {
      expect(screen.getByTestId("no-users")).toBeInTheDocument();
    });

    expect(screen.getByTestId("no-users")).toHaveTextContent("No users found");
  });
});

// Testing with React Context
const ThemeContext = React.createContext<{
  theme: "light" | "dark";
  toggleTheme: () => void;
}>({
  theme: "light",
  toggleTheme: () => {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      data-testid="themed-button"
      className={
        theme === "light" ? "bg-white text-black" : "bg-black text-white"
      }
    >
      Current theme: {theme}
    </button>
  );
}

// Testing components with context
describe("ThemedButton with Context", () => {
  test("displays current theme and toggles", async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemedButton />
      </ThemeProvider>
    );

    const button = screen.getByTestId("themed-button");

    expect(button).toHaveTextContent("Current theme: light");
    expect(button).toHaveClass("bg-white", "text-black");

    await user.click(button);

    expect(button).toHaveTextContent("Current theme: dark");
    expect(button).toHaveClass("bg-black", "text-white");
  });
});
```

## 🎯 What You've Learned

### ✅ Testing Fundamentals:

1. **Component testing** with React Testing Library
2. **User interaction** testing with userEvent
3. **Custom hook** testing with renderHook
4. **Mocking external dependencies** like fetch
5. **Context testing** with providers

### ✅ Best Practices:

1. **Test behavior**, not implementation
2. **Use semantic queries** (getByRole, getByLabelText)
3. **Mock external dependencies** appropriately
4. **Test error states** and edge cases
5. **Write descriptive test names**

## 🚀 What's Next?

In **Lesson 21: Styling Solutions**, we'll learn:

- CSS Modules for scoped styling
- Styled-components for CSS-in-JS
- Tailwind CSS best practices
- Theme systems and design tokens

Your components are now thoroughly tested and reliable! 🧪

---

**💡 Pro Tip**: Good tests give you confidence to refactor and add features. Focus on testing user behavior rather than implementation details - if a user can't tell the difference, neither should your tests!
