# 📺 Media Queries - Responsive CSS

## 🎯 Learning Objectives

By the end of this lesson, you'll understand:

- What media queries are and how they work
- Mobile-first media query strategy
- Common breakpoints and when to use them
- How to write effective responsive CSS

## 🔍 What are Media Queries?

**Media queries** let you apply different CSS styles based on device characteristics like screen size, orientation, or resolution. Think of them as "if statements" for CSS.

### 🎨 Basic Syntax

```css
@media (condition) {
  /* CSS rules for when condition is true */
}
```

### 📱 Simple Example

```css
/* Default (mobile) styles */
.header {
  font-size: 24px;
  padding: 10px;
}

/* Tablet and larger */
@media (min-width: 768px) {
  .header {
    font-size: 32px;
    padding: 20px;
  }
}
```

## 📊 Mobile-First Strategy

**Mobile-first** means writing CSS for mobile devices first, then adding styles for larger screens.

### ✅ Mobile-First Approach

```css
/* Mobile styles (default) */
.container {
  width: 100%;
  padding: 1rem;
  font-size: 16px;
}

/* Tablet styles */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    font-size: 18px;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem;
    font-size: 20px;
  }
}
```

### ❌ Desktop-First (Avoid This)

```css
/* Desktop styles (default) */
.container {
  width: 1200px;
  padding: 3rem;
  font-size: 20px;
}

/* Mobile styles */
@media (max-width: 767px) {
  .container {
    width: 100%;
    padding: 1rem;
    font-size: 16px;
  }
}
```

**Why mobile-first is better:**

- Easier to enhance than to strip down
- Better performance on mobile
- Forces you to prioritize content

## 📐 Standard Breakpoints

### 🎯 Common Breakpoint System

```css
/* Extra small devices (phones) */
/* No media query needed - this is default */

/* Small devices (landscape phones, tablets) */
@media (min-width: 576px) {
  /* CSS here */
}

/* Medium devices (tablets) */
@media (min-width: 768px) {
  /* CSS here */
}

/* Large devices (desktops) */
@media (min-width: 992px) {
  /* CSS here */
}

/* Extra large devices (large desktops) */
@media (min-width: 1200px) {
  /* CSS here */
}
```

### 🎨 Simplified 3-Breakpoint System

```css
/* Mobile (default) */
.nav {
  display: block;
}

/* Tablet */
@media (min-width: 768px) {
  .nav {
    display: flex;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .nav {
    justify-content: space-between;
  }
}
```

## 🔧 Media Query Types

### 📏 Width-Based Queries

```css
/* Minimum width */
@media (min-width: 768px) {
  /* Styles for 768px and wider */
}

/* Maximum width */
@media (max-width: 767px) {
  /* Styles for 767px and narrower */
}

/* Range */
@media (min-width: 768px) and (max-width: 1023px) {
  /* Styles for tablets only */
}
```

### 📱 Orientation Queries

```css
/* Portrait orientation */
@media (orientation: portrait) {
  .image {
    width: 100%;
  }
}

/* Landscape orientation */
@media (orientation: landscape) {
  .image {
    width: 50%;
    float: left;
  }
}
```

### 🖥️ Resolution Queries

```css
/* High-resolution displays */
@media (min-resolution: 2dppx) {
  .logo {
    background-image: url("logo@2x.png");
    background-size: 100px 50px;
  }
}
```

## 🏗️ Practical Responsive Patterns

### 1. **Responsive Navigation**

```css
/* Mobile: Hidden menu */
.nav-menu {
  display: none;
}

.hamburger {
  display: block;
}

/* Desktop: Visible menu */
@media (min-width: 768px) {
  .nav-menu {
    display: flex;
  }

  .hamburger {
    display: none;
  }
}
```

### 2. **Responsive Grid**

```css
/* Mobile: Single column */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet: Two columns */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

/* Desktop: Three columns */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }
}
```

### 3. **Responsive Typography**

```css
/* Mobile typography */
h1 {
  font-size: 2rem;
  line-height: 1.2;
}

p {
  font-size: 1rem;
  line-height: 1.5;
}

/* Tablet typography */
@media (min-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
}

/* Desktop typography */
@media (min-width: 1024px) {
  h1 {
    font-size: 3rem;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.7;
  }
}
```

### 4. **Responsive Sidebar**

```css
/* Mobile: Full width content */
.main {
  width: 100%;
}

.sidebar {
  width: 100%;
  margin-top: 2rem;
}

/* Desktop: Side-by-side layout */
@media (min-width: 768px) {
  .container {
    display: flex;
    gap: 2rem;
  }

  .main {
    flex: 2;
  }

  .sidebar {
    flex: 1;
    margin-top: 0;
  }
}
```

## 🔍 Advanced Media Query Features

### 📱 Combining Conditions

```css
/* Portrait tablets */
@media (min-width: 768px) and (orientation: portrait) {
  .special-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

/* High-resolution mobile */
@media (max-width: 767px) and (min-resolution: 2dppx) {
  .icon {
    background-image: url("icon@2x.png");
  }
}
```

### 🎯 Container Queries (Future)

```css
/* When the container is at least 300px wide */
@container (min-width: 300px) {
  .card {
    display: flex;
  }
}
```

## 🛠️ Debugging Media Queries

### 🔧 Chrome DevTools Tips

1. **Open DevTools** (F12)
2. **Click device icon** (responsive mode)
3. **Choose device** or set custom size
4. **See which queries are active** in CSS panel

### 📝 Testing Checklist

- [ ] Test on actual devices
- [ ] Check all breakpoints
- [ ] Verify touch targets (44px minimum)
- [ ] Test landscape and portrait
- [ ] Check loading performance

## ✅ Quick Check

**Test your understanding:**

1. What's the difference between `min-width` and `max-width`?
2. Why is mobile-first better than desktop-first?
3. What are the three most important breakpoints?
4. How do you target landscape orientation?

## 🚀 Complete Example

```css
/* Mobile-first responsive card */
.card {
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card h2 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.card p {
  font-size: 0.9rem;
  line-height: 1.5;
  color: #666;
}

/* Tablet styles */
@media (min-width: 768px) {
  .card {
    width: calc(50% - 1rem);
    display: inline-block;
    margin-right: 1rem;
    padding: 1.5rem;
  }

  .card h2 {
    font-size: 1.5rem;
  }

  .card p {
    font-size: 1rem;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .card {
    width: calc(33.33% - 1.33rem);
    margin-right: 2rem;
    padding: 2rem;
  }

  .card h2 {
    font-size: 1.75rem;
  }

  .card p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
}
```

## 🚀 What's Next?

In the next lesson, we'll learn about **responsive images** - making images that look great on all devices and load efficiently.

---

**💡 Key Takeaway:** Media queries are the backbone of responsive design. Start mobile-first and progressively enhance for larger screens.
