# Lesson 8: Lists and Keys 📝

## Welcome to Dynamic Data! 🔄

Imagine a website that can only show exactly 3 products, or a social media app that displays the same 5 posts forever. Pretty limiting, right? **Lists and keys** are what make your React apps handle dynamic, real-world data that changes and grows!

## 🤔 What are Lists and Keys?

**Lists** in React are collections of components rendered from arrays of data. **Keys** are special identifiers that help React efficiently update lists when data changes.

### Real-World Analogy:

Think of a **restaurant seating chart**:

- 🪑 **Tables** are your list items (components)
- 🔢 **Table numbers** are your keys (unique identifiers)
- 👥 **Customers** are your data
- 📝 **Host/Hostess** is React (managing who sits where)

When customers leave or new ones arrive, the host uses table numbers to efficiently manage seating without confusion!

## 🎯 Basic List Rendering

### 1. **Simple List from Array**

```tsx
import React from "react";

function FruitList() {
  const fruits = ["Apple", "Banana", "Orange", "Grape", "Strawberry"];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4 text-center">Fresh Fruits 🍎</h3>

      <ul className="space-y-2">
        {fruits.map((fruit, index) => (
          <li
            key={index} // Not ideal - we'll improve this!
            className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl mr-3">🍓</span>
            <span className="font-medium text-gray-800">{fruit}</span>
          </li>
        ))}
      </ul>

      <p className="text-center text-sm text-gray-500 mt-4">
        Total fruits: {fruits.length}
      </p>
    </div>
  );
}

export default FruitList;
```

### 2. **List with Object Data**

```tsx
import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

function ProductList() {
  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      category: "Electronics",
      inStock: true,
    },
    {
      id: 2,
      name: "Coffee Mug",
      price: 12.99,
      category: "Kitchen",
      inStock: true,
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 79.99,
      category: "Sports",
      inStock: false,
    },
    { id: 4, name: "Notebook", price: 5.99, category: "Office", inStock: true },
    {
      id: 5,
      name: "Smartphone",
      price: 599.99,
      category: "Electronics",
      inStock: true,
    },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Electronics":
        return "📱";
      case "Kitchen":
        return "🍽️";
      case "Sports":
        return "⚽";
      case "Office":
        return "📄";
      default:
        return "📦";
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center">Product Catalog</h3>

      <div className="grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <div
            key={product.id} // Perfect! Using unique ID
            className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
              product.inStock
                ? "border-green-200 bg-green-50 hover:border-green-300"
                : "border-red-200 bg-red-50 opacity-75"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {getCategoryIcon(product.category)}
                </span>
                <span className="text-xs px-2 py-1 bg-gray-200 rounded-full text-gray-600">
                  {product.category}
                </span>
              </div>
              <div
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  product.inStock
                    ? "bg-green-200 text-green-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </div>
            </div>

            <h4 className="font-semibold text-gray-800 mb-1">{product.name}</h4>
            <p className="text-2xl font-bold text-blue-600">${product.price}</p>

            <button
              disabled={!product.inStock}
              className={`mt-3 w-full py-2 px-4 rounded font-medium transition-colors ${
                product.inStock
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {product.inStock ? "Add to Cart" : "Unavailable"}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Showing {products.length} products</p>
        <p>{products.filter((p) => p.inStock).length} in stock</p>
      </div>
    </div>
  );
}

export default ProductList;
```

## 🔑 Understanding Keys

### Why Keys Matter:

```tsx
// ❌ BAD: Using array index as key
{
  items.map((item, index) => <div key={index}>{item.name}</div>);
}

// ✅ GOOD: Using unique, stable ID as key
{
  items.map((item) => <div key={item.id}>{item.name}</div>);
}

// ✅ GOOD: Creating unique key from item properties
{
  items.map((item) => (
    <div key={`${item.category}-${item.name}`}>{item.name}</div>
  ));
}
```

### Key Rules:

1. **Must be unique** among siblings
2. **Should be stable** (don't change between renders)
3. **Avoid using array index** unless list never changes
4. **Use actual data** when possible (ID, email, etc.)

## 🎮 Let's Build: Interactive Todo List

```tsx
import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: string;
  createdAt: Date;
}

function InteractiveTodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      text: "Learn React Lists and Keys",
      completed: false,
      priority: "high",
      category: "Learning",
      createdAt: new Date("2024-01-01"),
    },
    {
      id: 2,
      text: "Build a todo app",
      completed: false,
      priority: "medium",
      category: "Project",
      createdAt: new Date("2024-01-02"),
    },
    {
      id: 3,
      text: "Practice TypeScript",
      completed: true,
      priority: "low",
      category: "Learning",
      createdAt: new Date("2024-01-03"),
    },
  ]);

  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [sortBy, setSortBy] = useState<"created" | "priority" | "alphabetical">(
    "created"
  );

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now(), // Simple ID generation
        text: newTodo.trim(),
        completed: false,
        priority: "medium",
        category: "General",
        createdAt: new Date(),
      };
      setTodos([...todos, todo]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updatePriority = (id: number, priority: "low" | "medium" | "high") => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, priority } : todo))
    );
  };

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  // Sort todos
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch (sortBy) {
      case "priority":
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case "alphabetical":
        return a.text.localeCompare(b.text);
      case "created":
      default:
        return b.createdAt.getTime() - a.createdAt.getTime();
    }
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "low":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center">
        Interactive Todo List
      </h3>

      {/* Add New Todo */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Filters and Sorting */}
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex gap-2">
          <span className="text-sm font-medium text-gray-700">Filter:</span>
          {(["all", "active", "completed"] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                filter === filterOption
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex gap-2 items-center">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="created">Date Created</option>
            <option value="priority">Priority</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Todo Stats */}
      <div className="mb-4 text-center text-sm text-gray-600">
        <p>
          {sortedTodos.length} of {todos.length} todos shown •{" "}
          {todos.filter((t) => !t.completed).length} active •{" "}
          {todos.filter((t) => t.completed).length} completed
        </p>
      </div>

      {/* Todo List */}
      {sortedTodos.length > 0 ? (
        <div className="space-y-3">
          {sortedTodos.map((todo) => (
            <div
              key={todo.id} // Perfect key usage!
              className={`p-4 border-2 rounded-lg transition-all ${
                todo.completed
                  ? "bg-gray-50 border-gray-200 opacity-75"
                  : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-sm"
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox */}
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    todo.completed
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-300 hover:border-blue-400"
                  }`}
                >
                  {todo.completed && <span className="text-xs">✓</span>}
                </button>

                {/* Todo Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`font-medium ${
                        todo.completed
                          ? "line-through text-gray-500"
                          : "text-gray-800"
                      }`}
                    >
                      {todo.text}
                    </span>

                    {/* Priority Badge */}
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded border ${getPriorityColor(
                        todo.priority
                      )}`}
                    >
                      {todo.priority}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{todo.category}</span>
                    <span>{todo.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {/* Priority Selector */}
                  <select
                    value={todo.priority}
                    onChange={(e) =>
                      updatePriority(todo.id, e.target.value as any)
                    }
                    className="text-xs px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    disabled={todo.completed}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-700 font-bold text-lg"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">
            {filter === "completed" ? "🎉" : "📝"}
          </div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            {filter === "completed" ? "No completed todos!" : "No todos yet!"}
          </h4>
          <p className="text-gray-500">
            {filter === "completed"
              ? "Complete some todos to see them here."
              : "Add your first todo to get started."}
          </p>
        </div>
      )}
    </div>
  );
}

export default InteractiveTodoList;
```

## 🎯 Advanced List Patterns

### 1. **Nested Lists**

```tsx
import React, { useState } from "react";

interface Category {
  id: number;
  name: string;
  items: Item[];
}

interface Item {
  id: number;
  name: string;
  description: string;
}

function NestedList() {
  const [categories] = useState<Category[]>([
    {
      id: 1,
      name: "Fruits",
      items: [
        { id: 101, name: "Apple", description: "Sweet red apple" },
        { id: 102, name: "Banana", description: "Yellow tropical fruit" },
        { id: 103, name: "Orange", description: "Citrus fruit" },
      ],
    },
    {
      id: 2,
      name: "Vegetables",
      items: [
        { id: 201, name: "Carrot", description: "Orange root vegetable" },
        { id: 202, name: "Lettuce", description: "Green leafy vegetable" },
      ],
    },
  ]);

  const [expandedCategories, setExpandedCategories] = useState<number[]>([1]);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Food Categories</h3>

      {categories.map((category) => (
        <div
          key={category.id}
          className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
        >
          {/* Category Header */}
          <button
            onClick={() => toggleCategory(category.id)}
            className="w-full p-4 bg-gray-50 hover:bg-gray-100 text-left flex items-center justify-between transition-colors"
          >
            <span className="font-semibold">{category.name}</span>
            <span
              className={`transform transition-transform ${
                expandedCategories.includes(category.id) ? "rotate-90" : ""
              }`}
            >
              ▶
            </span>
          </button>

          {/* Category Items */}
          {expandedCategories.includes(category.id) && (
            <div className="border-t border-gray-200">
              {category.items.map((item) => (
                <div
                  key={item.id} // Unique across all items
                  className="p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                >
                  <h4 className="font-medium text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default NestedList;
```

### 2. **Dynamic List with Search and Pagination**

```tsx
import React, { useState, useMemo } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  joinDate: string;
}

function UserDirectory() {
  const [users] = useState<User[]>([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@company.com",
      role: "Developer",
      department: "Engineering",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@company.com",
      role: "Designer",
      department: "Design",
      joinDate: "2023-02-20",
    },
    {
      id: 3,
      name: "Carol Wilson",
      email: "carol@company.com",
      role: "Manager",
      department: "Engineering",
      joinDate: "2022-11-10",
    },
    {
      id: 4,
      name: "David Brown",
      email: "david@company.com",
      role: "Developer",
      department: "Engineering",
      joinDate: "2023-03-05",
    },
    {
      id: 5,
      name: "Eva Davis",
      email: "eva@company.com",
      role: "Designer",
      department: "Design",
      joinDate: "2023-01-30",
    },
    {
      id: 6,
      name: "Frank Miller",
      email: "frank@company.com",
      role: "Developer",
      department: "Engineering",
      joinDate: "2022-12-15",
    },
    {
      id: 7,
      name: "Grace Lee",
      email: "grace@company.com",
      role: "Manager",
      department: "Design",
      joinDate: "2022-10-20",
    },
    {
      id: 8,
      name: "Henry Taylor",
      email: "henry@company.com",
      role: "Developer",
      department: "Engineering",
      joinDate: "2023-02-10",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Filter and search users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        departmentFilter === "all" || user.department === departmentFilter;

      return matchesSearch && matchesDepartment;
    });
  }, [users, searchTerm, departmentFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, departmentFilter]);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "Developer":
        return "👨‍💻";
      case "Designer":
        return "🎨";
      case "Manager":
        return "👔";
      default:
        return "👤";
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center">User Directory</h3>

      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search users..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
        </select>
      </div>

      {/* Results Info */}
      <div className="mb-4 text-center text-sm text-gray-600">
        Showing {paginatedUsers.length} of {filteredUsers.length} users
        {searchTerm && ` matching "${searchTerm}"`}
        {departmentFilter !== "all" && ` in ${departmentFilter}`}
      </div>

      {/* User List */}
      {paginatedUsers.length > 0 ? (
        <div className="space-y-4 mb-6">
          {paginatedUsers.map((user) => (
            <div
              key={user.id} // Unique ID key
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{getRoleIcon(user.role)}</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{user.name}</h4>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {user.role}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">
                        {user.department}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>Joined:</p>
                  <p>{new Date(user.joinDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">🔍</div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">
            No users found
          </h4>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page
                  ? "bg-blue-500 text-white border-blue-500"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default UserDirectory;
```

## 🎯 Key Best Practices

### ✅ Do's:

- **Use unique, stable keys** (IDs, emails, combinations)
- **Filter and sort using useMemo** for performance
- **Keep list items simple** and focused
- **Handle empty states** gracefully
- **Use TypeScript interfaces** for list data

### ❌ Don'ts:

- **Don't use array index as key** for dynamic lists
- **Don't forget keys** completely
- **Don't mutate arrays directly** (use spread operator)
- **Don't render huge lists** without virtualization
- **Don't put complex logic** in render loops

## 🎯 What You've Learned

### ✅ Core List Concepts:

1. **Array.map()** for rendering lists
2. **Keys** for efficient React updates
3. **Filtering and sorting** dynamic data
4. **Nested lists** and complex structures
5. **Pagination** for large datasets

### ✅ Practical Skills:

1. **Interactive todo lists** with CRUD operations
2. **Search and filter** functionality
3. **Nested navigation** menus
4. **User directories** with pagination
5. **Performance optimization** with useMemo

## 🚀 What's Next?

In **Lesson 9: Forms and Inputs**, we'll learn how to:

- Handle user input with controlled components
- Validate form data with TypeScript
- Build complex forms with multiple fields
- Manage form state effectively

You've mastered dynamic data rendering! Lists and keys are fundamental to building data-driven applications! 🎉

---

**💡 Remember**: Keys are React's way of tracking list items efficiently. Always use unique, stable identifiers - your app's performance depends on it!
