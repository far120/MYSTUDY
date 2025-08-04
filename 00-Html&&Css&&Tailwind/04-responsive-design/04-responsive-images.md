# 🖼️ Responsive Images

## 🎯 Learning Objectives

By the end of this lesson, you'll understand:

- How to make images scale with screen size
- Different techniques for responsive images
- How to serve different images for different devices
- Best practices for image performance

## 🔍 The Image Problem

Images can break responsive layouts if not handled properly:

### ❌ Fixed Images (Problems)

```html
<img src="large-image.jpg" width="800" height="600" alt="Fixed image" />
```

**Issues:**

- Overflows on small screens
- Wastes bandwidth on mobile
- Poor user experience

### ✅ Responsive Images (Solution)

```html
<img
  src="image.jpg"
  alt="Responsive image"
  style="max-width: 100%; height: auto;"
/>
```

**Benefits:**

- Scales with container
- Never overflows
- Maintains aspect ratio

## 📐 Basic Responsive Image CSS

### 🎯 The Essential Rule

```css
img {
  max-width: 100%;
  height: auto;
}
```

**What this does:**

- `max-width: 100%`: Never wider than container
- `height: auto`: Maintains aspect ratio

### 🖼️ Complete Image Styles

```css
img {
  max-width: 100%;
  height: auto;
  display: block; /* Removes bottom spacing */
  margin: 0 auto; /* Centers the image */
}
```

## 🎨 Responsive Image Patterns

### 1. **Flexible Images**

```css
.responsive-image {
  width: 100%;
  height: auto;
  max-width: 600px; /* Don't get too large */
}
```

```html
<img src="photo.jpg" alt="Description" class="responsive-image" />
```

### 2. **Container-Based Responsive**

```css
.image-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.image-container img {
  width: 100%;
  height: auto;
}
```

```html
<div class="image-container">
  <img src="photo.jpg" alt="Description" />
</div>
```

### 3. **Aspect Ratio Containers**

```css
.aspect-ratio-container {
  width: 100%;
  max-width: 500px;
  position: relative;
  overflow: hidden;
}

/* 16:9 aspect ratio */
.aspect-ratio-container::before {
  content: "";
  display: block;
  padding-top: 56.25%; /* 9/16 * 100% */
}

.aspect-ratio-container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## 📱 The `<picture>` Element

The `<picture>` element lets you serve different images for different conditions.

### 🎯 Basic Picture Syntax

```html
<picture>
  <source media="(min-width: 768px)" srcset="large-image.jpg" />
  <source media="(min-width: 480px)" srcset="medium-image.jpg" />
  <img src="small-image.jpg" alt="Responsive image" />
</picture>
```

### 📐 Responsive Breakpoint Images

```html
<picture>
  <!-- Desktop: Large image -->
  <source media="(min-width: 1024px)" srcset="hero-desktop.jpg" />

  <!-- Tablet: Medium image -->
  <source media="(min-width: 768px)" srcset="hero-tablet.jpg" />

  <!-- Mobile: Small image (default) -->
  <img
    src="hero-mobile.jpg"
    alt="Hero image"
    style="width: 100%; height: auto;"
  />
</picture>
```

### 🖥️ High-DPI (Retina) Images

```html
<picture>
  <!-- High-resolution displays -->
  <source
    media="(min-width: 768px)"
    srcset="large-image@2x.jpg 2x, large-image.jpg 1x"
  />

  <!-- Standard displays -->
  <img
    src="small-image.jpg"
    srcset="small-image@2x.jpg 2x"
    alt="High-DPI image"
  />
</picture>
```

## 🔧 Modern Image Formats

### 🌟 WebP with Fallback

```html
<picture>
  <!-- Modern browsers: WebP -->
  <source type="image/webp" srcset="image.webp" />

  <!-- Fallback: JPEG -->
  <img src="image.jpg" alt="Modern format image" />
</picture>
```

### 🚀 Complete Modern Picture

```html
<picture>
  <!-- WebP for modern browsers -->
  <source type="image/webp" media="(min-width: 768px)" srcset="large.webp" />
  <source type="image/webp" srcset="small.webp" />

  <!-- JPEG fallback -->
  <source media="(min-width: 768px)" srcset="large.jpg" />

  <!-- Default image -->
  <img src="small.jpg" alt="Modern responsive image" loading="lazy" />
</picture>
```

## 🎨 CSS Background Images

### 📱 Responsive Background Images

```css
.hero-section {
  width: 100%;
  height: 50vh;
  background-image: url("hero-mobile.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

@media (min-width: 768px) {
  .hero-section {
    height: 70vh;
    background-image: url("hero-tablet.jpg");
  }
}

@media (min-width: 1024px) {
  .hero-section {
    height: 100vh;
    background-image: url("hero-desktop.jpg");
  }
}
```

### 🌟 Modern Background with WebP

```css
.hero-section {
  width: 100%;
  height: 50vh;
  background-size: cover;
  background-position: center;

  /* Fallback */
  background-image: url("hero.jpg");
}

/* WebP support */
.webp .hero-section {
  background-image: url("hero.webp");
}

@media (min-width: 768px) {
  .hero-section {
    background-image: url("hero-large.jpg");
  }

  .webp .hero-section {
    background-image: url("hero-large.webp");
  }
}
```

## ⚡ Performance Optimization

### 🚀 Lazy Loading

```html
<!-- Native lazy loading -->
<img
  src="image.jpg"
  alt="Lazy loaded image"
  loading="lazy"
  style="max-width: 100%; height: auto;"
/>
```

### 📏 Responsive Images with Sizes

```html
<img
  src="small.jpg"
  srcset="small.jpg 300w, medium.jpg 600w, large.jpg 1200w"
  sizes="(max-width: 768px) 100vw,
            (max-width: 1024px) 50vw,
            33vw"
  alt="Efficient responsive image"
/>
```

**How `sizes` works:**

- `(max-width: 768px) 100vw`: Mobile uses full width
- `(max-width: 1024px) 50vw`: Tablet uses half width
- `33vw`: Desktop uses one-third width

### 🎯 Complete Optimized Image

```html
<picture>
  <!-- WebP format -->
  <source
    type="image/webp"
    srcset="hero-small.webp 300w, hero-medium.webp 600w, hero-large.webp 1200w"
    sizes="(max-width: 768px) 100vw,
                   (max-width: 1024px) 80vw,
                   60vw"
  />

  <!-- JPEG fallback -->
  <img
    src="hero-medium.jpg"
    srcset="hero-small.jpg 300w, hero-medium.jpg 600w, hero-large.jpg 1200w"
    sizes="(max-width: 768px) 100vw,
                (max-width: 1024px) 80vw,
                60vw"
    alt="Optimized hero image"
    loading="lazy"
    style="width: 100%; height: auto;"
  />
</picture>
```

## 🖼️ Image Gallery Patterns

### 📱 Responsive Grid Gallery

```css
.gallery {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
}

.gallery img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

@media (min-width: 480px) {
  .gallery {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 768px) {
  .gallery {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }

  .gallery img {
    height: 250px;
  }
}

@media (min-width: 1024px) {
  .gallery {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }

  .gallery img {
    height: 300px;
  }
}
```

### 🎨 Masonry-Style Gallery

```css
.masonry-gallery {
  columns: 1;
  column-gap: 1rem;
  padding: 1rem;
}

.masonry-gallery img {
  width: 100%;
  height: auto;
  break-inside: avoid;
  margin-bottom: 1rem;
  border-radius: 8px;
}

@media (min-width: 480px) {
  .masonry-gallery {
    columns: 2;
  }
}

@media (min-width: 768px) {
  .masonry-gallery {
    columns: 3;
    column-gap: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .masonry-gallery {
    columns: 4;
    column-gap: 2rem;
  }
}
```

## ✅ Quick Check

**Test your understanding:**

1. What CSS rule makes images responsive?
2. When would you use the `<picture>` element?
3. What does `object-fit: cover` do?
4. How does lazy loading improve performance?

## 🛠️ Practical Exercise

Create a responsive hero section:

```html
<section class="hero">
  <picture>
    <source media="(min-width: 1024px)" srcset="hero-desktop.jpg" />
    <source media="(min-width: 768px)" srcset="hero-tablet.jpg" />
    <img src="hero-mobile.jpg" alt="Hero image" class="hero-image" />
  </picture>
  <div class="hero-content">
    <h1>Welcome to Our Site</h1>
    <p>Creating amazing experiences for all devices</p>
  </div>
</section>
```

```css
.hero {
  position: relative;
  width: 100%;
  height: 50vh;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  border-radius: 8px;
}

@media (min-width: 768px) {
  .hero {
    height: 70vh;
  }

  .hero-content {
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .hero {
    height: 100vh;
  }

  .hero-content {
    padding: 3rem;
  }
}
```

## 🚀 What's Next?

In the next lesson, we'll learn about **mobile navigation** - creating menus that work perfectly on touch devices.

---

**💡 Key Takeaway:** Responsive images ensure your content looks great and loads efficiently on all devices. Always use `max-width: 100%` and consider using the `<picture>` element for optimal performance.
