# Lesson 15: Advanced Types 🔧

## Welcome to TypeScript Mastery! 🎯

Ready to level up your TypeScript game? **Advanced Types** in React let you build flexible, reusable components that adapt to any data structure. Think of them as Swiss Army knives for your components!

## 🚀 Generic Components

### 1. **Basic Generic Component**

```tsx
import React from "react";

// Generic List Component that works with any data type
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T) => string | number;
  emptyMessage?: string;
}

function List<T>({
  items,
  renderItem,
  keyExtractor,
  emptyMessage = "No items found",
}: ListProps<T>) {
  if (items.length === 0) {
    return <div className="text-center py-8 text-gray-500">{emptyMessage}</div>;
  }

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={keyExtractor(item)} className="p-2 border rounded">
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

// Usage examples
interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
}

function GenericListExample() {
  const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  const products: Product[] = [
    { id: "p1", title: "Laptop", price: 999 },
    { id: "p2", title: "Phone", price: 599 },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold">Generic List Component</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Users List</h3>
          <List
            items={users}
            keyExtractor={(user) => user.id}
            renderItem={(user, index) => (
              <div>
                <h4 className="font-medium">{user.name}</h4>
                <p className="text-sm text-gray-600">{user.email}</p>
                <span className="text-xs text-gray-400">Index: {index}</span>
              </div>
            )}
            emptyMessage="No users found"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Products List</h3>
          <List
            items={products}
            keyExtractor={(product) => product.id}
            renderItem={(product) => (
              <div>
                <h4 className="font-medium">{product.title}</h4>
                <p className="text-green-600 font-bold">${product.price}</p>
              </div>
            )}
            emptyMessage="No products available"
          />
        </div>
      </div>
    </div>
  );
}

export default GenericListExample;
```

## 🎯 Advanced Generic Patterns

### 2. **Generic Form Component with Validation**

```tsx
import React, { useState } from "react";

// Generic form field configuration
interface FormField<T, K extends keyof T> {
  name: K;
  label: string;
  type: "text" | "email" | "number" | "password";
  required?: boolean;
  validator?: (value: T[K]) => string | undefined;
}

// Generic form props
interface FormProps<T> {
  initialData: T;
  fields: FormField<T, keyof T>[];
  onSubmit: (data: T) => void;
  submitText?: string;
}

// Generic form component
function Form<T extends Record<string, any>>({
  initialData,
  fields,
  onSubmit,
  submitText = "Submit",
}: FormProps<T>) {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (field: keyof T, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {};

    fields.forEach((field) => {
      const value = data[field.name];

      // Required validation
      if (field.required && (!value || value === "")) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      // Custom validation
      if (field.validator && value) {
        const error = field.validator(value);
        if (error) {
          newErrors[field.name] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(data);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={String(field.name)}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label} {field.required && "*"}
          </label>

          <input
            type={field.type}
            value={String(data[field.name] || "")}
            onChange={(e) => {
              const value =
                field.type === "number"
                  ? parseFloat(e.target.value) || ""
                  : e.target.value;
              handleChange(field.name, value);
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors[field.name]
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />

          {errors[field.name] && (
            <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        {submitText}
      </button>
    </form>
  );
}

// Usage examples
interface UserFormData {
  name: string;
  email: string;
  age: number;
}

interface ProductFormData {
  title: string;
  price: number;
  description: string;
}

function GenericFormExample() {
  const [users, setUsers] = useState<UserFormData[]>([]);
  const [products, setProducts] = useState<ProductFormData[]>([]);

  const userFields: FormField<UserFormData, keyof UserFormData>[] = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      required: true,
      validator: (value) =>
        value.length < 2 ? "Name must be at least 2 characters" : undefined,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
      validator: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value)
          ? "Please enter a valid email"
          : undefined;
      },
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      required: true,
      validator: (value) => {
        const num = Number(value);
        return num < 18 || num > 120
          ? "Age must be between 18 and 120"
          : undefined;
      },
    },
  ];

  const productFields: FormField<ProductFormData, keyof ProductFormData>[] = [
    {
      name: "title",
      label: "Product Title",
      type: "text",
      required: true,
    },
    {
      name: "price",
      label: "Price ($)",
      type: "number",
      required: true,
      validator: (value) =>
        Number(value) <= 0 ? "Price must be greater than 0" : undefined,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8">Generic Form Component</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Add User</h3>
          <Form
            initialData={{ name: "", email: "", age: 0 }}
            fields={userFields}
            onSubmit={(userData) => {
              setUsers((prev) => [...prev, userData]);
              alert("User added successfully!");
            }}
            submitText="Add User"
          />

          <div className="mt-6">
            <h4 className="font-medium mb-2">Users ({users.length})</h4>
            <div className="space-y-2">
              {users.map((user, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded">
                  <p>
                    <strong>{user.name}</strong> ({user.age})
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Add Product</h3>
          <Form
            initialData={{ title: "", price: 0, description: "" }}
            fields={productFields}
            onSubmit={(productData) => {
              setProducts((prev) => [...prev, productData]);
              alert("Product added successfully!");
            }}
            submitText="Add Product"
          />

          <div className="mt-6">
            <h4 className="font-medium mb-2">Products ({products.length})</h4>
            <div className="space-y-2">
              {products.map((product, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded">
                  <p>
                    <strong>{product.title}</strong> - ${product.price}
                  </p>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { GenericFormExample };
```

## 🎯 Advanced Prop Patterns

### 3. **Conditional Props with Discriminated Unions**

```tsx
import React from "react";

// Base button props
interface BaseButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

// Discriminated union for different button variants
type ButtonProps = BaseButtonProps &
  (
    | {
        variant: "primary";
        size?: "sm" | "md" | "lg";
      }
    | {
        variant: "secondary";
        outline?: boolean;
      }
    | {
        variant: "danger";
        confirmText?: string;
      }
    | {
        variant: "loading";
        loadingText?: string;
      }
  );

function Button(props: ButtonProps) {
  const { children, className = "", disabled = false, ...rest } = props;

  const baseStyles =
    "px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2";

  const getVariantStyles = () => {
    switch (props.variant) {
      case "primary":
        const sizeStyles = {
          sm: "px-2 py-1 text-sm",
          md: "px-4 py-2",
          lg: "px-6 py-3 text-lg",
        };
        return `bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500 ${
          sizeStyles[props.size || "md"]
        }`;

      case "secondary":
        return props.outline
          ? "border-2 border-gray-300 hover:border-gray-400 text-gray-700 focus:ring-gray-500"
          : "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500";

      case "danger":
        return "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500";

      case "loading":
        return "bg-gray-400 text-white cursor-not-allowed";

      default:
        return "bg-gray-200 hover:bg-gray-300 text-gray-800";
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (props.variant === "danger" && props.confirmText) {
      if (!confirm(props.confirmText)) {
        e.preventDefault();
        return;
      }
    }
  };

  const renderContent = () => {
    if (props.variant === "loading") {
      return (
        <span className="flex items-center gap-2">
          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
          {props.loadingText || "Loading..."}
        </span>
      );
    }
    return children;
  };

  return (
    <button
      className={`${baseStyles} ${getVariantStyles()} ${className}`}
      disabled={disabled || props.variant === "loading"}
      onClick={handleClick}
    >
      {renderContent()}
    </button>
  );
}

// Advanced modal component with conditional props
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
} & (
  | {
      size: "sm";
      maxWidth?: never;
    }
  | {
      size: "md";
      maxWidth?: never;
    }
  | {
      size: "lg";
      maxWidth?: never;
    }
  | {
      size: "custom";
      maxWidth: string;
    }
);

function Modal(props: ModalProps) {
  const { isOpen, onClose, title, children, size } = props;

  if (!isOpen) return null;

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "max-w-md";
      case "md":
        return "max-w-lg";
      case "lg":
        return "max-w-2xl";
      case "custom":
        return "";
      default:
        return "max-w-lg";
    }
  };

  const customStyles = size === "custom" ? { maxWidth: props.maxWidth } : {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className={`bg-white rounded-lg shadow-xl w-full ${getSizeStyles()}`}
        style={customStyles}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

function AdvancedPropsExample() {
  const [loading, setLoading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalSize, setModalSize] = React.useState<
    "sm" | "md" | "lg" | "custom"
  >("md");

  const simulateAction = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-8">Advanced Props Patterns</h2>

      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-semibold mb-4">
            Discriminated Union Buttons
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" size="sm">
              Small Primary
            </Button>
            <Button variant="primary" size="md">
              Medium Primary
            </Button>
            <Button variant="primary" size="lg">
              Large Primary
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="secondary" outline>
              Outlined Secondary
            </Button>
            <Button
              variant="danger"
              confirmText="Are you sure you want to delete?"
            >
              Delete Item
            </Button>
            {loading ? (
              <Button variant="loading" loadingText="Processing...">
                Loading
              </Button>
            ) : (
              <Button variant="primary" onClick={simulateAction}>
                Start Loading
              </Button>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4">
            Conditional Modal Sizes
          </h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              {(["sm", "md", "lg", "custom"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setModalSize(size);
                    setModalOpen(true);
                  }}
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  Open {size.toUpperCase()} Modal
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${modalSize.toUpperCase()} Modal`}
        size={modalSize}
        {...(modalSize === "custom" ? { maxWidth: "800px" } : {})}
      >
        <p>This is a {modalSize} modal with conditional props!</p>
        <p className="mt-4 text-sm text-gray-600">
          The modal component uses discriminated unions to ensure type safety
          while allowing flexible sizing options.
        </p>
      </Modal>
    </div>
  );
}

export { AdvancedPropsExample };
```

## 🎯 What You've Learned

### ✅ Advanced Type Patterns:

1. **Generic components** that work with any data type
2. **Type-safe forms** with validation
3. **Discriminated unions** for conditional props
4. **Flexible APIs** with TypeScript constraints
5. **Reusable patterns** for complex components

### ✅ Professional Skills:

1. **Component libraries** with TypeScript
2. **API design** for maximum flexibility
3. **Type constraints** and validation
4. **Error prevention** through strong typing
5. **Code reusability** across projects

## 🚀 What's Next?

In **Lesson 16: Performance Optimization**, we'll learn:

- useMemo and useCallback for expensive operations
- React.memo for component optimization
- Profiling and measuring performance
- Advanced optimization techniques

You're now equipped with advanced TypeScript patterns for building professional React applications! 🎉

---

**💡 Pro Tip**: Advanced types aren't just about showing off - they make your components more reliable, easier to use, and prevent bugs before they happen!
