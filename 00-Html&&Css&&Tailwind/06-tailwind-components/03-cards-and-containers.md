# 📦 Cards and Containers with Tailwind

**The building blocks of modern web design!** Cards and containers are essential for organizing content in a clean, scannable way. Master these, and you can create professional layouts for any type of content.

## 🎯 What You'll Learn

By the end of this lesson, you'll master:

- ✅ Creating flexible card components
- ✅ Building different container layouts
- ✅ Content organization principles
- ✅ Responsive card designs
- ✅ Advanced card patterns (overlays, interactions)

## 🃏 Understanding Cards

**Cards are like digital index cards** - they contain related information in a visually distinct container. They're everywhere in modern web design!

### **Where You See Cards:**

- **Social media posts** (Twitter, Facebook, Instagram)
- **Product listings** (Amazon, eBay, Shopify)
- **Blog articles** (Medium, WordPress)
- **News articles** (BBC, CNN, blogs)
- **Team members** (About pages)
- **Testimonials** (Landing pages)

## 🏗️ Basic Card Structure

Every card has these common elements:

```
┌─────────────────────┐
│     [Image]         │ ← Visual element (optional)
├─────────────────────┤
│ Title               │ ← Main heading
│ Subtitle/metadata   │ ← Supporting info
│ Description text... │ ← Main content
│ [Action Button]     │ ← Call to action (optional)
└─────────────────────┘
```

### **Simple Card Foundation**

```html
<div class="bg-white rounded-lg shadow-md overflow-hidden">
  <!-- Card content goes here -->
</div>
```

**Breaking down the foundation:**

- `bg-white` = White background
- `rounded-lg` = Rounded corners
- `shadow-md` = Subtle drop shadow
- `overflow-hidden` = Keeps content within rounded corners

## 🎨 Card Variations

### **1. Basic Content Card**

```html
<div class="max-w-sm bg-white rounded-lg shadow-md p-6">
  <h3 class="text-xl font-bold text-gray-800 mb-2">Card Title</h3>
  <p class="text-gray-600 mb-4">
    This is a simple card with just text content. Perfect for announcements,
    quick information, or as building blocks for larger layouts.
  </p>
  <a href="#" class="text-blue-500 hover:text-blue-700 font-medium">
    Read more →
  </a>
</div>
```

### **2. Image Card (Blog Post Style)**

```html
<div class="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
  <!-- Image -->
  <img
    class="w-full h-48 object-cover"
    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    alt="Mountain landscape"
  />

  <!-- Content -->
  <div class="p-6">
    <span class="text-sm text-gray-500">Travel • 5 min read</span>
    <h3 class="text-xl font-bold text-gray-800 mt-2 mb-3">
      Exploring the Swiss Alps
    </h3>
    <p class="text-gray-600 mb-4">
      Discover breathtaking mountain views and pristine hiking trails in one of
      Europe's most stunning destinations.
    </p>
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <img
          class="w-8 h-8 rounded-full mr-3"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
          alt="Author"
        />
        <span class="text-sm text-gray-700">John Doe</span>
      </div>
      <span class="text-sm text-gray-500">Dec 15, 2024</span>
    </div>
  </div>
</div>
```

### **3. Product Card (E-commerce Style)**

```html
<div
  class="max-w-sm bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
>
  <!-- Product Image -->
  <div class="relative">
    <img
      class="w-full h-64 object-cover"
      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
      alt="Wireless Headphones"
    />
    <!-- Sale Badge -->
    <span
      class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold"
    >
      20% OFF
    </span>
    <!-- Wishlist Button -->
    <button
      class="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
    >
      <svg
        class="w-5 h-5 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        ></path>
      </svg>
    </button>
  </div>

  <!-- Product Info -->
  <div class="p-6">
    <div class="flex items-center mb-2">
      <div class="flex text-yellow-400">★★★★★</div>
      <span class="ml-2 text-sm text-gray-600">(128 reviews)</span>
    </div>

    <h3 class="text-lg font-bold text-gray-800 mb-2">
      Premium Wireless Headphones
    </h3>

    <p class="text-gray-600 text-sm mb-4">
      High-quality audio with noise cancellation and 30-hour battery life.
    </p>

    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center">
        <span class="text-2xl font-bold text-green-600">$79.99</span>
        <span class="ml-2 text-sm text-gray-500 line-through">$99.99</span>
      </div>
      <div class="flex space-x-1">
        <div
          class="w-4 h-4 bg-black rounded-full border-2 border-gray-300"
        ></div>
        <div
          class="w-4 h-4 bg-white rounded-full border-2 border-gray-300"
        ></div>
        <div
          class="w-4 h-4 bg-blue-500 rounded-full border-2 border-gray-300"
        ></div>
      </div>
    </div>

    <button
      class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
    >
      Add to Cart
    </button>
  </div>
</div>
```

### **4. Team Member Card**

```html
<div class="max-w-sm bg-white rounded-lg shadow-md overflow-hidden text-center">
  <!-- Profile Image -->
  <div class="relative">
    <div class="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
    <img
      class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-24 h-24 rounded-full border-4 border-white object-cover"
      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      alt="Team Member"
    />
  </div>

  <!-- Member Info -->
  <div class="pt-16 pb-6 px-6">
    <h3 class="text-xl font-bold text-gray-800 mb-1">Sarah Johnson</h3>
    <p class="text-blue-600 font-medium mb-3">Lead Designer</p>
    <p class="text-gray-600 text-sm mb-4">
      Passionate about creating beautiful, user-centered designs that solve real
      problems.
    </p>

    <!-- Social Links -->
    <div class="flex justify-center space-x-4">
      <a
        href="#"
        class="text-gray-400 hover:text-blue-500 transition-colors duration-200"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
      <a
        href="#"
        class="text-gray-400 hover:text-blue-500 transition-colors duration-200"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
          ></path>
        </svg>
      </a>
      <a
        href="#"
        class="text-gray-400 hover:text-blue-500 transition-colors duration-200"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </a>
    </div>
  </div>
</div>
```

### **5. Testimonial Card**

```html
<div class="max-w-md bg-white rounded-lg shadow-md p-6 relative">
  <!-- Quote Icon -->
  <div class="absolute top-4 right-4 text-gray-200">
    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 32 32">
      <path
        d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"
      />
    </svg>
  </div>

  <!-- Testimonial Content -->
  <p class="text-gray-700 mb-6 italic leading-relaxed">
    "This product completely transformed how we approach our workflow. The team
    is more productive, and our clients are happier than ever. Highly
    recommended!"
  </p>

  <!-- Author Info -->
  <div class="flex items-center">
    <img
      class="w-12 h-12 rounded-full mr-4 object-cover"
      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      alt="Customer"
    />
    <div>
      <h4 class="font-semibold text-gray-800">Emily Chen</h4>
      <p class="text-sm text-gray-600">CEO, TechStart Inc.</p>
    </div>
  </div>

  <!-- Rating -->
  <div class="flex mt-4">
    <div class="flex text-yellow-400">★★★★★</div>
    <span class="ml-2 text-sm text-gray-600">5/5 stars</span>
  </div>
</div>
```

## 📦 Container Patterns

Containers organize and group related content. Here are essential patterns:

### **1. Section Container**

```html
<section class="py-16 bg-gray-50">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
      <p class="text-lg text-gray-600 max-w-3xl mx-auto">
        We provide comprehensive solutions to help your business grow and
        succeed in the digital age.
      </p>
    </div>

    <!-- Content goes here -->
  </div>
</section>
```

### **2. Card Grid Container**

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Cards go here -->
  <div class="bg-white rounded-lg shadow-md p-6">Card 1</div>
  <div class="bg-white rounded-lg shadow-md p-6">Card 2</div>
  <div class="bg-white rounded-lg shadow-md p-6">Card 3</div>
</div>
```

### **3. Feature List Container**

```html
<div class="space-y-8">
  <!-- Feature Item -->
  <div class="flex items-start">
    <div class="flex-shrink-0">
      <div
        class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center"
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
      </div>
    </div>
    <div class="ml-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-2">Lightning Fast</h3>
      <p class="text-gray-600">
        Optimized for speed and performance to give you the best user
        experience.
      </p>
    </div>
  </div>

  <!-- More feature items... -->
</div>
```

### **4. Sidebar Layout Container**

```html
<div class="flex flex-col lg:flex-row gap-8">
  <!-- Main Content -->
  <div class="lg:w-2/3">
    <div class="bg-white rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Main Article</h1>
      <p class="text-gray-600">Main content goes here...</p>
    </div>
  </div>

  <!-- Sidebar -->
  <div class="lg:w-1/3">
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Related Articles</h3>
      <!-- Related content -->
    </div>

    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Newsletter</h3>
      <!-- Newsletter signup -->
    </div>
  </div>
</div>
```

## 🎨 Advanced Card Patterns

### **1. Hover Effects**

```html
<div
  class="max-w-sm bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
>
  <img class="w-full h-48 object-cover" src="image.jpg" alt="Image" />
  <div class="p-6">
    <h3 class="text-xl font-bold text-gray-800 mb-2">Interactive Card</h3>
    <p class="text-gray-600">
      This card grows and gains more shadow when you hover over it.
    </p>
  </div>
</div>
```

### **2. Card with Overlay**

```html
<div class="relative max-w-sm rounded-lg overflow-hidden shadow-md group">
  <img class="w-full h-64 object-cover" src="image.jpg" alt="Background" />

  <!-- Overlay -->
  <div
    class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
  >
    <div class="absolute inset-0 flex items-center justify-center">
      <button
        class="bg-white text-gray-800 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
      >
        View Details
      </button>
    </div>
  </div>

  <!-- Content -->
  <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
    <h3 class="text-xl font-bold mb-2">Overlay Card</h3>
    <p class="text-sm opacity-90">
      Beautiful content with overlay effects on hover.
    </p>
  </div>
</div>
```

### **3. Expandable Card**

```html
<div class="max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
  <img class="w-full h-48 object-cover" src="image.jpg" alt="Image" />
  <div class="p-6">
    <h3 class="text-xl font-bold text-gray-800 mb-2">Expandable Content</h3>
    <p class="text-gray-600 mb-4">
      This is the preview content that's always visible...
    </p>

    <!-- Expandable Section -->
    <div class="expandable-content" x-data="{ open: false }">
      <div x-show="!open">
        <button
          @click="open = true"
          class="text-blue-500 hover:text-blue-700 font-medium"
        >
          Read more ↓
        </button>
      </div>

      <div x-show="open" x-transition class="space-y-4">
        <p class="text-gray-600">
          Here's the additional content that appears when the user clicks "Read
          more". This is perfect for keeping cards compact while providing
          access to more information.
        </p>
        <button
          @click="open = false"
          class="text-blue-500 hover:text-blue-700 font-medium"
        >
          Show less ↑
        </button>
      </div>
    </div>
  </div>
</div>
```

## 📱 Responsive Card Design

### **Mobile-First Card Approach**

```html
<!-- Responsive Card Grid -->
<div
  class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img
      class="w-full h-48 sm:h-40 lg:h-48 object-cover"
      src="image.jpg"
      alt="Responsive Image"
    />
    <div class="p-4 md:p-6">
      <h3 class="text-lg md:text-xl font-bold text-gray-800 mb-2">
        Responsive Card
      </h3>
      <p class="text-sm md:text-base text-gray-600 mb-4">
        This card adapts to different screen sizes perfectly.
      </p>
      <button
        class="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
      >
        Action
      </button>
    </div>
  </div>
</div>
```

### **Stack on Mobile, Side-by-Side on Desktop**

```html
<div
  class="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden"
>
  <img
    class="w-full md:w-1/3 h-48 md:h-auto object-cover"
    src="image.jpg"
    alt="Image"
  />
  <div class="p-6 md:w-2/3">
    <h3 class="text-xl font-bold text-gray-800 mb-2">Flexible Layout Card</h3>
    <p class="text-gray-600 mb-4">
      On mobile, the image stacks on top. On desktop, image and content are side
      by side.
    </p>
    <button
      class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
    >
      Learn More
    </button>
  </div>
</div>
```

## 🎯 Card Best Practices

### **1. Consistent Spacing**

```html
<!-- ✅ Good: Consistent padding -->
<div class="p-6">Content</div>
<div class="p-6">Content</div>
<div class="p-6">Content</div>

<!-- ❌ Bad: Inconsistent spacing -->
<div class="p-4">Content</div>
<div class="p-8">Content</div>
<div class="p-6">Content</div>
```

### **2. Clear Visual Hierarchy**

```html
<!-- ✅ Good: Clear hierarchy -->
<h3 class="text-xl font-bold">Main Title</h3>
<p class="text-sm text-gray-500">Subtitle</p>
<p class="text-base text-gray-700">Body text</p>

<!-- ❌ Bad: No clear hierarchy -->
<h3 class="text-lg">Title</h3>
<p class="text-lg">Subtitle</p>
<p class="text-lg">Body text</p>
```

### **3. Appropriate Action Placement**

```html
<!-- ✅ Good: Actions at the bottom -->
<div class="p-6">
  <h3>Title</h3>
  <p>Content...</p>
  <div class="mt-4 flex justify-end">
    <button>Action</button>
  </div>
</div>
```

## 🎯 Mission Complete!

You now master cards and containers:

- ✅ **Card fundamentals** - Structure, styling, and purpose
- ✅ **Card variations** - Content, image, product, team, testimonial cards
- ✅ **Container patterns** - Sections, grids, lists, sidebars
- ✅ **Advanced techniques** - Hover effects, overlays, expandable content
- ✅ **Responsive design** - Mobile-first approach for all screen sizes
- ✅ **Best practices** - Consistency, hierarchy, accessibility

## 🚀 What's Next?

In the next lesson, we'll learn about **navigation menus** - the roadmap that helps users navigate your website efficiently!

---

**💡 Pro Tip:** Great cards are scannable at a glance. Users should be able to understand what each card offers within 2-3 seconds of looking at it.

**🎨 Remember:** Cards are containers for stories. Each card should tell a complete, compelling story that makes users want to engage further.
