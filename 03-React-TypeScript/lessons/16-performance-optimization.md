# Lesson 16: Performance Optimization ⚡

## Welcome to React Performance! 🚀

Your React app feeling sluggish? Time to optimize! **Performance optimization** is like tuning a race car - small tweaks can make huge differences. Let's turn your app into a speed demon!

## 🎯 React.memo - Component Memoization

```tsx
import React, { useState, memo } from "react";

// Expensive component that should only re-render when props change
interface UserCardProps {
  user: {
    id: number;
    name: string;
    email: string;
    lastActive: Date;
  };
  onDelete: (id: number) => void;
}

// Without memo - re-renders every time parent re-renders
function RegularUserCard({ user, onDelete }: UserCardProps) {
  console.log(`🔄 RegularUserCard rendered for ${user.name}`);

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="font-semibold">{user.name}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="text-xs text-gray-500">
        Last active: {user.lastActive.toLocaleDateString()}
      </p>
      <button
        onClick={() => onDelete(user.id)}
        className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
}

// With memo - only re-renders when props actually change
const OptimizedUserCard = memo(function OptimizedUserCard({
  user,
  onDelete,
}: UserCardProps) {
  console.log(`⚡ OptimizedUserCard rendered for ${user.name}`);

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="font-semibold">{user.name}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
      <p className="text-xs text-gray-500">
        Last active: {user.lastActive.toLocaleDateString()}
      </p>
      <button
        onClick={() => onDelete(user.id)}
        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
      >
        Delete
      </button>
    </div>
  );
});

// Custom comparison function for memo
const UserCardWithCustomComparison = memo(
  function UserCardWithCustomComparison({ user, onDelete }: UserCardProps) {
    console.log(`🎯 CustomUserCard rendered for ${user.name}`);

    return (
      <div className="p-4 border rounded-lg bg-white shadow-sm">
        <h3 className="font-semibold">{user.name}</h3>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-xs text-gray-500">
          Last active: {user.lastActive.toLocaleDateString()}
        </p>
        <button
          onClick={() => onDelete(user.id)}
          className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
        >
          Delete
        </button>
      </div>
    );
  },
  // Custom comparison - only re-render if user data actually changed
  (prevProps, nextProps) => {
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.user.name === nextProps.user.name &&
      prevProps.user.email === nextProps.user.email &&
      prevProps.user.lastActive.getTime() ===
        nextProps.user.lastActive.getTime()
    );
  }
);

function MemoDemo() {
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      lastActive: new Date("2024-01-15"),
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      lastActive: new Date("2024-01-16"),
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      lastActive: new Date("2024-01-17"),
    },
  ]);

  const [counter, setCounter] = useState(0);
  const [selectedTab, setSelectedTab] = useState<
    "regular" | "optimized" | "custom"
  >("regular");

  // This function is recreated on every render - causing unnecessary re-renders
  const handleDeleteBad = (id: number) => {
    console.log(`Delete user ${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">React.memo Demo</h2>

      {/* Force re-renders to demonstrate memo */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="mb-2">Counter: {counter} (forces parent re-render)</p>
        <button
          onClick={() => setCounter((c) => c + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Increment Counter
        </button>
      </div>

      {/* Tab selection */}
      <div className="mb-6">
        <div className="flex gap-2">
          {["regular", "optimized", "custom"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab as any)}
              className={`px-4 py-2 rounded ${
                selectedTab === tab
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Components
            </button>
          ))}
        </div>
      </div>

      {/* Check console to see render logs */}
      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
        <p className="text-sm text-yellow-800">
          📝 <strong>Check the console</strong> to see which components
          re-render when you increment the counter!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map((user) => {
          if (selectedTab === "regular") {
            return (
              <RegularUserCard
                key={user.id}
                user={user}
                onDelete={handleDeleteBad}
              />
            );
          } else if (selectedTab === "optimized") {
            return (
              <OptimizedUserCard
                key={user.id}
                user={user}
                onDelete={handleDeleteBad}
              />
            );
          } else {
            return (
              <UserCardWithCustomComparison
                key={user.id}
                user={user}
                onDelete={handleDeleteBad}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export default MemoDemo;
```

## 🎯 useCallback - Memoizing Functions

```tsx
import React, { useState, useCallback, memo } from "react";

interface TodoItemProps {
  todo: {
    id: number;
    text: string;
    completed: boolean;
  };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem = memo(function TodoItem({
  todo,
  onToggle,
  onDelete,
}: TodoItemProps) {
  console.log(`🔄 TodoItem rendered: ${todo.text}`);

  return (
    <div
      className={`p-3 border rounded-lg flex items-center justify-between ${
        todo.completed ? "bg-green-50 border-green-200" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-4 h-4"
        />
        <span className={todo.completed ? "line-through text-gray-500" : ""}>
          {todo.text}
        </span>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
});

function UseCallbackDemo() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Learn TypeScript", completed: true },
    { id: 3, text: "Build an app", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // ❌ BAD: Function recreated on every render
  const handleToggleBad = (id: number) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // ❌ BAD: Function recreated on every render
  const handleDeleteBad = (id: number) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  // ✅ GOOD: Function memoized with useCallback
  const handleToggle = useCallback((id: number) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []); // Empty dependencies - function never changes

  // ✅ GOOD: Function memoized with useCallback
  const handleDelete = useCallback((id: number) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []); // Empty dependencies - function never changes

  const addTodo = useCallback(() => {
    if (newTodo.trim()) {
      setTodos((todos) => [
        ...todos,
        { id: Date.now(), text: newTodo.trim(), completed: false },
      ]);
      setNewTodo("");
    }
  }, [newTodo]); // Depends on newTodo

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">useCallback Demo</h2>

      {/* Add new todo */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded"
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="mb-4 flex gap-2">
        {(["all", "active", "completed"] as const).map((filterOption) => (
          <button
            key={filterOption}
            onClick={() => setFilter(filterOption)}
            className={`px-3 py-1 rounded text-sm ${
              filter === filterOption
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
          </button>
        ))}
      </div>

      {/* Info about performance */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm text-blue-800">
          📝 <strong>Check the console</strong> to see how useCallback prevents
          unnecessary re-renders!
        </p>
      </div>

      {/* Todo list */}
      <div className="space-y-2">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle} // Memoized function
            onDelete={handleDelete} // Memoized function
          />
        ))}
      </div>

      {filteredTodos.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No {filter === "all" ? "" : filter} todos found
        </div>
      )}
    </div>
  );
}

export { UseCallbackDemo };
```

## 🎯 useMemo - Memoizing Expensive Calculations

```tsx
import React, { useState, useMemo, useCallback } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  rating: number;
  description: string;
}

function UseMemoDemo() {
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Laptop Pro",
      price: 1299,
      category: "Electronics",
      rating: 4.5,
      description: "High-performance laptop for professionals",
    },
    {
      id: 2,
      name: "Wireless Mouse",
      price: 29,
      category: "Electronics",
      rating: 4.2,
      description: "Ergonomic wireless mouse",
    },
    {
      id: 3,
      name: "Coffee Mug",
      price: 15,
      category: "Kitchen",
      rating: 4.8,
      description: "Ceramic coffee mug with handle",
    },
    {
      id: 4,
      name: "Running Shoes",
      price: 89,
      category: "Sports",
      rating: 4.3,
      description: "Comfortable running shoes",
    },
    {
      id: 5,
      name: "Desk Lamp",
      price: 45,
      category: "Furniture",
      rating: 4.1,
      description: "Adjustable LED desk lamp",
    },
    {
      id: 6,
      name: "Smartphone",
      price: 699,
      category: "Electronics",
      rating: 4.6,
      description: "Latest smartphone with great camera",
    },
    {
      id: 7,
      name: "Water Bottle",
      price: 12,
      category: "Sports",
      rating: 4.4,
      description: "Insulated water bottle",
    },
    {
      id: 8,
      name: "Bluetooth Speaker",
      price: 79,
      category: "Electronics",
      rating: 4.7,
      description: "Portable bluetooth speaker",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState<"name" | "price" | "rating">("name");
  const [counter, setCounter] = useState(0);

  // ❌ BAD: Expensive calculation runs on every render
  const expensiveCalculationBad = () => {
    console.log("🐌 Running expensive calculation (BAD)...");
    // Simulate expensive operation
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
      sum += Math.random();
    }
    return products.reduce((acc, product) => acc + product.price, 0);
  };

  // ✅ GOOD: Expensive calculation memoized with useMemo
  const totalValue = useMemo(() => {
    console.log("⚡ Running expensive calculation (GOOD)...");
    // Simulate expensive operation
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
      sum += Math.random();
    }
    return products.reduce((acc, product) => acc + product.price, 0);
  }, [products]); // Only recalculate when products change

  // ✅ GOOD: Filter and sort logic memoized
  const filteredAndSortedProducts = useMemo(() => {
    console.log("🔄 Filtering and sorting products...");

    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.price - b.price;
        case "rating":
          return b.rating - a.rating; // Highest first
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [products, searchTerm, categoryFilter, sortBy]);

  // ✅ GOOD: Categories list memoized
  const categories = useMemo(() => {
    console.log("📂 Calculating categories...");
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    return ["All", ...uniqueCategories];
  }, [products]);

  // ✅ GOOD: Statistics memoized
  const statistics = useMemo(() => {
    console.log("📊 Calculating statistics...");
    return {
      totalProducts: filteredAndSortedProducts.length,
      averagePrice:
        filteredAndSortedProducts.length > 0
          ? (
              filteredAndSortedProducts.reduce((sum, p) => sum + p.price, 0) /
              filteredAndSortedProducts.length
            ).toFixed(2)
          : "0",
      averageRating:
        filteredAndSortedProducts.length > 0
          ? (
              filteredAndSortedProducts.reduce((sum, p) => sum + p.rating, 0) /
              filteredAndSortedProducts.length
            ).toFixed(1)
          : "0",
    };
  }, [filteredAndSortedProducts]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">useMemo Demo</h2>

      {/* Force re-renders to demonstrate memoization */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="mb-2">Counter: {counter} (forces re-render)</p>
        <button
          onClick={() => setCounter((c) => c + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Force Re-render
        </button>
      </div>

      {/* Controls */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Search</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "name" | "price" | "rating")
            }
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800">Total Value</h3>
          <p className="text-2xl font-bold text-blue-600">${totalValue}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold text-green-800">Products</h3>
          <p className="text-2xl font-bold text-green-600">
            {statistics.totalProducts}
          </p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold text-yellow-800">Avg Price</h3>
          <p className="text-2xl font-bold text-yellow-600">
            ${statistics.averagePrice}
          </p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="font-semibold text-purple-800">Avg Rating</h3>
          <p className="text-2xl font-bold text-purple-600">
            {statistics.averageRating}⭐
          </p>
        </div>
      </div>

      {/* Info about performance */}
      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
        <p className="text-sm text-green-800">
          📝 <strong>Check the console</strong> to see how useMemo prevents
          expensive recalculations!
        </p>
      </div>

      {/* Product list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedProducts.map((product) => (
          <div
            key={product.id}
            className="p-4 border rounded-lg bg-white shadow-sm"
          >
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-blue-600">
                ${product.price}
              </span>
              <span className="text-sm text-yellow-600">
                {product.rating}⭐
              </span>
            </div>
            <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {product.category}
            </span>
          </div>
        ))}
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No products found matching your criteria
        </div>
      )}
    </div>
  );
}

export { UseMemoDemo };
```

## 🎯 Performance Best Practices

```tsx
import React, { useState, useCallback, useMemo, memo } from "react";

// ✅ GOOD: Lightweight components that benefit from memo
const StatCard = memo(function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}) {
  return (
    <div className={`p-4 rounded-lg ${color}`}>
      <div className="flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
});

// ❌ DON'T memo heavy components with complex logic
const HeavyComponent = function HeavyComponent({ data }: { data: any[] }) {
  // Lots of complex rendering logic here
  return <div>Heavy component with {data.length} items</div>;
};

function PerformanceBestPractices() {
  const [users, setUsers] = useState([
    { id: 1, name: "John", active: true },
    { id: 2, name: "Jane", active: false },
    { id: 3, name: "Bob", active: true },
  ]);

  // ✅ GOOD: useCallback for event handlers passed to children
  const handleUserToggle = useCallback((id: number) => {
    setUsers((users) =>
      users.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  }, []);

  // ✅ GOOD: useMemo for expensive calculations
  const userStats = useMemo(
    () => ({
      total: users.length,
      active: users.filter((u) => u.active).length,
      inactive: users.filter((u) => !u.active).length,
    }),
    [users]
  );

  // ❌ DON'T memoize cheap calculations
  const simpleCount = users.length; // Just use directly

  // ❌ DON'T memoize with all dependencies
  const badMemo = useMemo(() => {
    return users.map((u) => u.name);
  }, [users, handleUserToggle, userStats]); // Too many dependencies!

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Performance Best Practices</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Total Users"
          value={userStats.total}
          icon="👥"
          color="bg-blue-50"
        />
        <StatCard
          title="Active Users"
          value={userStats.active}
          icon="✅"
          color="bg-green-50"
        />
        <StatCard
          title="Inactive Users"
          value={userStats.inactive}
          icon="❌"
          color="bg-red-50"
        />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-yellow-800 mb-2">
          🎯 Performance Tips
        </h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• Use React.memo for components that receive stable props</li>
          <li>• Use useCallback for functions passed to memoized children</li>
          <li>• Use useMemo for expensive calculations</li>
          <li>• Don't optimize everything - measure first!</li>
          <li>• Avoid inline objects and functions in render</li>
          <li>• Use keys properly for list items</li>
          <li>• Consider code splitting for large components</li>
        </ul>
      </div>

      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between p-3 border rounded"
          >
            <span className={user.active ? "text-green-600" : "text-gray-500"}>
              {user.name} ({user.active ? "Active" : "Inactive"})
            </span>
            <button
              onClick={() => handleUserToggle(user.id)}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Toggle
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export { PerformanceBestPractices };
```

## 🎯 What You've Learned

### ✅ Performance Optimization Tools:

1. **React.memo** for preventing unnecessary re-renders
2. **useCallback** for memoizing functions
3. **useMemo** for memoizing expensive calculations
4. **Custom comparison** functions for fine-tuned optimization
5. **Best practices** for when to optimize

### ✅ Key Principles:

1. **Measure first** - don't optimize prematurely
2. **Profile your app** to find real bottlenecks
3. **Optimize strategically** - not everything needs optimization
4. **Stable references** prevent cascade re-renders
5. **Dependencies matter** in memoization

## 🚀 What's Next?

In **Lesson 17: Refs and DOM Access**, we'll learn:

- useRef for DOM manipulation
- Forwarding refs to child components
- Imperative APIs and focus management
- Integration with third-party libraries

Your React apps are now optimized for performance! ⚡

---

**💡 Pro Tip**: Performance optimization is like seasoning - a little goes a long way. Over-optimization can make your code complex without meaningful benefits!
