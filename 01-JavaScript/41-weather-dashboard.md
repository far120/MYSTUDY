# Weather Dashboard - API Integration & Data Visualization 🌦️

Welcome to your **second complete JavaScript application**! This Weather Dashboard will teach you how to work with real APIs, handle asynchronous data, create beautiful visualizations, and build responsive, data-driven interfaces.

## 🎯 Project Overview

We'll build a comprehensive weather application with these features:

### Core Features:

- 🌍 Current weather by city search
- 📍 Geolocation-based weather
- 📊 5-day weather forecast
- 📈 Interactive charts and graphs
- 🗺️ Weather map integration
- 💾 Recent searches history
- ⭐ Favorite locations
- 🔄 Auto-refresh functionality

### Advanced Features:

- 🌡️ Multiple unit systems (Celsius/Fahrenheit)
- 🌙 Weather-based theme changes
- 📱 Responsive design with mobile-first approach
- 🔔 Weather alerts and notifications
- 📈 Historical weather data
- 🎨 Beautiful weather animations
- 📊 Air quality index
- 🌅 Sunrise/sunset times

## 🏗️ Application Structure

### HTML Foundation:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Weather Dashboard</title>
    <link rel="stylesheet" href="weather-styles.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="app-container">
      <!-- Header -->
      <header class="app-header">
        <div class="header-content">
          <h1>🌦️ Weather Dashboard</h1>
          <div class="header-controls">
            <button id="units-toggle" class="units-btn" title="Toggle Units">
              °C
            </button>
            <button
              id="location-btn"
              class="location-btn"
              title="Use Current Location"
            >
              📍
            </button>
            <button id="refresh-btn" class="refresh-btn" title="Refresh Data">
              🔄
            </button>
          </div>
        </div>
      </header>

      <!-- Search Section -->
      <section class="search-section">
        <div class="search-container">
          <div class="search-box">
            <input
              type="text"
              id="city-search"
              placeholder="Search for a city..."
              autocomplete="off"
            />
            <button id="search-btn" class="search-button">🔍</button>
          </div>
          <div id="search-suggestions" class="search-suggestions hidden"></div>
        </div>
      </section>

      <!-- Loading State -->
      <div id="loading-overlay" class="loading-overlay hidden">
        <div class="loading-spinner">
          <div class="spinner"></div>
          <p>Loading weather data...</p>
        </div>
      </div>

      <!-- Error State -->
      <div id="error-message" class="error-message hidden">
        <div class="error-content">
          <h3>⚠️ Something went wrong</h3>
          <p id="error-text"></p>
          <button id="retry-btn" class="retry-btn">Try Again</button>
        </div>
      </div>

      <!-- Main Content -->
      <main id="weather-content" class="weather-content hidden">
        <!-- Current Weather -->
        <section class="current-weather">
          <div class="current-info">
            <div class="location-info">
              <h2 id="current-location">---</h2>
              <p id="current-date-time">---</p>
            </div>

            <div class="weather-main">
              <div class="temperature-display">
                <span id="current-temp">--°</span>
                <div class="weather-icon">
                  <img id="weather-icon" src="" alt="Weather" />
                </div>
              </div>

              <div class="weather-details">
                <h3 id="weather-description">---</h3>
                <p id="feels-like">Feels like --°</p>
              </div>
            </div>
          </div>

          <div class="weather-stats">
            <div class="stat-item">
              <span class="stat-label">Humidity</span>
              <span id="humidity" class="stat-value">--%</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Wind Speed</span>
              <span id="wind-speed" class="stat-value">-- km/h</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Pressure</span>
              <span id="pressure" class="stat-value">-- hPa</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Visibility</span>
              <span id="visibility" class="stat-value">-- km</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">UV Index</span>
              <span id="uv-index" class="stat-value">--</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Air Quality</span>
              <span id="air-quality" class="stat-value">--</span>
            </div>
          </div>
        </section>

        <!-- Hourly Forecast -->
        <section class="hourly-forecast">
          <h3>📊 24-Hour Forecast</h3>
          <div id="hourly-chart" class="chart-container"></div>
          <div id="hourly-scroll" class="hourly-scroll">
            <!-- Hourly items will be dynamically added -->
          </div>
        </section>

        <!-- 5-Day Forecast -->
        <section class="daily-forecast">
          <h3>📅 5-Day Forecast</h3>
          <div id="daily-forecast-list" class="forecast-list">
            <!-- Daily forecast items will be dynamically added -->
          </div>
        </section>

        <!-- Additional Info -->
        <section class="additional-info">
          <div class="info-grid">
            <div class="info-card">
              <h4>🌅 Sun Times</h4>
              <div class="sun-times">
                <div class="sun-time">
                  <span>Sunrise</span>
                  <span id="sunrise-time">--:--</span>
                </div>
                <div class="sun-time">
                  <span>Sunset</span>
                  <span id="sunset-time">--:--</span>
                </div>
              </div>
            </div>

            <div class="info-card">
              <h4>💨 Wind Details</h4>
              <div class="wind-info">
                <div class="wind-direction">
                  <div id="wind-compass" class="wind-compass">
                    <div id="wind-arrow" class="wind-arrow"></div>
                  </div>
                  <span id="wind-direction">--</span>
                </div>
                <div class="wind-stats">
                  <span
                    >Speed: <span id="wind-speed-detail">-- km/h</span></span
                  >
                  <span>Gust: <span id="wind-gust">-- km/h</span></span>
                </div>
              </div>
            </div>

            <div class="info-card">
              <h4>🌡️ Temperature Range</h4>
              <div class="temp-range">
                <div class="temp-bar">
                  <div id="temp-bar-fill" class="temp-bar-fill"></div>
                </div>
                <div class="temp-labels">
                  <span id="temp-min">--°</span>
                  <span id="temp-max">--°</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <!-- Sidebar -->
      <aside class="sidebar">
        <!-- Recent Searches -->
        <div class="sidebar-section">
          <h3>🕒 Recent Searches</h3>
          <div id="recent-searches" class="recent-searches">
            <!-- Recent search items will be added here -->
          </div>
        </div>

        <!-- Favorites -->
        <div class="sidebar-section">
          <h3>⭐ Favorites</h3>
          <div id="favorites-list" class="favorites-list">
            <!-- Favorite location items will be added here -->
          </div>
          <button id="add-favorite" class="add-favorite-btn hidden">
            Add to Favorites
          </button>
        </div>
      </aside>
    </div>

    <script src="weather-app.js"></script>
  </body>
</html>
```

## 🌐 API Integration & Data Management

### Weather API Service:

```javascript
// Weather API Configuration
class WeatherAPI {
  constructor() {
    // Using OpenWeatherMap API (sign up for free at openweathermap.org)
    this.API_KEY = "your-api-key-here"; // Replace with your API key
    this.BASE_URL = "https://api.openweathermap.org/data/2.5";
    this.GEO_URL = "https://api.openweathermap.org/geo/1.0";
    this.ONE_CALL_URL = "https://api.openweathermap.org/data/3.0/onecall";

    // For demo purposes, we'll use mock data
    this.USE_MOCK_DATA = true;
  }

  async getCurrentWeather(city) {
    try {
      if (this.USE_MOCK_DATA) {
        return this.getMockCurrentWeather(city);
      }

      const response = await fetch(
        `${this.BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${
          this.API_KEY
        }&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Weather data not found for "${city}"`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching current weather:", error);
      throw error;
    }
  }

  async getWeatherByCoords(lat, lon) {
    try {
      if (this.USE_MOCK_DATA) {
        return this.getMockWeatherByCoords(lat, lon);
      }

      const response = await fetch(
        `${this.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Weather data not found for current location");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching weather by coordinates:", error);
      throw error;
    }
  }

  async getForecast(city) {
    try {
      if (this.USE_MOCK_DATA) {
        return this.getMockForecast(city);
      }

      const response = await fetch(
        `${this.BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${
          this.API_KEY
        }&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Forecast data not found for "${city}"`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching forecast:", error);
      throw error;
    }
  }

  async getDetailedWeather(lat, lon) {
    try {
      if (this.USE_MOCK_DATA) {
        return this.getMockDetailedWeather(lat, lon);
      }

      const response = await fetch(
        `${this.ONE_CALL_URL}?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric&exclude=minutely`
      );

      if (!response.ok) {
        throw new Error("Detailed weather data not available");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching detailed weather:", error);
      throw error;
    }
  }

  async searchCities(query) {
    try {
      if (this.USE_MOCK_DATA) {
        return this.getMockCitySearch(query);
      }

      const response = await fetch(
        `${this.GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${
          this.API_KEY
        }`
      );

      if (!response.ok) {
        throw new Error("City search failed");
      }

      return await response.json();
    } catch (error) {
      console.error("Error searching cities:", error);
      return [];
    }
  }

  // Mock data for demo purposes
  getMockCurrentWeather(city) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          name: city || "Demo City",
          sys: { country: "XX" },
          coord: { lat: 40.7128, lon: -74.006 },
          weather: [
            {
              main: "Clear",
              description: "clear sky",
              icon: "01d",
            },
          ],
          main: {
            temp: 22,
            feels_like: 24,
            humidity: 65,
            pressure: 1013,
            temp_min: 18,
            temp_max: 26,
          },
          wind: {
            speed: 3.5,
            deg: 230,
            gust: 5.2,
          },
          visibility: 10000,
          clouds: { all: 20 },
          dt: Date.now() / 1000,
          sys: {
            sunrise: Date.now() / 1000 - 3600,
            sunset: Date.now() / 1000 + 7200,
          },
        });
      }, 1000);
    });
  }

  getMockWeatherByCoords(lat, lon) {
    return this.getMockCurrentWeather("Current Location");
  }

  getMockForecast(city) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const forecasts = [];
        for (let i = 0; i < 40; i++) {
          forecasts.push({
            dt: Date.now() / 1000 + i * 3 * 3600,
            main: {
              temp: 20 + Math.random() * 10,
              feels_like: 22 + Math.random() * 8,
              humidity: 50 + Math.random() * 30,
              pressure: 1010 + Math.random() * 20,
            },
            weather: [
              {
                main: ["Clear", "Clouds", "Rain"][
                  Math.floor(Math.random() * 3)
                ],
                description: "mock weather",
                icon: "01d",
              },
            ],
            wind: {
              speed: Math.random() * 10,
              deg: Math.random() * 360,
            },
            dt_txt: new Date(Date.now() + i * 3 * 3600 * 1000).toISOString(),
          });
        }

        resolve({
          city: { name: city || "Demo City", country: "XX" },
          list: forecasts,
        });
      }, 1200);
    });
  }

  getMockDetailedWeather(lat, lon) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          current: {
            temp: 22,
            feels_like: 24,
            humidity: 65,
            pressure: 1013,
            uvi: 6.5,
            visibility: 10000,
            wind_speed: 3.5,
            wind_deg: 230,
            wind_gust: 5.2,
            weather: [
              {
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
          },
          hourly: Array.from({ length: 24 }, (_, i) => ({
            dt: Date.now() / 1000 + i * 3600,
            temp: 20 + Math.random() * 8,
            humidity: 50 + Math.random() * 30,
            weather: [
              {
                main: "Clear",
                icon: "01d",
              },
            ],
          })),
          daily: Array.from({ length: 7 }, (_, i) => ({
            dt: Date.now() / 1000 + i * 24 * 3600,
            temp: {
              min: 15 + Math.random() * 5,
              max: 25 + Math.random() * 5,
            },
            weather: [
              {
                main: "Clear",
                description: "clear sky",
                icon: "01d",
              },
            ],
            humidity: 60,
            wind_speed: 3.0,
          })),
          alerts: [],
        });
      }, 800);
    });
  }

  getMockCitySearch(query) {
    const cities = [
      { name: "New York", country: "US", lat: 40.7128, lon: -74.006 },
      { name: "London", country: "GB", lat: 51.5074, lon: -0.1278 },
      { name: "Tokyo", country: "JP", lat: 35.6762, lon: 139.6503 },
      { name: "Paris", country: "FR", lat: 48.8566, lon: 2.3522 },
      { name: "Sydney", country: "AU", lat: -33.8688, lon: 151.2093 },
    ];

    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = cities.filter((city) =>
          city.name.toLowerCase().includes(query.toLowerCase())
        );
        resolve(filtered);
      }, 300);
    });
  }
}

// Data Storage Manager
class WeatherStorage {
  static RECENT_SEARCHES_KEY = "weather-recent-searches";
  static FAVORITES_KEY = "weather-favorites";
  static SETTINGS_KEY = "weather-settings";
  static MAX_RECENT_SEARCHES = 5;

  static saveRecentSearch(city, country) {
    try {
      const searches = this.getRecentSearches();
      const newSearch = { city, country, timestamp: Date.now() };

      // Remove if already exists
      const filtered = searches.filter(
        (s) => s.city.toLowerCase() !== city.toLowerCase()
      );

      // Add to beginning and limit
      filtered.unshift(newSearch);
      const limited = filtered.slice(0, this.MAX_RECENT_SEARCHES);

      localStorage.setItem(this.RECENT_SEARCHES_KEY, JSON.stringify(limited));
      return true;
    } catch (error) {
      console.error("Failed to save recent search:", error);
      return false;
    }
  }

  static getRecentSearches() {
    try {
      const stored = localStorage.getItem(this.RECENT_SEARCHES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load recent searches:", error);
      return [];
    }
  }

  static saveFavorite(city, country, lat, lon) {
    try {
      const favorites = this.getFavorites();
      const newFavorite = {
        city,
        country,
        lat,
        lon,
        timestamp: Date.now(),
        id: Date.now() + Math.random(),
      };

      // Check if already exists
      const exists = favorites.some(
        (f) =>
          f.city.toLowerCase() === city.toLowerCase() && f.country === country
      );

      if (exists) {
        return false; // Already in favorites
      }

      favorites.push(newFavorite);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
      return true;
    } catch (error) {
      console.error("Failed to save favorite:", error);
      return false;
    }
  }

  static getFavorites() {
    try {
      const stored = localStorage.getItem(this.FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load favorites:", error);
      return [];
    }
  }

  static removeFavorite(id) {
    try {
      const favorites = this.getFavorites();
      const filtered = favorites.filter((f) => f.id !== id);
      localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      return false;
    }
  }

  static saveSettings(settings) {
    try {
      localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error("Failed to save settings:", error);
      return false;
    }
  }

  static getSettings() {
    try {
      const stored = localStorage.getItem(this.SETTINGS_KEY);
      return stored
        ? JSON.parse(stored)
        : {
            units: "metric", // metric or imperial
            autoRefresh: false,
            refreshInterval: 10, // minutes
          };
    } catch (error) {
      console.error("Failed to load settings:", error);
      return { units: "metric", autoRefresh: false, refreshInterval: 10 };
    }
  }
}
```

## 🎨 Main Weather Application

### Weather Dashboard Controller:

```javascript
class WeatherDashboard {
  constructor() {
    this.weatherAPI = new WeatherAPI();
    this.currentLocation = null;
    this.currentWeatherData = null;
    this.forecastData = null;
    this.settings = WeatherStorage.getSettings();
    this.autoRefreshTimer = null;

    this.init();
  }

  init() {
    this.bindElements();
    this.attachEventListeners();
    this.loadRecentSearches();
    this.loadFavorites();
    this.setupAutoRefresh();

    // Load last searched city or show default
    const recentSearches = WeatherStorage.getRecentSearches();
    if (recentSearches.length > 0) {
      this.searchWeather(recentSearches[0].city);
    } else {
      this.showWelcomeMessage();
    }

    console.log("🌦️ Weather Dashboard initialized");
  }

  bindElements() {
    // Search elements
    this.citySearch = document.getElementById("city-search");
    this.searchBtn = document.getElementById("search-btn");
    this.searchSuggestions = document.getElementById("search-suggestions");

    // Control elements
    this.unitsToggle = document.getElementById("units-toggle");
    this.locationBtn = document.getElementById("location-btn");
    this.refreshBtn = document.getElementById("refresh-btn");
    this.addFavoriteBtn = document.getElementById("add-favorite");

    // Display elements
    this.loadingOverlay = document.getElementById("loading-overlay");
    this.errorMessage = document.getElementById("error-message");
    this.errorText = document.getElementById("error-text");
    this.retryBtn = document.getElementById("retry-btn");
    this.weatherContent = document.getElementById("weather-content");

    // Current weather elements
    this.currentLocation = document.getElementById("current-location");
    this.currentDateTime = document.getElementById("current-date-time");
    this.currentTemp = document.getElementById("current-temp");
    this.weatherIcon = document.getElementById("weather-icon");
    this.weatherDescription = document.getElementById("weather-description");
    this.feelsLike = document.getElementById("feels-like");

    // Weather stats
    this.humidity = document.getElementById("humidity");
    this.windSpeed = document.getElementById("wind-speed");
    this.pressure = document.getElementById("pressure");
    this.visibility = document.getElementById("visibility");
    this.uvIndex = document.getElementById("uv-index");
    this.airQuality = document.getElementById("air-quality");

    // Forecast elements
    this.hourlyChart = document.getElementById("hourly-chart");
    this.hourlyScroll = document.getElementById("hourly-scroll");
    this.dailyForecastList = document.getElementById("daily-forecast-list");

    // Additional info elements
    this.sunriseTime = document.getElementById("sunrise-time");
    this.sunsetTime = document.getElementById("sunset-time");
    this.windDirection = document.getElementById("wind-direction");
    this.windArrow = document.getElementById("wind-arrow");
    this.windSpeedDetail = document.getElementById("wind-speed-detail");
    this.windGust = document.getElementById("wind-gust");
    this.tempMin = document.getElementById("temp-min");
    this.tempMax = document.getElementById("temp-max");
    this.tempBarFill = document.getElementById("temp-bar-fill");

    // Sidebar elements
    this.recentSearches = document.getElementById("recent-searches");
    this.favoritesList = document.getElementById("favorites-list");
  }

  attachEventListeners() {
    // Search functionality
    this.searchBtn.addEventListener("click", () => this.handleSearch());
    this.citySearch.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.handleSearch();
    });

    // Search suggestions
    this.citySearch.addEventListener("input", (e) => this.handleSearchInput(e));
    this.citySearch.addEventListener("focus", () =>
      this.showSearchSuggestions()
    );
    this.citySearch.addEventListener("blur", () => {
      // Delay hiding to allow click on suggestions
      setTimeout(() => this.hideSearchSuggestions(), 200);
    });

    // Controls
    this.unitsToggle.addEventListener("click", () => this.toggleUnits());
    this.locationBtn.addEventListener("click", () =>
      this.getCurrentLocationWeather()
    );
    this.refreshBtn.addEventListener("click", () => this.refreshWeatherData());
    this.addFavoriteBtn.addEventListener("click", () => this.addToFavorites());

    // Error handling
    this.retryBtn.addEventListener("click", () => this.retryLastAction());

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) =>
      this.handleKeyboardShortcuts(e)
    );
  }

  async handleSearch() {
    const query = this.citySearch.value.trim();
    if (!query) {
      this.showNotification("Please enter a city name", "warning");
      return;
    }

    await this.searchWeather(query);
  }

  async searchWeather(city) {
    try {
      this.showLoading();
      this.lastAction = () => this.searchWeather(city);

      console.log("🔍 Searching weather for:", city);

      // Get current weather
      const currentWeather = await this.weatherAPI.getCurrentWeather(city);
      this.currentWeatherData = currentWeather;

      // Get detailed weather data
      const detailedWeather = await this.weatherAPI.getDetailedWeather(
        currentWeather.coord.lat,
        currentWeather.coord.lon
      );

      // Get forecast
      const forecast = await this.weatherAPI.getForecast(city);
      this.forecastData = forecast;

      // Save to recent searches
      WeatherStorage.saveRecentSearch(
        currentWeather.name,
        currentWeather.sys.country
      );

      // Update display
      this.displayWeatherData(currentWeather, detailedWeather, forecast);
      this.loadRecentSearches();
      this.hideLoading();

      console.log("✅ Weather data loaded successfully");
    } catch (error) {
      console.error("❌ Error loading weather:", error);
      this.showError(error.message);
    }
  }

  async getCurrentLocationWeather() {
    if (!navigator.geolocation) {
      this.showNotification(
        "Geolocation is not supported by this browser",
        "error"
      );
      return;
    }

    this.showLoading();
    this.lastAction = () => this.getCurrentLocationWeather();

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          console.log(
            "📍 Getting weather for coordinates:",
            latitude,
            longitude
          );

          const currentWeather = await this.weatherAPI.getWeatherByCoords(
            latitude,
            longitude
          );
          this.currentWeatherData = currentWeather;

          const detailedWeather = await this.weatherAPI.getDetailedWeather(
            latitude,
            longitude
          );
          const forecast = await this.weatherAPI.getForecast(
            currentWeather.name
          );
          this.forecastData = forecast;

          this.displayWeatherData(currentWeather, detailedWeather, forecast);
          this.hideLoading();
        } catch (error) {
          console.error("❌ Error loading location weather:", error);
          this.showError(error.message);
        }
      },
      (error) => {
        console.error("❌ Geolocation error:", error);
        let message = "Unable to get your location";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            message =
              "Location access denied. Please enable location services.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            message = "Location request timed out.";
            break;
        }

        this.showError(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  }

  displayWeatherData(currentWeather, detailedWeather, forecast) {
    // Update current weather display
    this.updateCurrentWeather(currentWeather, detailedWeather);

    // Update forecasts
    this.updateHourlyForecast(detailedWeather.hourly);
    this.updateDailyForecast(detailedWeather.daily);

    // Update additional info
    this.updateAdditionalInfo(currentWeather, detailedWeather);

    // Show weather content
    this.weatherContent.classList.remove("hidden");
    this.addFavoriteBtn.classList.remove("hidden");

    // Update page title and theme
    document.title = `Weather - ${currentWeather.name}`;
    this.updateThemeBasedOnWeather(currentWeather.weather[0].main);
  }

  updateCurrentWeather(current, detailed) {
    const temp = this.convertTemperature(current.main.temp);
    const feelsLike = this.convertTemperature(current.main.feels_like);

    // Location and time
    this.currentLocation.textContent = `${current.name}, ${current.sys.country}`;
    this.currentDateTime.textContent = this.formatDateTime(new Date());

    // Temperature and weather
    this.currentTemp.textContent = `${Math.round(
      temp
    )}°${this.getTemperatureUnit()}`;
    this.weatherDescription.textContent = this.capitalizeWords(
      current.weather[0].description
    );
    this.feelsLike.textContent = `Feels like ${Math.round(
      feelsLike
    )}°${this.getTemperatureUnit()}`;

    // Weather icon
    this.weatherIcon.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
    this.weatherIcon.alt = current.weather[0].description;

    // Weather stats
    this.humidity.textContent = `${current.main.humidity}%`;
    this.windSpeed.textContent = `${this.convertWindSpeed(
      current.wind.speed
    )} ${this.getWindSpeedUnit()}`;
    this.pressure.textContent = `${current.main.pressure} hPa`;
    this.visibility.textContent = `${(current.visibility / 1000).toFixed(
      1
    )} km`;
    this.uvIndex.textContent = detailed.current.uvi
      ? detailed.current.uvi.toFixed(1)
      : "N/A";
    this.airQuality.textContent = this.getAirQualityText(detailed.current.uvi);
  }

  updateHourlyForecast(hourlyData) {
    const next24Hours = hourlyData.slice(0, 24);

    // Clear existing content
    this.hourlyScroll.innerHTML = "";

    // Create hourly items
    next24Hours.forEach((hour, index) => {
      const time = new Date(hour.dt * 1000);
      const temp = this.convertTemperature(hour.temp);

      const hourItem = document.createElement("div");
      hourItem.className = "hourly-item";
      hourItem.innerHTML = `
                <div class="hour-time">${
                  index === 0 ? "Now" : this.formatTime(time)
                }</div>
                <div class="hour-icon">
                    <img src="https://openweathermap.org/img/wn/${
                      hour.weather[0].icon
                    }.png" alt="${hour.weather[0].description}">
                </div>
                <div class="hour-temp">${Math.round(temp)}°</div>
                <div class="hour-humidity">${hour.humidity}%</div>
            `;

      this.hourlyScroll.appendChild(hourItem);
    });

    // Create temperature chart
    this.createTemperatureChart(next24Hours);
  }

  updateDailyForecast(dailyData) {
    const next5Days = dailyData.slice(0, 5);

    this.dailyForecastList.innerHTML = next5Days
      .map((day, index) => {
        const date = new Date(day.dt * 1000);
        const minTemp = this.convertTemperature(day.temp.min);
        const maxTemp = this.convertTemperature(day.temp.max);

        return `
                <div class="forecast-item">
                    <div class="forecast-day">
                        ${index === 0 ? "Today" : this.formatDayName(date)}
                    </div>
                    <div class="forecast-icon">
                        <img src="https://openweathermap.org/img/wn/${
                          day.weather[0].icon
                        }.png" alt="${day.weather[0].description}">
                    </div>
                    <div class="forecast-description">
                        ${this.capitalizeWords(day.weather[0].description)}
                    </div>
                    <div class="forecast-temps">
                        <span class="temp-max">${Math.round(maxTemp)}°</span>
                        <span class="temp-min">${Math.round(minTemp)}°</span>
                    </div>
                    <div class="forecast-details">
                        <span title="Humidity">💧 ${day.humidity}%</span>
                        <span title="Wind">${this.convertWindSpeed(
                          day.wind_speed
                        )} ${this.getWindSpeedUnit()}</span>
                    </div>
                </div>
            `;
      })
      .join("");
  }

  updateAdditionalInfo(current, detailed) {
    // Sun times
    const sunrise = new Date(current.sys.sunrise * 1000);
    const sunset = new Date(current.sys.sunset * 1000);
    this.sunriseTime.textContent = this.formatTime(sunrise);
    this.sunsetTime.textContent = this.formatTime(sunset);

    // Wind details
    this.windSpeedDetail.textContent = `${this.convertWindSpeed(
      current.wind.speed
    )} ${this.getWindSpeedUnit()}`;
    this.windGust.textContent = current.wind.gust
      ? `${this.convertWindSpeed(current.wind.gust)} ${this.getWindSpeedUnit()}`
      : "N/A";

    this.windDirection.textContent = this.getWindDirection(current.wind.deg);
    this.windArrow.style.transform = `rotate(${current.wind.deg}deg)`;

    // Temperature range
    const minTemp = this.convertTemperature(current.main.temp_min);
    const maxTemp = this.convertTemperature(current.main.temp_max);
    const currentTemp = this.convertTemperature(current.main.temp);

    this.tempMin.textContent = `${Math.round(minTemp)}°`;
    this.tempMax.textContent = `${Math.round(maxTemp)}°`;

    // Temperature bar
    const range = maxTemp - minTemp;
    const position = range > 0 ? ((currentTemp - minTemp) / range) * 100 : 50;
    this.tempBarFill.style.width = `${Math.max(5, Math.min(95, position))}%`;
  }

  createTemperatureChart(hourlyData) {
    // Simple temperature chart using CSS
    const maxTemp = Math.max(...hourlyData.map((h) => h.temp));
    const minTemp = Math.min(...hourlyData.map((h) => h.temp));
    const range = maxTemp - minTemp || 1;

    this.hourlyChart.innerHTML = `
            <div class="chart-line">
                ${hourlyData
                  .map((hour, index) => {
                    const temp = this.convertTemperature(hour.temp);
                    const height =
                      ((temp - this.convertTemperature(minTemp)) /
                        this.convertTemperature(range)) *
                      100;
                    return `
                        <div class="chart-point" style="height: ${height}%; left: ${
                      (index / (hourlyData.length - 1)) * 100
                    }%">
                            <div class="chart-value">${Math.round(temp)}°</div>
                        </div>
                    `;
                  })
                  .join("")}
            </div>
        `;
  }

  // Utility methods
  convertTemperature(temp) {
    return this.settings.units === "imperial" ? (temp * 9) / 5 + 32 : temp;
  }

  convertWindSpeed(speed) {
    return this.settings.units === "imperial"
      ? (speed * 2.237).toFixed(1)
      : speed.toFixed(1);
  }

  getTemperatureUnit() {
    return this.settings.units === "imperial" ? "F" : "C";
  }

  getWindSpeedUnit() {
    return this.settings.units === "imperial" ? "mph" : "km/h";
  }

  getWindDirection(degrees) {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  }

  getAirQualityText(uvi) {
    if (uvi <= 2) return "Good";
    if (uvi <= 5) return "Moderate";
    if (uvi <= 7) return "High";
    if (uvi <= 10) return "Very High";
    return "Extreme";
  }

  formatDateTime(date) {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  formatTime(date) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  formatDayName(date) {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  }

  capitalizeWords(str) {
    return str.replace(/\b\w/g, (l) => l.toUpperCase());
  }

  // UI State Management
  showLoading() {
    this.loadingOverlay.classList.remove("hidden");
    this.errorMessage.classList.add("hidden");
    this.refreshBtn.disabled = true;
  }

  hideLoading() {
    this.loadingOverlay.classList.add("hidden");
    this.refreshBtn.disabled = false;
  }

  showError(message) {
    this.hideLoading();
    this.errorText.textContent = message;
    this.errorMessage.classList.remove("hidden");
    this.weatherContent.classList.add("hidden");
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add("show"), 100);
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  showWelcomeMessage() {
    this.weatherContent.innerHTML = `
            <div class="welcome-message">
                <h2>🌦️ Welcome to Weather Dashboard</h2>
                <p>Search for a city or use your current location to get started!</p>
                <div class="welcome-actions">
                    <button onclick="todoApp.getCurrentLocationWeather()" class="welcome-btn">📍 Use Current Location</button>
                    <div class="popular-cities">
                        <h4>Popular Cities:</h4>
                        <div class="city-buttons">
                            ${["New York", "London", "Tokyo", "Paris", "Sydney"]
                              .map(
                                (city) =>
                                  `<button onclick="todoApp.searchWeather('${city}')" class="city-btn">${city}</button>`
                              )
                              .join("")}
                        </div>
                    </div>
                </div>
            </div>
        `;
    this.weatherContent.classList.remove("hidden");
  }

  updateThemeBasedOnWeather(weatherMain) {
    const body = document.body;
    body.className = body.className.replace(/weather-\w+/g, "");

    const weatherThemes = {
      Clear: "weather-clear",
      Clouds: "weather-cloudy",
      Rain: "weather-rainy",
      Snow: "weather-snowy",
      Thunderstorm: "weather-stormy",
      Drizzle: "weather-drizzle",
      Mist: "weather-misty",
      Fog: "weather-foggy",
    };

    const themeClass = weatherThemes[weatherMain] || "weather-default";
    body.classList.add(themeClass);
  }

  // More methods continue...
  // [Additional methods for search suggestions, favorites, settings, etc.]
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  window.weatherApp = new WeatherDashboard();
});
```

## 🎯 Key Learning Points

### Advanced JavaScript Concepts Demonstrated:

1. **Async/Await & Promises**: Handling API calls and asynchronous operations
2. **Fetch API**: Making HTTP requests to external services
3. **Error Handling**: Comprehensive try/catch with user-friendly error messages
4. **Local Storage**: Persisting user preferences and search history
5. **Geolocation API**: Accessing device location services
6. **Event Delegation**: Efficient event handling for dynamic content
7. **Modular Architecture**: Organized code with separate classes and responsibilities
8. **Data Transformation**: Converting API data to user-friendly formats
9. **State Management**: Managing application state and UI updates
10. **Responsive Design**: Adapting to different screen sizes and devices

### API Integration Concepts:

- **RESTful API Calls**: Understanding HTTP methods and endpoints
- **API Key Management**: Secure API authentication
- **Rate Limiting**: Handling API rate limits and quotas
- **Data Parsing**: Processing JSON responses from APIs
- **Error Handling**: Graceful handling of network failures
- **Caching Strategies**: Storing data to reduce API calls

### User Experience Features:

- **Loading States**: Visual feedback during data fetching
- **Error Recovery**: Retry mechanisms and fallback options
- **Search Autocomplete**: Dynamic search suggestions
- **Keyboard Shortcuts**: Power user features
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Screen reader support and keyboard navigation

## 🚀 What's Next?

Congratulations! You've built a sophisticated weather application that integrates with real APIs, handles complex data, and provides an excellent user experience. This project demonstrates advanced JavaScript concepts and real-world development practices.

Next, we'll create a **Mini Games Collection** - a fun project that will teach you about game development, animations, canvas manipulation, and interactive entertainment programming!

---

🌦️ **You've mastered API integration and data visualization!** This weather dashboard showcases professional-level JavaScript development with real-world API integration, error handling, and user experience design. You're now equipped to build any data-driven web application!
