# Lesson 22: React Router and Navigation 🧭

## Welcome to React Router! 🚀

**React Router** is the standard library for routing in React applications! It lets you create single-page applications (SPAs) with multiple views, navigation, and URL management. Let's build applications that feel like traditional websites but with React's power!

## 🎯 Router Setup & Basic Routing

```tsx
// Install React Router: npm install react-router-dom @types/react-router-dom

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation,
  useParams
} from 'react-router-dom';

// Basic page components
function HomePage() {
  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          Welcome to Our App! 🎉
        </h1>
        <p className="text-lg text-blue-700 mb-8">
          This is the home page of our application. Navigate using the menu above.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="/products"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">🛒 Products</h3>
            <p className="text-gray-600">Browse our product catalog</p>
          </Link>
          
          <Link 
            to="/about"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">ℹ️ About</h3>
            <p className="text-gray-600">Learn more about us</p>
          </Link>
          
          <Link 
            to="/contact"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">📞 Contact</h3>
            <p className="text-gray-600">Get in touch with us</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-green-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-900 mb-6">About Us 🏢</h1>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-lg text-gray-700 mb-6">
            We are a company dedicated to creating amazing user experiences 
            with React and TypeScript. Our team has been building modern 
            web applications for over 5 years.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-6">
            To make web development more enjoyable and productive by 
            teaching modern frameworks and best practices.
          </p>
          
          <div className="flex gap-4">
            <button 
              onClick={() => navigate('/')}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              ← Back to Home
            </button>
            
            <button 
              onClick={() => navigate('/contact')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-colors"
            >
              Contact Us →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thanks ${formData.name}! We'll get back to you soon.`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-purple-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-900 mb-6">Contact Us 📞</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function NotFoundPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-red-50 p-8 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-red-700 mb-4">Page Not Found</h2>
        <p className="text-red-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md transition-colors"
        >
          Go Back Home
        </button>
      </div>
    </div>
  );
}

// Navigation component
function Navigation() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/products', label: 'Products', icon: '🛒' },
    { path: '/about', label: 'About', icon: 'ℹ️' },
    { path: '/contact', label: 'Contact', icon: '📞' },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            MyApp 🚀
          </Link>
          
          <div className="flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-100 text-blue-700 font-semibold'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

// Basic App with routing
export function BasicRoutingApp() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/products" element={<Navigate to="/products/all" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}
```

## 🎯 Dynamic Routes & Parameters

```tsx
// Product types
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  inStock: boolean;
}

// Sample data
const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 129.99,
    description: "High-quality wireless headphones with noise cancellation.",
    category: "Electronics",
    image: "🎧",
    inStock: true
  },
  {
    id: 2,
    name: "Coffee Mug",
    price: 15.99,
    description: "Ceramic coffee mug perfect for your morning brew.",
    category: "Kitchen",
    image: "☕",
    inStock: true
  },
  {
    id: 3,
    name: "Laptop Stand",
    price: 49.99,
    description: "Adjustable laptop stand for better ergonomics.",
    category: "Office",
    image: "💻",
    inStock: false
  },
  {
    id: 4,
    name: "Plant Pot",
    price: 24.99,
    description: "Beautiful ceramic pot for your favorite plants.",
    category: "Home",
    image: "🪴",
    inStock: true
  }
];

const categories = ["All", "Electronics", "Kitchen", "Office", "Home"];

// Products list page with category filtering
function ProductsPage() {
  const { category = 'all' } = useParams<{ category: string }>();
  const navigate = useNavigate();
  
  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(p => p.category.toLowerCase() === category.toLowerCase());

  const handleCategoryChange = (newCategory: string) => {
    navigate(`/products/${newCategory.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Products {category !== 'all' && `- ${category.charAt(0).toUpperCase() + category.slice(1)}`}
        </h1>
        
        {/* Category filter */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Filter by Category:</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  category === cat.toLowerCase() || (cat === 'All' && category === 'all')
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        
        {/* Products grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6 text-center">
                  <div className="text-6xl mb-4">{product.image}</div>
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <p className="text-2xl font-bold text-blue-600 mb-3">
                    ${product.price}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {product.category}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      product.inStock 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  
                  <Link
                    to={`/product/${product.id}`}
                    className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Individual product page
function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const product = products.find(p => p.id === Number(id));
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/products/all')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-blue-600 hover:text-blue-700 transition-colors"
        >
          ← Back
        </button>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 text-center bg-gray-100">
              <div className="text-9xl mb-4">{product.image}</div>
            </div>
            
            <div className="md:w-1/2 p-8">
              <div className="mb-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <p className="text-gray-600 text-lg mb-6">
                {product.description}
              </p>
              
              <div className="flex items-center justify-between mb-6">
                <span className="text-4xl font-bold text-blue-600">
                  ${product.price}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.inStock 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
                </span>
              </div>
              
              <div className="space-y-3">
                <button
                  disabled={!product.inStock}
                  className={`w-full py-3 px-6 rounded-md font-medium transition-colors ${
                    product.inStock
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-md font-medium transition-colors">
                  Add to Wishlist ❤️
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 3)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{relatedProduct.image}</div>
                    <h3 className="font-semibold mb-1">{relatedProduct.name}</h3>
                    <p className="text-blue-600 font-bold">${relatedProduct.price}</p>
                  </div>
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 🎯 Protected Routes & Authentication

```tsx
// Authentication context
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  // Simulate checking for existing session
  React.useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, validate with server
    if (email === 'admin@example.com' && password === 'admin') {
      const adminUser: User = {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      setLoading(false);
      return true;
    } else if (email === 'user@example.com' && password === 'user') {
      const normalUser: User = {
        id: 2,
        name: 'Regular User',
        email: 'user@example.com',
        role: 'user'
      };
      setUser(normalUser);
      localStorage.setItem('user', JSON.stringify(normalUser));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Protected route component
interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

// Login page
function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Sign In
        </h2>
        
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-700 mb-2">Demo Accounts:</p>
          <p className="text-xs text-blue-600">Admin: admin@example.com / admin</p>
          <p className="text-xs text-blue-600">User: user@example.com / user</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Dashboard page (protected)
function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {user?.name}! 👋
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                user?.role === 'admin' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {user?.role === 'admin' ? '👑 Admin' : '👤 User'}
              </span>
              
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">📊 Analytics</h3>
            <p className="text-gray-600">View your analytics and reports.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">⚙️ Settings</h3>
            <p className="text-gray-600">Manage your account settings.</p>
          </div>
          
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="bg-purple-50 border-2 border-purple-200 p-6 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-4 text-purple-700">
                👑 Admin Panel
              </h3>
              <p className="text-purple-600">Access admin-only features.</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

// Admin page (admin only)
function AdminPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-purple-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-900 mb-8">
          👑 Admin Panel
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-700">
            Welcome to the admin panel, {user?.name}! This area is only accessible to administrators.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">👥 User Management</h3>
            <p className="text-gray-600 mb-4">Manage user accounts and permissions.</p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors">
              Manage Users
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">📦 Product Management</h3>
            <p className="text-gray-600 mb-4">Add, edit, and remove products.</p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors">
              Manage Products
            </button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">📊 System Reports</h3>
            <p className="text-gray-600 mb-4">View system statistics and reports.</p>
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors">
              View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Unauthorized page
function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-red-50 p-8 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-500 mb-4">🚫</h1>
        <h2 className="text-3xl font-bold text-red-700 mb-4">Access Denied</h2>
        <p className="text-red-600 mb-8">
          You don't have permission to access this page.
        </p>
        
        <button
          onClick={() => navigate(-1)}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

// Complete app with authentication
export function CompleteRoutingApp() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/products/:category" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin-only routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute requireAdmin>
                  <AdminPage />
                </ProtectedRoute>
              } 
            />
            
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
```

## 🎯 What You've Learned

### ✅ Router Fundamentals:
1. **BrowserRouter** for HTML5 history API routing
2. **Routes and Route** for defining navigation paths
3. **Link and Navigate** for programmatic navigation
4. **useParams** for accessing URL parameters
5. **useNavigate** for programmatic navigation

### ✅ Advanced Patterns:
1. **Dynamic routes** with parameters and nested routing
2. **Protected routes** with authentication checks
3. **Role-based access control** for different user types
4. **Route guards** and redirects
5. **Navigation state** and location awareness

## 🚀 What's Next?

In **Lesson 23: API Integration and Data Fetching**, we'll learn:
- Making HTTP requests with fetch and axios
- TypeScript interfaces for API responses
- Loading states and error handling
- Caching and data synchronization

Your navigation is now professional-grade! 🧭

---

**💡 Pro Tip**: Always think about user experience when designing routes. Users should be able to bookmark any page, use the back button intuitively, and understand where they are in your application at all times!
