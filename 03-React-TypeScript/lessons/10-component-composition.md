# Lesson 10: Component Composition 🧩

## Welcome to Building Complex UIs! 🏗️

Imagine trying to build a house by creating one giant room instead of combining smaller rooms. Pretty chaotic, right? **Component composition** is how you build complex React applications by combining simple, reusable components like LEGO blocks!

## 🤔 What is Component Composition?

**Component composition** is the practice of building complex components by combining simpler ones. Instead of building giant monolithic components, you create small, focused components that work together.

### Real-World Analogy:

Think of **building a smartphone**:

- 📱 **Screen** (display component)
- 🔋 **Battery** (power component)
- 📷 **Camera** (image component)
- 🔊 **Speaker** (audio component)
- 🧠 **Processor** (logic component)

Each part has a specific job, but together they create a powerful device!

## 🎯 Basic Composition with Children

### 1. **Using the Children Prop**

```tsx
import React, { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
    >
      {title && (
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}

// Usage Examples
function CardExamples() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto p-6">
      {/* Simple Card */}
      <Card title="Welcome">
        <p className="text-gray-600">
          This is a simple card with some content inside.
        </p>
      </Card>

      {/* Card with Complex Content */}
      <Card title="User Profile">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
            JD
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">John Doe</h4>
            <p className="text-gray-600">Software Developer</p>
            <p className="text-sm text-gray-500">john@example.com</p>
          </div>
        </div>
      </Card>

      {/* Card with Form */}
      <Card title="Quick Login" className="max-w-md">
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
            Sign In
          </button>
        </form>
      </Card>
    </div>
  );
}

export default CardExamples;
```

### 2. **Layout Components**

```tsx
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

interface SidebarProps {
  children: ReactNode;
  isOpen: boolean;
}

interface MainContentProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">My Application</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">{children}</div>

      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p>&copy; 2024 My Application. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function Sidebar({ children, isOpen }: SidebarProps) {
  return (
    <aside
      className={`bg-white shadow-sm border-r border-gray-200 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <div className="p-4">{children}</div>
    </aside>
  );
}

function MainContent({ children }: MainContentProps) {
  return <main className="flex-1 p-6">{children}</main>;
}

// Usage
function AppWithLayout() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <Layout>
      <div className="flex">
        <Sidebar isOpen={sidebarOpen}>
          {sidebarOpen ? (
            <nav className="space-y-2">
              <a href="#" className="block p-2 rounded hover:bg-gray-100">
                Dashboard
              </a>
              <a href="#" className="block p-2 rounded hover:bg-gray-100">
                Users
              </a>
              <a href="#" className="block p-2 rounded hover:bg-gray-100">
                Settings
              </a>
            </nav>
          ) : (
            <div className="space-y-2">
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
              <div className="w-8 h-8 bg-gray-200 rounded"></div>
            </div>
          )}
        </Sidebar>

        <MainContent>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {sidebarOpen ? "Collapse" : "Expand"} Sidebar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card title="Total Users">
              <div className="text-3xl font-bold text-blue-600">1,234</div>
              <p className="text-gray-600">Active users this month</p>
            </Card>

            <Card title="Revenue">
              <div className="text-3xl font-bold text-green-600">$12,345</div>
              <p className="text-gray-600">Total earnings</p>
            </Card>

            <Card title="Orders">
              <div className="text-3xl font-bold text-purple-600">567</div>
              <p className="text-gray-600">Orders this week</p>
            </Card>
          </div>
        </MainContent>
      </div>
    </Layout>
  );
}

export default AppWithLayout;
```

## 🎮 Let's Build: Flexible Modal System

```tsx
import React, { ReactNode, useState, useEffect } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
}

interface ModalHeaderProps {
  children: ReactNode;
  onClose?: () => void;
}

interface ModalBodyProps {
  children: ReactNode;
}

interface ModalFooterProps {
  children: ReactNode;
}

// Main Modal Component
function Modal({
  children,
  isOpen,
  onClose,
  size = "md",
  showCloseButton = true,
}: ModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`relative bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} transform transition-all`}
        >
          {showCloseButton && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold z-10"
            >
              ×
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

// Modal Sub-components
function ModalHeader({ children, onClose }: ModalHeaderProps) {
  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">{children}</div>
    </div>
  );
}

function ModalBody({ children }: ModalBodyProps) {
  return <div className="px-6 py-4">{children}</div>;
}

function ModalFooter({ children }: ModalFooterProps) {
  return (
    <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
      <div className="flex justify-end gap-3">{children}</div>
    </div>
  );
}

// Example Usage Component
function ModalExamples() {
  const [showSimple, setShowSimple] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showLarge, setShowLarge] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowForm(false);
    setFormData({ name: "", email: "", message: "" });
    alert("Form submitted successfully!");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Modal Composition Examples
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Trigger Buttons */}
        <button
          onClick={() => setShowSimple(true)}
          className="p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
        >
          Simple Modal
        </button>

        <button
          onClick={() => setShowForm(true)}
          className="p-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
        >
          Form Modal
        </button>

        <button
          onClick={() => setShowConfirmation(true)}
          className="p-4 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
        >
          Confirmation Modal
        </button>

        <button
          onClick={() => setShowLarge(true)}
          className="p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
        >
          Large Modal
        </button>
      </div>

      {/* Simple Modal */}
      <Modal isOpen={showSimple} onClose={() => setShowSimple(false)} size="sm">
        <ModalHeader>
          <h3 className="text-lg font-semibold">Simple Modal</h3>
        </ModalHeader>
        <ModalBody>
          <p className="text-gray-600">
            This is a simple modal with just some text content. You can close it
            by clicking the X button, clicking outside, or pressing the Escape
            key.
          </p>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => setShowSimple(false)}
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition-colors"
          >
            Close
          </button>
        </ModalFooter>
      </Modal>

      {/* Form Modal */}
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} size="md">
        <ModalHeader>
          <h3 className="text-lg font-semibold">Contact Form</h3>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, message: e.target.value }))
                }
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                required
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => setShowForm(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleFormSubmit}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
          >
            Send Message
          </button>
        </ModalFooter>
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        size="sm"
        showCloseButton={false}
      >
        <ModalHeader>
          <h3 className="text-lg font-semibold text-red-800">Confirm Delete</h3>
        </ModalHeader>
        <ModalBody>
          <div className="flex items-center gap-3">
            <div className="text-3xl text-red-500">⚠️</div>
            <div>
              <p className="text-gray-800 font-medium">
                Are you sure you want to delete this item?
              </p>
              <p className="text-gray-600 text-sm">
                This action cannot be undone.
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => setShowConfirmation(false)}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              alert("Item deleted!");
              setShowConfirmation(false);
            }}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
          >
            Delete
          </button>
        </ModalFooter>
      </Modal>

      {/* Large Modal with Complex Content */}
      <Modal isOpen={showLarge} onClose={() => setShowLarge(false)} size="xl">
        <ModalHeader>
          <h3 className="text-lg font-semibold">Dashboard Analytics</h3>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800">Total Users</h4>
                <div className="text-2xl font-bold text-blue-600">12,345</div>
                <p className="text-blue-600 text-sm">+12% from last month</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800">Revenue</h4>
                <div className="text-2xl font-bold text-green-600">$98,765</div>
                <p className="text-green-600 text-sm">+8% from last month</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800">Orders</h4>
                <div className="text-2xl font-bold text-purple-600">5,432</div>
                <p className="text-purple-600 text-sm">+15% from last month</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-3">
                Recent Activity
              </h4>
              <div className="space-y-2">
                {[
                  "User John Doe signed up",
                  "Order #1234 completed",
                  "Payment received from Jane Smith",
                  "New product added to catalog",
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => setShowLarge(false)}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded transition-colors"
          >
            Close Dashboard
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExamples;
```

## 🎯 Advanced Composition Patterns

### 1. **Compound Components**

```tsx
import React, { ReactNode, createContext, useContext, useState } from "react";

// Context for sharing state between compound components
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

interface TabsProps {
  children: ReactNode;
  defaultTab: string;
  className?: string;
}

interface TabListProps {
  children: ReactNode;
  className?: string;
}

interface TabProps {
  children: ReactNode;
  value: string;
  className?: string;
}

interface TabPanelProps {
  children: ReactNode;
  value: string;
  className?: string;
}

// Main Tabs component
function Tabs({ children, defaultTab, className = "" }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={`w-full ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
}

// Tab list container
function TabList({ children, className = "" }: TabListProps) {
  return (
    <div className={`flex border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

// Individual tab
function Tab({ children, value, className = "" }: TabProps) {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tab must be used within Tabs");
  }

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 font-medium transition-colors border-b-2 ${
        isActive
          ? "border-blue-500 text-blue-600"
          : "border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300"
      } ${className}`}
    >
      {children}
    </button>
  );
}

// Tab panel content
function TabPanel({ children, value, className = "" }: TabPanelProps) {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabPanel must be used within Tabs");
  }

  const { activeTab } = context;

  if (activeTab !== value) {
    return null;
  }

  return <div className={`p-4 ${className}`}>{children}</div>;
}

// Compound component usage
function TabsExample() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Compound Components - Tabs</h2>

      <Tabs defaultTab="overview" className="bg-white rounded-lg shadow-md">
        <TabList>
          <Tab value="overview">📊 Overview</Tab>
          <Tab value="analytics">📈 Analytics</Tab>
          <Tab value="settings">⚙️ Settings</Tab>
          <Tab value="users">👥 Users</Tab>
        </TabList>

        <TabPanel value="overview">
          <h3 className="text-lg font-semibold mb-4">Dashboard Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-800">Total Revenue</h4>
              <div className="text-2xl font-bold text-blue-600">$125,430</div>
              <p className="text-blue-600 text-sm">+12% from last month</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800">Active Users</h4>
              <div className="text-2xl font-bold text-green-600">8,492</div>
              <p className="text-green-600 text-sm">+8% from last month</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-purple-800">Orders</h4>
              <div className="text-2xl font-bold text-purple-600">2,341</div>
              <p className="text-purple-600 text-sm">+15% from last month</p>
            </div>
          </div>
        </TabPanel>

        <TabPanel value="analytics">
          <h3 className="text-lg font-semibold mb-4">Analytics Dashboard</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Monthly Growth</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>January</span>
                  <span className="font-medium">+15%</span>
                </div>
                <div className="flex justify-between">
                  <span>February</span>
                  <span className="font-medium">+22%</span>
                </div>
                <div className="flex justify-between">
                  <span>March</span>
                  <span className="font-medium">+18%</span>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        <TabPanel value="settings">
          <h3 className="text-lg font-semibold mb-4">Application Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-gray-600">
                  Receive notifications via email
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Dark Mode</h4>
                <p className="text-sm text-gray-600">Switch to dark theme</p>
              </div>
              <input type="checkbox" className="w-4 h-4" />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Auto-save</h4>
                <p className="text-sm text-gray-600">
                  Automatically save your work
                </p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4" />
            </div>
          </div>
        </TabPanel>

        <TabPanel value="users">
          <h3 className="text-lg font-semibold mb-4">User Management</h3>
          <div className="space-y-3">
            {[
              {
                name: "Alice Johnson",
                role: "Admin",
                email: "alice@example.com",
              },
              { name: "Bob Smith", role: "Editor", email: "bob@example.com" },
              {
                name: "Carol Wilson",
                role: "Viewer",
                email: "carol@example.com",
              },
            ].map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <h4 className="font-medium">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {user.role}
                </span>
              </div>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default TabsExample;
```

### 2. **Render Props Pattern**

```tsx
import React, { ReactNode, useState } from "react";

interface ToggleProps {
  children: (props: { isOn: boolean; toggle: () => void }) => ReactNode;
  defaultValue?: boolean;
}

function Toggle({ children, defaultValue = false }: ToggleProps) {
  const [isOn, setIsOn] = useState(defaultValue);

  const toggle = () => setIsOn((prev) => !prev);

  return <>{children({ isOn, toggle })}</>;
}

// Usage Examples
function RenderPropsExamples() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl font-bold text-center">Render Props Pattern</h2>

      {/* Light Switch */}
      <Toggle>
        {({ isOn, toggle }) => (
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Light Switch</h3>
            <div
              className={`w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl transition-all ${
                isOn ? "bg-yellow-300 shadow-lg" : "bg-gray-300"
              }`}
            >
              {isOn ? "💡" : "🔌"}
            </div>
            <button
              onClick={toggle}
              className={`px-6 py-2 rounded font-medium transition-colors ${
                isOn
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              Turn {isOn ? "Off" : "On"}
            </button>
            <p className="mt-2 text-gray-600">
              The light is currently {isOn ? "ON" : "OFF"}
            </p>
          </div>
        )}
      </Toggle>

      {/* Visibility Toggle */}
      <Toggle>
        {({ isOn, toggle }) => (
          <div className="border border-gray-200 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Secret Content</h3>
              <button
                onClick={toggle}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
              >
                {isOn ? "Hide" : "Show"} Content
              </button>
            </div>

            {isOn && (
              <div className="bg-gray-50 p-4 rounded animate-fadeIn">
                <p className="text-gray-700">
                  🎉 This is the secret content! You can only see this when the
                  toggle is ON. This demonstrates how render props allow the
                  parent component to control what gets rendered based on its
                  internal state.
                </p>
              </div>
            )}
          </div>
        )}
      </Toggle>

      {/* Menu Toggle */}
      <Toggle>
        {({ isOn, toggle }) => (
          <div className="relative">
            <button
              onClick={toggle}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            >
              <span>Menu</span>
              <span
                className={`transform transition-transform ${
                  isOn ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>

            {isOn && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-48">
                <a href="#" className="block px-4 py-2 hover:bg-gray-50">
                  Profile
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-50">
                  Settings
                </a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-50">
                  Help
                </a>
                <hr className="my-1" />
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-50 text-red-600"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
        )}
      </Toggle>
    </div>
  );
}

export default RenderPropsExamples;
```

## 🎯 Best Practices

### ✅ Do's:

- **Keep components focused** on single responsibilities
- **Use children prop** for flexible composition
- **Create reusable layout components** for consistent structure
- **Use compound components** for related functionality
- **Think in terms of composition** over inheritance

### ❌ Don'ts:

- **Don't create monolithic components** that do everything
- **Don't pass too many props** down multiple levels
- **Don't duplicate layout code** across components
- **Don't force composition** where simple props would work
- **Don't forget about performance** with complex compositions

## 🎯 What You've Learned

### ✅ Core Composition Concepts:

1. **Children prop** for flexible content
2. **Layout components** for consistent structure
3. **Compound components** for related functionality
4. **Render props** for behavior sharing
5. **Context API** for state sharing between composed components

### ✅ Practical Skills:

1. **Building flexible card systems**
2. **Creating reusable layout structures**
3. **Designing modal systems** with composition
4. **Implementing tab interfaces** with compound components
5. **Using render props** for behavior abstraction

## 🚀 What's Next?

In **Lesson 11: useEffect Hook**, we'll learn how to:

- Handle side effects in functional components
- Manage component lifecycle events
- Fetch data from APIs
- Set up subscriptions and cleanup

You've mastered building complex UIs from simple parts! Component composition is the key to scalable React applications! 🎉

---

**💡 Remember**: Good composition is like good architecture - each piece has a clear purpose, and together they create something greater than the sum of their parts!
