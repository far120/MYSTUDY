# ✨ Animations & Transitions

**Bringing your designs to life!** Motion is what transforms static layouts into engaging, interactive experiences. Master animations and transitions to create websites that feel alive and responsive to user interactions.

## 🎯 What You'll Learn

By the end of this lesson, you'll master:

- ✅ CSS transitions for smooth interactions
- ✅ Tailwind's animation utilities
- ✅ Custom keyframe animations
- ✅ Hover and focus effects
- ✅ Loading animations and spinners
- ✅ Performance-optimized animations

## 🌊 Understanding Motion Design

**Motion tells a story.** Every animation should have a purpose - guiding attention, providing feedback, or creating delight. Good animations feel natural and enhance the user experience.

### **Motion Principles:**

- **Purpose** - Every animation should solve a problem
- **Timing** - Fast enough to feel responsive, slow enough to follow
- **Easing** - Natural acceleration and deceleration
- **Consistency** - Similar elements move in similar ways
- **Restraint** - Less is often more

## 🔄 CSS Transitions

### **1. Basic Transition Properties**

```html
<!-- Simple color transition -->
<button
  class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-300"
>
  Hover Me
</button>

<!-- Multiple property transition -->
<div
  class="bg-white shadow-md hover:shadow-xl p-6 rounded-lg transition-all duration-300 transform hover:scale-105"
>
  <h3 class="text-lg font-semibold">Interactive Card</h3>
  <p class="text-gray-600">Hovers scale and shadow change</p>
</div>

<!-- Transform transitions -->
<div
  class="w-20 h-20 bg-purple-500 rounded-full transition-transform duration-500 hover:rotate-180 hover:scale-125"
></div>
```

### **2. Tailwind Transition Classes**

```html
<!-- Duration Control -->
<button class="transition-colors duration-75">Super Fast (75ms)</button>
<button class="transition-colors duration-150">Fast (150ms)</button>
<button class="transition-colors duration-300">Normal (300ms)</button>
<button class="transition-colors duration-500">Slow (500ms)</button>
<button class="transition-colors duration-1000">Very Slow (1000ms)</button>

<!-- Easing Functions -->
<div class="transition-all duration-300 ease-linear">Linear</div>
<div class="transition-all duration-300 ease-in">Ease In</div>
<div class="transition-all duration-300 ease-out">Ease Out</div>
<div class="transition-all duration-300 ease-in-out">Ease In Out</div>

<!-- Delay -->
<div class="transition-all duration-300 delay-75">Delay 75ms</div>
<div class="transition-all duration-300 delay-150">Delay 150ms</div>
<div class="transition-all duration-300 delay-300">Delay 300ms</div>
```

### **3. Property-Specific Transitions**

```html
<!-- Color transitions -->
<button class="bg-red-500 hover:bg-red-600 transition-colors duration-300">
  Color
</button>

<!-- Shadow transitions -->
<div class="shadow-sm hover:shadow-lg transition-shadow duration-300">
  Shadow
</div>

<!-- Transform transitions -->
<div class="transform hover:scale-110 transition-transform duration-300">
  Transform
</div>

<!-- Opacity transitions -->
<div class="opacity-50 hover:opacity-100 transition-opacity duration-300">
  Opacity
</div>

<!-- All properties -->
<div class="transition-all duration-300">All Properties</div>
```

## 🎭 Built-in Animations

### **4. Tailwind's Default Animations**

```html
<!-- Spin Animation -->
<div
  class="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
></div>

<!-- Ping Animation -->
<div class="relative">
  <div
    class="animate-ping absolute w-4 h-4 bg-green-400 rounded-full opacity-75"
  ></div>
  <div class="w-4 h-4 bg-green-500 rounded-full"></div>
</div>

<!-- Pulse Animation -->
<div class="animate-pulse bg-gray-300 h-4 rounded"></div>

<!-- Bounce Animation -->
<div class="animate-bounce bg-yellow-500 w-6 h-6 rounded-full"></div>
```

### **5. Practical Loading States**

```html
<!-- Loading Button -->
<button
  class="bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center"
  disabled
>
  <div
    class="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
  ></div>
  Loading...
</button>

<!-- Skeleton Loading -->
<div class="space-y-3">
  <div class="animate-pulse bg-gray-300 h-4 rounded w-3/4"></div>
  <div class="animate-pulse bg-gray-300 h-4 rounded w-1/2"></div>
  <div class="animate-pulse bg-gray-300 h-4 rounded w-5/6"></div>
</div>

<!-- Notification Badge -->
<div class="relative">
  <svg
    class="w-6 h-6 text-gray-600"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M15 17h5l-5-5 5-5M4 19l5-5-5-5"
    ></path>
  </svg>
  <div
    class="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping"
  ></div>
  <div class="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full"></div>
</div>
```

## 🛠️ Custom Animations

### **6. Creating Custom Keyframes**

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        wiggle: "wiggle 1s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.8)" },
        },
      },
    },
  },
};
```

### **7. Using Custom Animations**

```html
<!-- Fade In Animation -->
<div class="animate-fade-in bg-white p-6 rounded-lg shadow-lg">
  <h3 class="text-lg font-semibold">Fade In Content</h3>
  <p class="text-gray-600">This content fades in smoothly.</p>
</div>

<!-- Slide Up Animation -->
<div class="animate-slide-up bg-blue-50 p-4 rounded-lg border border-blue-200">
  <p class="text-blue-800">This slides up from the bottom!</p>
</div>

<!-- Wiggle Animation -->
<button
  class="animate-wiggle bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
>
  🎉 Wiggle Button
</button>

<!-- Float Animation -->
<div
  class="animate-float w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl"
>
  ✨
</div>

<!-- Glow Animation -->
<button
  class="animate-glow bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold"
>
  Glowing Button
</button>
```

## 🎨 Interactive Hover Effects

### **8. Advanced Hover Animations**

```html
<!-- Card with Multiple Effects -->
<div
  class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
>
  <!-- Image with scale effect -->
  <div class="overflow-hidden">
    <img
      src="https://via.placeholder.com/400x200"
      alt="Card image"
      class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
    />
  </div>

  <!-- Content with slide effect -->
  <div class="p-6">
    <h3
      class="text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-blue-600"
    >
      Interactive Card
    </h3>
    <p class="text-gray-600 mb-4">
      Hover to see multiple animations working together.
    </p>

    <!-- Button with transform -->
    <button
      class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
    >
      Learn More
    </button>
  </div>

  <!-- Overlay effect -->
  <div
    class="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"
  ></div>
</div>

<!-- Button with Ripple Effect -->
<button
  class="relative overflow-hidden bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 transform hover:scale-105"
>
  <span class="relative z-10">Ripple Button</span>
  <div
    class="absolute inset-0 w-0 bg-white bg-opacity-20 transition-all duration-300 ease-out hover:w-full rounded-lg"
  ></div>
</button>

<!-- Icon with Rotation -->
<div class="group flex items-center space-x-2 cursor-pointer">
  <svg
    class="w-5 h-5 text-gray-600 transition-transform duration-300 group-hover:rotate-180"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    ></path>
  </svg>
  <span
    class="text-gray-600 group-hover:text-blue-600 transition-colors duration-300"
    >Refresh</span
  >
</div>
```

### **9. Focus and Active States**

```html
<!-- Input with Focus Animation -->
<div class="relative">
  <input
    type="text"
    class="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 outline-none"
    placeholder="Focus me for animation"
  />
  <div
    class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 focus-within:w-full"
  ></div>
</div>

<!-- Button with Active State -->
<button
  class="bg-green-500 hover:bg-green-600 active:scale-95 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-150"
>
  Press Me
</button>

<!-- Checkbox with Custom Animation -->
<label class="flex items-center cursor-pointer">
  <input type="checkbox" class="sr-only peer" />
  <div
    class="relative w-6 h-6 border-2 border-gray-300 rounded peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all duration-300"
  >
    <svg
      class="absolute inset-0 w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300 transform peer-checked:scale-100 scale-75"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="3"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
  </div>
  <span class="ml-3 text-gray-700">Animated Checkbox</span>
</label>
```

## 📱 Mobile-Optimized Animations

### **10. Touch-Friendly Animations**

```html
<!-- Mobile-optimized card -->
<div
  class="bg-white rounded-lg shadow-md active:shadow-lg transform active:scale-98 transition-all duration-150 touch-manipulation"
>
  <div class="p-6">
    <h3 class="text-lg font-semibold mb-2">Mobile Card</h3>
    <p class="text-gray-600">Optimized for touch interactions</p>
  </div>
</div>

<!-- Swipe indicator -->
<div class="flex justify-center py-4">
  <div class="flex space-x-2">
    <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
    <div
      class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
      style="animation-delay: 0.1s"
    ></div>
    <div
      class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
      style="animation-delay: 0.2s"
    ></div>
  </div>
</div>

<!-- Pull to refresh indicator -->
<div class="flex justify-center py-8">
  <div class="relative">
    <div
      class="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"
    ></div>
    <div class="absolute inset-0 flex items-center justify-center">
      <div class="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
    </div>
  </div>
</div>
```

## 🏃‍♂️ Performance Considerations

### **11. Hardware-Accelerated Properties**

```html
<!-- ✅ Good: GPU-accelerated properties -->
<div class="transform transition-transform duration-300 hover:scale-105">
  GPU Accelerated
</div>

<div class="transition-opacity duration-300 hover:opacity-80">
  Opacity Change
</div>

<!-- ❌ Avoid: Layout-triggering properties -->
<!-- These can cause performance issues -->
<div class="transition-all duration-300 hover:w-96">Avoid width changes</div>

<div class="transition-all duration-300 hover:h-96">Avoid height changes</div>
```

### **12. Reduced Motion Support**

```css
/* Add to your CSS file */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```javascript
// tailwind.config.js - Add motion-safe variants
module.exports = {
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  variants: {
    extend: {
      animation: ["motion-safe", "motion-reduce"],
    },
  },
};
```

```html
<!-- Respectful animations -->
<div class="motion-safe:animate-bounce motion-reduce:animate-none">
  Bouncing element (respects user preferences)
</div>

<div class="motion-safe:transition-all motion-safe:duration-300">
  Smooth transitions (when motion is preferred)
</div>
```

## 🎪 Advanced Animation Patterns

### **13. Staggered Animations**

```html
<!-- List with staggered fade-in -->
<div class="space-y-4">
  <div class="animate-fade-in" style="animation-delay: 0ms">Item 1</div>
  <div class="animate-fade-in" style="animation-delay: 100ms">Item 2</div>
  <div class="animate-fade-in" style="animation-delay: 200ms">Item 3</div>
  <div class="animate-fade-in" style="animation-delay: 300ms">Item 4</div>
</div>

<!-- Cards with staggered scale -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div
    class="animate-scale-in bg-white p-6 rounded-lg shadow-lg"
    style="animation-delay: 0ms"
  >
    <h3 class="font-semibold">Card 1</h3>
  </div>
  <div
    class="animate-scale-in bg-white p-6 rounded-lg shadow-lg"
    style="animation-delay: 150ms"
  >
    <h3 class="font-semibold">Card 2</h3>
  </div>
  <div
    class="animate-scale-in bg-white p-6 rounded-lg shadow-lg"
    style="animation-delay: 300ms"
  >
    <h3 class="font-semibold">Card 3</h3>
  </div>
</div>
```

### **14. Complex Loading Animations**

```html
<!-- Skeleton with wave effect -->
<div class="animate-pulse">
  <div class="flex items-center space-x-4">
    <div class="w-12 h-12 bg-gray-300 rounded-full"></div>
    <div class="flex-1 space-y-2">
      <div class="h-4 bg-gray-300 rounded w-3/4"></div>
      <div class="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
</div>

<!-- Progress bar animation -->
<div class="w-full bg-gray-200 rounded-full h-2">
  <div
    class="bg-blue-500 h-2 rounded-full animate-pulse"
    style="width: 45%"
  ></div>
</div>

<!-- Typing indicator -->
<div class="flex space-x-1 p-4">
  <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
  <div
    class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
    style="animation-delay: 0.1s"
  ></div>
  <div
    class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
    style="animation-delay: 0.2s"
  ></div>
</div>
```

## 🎯 Complete Animation Example

### **15. Interactive Dashboard Card**

```html
<div class="max-w-sm mx-auto">
  <!-- Animated Card -->
  <div
    class="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
  >
    <!-- Header with gradient -->
    <div
      class="bg-gradient-to-r from-blue-500 to-purple-600 p-6 relative overflow-hidden"
    >
      <!-- Background animation -->
      <div
        class="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"
      ></div>

      <!-- Content -->
      <div class="relative z-10">
        <div class="flex items-center justify-between">
          <h3 class="text-white text-lg font-semibold">Dashboard</h3>
          <!-- Animated icon -->
          <div
            class="transform transition-transform duration-300 group-hover:rotate-12"
          >
            <svg
              class="w-6 h-6 text-white"
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
          </div>
        </div>

        <!-- Animated counter -->
        <div class="mt-4">
          <div class="text-3xl font-bold text-white">1,234</div>
          <div class="text-blue-100">Total Views</div>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="p-6">
      <!-- Progress bar -->
      <div class="mb-4">
        <div class="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>75%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
            style="width: 75%"
          ></div>
        </div>
      </div>

      <!-- Stats grid -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div
          class="text-center p-3 bg-gray-50 rounded-lg transition-colors duration-300 hover:bg-blue-50"
        >
          <div class="text-xl font-bold text-gray-900">42</div>
          <div class="text-sm text-gray-600">Active</div>
        </div>
        <div
          class="text-center p-3 bg-gray-50 rounded-lg transition-colors duration-300 hover:bg-purple-50"
        >
          <div class="text-xl font-bold text-gray-900">18</div>
          <div class="text-sm text-gray-600">Pending</div>
        </div>
      </div>

      <!-- Action button -->
      <button
        class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
      >
        View Details
      </button>
    </div>
  </div>
</div>
```

## 🎯 Mission Complete!

You now master animations and transitions:

- ✅ **CSS transitions** - Smooth property changes
- ✅ **Built-in animations** - Spin, bounce, pulse effects
- ✅ **Custom keyframes** - Unique branded animations
- ✅ **Hover effects** - Interactive feedback
- ✅ **Loading states** - Engaging wait experiences
- ✅ **Performance optimization** - Hardware acceleration and accessibility

## 🚀 What's Next?

In the next lesson, we'll learn about **dark mode** - creating seamless light and dark theme experiences for modern applications!

---

**💡 Pro Tip:** Great animations enhance usability - they should feel natural and purposeful, never distracting or excessive.

**⚡ Remember:** Performance matters - always test animations on slower devices and respect user preferences for reduced motion.
