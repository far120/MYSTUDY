# 🔘 Buttons and Forms with Tailwind

**The foundation of interaction!** Buttons and forms are the most important interactive elements on any website. Master these, and you can create professional-looking, accessible interfaces.

## 🎯 What You'll Learn

By the end of this lesson, you'll master:

- ✅ Creating beautiful button variations
- ✅ Building accessible form components
- ✅ Form validation styling
- ✅ Interactive states (hover, focus, disabled)
- ✅ Mobile-first form design

## 🔘 Button Components

Buttons are the workhorses of web interaction. Let's build a complete button system!

### **Basic Button Foundation**

```html
<!-- Base button styles -->
<button
  class="font-semibold py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
>
  Base Button
</button>
```

**Breaking down the base styles:**

- `font-semibold` = Bold text weight
- `py-2 px-4` = Comfortable padding (8px vertical, 16px horizontal)
- `rounded` = Subtle rounded corners
- `transition-colors duration-200` = Smooth color transitions
- `focus:outline-none` = Remove default outline
- `focus:ring-2 focus:ring-offset-2` = Custom focus ring for accessibility

### **Button Variations**

#### **1. Primary Button (Main Actions)**

```html
<button
  class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
>
  Primary Action
</button>
```

#### **2. Secondary Button (Alternative Actions)**

```html
<button
  class="bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
>
  Secondary Action
</button>
```

#### **3. Outline Button (Subtle Actions)**

```html
<button
  class="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 active:border-blue-600 font-semibold py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
>
  Outline Action
</button>
```

#### **4. Danger Button (Destructive Actions)**

```html
<button
  class="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
>
  Delete Item
</button>
```

#### **5. Success Button (Positive Actions)**

```html
<button
  class="bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
>
  Save Changes
</button>
```

### **Button Sizes**

#### **Small Button**

```html
<button
  class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-3 text-sm rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
>
  Small
</button>
```

#### **Large Button**

```html
<button
  class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 text-lg rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
>
  Large Action
</button>
```

#### **Full Width Button**

```html
<button
  class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
>
  Full Width Button
</button>
```

### **Button States**

#### **Loading State**

```html
<button
  class="bg-blue-500 text-white font-semibold py-2 px-4 rounded cursor-not-allowed opacity-75 flex items-center"
  disabled
>
  <svg
    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      class="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      stroke-width="4"
    ></circle>
    <path
      class="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
  Processing...
</button>
```

#### **Disabled State**

```html
<button
  class="bg-gray-300 text-gray-500 font-semibold py-2 px-4 rounded cursor-not-allowed"
  disabled
>
  Disabled Button
</button>
```

### **Button with Icons**

#### **Icon Before Text**

```html
<button
  class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
>
  <svg
    class="w-4 h-4 mr-2"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M12 4v16m8-8H4"
    ></path>
  </svg>
  Add Item
</button>
```

#### **Icon After Text**

```html
<button
  class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
>
  Continue
  <svg
    class="w-4 h-4 ml-2"
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
</button>
```

#### **Icon Only Button**

```html
<button
  class="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
>
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    ></path>
  </svg>
</button>
```

## 📝 Form Components

Forms are critical for user interaction. Let's build accessible, beautiful form components!

### **Input Fields**

#### **Basic Text Input**

```html
<div class="mb-4">
  <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
    Full Name
  </label>
  <input
    type="text"
    id="name"
    name="name"
    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
    placeholder="Enter your full name"
  />
</div>
```

#### **Input with Icon**

```html
<div class="mb-4">
  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
    Email Address
  </label>
  <div class="relative">
    <div
      class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
    >
      <svg
        class="h-5 w-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
        ></path>
      </svg>
    </div>
    <input
      type="email"
      id="email"
      name="email"
      class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      placeholder="Enter your email"
    />
  </div>
</div>
```

#### **Textarea**

```html
<div class="mb-4">
  <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
    Message
  </label>
  <textarea
    id="message"
    name="message"
    rows="4"
    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical transition-colors duration-200"
    placeholder="Enter your message here..."
  ></textarea>
</div>
```

#### **Select Dropdown**

```html
<div class="mb-4">
  <label for="country" class="block text-sm font-medium text-gray-700 mb-2">
    Country
  </label>
  <select
    id="country"
    name="country"
    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
  >
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="uk">United Kingdom</option>
    <option value="de">Germany</option>
  </select>
</div>
```

### **Checkbox and Radio Inputs**

#### **Checkbox**

```html
<div class="mb-4">
  <div class="flex items-center">
    <input
      type="checkbox"
      id="newsletter"
      name="newsletter"
      class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
    />
    <label for="newsletter" class="ml-2 block text-sm text-gray-700">
      Subscribe to our newsletter
    </label>
  </div>
</div>
```

#### **Radio Buttons**

```html
<div class="mb-4">
  <fieldset>
    <legend class="block text-sm font-medium text-gray-700 mb-2">
      Preferred Contact Method
    </legend>
    <div class="space-y-2">
      <div class="flex items-center">
        <input
          type="radio"
          id="contact-email"
          name="contact-method"
          value="email"
          class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
        <label for="contact-email" class="ml-2 block text-sm text-gray-700">
          Email
        </label>
      </div>
      <div class="flex items-center">
        <input
          type="radio"
          id="contact-phone"
          name="contact-method"
          value="phone"
          class="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
        <label for="contact-phone" class="ml-2 block text-sm text-gray-700">
          Phone
        </label>
      </div>
    </div>
  </fieldset>
</div>
```

### **Form Validation States**

#### **Success State**

```html
<div class="mb-4">
  <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
    Username
  </label>
  <input
    type="text"
    id="username"
    name="username"
    class="w-full px-3 py-2 border border-green-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
    placeholder="Enter username"
    value="john_doe"
  />
  <p class="mt-1 text-sm text-green-600 flex items-center">
    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
      <path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clip-rule="evenodd"
      ></path>
    </svg>
    Username is available
  </p>
</div>
```

#### **Error State**

```html
<div class="mb-4">
  <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
    Password
  </label>
  <input
    type="password"
    id="password"
    name="password"
    class="w-full px-3 py-2 border border-red-500 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
    placeholder="Enter password"
  />
  <p class="mt-1 text-sm text-red-600 flex items-center">
    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
      <path
        fill-rule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
        clip-rule="evenodd"
      ></path>
    </svg>
    Password must be at least 8 characters
  </p>
</div>
```

## 🏗️ Complete Form Example

Here's a complete, accessible contact form:

```html
<form class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
  <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Contact Us</h2>

  <!-- Name Field -->
  <div class="mb-4">
    <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
      Full Name *
    </label>
    <input
      type="text"
      id="name"
      name="name"
      required
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      placeholder="Enter your full name"
    />
  </div>

  <!-- Email Field -->
  <div class="mb-4">
    <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
      Email Address *
    </label>
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <svg
          class="h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
          ></path>
        </svg>
      </div>
      <input
        type="email"
        id="email"
        name="email"
        required
        class="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
        placeholder="Enter your email"
      />
    </div>
  </div>

  <!-- Subject Field -->
  <div class="mb-4">
    <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
      Subject
    </label>
    <select
      id="subject"
      name="subject"
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
    >
      <option value="">Select a subject</option>
      <option value="general">General Inquiry</option>
      <option value="support">Technical Support</option>
      <option value="sales">Sales Question</option>
      <option value="feedback">Feedback</option>
    </select>
  </div>

  <!-- Message Field -->
  <div class="mb-6">
    <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
      Message *
    </label>
    <textarea
      id="message"
      name="message"
      rows="4"
      required
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical transition-colors duration-200"
      placeholder="Enter your message here..."
    ></textarea>
  </div>

  <!-- Newsletter Checkbox -->
  <div class="mb-6">
    <div class="flex items-center">
      <input
        type="checkbox"
        id="newsletter"
        name="newsletter"
        class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      />
      <label for="newsletter" class="ml-2 block text-sm text-gray-700">
        Subscribe to our newsletter for updates
      </label>
    </div>
  </div>

  <!-- Submit Button -->
  <button
    type="submit"
    class="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    Send Message
  </button>
</form>
```

## 📱 Mobile-First Form Design

### **Responsive Form Layout**

```html
<div class="w-full max-w-md mx-auto px-4 sm:px-0">
  <form class="bg-white p-4 sm:p-6 rounded-lg shadow-md">
    <!-- Form fields with responsive spacing -->
    <div class="space-y-4 sm:space-y-6">
      <!-- Fields go here -->
    </div>
  </form>
</div>
```

### **Mobile-Optimized Inputs**

```html
<!-- Larger touch targets on mobile -->
<input
  type="text"
  class="w-full px-3 py-3 sm:py-2 text-base sm:text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
/>
```

## 🎯 Accessibility Best Practices

### **1. Always Use Labels**

```html
<!-- ✅ Good: Explicit label -->
<label for="email" class="block text-sm font-medium text-gray-700 mb-2">
  Email Address
</label>
<input type="email" id="email" name="email" class="..." />

<!-- ❌ Bad: No label -->
<input type="email" placeholder="Email" class="..." />
```

### **2. Provide Clear Error Messages**

```html
<input
  type="email"
  aria-describedby="email-error"
  class="border border-red-500 ..."
/>
<p id="email-error" class="text-red-600 text-sm mt-1">
  Please enter a valid email address
</p>
```

### **3. Use Proper Input Types**

```html
<input type="email" ... />
<!-- Email keyboard on mobile -->
<input type="tel" ... />
<!-- Phone keyboard on mobile -->
<input type="url" ... />
<!-- URL keyboard on mobile -->
<input type="number" ... />
<!-- Numeric keyboard on mobile -->
```

## 🎯 Mission Complete!

You now master buttons and forms:

- ✅ **Button variations** - Primary, secondary, outline, danger, success
- ✅ **Button states** - Hover, focus, active, disabled, loading
- ✅ **Button sizes** - Small, default, large, full-width
- ✅ **Form components** - Inputs, textareas, selects, checkboxes, radios
- ✅ **Validation states** - Success, error, with clear feedback
- ✅ **Accessibility** - Proper labels, focus states, error messages

## 🚀 What's Next?

In the next lesson, we'll learn about **cards and containers** - the building blocks for organizing content beautifully!

---

**💡 Pro Tip:** Great forms are invisible - users should never have to think about how to use them. Focus on clarity, feedback, and making the happy path obvious!

**🎯 Remember:** Buttons should look clickable, forms should feel natural, and both should work perfectly on every device.
