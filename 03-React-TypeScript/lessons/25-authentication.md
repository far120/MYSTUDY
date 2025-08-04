# Lesson 25: Authentication and Authorization 🔐

## Welcome to Secure React Apps! 🛡️

**Authentication and Authorization** are crucial for real-world applications! Authentication verifies who users are, while authorization determines what they can access. Let's build secure, role-based React applications with TypeScript!

## 🎯 JWT-Based Authentication System

```tsx
import React, { createContext, useContext, useState, useEffect } from "react";

// Authentication types
interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "user" | "admin" | "moderator";
  permissions: Permission[];
  createdAt: string;
  lastLogin?: string;
}

interface Permission {
  resource: string; // 'users', 'posts', 'comments', etc.
  actions: string[]; // 'create', 'read', 'update', 'delete'
}

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface AuthError {
  message: string;
  code: string;
  field?: string;
}

// JWT Token utilities
class TokenManager {
  private static ACCESS_TOKEN_KEY = "accessToken";
  private static REFRESH_TOKEN_KEY = "refreshToken";

  static setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  static getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  static clearTokens(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  static isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  static decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  }
}

// API Service for authentication
class AuthAPI {
  private static baseURL = "https://api.example.com"; // Replace with your API

  private static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = TokenManager.getAccessToken();

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Request failed");
    }

    return response.json();
  }

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Mock API response - replace with real API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock authentication logic
    if (
      credentials.email === "admin@example.com" &&
      credentials.password === "admin123"
    ) {
      return {
        user: {
          id: "1",
          email: "admin@example.com",
          name: "Admin User",
          role: "admin",
          permissions: [
            {
              resource: "users",
              actions: ["create", "read", "update", "delete"],
            },
            {
              resource: "posts",
              actions: ["create", "read", "update", "delete"],
            },
            { resource: "settings", actions: ["read", "update"] },
          ],
          createdAt: "2023-01-01T00:00:00Z",
          lastLogin: new Date().toISOString(),
        },
        accessToken: "mock-access-token-admin",
        refreshToken: "mock-refresh-token-admin",
        expiresIn: 3600,
      };
    } else if (
      credentials.email === "user@example.com" &&
      credentials.password === "user123"
    ) {
      return {
        user: {
          id: "2",
          email: "user@example.com",
          name: "Regular User",
          role: "user",
          permissions: [
            { resource: "posts", actions: ["create", "read", "update"] },
            {
              resource: "comments",
              actions: ["create", "read", "update", "delete"],
            },
          ],
          createdAt: "2023-06-01T00:00:00Z",
          lastLogin: new Date().toISOString(),
        },
        accessToken: "mock-access-token-user",
        refreshToken: "mock-refresh-token-user",
        expiresIn: 3600,
      };
    } else {
      throw new Error("Invalid email or password");
    }
  }

  static async register(data: RegisterData): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (data.password !== data.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    // Mock registration
    return {
      user: {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        role: "user",
        permissions: [
          { resource: "posts", actions: ["create", "read", "update"] },
          {
            resource: "comments",
            actions: ["create", "read", "update", "delete"],
          },
        ],
        createdAt: new Date().toISOString(),
      },
      accessToken: `mock-access-token-${Date.now()}`,
      refreshToken: `mock-refresh-token-${Date.now()}`,
      expiresIn: 3600,
    };
  }

  static async refreshToken(): Promise<{
    accessToken: string;
    expiresIn: number;
  }> {
    const refreshToken = TokenManager.getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      accessToken: `refreshed-token-${Date.now()}`,
      expiresIn: 3600,
    };
  }

  static async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    // In real app, you'd invalidate the token on the server
  }

  static async getCurrentUser(): Promise<User> {
    const token = TokenManager.getAccessToken();
    if (!token) {
      throw new Error("No access token");
    }

    // In real app, decode token or fetch user from API
    const decoded = TokenManager.decodeToken(token);
    return decoded.user;
  }
}

// Authentication Context
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  hasPermission: (resource: string, action: string) => boolean;
  hasRole: (role: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  const isAuthenticated = !!user;

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = TokenManager.getAccessToken();
        if (token && !TokenManager.isTokenExpired(token)) {
          const currentUser = await AuthAPI.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        TokenManager.clearTokens();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Auto-refresh token
  useEffect(() => {
    if (!isAuthenticated) return;

    const refreshInterval = setInterval(async () => {
      try {
        const token = TokenManager.getAccessToken();
        if (token && TokenManager.isTokenExpired(token)) {
          const { accessToken } = await AuthAPI.refreshToken();
          TokenManager.setTokens(accessToken, TokenManager.getRefreshToken()!);
        }
      } catch (error) {
        await logout();
      }
    }, 5 * 60 * 1000); // Check every 5 minutes

    return () => clearInterval(refreshInterval);
  }, [isAuthenticated]);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await AuthAPI.login(credentials);

      TokenManager.setTokens(response.accessToken, response.refreshToken);
      setUser(response.user);
    } catch (error) {
      setError({
        message: error instanceof Error ? error.message : "Login failed",
        code: "LOGIN_ERROR",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await AuthAPI.register(data);

      TokenManager.setTokens(response.accessToken, response.refreshToken);
      setUser(response.user);
    } catch (error) {
      setError({
        message: error instanceof Error ? error.message : "Registration failed",
        code: "REGISTER_ERROR",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);

    try {
      await AuthAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      TokenManager.clearTokens();
      setUser(null);
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const hasPermission = (resource: string, action: string): boolean => {
    if (!user) return false;

    const permission = user.permissions.find((p) => p.resource === resource);
    return permission ? permission.actions.includes(action) : false;
  };

  const hasRole = (roles: string | string[]): boolean => {
    if (!user) return false;

    const roleArray = Array.isArray(roles) ? roles : [roles];
    return roleArray.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        clearError,
        hasPermission,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Login Form Component
function LoginForm() {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const { login, isLoading, error, clearError } = useAuth();

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) return;

    await login(formData);
  };

  const handleChange = (
    field: keyof LoginCredentials,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <button className="font-medium text-blue-600 hover:text-blue-500">
              create a new account
            </button>
          </p>
        </div>

        {/* Demo credentials */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            Demo Accounts:
          </h3>
          <div className="text-xs text-blue-700 space-y-1">
            <div>Admin: admin@example.com / admin123</div>
            <div>User: user@example.com / user123</div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-400">❌</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Authentication Error
                </h3>
                <div className="mt-2 text-sm text-red-700">{error.message}</div>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                  validationErrors.email ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                placeholder="Enter your email"
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className={`appearance-none relative block w-full px-3 py-2 pr-10 border ${
                    validationErrors.password
                      ? "border-red-300"
                      : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="text-gray-400">
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </button>
              </div>
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.password}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => handleChange("rememberMe", e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <button
                type="button"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Protected Route Component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: { resource: string; action: string };
  requiredRole?: string | string[];
  fallback?: React.ReactNode;
}

function ProtectedRoute({
  children,
  requiredPermission,
  requiredRole,
  fallback,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, hasPermission, hasRole } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return fallback || <LoginForm />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You don't have the required role to access this page.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Required:{" "}
            {Array.isArray(requiredRole)
              ? requiredRole.join(", ")
              : requiredRole}
          </p>
        </div>
      </div>
    );
  }

  if (
    requiredPermission &&
    !hasPermission(requiredPermission.resource, requiredPermission.action)
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Insufficient Permissions
          </h1>
          <p className="text-gray-600">
            You don't have permission to perform this action.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Required: {requiredPermission.action} on{" "}
            {requiredPermission.resource}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Permission-based UI Component
interface PermissionGuardProps {
  resource: string;
  action: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

function PermissionGuard({
  resource,
  action,
  children,
  fallback = null,
}: PermissionGuardProps) {
  const { hasPermission } = useAuth();

  if (!hasPermission(resource, action)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Role-based UI Component
interface RoleGuardProps {
  roles: string | string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

function RoleGuard({ roles, children, fallback = null }: RoleGuardProps) {
  const { hasRole } = useAuth();

  if (!hasRole(roles)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
```

## 🎯 Dashboard with Role-Based UI

```tsx
// Dashboard Components
function UserDashboard() {
  const { user, logout, hasPermission } = useAuth();

  const stats = [
    { label: "My Posts", value: "12", icon: "📝", color: "bg-blue-500" },
    { label: "Comments", value: "48", icon: "💬", color: "bg-green-500" },
    { label: "Likes Received", value: "234", icon: "❤️", color: "bg-red-500" },
    { label: "Following", value: "89", icon: "👥", color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="text-2xl">{user?.avatar || "👤"}</div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-3 mr-4`}>
                  <span className="text-white text-xl">{stat.icon}</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Posts */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Posts
              </h2>
              <PermissionGuard resource="posts" action="create">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors">
                  New Post
                </button>
              </PermissionGuard>
            </div>

            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-medium text-gray-900">Post Title {i}</h3>
                  <p className="text-sm text-gray-600">Posted 2 hours ago</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <PermissionGuard resource="posts" action="update">
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        Edit
                      </button>
                    </PermissionGuard>
                    <PermissionGuard resource="posts" action="delete">
                      <button className="text-red-600 hover:text-red-700 text-sm">
                        Delete
                      </button>
                    </PermissionGuard>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>

            <div className="space-y-4">
              {[
                {
                  action: "liked your post",
                  user: "John Doe",
                  time: "5 minutes ago",
                },
                {
                  action: "commented on your post",
                  user: "Jane Smith",
                  time: "1 hour ago",
                },
                {
                  action: "started following you",
                  user: "Mike Johnson",
                  time: "2 hours ago",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    👤
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Admin Panel */}
        <RoleGuard roles={["admin", "moderator"]}>
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {user?.role === "admin" ? "👑 Admin Panel" : "🛡️ Moderator Panel"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PermissionGuard resource="users" action="read">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">
                    User Management
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Manage user accounts and permissions
                  </p>
                  <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm transition-colors">
                    Manage Users
                  </button>
                </div>
              </PermissionGuard>

              <PermissionGuard resource="posts" action="delete">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">
                    Content Moderation
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Review and moderate user content
                  </p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm transition-colors">
                    Moderate Content
                  </button>
                </div>
              </PermissionGuard>

              <RoleGuard roles="admin">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">
                    System Settings
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Configure system settings
                  </p>
                  <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors">
                    Settings
                  </button>
                </div>
              </RoleGuard>
            </div>
          </div>
        </RoleGuard>
      </div>
    </div>
  );
}

// User Management Component (Admin only)
function UserManagement() {
  const { hasPermission } = useAuth();
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "moderator",
      status: "active",
    },
    {
      id: "3",
      name: "Bob Wilson",
      email: "bob@example.com",
      role: "user",
      status: "inactive",
    },
  ]);

  const handleRoleChange = (userId: string, newRole: string) => {
    if (!hasPermission("users", "update")) return;

    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    if (!hasPermission("users", "update")) return;

    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  return (
    <ProtectedRoute requiredPermission={{ resource: "users", action: "read" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">
              User Management
            </h1>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          👤
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <PermissionGuard
                        resource="users"
                        action="update"
                        fallback={
                          <span className="capitalize text-sm text-gray-900">
                            {user.role}
                          </span>
                        }
                      >
                        <select
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(user.id, e.target.value)
                          }
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="user">User</option>
                          <option value="moderator">Moderator</option>
                          <option value="admin">Admin</option>
                        </select>
                      </PermissionGuard>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <PermissionGuard resource="users" action="update">
                        <button
                          onClick={() =>
                            handleStatusChange(
                              user.id,
                              user.status === "active" ? "inactive" : "active"
                            )
                          }
                          className={`${
                            user.status === "active"
                              ? "text-red-600 hover:text-red-700"
                              : "text-green-600 hover:text-green-700"
                          }`}
                        >
                          {user.status === "active" ? "Deactivate" : "Activate"}
                        </button>
                      </PermissionGuard>

                      <PermissionGuard resource="users" action="delete">
                        <button className="text-red-600 hover:text-red-700">
                          Delete
                        </button>
                      </PermissionGuard>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

// Complete Authentication App
export function AuthApp() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated ? <UserDashboard /> : <LoginForm />}
    </div>
  );
}

// Main App with AuthProvider
export function App() {
  return (
    <AuthProvider>
      <AuthApp />
    </AuthProvider>
  );
}
```

## 🎯 What You've Learned

### ✅ Authentication Fundamentals:

1. **JWT token management** with automatic refresh
2. **Secure login/logout** flows with error handling
3. **User session persistence** and initialization
4. **Password security** best practices
5. **Protected routes** with authentication guards

### ✅ Authorization Patterns:

1. **Role-based access control** (RBAC) implementation
2. **Permission-based UI** components and guards
3. **Conditional rendering** based on user capabilities
4. **Resource-level security** with granular permissions
5. **Multi-level authorization** (roles + permissions)

## 🚀 What's Next?

In **Lesson 26: Performance and Optimization**, we'll learn:

- Code splitting and lazy loading
- Bundle optimization techniques
- Performance monitoring and profiling
- Memory leak prevention

Your authentication system is now enterprise-grade! 🔐

---

**💡 Pro Tip**: Security is layered - always validate permissions on both frontend AND backend! The frontend provides user experience, but the backend enforces security. Never trust the client!
