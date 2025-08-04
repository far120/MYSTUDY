# 📱 Mobile Navigation Patterns

## 🎯 Learning Objectives

By the end of this lesson, you'll understand:

- Different mobile navigation patterns
- How to create a hamburger menu
- Touch-friendly navigation design
- Accessibility considerations for mobile navigation

## 🔍 Mobile Navigation Challenges

### 📱 Limited Screen Space

- Small screens can't fit horizontal menus
- Need to prioritize most important links
- Touch targets must be large enough (44px minimum)

### 👆 Touch Interaction

- No hover states on mobile
- Need clear visual feedback
- Consider thumb-friendly placement

## 🍔 The Hamburger Menu

The most common mobile navigation pattern uses a "hamburger" icon (☰) that reveals a hidden menu.

### 🎯 Basic HTML Structure

```html
<nav class="navbar">
  <div class="nav-container">
    <!-- Logo -->
    <div class="nav-logo">
      <a href="#" class="nav-logo-link">Logo</a>
    </div>

    <!-- Hamburger Button -->
    <button class="nav-toggle" aria-label="Toggle navigation">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>

    <!-- Navigation Menu -->
    <ul class="nav-menu">
      <li class="nav-item">
        <a href="#" class="nav-link">Home</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">About</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">Services</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">Contact</a>
      </li>
    </ul>
  </div>
</nav>
```

### 🎨 Mobile-First CSS

```css
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Navigation container */
.navbar {
  background-color: #333;
  color: white;
  padding: 0;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo */
.nav-logo-link {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

/* Hamburger button (mobile) */
.nav-toggle {
  display: flex;
  flex-direction: column;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.bar {
  width: 25px;
  height: 3px;
  background-color: white;
  margin: 3px 0;
  transition: 0.3s;
}

/* Mobile menu (hidden by default) */
.nav-menu {
  position: fixed;
  top: 70px; /* Height of navbar */
  left: -100%;
  width: 100%;
  height: calc(100vh - 70px);
  background-color: #333;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  transition: 0.3s;
  list-style: none;
  padding-top: 2rem;
}

.nav-menu.active {
  left: 0;
}

.nav-item {
  margin: 1rem 0;
  width: 100%;
  text-align: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  padding: 1rem;
  display: block;
  width: 100%;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: #555;
}

/* Desktop styles */
@media (min-width: 768px) {
  /* Hide hamburger on desktop */
  .nav-toggle {
    display: none;
  }

  /* Show horizontal menu */
  .nav-menu {
    position: static;
    left: 0;
    width: auto;
    height: auto;
    background-color: transparent;
    flex-direction: row;
    justify-content: flex-end;
    padding-top: 0;
  }

  .nav-item {
    margin: 0 0 0 2rem;
    width: auto;
  }

  .nav-link {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }
}
```

### ⚡ JavaScript for Functionality

```javascript
// Get DOM elements
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

// Toggle menu function
function toggleMenu() {
  navMenu.classList.toggle("active");

  // Animate hamburger bars
  const bars = document.querySelectorAll(".bar");
  bars[0].style.transform = navMenu.classList.contains("active")
    ? "rotate(-45deg) translate(-5px, 6px)"
    : "";
  bars[1].style.opacity = navMenu.classList.contains("active") ? "0" : "1";
  bars[2].style.transform = navMenu.classList.contains("active")
    ? "rotate(45deg) translate(-5px, -6px)"
    : "";
}

// Event listeners
navToggle.addEventListener("click", toggleMenu);

// Close menu when clicking on a link (mobile)
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth < 768) {
      toggleMenu();
    }
  });
});

// Close menu when resizing to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    navMenu.classList.remove("active");
    // Reset hamburger animation
    const bars = document.querySelectorAll(".bar");
    bars.forEach((bar) => {
      bar.style.transform = "";
      bar.style.opacity = "1";
    });
  }
});
```

## 🎨 Alternative Navigation Patterns

### 1. **Off-Canvas Menu**

```css
.nav-menu {
  position: fixed;
  top: 0;
  right: -300px; /* Slide from right */
  width: 300px;
  height: 100vh;
  background-color: #333;
  transition: right 0.3s ease;
  padding-top: 4rem;
}

.nav-menu.active {
  right: 0;
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease;
}

.overlay.active {
  opacity: 1;
  visibility: visible;
}
```

### 2. **Bottom Tab Navigation**

```css
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 0;
  z-index: 1000;
}

.bottom-nav-item {
  flex: 1;
  text-align: center;
  padding: 0.5rem;
}

.bottom-nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #666;
  font-size: 0.8rem;
}

.bottom-nav-icon {
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}

.bottom-nav-item.active .bottom-nav-link {
  color: #007bff;
}

/* Hide on desktop */
@media (min-width: 768px) {
  .bottom-nav {
    display: none;
  }
}
```

### 3. **Accordion Menu**

```css
.accordion-menu {
  background-color: #333;
}

.menu-section {
  border-bottom: 1px solid #555;
}

.menu-header {
  background: none;
  border: none;
  color: white;
  padding: 1rem;
  width: 100%;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background-color: #222;
}

.menu-content.active {
  max-height: 200px;
}

.submenu-link {
  display: block;
  color: white;
  text-decoration: none;
  padding: 0.75rem 2rem;
  border-bottom: 1px solid #333;
}

.submenu-link:hover {
  background-color: #444;
}
```

## 🎯 Touch-Friendly Design

### 👆 Minimum Touch Target Size

```css
.nav-link {
  min-height: 44px; /* Apple's recommendation */
  min-width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.nav-toggle {
  min-height: 44px;
  min-width: 44px;
  padding: 0.5rem;
}
```

### 🎨 Visual Feedback

```css
.nav-link {
  transition: all 0.2s ease;
}

/* Touch feedback */
.nav-link:active {
  background-color: #555;
  transform: scale(0.95);
}

/* Focus states for keyboard navigation */
.nav-link:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}
```

## ♿ Accessibility Considerations

### 🔍 ARIA Labels and Roles

```html
<nav class="navbar" role="navigation" aria-label="Main navigation">
  <button
    class="nav-toggle"
    aria-label="Toggle navigation menu"
    aria-expanded="false"
    aria-controls="nav-menu"
  >
    <span class="bar"></span>
    <span class="bar"></span>
    <span class="bar"></span>
  </button>

  <ul class="nav-menu" id="nav-menu" role="menu">
    <li class="nav-item" role="none">
      <a href="#" class="nav-link" role="menuitem">Home</a>
    </li>
  </ul>
</nav>
```

### ⌨️ Keyboard Navigation Support

```javascript
// Escape key closes menu
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    toggleMenu();
    navToggle.focus(); // Return focus to toggle button
  }
});

// Update ARIA attributes
function toggleMenu() {
  const isOpen = navMenu.classList.toggle("active");
  navToggle.setAttribute("aria-expanded", isOpen);
}
```

## 📱 Complete Mobile Navigation Example

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Responsive Navigation</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <a href="#" class="nav-logo-link">YourLogo</a>
        </div>

        <button class="nav-toggle" aria-label="Toggle navigation">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>

        <ul class="nav-menu">
          <li class="nav-item">
            <a href="#home" class="nav-link">Home</a>
          </li>
          <li class="nav-item">
            <a href="#about" class="nav-link">About</a>
          </li>
          <li class="nav-item">
            <a href="#services" class="nav-link">Services</a>
          </li>
          <li class="nav-item">
            <a href="#portfolio" class="nav-link">Portfolio</a>
          </li>
          <li class="nav-item">
            <a href="#contact" class="nav-link">Contact</a>
          </li>
        </ul>
      </div>
    </nav>

    <main>
      <section id="home" style="height: 100vh; padding: 2rem;">
        <h1>Welcome to Responsive Navigation</h1>
        <p>This navigation works on all devices!</p>
      </section>
    </main>

    <script src="script.js"></script>
  </body>
</html>
```

## ✅ Quick Check

**Test your understanding:**

1. What's the minimum touch target size for mobile?
2. Why is the hamburger menu popular on mobile?
3. What ARIA attribute indicates if a menu is open?
4. How do you make navigation keyboard accessible?

## 🚀 What's Next?

Congratulations! You've completed the responsive design fundamentals. Next, you'll move to the **exercises** folder to practice building responsive layouts, followed by the **project-responsive-portfolio** where you'll create a complete multi-device portfolio website.

---

**💡 Key Takeaway:** Good mobile navigation is invisible when it works well. Focus on simplicity, touch-friendliness, and accessibility to create navigation that serves all users effectively.
