# Lesson 23: API Integration and Data Fetching 🌐

## Welcome to API Integration! 🚀

**API Integration** is how your React app communicates with the outside world! Whether you're fetching user data, submitting forms, or loading product catalogs, APIs are the bridge between your frontend and backend. Let's master data fetching with TypeScript!

## 🎯 Basic Data Fetching with TypeScript

```tsx
import React, { useState, useEffect } from "react";

// Define TypeScript interfaces for API responses
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
  postId: number;
}

// API response wrapper types
interface ApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Generic API hook
function useApi<T>(url: string, dependencies: any[] = []) {
  const [state, setState] = useState<ApiResponse<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `HTTP Error: ${response.status} ${response.statusText}`
          );
        }

        const data: T = await response.json();

        if (!isCancelled) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (!isCancelled) {
          setState({
            data: null,
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "An unknown error occurred",
          });
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, dependencies);

  return state;
}

// Loading component
function LoadingSpinner({
  size = "medium",
}: {
  size?: "small" | "medium" | "large";
}) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div
        className={`border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin ${sizeClasses[size]}`}
      ></div>
    </div>
  );
}

// Error component
function ErrorMessage({
  error,
  onRetry,
}: {
  error: string;
  onRetry?: () => void;
}) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
      <div className="text-red-600 mb-2">❌ Error</div>
      <p className="text-red-700 mb-4">{error}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// Users list component
function UsersList() {
  const {
    data: users,
    loading,
    error,
  } = useApi<User[]>("https://jsonplaceholder.typicode.com/users");
  const [retryKey, setRetryKey] = useState(0);

  const handleRetry = () => {
    setRetryKey((prev) => prev + 1);
  };

  if (loading) return <LoadingSpinner size="large" />;
  if (error) return <ErrorMessage error={error} onRetry={handleRetry} />;
  if (!users) return <div>No users found</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Users Directory 👥
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {user.name.charAt(0)}
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {user.name}
                </h3>
                <p className="text-gray-600">{user.company.name}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-600">
                <span className="mr-2">📧</span>
                <a
                  href={`mailto:${user.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {user.email}
                </a>
              </div>

              <div className="flex items-center text-gray-600">
                <span className="mr-2">📞</span>
                <a
                  href={`tel:${user.phone}`}
                  className="text-blue-600 hover:underline"
                >
                  {user.phone}
                </a>
              </div>

              <div className="flex items-center text-gray-600">
                <span className="mr-2">🌐</span>
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {user.website}
                </a>
              </div>

              <div className="flex items-start text-gray-600 mt-3">
                <span className="mr-2">📍</span>
                <div>
                  <div>
                    {user.address.street}, {user.address.suite}
                  </div>
                  <div>
                    {user.address.city}, {user.address.zipcode}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-700 italic">
                "{user.company.catchPhrase}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Posts component with user details
function PostsList() {
  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
  } = useApi<Post[]>("https://jsonplaceholder.typicode.com/posts");
  const {
    data: users,
    loading: usersLoading,
    error: usersError,
  } = useApi<User[]>("https://jsonplaceholder.typicode.com/users");

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [expandedPosts, setExpandedPosts] = useState<Set<number>>(new Set());

  const togglePost = (postId: number) => {
    setExpandedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const getUserById = (userId: number) =>
    users?.find((user) => user.id === userId);

  if (postsLoading || usersLoading) return <LoadingSpinner size="large" />;
  if (postsError) return <ErrorMessage error={postsError} />;
  if (usersError) return <ErrorMessage error={usersError} />;
  if (!posts || !users) return <div>No data available</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Posts 📝</h2>

      <div className="space-y-4">
        {posts.slice(0, 10).map((post) => {
          const author = getUserById(post.userId);
          const isExpanded = expandedPosts.has(post.id);

          return (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    {author?.name.charAt(0) || "?"}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {author?.name || "Unknown Author"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {author?.company.name || "Unknown Company"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => togglePost(post.id)}
                  className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                >
                  {isExpanded ? "Collapse" : "Expand"}
                </button>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-3 capitalize">
                {post.title}
              </h3>

              {isExpanded ? (
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{post.body}</p>

                  <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors"
                    >
                      View Comments
                    </button>

                    <button className="text-gray-500 hover:text-red-500 transition-colors">
                      ❤️ Like
                    </button>

                    <button className="text-gray-500 hover:text-blue-500 transition-colors">
                      🔄 Share
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 line-clamp-2">
                  {post.body.substring(0, 120)}...
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Comments Modal */}
      {selectedPost && (
        <CommentsModal
          post={selectedPost}
          author={getUserById(selectedPost.userId)}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </div>
  );
}

// Comments modal component
interface CommentsModalProps {
  post: Post;
  author?: User;
  onClose: () => void;
}

function CommentsModal({ post, author, onClose }: CommentsModalProps) {
  const {
    data: comments,
    loading,
    error,
  } = useApi<Comment[]>(
    `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Comments</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h4 className="font-semibold text-gray-900 capitalize mb-2">
              {post.title}
            </h4>
            <p className="text-sm text-gray-600 mb-2">{post.body}</p>
            <p className="text-xs text-gray-500">
              By {author?.name || "Unknown"}
            </p>
          </div>
        </div>

        <div
          className="p-6 overflow-y-auto"
          style={{ maxHeight: "calc(80vh - 200px)" }}
        >
          {loading && <LoadingSpinner />}
          {error && <ErrorMessage error={error} />}

          {comments && (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-l-4 border-blue-200 pl-4"
                >
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {comment.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {comment.name}
                      </p>
                      <p className="text-xs text-gray-500">{comment.email}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {comment.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

## 🎯 Advanced Data Fetching Patterns

```tsx
// Advanced API service with error handling and caching
class ApiService {
  private baseURL: string;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    // Check cache first
    const cached = this.cache.get(url);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: T = await response.json();

      // Cache successful GET requests
      if (!options.method || options.method === "GET") {
        this.cache.set(url, { data, timestamp: Date.now() });
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Network request failed");
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
    });
  }

  clearCache(): void {
    this.cache.clear();
  }
}

// Create API instance
const api = new ApiService("https://jsonplaceholder.typicode.com");

// Advanced data fetching hook with multiple states
interface UseApiOptions {
  immediate?: boolean;
  dependencies?: any[];
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

function useAdvancedApi<T>(
  fetcher: () => Promise<T>,
  options: UseApiOptions = {}
) {
  const { immediate = true, dependencies = [], onSuccess, onError } = options;

  const [state, setState] = useState<{
    data: T | null;
    loading: boolean;
    error: string | null;
    lastFetch: Date | null;
  }>({
    data: null,
    loading: immediate,
    error: null,
    lastFetch: null,
  });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await fetcher();
      setState({
        data,
        loading: false,
        error: null,
        lastFetch: new Date(),
      });
      onSuccess?.(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
        lastFetch: new Date(),
      }));
      onError?.(errorMessage);
    }
  }, [fetcher, onSuccess, onError]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate, ...dependencies]);

  const refresh = useCallback(() => {
    execute();
  }, [execute]);

  return {
    ...state,
    execute,
    refresh,
  };
}

// Real-time data component with auto-refresh
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

function ProductsCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"title" | "price" | "rating">("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const {
    data: products,
    loading,
    error,
    refresh,
    lastFetch,
  } = useAdvancedApi(() => api.get<Product[]>("/products"), {
    onSuccess: (data) => console.log(`Loaded ${data.length} products`),
    onError: (error) => console.error("Failed to load products:", error),
  });

  const { data: categories } = useAdvancedApi(() =>
    api.get<string[]>("/products/categories")
  );

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(refresh, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refresh]);

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];

    let filtered =
      selectedCategory === "all"
        ? products
        : products.filter((p) => p.category === selectedCategory);

    return filtered.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (sortBy) {
        case "price":
          aValue = a.price;
          bValue = b.price;
          break;
        case "rating":
          aValue = a.rating.rate;
          bValue = b.rating.rate;
          break;
        default:
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  }, [products, selectedCategory, sortBy, sortOrder]);

  if (loading && !products) return <LoadingSpinner size="large" />;
  if (error && !products)
    return <ErrorMessage error={error} onRetry={refresh} />;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Products Catalog 🛍️
        </h1>

        <div className="flex items-center space-x-4">
          {lastFetch && (
            <span className="text-sm text-gray-500">
              Last updated: {lastFetch.toLocaleTimeString()}
            </span>
          )}

          <button
            onClick={refresh}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Filters and sorting */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories?.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "title" | "price" | "rating")
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="title">Name</option>
              <option value="price">Price</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Order
            </label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading overlay for refresh */}
      {loading && products && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
          Refreshing data...
        </div>
      )}

      {/* Products grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">
            No products found in this category.
          </p>
        </div>
      )}
    </div>
  );
}

// Product card component with optimistic updates
function ProductCard({ product }: { product: Product }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(product.rating.count);

  const handleLike = async () => {
    // Optimistic update
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      // In real app, you'd make an actual API call here
      console.log(`${isLiked ? "Unliked" : "Liked"} product ${product.id}`);
    } catch (error) {
      // Revert optimistic update on error
      setIsLiked(isLiked);
      setLikesCount((prev) => (isLiked ? prev + 1 : prev - 1));
      console.error("Failed to update like status:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 p-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-contain"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
            {product.category}
          </span>
          <div className="flex items-center">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm text-gray-600 ml-1">
              {product.rating.rate.toFixed(1)}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>

          <button
            onClick={handleLike}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors ${
              isLiked
                ? "bg-red-100 text-red-600"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span>{isLiked ? "❤️" : "🤍"}</span>
            <span>{likesCount}</span>
          </button>
        </div>

        <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
```

## 🎯 Form Submission & Data Mutations

```tsx
// Form submission with validation and API calls
interface CreatePostRequest {
  title: string;
  body: string;
  userId: number;
}

interface CreatePostResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function CreatePostForm() {
  const [formData, setFormData] = useState<CreatePostRequest>({
    title: "",
    body: "",
    userId: 1,
  });

  const [errors, setErrors] = useState<Partial<CreatePostRequest>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    data?: CreatePostResponse;
  } | null>(null);

  const validateForm = (): boolean => {
    const newErrors: Partial<CreatePostRequest> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.body.trim()) {
      newErrors.body = "Content is required";
    } else if (formData.body.length < 10) {
      newErrors.body = "Content must be at least 10 characters";
    }

    if (!formData.userId || formData.userId < 1) {
      newErrors.userId = "Please select a valid user";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await api.post<CreatePostResponse>("/posts", formData);

      setSubmitResult({
        success: true,
        message: "Post created successfully!",
        data: response,
      });

      // Reset form on success
      setFormData({ title: "", body: "", userId: 1 });
      setErrors({});
    } catch (error) {
      setSubmitResult({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to create post",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    field: keyof CreatePostRequest,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Create New Post ✏️
      </h2>

      {submitResult && (
        <div
          className={`p-4 rounded-md mb-6 ${
            submitResult.success
              ? "bg-green-50 border border-green-200"
              : "bg-red-50 border border-red-200"
          }`}
        >
          <div
            className={`flex items-center ${
              submitResult.success ? "text-green-700" : "text-red-700"
            }`}
          >
            <span className="mr-2">{submitResult.success ? "✅" : "❌"}</span>
            <span>{submitResult.message}</span>
          </div>

          {submitResult.success && submitResult.data && (
            <div className="mt-3 p-3 bg-white rounded border">
              <p className="text-sm text-gray-600">
                Created post with ID: {submitResult.data.id}
              </p>
            </div>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Author
          </label>
          <select
            id="userId"
            value={formData.userId}
            onChange={(e) => handleChange("userId", Number(e.target.value))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.userId ? "border-red-300" : "border-gray-300"
            }`}
          >
            <option value="">Select an author...</option>
            {[1, 2, 3, 4, 5].map((id) => (
              <option key={id} value={id}>
                User {id}
              </option>
            ))}
          </select>
          {errors.userId && (
            <p className="mt-1 text-sm text-red-600">{errors.userId}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Enter post title..."
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? "border-red-300" : "border-gray-300"
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Content
          </label>
          <textarea
            id="body"
            rows={6}
            value={formData.body}
            onChange={(e) => handleChange("body", e.target.value)}
            placeholder="Write your post content..."
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.body ? "border-red-300" : "border-gray-300"
            }`}
          />
          {errors.body && (
            <p className="mt-1 text-sm text-red-600">{errors.body}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            <p>Characters: {formData.body.length}</p>
            <p>
              Words:{" "}
              {
                formData.body
                  .trim()
                  .split(/\s+/)
                  .filter((word) => word.length > 0).length
              }
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => {
                setFormData({ title: "", body: "", userId: 1 });
                setErrors({});
                setSubmitResult(null);
              }}
              className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Clear
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              )}
              {isSubmitting ? "Creating..." : "Create Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

// Complete API integration example
export function ApiIntegrationApp() {
  const [activeTab, setActiveTab] = useState<
    "users" | "posts" | "products" | "create"
  >("users");

  const tabs = [
    { id: "users", label: "Users", icon: "👥" },
    { id: "posts", label: "Posts", icon: "📝" },
    { id: "products", label: "Products", icon: "🛍️" },
    { id: "create", label: "Create Post", icon: "✏️" },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {activeTab === "users" && <UsersList />}
        {activeTab === "posts" && <PostsList />}
        {activeTab === "products" && <ProductsCatalog />}
        {activeTab === "create" && <CreatePostForm />}
      </div>
    </div>
  );
}
```

## 🎯 What You've Learned

### ✅ API Integration Fundamentals:

1. **TypeScript interfaces** for API responses and requests
2. **Custom hooks** for data fetching with loading and error states
3. **Error handling** and retry mechanisms
4. **Caching strategies** and data persistence
5. **Optimistic updates** for better user experience

### ✅ Advanced Patterns:

1. **API service classes** with centralized request handling
2. **Real-time data** with auto-refresh capabilities
3. **Form submission** with validation and error handling
4. **Data filtering** and sorting on the client side
5. **Modal interactions** and dynamic content loading

## 🚀 What's Next?

In **Lesson 24: State Management with Zustand**, we'll learn:

- Global state management for complex applications
- Store patterns and data flow
- Async actions and middleware
- State persistence and hydration

Your data fetching skills are now production-ready! 🌐

---

**💡 Pro Tip**: Always handle loading states, errors, and empty data gracefully. Users should never see a broken interface - even when things go wrong, provide clear feedback and recovery options!
