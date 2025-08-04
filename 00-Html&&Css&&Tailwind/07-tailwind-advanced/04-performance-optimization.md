# ⚡ Performance Optimization

**Speed is a feature!** In today's fast-paced world, every millisecond counts. Learn to optimize your Tailwind applications for blazing-fast load times and silky-smooth interactions that keep users engaged.

## 🎯 What You'll Learn

By the end of this lesson, you'll master:

- ✅ Tailwind CSS optimization techniques
- ✅ Bundle size reduction strategies
- ✅ Critical CSS extraction
- ✅ Image optimization workflows
- ✅ Font loading optimization
- ✅ Runtime performance improvements

## 🚀 Why Performance Matters

**Performance directly impacts user experience and business metrics:**

### **Real Impact:**

- **1 second delay** = 7% reduction in conversions
- **3 second load time** = 32% bounce rate increase
- **Fast sites** = Better SEO rankings
- **Smooth interactions** = Higher user engagement

### **Core Web Vitals:**

- **LCP (Largest Contentful Paint)** - Loading performance
- **FID (First Input Delay)** - Interactivity
- **CLS (Cumulative Layout Shift)** - Visual stability

## 🎨 Tailwind CSS Optimization

### **1. PurgeCSS Configuration**

```javascript
// tailwind.config.js - Production optimization
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./components/**/*.{html,js,jsx,ts,tsx}",
    "./pages/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Only include colors you actually use
      colors: {
        primary: {
          500: "#3b82f6",
          600: "#2563eb",
        },
        // Remove unused color variations
      },
    },
  },
  plugins: [],
  // Remove unused variants
  corePlugins: {
    // Disable if not using
    float: false,
    clear: false,
    skew: false,
  },
};
```

### **2. Build Process Optimization**

```javascript
// webpack.config.js or similar
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
  ],
};
```

### **3. Custom Utility Selection**

```html
<!-- ✅ Good: Use specific utilities -->
<div class="bg-blue-500 text-white p-4 rounded-lg">Specific utilities</div>

<!-- ❌ Avoid: Unused utility variations -->
<!-- Don't include hover:bg-blue-800 if you only need hover:bg-blue-600 -->
<div class="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg">
  Only needed variants
</div>
```

## 📦 Bundle Size Reduction

### **4. Critical CSS Extraction**

```html
<!-- Inline critical CSS in <head> -->
<head>
  <style>
    /* Critical CSS - Above the fold content */
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .hero h1 {
      font-size: 3rem;
      font-weight: 700;
      color: white;
      text-align: center;
    }
  </style>

  <!-- Load non-critical CSS asynchronously -->
  <link
    rel="preload"
    href="styles.css"
    as="style"
    onload="this.onload=null;this.rel='stylesheet'"
  />
  <noscript><link rel="stylesheet" href="styles.css" /></noscript>
</head>
```

### **5. Component-Based CSS Loading**

```javascript
// Dynamic CSS loading for components
const loadComponentCSS = async (componentName) => {
  if (!document.querySelector(`link[data-component="${componentName}"]`)) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `/css/components/${componentName}.css`;
    link.setAttribute("data-component", componentName);
    document.head.appendChild(link);
  }
};

// Usage
const showModal = async () => {
  await loadComponentCSS("modal");
  // Show modal
};
```

### **6. Tree Shaking CSS Utilities**

```javascript
// Use CSS-in-JS for dynamic styles
const dynamicStyles = {
  button: (variant, size) => {
    const baseClasses =
      "font-semibold rounded-lg transition-colors duration-200";

    const variants = {
      primary: "bg-blue-500 hover:bg-blue-600 text-white",
      secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return `${baseClasses} ${variants[variant]} ${sizes[size]}`;
  },
};

// Usage - only loads needed classes
<button className={dynamicStyles.button("primary", "md")}>Click me</button>;
```

## 🖼️ Image Optimization

### **7. Responsive Images with Tailwind**

```html
<!-- Modern responsive images -->
<picture class="block w-full">
  <!-- WebP for modern browsers -->
  <source
    srcset="
      hero-320.webp   320w,
      hero-640.webp   640w,
      hero-1024.webp 1024w,
      hero-1280.webp 1280w
    "
    type="image/webp"
  />

  <!-- Fallback for older browsers -->
  <img
    src="hero-640.jpg"
    srcset="
      hero-320.jpg   320w,
      hero-640.jpg   640w,
      hero-1024.jpg 1024w,
      hero-1280.jpg 1280w
    "
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    alt="Hero image"
    class="w-full h-64 object-cover rounded-lg"
    loading="lazy"
    decoding="async"
  />
</picture>

<!-- Lazy loading with intersection observer -->
<img
  data-src="large-image.jpg"
  src="placeholder.jpg"
  alt="Lazy loaded image"
  class="w-full h-48 object-cover rounded-lg lazy-image"
  loading="lazy"
/>

<script>
  // Lazy loading implementation
  const lazyImages = document.querySelectorAll(".lazy-image");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy-image");
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));
</script>
```

### **8. Image Placeholder Techniques**

```html
<!-- Blur placeholder -->
<div class="relative overflow-hidden rounded-lg">
  <!-- Blurred placeholder -->
  <img
    src="placeholder-blur.jpg"
    alt="Placeholder"
    class="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110 transition-opacity duration-300"
  />

  <!-- Actual image -->
  <img
    src="actual-image.jpg"
    alt="Actual image"
    class="relative w-full h-64 object-cover opacity-0 transition-opacity duration-300"
    onload="this.style.opacity='1'; this.previousElementSibling.style.opacity='0'"
  />
</div>

<!-- Skeleton placeholder -->
<div class="animate-pulse">
  <div class="bg-gray-300 rounded-lg h-64 w-full"></div>
  <div class="mt-4 space-y-2">
    <div class="h-4 bg-gray-300 rounded w-3/4"></div>
    <div class="h-4 bg-gray-300 rounded w-1/2"></div>
  </div>
</div>
```

## 🔤 Font Optimization

### **9. Font Loading Strategies**

```html
<head>
  <!-- Preconnect to font sources -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <!-- Optimized font loading -->
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet"
  />

  <!-- Self-hosted fonts with preload -->
  <link
    rel="preload"
    href="/fonts/inter-var.woff2"
    as="font"
    type="font/woff2"
    crossorigin
  />

  <style>
    /* Font-face with font-display: swap */
    @font-face {
      font-family: "Inter";
      src: url("/fonts/inter-var.woff2") format("woff2");
      font-weight: 100 900;
      font-style: normal;
      font-display: swap; /* Show fallback immediately */
    }

    /* Fallback font stack */
    body {
      font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, sans-serif;
    }
  </style>
</head>
```

### **10. Variable Fonts**

```css
/* Single variable font file instead of multiple weights */
@font-face {
  font-family: "InterVariable";
  src: url("/fonts/Inter-Variable.woff2") format("woff2");
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

/* Tailwind config for variable fonts */
```

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", "system-ui", "sans-serif"],
      },
      fontWeight: {
        variable: "100 900", // Use CSS custom properties for dynamic weights
      },
    },
  },
};
```

## ⚡ Runtime Performance

### **11. CSS Animation Optimization**

```html
<!-- ✅ Good: GPU-accelerated animations -->
<div
  class="transform transition-transform duration-300 hover:scale-105 will-change-transform"
>
  GPU accelerated scaling
</div>

<div
  class="opacity-50 transition-opacity duration-300 hover:opacity-100 will-change-opacity"
>
  GPU accelerated opacity
</div>

<!-- ❌ Avoid: Layout-triggering animations -->
<div class="w-32 transition-all duration-300 hover:w-64">
  Causes layout recalculation
</div>
```

### **12. Efficient CSS Selectors**

```css
/* ✅ Good: Efficient selectors */
.btn-primary {
  /* Class selector - fast */
}
#header {
  /* ID selector - fastest */
}

/* ❌ Avoid: Inefficient selectors */
div > div > div .btn {
  /* Deep nesting - slow */
}
[data-attribute*="value"] {
  /* Substring matching - slow */
}
.btn:not(.disabled):hover {
  /* Complex pseudo-selectors - slow */
}
```

### **13. Critical Rendering Path Optimization**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Optimized Page</title>

    <!-- Critical CSS inline -->
    <style>
      /* Only above-the-fold styles */
      .hero {
        /* ... */
      }
      .nav {
        /* ... */
      }
    </style>

    <!-- Preload key resources -->
    <link
      rel="preload"
      href="/fonts/main.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />
    <link rel="preload" href="/css/main.css" as="style" />
    <link rel="preload" href="/js/main.js" as="script" />

    <!-- DNS prefetch for external resources -->
    <link rel="dns-prefetch" href="//analytics.google.com" />
    <link rel="dns-prefetch" href="//fonts.googleapis.com" />
  </head>
  <body>
    <!-- Content here -->

    <!-- Load non-critical CSS -->
    <link
      rel="stylesheet"
      href="/css/main.css"
      media="print"
      onload="this.media='all'"
    />

    <!-- Load JavaScript after DOM content -->
    <script>
      // Critical JavaScript inline
      // Non-critical scripts loaded after DOM ready
      document.addEventListener("DOMContentLoaded", () => {
        const script = document.createElement("script");
        script.src = "/js/main.js";
        script.async = true;
        document.head.appendChild(script);
      });
    </script>
  </body>
</html>
```

## 📊 Performance Monitoring

### **14. Web Vitals Measurement**

```javascript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

// Track Core Web Vitals
getCLS(console.log);
getFID(console.log);
getLCP(console.log);

// Track other important metrics
getFCP(console.log);
getTTFB(console.log);

// Custom performance tracking
const trackPerformance = () => {
  // Measure bundle size impact
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === "resource" && entry.name.includes(".css")) {
        console.log("CSS load time:", entry.duration);
        console.log("CSS size:", entry.transferSize);
      }
    });
  });

  observer.observe({ entryTypes: ["resource"] });
};

trackPerformance();
```

### **15. Lighthouse CI Integration**

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push, pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "16"
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli@0.8.x
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

## 🛠️ Optimization Tools & Workflow

### **16. Build Process Optimization**

```javascript
// vite.config.js - Modern build tool
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          vendor: ["react", "react-dom"],
          tailwind: ["tailwindcss"],
        },
      },
    },
    // CSS code splitting
    cssCodeSplit: true,
    // Minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  css: {
    postcss: {
      plugins: [
        require("tailwindcss"),
        require("autoprefixer"),
        // Purge unused CSS in production
        ...(process.env.NODE_ENV === "production"
          ? [
              require("@fullhuman/postcss-purgecss")({
                content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
                defaultExtractor: (content) =>
                  content.match(/[A-Za-z0-9-_:/]+/g) || [],
              }),
            ]
          : []),
      ],
    },
  },
});
```

### **17. Performance Budget**

```javascript
// webpack-bundle-analyzer configuration
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
      reportFilename: "bundle-report.html",
    }),
  ],
  performance: {
    maxAssetSize: 250000, // 250kb max asset size
    maxEntrypointSize: 400000, // 400kb max entrypoint size
    hints: "warning",
  },
};
```

## 🎯 Complete Performance Example

### **18. Optimized Landing Page**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>High Performance Landing Page</title>

    <!-- Resource Hints -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="dns-prefetch" href="//analytics.google.com" />

    <!-- Critical CSS -->
    <style>
      /* Inline critical CSS for above-the-fold content */
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        font-family: system-ui, -apple-system, sans-serif;
        line-height: 1.6;
      }
      .hero {
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: white;
      }
      .hero h1 {
        font-size: clamp(2rem, 5vw, 4rem);
        font-weight: 700;
        margin: 0 0 1rem 0;
      }
      .hero p {
        font-size: clamp(1rem, 2.5vw, 1.25rem);
        margin: 0 0 2rem 0;
        opacity: 0.9;
      }
      .btn {
        display: inline-block;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        padding: 1rem 2rem;
        text-decoration: none;
        border-radius: 0.5rem;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.3);
        transition: transform 0.2s ease;
      }
      .btn:hover {
        transform: translateY(-2px);
      }
    </style>

    <!-- Preload critical resources -->
    <link rel="preload" href="styles.css" as="style" />
    <link rel="preload" href="script.js" as="script" />
  </head>
  <body>
    <!-- Above-the-fold content -->
    <section class="hero">
      <div>
        <h1>Lightning Fast Performance</h1>
        <p>Optimized for speed, built for scale</p>
        <a href="#features" class="btn">Explore Features</a>
      </div>
    </section>

    <!-- Below-the-fold content with lazy loading -->
    <section
      id="features"
      style="padding: 4rem 2rem; max-width: 1200px; margin: 0 auto;"
    >
      <h2 style="text-align: center; margin-bottom: 3rem; font-size: 2.5rem;">
        Performance Features
      </h2>

      <div
        style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;"
      >
        <!-- Feature cards with optimized images -->
        <div
          style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
        >
          <img
            data-src="feature1.webp"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3C/svg%3E"
            alt="Fast Loading"
            style="width: 100px; height: 100px; margin-bottom: 1rem;"
            loading="lazy"
            class="lazy-image"
          />
          <h3>Fast Loading</h3>
          <p>Optimized assets and critical CSS for instant page loads.</p>
        </div>

        <div
          style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
        >
          <img
            data-src="feature2.webp"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3C/svg%3E"
            alt="Optimized Images"
            style="width: 100px; height: 100px; margin-bottom: 1rem;"
            loading="lazy"
            class="lazy-image"
          />
          <h3>Smart Images</h3>
          <p>WebP format with responsive sizing and lazy loading.</p>
        </div>

        <div
          style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"
        >
          <img
            data-src="feature3.webp"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23f3f4f6'/%3E%3C/svg%3E"
            alt="Minimal Bundle"
            style="width: 100px; height: 100px; margin-bottom: 1rem;"
            loading="lazy"
            class="lazy-image"
          />
          <h3>Minimal Bundle</h3>
          <p>Tree-shaken CSS with only the utilities you actually use.</p>
        </div>
      </div>
    </section>

    <!-- Load non-critical CSS -->
    <link
      rel="stylesheet"
      href="styles.css"
      media="print"
      onload="this.media='all'"
    />
    <noscript><link rel="stylesheet" href="styles.css" /></noscript>

    <!-- Load JavaScript after content -->
    <script>
      // Lazy loading for images
      const lazyImages = document.querySelectorAll(".lazy-image");

      if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.classList.remove("lazy-image");
              imageObserver.unobserve(img);
            }
          });
        });

        lazyImages.forEach((img) => imageObserver.observe(img));
      } else {
        // Fallback for older browsers
        lazyImages.forEach((img) => {
          img.src = img.dataset.src;
        });
      }

      // Load non-critical JavaScript
      const loadScript = (src) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        document.head.appendChild(script);
      };

      // Load after DOM content
      document.addEventListener("DOMContentLoaded", () => {
        loadScript("script.js");
      });
    </script>
  </body>
</html>
```

## 🎯 Mission Complete!

You now master performance optimization:

- ✅ **CSS optimization** - PurgeCSS and bundle reduction
- ✅ **Critical CSS** - Above-the-fold optimization
- ✅ **Image optimization** - Modern formats and lazy loading
- ✅ **Font optimization** - Strategic loading and fallbacks
- ✅ **Runtime performance** - GPU acceleration and efficient animations
- ✅ **Monitoring tools** - Web Vitals and performance budgets

## 🚀 What's Next?

In the final lesson, we'll learn **best practices** - professional tips and patterns that separate good developers from great ones!

---

**💡 Pro Tip:** Performance is not a one-time optimization - it's an ongoing commitment. Set up monitoring and performance budgets to maintain fast load times.

**⚡ Remember:** The fastest code is the code that doesn't run. Question every dependency, asset, and feature to ensure they provide value to your users.
