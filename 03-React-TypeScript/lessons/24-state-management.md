# Lesson 24: State Management with Zustand 🏪

## Welcome to Global State Management! 🌐

**Zustand** is a lightweight, modern state management library for React! Unlike Redux, it's simple, TypeScript-friendly, and requires minimal boilerplate. Perfect for managing complex application state across components!

## 🎯 Basic Zustand Store Setup

```tsx
// Install: npm install zustand

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { persist } from "zustand/middleware";

// Basic counter store
interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  incrementBy: (amount: number) => void;
}

export const useCounterStore = create<CounterState>((set, get) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  incrementBy: (amount) => set((state) => ({ count: state.count + amount })),
}));

// Using the store in components
function CounterDisplay() {
  const { count, increment, decrement, reset, incrementBy } = useCounterStore();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Counter: {count}
      </h2>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={decrement}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          -1
        </button>

        <button
          onClick={increment}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          +1
        </button>

        <button
          onClick={() => incrementBy(5)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          +5
        </button>

        <button
          onClick={() => incrementBy(10)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          +10
        </button>

        <button
          onClick={reset}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

// Multiple components can use the same store
function CounterStatus() {
  const count = useCounterStore((state) => state.count);

  const getStatus = () => {
    if (count === 0)
      return { text: "Neutral", color: "text-gray-600", bg: "bg-gray-100" };
    if (count > 0)
      return { text: "Positive", color: "text-green-600", bg: "bg-green-100" };
    return { text: "Negative", color: "text-red-600", bg: "bg-red-100" };
  };

  const status = getStatus();

  return (
    <div className={`p-4 rounded-lg ${status.bg}`}>
      <p className={`font-semibold ${status.color}`}>
        Status: {status.text} ({count})
      </p>
    </div>
  );
}
```

## 🎯 Shopping Cart Store

```tsx
// Shopping cart types
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;

  // Actions
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;

  // Computed values
  getItemQuantity: (productId: number) => number;
  isInCart: (productId: number) => boolean;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          let newItems: CartItem[];
          if (existingItem) {
            newItems = state.items.map((item) =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            newItems = [...state.items, { product, quantity }];
          }

          const newTotal = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );
          const newItemCount = newItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          return {
            items: newItems,
            total: newTotal,
            itemCount: newItemCount,
          };
        });
      },

      removeItem: (productId) => {
        set((state) => {
          const newItems = state.items.filter(
            (item) => item.product.id !== productId
          );
          const newTotal = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );
          const newItemCount = newItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          return {
            items: newItems,
            total: newTotal,
            itemCount: newItemCount,
          };
        });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => {
          const newItems = state.items.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          );

          const newTotal = newItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
          );
          const newItemCount = newItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          return {
            items: newItems,
            total: newTotal,
            itemCount: newItemCount,
          };
        });
      },

      clearCart: () => {
        set({ items: [], total: 0, itemCount: 0 });
      },

      getItemQuantity: (productId) => {
        const item = get().items.find((item) => item.product.id === productId);
        return item ? item.quantity : 0;
      },

      isInCart: (productId) => {
        return get().items.some((item) => item.product.id === productId);
      },
    }),
    {
      name: "shopping-cart", // localStorage key
      partialize: (state) => ({
        items: state.items,
        total: state.total,
        itemCount: state.itemCount,
      }),
    }
  )
);

// Sample products
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 89.99,
    image: "🎧",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Coffee Mug",
    price: 12.99,
    image: "☕",
    category: "Kitchen",
  },
  {
    id: 3,
    name: "Notebook",
    price: 5.99,
    image: "📓",
    category: "Office",
  },
  {
    id: 4,
    name: "Plant Pot",
    price: 24.99,
    image: "🪴",
    category: "Home",
  },
];

// Product card component
function ProductCard({ product }: { product: Product }) {
  const { addItem, isInCart, getItemQuantity, updateQuantity } = useCartStore();
  const quantity = getItemQuantity(product.id);
  const inCart = isInCart(product.id);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-4">
        <div className="text-6xl mb-2">{product.image}</div>
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-2xl font-bold text-blue-600 mt-2">
          ${product.price.toFixed(2)}
        </p>
      </div>

      {!inCart ? (
        <button
          onClick={() => addItem(product)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
        >
          Add to Cart
        </button>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => updateQuantity(product.id, quantity - 1)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 w-8 h-8 rounded-full flex items-center justify-center"
            >
              -
            </button>

            <span className="text-lg font-semibold">{quantity} in cart</span>

            <button
              onClick={() => updateQuantity(product.id, quantity + 1)}
              className="bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center"
            >
              +
            </button>
          </div>

          <button
            onClick={() => addItem(product)}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-md transition-colors text-sm"
          >
            Add Another
          </button>
        </div>
      )}
    </div>
  );
}

// Shopping cart component
function ShoppingCart() {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } =
    useCartStore();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* Cart button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg z-40"
      >
        <div className="relative">
          🛒
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </div>
      </button>

      {/* Cart modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Shopping Cart ({itemCount} items)
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div
              className="p-6 overflow-y-auto"
              style={{ maxHeight: "calc(80vh - 200px)" }}
            >
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-xl text-gray-500">Your cart is empty</p>
                  <p className="text-gray-400">
                    Add some products to get started!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between border-b border-gray-200 pb-4"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{item.product.image}</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {item.product.name}
                          </h4>
                          <p className="text-gray-500">
                            ${item.product.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="bg-gray-300 hover:bg-gray-400 text-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-sm"
                          >
                            -
                          </button>

                          <span className="font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm"
                          >
                            +
                          </button>
                        </div>

                        <div className="text-right min-w-[4rem]">
                          <p className="font-semibold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-red-500 hover:text-red-600 ml-2"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-bold">
                    Total: ${total.toFixed(2)}
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    Clear Cart
                  </button>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md transition-colors"
                  >
                    Continue Shopping
                  </button>
                  <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Products grid
function ProductsGrid() {
  const itemCount = useCartStore((state) => state.itemCount);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <div className="text-lg text-gray-600">Cart: {itemCount} items</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sampleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

## 🎯 User Authentication Store

```tsx
// Authentication types
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (data: RegisterData) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => void;
  clearError: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email, password) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mock authentication
          if (email === "admin@example.com" && password === "admin") {
            const user: User = {
              id: "1",
              name: "Admin User",
              email: "admin@example.com",
              role: "admin",
              avatar: "👑",
            };
            set({ user, isAuthenticated: true, isLoading: false });
            return true;
          } else if (email === "user@example.com" && password === "user") {
            const user: User = {
              id: "2",
              name: "Regular User",
              email: "user@example.com",
              role: "user",
              avatar: "👤",
            };
            set({ user, isAuthenticated: true, isLoading: false });
            return true;
          } else {
            set({
              error: "Invalid email or password",
              isLoading: false,
            });
            return false;
          }
        } catch (error) {
          set({
            error: "Login failed. Please try again.",
            isLoading: false,
          });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      register: async (data) => {
        set({ isLoading: true, error: null });

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Mock registration
          const user: User = {
            id: Date.now().toString(),
            name: data.name,
            email: data.email,
            role: "user",
            avatar: "🆕",
          };

          set({ user, isAuthenticated: true, isLoading: false });
          return true;
        } catch (error) {
          set({
            error: "Registration failed. Please try again.",
            isLoading: false,
          });
          return false;
        }
      },

      updateProfile: (data) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...data },
          });
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Login form component
function LoginForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login, isLoading, error, clearError } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  React.useEffect(() => {
    return () => clearError();
  }, [clearError]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Sign In
      </h2>

      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-sm text-blue-700 mb-1">Demo Accounts:</p>
        <p className="text-xs text-blue-600">
          Admin: admin@example.com / admin
        </p>
        <p className="text-xs text-blue-600">User: user@example.com / user</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50"
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}

// User profile component
function UserProfile() {
  const { user, logout, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = React.useState(false);
  const [name, setName] = React.useState(user?.name || "");
  const [email, setEmail] = React.useState(user?.email || "");

  const handleSave = () => {
    updateProfile({ name, email });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setIsEditing(false);
  };

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-6">
        <div className="text-6xl mb-2">{user.avatar}</div>
        <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            user.role === "admin"
              ? "bg-purple-100 text-purple-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {user.role === "admin" ? "👑 Admin" : "👤 User"}
        </span>
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

          <div className="flex space-x-3">
            <button
              onClick={handleSave}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition-colors"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
            >
              Edit Profile
            </button>
            <button
              onClick={logout}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

## 🎯 Todo List with Advanced State Management

```tsx
// Todo types and store
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  category: string;
  priority: "low" | "medium" | "high";
}

interface TodoFilter {
  status: "all" | "active" | "completed";
  category: string;
  priority: string;
  search: string;
}

interface TodoState {
  todos: Todo[];
  filter: TodoFilter;

  // Actions
  addTodo: (text: string, category: string, priority: Todo["priority"]) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  setFilter: (filter: Partial<TodoFilter>) => void;
  clearCompleted: () => void;

  // Computed values
  filteredTodos: Todo[];
  stats: {
    total: number;
    active: number;
    completed: number;
  };
}

export const useTodoStore = create<TodoState>()(
  subscribeWithSelector(
    persist(
      (set, get) => ({
        todos: [],
        filter: {
          status: "all",
          category: "all",
          priority: "all",
          search: "",
        },

        addTodo: (text, category, priority) => {
          const newTodo: Todo = {
            id: Date.now().toString(),
            text: text.trim(),
            completed: false,
            createdAt: new Date(),
            category,
            priority,
          };

          set((state) => ({
            todos: [...state.todos, newTodo],
          }));
        },

        toggleTodo: (id) => {
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
          }));
        },

        deleteTodo: (id) => {
          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
          }));
        },

        editTodo: (id, text) => {
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === id ? { ...todo, text: text.trim() } : todo
            ),
          }));
        },

        setFilter: (newFilter) => {
          set((state) => ({
            filter: { ...state.filter, ...newFilter },
          }));
        },

        clearCompleted: () => {
          set((state) => ({
            todos: state.todos.filter((todo) => !todo.completed),
          }));
        },

        // Computed values
        get filteredTodos() {
          const { todos, filter } = get();

          return todos.filter((todo) => {
            // Status filter
            if (filter.status === "active" && todo.completed) return false;
            if (filter.status === "completed" && !todo.completed) return false;

            // Category filter
            if (filter.category !== "all" && todo.category !== filter.category)
              return false;

            // Priority filter
            if (filter.priority !== "all" && todo.priority !== filter.priority)
              return false;

            // Search filter
            if (
              filter.search &&
              !todo.text.toLowerCase().includes(filter.search.toLowerCase())
            ) {
              return false;
            }

            return true;
          });
        },

        get stats() {
          const { todos } = get();
          return {
            total: todos.length,
            active: todos.filter((todo) => !todo.completed).length,
            completed: todos.filter((todo) => todo.completed).length,
          };
        },
      }),
      {
        name: "todos-storage",
        partialize: (state) => ({ todos: state.todos }),
      }
    )
  )
);

// Todo form component
function TodoForm() {
  const [text, setText] = React.useState("");
  const [category, setCategory] = React.useState("personal");
  const [priority, setPriority] = React.useState<Todo["priority"]>("medium");
  const addTodo = useTodoStore((state) => state.addTodo);

  const categories = ["personal", "work", "shopping", "health", "learning"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text, category, priority);
      setText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Todo["priority"])}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
      >
        Add Todo
      </button>
    </form>
  );
}

// Todo filters component
function TodoFilters() {
  const { filter, setFilter, stats, clearCompleted } = useTodoStore();

  const categories = [
    "all",
    "personal",
    "work",
    "shopping",
    "health",
    "learning",
  ];
  const priorities = ["all", "low", "medium", "high"];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={filter.status}
            onChange={(e) =>
              setFilter({ status: e.target.value as TodoFilter["status"] })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All ({stats.total})</option>
            <option value="active">Active ({stats.active})</option>
            <option value="completed">Completed ({stats.completed})</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={filter.category}
            onChange={(e) => setFilter({ category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            value={filter.priority}
            onChange={(e) => setFilter({ priority: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            value={filter.search}
            onChange={(e) => setFilter({ search: e.target.value })}
            placeholder="Search todos..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Showing {stats.total} todos ({stats.active} active, {stats.completed}{" "}
          completed)
        </div>

        {stats.completed > 0 && (
          <button
            onClick={clearCompleted}
            className="text-red-500 hover:text-red-600 text-sm font-medium"
          >
            Clear Completed ({stats.completed})
          </button>
        )}
      </div>
    </div>
  );
}

// Todo item component
function TodoItem({ todo }: { todo: Todo }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);
  const { toggleTodo, deleteTodo, editTodo } = useTodoStore();

  const handleSave = () => {
    if (editText.trim()) {
      editTodo(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const priorityColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  const categoryEmojis = {
    personal: "👤",
    work: "💼",
    shopping: "🛒",
    health: "🏥",
    learning: "📚",
  };

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
        todo.completed ? "border-green-500 bg-gray-50" : "border-blue-500"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
          />

          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") handleCancel();
              }}
              className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          ) : (
            <span
              className={`flex-1 ${
                todo.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
              onDoubleClick={() => setIsEditing(true)}
            >
              {todo.text}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-lg">
            {categoryEmojis[todo.category as keyof typeof categoryEmojis] ||
              "📝"}
          </span>

          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              priorityColors[todo.priority]
            }`}
          >
            {todo.priority}
          </span>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-blue-500 hover:text-blue-600"
          >
            ✏️
          </button>

          <button
            onClick={() => deleteTodo(todo.id)}
            className="text-red-500 hover:text-red-600"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="mt-2 text-xs text-gray-500">
        Created: {todo.createdAt.toLocaleDateString()}
      </div>
    </div>
  );
}

// Todo list component
function TodoList() {
  const filteredTodos = useTodoStore((state) => state.filteredTodos);

  if (filteredTodos.length === 0) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-xl text-gray-500">No todos found</p>
        <p className="text-gray-400">Add a new todo or adjust your filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

// Complete Zustand app
export function ZustandApp() {
  const [activeTab, setActiveTab] = React.useState<
    "counter" | "shopping" | "auth" | "todos"
  >("counter");
  const { isAuthenticated } = useAuthStore();

  const tabs = [
    { id: "counter", label: "Counter", icon: "🔢" },
    { id: "shopping", label: "Shopping", icon: "🛒" },
    { id: "auth", label: "Auth", icon: "🔐" },
    { id: "todos", label: "Todos", icon: "📝" },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {activeTab === "counter" && (
          <div className="space-y-6">
            <CounterDisplay />
            <CounterStatus />
          </div>
        )}

        {activeTab === "shopping" && (
          <>
            <ProductsGrid />
            <ShoppingCart />
          </>
        )}

        {activeTab === "auth" && (
          <div className="max-w-md mx-auto">
            {isAuthenticated ? <UserProfile /> : <LoginForm />}
          </div>
        )}

        {activeTab === "todos" && (
          <div className="max-w-4xl mx-auto space-y-6">
            <TodoForm />
            <TodoFilters />
            <TodoList />
          </div>
        )}
      </div>
    </div>
  );
}
```

## 🎯 What You've Learned

### ✅ Zustand Fundamentals:

1. **Simple store creation** with TypeScript support
2. **State mutations** with set and get functions
3. **Computed values** and derived state
4. **Store persistence** with localStorage
5. **Multiple stores** for different concerns

### ✅ Advanced Patterns:

1. **Complex state management** with nested data structures
2. **Optimistic updates** for better UX
3. **Store composition** and modular architecture
4. **Middleware integration** for persistence and subscriptions
5. **Performance optimization** with selective subscriptions

## 🚀 What's Next?

In **Lesson 25: Build and Deploy**, we'll learn:

- Production builds and optimization
- Environment variables and configuration
- Deployment to various platforms
- CI/CD pipelines and automation

Your state management is now enterprise-level! 🏪

---

**💡 Pro Tip**: Zustand shines with its simplicity - no providers, no reducers, just stores! Keep your stores focused on specific domains and use multiple stores rather than one giant store for better maintainability!
