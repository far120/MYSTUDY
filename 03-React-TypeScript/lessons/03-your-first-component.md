# Lesson 3: Your First Component 🧩

## Welcome to the World of Components! 🎯

Imagine you're building with LEGO blocks. Each block has a specific shape and purpose, and you combine them to create amazing structures. React components work exactly the same way!

## 🤔 What is a Component?

A **component** is like a custom HTML tag that you create. Instead of just using `<div>`, `<p>`, and `<button>`, you can create your own tags like `<UserCard>`, `<NavigationBar>`, or `<ShoppingCart>`.

### Real-World Example:

Think about **Twitter's interface**:

- Each tweet is a `<Tweet>` component
- The sidebar is a `<Sidebar>` component
- The trending section is a `<TrendingTopics>` component
- The user profile pic is a `<Avatar>` component

## 🎯 Your First Component: Hello World

Let's create your very first custom component!

### Step 1: Create a New File

In your project, create a new file: `src/components/HelloWorld.tsx`

```tsx
// src/components/HelloWorld.tsx
import React from "react";

function HelloWorld() {
  return (
    <div>
      <h1>Hello, React World! 🌍</h1>
      <p>This is my first custom component!</p>
    </div>
  );
}

export default HelloWorld;
```

### Step 2: Use Your Component in App.tsx

Update your `src/App.tsx`:

```tsx
import React from "react";
import "./App.css";
import HelloWorld from "./components/HelloWorld";

function App() {
  return (
    <div className="App">
      <HelloWorld />
    </div>
  );
}

export default App;
```

### Step 3: See the Magic! ✨

Save both files and look at your browser. You should see your custom component displayed!

## 🎨 Understanding JSX

**JSX** stands for "JavaScript XML". It's like HTML, but with superpowers!

### HTML vs JSX:

**Regular HTML:**

```html
<div class="container">
  <h1>Welcome</h1>
  <p>This is regular HTML</p>
</div>
```

**JSX (React):**

```tsx
<div className="container">
  <h1>Welcome</h1>
  <p>This is JSX in React</p>
</div>
```

### Key Differences:

1. **className instead of class**

```tsx
// ❌ Wrong
<div class="my-class">

// ✅ Correct
<div className="my-class">
```

2. **Self-closing tags must have /**

```tsx
// ❌ Wrong
<img src="photo.jpg">
<br>

// ✅ Correct
<img src="photo.jpg" />
<br />
```

3. **JavaScript expressions in {}**

```tsx
const name = "John";
const age = 25;

return (
  <div>
    <h1>Hello {name}!</h1>
    <p>You are {age} years old</p>
    <p>Next year you'll be {age + 1}</p>
  </div>
);
```

## 🔥 Let's Build Something Cooler: User Profile Card

Let's create a more interesting component:

### Create `src/components/UserProfile.tsx`:

```tsx
import React from "react";

function UserProfile() {
  // JavaScript variables
  const userName = "Sarah Johnson";
  const userJob = "Frontend Developer";
  const userAge = 28;
  const userLocation = "San Francisco, CA";
  const profilePicture = "https://via.placeholder.com/150";

  // Calculating derived values
  const isExperienced = userAge > 25;
  const yearsUntilRetirement = 65 - userAge;

  return (
    <div className="border-2 border-gray-300 rounded-lg p-5 m-5 text-center max-w-sm bg-gray-50 shadow-md">
      <img
        src={profilePicture}
        alt="Profile"
        className="w-24 h-24 rounded-full mb-4 mx-auto"
      />

      <h2 className="text-xl font-semibold text-gray-800 mb-2">{userName}</h2>

      <p className="text-gray-600 text-base mb-2">{userJob}</p>

      <p className="text-gray-500 mb-2">📍 {userLocation}</p>

      <p className="text-gray-700 mb-3">🎂 {userAge} years old</p>

      {/* Conditional rendering */}
      {isExperienced ? (
        <p className="text-green-600 font-bold mb-3">
          ✅ Experienced Professional
        </p>
      ) : (
        <p className="text-orange-500 mb-3">🌱 Rising Talent</p>
      )}

      <p className="text-sm text-gray-400">
        {yearsUntilRetirement} years until retirement
      </p>
    </div>
  );
}

export default UserProfile;
```

### Update `src/App.tsx` to use the new component:

```tsx
import React from "react";
import "./App.css";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        My React App
      </h1>
      <div className="flex justify-center">
        <UserProfile />
      </div>
    </div>
  );
}

export default App;
```

## 🎯 Understanding What We Built

### 1. **Variables in Components**

```tsx
const userName = "Sarah Johnson";
const userAge = 28;
```

We can store data in JavaScript variables and use them in our JSX.

### 2. **JavaScript Expressions**

```tsx
<p>You are {userAge} years old</p>
<p>Next year you'll be {userAge + 1}</p>
```

Anything inside `{}` is JavaScript code.

### 3. **Calculated Values**

```tsx
const isExperienced = userAge > 25;
const yearsUntilRetirement = 65 - userAge;
```

We can calculate new values based on our data.

### 4. **Conditional Rendering**

```tsx
{
  isExperienced ? <p>✅ Experienced Professional</p> : <p>🌱 Rising Talent</p>;
}
```

Show different content based on conditions.

### 5. **Inline Styles**

```tsx
style={{
  border: '2px solid #ddd',
  borderRadius: '10px',
  padding: '20px'
}}
```

We can add CSS styles directly in JSX.

## 🌟 Component Rules & Best Practices

### 1. **Component Names Must Start with Capital Letter**

```tsx
// ✅ Correct
function UserProfile() {}
function NavBar() {}

// ❌ Wrong
function userProfile() {}
function navBar() {}
```

### 2. **One Component Per File**

```tsx
// ✅ Good organization
// UserProfile.tsx - contains only UserProfile component
// NavBar.tsx - contains only NavBar component
```

### 3. **Return Only One Parent Element**

```tsx
// ❌ Wrong - multiple parent elements
function MyComponent() {
  return (
    <h1>Title</h1>
    <p>Description</p>
  );
}

// ✅ Correct - wrapped in one parent
function MyComponent() {
  return (
    <div>
      <h1>Title</h1>
      <p>Description</p>
    </div>
  );
}

// ✅ Also correct - using React Fragment
function MyComponent() {
  return (
    <>
      <h1>Title</h1>
      <p>Description</p>
    </>
  );
}
```

## 🎮 Hands-On Exercise: Create a Product Card

Let's create a product card component to practice!

### Create `src/components/ProductCard.tsx`:

```tsx
import React from "react";

function ProductCard() {
  // Product data
  const productName = "Wireless Headphones";
  const price = 99.99;
  const originalPrice = 149.99;
  const rating = 4.5;
  const reviewCount = 1247;
  const isOnSale = price < originalPrice;
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  const inStock = true;
  const productImage = "https://via.placeholder.com/200";

  return (
    <div className="border border-gray-200 rounded-lg p-4 m-4 max-w-xs bg-white shadow-md hover:shadow-lg transition-shadow">
      {/* Product Image */}
      <img
        src={productImage}
        alt={productName}
        className="w-full h-36 object-cover rounded mb-3"
      />

      {/* Sale Badge */}
      {isOnSale && (
        <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold mb-2 inline-block">
          {discount}% OFF
        </div>
      )}

      {/* Product Name */}
      <h3 className="text-base font-semibold text-gray-800 mb-2">
        {productName}
      </h3>

      {/* Rating */}
      <div className="mb-2">
        <span className="text-yellow-400">
          {"★".repeat(Math.floor(rating))}
          {"☆".repeat(5 - Math.floor(rating))}
        </span>
        <span className="ml-2 text-sm text-gray-600">
          {rating} ({reviewCount} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="mb-3">
        <span className="text-xl font-bold text-gray-800">${price}</span>

        {isOnSale && (
          <span className="ml-2 text-base text-gray-500 line-through">
            ${originalPrice}
          </span>
        )}
      </div>

      {/* Stock Status */}
      <div className="mb-3">
        {inStock ? (
          <span className="text-green-600 text-sm font-semibold">
            ✅ In Stock
          </span>
        ) : (
          <span className="text-red-600 text-sm font-semibold">
            ❌ Out of Stock
          </span>
        )}
      </div>

      {/* Add to Cart Button */}
      <button
        className={`w-full py-2 rounded text-sm font-bold transition-colors ${
          inStock
            ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}

export default ProductCard;
```

### Use it in App.tsx:

```tsx
import React from "react";
import "./App.css";
import UserProfile from "./components/UserProfile";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        My React Components
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        <UserProfile />
        <ProductCard />
      </div>
    </div>
  );
}

export default App;
```

## 🎯 What You've Learned

### ✅ Core Concepts:

1. **Components are functions** that return JSX
2. **JSX is HTML-like** but with JavaScript superpowers
3. **{} allows JavaScript expressions** inside JSX
4. **Variables can store data** and be used in JSX
5. **Conditional rendering** shows different content based on conditions
6. **Components are reusable** and composable

### ✅ Practical Skills:

1. **Creating component files**
2. **Writing JSX syntax**
3. **Using variables in components**
4. **Applying inline styles**
5. **Importing and exporting components**
6. **Building real UI elements**

## 🚀 Quick Challenge

Try creating a **Weather Card** component that shows:

- City name
- Temperature
- Weather condition (sunny, rainy, cloudy)
- An emoji for the weather
- "Feels like" temperature

Use variables and conditional rendering to make it dynamic!

## 🔮 What's Next?

In **Lesson 4: Props and Types**, we'll learn how to:

- Make components reusable with different data
- Pass information between components
- Use TypeScript to ensure data safety
- Build truly dynamic interfaces

You're doing great! Components are the foundation of React, and you've just built your first ones! 🎉

---

**💡 Remember**: Every complex website is just a combination of simple components. Start thinking of everything you see online as potential components!
