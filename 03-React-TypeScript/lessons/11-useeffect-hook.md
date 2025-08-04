# Lesson 11: useEffect Hook ⚡

## Welcome to Side Effects! 🌊

Imagine a React component that only renders JSX and never interacts with the outside world - no API calls, no timers, no DOM manipulation. Pretty isolated, right? **useEffect** is your gateway to the outside world, letting your components perform side effects and respond to lifecycle events!

## 🤔 What is useEffect?

**useEffect** is a React hook that lets you perform side effects in functional components. It combines the functionality of `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` from class components.

### Real-World Analogy:

Think of **useEffect** like a **smart home system**:

- 🏠 **House** is your component
- 💡 **Lights turning on** when you enter (component mounts)
- 🌡️ **Temperature adjusting** when weather changes (component updates)
- 🔒 **Security system arming** when you leave (component unmounts)

The system reacts to changes and performs actions automatically!

## 🎯 Basic useEffect Patterns

### 1. **Component Mount (Run Once)**

```tsx
import React, { useState, useEffect } from "react";

function WelcomeMessage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userCount, setUserCount] = useState(0);

  // Runs once when component mounts
  useEffect(() => {
    console.log("Component mounted! 🚀");

    // Simulate fetching user count
    setTimeout(() => {
      setUserCount(1234);
    }, 1000);

    // Update current time
    setCurrentTime(new Date());
  }, []); // Empty dependency array = run once on mount

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-xl font-bold text-blue-800 mb-4">Welcome! 👋</h3>

      <div className="space-y-3">
        <p className="text-gray-600">You joined our platform on:</p>
        <p className="text-lg font-semibold text-gray-800">
          {currentTime.toLocaleDateString()} at{" "}
          {currentTime.toLocaleTimeString()}
        </p>

        <div className="border-t pt-3">
          <p className="text-gray-600">Active users:</p>
          <p className="text-2xl font-bold text-green-600">
            {userCount === 0 ? "Loading..." : userCount.toLocaleString()}
          </p>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          💡 Check the console to see the mount message!
        </p>
      </div>
    </div>
  );
}

export default WelcomeMessage;
```

### 2. **State Dependencies (Run When State Changes)**

```tsx
import React, { useState, useEffect } from "react";

function SearchResults() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchCount, setSearchCount] = useState(0);

  // Mock data for search
  const allItems = [
    "Apple iPhone",
    "Samsung Galaxy",
    "Google Pixel",
    "Apple iPad",
    "MacBook Pro",
    "Dell Laptop",
    "HP Printer",
    "Canon Camera",
    "Sony Headphones",
    "Bose Speaker",
    "Nike Shoes",
    "Adidas Shirt",
  ];

  // Runs whenever searchTerm changes
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setResults([]);
      return;
    }

    console.log(`Searching for: "${searchTerm}"`);
    setIsLoading(true);
    setSearchCount((prev) => prev + 1);

    // Simulate API call delay
    const timeoutId = setTimeout(() => {
      const filteredResults = allItems.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filteredResults);
      setIsLoading(false);
    }, 500);

    // Cleanup function - cancel timeout if searchTerm changes again
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm]); // Dependency: re-run when searchTerm changes

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Product Search</h3>

      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 text-sm text-gray-600">
        <p>Search count: {searchCount}</p>
        {searchTerm && <p>Searching for: "{searchTerm}"</p>}
      </div>

      {isLoading ? (
        <div className="text-center py-4">
          <div className="animate-spin text-2xl">🔍</div>
          <p className="text-gray-600 mt-2">Searching...</p>
        </div>
      ) : (
        <div>
          {results.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">
                Found {results.length} results:
              </p>
              {results.map((item, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          ) : searchTerm ? (
            <p className="text-gray-500 text-center py-4">
              No results found for "{searchTerm}"
            </p>
          ) : (
            <p className="text-gray-500 text-center py-4">
              Start typing to search...
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
```

### 3. **Cleanup Effects (Timers, Subscriptions)**

```tsx
import React, { useState, useEffect } from "react";

function LiveClock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRunning, setIsRunning] = useState(true);
  const [tickCount, setTickCount] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    console.log("Starting clock timer ⏰");

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      setTickCount((prev) => prev + 1);
    }, 1000);

    // Cleanup function - runs when component unmounts or effect re-runs
    return () => {
      console.log("Cleaning up clock timer 🧹");
      clearInterval(intervalId);
    };
  }, [isRunning]); // Re-run when isRunning changes

  const formatTime = (date: Date) => {
    return {
      time: date.toLocaleTimeString(),
      date: date.toLocaleDateString(),
      day: date.toLocaleDateString("en-US", { weekday: "long" }),
    };
  };

  const { time, date, day } = formatTime(currentTime);

  return (
    <div className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg shadow-md max-w-md mx-auto">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-4">Live Clock ⏰</h3>

        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 mb-4">
          <div className="text-3xl font-mono font-bold mb-2">{time}</div>
          <div className="text-lg">{day}</div>
          <div className="text-sm opacity-75">{date}</div>
        </div>

        <div className="flex justify-center gap-3 mb-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isRunning
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isRunning ? "Pause" : "Start"}
          </button>

          <button
            onClick={() => {
              setCurrentTime(new Date());
              setTickCount(0);
            }}
            className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg font-medium transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="text-sm opacity-75">
          <p>Ticks: {tickCount}</p>
          <p>Status: {isRunning ? "Running" : "Paused"}</p>
        </div>

        <p className="text-xs opacity-50 mt-3">
          💡 Check console for cleanup messages!
        </p>
      </div>
    </div>
  );
}

export default LiveClock;
```

## 🎮 Let's Build: Weather Dashboard with API

```tsx
import React, { useState, useEffect } from "react";

interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  lastUpdated: Date;
}

interface ApiError {
  message: string;
  code: string;
}

function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [city, setCity] = useState("London");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);

  // Mock API function
  const fetchWeatherData = async (cityName: string): Promise<WeatherData> => {
    // Simulate API delay
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 1000)
    );

    // Simulate random API failures
    if (Math.random() < 0.2) {
      throw new Error("Weather service temporarily unavailable");
    }

    // Generate mock weather data
    const conditions = ["Sunny", "Cloudy", "Rainy", "Snowy", "Windy"];
    return {
      city: cityName,
      temperature: Math.floor(Math.random() * 35) + 5, // 5-40°C
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      humidity: Math.floor(Math.random() * 40) + 30, // 30-70%
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
      lastUpdated: new Date(),
    };
  };

  // Fetch weather data effect
  useEffect(() => {
    const loadWeatherData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log(`Fetching weather for ${city}...`);
        const data = await fetchWeatherData(city);
        setWeatherData(data);
        setLastFetchTime(new Date());
      } catch (err) {
        setError({
          message:
            err instanceof Error ? err.message : "Unknown error occurred",
          code: "FETCH_ERROR",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadWeatherData();
  }, [city]); // Re-fetch when city changes

  // Auto-refresh effect
  useEffect(() => {
    if (!autoRefresh) return;

    console.log("Setting up auto-refresh timer ⏱️");

    const intervalId = setInterval(async () => {
      console.log("Auto-refreshing weather data...");
      try {
        const data = await fetchWeatherData(city);
        setWeatherData(data);
        setLastFetchTime(new Date());
      } catch (err) {
        console.error("Auto-refresh failed:", err);
        // Don't update error state during auto-refresh to avoid disrupting UI
      }
    }, 30000); // Refresh every 30 seconds

    return () => {
      console.log("Cleaning up auto-refresh timer 🧹");
      clearInterval(intervalId);
    };
  }, [autoRefresh, city]);

  // Document title effect
  useEffect(() => {
    if (weatherData) {
      document.title = `${weatherData.temperature}°C in ${weatherData.city} - Weather Dashboard`;
    } else {
      document.title = "Weather Dashboard";
    }

    // Cleanup: reset title when component unmounts
    return () => {
      document.title = "React App";
    };
  }, [weatherData]);

  const getConditionIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return "☀️";
      case "cloudy":
        return "☁️";
      case "rainy":
        return "🌧️";
      case "snowy":
        return "❄️";
      case "windy":
        return "💨";
      default:
        return "🌤️";
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return "from-yellow-400 to-orange-500";
      case "cloudy":
        return "from-gray-400 to-gray-600";
      case "rainy":
        return "from-blue-400 to-blue-600";
      case "snowy":
        return "from-blue-200 to-blue-400";
      case "windy":
        return "from-green-400 to-blue-500";
      default:
        return "from-blue-400 to-purple-500";
    }
  };

  const timeSinceUpdate = lastFetchTime
    ? Math.floor((Date.now() - lastFetchTime.getTime()) / 1000)
    : 0;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">
        Weather Dashboard 🌤️
      </h2>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter city name..."
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Auto-refresh</span>
            </label>
          </div>
        </div>

        {lastFetchTime && (
          <p className="text-xs text-gray-500 mt-2">
            Last updated: {timeSinceUpdate}s ago
            {autoRefresh && " (auto-refreshing every 30s)"}
          </p>
        )}
      </div>

      {/* Weather Display */}
      {isLoading ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="animate-spin text-4xl mb-4">🌍</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Loading Weather Data...
          </h3>
          <p className="text-gray-600">
            Fetching latest information for {city}
          </p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Weather Data Unavailable
          </h3>
          <p className="text-red-600 mb-4">{error.message}</p>
          <button
            onClick={() => setCity(city)} // Trigger re-fetch
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : weatherData ? (
        <div
          className={`bg-gradient-to-br ${getConditionColor(
            weatherData.condition
          )} text-white rounded-lg shadow-md overflow-hidden`}
        >
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-2">
                {getConditionIcon(weatherData.condition)}
              </div>
              <h3 className="text-2xl font-bold mb-1">{weatherData.city}</h3>
              <p className="text-lg opacity-90">{weatherData.condition}</p>
            </div>

            <div className="text-center mb-6">
              <div className="text-5xl font-bold mb-2">
                {weatherData.temperature}°C
              </div>
              <p className="text-sm opacity-75">
                Updated: {weatherData.lastUpdated.toLocaleTimeString()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">💧</div>
                <div className="text-xl font-bold">{weatherData.humidity}%</div>
                <div className="text-sm opacity-75">Humidity</div>
              </div>

              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">💨</div>
                <div className="text-xl font-bold">{weatherData.windSpeed}</div>
                <div className="text-sm opacity-75">km/h Wind</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Debug Info */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Debug Information:</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <p>• Current city: {city}</p>
          <p>• Auto-refresh: {autoRefresh ? "Enabled" : "Disabled"}</p>
          <p>• Loading state: {isLoading ? "True" : "False"}</p>
          <p>• Has error: {error ? "True" : "False"}</p>
          <p>• Has data: {weatherData ? "True" : "False"}</p>
          <p className="text-xs text-gray-500 mt-2">
            💡 Check browser console for effect logs!
          </p>
        </div>
      </div>
    </div>
  );
}

export default WeatherDashboard;
```

## 🎯 Advanced useEffect Patterns

### 1. **Multiple Effects for Separation of Concerns**

```tsx
import React, { useState, useEffect } from "react";

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Effect 1: Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      console.log("Fetching user data...");
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setUser({
        id: userId,
        name: `User ${userId}`,
        email: `user${userId}@example.com`,
      });
    };

    fetchUser();
  }, [userId]);

  // Effect 2: Fetch user posts
  useEffect(() => {
    const fetchPosts = async () => {
      console.log("Fetching user posts...");
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      setPosts([
        { id: 1, title: "My First Post", content: "Hello world!" },
        { id: 2, title: "Another Post", content: "More content here..." },
      ]);
    };

    if (user) {
      fetchPosts();
    }
  }, [user]); // Depends on user being loaded first

  // Effect 3: Online status listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []); // No dependencies - set up once

  // Effect 4: Page title update
  useEffect(() => {
    if (user) {
      document.title = `${user.name}'s Profile`;
    }

    return () => {
      document.title = "React App";
    };
  }, [user]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">User Profile</h2>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              isOnline
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {isOnline ? "🟢 Online" : "🔴 Offline"}
          </div>
        </div>

        {user ? (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-2">Recent Posts:</h4>
              {posts.length > 0 ? (
                <div className="space-y-2">
                  {posts.map((post) => (
                    <div key={post.id} className="bg-gray-50 p-3 rounded">
                      <h5 className="font-medium">{post.title}</h5>
                      <p className="text-sm text-gray-600">{post.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Loading posts...</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Loading user...</p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
```

## 🎯 Common useEffect Mistakes and Solutions

### ❌ Mistake: Missing Dependencies

```tsx
// BAD: Missing 'count' in dependencies
useEffect(() => {
  document.title = `Count: ${count}`;
}, []); // This will only run once!

// GOOD: Include all dependencies
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]); // Runs whenever count changes
```

### ❌ Mistake: Infinite Loops

```tsx
// BAD: Object/array dependencies cause infinite loops
const [user, setUser] = useState({ name: "", email: "" });

useEffect(() => {
  // This creates a new object every time!
  setUser({ name: "John", email: "john@example.com" });
}, [user]); // Infinite loop!

// GOOD: Use primitive values or useMemo
useEffect(() => {
  setUser({ name: "John", email: "john@example.com" });
}, []); // Only run once
```

### ❌ Mistake: Not Cleaning Up

```tsx
// BAD: No cleanup
useEffect(() => {
  const intervalId = setInterval(() => {
    console.log("Tick");
  }, 1000);
  // Memory leak! Timer keeps running
}, []);

// GOOD: Cleanup in return function
useEffect(() => {
  const intervalId = setInterval(() => {
    console.log("Tick");
  }, 1000);

  return () => clearInterval(intervalId);
}, []);
```

## 🎯 What You've Learned

### ✅ Core useEffect Concepts:

1. **Component lifecycle** in functional components
2. **Dependency arrays** and when effects run
3. **Cleanup functions** for preventing memory leaks
4. **Side effects** like API calls, timers, and subscriptions
5. **Multiple effects** for separation of concerns

### ✅ Practical Skills:

1. **Fetching data** from APIs on component mount
2. **Setting up timers** and intervals with cleanup
3. **Listening to browser events** (online/offline, resize, etc.)
4. **Updating document title** and other DOM properties
5. **Managing complex async operations** with loading and error states

## 🚀 What's Next?

In **Lesson 12: Custom Hooks**, we'll learn how to:

- Extract reusable logic into custom hooks
- Share stateful logic between components
- Build your own hook library
- Test and optimize custom hooks

You've mastered side effects and component lifecycle! useEffect opens up endless possibilities for your React components! 🎉

---

**💡 Remember**: useEffect is your bridge to the outside world. Always clean up after yourself, include all dependencies, and think about when your effects should run!
