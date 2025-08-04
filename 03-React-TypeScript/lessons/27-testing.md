# Lesson 27: Testing and Quality Assurance 🧪

## Welcome to Bulletproof React Testing! 🎯

**Testing** is essential for building reliable applications! Let's learn comprehensive testing strategies with Jest, React Testing Library, and modern testing practices for TypeScript React applications.

## 🎯 Unit Testing with Jest and React Testing Library

```tsx
// src/utils/testing-utils.tsx
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Types for testing utilities
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialEntries?: string[];
  queryClient?: QueryClient;
}

// Create a custom render function with providers
export function renderWithProviders(
  ui: React.ReactElement,
  {
    initialEntries = ['/'],
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    }),
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </QueryClientProvider>
    );
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
    queryClient,
  };
}

// Mock implementations
export const createMockUser = (overrides = {}) => ({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://example.com/avatar.jpg',
  role: 'user' as const,
  createdAt: '2023-01-01T00:00:00Z',
  ...overrides,
});

export const createMockPost = (overrides = {}) => ({
  id: '1',
  title: 'Test Post',
  content: 'This is a test post content',
  authorId: '1',
  tags: ['react', 'testing'],
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
  likes: 0,
  comments: [],
  ...overrides,
});

// API mocking utilities
export const mockApiResponse = <T>(data: T, delay = 0): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const mockApiError = (message = 'API Error', status = 500) => {
  const error = new Error(message) as any;
  error.status = status;
  return Promise.reject(error);
};
```

```tsx
// src/components/UserCard.test.tsx
import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { UserCard, UserCardProps } from "./UserCard";
import { renderWithProviders, createMockUser } from "../utils/testing-utils";

// Component under test
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "admin" | "moderator";
  isOnline: boolean;
}

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (userId: string) => void;
  showActions?: boolean;
  isSelected?: boolean;
}

function UserCard({
  user,
  onEdit,
  onDelete,
  showActions = true,
  isSelected = false,
}: UserCardProps) {
  const handleEdit = () => {
    onEdit?.(user);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      onDelete?.(user.id);
    }
  };

  return (
    <div
      className={`p-4 border rounded-lg ${
        isSelected ? "border-blue-500 bg-blue-50" : "border-gray-200"
      }`}
      data-testid={`user-card-${user.id}`}
    >
      <div className="flex items-center space-x-3">
        <img
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          className="w-12 h-12 rounded-full"
          data-testid="user-avatar"
        />

        <div className="flex-1">
          <h3 className="font-semibold text-gray-900" data-testid="user-name">
            {user.name}
          </h3>
          <p className="text-sm text-gray-600" data-testid="user-email">
            {user.email}
          </p>
          <div className="flex items-center space-x-2 mt-1">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                user.isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
              data-testid="online-indicator"
            />
            <span
              className="text-xs text-gray-500 capitalize"
              data-testid="user-role"
            >
              {user.role}
            </span>
          </div>
        </div>

        {showActions && (
          <div className="flex space-x-2" data-testid="user-actions">
            <button
              onClick={handleEdit}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              data-testid="edit-button"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
              data-testid="delete-button"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Test suite
describe("UserCard", () => {
  const mockUser = createMockUser({
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://example.com/avatar.jpg",
    role: "user",
    isOnline: true,
  });

  const defaultProps: UserCardProps = {
    user: mockUser,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders user information correctly", () => {
      renderWithProviders(<UserCard {...defaultProps} />);

      expect(screen.getByTestId("user-name")).toHaveTextContent("John Doe");
      expect(screen.getByTestId("user-email")).toHaveTextContent(
        "john@example.com"
      );
      expect(screen.getByTestId("user-role")).toHaveTextContent("user");

      const avatar = screen.getByTestId("user-avatar");
      expect(avatar).toHaveAttribute("src", mockUser.avatar);
      expect(avatar).toHaveAttribute("alt", "John Doe's avatar");
    });

    it("shows online indicator when user is online", () => {
      renderWithProviders(<UserCard {...defaultProps} />);

      const onlineIndicator = screen.getByTestId("online-indicator");
      expect(onlineIndicator).toHaveClass("bg-green-500");
    });

    it("shows offline indicator when user is offline", () => {
      const offlineUser = { ...mockUser, isOnline: false };
      renderWithProviders(<UserCard user={offlineUser} />);

      const onlineIndicator = screen.getByTestId("online-indicator");
      expect(onlineIndicator).toHaveClass("bg-gray-400");
    });

    it("applies selected styles when isSelected is true", () => {
      renderWithProviders(<UserCard {...defaultProps} isSelected={true} />);

      const userCard = screen.getByTestId(`user-card-${mockUser.id}`);
      expect(userCard).toHaveClass("border-blue-500", "bg-blue-50");
    });

    it("hides actions when showActions is false", () => {
      renderWithProviders(<UserCard {...defaultProps} showActions={false} />);

      expect(screen.queryByTestId("user-actions")).not.toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("calls onEdit when edit button is clicked", () => {
      const onEdit = vi.fn();
      renderWithProviders(<UserCard {...defaultProps} onEdit={onEdit} />);

      fireEvent.click(screen.getByTestId("edit-button"));

      expect(onEdit).toHaveBeenCalledTimes(1);
      expect(onEdit).toHaveBeenCalledWith(mockUser);
    });

    it("calls onDelete when delete button is clicked and confirmed", () => {
      const onDelete = vi.fn();
      // Mock window.confirm to return true
      global.confirm = vi.fn().mockReturnValue(true);

      renderWithProviders(<UserCard {...defaultProps} onDelete={onDelete} />);

      fireEvent.click(screen.getByTestId("delete-button"));

      expect(global.confirm).toHaveBeenCalledWith(
        "Are you sure you want to delete this user?"
      );
      expect(onDelete).toHaveBeenCalledTimes(1);
      expect(onDelete).toHaveBeenCalledWith(mockUser.id);
    });

    it("does not call onDelete when delete button is clicked but not confirmed", () => {
      const onDelete = vi.fn();
      global.confirm = vi.fn().mockReturnValue(false);

      renderWithProviders(<UserCard {...defaultProps} onDelete={onDelete} />);

      fireEvent.click(screen.getByTestId("delete-button"));

      expect(global.confirm).toHaveBeenCalled();
      expect(onDelete).not.toHaveBeenCalled();
    });
  });

  describe("Accessibility", () => {
    it("has proper image alt text", () => {
      renderWithProviders(<UserCard {...defaultProps} />);

      const avatar = screen.getByRole("img");
      expect(avatar).toHaveAccessibleName("John Doe's avatar");
    });

    it("has clickable buttons with proper text", () => {
      renderWithProviders(<UserCard {...defaultProps} />);

      expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Delete" })
      ).toBeInTheDocument();
    });
  });
});
```

## 🎯 Integration Testing with API Mocking

```tsx
// src/hooks/useUsers.test.tsx
import React from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "./useUsers";
import {
  createMockUser,
  mockApiResponse,
  mockApiError,
} from "../utils/testing-utils";

// Mock the API module
vi.mock("../services/api", () => ({
  api: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

import { api } from "../services/api";

const mockApi = vi.mocked(api);

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("User Hooks Integration Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("useUsers", () => {
    it("fetches users successfully", async () => {
      const mockUsers = [
        createMockUser({ id: "1", name: "Alice" }),
        createMockUser({ id: "2", name: "Bob" }),
      ];

      mockApi.get.mockResolvedValue({ data: mockUsers });

      const { result } = renderHook(() => useUsers(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toEqual(mockUsers);
      expect(result.current.error).toBeNull();
      expect(mockApi.get).toHaveBeenCalledWith("/users");
    });

    it("handles fetch error", async () => {
      const error = new Error("Failed to fetch users");
      mockApi.get.mockRejectedValue(error);

      const { result } = renderHook(() => useUsers(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.error).toBeTruthy();
      expect(result.current.data).toBeUndefined();
    });

    it("refetches data when invalidated", async () => {
      const mockUsers = [createMockUser()];
      mockApi.get.mockResolvedValue({ data: mockUsers });

      const { result } = renderHook(() => useUsers(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(mockApi.get).toHaveBeenCalledTimes(1);

      // Trigger refetch
      result.current.refetch();

      await waitFor(() => {
        expect(mockApi.get).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe("useCreateUser", () => {
    it("creates user successfully", async () => {
      const newUser = createMockUser({ id: "3", name: "Charlie" });
      const createData = { name: "Charlie", email: "charlie@example.com" };

      mockApi.post.mockResolvedValue({ data: newUser });

      const { result } = renderHook(() => useCreateUser(), {
        wrapper: createWrapper(),
      });

      expect(result.current.isPending).toBe(false);

      result.current.mutate(createData);

      expect(result.current.isPending).toBe(true);

      await waitFor(() => {
        expect(result.current.isPending).toBe(false);
      });

      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toEqual(newUser);
      expect(mockApi.post).toHaveBeenCalledWith("/users", createData);
    });

    it("handles creation error", async () => {
      const error = new Error("Validation failed");
      const createData = { name: "", email: "invalid" };

      mockApi.post.mockRejectedValue(error);

      const { result } = renderHook(() => useCreateUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate(createData);

      await waitFor(() => {
        expect(result.current.isPending).toBe(false);
      });

      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBeTruthy();
    });

    it("calls onSuccess callback", async () => {
      const newUser = createMockUser();
      const onSuccess = vi.fn();

      mockApi.post.mockResolvedValue({ data: newUser });

      const { result } = renderHook(() => useCreateUser({ onSuccess }), {
        wrapper: createWrapper(),
      });

      result.current.mutate({ name: "Test", email: "test@example.com" });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(onSuccess).toHaveBeenCalledWith(newUser);
    });
  });

  describe("useUpdateUser", () => {
    it("updates user successfully", async () => {
      const updatedUser = createMockUser({ id: "1", name: "Updated Name" });
      const updateData = { name: "Updated Name" };

      mockApi.put.mockResolvedValue({ data: updatedUser });

      const { result } = renderHook(() => useUpdateUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate({ id: "1", data: updateData });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(updatedUser);
      expect(mockApi.put).toHaveBeenCalledWith("/users/1", updateData);
    });
  });

  describe("useDeleteUser", () => {
    it("deletes user successfully", async () => {
      mockApi.delete.mockResolvedValue({ data: { success: true } });

      const { result } = renderHook(() => useDeleteUser(), {
        wrapper: createWrapper(),
      });

      result.current.mutate("1");

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockApi.delete).toHaveBeenCalledWith("/users/1");
    });
  });
});
```

## 🎯 Component Integration Testing

```tsx
// src/components/UserManagement.test.tsx
import React from "react";
import { screen, fireEvent, waitFor, within } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { UserManagement } from "./UserManagement";
import { renderWithProviders, createMockUser } from "../utils/testing-utils";

// Mock the hooks
vi.mock("../hooks/useUsers", () => ({
  useUsers: vi.fn(),
  useCreateUser: vi.fn(),
  useUpdateUser: vi.fn(),
  useDeleteUser: vi.fn(),
}));

import {
  useUsers,
  useCreateUser,
  useUpdateUser,
  useDeleteUser,
} from "../hooks/useUsers";

const mockUseUsers = vi.mocked(useUsers);
const mockUseCreateUser = vi.mocked(useCreateUser);
const mockUseUpdateUser = vi.mocked(useUpdateUser);
const mockUseDeleteUser = vi.mocked(useDeleteUser);

describe("UserManagement Integration", () => {
  const mockUsers = [
    createMockUser({ id: "1", name: "Alice", email: "alice@example.com" }),
    createMockUser({ id: "2", name: "Bob", email: "bob@example.com" }),
    createMockUser({ id: "3", name: "Charlie", email: "charlie@example.com" }),
  ];

  const defaultMockReturns = {
    useUsers: {
      data: mockUsers,
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    },
    useCreateUser: {
      mutate: vi.fn(),
      isPending: false,
      isSuccess: false,
      isError: false,
      error: null,
    },
    useUpdateUser: {
      mutate: vi.fn(),
      isPending: false,
      isSuccess: false,
      isError: false,
      error: null,
    },
    useDeleteUser: {
      mutate: vi.fn(),
      isPending: false,
      isSuccess: false,
      isError: false,
      error: null,
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();

    mockUseUsers.mockReturnValue(defaultMockReturns.useUsers);
    mockUseCreateUser.mockReturnValue(defaultMockReturns.useCreateUser);
    mockUseUpdateUser.mockReturnValue(defaultMockReturns.useUpdateUser);
    mockUseDeleteUser.mockReturnValue(defaultMockReturns.useDeleteUser);
  });

  describe("Loading States", () => {
    it("shows loading spinner when fetching users", () => {
      mockUseUsers.mockReturnValue({
        ...defaultMockReturns.useUsers,
        isLoading: true,
        data: undefined,
      });

      renderWithProviders(<UserManagement />);

      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
      expect(screen.getByText("Loading users...")).toBeInTheDocument();
    });

    it("shows error message when fetch fails", () => {
      mockUseUsers.mockReturnValue({
        ...defaultMockReturns.useUsers,
        isLoading: false,
        error: new Error("Failed to fetch users"),
        data: undefined,
      });

      renderWithProviders(<UserManagement />);

      expect(screen.getByTestId("error-message")).toBeInTheDocument();
      expect(screen.getByText(/Failed to fetch users/)).toBeInTheDocument();
    });
  });

  describe("User List Display", () => {
    it("renders all users correctly", () => {
      renderWithProviders(<UserManagement />);

      mockUsers.forEach((user) => {
        expect(screen.getByTestId(`user-card-${user.id}`)).toBeInTheDocument();
        expect(screen.getByText(user.name)).toBeInTheDocument();
        expect(screen.getByText(user.email)).toBeInTheDocument();
      });
    });

    it("shows empty state when no users", () => {
      mockUseUsers.mockReturnValue({
        ...defaultMockReturns.useUsers,
        data: [],
      });

      renderWithProviders(<UserManagement />);

      expect(screen.getByTestId("empty-state")).toBeInTheDocument();
      expect(screen.getByText("No users found")).toBeInTheDocument();
    });
  });

  describe("Search and Filter", () => {
    it("filters users by search term", async () => {
      renderWithProviders(<UserManagement />);

      const searchInput = screen.getByTestId("search-input");
      fireEvent.change(searchInput, { target: { value: "Alice" } });

      await waitFor(() => {
        expect(screen.getByTestId("user-card-1")).toBeInTheDocument();
        expect(screen.queryByTestId("user-card-2")).not.toBeInTheDocument();
        expect(screen.queryByTestId("user-card-3")).not.toBeInTheDocument();
      });
    });

    it("shows no results message when search has no matches", async () => {
      renderWithProviders(<UserManagement />);

      const searchInput = screen.getByTestId("search-input");
      fireEvent.change(searchInput, { target: { value: "NonexistentUser" } });

      await waitFor(() => {
        expect(
          screen.getByText("No users match your search")
        ).toBeInTheDocument();
      });
    });

    it("clears search when clear button is clicked", async () => {
      renderWithProviders(<UserManagement />);

      const searchInput = screen.getByTestId("search-input");
      fireEvent.change(searchInput, { target: { value: "Alice" } });

      const clearButton = screen.getByTestId("clear-search");
      fireEvent.click(clearButton);

      await waitFor(() => {
        expect(searchInput).toHaveValue("");
        expect(screen.getByTestId("user-card-1")).toBeInTheDocument();
        expect(screen.getByTestId("user-card-2")).toBeInTheDocument();
        expect(screen.getByTestId("user-card-3")).toBeInTheDocument();
      });
    });
  });

  describe("User Creation", () => {
    it("opens create user modal when add button is clicked", () => {
      renderWithProviders(<UserManagement />);

      fireEvent.click(screen.getByTestId("add-user-button"));

      expect(screen.getByTestId("user-modal")).toBeInTheDocument();
      expect(screen.getByText("Create User")).toBeInTheDocument();
    });

    it("creates user with valid form data", async () => {
      const mockMutate = vi.fn();
      mockUseCreateUser.mockReturnValue({
        ...defaultMockReturns.useCreateUser,
        mutate: mockMutate,
      });

      renderWithProviders(<UserManagement />);

      // Open modal
      fireEvent.click(screen.getByTestId("add-user-button"));

      // Fill form
      fireEvent.change(screen.getByTestId("name-input"), {
        target: { value: "New User" },
      });
      fireEvent.change(screen.getByTestId("email-input"), {
        target: { value: "newuser@example.com" },
      });

      // Submit form
      fireEvent.click(screen.getByTestId("submit-button"));

      expect(mockMutate).toHaveBeenCalledWith({
        name: "New User",
        email: "newuser@example.com",
      });
    });

    it("shows validation errors for invalid form data", async () => {
      renderWithProviders(<UserManagement />);

      fireEvent.click(screen.getByTestId("add-user-button"));
      fireEvent.click(screen.getByTestId("submit-button"));

      await waitFor(() => {
        expect(screen.getByText("Name is required")).toBeInTheDocument();
        expect(screen.getByText("Email is required")).toBeInTheDocument();
      });
    });

    it("closes modal after successful creation", async () => {
      mockUseCreateUser.mockReturnValue({
        ...defaultMockReturns.useCreateUser,
        isSuccess: true,
      });

      renderWithProviders(<UserManagement />);

      fireEvent.click(screen.getByTestId("add-user-button"));

      await waitFor(() => {
        expect(screen.queryByTestId("user-modal")).not.toBeInTheDocument();
      });
    });
  });

  describe("User Editing", () => {
    it("opens edit modal with pre-filled user data", () => {
      renderWithProviders(<UserManagement />);

      const userCard = screen.getByTestId("user-card-1");
      const editButton = within(userCard).getByTestId("edit-button");
      fireEvent.click(editButton);

      expect(screen.getByTestId("user-modal")).toBeInTheDocument();
      expect(screen.getByText("Edit User")).toBeInTheDocument();
      expect(screen.getByTestId("name-input")).toHaveValue("Alice");
      expect(screen.getByTestId("email-input")).toHaveValue(
        "alice@example.com"
      );
    });

    it("updates user with modified data", async () => {
      const mockMutate = vi.fn();
      mockUseUpdateUser.mockReturnValue({
        ...defaultMockReturns.useUpdateUser,
        mutate: mockMutate,
      });

      renderWithProviders(<UserManagement />);

      // Open edit modal
      const userCard = screen.getByTestId("user-card-1");
      const editButton = within(userCard).getByTestId("edit-button");
      fireEvent.click(editButton);

      // Modify data
      fireEvent.change(screen.getByTestId("name-input"), {
        target: { value: "Alice Updated" },
      });

      // Submit form
      fireEvent.click(screen.getByTestId("submit-button"));

      expect(mockMutate).toHaveBeenCalledWith({
        id: "1",
        data: {
          name: "Alice Updated",
          email: "alice@example.com",
        },
      });
    });
  });

  describe("User Deletion", () => {
    it("confirms deletion and calls delete mutation", async () => {
      const mockMutate = vi.fn();
      mockUseDeleteUser.mockReturnValue({
        ...defaultMockReturns.useDeleteUser,
        mutate: mockMutate,
      });

      global.confirm = vi.fn().mockReturnValue(true);

      renderWithProviders(<UserManagement />);

      const userCard = screen.getByTestId("user-card-1");
      const deleteButton = within(userCard).getByTestId("delete-button");
      fireEvent.click(deleteButton);

      expect(global.confirm).toHaveBeenCalledWith(
        "Are you sure you want to delete Alice?"
      );
      expect(mockMutate).toHaveBeenCalledWith("1");
    });

    it("cancels deletion when not confirmed", () => {
      const mockMutate = vi.fn();
      mockUseDeleteUser.mockReturnValue({
        ...defaultMockReturns.useDeleteUser,
        mutate: mockMutate,
      });

      global.confirm = vi.fn().mockReturnValue(false);

      renderWithProviders(<UserManagement />);

      const userCard = screen.getByTestId("user-card-1");
      const deleteButton = within(userCard).getByTestId("delete-button");
      fireEvent.click(deleteButton);

      expect(mockMutate).not.toHaveBeenCalled();
    });
  });

  describe("Error Handling", () => {
    it("shows error toast when creation fails", async () => {
      mockUseCreateUser.mockReturnValue({
        ...defaultMockReturns.useCreateUser,
        isError: true,
        error: new Error("Creation failed"),
      });

      renderWithProviders(<UserManagement />);

      await waitFor(() => {
        expect(screen.getByTestId("error-toast")).toBeInTheDocument();
        expect(screen.getByText(/Creation failed/)).toBeInTheDocument();
      });
    });

    it("shows error toast when update fails", async () => {
      mockUseUpdateUser.mockReturnValue({
        ...defaultMockReturns.useUpdateUser,
        isError: true,
        error: new Error("Update failed"),
      });

      renderWithProviders(<UserManagement />);

      await waitFor(() => {
        expect(screen.getByTestId("error-toast")).toBeInTheDocument();
        expect(screen.getByText(/Update failed/)).toBeInTheDocument();
      });
    });

    it("shows error toast when deletion fails", async () => {
      mockUseDeleteUser.mockReturnValue({
        ...defaultMockReturns.useDeleteUser,
        isError: true,
        error: new Error("Deletion failed"),
      });

      renderWithProviders(<UserManagement />);

      await waitFor(() => {
        expect(screen.getByTestId("error-toast")).toBeInTheDocument();
        expect(screen.getByText(/Deletion failed/)).toBeInTheDocument();
      });
    });
  });

  describe("Accessibility", () => {
    it("has proper ARIA labels and roles", () => {
      renderWithProviders(<UserManagement />);

      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getByRole("searchbox")).toHaveAccessibleName(
        "Search users"
      );
      expect(
        screen.getByRole("button", { name: "Add User" })
      ).toBeInTheDocument();
    });

    it("supports keyboard navigation", () => {
      renderWithProviders(<UserManagement />);

      const searchInput = screen.getByRole("searchbox");
      searchInput.focus();
      expect(document.activeElement).toBe(searchInput);

      // Tab to add button
      fireEvent.keyDown(searchInput, { key: "Tab" });
      const addButton = screen.getByRole("button", { name: "Add User" });
      expect(document.activeElement).toBe(addButton);
    });

    it("announces loading state to screen readers", () => {
      mockUseUsers.mockReturnValue({
        ...defaultMockReturns.useUsers,
        isLoading: true,
        data: undefined,
      });

      renderWithProviders(<UserManagement />);

      expect(screen.getByLabelText("Loading users")).toBeInTheDocument();
    });
  });
});
```

## 🎯 E2E Testing with Playwright

```tsx
// e2e/user-management.spec.ts
import { test, expect, Page } from "@playwright/test";

// Test data setup
const testUser = {
  name: "E2E Test User",
  email: "e2e@example.com",
};

// Page Object Model
class UserManagementPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/users");
  }

  async searchUser(query: string) {
    await this.page.fill('[data-testid="search-input"]', query);
    await this.page.waitForTimeout(300); // Debounce
  }

  async openCreateUserModal() {
    await this.page.click('[data-testid="add-user-button"]');
    await this.page.waitForSelector('[data-testid="user-modal"]');
  }

  async fillUserForm(user: { name: string; email: string }) {
    await this.page.fill('[data-testid="name-input"]', user.name);
    await this.page.fill('[data-testid="email-input"]', user.email);
  }

  async submitForm() {
    await this.page.click('[data-testid="submit-button"]');
  }

  async editUser(userId: string) {
    await this.page.click(
      `[data-testid="user-card-${userId}"] [data-testid="edit-button"]`
    );
    await this.page.waitForSelector('[data-testid="user-modal"]');
  }

  async deleteUser(userId: string) {
    // Handle confirmation dialog
    this.page.on("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");
      await dialog.accept();
    });

    await this.page.click(
      `[data-testid="user-card-${userId}"] [data-testid="delete-button"]`
    );
  }

  async getUserCards() {
    return this.page.locator('[data-testid^="user-card-"]');
  }

  async getUserCardByName(name: string) {
    return this.page.locator(`[data-testid^="user-card-"]:has-text("${name}")`);
  }

  async waitForLoadingToFinish() {
    await this.page.waitForSelector('[data-testid="loading-spinner"]', {
      state: "hidden",
    });
  }

  async waitForSuccess() {
    await this.page.waitForSelector('[data-testid="success-toast"]');
  }

  async waitForError() {
    await this.page.waitForSelector('[data-testid="error-toast"]');
  }
}

test.describe("User Management E2E", () => {
  let userManagementPage: UserManagementPage;

  test.beforeEach(async ({ page }) => {
    userManagementPage = new UserManagementPage(page);

    // Mock API responses
    await page.route("**/api/users", async (route) => {
      if (route.request().method() === "GET") {
        await route.fulfill({
          json: [
            {
              id: "1",
              name: "Alice Johnson",
              email: "alice@example.com",
              role: "user",
            },
            {
              id: "2",
              name: "Bob Smith",
              email: "bob@example.com",
              role: "admin",
            },
            {
              id: "3",
              name: "Charlie Brown",
              email: "charlie@example.com",
              role: "user",
            },
          ],
        });
      }
    });

    await userManagementPage.goto();
    await userManagementPage.waitForLoadingToFinish();
  });

  test("displays user list correctly", async () => {
    const userCards = await userManagementPage.getUserCards();
    await expect(userCards).toHaveCount(3);

    await expect(
      userManagementPage.getUserCardByName("Alice Johnson")
    ).toBeVisible();
    await expect(
      userManagementPage.getUserCardByName("Bob Smith")
    ).toBeVisible();
    await expect(
      userManagementPage.getUserCardByName("Charlie Brown")
    ).toBeVisible();
  });

  test("searches users correctly", async () => {
    await userManagementPage.searchUser("Alice");

    await expect(
      userManagementPage.getUserCardByName("Alice Johnson")
    ).toBeVisible();
    await expect(
      userManagementPage.getUserCardByName("Bob Smith")
    ).not.toBeVisible();
    await expect(
      userManagementPage.getUserCardByName("Charlie Brown")
    ).not.toBeVisible();
  });

  test("creates new user successfully", async ({ page }) => {
    // Mock successful creation
    await page.route("**/api/users", async (route) => {
      if (route.request().method() === "POST") {
        const postData = route.request().postDataJSON();
        await route.fulfill({
          json: {
            id: "4",
            ...postData,
            role: "user",
            createdAt: new Date().toISOString(),
          },
        });
      }
    });

    await userManagementPage.openCreateUserModal();
    await expect(page.locator('[data-testid="user-modal"]')).toBeVisible();
    await expect(page.locator("text=Create User")).toBeVisible();

    await userManagementPage.fillUserForm(testUser);
    await userManagementPage.submitForm();

    await userManagementPage.waitForSuccess();
    await expect(page.locator('[data-testid="user-modal"]')).not.toBeVisible();
  });

  test("handles creation validation errors", async () => {
    await userManagementPage.openCreateUserModal();
    await userManagementPage.submitForm(); // Submit empty form

    await expect(page.locator("text=Name is required")).toBeVisible();
    await expect(page.locator("text=Email is required")).toBeVisible();
  });

  test("edits user successfully", async ({ page }) => {
    // Mock successful update
    await page.route("**/api/users/1", async (route) => {
      if (route.request().method() === "PUT") {
        const putData = route.request().postDataJSON();
        await route.fulfill({
          json: {
            id: "1",
            ...putData,
            role: "user",
            updatedAt: new Date().toISOString(),
          },
        });
      }
    });

    await userManagementPage.editUser("1");

    await expect(page.locator('[data-testid="user-modal"]')).toBeVisible();
    await expect(page.locator("text=Edit User")).toBeVisible();

    // Verify form is pre-filled
    await expect(page.locator('[data-testid="name-input"]')).toHaveValue(
      "Alice Johnson"
    );
    await expect(page.locator('[data-testid="email-input"]')).toHaveValue(
      "alice@example.com"
    );

    // Update name
    await page.fill('[data-testid="name-input"]', "Alice Updated");
    await userManagementPage.submitForm();

    await userManagementPage.waitForSuccess();
    await expect(page.locator('[data-testid="user-modal"]')).not.toBeVisible();
  });

  test("deletes user successfully", async ({ page }) => {
    // Mock successful deletion
    await page.route("**/api/users/1", async (route) => {
      if (route.request().method() === "DELETE") {
        await route.fulfill({ json: { success: true } });
      }
    });

    await userManagementPage.deleteUser("1");
    await userManagementPage.waitForSuccess();

    // Verify user is removed from list
    await expect(
      userManagementPage.getUserCardByName("Alice Johnson")
    ).not.toBeVisible();
  });

  test("handles API errors gracefully", async ({ page }) => {
    // Mock API error
    await page.route("**/api/users", async (route) => {
      if (route.request().method() === "POST") {
        await route.fulfill({
          status: 500,
          json: { error: "Internal server error" },
        });
      }
    });

    await userManagementPage.openCreateUserModal();
    await userManagementPage.fillUserForm(testUser);
    await userManagementPage.submitForm();

    await userManagementPage.waitForError();
    await expect(page.locator("text=Internal server error")).toBeVisible();
  });

  test("keyboard navigation works correctly", async ({ page }) => {
    // Focus search input
    await page.press('[data-testid="search-input"]', "Tab");

    // Tab to add button
    await page.keyboard.press("Tab");
    await expect(page.locator('[data-testid="add-user-button"]')).toBeFocused();

    // Press Enter to open modal
    await page.keyboard.press("Enter");
    await expect(page.locator('[data-testid="user-modal"]')).toBeVisible();

    // Tab through form inputs
    await page.keyboard.press("Tab");
    await expect(page.locator('[data-testid="name-input"]')).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.locator('[data-testid="email-input"]')).toBeFocused();
  });

  test("responsive design works on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const userCards = await userManagementPage.getUserCards();
    await expect(userCards).toHaveCount(3);

    // Mobile layout should stack cards vertically
    const firstCard = userCards.first();
    const secondCard = userCards.nth(1);

    const firstCardBbox = await firstCard.boundingBox();
    const secondCardBbox = await secondCard.boundingBox();

    expect(firstCardBbox!.y).toBeLessThan(secondCardBbox!.y);
  });

  test("accessibility features work correctly", async ({ page }) => {
    // Check ARIA labels
    await expect(page.locator('[data-testid="search-input"]')).toHaveAttribute(
      "aria-label",
      "Search users"
    );

    // Check for proper heading hierarchy
    await expect(page.locator("h1")).toHaveText("User Management");

    // Check for loading announcement
    await page.reload();
    await expect(page.locator('[aria-label="Loading users"]')).toBeVisible();
    await userManagementPage.waitForLoadingToFinish();

    // Check focus management in modal
    await userManagementPage.openCreateUserModal();
    await expect(page.locator('[data-testid="name-input"]')).toBeFocused();

    // Escape should close modal
    await page.keyboard.press("Escape");
    await expect(page.locator('[data-testid="user-modal"]')).not.toBeVisible();
  });
});
```

## 🎯 Testing Configuration Files

```json
// package.json (testing dependencies)
{
  "devDependencies": {
    "@testing-library/react": "^13.4.0",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/user-event": "^14.4.3",
    "@playwright/test": "^1.40.0",
    "@vitest/ui": "^0.34.0",
    "jsdom": "^22.1.0",
    "vitest": "^0.34.0",
    "msw": "^2.0.0"
  },
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    css: true,
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/dist/**",
      ],
      threshold: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
});
```

```ts
// playwright.config.ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html"], ["json", { outputFile: "test-results/results.json" }]],
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
```

## 🎯 What You've Learned

### ✅ Unit Testing Mastery:

1. **Component testing** with React Testing Library
2. **Hook testing** with custom render utilities
3. **Mock strategies** for external dependencies
4. **Accessibility testing** with proper ARIA labels
5. **TypeScript integration** with comprehensive typing

### ✅ Integration Testing Excellence:

1. **API mocking** with proper error scenarios
2. **User interaction flows** and form validation
3. **State management testing** with hooks
4. **Error boundary testing** and recovery
5. **Performance testing** and optimization

### ✅ E2E Testing Proficiency:

1. **Page Object Model** for maintainable tests
2. **Cross-browser testing** with Playwright
3. **Mobile responsiveness** testing
4. **Accessibility compliance** verification
5. **Real user scenarios** and workflows

## 🚀 Congratulations! 🎉

You've completed the **React TypeScript Mastery Course**! You now have:

✅ **27 comprehensive lessons** covering everything from basics to advanced patterns  
✅ **Real-world project experience** with modern React patterns  
✅ **TypeScript expertise** for type-safe development  
✅ **Testing knowledge** for bulletproof applications  
✅ **Performance optimization** skills for production-ready apps  
✅ **Authentication & authorization** implementation  
✅ **State management** with multiple libraries

## 🎯 Next Steps

1. **Build a portfolio project** using all the concepts learned
2. **Contribute to open source** React TypeScript projects
3. **Explore advanced topics** like Server-Side Rendering (SSR)
4. **Learn React Native** for mobile development
5. **Master backend integration** with Node.js/TypeScript

You're now ready to build amazing React TypeScript applications! 🚀

---

**💡 Pro Tip**: Keep practicing and stay updated with the React ecosystem. The best way to master these concepts is to build real projects and solve real problems!
