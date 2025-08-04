# Lesson 19: Render Props 🎭

## Welcome to Flexible Components! 🎪

**Render Props** are like passing a recipe instead of a finished dish! This pattern lets you share logic between components by passing functions that return JSX. It's incredibly flexible and lets components decide how to render shared functionality.

## 🎯 Basic Render Props Pattern

```tsx
import React, { useState, useEffect } from "react";

// Mouse tracker component with render props
interface MousePosition {
  x: number;
  y: number;
}

interface MouseTrackerProps {
  render: (mousePosition: MousePosition) => React.ReactNode;
}

function MouseTracker({ render }: MouseTrackerProps) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <>{render(mousePosition)}</>;
}

// Toggle component with render props
interface ToggleProps {
  defaultValue?: boolean;
  render: (props: {
    isOn: boolean;
    toggle: () => void;
    turnOn: () => void;
    turnOff: () => void;
  }) => React.ReactNode;
}

function Toggle({ defaultValue = false, render }: ToggleProps) {
  const [isOn, setIsOn] = useState(defaultValue);

  const toggle = () => setIsOn(!isOn);
  const turnOn = () => setIsOn(true);
  const turnOff = () => setIsOn(false);

  return <>{render({ isOn, toggle, turnOn, turnOff })}</>;
}

// Counter component with render props
interface CounterProps {
  initialValue?: number;
  step?: number;
  render: (props: {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
  }) => React.ReactNode;
}

function Counter({ initialValue = 0, step = 1, render }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount((c) => c + step);
  const decrement = () => setCount((c) => c - step);
  const reset = () => setCount(initialValue);

  return <>{render({ count, increment, decrement, reset })}</>;
}

function BasicRenderPropsExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Basic Render Props Pattern</h2>

      <div className="space-y-8">
        {/* Mouse tracker */}
        <section className="p-6 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Mouse Position Tracker</h3>

          <MouseTracker
            render={(mousePosition) => (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 font-medium">
                    Mouse position: ({mousePosition.x}, {mousePosition.y})
                  </p>
                  <div className="mt-2 w-full h-8 bg-blue-200 rounded relative">
                    <div
                      className="absolute w-4 h-4 bg-blue-600 rounded-full transform -translate-x-2 -translate-y-2"
                      style={{
                        left: `${Math.min(
                          100,
                          Math.max(
                            0,
                            (mousePosition.x / window.innerWidth) * 100
                          )
                        )}%`,
                        top: "50%",
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-green-50 rounded">
                    <h4 className="font-medium text-green-800">X Coordinate</h4>
                    <p className="text-2xl font-bold text-green-600">
                      {mousePosition.x}px
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded">
                    <h4 className="font-medium text-purple-800">
                      Y Coordinate
                    </h4>
                    <p className="text-2xl font-bold text-purple-600">
                      {mousePosition.y}px
                    </p>
                  </div>
                </div>
              </div>
            )}
          />
        </section>

        {/* Toggle examples */}
        <section className="p-6 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Toggle Components</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Light Switch</h4>
              <Toggle
                render={({ isOn, toggle }) => (
                  <div className="text-center">
                    <div
                      className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center text-4xl transition-colors ${
                        isOn ? "bg-yellow-300" : "bg-gray-300"
                      }`}
                    >
                      {isOn ? "💡" : "🌙"}
                    </div>
                    <button
                      onClick={toggle}
                      className={`mt-4 px-6 py-2 rounded font-medium transition-colors ${
                        isOn
                          ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                          : "bg-gray-500 hover:bg-gray-600 text-white"
                      }`}
                    >
                      Turn {isOn ? "Off" : "On"}
                    </button>
                    <p className="mt-2 text-sm text-gray-600">
                      Status: {isOn ? "Light is on!" : "Light is off"}
                    </p>
                  </div>
                )}
              />
            </div>

            <div>
              <h4 className="font-medium mb-3">Modal Controller</h4>
              <Toggle
                render={({ isOn, turnOn, turnOff }) => (
                  <div>
                    <button
                      onClick={turnOn}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Open Modal
                    </button>

                    {isOn && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
                          <h3 className="text-lg font-bold mb-4">
                            Example Modal
                          </h3>
                          <p className="text-gray-600 mb-4">
                            This modal is controlled by a render prop!
                          </p>
                          <button
                            onClick={turnOff}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Close Modal
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          </div>
        </section>

        {/* Counter examples */}
        <section className="p-6 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Counter Components</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Simple Counter</h4>
              <Counter
                initialValue={0}
                step={1}
                render={({ count, increment, decrement, reset }) => (
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-4">
                      {count}
                    </div>
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={decrement}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        -
                      </button>
                      <button
                        onClick={reset}
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Reset
                      </button>
                      <button
                        onClick={increment}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              />
            </div>

            <div>
              <h4 className="font-medium mb-3">Progress Bar Counter</h4>
              <Counter
                initialValue={0}
                step={10}
                render={({ count, increment, decrement, reset }) => (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Progress</span>
                      <span>{count}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, Math.max(0, count))}%`,
                        }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={decrement}
                        disabled={count <= 0}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-300"
                      >
                        -10%
                      </button>
                      <button
                        onClick={reset}
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                      >
                        Reset
                      </button>
                      <button
                        onClick={increment}
                        disabled={count >= 100}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-300"
                      >
                        +10%
                      </button>
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default BasicRenderPropsExample;
```

## 🎯 Function as Children Pattern

```tsx
import React, { useState, useEffect, ReactNode } from "react";

// Data fetcher with function as children
interface DataFetcherProps<T> {
  url: string;
  children: (props: {
    data: T | null;
    loading: boolean;
    error: string | null;
    refetch: () => void;
  }) => ReactNode;
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock data based on URL
      let mockData: any;
      if (url.includes("users")) {
        mockData = [
          { id: 1, name: "John Doe", email: "john@example.com" },
          { id: 2, name: "Jane Smith", email: "jane@example.com" },
          { id: 3, name: "Bob Johnson", email: "bob@example.com" },
        ];
      } else if (url.includes("posts")) {
        mockData = [
          { id: 1, title: "First Post", content: "This is the first post" },
          { id: 2, title: "Second Post", content: "This is the second post" },
          { id: 3, title: "Third Post", content: "This is the third post" },
        ];
      } else {
        throw new Error("Unknown endpoint");
      }

      setData(mockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return <>{children({ data, loading, error, refetch: fetchData })}</>;
}

// Form validation with function as children
interface FormValidatorProps {
  initialValues: Record<string, any>;
  validationRules: Record<string, (value: any) => string | undefined>;
  children: (props: {
    values: Record<string, any>;
    errors: Record<string, string>;
    isValid: boolean;
    handleChange: (field: string, value: any) => void;
    handleSubmit: (
      onSubmit: (values: Record<string, any>) => void
    ) => (e: React.FormEvent) => void;
    reset: () => void;
  }) => ReactNode;
}

function FormValidator({
  initialValues,
  validationRules,
  children,
}: FormValidatorProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (fieldName?: string) => {
    const newErrors: Record<string, string> = {};

    const fieldsToValidate = fieldName
      ? [fieldName]
      : Object.keys(validationRules);

    fieldsToValidate.forEach((field) => {
      if (validationRules[field] && (touched[field] || !fieldName)) {
        const error = validationRules[field](values[field]);
        if (error) {
          newErrors[field] = error;
        }
      }
    });

    if (fieldName) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: newErrors[fieldName] || "",
      }));
    } else {
      setErrors(newErrors);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: string, value: any) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Validate field after a short delay
    setTimeout(() => validate(field), 100);
  };

  const handleSubmit = (onSubmit: (values: Record<string, any>) => void) => {
    return (e: React.FormEvent) => {
      e.preventDefault();

      // Mark all fields as touched
      const allTouched = Object.keys(validationRules).reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {} as Record<string, boolean>);

      setTouched(allTouched);

      if (validate()) {
        onSubmit(values);
      }
    };
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  const isValid = Object.keys(errors).every((key) => !errors[key]);

  return (
    <>
      {children({ values, errors, isValid, handleChange, handleSubmit, reset })}
    </>
  );
}

// Local storage with function as children
interface LocalStorageProps<T> {
  key: string;
  defaultValue: T;
  children: (props: {
    value: T;
    setValue: (value: T) => void;
    removeValue: () => void;
    isLoading: boolean;
  }) => ReactNode;
}

function LocalStorage<T>({
  key,
  defaultValue,
  children,
}: LocalStorageProps<T>) {
  const [value, setValue] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        setValue(JSON.parse(item));
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, [key]);

  const updateValue = (newValue: T) => {
    setValue(newValue);
    try {
      localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  };

  const removeValue = () => {
    setValue(defaultValue);
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  };

  return (
    <>{children({ value, setValue: updateValue, removeValue, isLoading })}</>
  );
}

function FunctionAsChildrenExample() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Function as Children Pattern</h2>

      <div className="space-y-8">
        {/* Data fetching */}
        <section className="p-6 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Data Fetching</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Users Data</h4>
              <DataFetcher<
                Array<{ id: number; name: string; email: string }>
              > url="/api/users">
                {({ data, loading, error, refetch }) => {
                  if (loading)
                    return (
                      <div className="flex items-center gap-2 p-4 bg-blue-50 rounded">
                        <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />
                        <span className="text-blue-700">Loading users...</span>
                      </div>
                    );

                  if (error)
                    return (
                      <div className="p-4 bg-red-50 border border-red-200 rounded">
                        <p className="text-red-700 mb-2">Error: {error}</p>
                        <button
                          onClick={refetch}
                          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                        >
                          Retry
                        </button>
                      </div>
                    );

                  return (
                    <div className="space-y-2">
                      {data?.map((user) => (
                        <div key={user.id} className="p-3 bg-gray-50 rounded">
                          <h5 className="font-medium">{user.name}</h5>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      ))}
                      <button
                        onClick={refetch}
                        className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                      >
                        Refresh
                      </button>
                    </div>
                  );
                }}
              </DataFetcher>
            </div>

            <div>
              <h4 className="font-medium mb-3">Posts Data</h4>
              <DataFetcher<
                Array<{ id: number; title: string; content: string }>
              > url="/api/posts">
                {({ data, loading, error, refetch }) => {
                  if (loading)
                    return (
                      <div className="flex items-center gap-2 p-4 bg-green-50 rounded">
                        <div className="animate-spin w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full" />
                        <span className="text-green-700">Loading posts...</span>
                      </div>
                    );

                  if (error)
                    return (
                      <div className="p-4 bg-red-50 border border-red-200 rounded">
                        <p className="text-red-700 mb-2">Error: {error}</p>
                        <button
                          onClick={refetch}
                          className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                        >
                          Retry
                        </button>
                      </div>
                    );

                  return (
                    <div className="space-y-3">
                      {data?.map((post) => (
                        <div key={post.id} className="p-3 border rounded">
                          <h5 className="font-medium mb-1">{post.title}</h5>
                          <p className="text-sm text-gray-600">
                            {post.content}
                          </p>
                        </div>
                      ))}
                      <button
                        onClick={refetch}
                        className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                      >
                        Refresh
                      </button>
                    </div>
                  );
                }}
              </DataFetcher>
            </div>
          </div>
        </section>

        {/* Form validation */}
        <section className="p-6 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Form Validation</h3>

          <FormValidator
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationRules={{
              name: (value) => {
                if (!value) return "Name is required";
                if (value.length < 2)
                  return "Name must be at least 2 characters";
                return undefined;
              },
              email: (value) => {
                if (!value) return "Email is required";
                if (!/\S+@\S+\.\S+/.test(value)) return "Email is invalid";
                return undefined;
              },
              password: (value) => {
                if (!value) return "Password is required";
                if (value.length < 6)
                  return "Password must be at least 6 characters";
                return undefined;
              },
              confirmPassword: (value, values) => {
                if (!value) return "Please confirm your password";
                if (value !== values?.password) return "Passwords do not match";
                return undefined;
              },
            }}
          >
            {({
              values,
              errors,
              isValid,
              handleChange,
              handleSubmit,
              reset,
            }) => (
              <form
                onSubmit={handleSubmit((formValues) => {
                  alert(
                    "Form submitted with: " +
                      JSON.stringify(formValues, null, 2)
                  );
                })}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      value={values.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                        errors.name
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={values.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={values.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                        errors.password
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={values.confirmPassword}
                      onChange={(e) =>
                        handleChange("confirmPassword", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                        errors.confirmPassword
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={!isValid}
                    className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    Reset
                  </button>
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">
                    Form is {isValid ? "valid" : "invalid"}
                  </p>
                </div>
              </form>
            )}
          </FormValidator>
        </section>

        {/* Local storage */}
        <section className="p-6 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">
            Local Storage Preferences
          </h3>

          <LocalStorage
            key="user-preferences"
            defaultValue={{
              theme: "light" as "light" | "dark",
              language: "en",
              notifications: true,
              autoSave: false,
            }}
          >
            {({ value, setValue, removeValue, isLoading }) => {
              if (isLoading) {
                return (
                  <div className="text-gray-500">Loading preferences...</div>
                );
              }

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Theme
                      </label>
                      <select
                        value={value.theme}
                        onChange={(e) =>
                          setValue({
                            ...value,
                            theme: e.target.value as "light" | "dark",
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Language
                      </label>
                      <select
                        value={value.language}
                        onChange={(e) =>
                          setValue({ ...value, language: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={value.notifications}
                        onChange={(e) =>
                          setValue({
                            ...value,
                            notifications: e.target.checked,
                          })
                        }
                      />
                      <span>Enable notifications</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={value.autoSave}
                        onChange={(e) =>
                          setValue({
                            ...value,
                            autoSave: e.target.checked,
                          })
                        }
                      />
                      <span>Auto-save enabled</span>
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={removeValue}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reset to Defaults
                    </button>
                  </div>

                  <div className="p-3 bg-gray-50 rounded">
                    <h4 className="font-medium mb-2">Current Preferences:</h4>
                    <pre className="text-sm text-gray-600">
                      {JSON.stringify(value, null, 2)}
                    </pre>
                  </div>
                </div>
              );
            }}
          </LocalStorage>
        </section>
      </div>
    </div>
  );
}

export { FunctionAsChildrenExample };
```

## 🎯 What You've Learned

### ✅ Render Props Fundamentals:

1. **Basic render props** pattern for logic sharing
2. **Function as children** pattern for flexibility
3. **Data fetching** with render props
4. **Form validation** logic reuse
5. **Local storage** state management

### ✅ Advanced Patterns:

1. **Type-safe render props** with TypeScript
2. **Flexible rendering** with multiple UI variations
3. **Reusable logic** components
4. **State sharing** between components
5. **Cross-cutting concerns** handling

## 🚀 What's Next?

In **Lesson 20: Testing Components**, we'll learn:

- Unit testing React components with TypeScript
- Testing hooks and custom logic
- Mocking external dependencies
- Integration testing strategies

You now have powerful patterns for building flexible, reusable components! 🎭

---

**💡 Pro Tip**: Render props are great for sharing stateful logic, but modern React hooks often provide cleaner solutions. Use render props when you need maximum flexibility in how components render shared functionality!
