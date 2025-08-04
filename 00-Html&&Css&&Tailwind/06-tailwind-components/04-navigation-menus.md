# 🧭 Navigation Menus with Tailwind

**The GPS of your website!** Navigation menus are crucial for user experience - they help visitors find what they're looking for quickly and understand your site's structure. Master navigation, and you master user flow.

## 🎯 What You'll Learn

By the end of this lesson, you'll master:

- ✅ Creating responsive navigation bars
- ✅ Building mobile-friendly hamburger menus
- ✅ Implementing dropdown menus
- ✅ Breadcrumb navigation systems
- ✅ Sidebar navigation patterns
- ✅ Accessibility best practices for navigation

## 🧭 Understanding Navigation

**Navigation is like a roadmap** - it tells users where they are, where they can go, and how to get there.

### **Types of Navigation:**

- **Primary Navigation** - Main site sections (Header menu)
- **Secondary Navigation** - Sub-sections (Dropdown menus)
- **Breadcrumb Navigation** - Current location path
- **Utility Navigation** - Account, cart, search (Top right corner)
- **Footer Navigation** - Additional links and legal pages

## 🏗️ Basic Navigation Structure

Every navigation needs these elements:

```
┌─────────────────────────────────────────┐
│ [Logo] [Home][About][Services][Contact] │ ← Primary Nav
│                        [Search][Account] │ ← Utility Nav
└─────────────────────────────────────────┘
```

### **Foundation Navigation HTML**

```html
<nav class="bg-white shadow-lg">
  <div class="max-w-6xl mx-auto px-4">
    <div class="flex justify-between items-center py-4">
      <!-- Logo -->
      <div class="flex items-center">
        <a href="#" class="text-xl font-bold text-gray-800">YourLogo</a>
      </div>

      <!-- Navigation Links -->
      <div class="hidden md:flex space-x-8">
        <a href="#" class="text-gray-600 hover:text-blue-500 transition-colors"
          >Home</a
        >
        <a href="#" class="text-gray-600 hover:text-blue-500 transition-colors"
          >About</a
        >
        <a href="#" class="text-gray-600 hover:text-blue-500 transition-colors"
          >Services</a
        >
        <a href="#" class="text-gray-600 hover:text-blue-500 transition-colors"
          >Contact</a
        >
      </div>

      <!-- Mobile menu button -->
      <div class="md:hidden">
        <button class="text-gray-600 hover:text-blue-500">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</nav>
```

## 📱 Mobile-First Navigation

### **Responsive Hamburger Menu**

```html
<nav class="bg-white shadow-lg" x-data="{ open: false }">
  <div class="max-w-6xl mx-auto px-4">
    <!-- Desktop Navigation -->
    <div class="flex justify-between items-center py-4">
      <!-- Logo -->
      <div class="flex items-center">
        <a href="#" class="text-xl font-bold text-gray-800">YourLogo</a>
      </div>

      <!-- Desktop Menu -->
      <div class="hidden md:flex space-x-8">
        <a href="#" class="text-gray-600 hover:text-blue-500 transition-colors"
          >Home</a
        >
        <a href="#" class="text-gray-600 hover:text-blue-500 transition-colors"
          >About</a
        >
        <a href="#" class="text-gray-600 hover:text-blue-500 transition-colors"
          >Services</a
        >
        <a href="#" class="text-gray-600 hover:text-blue-500 transition-colors"
          >Contact</a
        >
      </div>

      <!-- Hamburger Button -->
      <div class="md:hidden">
        <button
          @click="open = !open"
          class="text-gray-600 hover:text-blue-500 focus:outline-none"
        >
          <svg
            x-show="!open"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
          <svg
            x-show="open"
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div x-show="open" x-transition class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 bg-gray-50">
        <a
          href="#"
          class="block px-3 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 rounded-md transition-colors"
          >Home</a
        >
        <a
          href="#"
          class="block px-3 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 rounded-md transition-colors"
          >About</a
        >
        <a
          href="#"
          class="block px-3 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 rounded-md transition-colors"
          >Services</a
        >
        <a
          href="#"
          class="block px-3 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 rounded-md transition-colors"
          >Contact</a
        >
      </div>
    </div>
  </div>
</nav>
```

**Note:** This example uses Alpine.js for interactivity. For pure CSS solution, you can use the checkbox hack or implement with vanilla JavaScript.

### **CSS-Only Mobile Menu (No JavaScript)**

```html
<nav class="bg-white shadow-lg">
  <div class="max-w-6xl mx-auto px-4">
    <div class="flex justify-between items-center py-4">
      <!-- Logo -->
      <div class="flex items-center">
        <a href="#" class="text-xl font-bold text-gray-800">YourLogo</a>
      </div>

      <!-- Hidden Checkbox for Toggle -->
      <input type="checkbox" id="mobile-menu-toggle" class="hidden" />

      <!-- Desktop Menu -->
      <div class="hidden md:flex space-x-8">
        <a href="#" class="text-gray-600 hover:text-blue-500 transition-colors"
          >Home</a
        >
        <a href="#" class="text-gray-600 hover:text-blue-500 transition-colors"
          >About</a
        >
        <a href="#" class="text-gray-600 hover:text-blue-500 transition-colors"
          >Services</a
        >
        <a href="#" class="text-gray-600 hover:text-blue-500 transition-colors"
          >Contact</a
        >
      </div>

      <!-- Hamburger Button -->
      <label for="mobile-menu-toggle" class="md:hidden cursor-pointer">
        <svg
          class="w-6 h-6 text-gray-600 hover:text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </label>
    </div>

    <!-- Mobile Menu -->
    <div class="md:hidden hidden peer-checked:block" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 bg-gray-50">
        <a
          href="#"
          class="block px-3 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 rounded-md transition-colors"
          >Home</a
        >
        <a
          href="#"
          class="block px-3 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 rounded-md transition-colors"
          >About</a
        >
        <a
          href="#"
          class="block px-3 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 rounded-md transition-colors"
          >Services</a
        >
        <a
          href="#"
          class="block px-3 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 rounded-md transition-colors"
          >Contact</a
        >
      </div>
    </div>
  </div>
</nav>

<!-- Add this CSS -->
<style>
  #mobile-menu-toggle:checked ~ #mobile-menu {
    display: block;
  }
</style>
```

## 🔽 Dropdown Navigation

### **Hover Dropdown Menu**

```html
<nav class="bg-white shadow-lg">
  <div class="max-w-6xl mx-auto px-4">
    <div class="flex justify-between items-center py-4">
      <!-- Logo -->
      <div class="flex items-center">
        <a href="#" class="text-xl font-bold text-gray-800">YourLogo</a>
      </div>

      <!-- Navigation with Dropdown -->
      <div class="hidden md:flex space-x-8">
        <a href="#" class="text-gray-600 hover:text-blue-500 transition-colors"
          >Home</a
        >
        <a href="#" class="text-gray-600 hover:text-blue-500 transition-colors"
          >About</a
        >

        <!-- Dropdown Menu -->
        <div class="relative group">
          <a
            href="#"
            class="text-gray-600 hover:text-blue-500 transition-colors flex items-center"
          >
            Services
            <svg
              class="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </a>

          <!-- Dropdown Content -->
          <div
            class="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20"
          >
            <div class="py-2">
              <a
                href="#"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
                >Web Development</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
                >Mobile Apps</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
                >UI/UX Design</a
              >
              <a
                href="#"
                class="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-blue-500 transition-colors"
                >Consulting</a
              >
            </div>
          </div>
        </div>

        <a href="#" class="text-gray-600 hover:text-blue-500 transition-colors"
          >Contact</a
        >
      </div>
    </div>
  </div>
</nav>
```

### **Mega Menu (Multi-Column Dropdown)**

```html
<div class="relative group">
  <a
    href="#"
    class="text-gray-600 hover:text-blue-500 transition-colors flex items-center"
  >
    Solutions
    <svg
      class="w-4 h-4 ml-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      ></path>
    </svg>
  </a>

  <!-- Mega Menu Content -->
  <div
    class="absolute top-full left-0 mt-2 w-96 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20"
  >
    <div class="p-6">
      <div class="grid grid-cols-2 gap-6">
        <!-- Column 1 -->
        <div>
          <h3 class="text-sm font-semibold text-gray-800 mb-3">Development</h3>
          <div class="space-y-2">
            <a
              href="#"
              class="block text-sm text-gray-600 hover:text-blue-500 transition-colors"
              >Frontend</a
            >
            <a
              href="#"
              class="block text-sm text-gray-600 hover:text-blue-500 transition-colors"
              >Backend</a
            >
            <a
              href="#"
              class="block text-sm text-gray-600 hover:text-blue-500 transition-colors"
              >Full Stack</a
            >
          </div>
        </div>

        <!-- Column 2 -->
        <div>
          <h3 class="text-sm font-semibold text-gray-800 mb-3">Design</h3>
          <div class="space-y-2">
            <a
              href="#"
              class="block text-sm text-gray-600 hover:text-blue-500 transition-colors"
              >UI Design</a
            >
            <a
              href="#"
              class="block text-sm text-gray-600 hover:text-blue-500 transition-colors"
              >UX Research</a
            >
            <a
              href="#"
              class="block text-sm text-gray-600 hover:text-blue-500 transition-colors"
              >Branding</a
            >
          </div>
        </div>
      </div>

      <!-- Featured Item -->
      <div class="mt-6 pt-6 border-t border-gray-200">
        <a
          href="#"
          class="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          <span class="mr-2">🚀</span>
          View All Solutions
        </a>
      </div>
    </div>
  </div>
</div>
```

## 🍞 Breadcrumb Navigation

### **Basic Breadcrumb**

```html
<nav class="bg-gray-50 px-4 py-3 text-gray-700">
  <div class="max-w-6xl mx-auto">
    <ol class="list-none p-0 inline-flex">
      <li class="flex items-center">
        <a href="#" class="text-blue-500 hover:text-blue-700">Home</a>
      </li>
      <li class="flex items-center">
        <svg
          class="w-4 h-4 mx-2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
        <a href="#" class="text-blue-500 hover:text-blue-700">Products</a>
      </li>
      <li class="flex items-center">
        <svg
          class="w-4 h-4 mx-2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
        <a href="#" class="text-blue-500 hover:text-blue-700">Electronics</a>
      </li>
      <li class="flex items-center">
        <svg
          class="w-4 h-4 mx-2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
        <span class="text-gray-500">Smartphones</span>
      </li>
    </ol>
  </div>
</nav>
```

### **Advanced Breadcrumb with Icons**

```html
<nav class="bg-white border-b px-4 py-3">
  <div class="max-w-6xl mx-auto">
    <ol class="flex items-center space-x-2 text-sm">
      <li class="flex items-center">
        <a
          href="#"
          class="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
        >
          <svg
            class="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
            ></path>
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 21l4-7 4 7"
            ></path>
          </svg>
          Dashboard
        </a>
      </li>
      <li class="flex items-center">
        <svg
          class="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </li>
      <li class="flex items-center">
        <a href="#" class="text-blue-500 hover:text-blue-700 transition-colors"
          >Users</a
        >
      </li>
      <li class="flex items-center">
        <svg
          class="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </li>
      <li class="text-gray-500">John Doe</li>
    </ol>
  </div>
</nav>
```

## 📑 Sidebar Navigation

### **Vertical Sidebar Menu**

```html
<div class="flex h-screen bg-gray-100">
  <!-- Sidebar -->
  <div class="w-64 bg-white shadow-lg">
    <!-- Logo -->
    <div class="p-6 border-b">
      <h1 class="text-xl font-bold text-gray-800">Dashboard</h1>
    </div>

    <!-- Navigation -->
    <nav class="mt-6">
      <div class="px-4 space-y-2">
        <!-- Active Item -->
        <a
          href="#"
          class="flex items-center px-4 py-3 text-blue-700 bg-blue-50 rounded-lg"
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
            ></path>
          </svg>
          Overview
        </a>

        <!-- Regular Items -->
        <a
          href="#"
          class="flex items-center px-4 py-3 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
            ></path>
          </svg>
          Users
        </a>

        <a
          href="#"
          class="flex items-center px-4 py-3 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            ></path>
          </svg>
          Products
        </a>

        <a
          href="#"
          class="flex items-center px-4 py-3 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <svg
            class="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            ></path>
          </svg>
          Analytics
        </a>
      </div>

      <!-- Section Divider -->
      <div class="px-4 mt-8">
        <h3
          class="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider"
        >
          Settings
        </h3>
        <div class="mt-4 space-y-2">
          <a
            href="#"
            class="flex items-center px-4 py-3 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <svg
              class="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            Settings
          </a>

          <a
            href="#"
            class="flex items-center px-4 py-3 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <svg
              class="w-5 h-5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>
            Logout
          </a>
        </div>
      </div>
    </nav>
  </div>

  <!-- Main Content -->
  <div class="flex-1 p-8">
    <h1 class="text-2xl font-bold text-gray-800">Main Content Area</h1>
    <p class="text-gray-600 mt-2">Your page content goes here...</p>
  </div>
</div>
```

### **Collapsible Sidebar**

```html
<div x-data="{ sidebarOpen: true }" class="flex h-screen bg-gray-100">
  <!-- Sidebar -->
  <div
    class="flex-shrink-0 transition-all duration-300"
    :class="sidebarOpen ? 'w-64' : 'w-20'"
  >
    <div class="h-full bg-white shadow-lg">
      <!-- Header with Toggle -->
      <div class="p-4 border-b flex items-center justify-between">
        <h1 x-show="sidebarOpen" class="text-xl font-bold text-gray-800">
          Dashboard
        </h1>
        <button
          @click="sidebarOpen = !sidebarOpen"
          class="text-gray-600 hover:text-blue-500"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="mt-4">
        <div class="px-4 space-y-2">
          <a
            href="#"
            class="flex items-center px-4 py-3 text-blue-700 bg-blue-50 rounded-lg"
          >
            <svg
              class="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
              ></path>
            </svg>
            <span x-show="sidebarOpen" class="ml-3">Overview</span>
          </a>

          <a
            href="#"
            class="flex items-center px-4 py-3 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <svg
              class="w-5 h-5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              ></path>
            </svg>
            <span x-show="sidebarOpen" class="ml-3">Users</span>
          </a>
        </div>
      </nav>
    </div>
  </div>

  <!-- Main Content -->
  <div class="flex-1 p-8">
    <h1 class="text-2xl font-bold text-gray-800">Main Content</h1>
  </div>
</div>
```

## ♿ Accessibility Best Practices

### **ARIA Labels and Roles**

```html
<nav role="navigation" aria-label="Main navigation">
  <div class="max-w-6xl mx-auto px-4">
    <div class="flex justify-between items-center py-4">
      <!-- Logo -->
      <div class="flex items-center">
        <a href="#" aria-label="YourLogo - Home">
          <span class="text-xl font-bold text-gray-800">YourLogo</span>
        </a>
      </div>

      <!-- Navigation Links -->
      <ul role="menubar" class="hidden md:flex space-x-8">
        <li role="none">
          <a
            href="#"
            role="menuitem"
            class="text-gray-600 hover:text-blue-500 transition-colors"
            >Home</a
          >
        </li>
        <li role="none">
          <a
            href="#"
            role="menuitem"
            class="text-gray-600 hover:text-blue-500 transition-colors"
            aria-current="page"
            >About</a
          >
        </li>
        <li role="none">
          <a
            href="#"
            role="menuitem"
            class="text-gray-600 hover:text-blue-500 transition-colors"
            >Services</a
          >
        </li>
        <li role="none">
          <a
            href="#"
            role="menuitem"
            class="text-gray-600 hover:text-blue-500 transition-colors"
            >Contact</a
          >
        </li>
      </ul>

      <!-- Mobile menu button -->
      <button
        class="md:hidden text-gray-600 hover:text-blue-500"
        aria-label="Toggle mobile menu"
        aria-expanded="false"
        aria-controls="mobile-menu"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</nav>
```

### **Keyboard Navigation Support**

```html
<nav class="bg-white shadow-lg">
  <div class="max-w-6xl mx-auto px-4">
    <div class="flex justify-between items-center py-4">
      <!-- Logo -->
      <div class="flex items-center">
        <a
          href="#"
          class="text-xl font-bold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        >
          YourLogo
        </a>
      </div>

      <!-- Navigation Links with Focus States -->
      <div class="hidden md:flex space-x-8">
        <a
          href="#"
          class="text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:text-blue-500 px-2 py-1 rounded transition-colors"
        >
          Home
        </a>
        <a
          href="#"
          class="text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:text-blue-500 px-2 py-1 rounded transition-colors"
        >
          About
        </a>
        <a
          href="#"
          class="text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:text-blue-500 px-2 py-1 rounded transition-colors"
        >
          Services
        </a>
        <a
          href="#"
          class="text-gray-600 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:text-blue-500 px-2 py-1 rounded transition-colors"
        >
          Contact
        </a>
      </div>
    </div>
  </div>
</nav>
```

## 🎯 Navigation Best Practices

### **1. Clear Visual Hierarchy**

```html
<!-- ✅ Good: Clear active state -->
<a href="#" class="text-blue-700 bg-blue-50 px-3 py-2 rounded font-medium"
  >Current Page</a
>
<a href="#" class="text-gray-600 hover:text-blue-500 px-3 py-2 rounded"
  >Other Page</a
>

<!-- ❌ Bad: No clear active state -->
<a href="#" class="text-blue-500">Current Page</a>
<a href="#" class="text-gray-600">Other Page</a>
```

### **2. Consistent Spacing**

```html
<!-- ✅ Good: Consistent spacing -->
<div class="space-x-8">
  <a href="#">Link 1</a>
  <a href="#">Link 2</a>
  <a href="#">Link 3</a>
</div>

<!-- ❌ Bad: Inconsistent spacing -->
<div>
  <a href="#" class="mr-4">Link 1</a>
  <a href="#" class="mr-8">Link 2</a>
  <a href="#" class="mr-2">Link 3</a>
</div>
```

### **3. Mobile-First Approach**

```html
<!-- ✅ Good: Hidden on mobile, shown on desktop -->
<div class="hidden md:flex space-x-8">
  <!-- Desktop navigation -->
</div>

<!-- ✅ Good: Shown on mobile, hidden on desktop -->
<div class="md:hidden">
  <!-- Mobile menu button -->
</div>
```

## 🎯 Mission Complete!

You now master navigation systems:

- ✅ **Basic navigation** - Header menus with proper structure
- ✅ **Mobile navigation** - Responsive hamburger menus
- ✅ **Dropdown menus** - Single and multi-level dropdowns
- ✅ **Breadcrumb navigation** - Location awareness for users
- ✅ **Sidebar navigation** - Dashboard and app-style menus
- ✅ **Accessibility** - ARIA labels, keyboard navigation, focus states

## 🚀 What's Next?

In the next lesson, we'll learn about **hero sections** - the eye-catching headers that make powerful first impressions!

---

**💡 Pro Tip:** Great navigation is invisible - users should never have to think about how to navigate your site. It should feel natural and intuitive.

**🧭 Remember:** Navigation is about user flow, not just links. Think about the user's journey and make each step clear and obvious.
