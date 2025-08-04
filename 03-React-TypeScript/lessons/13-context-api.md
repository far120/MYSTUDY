# Lesson 13: Context API 🌐

## Welcome to Global State! 🗺️

Imagine passing a message through a chain of 10 people, where each person only cares about passing it along but not the message itself. Pretty inefficient, right? **Context API** lets you share data across your component tree without the tedious "prop drilling" through intermediate components!

## 🤔 What is Context API?

**Context API** is React's built-in solution for sharing state across multiple components without passing props down manually at every level. It's like a global storage that any component can access.

### Real-World Analogy:

Think of Context like **WiFi in a building**:

- 🏢 **Building** is your app
- 📶 **WiFi signal** is your context data
- 📱 **Devices** are your components
- 🔗 **WiFi password** is subscribing to context

Any device in the building can connect to WiFi without cables running through every room!

## 🎯 Basic Context Setup

### 1. **Creating and Using Context**

```tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Step 1: Define the context type
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
}

// Step 2: Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Step 3: Create a custom hook for using the context
function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Step 4: Create the provider component
interface ThemeProviderProps {
  children: ReactNode;
}

function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
    primaryColor,
    setPrimaryColor,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div
        className={`min-h-screen transition-colors ${
          theme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// Step 5: Components that use the context
function Header() {
  const { theme, toggleTheme, primaryColor } = useTheme();

  return (
    <header
      className={`p-4 shadow-md transition-colors ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold" style={{ color: primaryColor }}>
          My App
        </h1>

        <div className="flex items-center gap-4">
          <span className="text-sm">Current theme: {theme}</span>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              theme === "dark"
                ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                : "bg-gray-800 hover:bg-gray-900 text-white"
            }`}
          >
            {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </header>
  );
}

function ColorPicker() {
  const { primaryColor, setPrimaryColor, theme } = useTheme();

  const colors = [
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Yellow
    "#EF4444", // Red
    "#8B5CF6", // Purple
    "#F97316", // Orange
    "#06B6D4", // Cyan
    "#84CC16", // Lime
  ];

  return (
    <div
      className={`p-6 rounded-lg shadow-md ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h3 className="text-lg font-semibold mb-4">Choose Primary Color</h3>

      <div className="grid grid-cols-4 gap-3">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setPrimaryColor(color)}
            className={`w-12 h-12 rounded-lg border-2 transition-all hover:scale-110 ${
              primaryColor === color
                ? "border-gray-800 ring-2 ring-gray-400"
                : "border-gray-300"
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>

      <div
        className="mt-4 p-3 rounded-lg"
        style={{ backgroundColor: primaryColor + "20" }}
      >
        <p className="text-sm">
          <strong>Selected:</strong> {primaryColor}
        </p>
        <p className="text-sm" style={{ color: primaryColor }}>
          This text uses the primary color
        </p>
      </div>
    </div>
  );
}

function ThemeInfo() {
  const { theme, primaryColor } = useTheme();

  return (
    <div
      className={`p-6 rounded-lg shadow-md ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <h3 className="text-lg font-semibold mb-4">Theme Information</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span>Current Theme:</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              theme === "dark"
                ? "bg-gray-700 text-gray-300"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {theme === "dark" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Primary Color:</span>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full border border-gray-300"
              style={{ backgroundColor: primaryColor }}
            />
            <span className="font-mono text-sm">{primaryColor}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span>Text Color:</span>
          <span className="font-mono text-sm">
            {theme === "dark" ? "#FFFFFF" : "#1F2937"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span>Background:</span>
          <span className="font-mono text-sm">
            {theme === "dark" ? "#111827" : "#F3F4F6"}
          </span>
        </div>
      </div>
    </div>
  );
}

// Main component that uses the provider
function ThemeExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Header />

        <main className="max-w-4xl mx-auto p-6">
          <h2 className="text-2xl font-bold text-center mb-8">
            Context API: Theme System
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ColorPicker />
            <ThemeInfo />
          </div>

          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              💡 Context API Benefits
            </h4>
            <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
              <li>• No prop drilling through intermediate components</li>
              <li>• Global state accessible anywhere in the component tree</li>
              <li>• Type-safe with TypeScript interfaces</li>
              <li>• Custom hooks provide clean API for consumers</li>
              <li>• Provider pattern keeps context logic organized</li>
            </ul>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default ThemeExample;
```

## 🎮 Let's Build: User Authentication System

```tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// User types
interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => void;
  hasPermission: (requiredRole: User["role"]) => boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock users database
  const mockUsers: (User & { password: string })[] = [
    {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      password: "user123",
      role: "user",
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane@example.com",
      password: "mod123",
      role: "moderator",
    },
  ];

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Error loading user session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate loading delay
    setTimeout(checkExistingSession, 1000);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Check if user already exists
      const existingUser = mockUsers.find((u) => u.email === email);
      if (existingUser) {
        return false;
      }

      // Create new user
      const newUser: User = {
        id: mockUsers.length + 1,
        name,
        email,
        role: "user",
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  };

  const hasPermission = (requiredRole: User["role"]): boolean => {
    if (!user) return false;

    const roleHierarchy = { user: 1, moderator: 2, admin: 3 };
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    signup,
    updateProfile,
    hasPermission,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Components using the auth context
function LoginForm() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(email, password);
    if (!success) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold text-gray-800 mb-2">Demo Accounts:</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <strong>Admin:</strong> admin@example.com / admin123
          </p>
          <p>
            <strong>User:</strong> john@example.com / user123
          </p>
          <p>
            <strong>Moderator:</strong> jane@example.com / mod123
          </p>
        </div>
      </div>
    </div>
  );
}

function UserProfile() {
  const { user, updateProfile, logout, hasPermission } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  if (!user) return null;

  const handleSave = () => {
    updateProfile({ name, email });
    setIsEditing(false);
  };

  const getRoleColor = (role: User["role"]) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "moderator":
        return "bg-yellow-100 text-yellow-800";
      case "user":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(
                  user.role
                )}`}
              >
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
          </div>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Profile Information</h3>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500">Name:</span>
              <p className="text-gray-800">{user.name}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Email:</span>
              <p className="text-gray-800">{user.email}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Role:</span>
              <p className="text-gray-800">{user.role}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">
                User ID:
              </span>
              <p className="text-gray-800">#{user.id}</p>
            </div>
          </div>
        )}
      </div>

      {/* Permissions Demo */}
      <div className="p-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-800 mb-3">Permissions</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            className={`p-3 rounded-lg ${
              hasPermission("user")
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{hasPermission("user") ? "✅" : "❌"}</span>
              <span className="text-sm font-medium">User Access</span>
            </div>
          </div>

          <div
            className={`p-3 rounded-lg ${
              hasPermission("moderator")
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{hasPermission("moderator") ? "✅" : "❌"}</span>
              <span className="text-sm font-medium">Moderator Access</span>
            </div>
          </div>

          <div
            className={`p-3 rounded-lg ${
              hasPermission("admin")
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <span>{hasPermission("admin") ? "✅" : "❌"}</span>
              <span className="text-sm font-medium">Admin Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin text-4xl mb-4">⏳</div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}

// Main auth example component
function AuthExample() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Context API: Authentication System
        </h1>

        {user ? <UserProfile /> : <LoginForm />}
      </div>
    </div>
  );
}

// App with provider
function AuthApp() {
  return (
    <AuthProvider>
      <AuthExample />
    </AuthProvider>
  );
}

export default AuthApp;
```

## 🎯 Context Best Practices

### ✅ Do's:

- **Create custom hooks** for consuming context
- **Use TypeScript** for type safety
- **Split large contexts** into smaller, focused ones
- **Provide default values** and error boundaries
- **Keep context values stable** to avoid unnecessary re-renders

### ❌ Don'ts:

- **Don't overuse context** for all state management
- **Don't put everything** in one massive context
- **Don't forget Provider** wrapping components
- **Don't mutate context values** directly
- **Don't use context** for frequently changing values

## 🎯 What You've Learned

### ✅ Core Context Concepts:

1. **Creating context** with createContext
2. **Provider pattern** for sharing state
3. **Custom hooks** for clean consumption
4. **TypeScript integration** for type safety
5. **Real-world patterns** like auth and theming

### ✅ Practical Skills:

1. **Theme management** with global state
2. **User authentication** flows
3. **Permission-based access** control
4. **Persistent sessions** with localStorage
5. **Loading states** and error handling

## 🚀 What's Next?

In **Lesson 14: Error Boundaries**, we'll learn how to:

- Catch and handle errors gracefully
- Create fallback UIs for broken components
- Build error reporting systems
- Prevent entire app crashes

You've mastered global state management! Context API eliminates prop drilling and makes your apps more maintainable! 🎉

---

**💡 Remember**: Context is great for global state like themes, auth, and settings. For frequently changing data or complex state logic, consider other solutions like Redux or Zustand!
