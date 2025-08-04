# 🛠️ Common Tailwind Utilities

**This is your essential toolkit!** These are the Tailwind classes you'll use in 80% of your projects. Master these, and you can build almost anything.

## 🎯 What You'll Learn

By the end of this lesson, you'll know:

- ✅ Essential spacing utilities (padding, margin)
- ✅ Color system (backgrounds, text, borders)
- ✅ Typography utilities (size, weight, alignment)
- ✅ Layout utilities (flexbox, grid, positioning)
- ✅ How to combine them effectively

## 📏 Spacing Utilities (The Foundation)

Spacing is the secret to professional-looking designs!

### **Padding (p-)**

```html
<!-- All sides -->
<div class="p-4">Padding: 16px all sides</div>
<div class="p-8">Padding: 32px all sides</div>

<!-- Specific sides -->
<div class="pt-4">Padding top: 16px</div>
<div class="pb-4">Padding bottom: 16px</div>
<div class="pl-4">Padding left: 16px</div>
<div class="pr-4">Padding right: 16px</div>

<!-- Horizontal/Vertical -->
<div class="px-4">Padding left + right: 16px</div>
<div class="py-4">Padding top + bottom: 16px</div>
```

### **Margin (m-)**

```html
<!-- All sides -->
<div class="m-4">Margin: 16px all sides</div>
<div class="m-auto">Center horizontally</div>

<!-- Specific sides -->
<div class="mt-8">Margin top: 32px</div>
<div class="mb-4">Margin bottom: 16px</div>
<div class="ml-2">Margin left: 8px</div>
<div class="mr-6">Margin right: 24px</div>

<!-- Horizontal/Vertical -->
<div class="mx-auto">Center horizontally</div>
<div class="my-8">Margin top + bottom: 32px</div>
```

### **Spacing Scale:**

```
0 = 0px
1 = 4px
2 = 8px
3 = 12px
4 = 16px
5 = 20px
6 = 24px
8 = 32px
10 = 40px
12 = 48px
16 = 64px
20 = 80px
24 = 96px
```

**Memory Trick:** Each number = 4px (except 0)

- `p-4` = 16px (4 × 4)
- `p-8` = 32px (8 × 4)

## 🎨 Color System

Tailwind has a beautiful, consistent color system!

### **Background Colors (bg-)**

```html
<!-- Primary Colors -->
<div class="bg-blue-500">Blue background</div>
<div class="bg-red-500">Red background</div>
<div class="bg-green-500">Green background</div>
<div class="bg-yellow-500">Yellow background</div>
<div class="bg-purple-500">Purple background</div>

<!-- Neutral Colors -->
<div class="bg-gray-100">Light gray</div>
<div class="bg-gray-500">Medium gray</div>
<div class="bg-gray-900">Dark gray</div>
<div class="bg-white">White</div>
<div class="bg-black">Black</div>
```

### **Text Colors (text-)**

```html
<p class="text-blue-600">Blue text</p>
<p class="text-red-500">Red text</p>
<p class="text-gray-700">Dark gray text</p>
<p class="text-white">White text</p>
```

### **Border Colors (border-)**

```html
<div class="border border-blue-500">Blue border</div>
<div class="border-2 border-red-400">Thick red border</div>
```

### **Color Intensity Scale:**

```
50  = Very light
100 = Light
200 = Lighter
300 = Light
400 = Medium light
500 = Medium (default)
600 = Medium dark
700 = Dark
800 = Darker
900 = Very dark
```

**Most Used Colors:**

- `gray-100` (light backgrounds)
- `gray-600` (secondary text)
- `gray-800` (primary text)
- `blue-500` (primary buttons)
- `red-500` (errors)
- `green-500` (success)

## ✍️ Typography Utilities

Make your text look professional!

### **Text Sizes (text-)**

```html
<p class="text-xs">Extra small text (12px)</p>
<p class="text-sm">Small text (14px)</p>
<p class="text-base">Base text (16px)</p>
<p class="text-lg">Large text (18px)</p>
<p class="text-xl">Extra large (20px)</p>
<p class="text-2xl">2X large (24px)</p>
<p class="text-3xl">3X large (30px)</p>
<p class="text-4xl">4X large (36px)</p>
<p class="text-5xl">5X large (48px)</p>
```

### **Font Weights (font-)**

```html
<p class="font-thin">Thin text</p>
<p class="font-light">Light text</p>
<p class="font-normal">Normal text</p>
<p class="font-medium">Medium text</p>
<p class="font-semibold">Semi-bold text</p>
<p class="font-bold">Bold text</p>
<p class="font-black">Black text</p>
```

### **Text Alignment (text-)**

```html
<p class="text-left">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-right">Right aligned</p>
<p class="text-justify">Justified text</p>
```

### **Line Height (leading-)**

```html
<p class="leading-tight">Tight line height</p>
<p class="leading-normal">Normal line height</p>
<p class="leading-relaxed">Relaxed line height</p>
<p class="leading-loose">Loose line height</p>
```

## 📐 Layout Utilities

Control how elements are positioned and sized!

### **Display Types**

```html
<div class="block">Block element</div>
<span class="inline">Inline element</span>
<div class="inline-block">Inline-block element</div>
<div class="flex">Flex container</div>
<div class="grid">Grid container</div>
<div class="hidden">Hidden element</div>
```

### **Flexbox (flex)**

```html
<!-- Flex Container -->
<div class="flex">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Flex Direction -->
<div class="flex flex-col">Vertical stack</div>
<div class="flex flex-row">Horizontal row</div>

<!-- Justify Content (horizontal alignment) -->
<div class="flex justify-start">Left aligned</div>
<div class="flex justify-center">Center aligned</div>
<div class="flex justify-end">Right aligned</div>
<div class="flex justify-between">Space between</div>

<!-- Align Items (vertical alignment) -->
<div class="flex items-start">Top aligned</div>
<div class="flex items-center">Center aligned</div>
<div class="flex items-end">Bottom aligned</div>
```

### **Width & Height**

```html
<!-- Fixed widths -->
<div class="w-32">Width: 128px</div>
<div class="w-64">Width: 256px</div>

<!-- Percentage widths -->
<div class="w-1/2">Width: 50%</div>
<div class="w-1/3">Width: 33.333%</div>
<div class="w-full">Width: 100%</div>

<!-- Auto widths -->
<div class="w-auto">Auto width</div>
<div class="w-max">Max content width</div>

<!-- Heights -->
<div class="h-32">Height: 128px</div>
<div class="h-screen">Height: 100vh</div>
```

## 🎨 Visual Effects

Add polish to your designs!

### **Borders & Rounded Corners**

```html
<!-- Borders -->
<div class="border">1px border</div>
<div class="border-2">2px border</div>
<div class="border-4">4px border</div>

<!-- Rounded corners -->
<div class="rounded">Small rounded corners</div>
<div class="rounded-md">Medium rounded corners</div>
<div class="rounded-lg">Large rounded corners</div>
<div class="rounded-xl">Extra large rounded corners</div>
<div class="rounded-full">Completely round</div>
```

### **Shadows**

```html
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Default shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-xl">Extra large shadow</div>
```

### **Opacity**

```html
<div class="opacity-25">25% opacity</div>
<div class="opacity-50">50% opacity</div>
<div class="opacity-75">75% opacity</div>
<div class="opacity-100">100% opacity</div>
```

## 🏗️ Real-World Examples

Let's build common UI elements using these utilities:

### **Example 1: Button**

```html
<button
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
>
  Click Me
</button>
```

**Breakdown:**

- `bg-blue-500` = Blue background
- `hover:bg-blue-700` = Darker blue on hover
- `text-white` = White text
- `font-bold` = Bold text
- `py-2` = Vertical padding
- `px-4` = Horizontal padding
- `rounded` = Rounded corners

### **Example 2: Card**

```html
<div class="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
  <img class="w-full h-48 object-cover" src="image.jpg" alt="Image" />
  <div class="p-6">
    <h2 class="text-xl font-bold mb-2">Card Title</h2>
    <p class="text-gray-600">Card description goes here.</p>
  </div>
</div>
```

### **Example 3: Navigation Bar**

```html
<nav class="bg-white shadow-lg">
  <div class="max-w-6xl mx-auto px-4">
    <div class="flex justify-between items-center py-4">
      <div class="text-xl font-bold">Logo</div>
      <div class="space-x-4">
        <a href="#" class="text-gray-600 hover:text-blue-500">Home</a>
        <a href="#" class="text-gray-600 hover:text-blue-500">About</a>
        <a href="#" class="text-gray-600 hover:text-blue-500">Contact</a>
      </div>
    </div>
  </div>
</nav>
```

### **Example 4: Alert Box**

```html
<div
  class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded"
>
  <strong class="font-bold">Success!</strong>
  <span class="block sm:inline">Your action was completed successfully.</span>
</div>
```

## 🎯 Essential Combinations

These class combinations solve 90% of design problems:

### **Centering Content:**

```html
<!-- Center horizontally -->
<div class="mx-auto">Centered div</div>
<div class="text-center">Centered text</div>

<!-- Center with flexbox -->
<div class="flex justify-center items-center h-screen">Perfect center</div>
```

### **Responsive Cards:**

```html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg">
  Content here
</div>
```

### **Button Styles:**

```html
<!-- Primary Button -->
<button
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
>
  Primary
</button>

<!-- Secondary Button -->
<button
  class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
>
  Secondary
</button>

<!-- Outline Button -->
<button
  class="border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded"
>
  Outline
</button>
```

### **Form Elements:**

```html
<!-- Input Field -->
<input
  class="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
  type="text"
  placeholder="Enter text"
/>

<!-- Label -->
<label class="block text-gray-700 text-sm font-bold mb-2">Username</label>
```

## 🧠 Memory Tips

### **Remember Spacing:**

- Think in multiples of 4px
- `p-4` = 16px (4 × 4)
- `m-8` = 32px (8 × 4)

### **Remember Colors:**

- 500 is the "standard" shade
- Lower numbers = lighter
- Higher numbers = darker

### **Remember Text Sizes:**

- `text-base` = normal (16px)
- `text-lg` = slightly larger
- `text-xl` = extra large
- `text-2xl`, `text-3xl`, etc. = even larger

## 📝 Practice Challenge

Try to recreate this design using only the utilities you've learned:

**Goal:** A pricing card with:

- White background
- Rounded corners
- Drop shadow
- Blue title text
- Large price number
- Gray description text
- Green "Get Started" button
- Proper spacing throughout

**Starter HTML:**

```html
<div class="[YOUR CLASSES HERE]">
  <h3 class="[YOUR CLASSES HERE]">Pro Plan</h3>
  <p class="[YOUR CLASSES HERE]">$29</p>
  <p class="[YOUR CLASSES HERE]">Perfect for growing businesses</p>
  <button class="[YOUR CLASSES HERE]">Get Started</button>
</div>
```

## 🎯 Mission Complete!

You now have the essential Tailwind toolkit:

- ✅ **Spacing utilities** - Control padding and margin
- ✅ **Color system** - Backgrounds, text, and borders
- ✅ **Typography** - Sizes, weights, and alignment
- ✅ **Layout utilities** - Flexbox and positioning
- ✅ **Visual effects** - Shadows, borders, and opacity
- ✅ **Common combinations** - Professional patterns

## 🚀 What's Next?

In the next lesson, we'll learn about **responsive utilities** - making your designs look perfect on phones, tablets, and desktops!

---

**💡 Pro Tip:** Don't try to memorize everything. Keep this lesson bookmarked as a reference. The more you use these classes, the more natural they'll become!

**🎯 Quick Reference:**

- Spacing: `p-4`, `m-8`, `px-6`, `py-2`
- Colors: `bg-blue-500`, `text-gray-700`, `border-red-400`
- Text: `text-xl`, `font-bold`, `text-center`
- Layout: `flex`, `justify-center`, `items-center`
- Effects: `rounded-lg`, `shadow-md`, `opacity-75`
