# Lesson 17: Refs and DOM Access 🎯

## Welcome to Direct DOM Control! 🎮

Sometimes you need to break out of React's declarative world and directly control DOM elements. **Refs** are your gateway to imperative DOM manipulation - perfect for focus management, animations, and third-party integrations!

## 🎯 useRef Basics

```tsx
import React, { useRef, useState, useEffect } from "react";

function RefBasics() {
  // Ref for DOM element
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Ref for storing mutable values (doesn't trigger re-render)
  const countRef = useRef(0);
  const [renderCount, setRenderCount] = useState(0);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const drawOnCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#3B82F6";
        ctx.fillRect(10, 10, 100, 50);
        ctx.fillStyle = "#EF4444";
        ctx.beginPath();
        ctx.arc(160, 35, 25, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  };

  // Increment count without re-render
  const incrementCountRef = () => {
    countRef.current += 1;
    console.log("Count Ref:", countRef.current);
  };

  // Force re-render to see updated count
  const forceRender = () => {
    setRenderCount((prev) => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">useRef Basics</h2>

      <div className="space-y-6">
        {/* Input ref example */}
        <section className="p-4 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Input Focus Control</h3>

          <div className="space-y-3">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type something here..."
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-2">
              <button
                onClick={focusInput}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Focus Input
              </button>
              <button
                onClick={clearInput}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Clear & Focus
              </button>
            </div>
          </div>
        </section>

        {/* File input ref example */}
        <section className="p-4 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Hidden File Input</h3>

          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                alert(`Selected file: ${file.name}`);
              }
            }}
          />

          <button
            onClick={triggerFileInput}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            📁 Choose File
          </button>
        </section>

        {/* Canvas ref example */}
        <section className="p-4 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Canvas Drawing</h3>

          <canvas
            ref={canvasRef}
            width={300}
            height={150}
            className="border border-gray-300 mb-3"
          />

          <button
            onClick={drawOnCanvas}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            🎨 Draw Shapes
          </button>
        </section>

        {/* Mutable ref example */}
        <section className="p-4 border rounded-lg bg-yellow-50">
          <h3 className="text-lg font-semibold mb-4">
            Mutable Ref (No Re-render)
          </h3>

          <div className="space-y-3">
            <p>
              Count Ref: {countRef.current} (Check console for real-time value)
            </p>
            <p>Render Count: {renderCount}</p>

            <div className="flex gap-2">
              <button
                onClick={incrementCountRef}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Increment Ref (No Re-render)
              </button>
              <button
                onClick={forceRender}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Force Re-render
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default RefBasics;
```

## 🎯 forwardRef - Passing Refs to Child Components

```tsx
import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
} from "react";

// Custom input component that forwards ref
interface CustomInputProps {
  label: string;
  placeholder?: string;
  error?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  function CustomInput({ label, placeholder, error }, ref) {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }
);

// Modal component that exposes imperative API
interface ModalHandle {
  open: () => void;
  close: () => void;
  toggle: () => void;
}

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

const Modal = forwardRef<ModalHandle, ModalProps>(function Modal(
  { title, children },
  ref
) {
  const [isOpen, setIsOpen] = useState(false);

  // Expose imperative API to parent
  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev),
  }));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
});

// Video player with imperative controls
interface VideoPlayerHandle {
  play: () => void;
  pause: () => void;
  seek: (time: number) => void;
  getCurrentTime: () => number;
}

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

const VideoPlayer = forwardRef<VideoPlayerHandle, VideoPlayerProps>(
  function VideoPlayer({ src, poster }, ref) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useImperativeHandle(ref, () => ({
      play: () => videoRef.current?.play(),
      pause: () => videoRef.current?.pause(),
      seek: (time: number) => {
        if (videoRef.current) {
          videoRef.current.currentTime = time;
        }
      },
      getCurrentTime: () => videoRef.current?.currentTime || 0,
    }));

    return (
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        className="w-full rounded"
      />
    );
  }
);

function ForwardRefExample() {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<ModalHandle>(null);
  const videoRef = useRef<VideoPlayerHandle>(null);

  const focusFirstInput = () => {
    firstInputRef.current?.focus();
  };

  const focusSecondInput = () => {
    secondInputRef.current?.focus();
  };

  const clearBothInputs = () => {
    if (firstInputRef.current) firstInputRef.current.value = "";
    if (secondInputRef.current) secondInputRef.current.value = "";
  };

  const handleVideoControl = (action: "play" | "pause" | "seek") => {
    if (action === "play") {
      videoRef.current?.play();
    } else if (action === "pause") {
      videoRef.current?.pause();
    } else if (action === "seek") {
      videoRef.current?.seek(30); // Seek to 30 seconds
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">forwardRef Examples</h2>

      <div className="space-y-8">
        {/* Custom inputs with forwarded refs */}
        <section className="p-6 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">
            Custom Input Components
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <CustomInput
              ref={firstInputRef}
              label="First Name"
              placeholder="Enter your first name"
            />
            <CustomInput
              ref={secondInputRef}
              label="Last Name"
              placeholder="Enter your last name"
              error="This field is required"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={focusFirstInput}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Focus First
            </button>
            <button
              onClick={focusSecondInput}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              Focus Second
            </button>
            <button
              onClick={clearBothInputs}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              Clear Both
            </button>
          </div>
        </section>

        {/* Modal with imperative API */}
        <section className="p-6 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">
            Imperative Modal Control
          </h3>

          <div className="flex gap-2">
            <button
              onClick={() => modalRef.current?.open()}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Open Modal
            </button>
            <button
              onClick={() => modalRef.current?.close()}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Close Modal
            </button>
            <button
              onClick={() => modalRef.current?.toggle()}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Toggle Modal
            </button>
          </div>

          <Modal ref={modalRef} title="Imperative Modal">
            <p className="mb-4">
              This modal is controlled imperatively using useImperativeHandle!
            </p>
            <p className="text-sm text-gray-600">
              The parent component can call open(), close(), or toggle() methods
              directly on the modal component.
            </p>
          </Modal>
        </section>

        {/* Video player example */}
        <section className="p-6 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Video Player Controls</h3>

          <div className="mb-4">
            <VideoPlayer
              ref={videoRef}
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              poster="https://via.placeholder.com/600x300/3B82F6/FFFFFF?text=Video+Player"
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleVideoControl("play")}
              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
            >
              ▶️ Play
            </button>
            <button
              onClick={() => handleVideoControl("pause")}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              ⏸️ Pause
            </button>
            <button
              onClick={() => handleVideoControl("seek")}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              ⏭️ Seek to 30s
            </button>
            <button
              onClick={() => {
                const currentTime = videoRef.current?.getCurrentTime() || 0;
                alert(`Current time: ${currentTime.toFixed(2)}s`);
              }}
              className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600"
            >
              📍 Get Time
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export { ForwardRefExample };
```

## 🎯 Third-Party Integration

```tsx
import React, { useRef, useEffect, useState } from "react";

// Simulated third-party library
class ThirdPartyChart {
  constructor(container: HTMLElement, options: any) {
    this.container = container;
    this.options = options;
    this.render();
  }

  private container: HTMLElement;
  private options: any;

  render() {
    this.container.innerHTML = `
      <div style="
        width: 100%;
        height: 300px;
        background: linear-gradient(45deg, #3B82F6, #8B5CF6);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 18px;
        font-weight: bold;
      ">
        📊 Third-Party Chart<br/>
        Data Points: ${this.options.data.length}<br/>
        Type: ${this.options.type}
      </div>
    `;
  }

  updateData(newData: any[]) {
    this.options.data = newData;
    this.render();
  }

  destroy() {
    this.container.innerHTML = "";
  }
}

// React wrapper for third-party chart
interface ChartWrapperProps {
  data: number[];
  type: string;
}

function ChartWrapper({ data, type }: ChartWrapperProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstanceRef = useRef<ThirdPartyChart | null>(null);

  // Initialize chart on mount
  useEffect(() => {
    if (chartRef.current && !chartInstanceRef.current) {
      chartInstanceRef.current = new ThirdPartyChart(chartRef.current, {
        data,
        type,
      });
    }

    // Cleanup on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array - only run on mount

  // Update chart when data changes
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.updateData(data);
    }
  }, [data]);

  return <div ref={chartRef} />;
}

// Auto-scroll component
function AutoScrollList({ items }: { items: string[] }) {
  const listRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  // Auto-scroll to bottom when new items are added
  useEffect(() => {
    if (autoScroll && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [items, autoScroll]);

  const scrollToTop = () => {
    listRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Message Log</h4>
        <div className="flex gap-2">
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={autoScroll}
              onChange={(e) => setAutoScroll(e.target.checked)}
            />
            Auto-scroll
          </label>
          <button
            onClick={scrollToTop}
            className="px-2 py-1 bg-gray-500 text-white rounded text-xs hover:bg-gray-600"
          >
            ⬆️ Top
          </button>
          <button
            onClick={scrollToBottom}
            className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
          >
            ⬇️ Bottom
          </button>
        </div>
      </div>

      <div
        ref={listRef}
        className="h-40 overflow-y-auto border border-gray-300 rounded p-2 bg-gray-50"
      >
        {items.map((item, index) => (
          <div key={index} className="py-1 text-sm">
            {index + 1}. {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// Focus management component
function FocusManagement() {
  const [currentField, setCurrentField] = useState(0);
  const fieldRefs = useRef<(HTMLInputElement | null)[]>([]);

  const fields = [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    { name: "email", label: "Email" },
    { name: "phone", label: "Phone" },
  ];

  const focusField = (index: number) => {
    const field = fieldRefs.current[index];
    if (field) {
      field.focus();
      setCurrentField(index);
    }
  };

  const nextField = () => {
    const nextIndex = (currentField + 1) % fields.length;
    focusField(nextIndex);
  };

  const prevField = () => {
    const prevIndex = (currentField - 1 + fields.length) % fields.length;
    focusField(prevIndex);
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium">Focus Management</h4>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {fields.map((field, index) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              ref={(el) => (fieldRefs.current[index] = el)}
              type="text"
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 ${
                currentField === index
                  ? "border-blue-500 focus:ring-blue-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              onFocus={() => setCurrentField(index)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
                  e.preventDefault();
                  nextField();
                } else if (
                  e.key === "ArrowUp" ||
                  (e.key === "Tab" && e.shiftKey)
                ) {
                  e.preventDefault();
                  prevField();
                }
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={prevField}
          className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
        >
          ⬅️ Previous
        </button>
        <button
          onClick={nextField}
          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
        >
          ➡️ Next
        </button>
        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
          Field {currentField + 1} of {fields.length}
        </span>
      </div>
    </div>
  );
}

function ThirdPartyIntegration() {
  const [chartData, setChartData] = useState([10, 20, 30, 40, 50]);
  const [messages, setMessages] = useState([
    "Application started",
    "User logged in",
    "Data loaded successfully",
  ]);

  const addRandomData = () => {
    setChartData((prev) => [...prev, Math.floor(Math.random() * 100)]);
  };

  const addMessage = () => {
    const newMessage = `Event ${
      messages.length + 1
    } - ${new Date().toLocaleTimeString()}`;
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        Third-Party Integration & DOM Control
      </h2>

      <div className="space-y-8">
        {/* Chart integration */}
        <section className="p-6 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">
            Third-Party Chart Integration
          </h3>

          <ChartWrapper data={chartData} type="line" />

          <div className="mt-4 flex gap-2">
            <button
              onClick={addRandomData}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Data Point
            </button>
            <button
              onClick={() => setChartData([10, 20, 30, 40, 50])}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Reset Data
            </button>
          </div>
        </section>

        {/* Auto-scroll example */}
        <section className="p-6 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Auto-Scroll List</h3>

          <AutoScrollList items={messages} />

          <div className="mt-4">
            <button
              onClick={addMessage}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add Message
            </button>
          </div>
        </section>

        {/* Focus management */}
        <section className="p-6 border rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Keyboard Navigation</h3>

          <FocusManagement />

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-800">
              💡 <strong>Try keyboard navigation:</strong> Use Tab/Shift+Tab or
              Arrow keys to move between fields
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export { ThirdPartyIntegration };
```

## 🎯 What You've Learned

### ✅ Ref Fundamentals:

1. **useRef** for DOM access and mutable values
2. **forwardRef** for passing refs to child components
3. **useImperativeHandle** for exposing imperative APIs
4. **Focus management** and keyboard navigation
5. **Third-party integration** patterns

### ✅ Real-World Applications:

1. **Form control** and validation
2. **Media player** controls
3. **Canvas drawing** and animations
4. **Auto-scrolling** lists and chats
5. **Modal and dialog** management

## 🚀 What's Next?

In **Lesson 18: Higher-Order Components**, we'll learn:

- HOC patterns for component enhancement
- Cross-cutting concerns and reusability
- Authentication and authorization HOCs
- Performance monitoring components

You now have direct access to the DOM when React's declarative approach isn't enough! 🎯

---

**💡 Pro Tip**: Use refs sparingly! Most DOM manipulation should be handled declaratively through React. Refs are for those special cases where you need imperative control!
