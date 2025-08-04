# Lesson 7: Conditional Rendering 🎭

## Welcome to Dynamic UIs! ✨

Imagine a website that always shows the same content - no loading messages, no different views for logged-in users, no error handling. Pretty static, right? **Conditional rendering** is what makes your React apps smart and responsive to different situations!

## 🤔 What is Conditional Rendering?

**Conditional rendering** means showing different content based on certain conditions. It's like having multiple versions of your webpage that appear depending on the situation.

### Real-World Analogy:

Think of a **restaurant menu**:

- 🌅 **Breakfast menu** (if it's before 11 AM)
- 🍽️ **Lunch menu** (if it's 11 AM - 5 PM)
- 🌙 **Dinner menu** (if it's after 5 PM)
- ❌ **"Kitchen Closed"** (if it's very late)

The same restaurant shows different menus based on the time!

## 🎯 Basic Conditional Rendering

### 1. **If/Else with Early Return**

```tsx
import React, { useState } from "react";

interface User {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

function WelcomeMessage({ user }: { user: User | null }) {
  // Early return for different conditions
  if (!user) {
    return (
      <div className="p-6 bg-gray-100 rounded-lg shadow-md max-w-md mx-auto">
        <div className="text-center">
          <div className="text-4xl mb-3">👋</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Welcome, Visitor!
          </h2>
          <p className="text-gray-600 mb-4">
            Please log in to access your account
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
            Log In
          </button>
        </div>
      </div>
    );
  }

  if (!user.isLoggedIn) {
    return (
      <div className="p-6 bg-yellow-100 border border-yellow-300 rounded-lg shadow-md max-w-md mx-auto">
        <div className="text-center">
          <div className="text-4xl mb-3">🔐</div>
          <h2 className="text-xl font-bold text-yellow-800 mb-2">
            Account Not Verified
          </h2>
          <p className="text-yellow-700 mb-4">
            Please check your email to verify your account
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors">
            Resend Email
          </button>
        </div>
      </div>
    );
  }

  // Default return for logged-in user
  return (
    <div className="p-6 bg-green-100 border border-green-300 rounded-lg shadow-md max-w-md mx-auto">
      <div className="text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h2 className="text-xl font-bold text-green-800 mb-2">
          Welcome back, {user.name}!
        </h2>
        <p className="text-green-700 mb-4">You're successfully logged in</p>
        <p className="text-sm text-green-600">{user.email}</p>
      </div>
    </div>
  );
}

export default WelcomeMessage;
```

### 2. **Inline Conditional (Ternary) Operator**

```tsx
import React, { useState } from "react";

function ToggleContent() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-4">Product Information</h3>

        <div className="mb-4">
          <img
            src="https://via.placeholder.com/200x150/3B82F6/FFFFFF?text=Product"
            alt="Product"
            className="mx-auto rounded-lg shadow-sm"
          />
        </div>

        <h4 className="text-lg font-semibold mb-2">Amazing Product</h4>
        <p className="text-gray-600 mb-4">$99.99</p>

        {/* Conditional rendering with ternary operator */}
        {showDetails ? (
          <div className="bg-gray-50 p-4 rounded-lg mb-4 text-left">
            <h5 className="font-semibold mb-2">Product Details:</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• High-quality materials</li>
              <li>• 2-year warranty</li>
              <li>• Free shipping</li>
              <li>• 30-day return policy</li>
              <li>• Available in 5 colors</li>
            </ul>
          </div>
        ) : (
          <p className="text-gray-500 text-sm mb-4">
            Click below to see product details
          </p>
        )}

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
      </div>
    </div>
  );
}

export default ToggleContent;
```

### 3. **Logical AND (&&) Operator**

```tsx
import React, { useState } from "react";

function NotificationSystem() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Welcome to our app!", type: "info" },
    { id: 2, message: "Your profile has been updated", type: "success" },
    { id: 3, message: "Payment method expires soon", type: "warning" },
  ]);

  const [showNotifications, setShowNotifications] = useState(true);

  const removeNotification = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 border-green-300 text-green-800";
      case "warning":
        return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "error":
        return "bg-red-100 border-red-300 text-red-800";
      default:
        return "bg-blue-100 border-blue-300 text-blue-800";
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Notifications</h3>
        <div className="flex items-center gap-2">
          {/* Show notification count if there are notifications */}
          {notifications.length > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {notifications.length}
            </span>
          )}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-gray-500 hover:text-gray-700"
          >
            {showNotifications ? "🔔" : "🔕"}
          </button>
        </div>
      </div>

      {/* Show notifications only if showNotifications is true AND there are notifications */}
      {showNotifications && notifications.length > 0 && (
        <div className="space-y-3 mb-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 border rounded-lg flex items-center justify-between ${getNotificationStyle(
                notification.type
              )}`}
            >
              <span className="text-sm">{notification.message}</span>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-gray-500 hover:text-gray-700 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Show message when no notifications */}
      {notifications.length === 0 && (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">🎉</div>
          <p className="text-gray-500">No notifications!</p>
          <p className="text-sm text-gray-400">You're all caught up</p>
        </div>
      )}

      {/* Show message when notifications are hidden */}
      {!showNotifications && notifications.length > 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500">Notifications are hidden</p>
          <button
            onClick={() => setShowNotifications(true)}
            className="text-blue-500 hover:text-blue-600 text-sm underline"
          >
            Show them
          </button>
        </div>
      )}
    </div>
  );
}

export default NotificationSystem;
```

## 🎯 Advanced Conditional Patterns

### 1. **Switch Statement for Multiple Conditions**

```tsx
import React, { useState } from "react";

type LoadingState = "idle" | "loading" | "success" | "error";

function DataFetcher() {
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [data, setData] = useState<string | null>(null);

  const fetchData = async () => {
    setLoadingState("loading");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate random success/failure
      if (Math.random() > 0.3) {
        setData("Here is your fetched data! 🎉");
        setLoadingState("success");
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      setLoadingState("error");
    }
  };

  const reset = () => {
    setLoadingState("idle");
    setData(null);
  };

  // Switch statement for different UI states
  const renderContent = () => {
    switch (loadingState) {
      case "idle":
        return (
          <div className="text-center">
            <div className="text-4xl mb-4">📡</div>
            <h3 className="text-lg font-semibold mb-2">Ready to fetch data</h3>
            <p className="text-gray-600 mb-4">
              Click the button to start loading
            </p>
            <button
              onClick={fetchData}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Fetch Data
            </button>
          </div>
        );

      case "loading":
        return (
          <div className="text-center">
            <div className="text-4xl mb-4 animate-spin">⏳</div>
            <h3 className="text-lg font-semibold mb-2">Loading...</h3>
            <p className="text-gray-600">
              Please wait while we fetch your data
            </p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full animate-pulse"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
          </div>
        );

      case "success":
        return (
          <div className="text-center">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-lg font-semibold mb-2 text-green-800">
              Success!
            </h3>
            <p className="text-gray-600 mb-4">{data}</p>
            <button
              onClick={reset}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Try Again
            </button>
          </div>
        );

      case "error":
        return (
          <div className="text-center">
            <div className="text-4xl mb-4">❌</div>
            <h3 className="text-lg font-semibold mb-2 text-red-800">Error!</h3>
            <p className="text-red-600 mb-4">
              Failed to fetch data. Please try again.
            </p>
            <div className="space-x-2">
              <button
                onClick={fetchData}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Retry
              </button>
              <button
                onClick={reset}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {renderContent()}
    </div>
  );
}

export default DataFetcher;
```

### 2. **Conditional Lists and Filtering**

```tsx
import React, { useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: "work" | "personal" | "shopping";
}

function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete React lesson",
      completed: false,
      priority: "high",
      category: "work",
    },
    {
      id: 2,
      title: "Buy groceries",
      completed: true,
      priority: "medium",
      category: "shopping",
    },
    {
      id: 3,
      title: "Call mom",
      completed: false,
      priority: "low",
      category: "personal",
    },
    {
      id: 4,
      title: "Prepare presentation",
      completed: false,
      priority: "high",
      category: "work",
    },
    {
      id: 5,
      title: "Exercise",
      completed: true,
      priority: "medium",
      category: "personal",
    },
  ]);

  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [categoryFilter, setCategoryFilter] = useState<
    "all" | "work" | "personal" | "shopping"
  >("all");

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filter tasks based on completion and category
  const filteredTasks = tasks.filter((task) => {
    const matchesCompletion =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    const matchesCategory =
      categoryFilter === "all" || task.category === categoryFilter;

    return matchesCompletion && matchesCategory;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100";
      case "medium":
        return "text-yellow-600 bg-yellow-100";
      case "low":
        return "text-green-600 bg-green-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "work":
        return "💼";
      case "personal":
        return "👤";
      case "shopping":
        return "🛒";
      default:
        return "📝";
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center">Task Manager</h3>

      {/* Filters */}
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by completion:
          </label>
          <div className="flex gap-2">
            {(["all", "completed", "pending"] as const).map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  filter === filterOption
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by category:
          </label>
          <div className="flex gap-2">
            {(["all", "work", "personal", "shopping"] as const).map(
              (categoryOption) => (
                <button
                  key={categoryOption}
                  onClick={() => setCategoryFilter(categoryOption)}
                  className={`px-4 py-2 rounded-md font-medium transition-colors ${
                    categoryFilter === categoryOption
                      ? "bg-purple-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {categoryOption === "all"
                    ? "All"
                    : getCategoryIcon(categoryOption)}{" "}
                  {categoryOption.charAt(0).toUpperCase() +
                    categoryOption.slice(1)}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Task Count */}
      <div className="mb-4 text-center">
        <p className="text-gray-600">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </p>
      </div>

      {/* Tasks List */}
      {filteredTasks.length > 0 ? (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 border rounded-lg transition-all cursor-pointer hover:shadow-md ${
                task.completed
                  ? "bg-gray-50 border-gray-300"
                  : "bg-white border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => toggleTask(task.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      task.completed
                        ? "bg-green-500 border-green-500"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    {task.completed && (
                      <span className="text-white text-xs">✓</span>
                    )}
                  </div>

                  <span
                    className={`font-medium ${
                      task.completed
                        ? "line-through text-gray-500"
                        : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {getCategoryIcon(task.category)}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Empty state
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h4 className="text-xl font-semibold text-gray-700 mb-2">
            No tasks found
          </h4>
          <p className="text-gray-500">
            {filter === "all" && categoryFilter === "all"
              ? "You don't have any tasks yet!"
              : "No tasks match your current filters."}
          </p>
        </div>
      )}
    </div>
  );
}

export default TaskManager;
```

## 🎮 Let's Build: Dynamic Weather Dashboard

```tsx
import React, { useState } from "react";

interface WeatherData {
  city: string;
  temperature: number;
  condition: "sunny" | "cloudy" | "rainy" | "snowy";
  humidity: number;
  windSpeed: number;
}

function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState("");

  const weatherConditions = {
    sunny: { icon: "☀️", color: "text-yellow-600", bg: "bg-yellow-100" },
    cloudy: { icon: "☁️", color: "text-gray-600", bg: "bg-gray-100" },
    rainy: { icon: "🌧️", color: "text-blue-600", bg: "bg-blue-100" },
    snowy: { icon: "❄️", color: "text-blue-400", bg: "bg-blue-50" },
  };

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate different responses
      if (city.toLowerCase() === "error") {
        throw new Error("City not found");
      }

      // Generate mock weather data
      const conditions: ("sunny" | "cloudy" | "rainy" | "snowy")[] = [
        "sunny",
        "cloudy",
        "rainy",
        "snowy",
      ];
      const mockData: WeatherData = {
        city: city.charAt(0).toUpperCase() + city.slice(1),
        temperature: Math.floor(Math.random() * 35) + 5, // 5-40°C
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        humidity: Math.floor(Math.random() * 40) + 30, // 30-70%
        windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      };

      setWeatherData(mockData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch weather data"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getTemperatureFeeling = (temp: number) => {
    if (temp < 10) return { text: "Cold", color: "text-blue-600" };
    if (temp < 20) return { text: "Cool", color: "text-blue-400" };
    if (temp < 25) return { text: "Comfortable", color: "text-green-600" };
    if (temp < 30) return { text: "Warm", color: "text-orange-500" };
    return { text: "Hot", color: "text-red-600" };
  };

  const reset = () => {
    setWeatherData(null);
    setError(null);
    setCity("");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto">
      <h3 className="text-2xl font-bold mb-6 text-center">Weather Dashboard</h3>

      {/* Search Form */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name... (try 'error' for error demo)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
            disabled={isLoading}
          />
          <button
            onClick={fetchWeather}
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-2 px-6 rounded transition-colors"
          >
            {isLoading ? "..." : "Search"}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="text-4xl mb-3 animate-bounce">🌍</div>
          <h4 className="text-lg font-semibold mb-2">
            Fetching Weather Data...
          </h4>
          <p className="text-gray-600">
            Please wait while we get the latest information
          </p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full animate-pulse"
              style={{ width: "70%" }}
            ></div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="text-center py-8">
          <div className="text-4xl mb-3">⚠️</div>
          <h4 className="text-lg font-semibold text-red-800 mb-2">
            Oops! Something went wrong
          </h4>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="space-x-2">
            <button
              onClick={fetchWeather}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={reset}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      )}

      {/* Weather Data */}
      {weatherData && !isLoading && !error && (
        <div className="space-y-4">
          {/* Main Weather Info */}
          <div
            className={`p-6 rounded-lg text-center ${
              weatherConditions[weatherData.condition].bg
            }`}
          >
            <div className="text-6xl mb-3">
              {weatherConditions[weatherData.condition].icon}
            </div>
            <h4 className="text-2xl font-bold mb-1">{weatherData.city}</h4>
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-4xl font-bold">
                {weatherData.temperature}°C
              </span>
              <span
                className={`text-lg font-medium ${
                  getTemperatureFeeling(weatherData.temperature).color
                }`}
              >
                {getTemperatureFeeling(weatherData.temperature).text}
              </span>
            </div>
            <p
              className={`text-lg capitalize ${
                weatherConditions[weatherData.condition].color
              }`}
            >
              {weatherData.condition}
            </p>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">💧</div>
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="text-xl font-bold text-blue-600">
                {weatherData.humidity}%
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg text-center">
              <div className="text-2xl mb-2">💨</div>
              <p className="text-sm text-gray-600">Wind Speed</p>
              <p className="text-xl font-bold text-green-600">
                {weatherData.windSpeed} km/h
              </p>
            </div>
          </div>

          {/* Weather Recommendations */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-semibold mb-2">Recommendations:</h5>
            <div className="text-sm text-gray-600 space-y-1">
              {weatherData.condition === "rainy" && (
                <p>🌂 Don't forget your umbrella!</p>
              )}
              {weatherData.condition === "sunny" && (
                <p>🕶️ Perfect day for outdoor activities!</p>
              )}
              {weatherData.condition === "snowy" && (
                <p>🧥 Bundle up and drive carefully!</p>
              )}
              {weatherData.condition === "cloudy" && (
                <p>☁️ Great weather for a walk!</p>
              )}

              {weatherData.temperature > 25 && (
                <p>🌡️ Stay hydrated in this warm weather!</p>
              )}
              {weatherData.temperature < 10 && (
                <p>🧣 Dress warmly, it's quite cold!</p>
              )}
            </div>
          </div>

          <button
            onClick={reset}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Search Another City
          </button>
        </div>
      )}

      {/* Initial State */}
      {!weatherData && !isLoading && !error && (
        <div className="text-center py-8">
          <div className="text-4xl mb-3">🌤️</div>
          <h4 className="text-lg font-semibold mb-2">
            Welcome to Weather Dashboard
          </h4>
          <p className="text-gray-600">Enter a city name to get started!</p>
        </div>
      )}
    </div>
  );
}

export default WeatherDashboard;
```

## 🎯 Common Conditional Rendering Patterns

### Pattern Cheat Sheet:

```tsx
// 1. Simple show/hide
{
  condition && <Component />;
}

// 2. Either/or
{
  condition ? <ComponentA /> : <ComponentB />;
}

// 3. Multiple conditions
{
  condition1 ? <A /> : condition2 ? <B /> : <C />;
}

// 4. Early return
if (condition) return <Component />;

// 5. Switch statement
switch (state) {
  case "loading":
    return <Loading />;
  case "error":
    return <Error />;
  default:
    return <Content />;
}

// 6. Array filtering
{
  items.filter((item) => item.active).map((item) => <Item key={item.id} />);
}

// 7. Nested conditions
{
  user && user.isLoggedIn && user.hasPermission && <AdminPanel />;
}
```

## 🎯 What You've Learned

### ✅ Core Conditional Concepts:

1. **Early returns** for clean component structure
2. **Ternary operators** for inline conditions
3. **Logical AND (&&)** for simple show/hide
4. **Switch statements** for multiple states
5. **Array filtering** for dynamic lists

### ✅ Practical Skills:

1. **Loading, error, and success states**
2. **User authentication flows**
3. **Dynamic content filtering**
4. **Responsive UI behaviors**
5. **Complex state management**

## 🚀 What's Next?

Great job! You've completed Week 1 of your React + TypeScript journey! 🎉

**Week 1 Recap - You've learned:**

- ✅ React fundamentals and component thinking
- ✅ Setting up React + TypeScript projects
- ✅ Creating your first components
- ✅ Props and type safety
- ✅ State management with useState
- ✅ Event handling and user interactions
- ✅ Conditional rendering and dynamic UIs

**Next up in Week 2:**

- 🎯 Lists and Keys (rendering dynamic data)
- 🎯 Forms and controlled components
- 🎯 Component composition patterns
- 🎯 useEffect for side effects
- 🎯 Custom hooks for reusable logic

You now have the foundational skills to build interactive React applications! 🚀

---

**💡 Remember**: Conditional rendering is about creating responsive, dynamic user experiences. Always consider different states your app can be in: loading, error, empty, success - and provide clear feedback for each!
