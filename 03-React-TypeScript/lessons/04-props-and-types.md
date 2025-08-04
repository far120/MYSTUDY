# Lesson 4: Props and Types 📦

## Making Components Reusable with Props! 🔄

Imagine you have a cookie cutter. The cutter is the same, but you can make different cookies by using different dough, colors, and decorations. **Props** work the same way - they let you use the same component with different data!

## 🤔 What are Props?

**Props** (short for "properties") are like arguments you pass to a function. They let you customize how a component looks and behaves.

### Real-World Analogy:

Think of a **business card printing machine**:

- The machine (component) is always the same
- But you feed it different information (props): name, job title, phone number
- It produces different business cards with the same design

## 🎯 Before Props: The Problem

Let's see why we need props. Here's what we built in the last lesson:

```tsx
// This UserProfile is "hardcoded" - it always shows the same person
function UserProfile() {
  const userName = "Sarah Johnson";
  const userJob = "Frontend Developer";
  const userAge = 28;

  return (
    <div>
      <h2>{userName}</h2>
      <p>{userJob}</p>
      <p>{userAge} years old</p>
    </div>
  );
}
```

**Problem**: This component can only show Sarah Johnson. What if we want to show different people?

## 🌟 After Props: The Solution

Let's make our component reusable by accepting props:

```tsx
// Define the shape of our props using TypeScript
interface UserProfileProps {
  name: string;
  job: string;
  age: number;
}

// Now our component accepts props!
function UserProfile({ name, job, age }: UserProfileProps) {
  return (
    <div className="border-2 border-gray-300 rounded-lg p-5 m-2 text-center max-w-xs bg-white shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
      <p className="text-gray-600 mb-1">{job}</p>
      <p className="text-gray-700">{age} years old</p>
    </div>
  );
}

export default UserProfile;
```

### Using the Component with Different Props:

```tsx
// In App.tsx
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Our Team
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {/* Same component, different data! */}
        <UserProfile name="Sarah Johnson" job="Frontend Developer" age={28} />
        <UserProfile name="Mike Chen" job="Backend Developer" age={32} />
        <UserProfile name="Emily Davis" job="UI Designer" age={26} />
      </div>
    </div>
  );
}
```

## 🎯 Understanding TypeScript Interfaces

### Why TypeScript Interfaces?

```tsx
// Without TypeScript - Dangerous!
function UserProfile(props) {
  return <h1>{props.nam}</h1>; // Typo! But no warning
}

// Someone could pass wrong data:
<UserProfile name={123} />; // Number instead of string!
```

```tsx
// With TypeScript - Safe!
interface UserProfileProps {
  name: string;
  job: string;
  age: number;
}

function UserProfile({ name, job, age }: UserProfileProps) {
  return <h1>{name}</h1>; // TypeScript ensures 'name' exists!
}

// TypeScript catches errors:
<UserProfile name={123} />        // ❌ Error: number not allowed
<UserProfile nam="John" />        // ❌ Error: typo in prop name
<UserProfile name="John" />       // ❌ Error: missing required props
```

### Different Types of Props:

```tsx
interface ComponentProps {
  // Basic types
  title: string;
  count: number;
  isVisible: boolean;

  // Arrays
  tags: string[];
  numbers: number[];

  // Objects
  user: {
    name: string;
    email: string;
  };

  // Optional props (with ?)
  description?: string;
  color?: string;

  // Functions
  onClick: () => void;
  onSubmit: (data: string) => void;
}
```

## 🎮 Let's Build: Enhanced Product Card

Let's create a flexible ProductCard component:

### Create `src/components/ProductCard.tsx`:

```tsx
import React from "react";

// Define what props our component expects
interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number; // Optional - not all products are on sale
  rating: number;
  reviewCount: number;
  imageUrl: string;
  inStock: boolean;
  category: string;
}

function ProductCard({
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  imageUrl,
  inStock,
  category,
}: ProductCardProps) {
  // Calculate if product is on sale
  const isOnSale = originalPrice && originalPrice > price;
  const discount = isOnSale
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="border border-gray-200 rounded-lg p-4 m-4 max-w-sm bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Category Badge */}
      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-bold mb-2 inline-block uppercase">
        {category}
      </div>

      {/* Product Image */}
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover rounded mb-3"
      />

      {/* Sale Badge */}
      {isOnSale && (
        <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold mb-2 inline-block">
          {discount}% OFF
        </div>
      )}

      {/* Product Name */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
        {name}
      </h3>

      {/* Rating */}
      <div className="mb-3">
        <span className="text-yellow-400 text-base">
          {"★".repeat(Math.floor(rating))}
          {"☆".repeat(5 - Math.floor(rating))}
        </span>
        <span className="ml-2 text-sm text-gray-600">
          {rating} ({reviewCount.toLocaleString()} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="mb-4">
        <span className="text-2xl font-bold text-gray-800">
          ${price.toFixed(2)}
        </span>

        {isOnSale && originalPrice && (
          <span className="ml-2 text-lg text-gray-500 line-through">
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>

      {/* Stock Status */}
      <div className="mb-4">
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
        className={`w-full py-3 rounded-md text-base font-semibold transition-colors duration-200 ${
          inStock
            ? "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={!inStock}
      >
        {inStock ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}

export default ProductCard;
```

### Use it with Different Products in `App.tsx`:

```tsx
import React from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Our Products
      </h1>

      <div className="flex flex-wrap justify-center gap-6 px-5">
        <ProductCard
          name="Wireless Bluetooth Headphones"
          price={79.99}
          originalPrice={129.99}
          rating={4.5}
          reviewCount={2847}
          imageUrl="https://via.placeholder.com/300x200/1976d2/white?text=Headphones"
          inStock={true}
          category="Electronics"
        />

        <ProductCard
          name="Ergonomic Office Chair"
          price={299.99}
          rating={4.8}
          reviewCount={1256}
          imageUrl="https://via.placeholder.com/300x200/4caf50/white?text=Office+Chair"
          inStock={true}
          category="Furniture"
        />

        <ProductCard
          name="Smartphone Case"
          price={24.99}
          originalPrice={39.99}
          rating={4.2}
          reviewCount={892}
          imageUrl="https://via.placeholder.com/300x200/ff9800/white?text=Phone+Case"
          inStock={false}
          category="Accessories"
        />

        <ProductCard
          name="Mechanical Keyboard"
          price={149.99}
          rating={4.7}
          reviewCount={1543}
          imageUrl="https://via.placeholder.com/300x200/9c27b0/white?text=Keyboard"
          inStock={true}
          category="Electronics"
        />
      </div>
    </div>
  );
}

export default App;
```

## 🎯 Default Props & Optional Props

### Optional Props with Default Values:

```tsx
interface GreetingProps {
  name: string;
  greeting?: string;  // Optional prop
  showTime?: boolean; // Optional prop
}

function Greeting({
  name,
  greeting = "Hello",     // Default value
  showTime = false       // Default value
}: GreetingProps) {
  const currentTime = new Date().toLocaleTimeString();

  return (
    <div>
      <h1>{greeting}, {name}!</h1>
      {showTime && <p>Current time: {currentTime}</p>}
    </div>
  );
}

// Usage:
<Greeting name="John" />                           // Uses defaults
<Greeting name="Sarah" greeting="Hi" />           // Custom greeting
<Greeting name="Mike" greeting="Hey" showTime />  // Show time too
```

## 🧩 Complex Props: Objects and Arrays

### Passing Object Props:

```tsx
interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

interface UserCardProps {
  user: User;
  showEmail?: boolean;
}

function UserCard({ user, showEmail = false }: UserCardProps) {
  return (
    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-md">
      <img
        src={user.avatar}
        alt={user.name}
        className="w-12 h-12 rounded-full mb-3"
      />
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{user.name}</h3>
      {showEmail && <p className="text-gray-600 text-sm">{user.email}</p>}
    </div>
  );
}

// Usage:
const userData = {
  id: 1,
  name: "Alice Smith",
  email: "alice@example.com",
  avatar: "https://via.placeholder.com/50",
};

<UserCard user={userData} showEmail />;
```

### Passing Array Props:

```tsx
interface TagListProps {
  tags: string[];
  color?: string;
}

function TagList({ tags, color = "#007bff" }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-2 py-1 rounded text-xs font-medium text-white"
          style={{ backgroundColor: color }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

// Usage:
<TagList tags={["React", "TypeScript", "JavaScript"]} />
<TagList tags={["Beginner", "Tutorial"]} color="#4caf50" />
```

## 🎮 Hands-On Exercise: Blog Post Card

Create a `BlogPost` component that accepts these props:

```tsx
interface BlogPostProps {
  title: string;
  excerpt: string;
  author: string;
  publishDate: string;
  tags: string[];
  readTime: number;
  imageUrl?: string;
  isFeature: boolean;
}
```

### Your Challenge:

1. Create the component file
2. Design a nice-looking blog post card
3. Show different styling for featured posts
4. Display all the props meaningfully
5. Use it in App.tsx with 2-3 different blog posts

## 🎯 Props vs State (Preview)

### Props (What We Learned Today):

- **Data passed FROM parent TO child**
- **Read-only** (component can't change them)
- **Like function parameters**

```tsx
// Parent decides what data to pass
<UserCard name="John" age={25} />;

// Child receives and displays the data
function UserCard({ name, age }) {
  // Can read props, but can't change them
  return (
    <div>
      {name} is {age} years old
    </div>
  );
}
```

### State (Next Lesson):

- **Data that belongs TO the component**
- **Can be changed** by the component
- **Like component's memory**

```tsx
function Counter() {
  const [count, setCount] = useState(0); // Component owns this data

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
```

## 🎉 What You've Mastered

### ✅ Core Concepts:

1. **Props make components reusable** with different data
2. **TypeScript interfaces** define prop shapes and catch errors
3. **Destructuring** makes props easier to use
4. **Optional props** with default values provide flexibility
5. **Complex props** can be objects, arrays, or functions

### ✅ Practical Skills:

1. **Creating TypeScript interfaces**
2. **Passing props between components**
3. **Using props in JSX**
4. **Setting default values**
5. **Building truly reusable components**

## 🚀 What's Next?

In **Lesson 5: State Basics**, we'll learn how to:

- Make components remember things (state)
- Handle user interactions
- Update the UI when data changes
- Build interactive applications

You're building the foundation of React! Props and state are the two most important concepts - and you've conquered props! 🎉

---

**💡 Pro Tip**: Always think "What data does this component need to work?" That data should be props. This mindset will help you build flexible, reusable components!
