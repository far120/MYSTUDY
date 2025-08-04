# 🌙 Dark Mode Implementation

**Light and shadow in perfect harmony!** Dark mode isn't just trendy - it's essential for modern applications. Learn to create seamless theme switching that your users will love and actually use.

## 🎯 What You'll Learn

By the end of this lesson, you'll master:

- ✅ Implementing dark mode with Tailwind
- ✅ Creating accessible color schemes
- ✅ Building theme toggle components
- ✅ System preference detection
- ✅ Persistent theme storage
- ✅ Smooth theme transitions

## 🌗 Understanding Dark Mode

**Dark mode is about more than just aesthetics.** It reduces eye strain in low light, saves battery on OLED screens, and provides better focus for content. Modern users expect this feature.

### **When to Use Dark Mode:**

- **Text-heavy applications** - Easier reading in low light
- **Creative tools** - Better color accuracy and focus
- **Entertainment apps** - More immersive experience
- **Development tools** - Reduced eye strain during long sessions
- **Mobile apps** - Battery saving on OLED screens

## 🛠️ Tailwind Dark Mode Setup

### **1. Enable Dark Mode in Config**

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class", // or 'media' for system preference only
  theme: {
    extend: {
      colors: {
        // Custom dark mode colors
        dark: {
          100: "#1e293b",
          200: "#334155",
          300: "#475569",
          400: "#64748b",
          500: "#94a3b8",
          600: "#cbd5e1",
          700: "#e2e8f0",
          800: "#f1f5f9",
          900: "#f8fafc",
        },
      },
    },
  },
  plugins: [],
};
```

### **2. Basic Dark Mode Classes**

```html
<!-- Light and dark variants -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  <h1 class="text-2xl font-bold">Theme-Aware Content</h1>
  <p class="text-gray-600 dark:text-gray-300">
    This text changes color based on the theme.
  </p>
</div>

<!-- Backgrounds -->
<div class="bg-gray-50 dark:bg-gray-800">Light gray / Dark gray</div>
<div class="bg-white dark:bg-gray-900">White / Very dark</div>

<!-- Text colors -->
<h1 class="text-gray-900 dark:text-white">Primary text</h1>
<p class="text-gray-600 dark:text-gray-300">Secondary text</p>
<span class="text-gray-400 dark:text-gray-500">Muted text</span>

<!-- Borders -->
<div class="border border-gray-200 dark:border-gray-700">Themed border</div>

<!-- Shadows -->
<div class="shadow-lg dark:shadow-none">Light shadow only</div>
<div class="shadow-lg dark:shadow-2xl dark:shadow-gray-900/50">
  Enhanced dark shadow
</div>
```

## 🎨 Creating a Color System

### **3. Semantic Dark Mode Colors**

```javascript
// tailwind.config.js - Semantic color system
module.exports = {
  theme: {
    extend: {
      colors: {
        // Theme-aware semantic colors
        primary: {
          light: "#3b82f6",
          dark: "#60a5fa",
        },
        secondary: {
          light: "#6b7280",
          dark: "#9ca3af",
        },
        success: {
          light: "#10b981",
          dark: "#34d399",
        },
        warning: {
          light: "#f59e0b",
          dark: "#fbbf24",
        },
        error: {
          light: "#ef4444",
          dark: "#f87171",
        },
        // Surface colors
        surface: {
          light: "#ffffff",
          dark: "#1f2937",
        },
        "surface-secondary": {
          light: "#f9fafb",
          dark: "#111827",
        },
      },
    },
  },
};
```

### **4. Using Semantic Colors**

```html
<!-- Theme-aware components -->
<div
  class="bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-gray-700 rounded-lg p-6"
>
  <h2 class="text-gray-900 dark:text-white text-xl font-bold mb-4">
    Semantic Color Card
  </h2>

  <!-- Status indicators -->
  <div class="space-y-3">
    <div class="flex items-center text-success-light dark:text-success-dark">
      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        />
      </svg>
      Success message
    </div>

    <div class="flex items-center text-warning-light dark:text-warning-dark">
      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        />
      </svg>
      Warning message
    </div>

    <div class="flex items-center text-error-light dark:text-error-dark">
      <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        />
      </svg>
      Error message
    </div>
  </div>
</div>
```

## 🔄 Theme Toggle Implementation

### **5. Simple Toggle Button**

```html
<!-- HTML Structure -->
<button
  id="theme-toggle"
  class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
>
  <!-- Sun icon (visible in dark mode) -->
  <svg
    class="w-5 h-5 hidden dark:block"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    ></path>
  </svg>

  <!-- Moon icon (visible in light mode) -->
  <svg
    class="w-5 h-5 block dark:hidden"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    ></path>
  </svg>
</button>

<script>
  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle");
  const html = document.documentElement;

  // Check for saved theme or default to system preference
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme) {
    html.classList.toggle("dark", savedTheme === "dark");
  } else {
    html.classList.toggle("dark", systemPrefersDark);
  }

  // Toggle theme function
  function toggleTheme() {
    const isDark = html.classList.contains("dark");
    html.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", isDark ? "light" : "dark");
  }

  themeToggle.addEventListener("click", toggleTheme);

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        html.classList.toggle("dark", e.matches);
      }
    });
</script>
```

### **6. Advanced Toggle with Animation**

```html
<!-- Animated Toggle Component -->
<div class="flex items-center space-x-3">
  <span class="text-sm text-gray-600 dark:text-gray-300">Light</span>

  <!-- Toggle Switch -->
  <button
    id="animated-toggle"
    class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    <!-- Toggle Circle -->
    <span
      class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 translate-x-1 dark:translate-x-6 shadow-lg"
    >
    </span>
  </button>

  <span class="text-sm text-gray-600 dark:text-gray-300">Dark</span>
</div>

<!-- Alternative: Icon-based Toggle -->
<button
  id="icon-toggle"
  class="relative p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-300 hover:scale-110"
>
  <div class="relative w-6 h-6">
    <!-- Sun Icon -->
    <svg
      class="absolute inset-0 w-6 h-6 text-yellow-500 transition-all duration-300 rotate-0 scale-100 dark:rotate-90 dark:scale-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      ></path>
    </svg>

    <!-- Moon Icon -->
    <svg
      class="absolute inset-0 w-6 h-6 text-blue-400 transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      ></path>
    </svg>
  </div>
</button>
```

## 🎨 Component Examples

### **7. Dark Mode Navigation**

```html
<nav
  class="bg-white dark:bg-gray-900 shadow-lg dark:shadow-gray-900/50 transition-colors duration-200"
>
  <div class="max-w-6xl mx-auto px-4">
    <div class="flex justify-between items-center py-4">
      <!-- Logo -->
      <div class="flex items-center">
        <h1 class="text-xl font-bold text-gray-900 dark:text-white">Brand</h1>
      </div>

      <!-- Navigation Links -->
      <div class="hidden md:flex space-x-8">
        <a
          href="#"
          class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        >
          Home
        </a>
        <a
          href="#"
          class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        >
          About
        </a>
        <a
          href="#"
          class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        >
          Services
        </a>
        <a
          href="#"
          class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        >
          Contact
        </a>
      </div>

      <!-- Theme Toggle -->
      <div class="flex items-center space-x-4">
        <button
          id="nav-theme-toggle"
          class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          <svg
            class="w-5 h-5 hidden dark:block"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
          <svg
            class="w-5 h-5 block dark:hidden"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</nav>
```

### **8. Dark Mode Cards**

```html
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Basic Card -->
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/50 p-6 transition-all duration-200 hover:shadow-xl dark:hover:shadow-gray-900/70"
  >
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      Basic Card
    </h3>
    <p class="text-gray-600 dark:text-gray-300 mb-4">
      This card adapts to both light and dark themes seamlessly.
    </p>
    <button
      class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
    >
      Action
    </button>
  </div>

  <!-- Image Card -->
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/50 overflow-hidden transition-all duration-200"
  >
    <img
      src="https://via.placeholder.com/400x200"
      alt="Card image"
      class="w-full h-48 object-cover"
    />
    <div class="p-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Image Card
      </h3>
      <p class="text-gray-600 dark:text-gray-300 text-sm">
        Beautiful imagery with dark mode support.
      </p>
    </div>
  </div>

  <!-- Status Card -->
  <div
    class="bg-white dark:bg-gray-800 border-l-4 border-green-500 dark:border-green-400 rounded-lg shadow-lg dark:shadow-gray-900/50 p-6"
  >
    <div class="flex items-center mb-3">
      <div
        class="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3"
      >
        <svg
          class="w-4 h-4 text-green-600 dark:text-green-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Success
      </h3>
    </div>
    <p class="text-gray-600 dark:text-gray-300 text-sm">
      Operation completed successfully.
    </p>
  </div>
</div>
```

### **9. Dark Mode Forms**

```html
<form
  class="max-w-md mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg dark:shadow-gray-900/50"
>
  <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
    Contact Form
  </h2>

  <!-- Name Input -->
  <div class="mb-4">
    <label
      for="name"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    >
      Name
    </label>
    <input
      type="text"
      id="name"
      name="name"
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
      placeholder="Your name"
    />
  </div>

  <!-- Email Input -->
  <div class="mb-4">
    <label
      for="email"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    >
      Email
    </label>
    <input
      type="email"
      id="email"
      name="email"
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
      placeholder="your@email.com"
    />
  </div>

  <!-- Message Textarea -->
  <div class="mb-6">
    <label
      for="message"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    >
      Message
    </label>
    <textarea
      id="message"
      name="message"
      rows="4"
      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
      placeholder="Your message..."
    ></textarea>
  </div>

  <!-- Submit Button -->
  <button
    type="submit"
    class="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
  >
    Send Message
  </button>
</form>
```

## 🎨 Advanced Dark Mode Features

### **10. System Theme Detection**

```javascript
// Advanced theme management
class ThemeManager {
  constructor() {
    this.theme = this.getInitialTheme();
    this.applyTheme();
    this.setupEventListeners();
  }

  getInitialTheme() {
    // Priority: saved preference > system preference > default light
    const saved = localStorage.getItem("theme");
    if (saved && ["light", "dark"].includes(saved)) {
      return saved;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  applyTheme() {
    document.documentElement.classList.toggle("dark", this.theme === "dark");
    document.documentElement.setAttribute("data-theme", this.theme);
  }

  toggleTheme() {
    this.theme = this.theme === "light" ? "dark" : "light";
    this.applyTheme();
    localStorage.setItem("theme", this.theme);

    // Dispatch custom event for components to react
    window.dispatchEvent(
      new CustomEvent("themeChanged", {
        detail: { theme: this.theme },
      })
    );
  }

  setupEventListeners() {
    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          this.theme = e.matches ? "dark" : "light";
          this.applyTheme();
        }
      });

    // Listen for theme toggle clicks
    document.addEventListener("click", (e) => {
      if (e.target.matches("[data-theme-toggle]")) {
        this.toggleTheme();
      }
    });
  }
}

// Initialize theme manager
const themeManager = new ThemeManager();
```

### **11. Smooth Theme Transitions**

```css
/* Add to your CSS for smooth transitions */
* {
  transition: background-color 0.3s ease, border-color 0.3s ease,
    color 0.3s ease, box-shadow 0.3s ease;
}

/* Prevent transition on theme load */
.theme-transitioning * {
  transition: none !important;
}
```

```javascript
// Smooth theme switching
function smoothThemeToggle() {
  // Add transition class
  document.documentElement.classList.add("theme-transitioning");

  // Remove it after a short delay
  setTimeout(() => {
    document.documentElement.classList.remove("theme-transitioning");
  }, 50);

  // Toggle theme
  themeManager.toggleTheme();
}
```

### **12. Theme-Aware Images**

```html
<!-- Different images for different themes -->
<picture>
  <!-- Dark theme image -->
  <source srcset="hero-dark.jpg" media="(prefers-color-scheme: dark)" />
  <!-- Light theme image (default) -->
  <img
    src="hero-light.jpg"
    alt="Hero image"
    class="w-full h-64 object-cover rounded-lg"
  />
</picture>

<!-- Logo that changes with theme -->
<div class="flex items-center">
  <!-- Light theme logo -->
  <img src="logo-light.svg" alt="Brand" class="h-8 w-auto block dark:hidden" />
  <!-- Dark theme logo -->
  <img src="logo-dark.svg" alt="Brand" class="h-8 w-auto hidden dark:block" />
</div>

<!-- SVG with theme-aware colors -->
<svg
  class="w-12 h-12 text-blue-600 dark:text-blue-400"
  fill="currentColor"
  viewBox="0 0 20 20"
>
  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
```

## ♿ Accessibility Considerations

### **13. Accessible Dark Mode**

```html
<!-- Proper ARIA labels -->
<button
  aria-label="Toggle dark mode"
  aria-pressed="false"
  data-theme-toggle
  class="p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
>
  <span class="sr-only">Toggle theme</span>
  <!-- Icons here -->
</button>

<!-- Accessible form controls -->
<fieldset class="border border-gray-300 dark:border-gray-600 rounded-lg p-4">
  <legend class="text-sm font-medium text-gray-900 dark:text-white px-2">
    Theme Preference
  </legend>

  <div class="space-y-2">
    <label class="flex items-center">
      <input
        type="radio"
        name="theme"
        value="light"
        class="text-blue-600 focus:ring-blue-500"
      />
      <span class="ml-2 text-gray-700 dark:text-gray-300">Light</span>
    </label>

    <label class="flex items-center">
      <input
        type="radio"
        name="theme"
        value="dark"
        class="text-blue-600 focus:ring-blue-500"
      />
      <span class="ml-2 text-gray-700 dark:text-gray-300">Dark</span>
    </label>

    <label class="flex items-center">
      <input
        type="radio"
        name="theme"
        value="system"
        class="text-blue-600 focus:ring-blue-500"
      />
      <span class="ml-2 text-gray-700 dark:text-gray-300">System</span>
    </label>
  </div>
</fieldset>
```

## 🎯 Complete Dark Mode Example

### **14. Full Page with Dark Mode**

```html
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dark Mode Demo</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "surface-light": "#ffffff",
              "surface-dark": "#1f2937",
            },
          },
        },
      };
    </script>
  </head>
  <body
    class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300"
  >
    <!-- Navigation -->
    <nav class="bg-white dark:bg-gray-800 shadow-lg">
      <div class="max-w-6xl mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-xl font-bold">Dark Mode Demo</h1>

          <!-- Theme Toggle -->
          <button
            id="theme-toggle"
            class="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            <svg
              class="w-5 h-5 block dark:hidden"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              ></path>
            </svg>
            <svg
              class="w-5 h-5 hidden dark:block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-4 py-8">
      <!-- Hero Section -->
      <section class="text-center py-16">
        <h1 class="text-5xl font-bold mb-6">
          Beautiful
          <span class="text-blue-600 dark:text-blue-400">Dark Mode</span>
          Experience
        </h1>
        <p
          class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Seamlessly switch between light and dark themes with smooth
          transitions and perfect accessibility.
        </p>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
        >
          Get Started
        </button>
      </section>

      <!-- Feature Cards -->
      <section class="grid md:grid-cols-3 gap-8 py-16">
        <div
          class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg dark:shadow-gray-900/50"
        >
          <div
            class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4"
          >
            <svg
              class="w-6 h-6 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">Fast Performance</h3>
          <p class="text-gray-600 dark:text-gray-300">
            Lightning-fast theme switching with optimized transitions.
          </p>
        </div>

        <div
          class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg dark:shadow-gray-900/50"
        >
          <div
            class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4"
          >
            <svg
              class="w-6 h-6 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">Accessible</h3>
          <p class="text-gray-600 dark:text-gray-300">
            WCAG compliant color combinations and proper contrast ratios.
          </p>
        </div>

        <div
          class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg dark:shadow-gray-900/50"
        >
          <div
            class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4"
          >
            <svg
              class="w-6 h-6 text-purple-600 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 13h8m-8-4h4"
              ></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">Customizable</h3>
          <p class="text-gray-600 dark:text-gray-300">
            Easy to customize colors and components for your brand.
          </p>
        </div>
      </section>
    </main>

    <script>
      // Theme management
      const themeToggle = document.getElementById("theme-toggle");
      const html = document.documentElement;

      // Initialize theme
      const savedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (savedTheme) {
        html.classList.toggle("dark", savedTheme === "dark");
      } else {
        html.classList.toggle("dark", systemPrefersDark);
      }

      // Toggle function
      function toggleTheme() {
        const isDark = html.classList.contains("dark");
        html.classList.toggle("dark", !isDark);
        localStorage.setItem("theme", isDark ? "light" : "dark");
      }

      themeToggle.addEventListener("click", toggleTheme);

      // System theme changes
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          if (!localStorage.getItem("theme")) {
            html.classList.toggle("dark", e.matches);
          }
        });
    </script>
  </body>
</html>
```

## 🎯 Mission Complete!

You now master dark mode implementation:

- ✅ **Tailwind dark mode** - Proper configuration and setup
- ✅ **Color systems** - Semantic and accessible color schemes
- ✅ **Theme toggles** - Interactive switching components
- ✅ **System detection** - Respecting user preferences
- ✅ **Persistent storage** - Saving user theme choices
- ✅ **Smooth transitions** - Polished switching experience

## 🚀 What's Next?

In the next lesson, we'll learn about **performance optimization** - making your beautiful, themed websites load lightning fast!

---

**💡 Pro Tip:** Dark mode isn't just about inverting colors - it's about creating a cohesive experience that feels intentionally designed for low-light environments.

**🌙 Remember:** Always test your dark mode in actual low-light conditions to ensure it provides the comfort and readability users expect.
