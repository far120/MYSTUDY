# Type Assertions - When You Know Better Than TypeScript 🎯

**Master Type Assertions!** Sometimes you have more information about a value's type than TypeScript can infer. Type assertions let you tell TypeScript what type you know a value to be. Learn when and how to use assertions safely, avoid common pitfalls, and build robust applications with strategic type narrowing.

## 🎯 Learning Objectives
By the end of this lesson, you will:
- Understand type assertions and when to use them
- Master the `as` syntax and angle bracket syntax
- Use type assertions safely without runtime errors
- Handle DOM elements, API responses, and unknown types
- Apply type guards as safer alternatives to assertions

---

## 🤔 Why Type Assertions Are Needed

TypeScript's type inference is powerful, but sometimes you have information that TypeScript cannot infer automatically.

### The Problem: TypeScript Can't Always Know

```typescript
// Problem 1: DOM elements - TypeScript doesn't know specific element types
const element = document.getElementById("my-button"); 
// Type: HTMLElement | null
// But you know it's specifically a button!

element.addEventListener("click", () => {
    console.log(element.disabled); // ❌ Error: disabled doesn't exist on HTMLElement
});

// Problem 2: API responses - TypeScript sees 'any' or 'unknown'
async function fetchUserData(): Promise<any> {
    const response = await fetch("/api/user");
    return response.json(); // Returns 'any'
}

const userData = await fetchUserData();
console.log(userData.name); // No type safety!
console.log(userData.email); // Could be undefined, no warning!

// Problem 3: Complex object manipulation
interface User {
    id: number;
    name: string;
    email: string;
}

function processFormData(formData: FormData): User {
    const data: any = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // You know this is a User, but TypeScript sees 'any'
    return data; // ❌ Type 'any' is not assignable to type 'User'
}
```

### The Solution: Type Assertions

```typescript
// Solution 1: Assert specific DOM element type
const button = document.getElementById("my-button") as HTMLButtonElement;
// Now TypeScript knows it's a button!

if (button) {
    button.addEventListener("click", () => {
        console.log(button.disabled); // ✅ Works! disabled exists on HTMLButtonElement
        button.textContent = "Clicked!"; // ✅ All button properties available
    });
}

// Solution 2: Assert API response structure
interface ApiUser {
    id: number;
    name: string;
    email: string;
    avatar?: string;
}

async function fetchUser(): Promise<ApiUser> {
    const response = await fetch("/api/user");
    const userData = await response.json() as ApiUser;
    // Now TypeScript knows the structure!
    return userData;
}

const user = await fetchUser();
console.log(user.name); // ✅ Type-safe access
console.log(user.email); // ✅ TypeScript knows these properties exist

// Solution 3: Assert known object structure
function processFormData(formData: FormData): User {
    const data: any = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // Assert that we've built a valid User object
    return data as User; // ✅ TypeScript trusts your assertion
}
```

---

## 🔧 Type Assertion Syntax

### The `as` Syntax (Preferred):

```typescript
// Basic type assertion with 'as'
const someValue: unknown = "Hello, TypeScript!";
const stringValue = someValue as string;
const stringLength = stringValue.length; // ✅ TypeScript knows it's a string

// DOM element assertions
const inputElement = document.querySelector("#username") as HTMLInputElement;
const canvasElement = document.querySelector("#game-canvas") as HTMLCanvasElement;
const imageElement = document.querySelector("#profile-pic") as HTMLImageElement;

// Object assertions
interface Product {
    id: number;
    name: string;
    price: number;
}

const rawProduct: any = {
    id: 1,
    name: "Laptop",
    price: 999
};

const product = rawProduct as Product;
console.log(`${product.name} costs $${product.price}`); // ✅ Type-safe access

// Function return type assertions
function getConfigValue(key: string): unknown {
    // Imagine this reads from a config file
    const config: Record<string, any> = {
        apiUrl: "https://api.example.com",
        timeout: 5000,
        debug: true
    };
    return config[key];
}

const apiUrl = getConfigValue("apiUrl") as string;
const timeout = getConfigValue("timeout") as number;
const debug = getConfigValue("debug") as boolean;

console.log(`API: ${apiUrl}, Timeout: ${timeout}ms, Debug: ${debug}`);
```

### Angle Bracket Syntax (Alternative):

```typescript
// Angle bracket syntax - older style, not preferred in JSX/TSX files
const someValue: unknown = "Hello, TypeScript!";
const stringValue = <string>someValue;
const stringLength = stringValue.length;

// ❌ Problem: Conflicts with JSX syntax
// const element = <HTMLButtonElement>document.getElementById("button"); // Looks like JSX!

// ✅ Solution: Always use 'as' syntax, especially in React projects
const element = document.getElementById("button") as HTMLButtonElement;
```

---

## 🎯 Safe Type Assertion Patterns

### 1. DOM Element Assertions:

```typescript
// Safe DOM element handling
function setupEventListeners(): void {
    // Button elements
    const submitButton = document.getElementById("submit") as HTMLButtonElement;
    const cancelButton = document.getElementById("cancel") as HTMLButtonElement;
    
    if (submitButton) {
        submitButton.addEventListener("click", (event) => {
            // TypeScript knows this is a button
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
            
            // Access button-specific properties
            console.log("Button type:", submitButton.type);
            console.log("Button form:", submitButton.form);
        });
    }
    
    // Input elements
    const usernameInput = document.querySelector('input[name="username"]') as HTMLInputElement;
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
    const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
    
    if (usernameInput && emailInput && passwordInput) {
        const form = {
            username: usernameInput,
            email: emailInput,
            password: passwordInput
        };
        
        // Type-safe form validation
        Object.entries(form).forEach(([field, input]) => {
            input.addEventListener("blur", () => {
                if (!input.value.trim()) {
                    input.classList.add("error");
                    input.setAttribute("aria-invalid", "true");
                } else {
                    input.classList.remove("error");
                    input.setAttribute("aria-invalid", "false");
                }
            });
        });
    }
    
    // Canvas elements
    const gameCanvas = document.getElementById("game") as HTMLCanvasElement;
    if (gameCanvas) {
        const context = gameCanvas.getContext("2d");
        if (context) {
            // TypeScript knows these are canvas-specific methods
            context.fillStyle = "blue";
            context.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
        }
    }
    
    // Select elements
    const themeSelect = document.getElementById("theme") as HTMLSelectElement;
    if (themeSelect) {
        themeSelect.addEventListener("change", () => {
            const selectedTheme = themeSelect.value;
            console.log("Selected theme:", selectedTheme);
            
            // Access select-specific properties
            console.log("Selected index:", themeSelect.selectedIndex);
            console.log("Multiple selection:", themeSelect.multiple);
        });
    }
}

// Generic helper for type-safe element selection
function getElement<T extends HTMLElement>(
    selector: string,
    type: new () => T
): T | null {
    const element = document.querySelector(selector);
    if (element instanceof type) {
        return element;
    }
    return null;
}

// Usage with runtime type checking
const button = getElement("#submit", HTMLButtonElement);
const input = getElement("#username", HTMLInputElement);
const canvas = getElement("#game", HTMLCanvasElement);

if (button) {
    button.disabled = true; // ✅ Type-safe
}
```

### 2. API Response Assertions:

```typescript
// Define expected API structures
interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    errors?: string[];
}

interface User {
    id: number;
    username: string;
    email: string;
    profile: {
        firstName: string;
        lastName: string;
        avatar?: string;
        bio?: string;
    };
    settings: {
        theme: "light" | "dark" | "auto";
        notifications: boolean;
        privacy: "public" | "private" | "friends";
    };
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    inStock: boolean;
    images: string[];
    reviews: {
        average: number;
        count: number;
    };
}

// Type-safe API client
class ApiClient {
    private baseUrl: string;
    
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    
    private async makeRequest<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
        try {
            const response = await fetch(`${this.baseUrl}${url}`, {
                headers: {
                    "Content-Type": "application/json",
                    ...options?.headers
                },
                ...options
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || "API request failed");
            }
            
            // Assert the response structure
            return data as ApiResponse<T>;
            
        } catch (error) {
            throw new Error(`API Error: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    }
    
    async getUser(userId: number): Promise<User> {
        const response = await this.makeRequest<User>(`/users/${userId}`);
        return response.data;
    }
    
    async getProducts(category?: string): Promise<Product[]> {
        const url = category ? `/products?category=${category}` : "/products";
        const response = await this.makeRequest<Product[]>(url);
        return response.data;
    }
    
    async createUser(userData: Omit<User, "id">): Promise<User> {
        const response = await this.makeRequest<User>("/users", {
            method: "POST",
            body: JSON.stringify(userData)
        });
        return response.data;
    }
    
    async updateUser(userId: number, updates: Partial<User>): Promise<User> {
        const response = await this.makeRequest<User>(`/users/${userId}`, {
            method: "PATCH",
            body: JSON.stringify(updates)
        });
        return response.data;
    }
}

// Usage with proper error handling
async function loadUserProfile(userId: number): Promise<void> {
    try {
        const apiClient = new ApiClient("https://api.example.com");
        const user = await apiClient.getUser(userId);
        
        // TypeScript knows the exact structure
        console.log(`Welcome, ${user.profile.firstName}!`);
        console.log(`Email: ${user.email}`);
        console.log(`Theme: ${user.settings.theme}`);
        
        if (user.profile.avatar) {
            console.log(`Avatar: ${user.profile.avatar}`);
        }
        
        // Load user's products if they're a seller
        const products = await apiClient.getProducts();
        console.log(`Found ${products.length} products`);
        
        products.forEach(product => {
            console.log(`${product.name}: $${product.price} (${product.inStock ? "In Stock" : "Out of Stock"})`);
        });
        
    } catch (error) {
        console.error("Failed to load user profile:", error);
    }
}
```

### 3. Type Narrowing and Validation:

```typescript
// Combine assertions with runtime validation
function isUser(obj: any): obj is User {
    return (
        obj &&
        typeof obj.id === "number" &&
        typeof obj.username === "string" &&
        typeof obj.email === "string" &&
        obj.profile &&
        typeof obj.profile.firstName === "string" &&
        typeof obj.profile.lastName === "string"
    );
}

function isProduct(obj: any): obj is Product {
    return (
        obj &&
        typeof obj.id === "number" &&
        typeof obj.name === "string" &&
        typeof obj.price === "number" &&
        typeof obj.inStock === "boolean" &&
        Array.isArray(obj.images)
    );
}

// Safe assertion with validation
function parseApiResponse<T>(
    data: unknown,
    validator: (obj: any) => obj is T
): T {
    if (!validator(data)) {
        throw new Error("Invalid data structure received from API");
    }
    return data; // Type narrowed to T by type guard
}

// Usage
async function safeLoadUser(userId: number): Promise<User | null> {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const rawData = await response.json();
        
        // Validate before asserting
        const user = parseApiResponse(rawData.data, isUser);
        return user;
        
    } catch (error) {
        console.error("Failed to load user:", error);
        return null;
    }
}

// Advanced validation with detailed error messages
class ValidationError extends Error {
    constructor(
        message: string,
        public field: string,
        public value: any
    ) {
        super(message);
        this.name = "ValidationError";
    }
}

function validateUser(obj: any): User {
    if (!obj || typeof obj !== "object") {
        throw new ValidationError("Expected object", "root", obj);
    }
    
    if (typeof obj.id !== "number") {
        throw new ValidationError("Expected number", "id", obj.id);
    }
    
    if (typeof obj.username !== "string") {
        throw new ValidationError("Expected string", "username", obj.username);
    }
    
    if (typeof obj.email !== "string") {
        throw new ValidationError("Expected string", "email", obj.email);
    }
    
    if (!obj.profile || typeof obj.profile !== "object") {
        throw new ValidationError("Expected object", "profile", obj.profile);
    }
    
    if (typeof obj.profile.firstName !== "string") {
        throw new ValidationError("Expected string", "profile.firstName", obj.profile.firstName);
    }
    
    if (typeof obj.profile.lastName !== "string") {
        throw new ValidationError("Expected string", "profile.lastName", obj.profile.lastName);
    }
    
    // If all validations pass, we can safely assert
    return obj as User;
}

// Usage with detailed error handling
async function loadAndValidateUser(userId: number): Promise<User | null> {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const rawData = await response.json();
        
        const user = validateUser(rawData.data);
        console.log("✅ User data validated successfully");
        return user;
        
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error(`❌ Validation failed for field '${error.field}':`, error.message);
            console.error(`   Received value:`, error.value);
        } else {
            console.error("❌ Failed to load user:", error);
        }
        return null;
    }
}
```

---

## ⚠️ Common Pitfalls and How to Avoid Them

### 1. Dangerous Assertions:

```typescript
// ❌ DANGEROUS: Asserting without validation
function badExample(data: unknown): User {
    // This is unsafe! data could be anything
    return data as User;
}

const badUser = badExample("not a user object"); // Runtime error waiting to happen!
// console.log(badUser.email); // ❌ Runtime error: Cannot read property 'email' of string

// ✅ SAFE: Validate before asserting
function goodExample(data: unknown): User | null {
    if (typeof data === "object" && data !== null) {
        const obj = data as Record<string, any>;
        if (obj.id && obj.username && obj.email) {
            return obj as User;
        }
    }
    return null;
}

// ❌ DANGEROUS: Double assertion (escape hatch)
const dangerousAssertion = ("hello" as any) as number; // TypeScript allows this!
// console.log(dangerousAssertion.toFixed(2)); // ❌ Runtime error!

// ✅ SAFE: Use proper type guards instead
function isNumber(value: unknown): value is number {
    return typeof value === "number" && !isNaN(value);
}

function safeNumberConversion(value: unknown): number | null {
    if (isNumber(value)) {
        return value;
    }
    if (typeof value === "string") {
        const parsed = parseFloat(value);
        return isNumber(parsed) ? parsed : null;
    }
    return null;
}
```

### 2. Better Alternatives to Assertions:

```typescript
// Instead of assertions, use type guards when possible
interface Cat {
    type: "cat";
    meow(): void;
}

interface Dog {
    type: "dog";
    bark(): void;
}

type Animal = Cat | Dog;

// ❌ Using assertion
function handleAnimalWithAssertion(animal: Animal): void {
    if (animal.type === "cat") {
        (animal as Cat).meow(); // Unnecessary assertion
    } else {
        (animal as Dog).bark(); // Unnecessary assertion
    }
}

// ✅ Using discriminated union (TypeScript narrows automatically)
function handleAnimalWithNarrowing(animal: Animal): void {
    if (animal.type === "cat") {
        animal.meow(); // TypeScript knows it's a Cat
    } else {
        animal.bark(); // TypeScript knows it's a Dog
    }
}

// ✅ Using type guards
function isCat(animal: Animal): animal is Cat {
    return animal.type === "cat";
}

function isDog(animal: Animal): animal is Dog {
    return animal.type === "dog";
}

function handleAnimalWithTypeGuards(animal: Animal): void {
    if (isCat(animal)) {
        animal.meow(); // TypeScript knows it's a Cat
    } else if (isDog(animal)) {
        animal.bark(); // TypeScript knows it's a Dog
    }
}

// ✅ Using switch statement (best for discriminated unions)
function handleAnimalWithSwitch(animal: Animal): void {
    switch (animal.type) {
        case "cat":
            animal.meow(); // TypeScript knows it's a Cat
            break;
        case "dog":
            animal.bark(); // TypeScript knows it's a Dog
            break;
        default:
            const exhaustive: never = animal; // Ensures all cases are handled
    }
}
```

---

## 🎮 Hands-On Exercises

### Exercise 1: Safe DOM Manipulation

Create a type-safe form handler using proper type assertions:

```typescript
// Your task: Create a robust form handling system

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    age: number;
    terms: boolean;
}

// Create functions for:
// 1. Getting form elements with proper type assertions
// 2. Validating form data
// 3. Handling form submission
// 4. Displaying validation errors

class FormHandler {
    // Implementation here
}

// Test your form handler
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// Solution: Safe DOM Manipulation with Type Assertions

interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    age: number;
    terms: boolean;
}

interface ValidationError {
    field: keyof FormData;
    message: string;
}

interface FormElements {
    form: HTMLFormElement;
    username: HTMLInputElement;
    email: HTMLInputElement;
    password: HTMLInputElement;
    confirmPassword: HTMLInputElement;
    age: HTMLInputElement;
    terms: HTMLInputElement;
    submitButton: HTMLButtonElement;
    errorContainer: HTMLElement;
}

class FormHandler {
    private elements: FormElements | null = null;
    private validators: Record<keyof FormData, (value: any) => string | null>;

    constructor() {
        this.validators = {
            username: this.validateUsername.bind(this),
            email: this.validateEmail.bind(this),
            password: this.validatePassword.bind(this),
            confirmPassword: this.validateConfirmPassword.bind(this),
            age: this.validateAge.bind(this),
            terms: this.validateTerms.bind(this)
        };
    }

    // Safe element retrieval with type assertions
    private getElement<T extends HTMLElement>(
        selector: string,
        expectedType: new () => T,
        required: boolean = true
    ): T | null {
        const element = document.querySelector(selector);
        
        if (!element) {
            if (required) {
                throw new Error(`Required element not found: ${selector}`);
            }
            return null;
        }
        
        if (!(element instanceof expectedType)) {
            throw new Error(
                `Element ${selector} is not of expected type ${expectedType.name}. ` +
                `Found: ${element.constructor.name}`
            );
        }
        
        return element;
    }

    // Initialize form elements with proper type assertions
    initialize(): boolean {
        try {
            this.elements = {
                form: this.getElement("#registration-form", HTMLFormElement),
                username: this.getElement('input[name="username"]', HTMLInputElement),
                email: this.getElement('input[name="email"]', HTMLInputElement),
                password: this.getElement('input[name="password"]', HTMLInputElement),
                confirmPassword: this.getElement('input[name="confirmPassword"]', HTMLInputElement),
                age: this.getElement('input[name="age"]', HTMLInputElement),
                terms: this.getElement('input[name="terms"]', HTMLInputElement),
                submitButton: this.getElement('button[type="submit"]', HTMLButtonElement),
                errorContainer: this.getElement("#error-container", HTMLElement)
            };

            this.setupEventListeners();
            console.log("✅ Form handler initialized successfully");
            return true;

        } catch (error) {
            console.error("❌ Failed to initialize form handler:", error);
            return false;
        }
    }

    // Setup event listeners with type-safe element access
    private setupEventListeners(): void {
        if (!this.elements) return;

        const { form, username, email, password, confirmPassword, age, terms, submitButton } = this.elements;

        // Form submission
        form.addEventListener("submit", this.handleSubmit.bind(this));

        // Real-time validation
        username.addEventListener("blur", () => this.validateField("username"));
        email.addEventListener("blur", () => this.validateField("email"));
        password.addEventListener("blur", () => this.validateField("password"));
        confirmPassword.addEventListener("blur", () => this.validateField("confirmPassword"));
        age.addEventListener("blur", () => this.validateField("age"));
        terms.addEventListener("change", () => this.validateField("terms"));

        // Password confirmation validation when password changes
        password.addEventListener("input", () => {
            if (confirmPassword.value) {
                this.validateField("confirmPassword");
            }
        });

        // Dynamic submit button state
        const inputs = [username, email, password, confirmPassword, age, terms];
        inputs.forEach(input => {
            input.addEventListener("input", () => this.updateSubmitButton());
            input.addEventListener("change", () => this.updateSubmitButton());
        });
    }

    // Extract form data with proper type conversions
    private extractFormData(): FormData {
        if (!this.elements) {
            throw new Error("Form elements not initialized");
        }

        const { username, email, password, confirmPassword, age, terms } = this.elements;

        return {
            username: username.value.trim(),
            email: email.value.trim(),
            password: password.value,
            confirmPassword: confirmPassword.value,
            age: parseInt(age.value, 10) || 0,
            terms: terms.checked
        };
    }

    // Validation methods
    private validateUsername(value: string): string | null {
        if (!value) return "Username is required";
        if (value.length < 3) return "Username must be at least 3 characters";
        if (value.length > 20) return "Username cannot exceed 20 characters";
        if (!/^[a-zA-Z0-9_]+$/.test(value)) return "Username can only contain letters, numbers, and underscores";
        return null;
    }

    private validateEmail(value: string): string | null {
        if (!value) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Please enter a valid email address";
        return null;
    }

    private validatePassword(value: string): string | null {
        if (!value) return "Password is required";
        if (value.length < 8) return "Password must be at least 8 characters";
        if (!/(?=.*[a-z])/.test(value)) return "Password must contain at least one lowercase letter";
        if (!/(?=.*[A-Z])/.test(value)) return "Password must contain at least one uppercase letter";
        if (!/(?=.*\d)/.test(value)) return "Password must contain at least one number";
        if (!/(?=.*[!@#$%^&*])/.test(value)) return "Password must contain at least one special character";
        return null;
    }

    private validateConfirmPassword(value: string): string | null {
        if (!this.elements) return "Form not initialized";
        if (!value) return "Please confirm your password";
        if (value !== this.elements.password.value) return "Passwords do not match";
        return null;
    }

    private validateAge(value: number): string | null {
        if (!value || isNaN(value)) return "Please enter a valid age";
        if (value < 13) return "You must be at least 13 years old";
        if (value > 120) return "Please enter a valid age";
        return null;
    }

    private validateTerms(value: boolean): string | null {
        if (!value) return "You must accept the terms and conditions";
        return null;
    }

    // Field-specific validation
    private validateField(fieldName: keyof FormData): boolean {
        if (!this.elements) return false;

        const formData = this.extractFormData();
        const value = formData[fieldName];
        const error = this.validators[fieldName](value);

        this.displayFieldError(fieldName, error);
        return error === null;
    }

    // Validate all fields
    private validateAllFields(): ValidationError[] {
        const formData = this.extractFormData();
        const errors: ValidationError[] = [];

        (Object.keys(this.validators) as Array<keyof FormData>).forEach(field => {
            const error = this.validators[field](formData[field]);
            if (error) {
                errors.push({ field, message: error });
            }
        });

        return errors;
    }

    // Display field-specific errors
    private displayFieldError(fieldName: keyof FormData, error: string | null): void {
        if (!this.elements) return;

        const field = this.elements[fieldName];
        const errorElement = document.getElementById(`${fieldName}-error`);

        if (error) {
            field.classList.add("error");
            field.setAttribute("aria-invalid", "true");
            
            if (errorElement) {
                errorElement.textContent = error;
                errorElement.style.display = "block";
            } else {
                // Create error element if it doesn't exist
                const errorDiv = document.createElement("div");
                errorDiv.id = `${fieldName}-error`;
                errorDiv.className = "error-message";
                errorDiv.textContent = error;
                errorDiv.style.color = "red";
                errorDiv.style.fontSize = "0.875rem";
                errorDiv.style.marginTop = "0.25rem";
                
                field.parentNode?.insertBefore(errorDiv, field.nextSibling);
            }
        } else {
            field.classList.remove("error");
            field.setAttribute("aria-invalid", "false");
            
            if (errorElement) {
                errorElement.style.display = "none";
            }
        }
    }

    // Display general errors
    private displayErrors(errors: ValidationError[]): void {
        if (!this.elements) return;

        const { errorContainer } = this.elements;
        
        if (errors.length === 0) {
            errorContainer.style.display = "none";
            return;
        }

        errorContainer.innerHTML = `
            <h3>Please fix the following errors:</h3>
            <ul>
                ${errors.map(error => `<li>${error.message}</li>`).join("")}
            </ul>
        `;
        errorContainer.style.display = "block";
        errorContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    // Update submit button state
    private updateSubmitButton(): void {
        if (!this.elements) return;

        const errors = this.validateAllFields();
        const hasErrors = errors.length > 0;
        
        this.elements.submitButton.disabled = hasErrors;
        this.elements.submitButton.textContent = hasErrors ? "Please fix errors" : "Create Account";
    }

    // Handle form submission
    private handleSubmit(event: Event): void {
        event.preventDefault();
        
        if (!this.elements) {
            console.error("Form elements not initialized");
            return;
        }

        console.log("🔄 Processing form submission...");
        
        try {
            const errors = this.validateAllFields();
            
            if (errors.length > 0) {
                console.log("❌ Validation failed:", errors);
                this.displayErrors(errors);
                return;
            }

            const formData = this.extractFormData();
            this.displayErrors([]); // Clear errors

            // Simulate form submission
            this.submitForm(formData);

        } catch (error) {
            console.error("❌ Form submission error:", error);
            this.displayErrors([{ field: "username", message: "An unexpected error occurred. Please try again." }]);
        }
    }

    // Simulate form submission
    private async submitForm(formData: FormData): Promise<void> {
        if (!this.elements) return;

        const { submitButton } = this.elements;
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = "Creating Account...";

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            console.log("✅ Account created successfully!");
            console.log("User data:", {
                username: formData.username,
                email: formData.email,
                age: formData.age
            });

            // Show success message
            if (this.elements.errorContainer) {
                this.elements.errorContainer.innerHTML = `
                    <div style="color: green; background: #e8f5e8; padding: 1rem; border-radius: 4px;">
                        <h3>Success!</h3>
                        <p>Your account has been created successfully. Welcome, ${formData.username}!</p>
                    </div>
                `;
                this.elements.errorContainer.style.display = "block";
            }

            // Reset form
            this.elements.form.reset();

        } catch (error) {
            console.error("❌ Submission failed:", error);
            this.displayErrors([{ field: "username", message: "Failed to create account. Please try again." }]);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Create Account";
        }
    }

    // Public method to get current form state
    getFormData(): FormData | null {
        try {
            return this.extractFormData();
        } catch {
            return null;
        }
    }

    // Public method to reset form
    reset(): void {
        if (this.elements) {
            this.elements.form.reset();
            this.displayErrors([]);
            
            // Clear individual field errors
            (Object.keys(this.validators) as Array<keyof FormData>).forEach(field => {
                this.displayFieldError(field, null);
            });
        }
    }
}

// Usage example
function initializeFormHandler(): void {
    // First, create the HTML form (this would normally be in your HTML file)
    const formHTML = `
        <form id="registration-form">
            <div>
                <label for="username">Username:</label>
                <input type="text" name="username" id="username" required>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" name="email" id="email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" name="password" id="password" required>
            </div>
            <div>
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" name="confirmPassword" id="confirmPassword" required>
            </div>
            <div>
                <label for="age">Age:</label>
                <input type="number" name="age" id="age" required>
            </div>
            <div>
                <label>
                    <input type="checkbox" name="terms" id="terms" required>
                    I accept the terms and conditions
                </label>
            </div>
            <button type="submit">Create Account</button>
        </form>
        <div id="error-container" style="display: none;"></div>
    `;

    // Insert form into page (for demo purposes)
    const container = document.createElement("div");
    container.innerHTML = formHTML;
    document.body.appendChild(container);

    // Initialize the form handler
    const formHandler = new FormHandler();
    if (formHandler.initialize()) {
        console.log("✅ Form handler ready!");
        
        // Example: Get form data programmatically
        setTimeout(() => {
            const currentData = formHandler.getFormData();
            console.log("Current form data:", currentData);
        }, 1000);
    }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeFormHandler);
} else {
    initializeFormHandler();
}
```

</details>

### Exercise 2: API Response Parser

```typescript
// Create a type-safe API response parser with validation

// Define API response types
interface ApiResponse<T> {
    // Implementation
}

interface User {
    // Implementation
}

interface Product {
    // Implementation
}

// Create parser class that safely handles unknown API responses
class ApiResponseParser {
    // Implementation
}

// Test with various response scenarios
```

<details>
<summary>🎯 Click to see the solution</summary>

```typescript
// Solution: Type-Safe API Response Parser

// API Response types
interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    timestamp: string;
    version: string;
}

interface ApiError {
    success: false;
    error: {
        code: string;
        message: string;
        details?: Record<string, any>;
    };
    timestamp: string;
    version: string;
}

// Domain types
interface User {
    id: number;
    username: string;
    email: string;
    profile: {
        firstName: string;
        lastName: string;
        avatar?: string;
        bio?: string;
        dateOfBirth?: string;
    };
    settings: {
        theme: "light" | "dark" | "auto";
        notifications: {
            email: boolean;
            push: boolean;
            sms: boolean;
        };
        privacy: "public" | "private" | "friends";
    };
    metadata: {
        createdAt: string;
        lastLoginAt?: string;
        isVerified: boolean;
        roles: string[];
    };
}

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    currency: string;
    category: {
        id: number;
        name: string;
        slug: string;
    };
    inventory: {
        inStock: boolean;
        quantity: number;
        reserved: number;
    };
    images: Array<{
        id: number;
        url: string;
        alt: string;
        isPrimary: boolean;
    }>;
    reviews: {
        average: number;
        count: number;
        distribution: Record<string, number>;
    };
    metadata: {
        createdAt: string;
        updatedAt: string;
        isActive: boolean;
        tags: string[];
    };
}

interface Order {
    id: number;
    userId: number;
    status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
    items: Array<{
        productId: number;
        quantity: number;
        unitPrice: number;
        totalPrice: number;
    }>;
    shipping: {
        address: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
        method: "standard" | "express" | "overnight";
        cost: number;
        estimatedDelivery: string;
    };
    payment: {
        method: "credit_card" | "paypal" | "bank_transfer";
        status: "pending" | "authorized" | "captured" | "failed";
        amount: number;
        currency: string;
    };
    timestamps: {
        createdAt: string;
        updatedAt: string;
        shippedAt?: string;
        deliveredAt?: string;
    };
}

// Type guards for validation
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isNumber(value: unknown): value is number {
    return typeof value === "number" && !isNaN(value);
}

function isBoolean(value: unknown): value is boolean {
    return typeof value === "boolean";
}

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

// Validation error class
class ValidationError extends Error {
    constructor(
        message: string,
        public path: string,
        public expected: string,
        public received: any
    ) {
        super(message);
        this.name = "ValidationError";
    }
}

// API Response Parser
class ApiResponseParser {
    // Validate basic API response structure
    private validateApiResponse(data: unknown): ApiResponse<unknown> | ApiError {
        if (!isObject(data)) {
            throw new ValidationError(
                "Response must be an object",
                "root",
                "object",
                typeof data
            );
        }

        if (!isBoolean(data.success)) {
            throw new ValidationError(
                "Response must have success field",
                "success",
                "boolean",
                data.success
            );
        }

        if (!isString(data.timestamp)) {
            throw new ValidationError(
                "Response must have timestamp field",
                "timestamp",
                "string",
                data.timestamp
            );
        }

        if (!isString(data.version)) {
            throw new ValidationError(
                "Response must have version field",
                "version",
                "string",
                data.version
            );
        }

        if (data.success) {
            if (!("data" in data)) {
                throw new ValidationError(
                    "Success response must have data field",
                    "data",
                    "any",
                    undefined
                );
            }

            return data as ApiResponse<unknown>;
        } else {
            if (!isObject(data.error)) {
                throw new ValidationError(
                    "Error response must have error field",
                    "error",
                    "object",
                    data.error
                );
            }

            const error = data.error;
            if (!isString(error.code) || !isString(error.message)) {
                throw new ValidationError(
                    "Error object must have code and message",
                    "error",
                    "object with code and message",
                    error
                );
            }

            return data as ApiError;
        }
    }

    // Validate User object
    private validateUser(data: unknown, path: string = "user"): User {
        if (!isObject(data)) {
            throw new ValidationError("Expected user object", path, "object", typeof data);
        }

        const user = data as Record<string, unknown>;

        // Validate required fields
        if (!isNumber(user.id)) {
            throw new ValidationError("User ID must be number", `${path}.id`, "number", user.id);
        }

        if (!isString(user.username)) {
            throw new ValidationError("Username must be string", `${path}.username`, "string", user.username);
        }

        if (!isString(user.email)) {
            throw new ValidationError("Email must be string", `${path}.email`, "string", user.email);
        }

        // Validate profile
        if (!isObject(user.profile)) {
            throw new ValidationError("Profile must be object", `${path}.profile`, "object", user.profile);
        }

        const profile = user.profile as Record<string, unknown>;
        if (!isString(profile.firstName) || !isString(profile.lastName)) {
            throw new ValidationError(
                "Profile must have firstName and lastName",
                `${path}.profile`,
                "object with firstName and lastName",
                profile
            );
        }

        // Validate settings
        if (!isObject(user.settings)) {
            throw new ValidationError("Settings must be object", `${path}.settings`, "object", user.settings);
        }

        const settings = user.settings as Record<string, unknown>;
        if (!["light", "dark", "auto"].includes(settings.theme as string)) {
            throw new ValidationError(
                "Theme must be light, dark, or auto",
                `${path}.settings.theme`,
                "light | dark | auto",
                settings.theme
            );
        }

        if (!isObject(settings.notifications)) {
            throw new ValidationError(
                "Notifications must be object",
                `${path}.settings.notifications`,
                "object",
                settings.notifications
            );
        }

        // Validate metadata
        if (!isObject(user.metadata)) {
            throw new ValidationError("Metadata must be object", `${path}.metadata`, "object", user.metadata);
        }

        const metadata = user.metadata as Record<string, unknown>;
        if (!isString(metadata.createdAt) || !isBoolean(metadata.isVerified) || !isArray(metadata.roles)) {
            throw new ValidationError(
                "Invalid metadata structure",
                `${path}.metadata`,
                "object with createdAt, isVerified, roles",
                metadata
            );
        }

        return data as User;
    }

    // Validate Product object
    private validateProduct(data: unknown, path: string = "product"): Product {
        if (!isObject(data)) {
            throw new ValidationError("Expected product object", path, "object", typeof data);
        }

        const product = data as Record<string, unknown>;

        // Validate required fields
        if (!isNumber(product.id)) {
            throw new ValidationError("Product ID must be number", `${path}.id`, "number", product.id);
        }

        if (!isString(product.name) || !isString(product.description)) {
            throw new ValidationError(
                "Product must have name and description",
                `${path}`,
                "object with name and description strings",
                { name: product.name, description: product.description }
            );
        }

        if (!isNumber(product.price) || product.price < 0) {
            throw new ValidationError("Price must be positive number", `${path}.price`, "positive number", product.price);
        }

        if (!isString(product.currency)) {
            throw new ValidationError("Currency must be string", `${path}.currency`, "string", product.currency);
        }

        // Validate category
        if (!isObject(product.category)) {
            throw new ValidationError("Category must be object", `${path}.category`, "object", product.category);
        }

        // Validate inventory
        if (!isObject(product.inventory)) {
            throw new ValidationError("Inventory must be object", `${path}.inventory`, "object", product.inventory);
        }

        const inventory = product.inventory as Record<string, unknown>;
        if (!isBoolean(inventory.inStock) || !isNumber(inventory.quantity) || !isNumber(inventory.reserved)) {
            throw new ValidationError(
                "Invalid inventory structure",
                `${path}.inventory`,
                "object with inStock, quantity, reserved",
                inventory
            );
        }

        // Validate images array
        if (!isArray(product.images)) {
            throw new ValidationError("Images must be array", `${path}.images`, "array", product.images);
        }

        // Validate reviews
        if (!isObject(product.reviews)) {
            throw new ValidationError("Reviews must be object", `${path}.reviews`, "object", product.reviews);
        }

        const reviews = product.reviews as Record<string, unknown>;
        if (!isNumber(reviews.average) || !isNumber(reviews.count) || !isObject(reviews.distribution)) {
            throw new ValidationError(
                "Invalid reviews structure",
                `${path}.reviews`,
                "object with average, count, distribution",
                reviews
            );
        }

        return data as Product;
    }

    // Validate Order object
    private validateOrder(data: unknown, path: string = "order"): Order {
        if (!isObject(data)) {
            throw new ValidationError("Expected order object", path, "object", typeof data);
        }

        const order = data as Record<string, unknown>;

        // Validate required fields
        if (!isNumber(order.id) || !isNumber(order.userId)) {
            throw new ValidationError(
                "Order must have id and userId",
                `${path}`,
                "object with id and userId numbers",
                { id: order.id, userId: order.userId }
            );
        }

        const validStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
        if (!validStatuses.includes(order.status as string)) {
            throw new ValidationError(
                "Invalid order status",
                `${path}.status`,
                validStatuses.join(" | "),
                order.status
            );
        }

        // Validate items array
        if (!isArray(order.items)) {
            throw new ValidationError("Items must be array", `${path}.items`, "array", order.items);
        }

        // Validate shipping
        if (!isObject(order.shipping)) {
            throw new ValidationError("Shipping must be object", `${path}.shipping`, "object", order.shipping);
        }

        // Validate payment
        if (!isObject(order.payment)) {
            throw new ValidationError("Payment must be object", `${path}.payment`, "object", order.payment);
        }

        // Validate timestamps
        if (!isObject(order.timestamps)) {
            throw new ValidationError("Timestamps must be object", `${path}.timestamps`, "object", order.timestamps);
        }

        return data as Order;
    }

    // Parse User response
    parseUserResponse(response: unknown): User {
        try {
            const apiResponse = this.validateApiResponse(response);
            
            if (!apiResponse.success) {
                throw new Error(`API Error: ${apiResponse.error.message} (${apiResponse.error.code})`);
            }

            return this.validateUser(apiResponse.data);

        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(`User validation failed at ${error.path}: ${error.message}. Expected ${error.expected}, got ${typeof error.received}`);
            }
            throw error;
        }
    }

    // Parse Product response
    parseProductResponse(response: unknown): Product {
        try {
            const apiResponse = this.validateApiResponse(response);
            
            if (!apiResponse.success) {
                throw new Error(`API Error: ${apiResponse.error.message} (${apiResponse.error.code})`);
            }

            return this.validateProduct(apiResponse.data);

        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(`Product validation failed at ${error.path}: ${error.message}. Expected ${error.expected}, got ${typeof error.received}`);
            }
            throw error;
        }
    }

    // Parse Products list response
    parseProductsResponse(response: unknown): Product[] {
        try {
            const apiResponse = this.validateApiResponse(response);
            
            if (!apiResponse.success) {
                throw new Error(`API Error: ${apiResponse.error.message} (${apiResponse.error.code})`);
            }

            if (!isArray(apiResponse.data)) {
                throw new ValidationError("Products data must be array", "data", "array", typeof apiResponse.data);
            }

            return apiResponse.data.map((item, index) => 
                this.validateProduct(item, `data[${index}]`)
            );

        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(`Products validation failed at ${error.path}: ${error.message}. Expected ${error.expected}, got ${typeof error.received}`);
            }
            throw error;
        }
    }

    // Parse Order response
    parseOrderResponse(response: unknown): Order {
        try {
            const apiResponse = this.validateApiResponse(response);
            
            if (!apiResponse.success) {
                throw new Error(`API Error: ${apiResponse.error.message} (${apiResponse.error.code})`);
            }

            return this.validateOrder(apiResponse.data);

        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(`Order validation failed at ${error.path}: ${error.message}. Expected ${error.expected}, got ${typeof error.received}`);
            }
            throw error;
        }
    }

    // Generic parser with type assertion
    parseResponse<T>(
        response: unknown,
        validator: (data: unknown) => T
    ): T {
        try {
            const apiResponse = this.validateApiResponse(response);
            
            if (!apiResponse.success) {
                throw new Error(`API Error: ${apiResponse.error.message} (${apiResponse.error.code})`);
            }

            return validator(apiResponse.data);

        } catch (error) {
            if (error instanceof ValidationError) {
                throw new Error(`Validation failed at ${error.path}: ${error.message}. Expected ${error.expected}, got ${typeof error.received}`);
            }
            throw error;
        }
    }
}

// Usage examples and testing
function demonstrateApiParser(): void {
    console.log("=== API Response Parser Demo ===\n");

    const parser = new ApiResponseParser();

    // Test data - valid responses
    const validUserResponse = {
        success: true,
        data: {
            id: 1,
            username: "johndoe",
            email: "john@example.com",
            profile: {
                firstName: "John",
                lastName: "Doe",
                avatar: "https://example.com/avatar.jpg",
                bio: "Software developer"
            },
            settings: {
                theme: "dark",
                notifications: {
                    email: true,
                    push: false,
                    sms: false
                },
                privacy: "public"
            },
            metadata: {
                createdAt: "2024-01-01T00:00:00Z",
                lastLoginAt: "2024-01-15T10:30:00Z",
                isVerified: true,
                roles: ["user", "developer"]
            }
        },
        timestamp: "2024-01-15T12:00:00Z",
        version: "1.0"
    };

    const validProductsResponse = {
        success: true,
        data: [
            {
                id: 1,
                name: "Gaming Laptop",
                description: "High-performance gaming laptop",
                price: 1299.99,
                currency: "USD",
                category: {
                    id: 1,
                    name: "Electronics",
                    slug: "electronics"
                },
                inventory: {
                    inStock: true,
                    quantity: 50,
                    reserved: 5
                },
                images: [
                    {
                        id: 1,
                        url: "https://example.com/laptop1.jpg",
                        alt: "Gaming laptop front view",
                        isPrimary: true
                    }
                ],
                reviews: {
                    average: 4.5,
                    count: 128,
                    distribution: {
                        "5": 80,
                        "4": 30,
                        "3": 12,
                        "2": 4,
                        "1": 2
                    }
                },
                metadata: {
                    createdAt: "2024-01-01T00:00:00Z",
                    updatedAt: "2024-01-10T00:00:00Z",
                    isActive: true,
                    tags: ["gaming", "laptop", "high-performance"]
                }
            }
        ],
        timestamp: "2024-01-15T12:00:00Z",
        version: "1.0"
    };

    // Test 1: Valid user response
    console.log("1. Testing valid user response:");
    try {
        const user = parser.parseUserResponse(validUserResponse);
        console.log("✅ User parsed successfully:");
        console.log(`   Name: ${user.profile.firstName} ${user.profile.lastName}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Theme: ${user.settings.theme}`);
        console.log(`   Verified: ${user.metadata.isVerified}`);
    } catch (error) {
        console.log("❌ Error:", error);
    }

    // Test 2: Valid products response
    console.log("\n2. Testing valid products response:");
    try {
        const products = parser.parseProductsResponse(validProductsResponse);
        console.log("✅ Products parsed successfully:");
        products.forEach(product => {
            console.log(`   ${product.name}: $${product.price} ${product.currency}`);
            console.log(`   In stock: ${product.inventory.quantity} units`);
        });
    } catch (error) {
        console.log("❌ Error:", error);
    }

    // Test 3: Invalid response (missing required field)
    console.log("\n3. Testing invalid response (missing username):");
    try {
        const invalidResponse = {
            ...validUserResponse,
            data: {
                ...validUserResponse.data,
                username: undefined // Missing required field
            }
        };
        parser.parseUserResponse(invalidResponse);
    } catch (error) {
        console.log("❌ Expected error:", error);
    }

    // Test 4: API error response
    console.log("\n4. Testing API error response:");
    try {
        const errorResponse = {
            success: false,
            error: {
                code: "USER_NOT_FOUND",
                message: "User with ID 999 not found",
                details: { userId: 999 }
            },
            timestamp: "2024-01-15T12:00:00Z",
            version: "1.0"
        };
        parser.parseUserResponse(errorResponse);
    } catch (error) {
        console.log("❌ Expected error:", error);
    }

    // Test 5: Completely invalid response
    console.log("\n5. Testing completely invalid response:");
    try {
        parser.parseUserResponse("not an object");
    } catch (error) {
        console.log("❌ Expected error:", error);
    }

    // Test 6: Using generic parser
    console.log("\n6. Testing generic parser with custom validator:");
    try {
        interface CustomData {
            message: string;
            code: number;
        }

        const customValidator = (data: unknown): CustomData => {
            if (!isObject(data)) {
                throw new ValidationError("Expected object", "data", "object", typeof data);
            }
            const obj = data as Record<string, unknown>;
            if (!isString(obj.message) || !isNumber(obj.code)) {
                throw new ValidationError("Invalid structure", "data", "object with message and code", obj);
            }
            return obj as CustomData;
        };

        const customResponse = {
            success: true,
            data: {
                message: "Operation completed",
                code: 200
            },
            timestamp: "2024-01-15T12:00:00Z",
            version: "1.0"
        };

        const customData = parser.parseResponse(customResponse, customValidator);
        console.log("✅ Custom data parsed successfully:");
        console.log(`   Message: ${customData.message}`);
        console.log(`   Code: ${customData.code}`);
    } catch (error) {
        console.log("❌ Error:", error);
    }
}

// Run the demonstration
demonstrateApiParser();
```

</details>

---

## 🎯 Key Takeaways

After completing this lesson, you should understand:

### ✅ Type Assertion Fundamentals:
- **`as` syntax** for type assertions (preferred over angle brackets)
- **When to use assertions** - DOM elements, API responses, object transformations
- **Safe assertion patterns** with validation and type guards
- **Common pitfalls** and how to avoid runtime errors

### ✅ Practical Applications:
- **DOM manipulation** with specific element types
- **API response handling** with unknown data structures
- **Object transformation** when you know the resulting type
- **Library integration** when working with untyped code

### ✅ Safety Techniques:
- **Validate before asserting** to prevent runtime errors
- **Use type guards** as safer alternatives when possible
- **Combine with null checks** for defensive programming
- **Prefer discriminated unions** over assertions when applicable

### ✅ Best Practices:
- **Use assertions sparingly** - prefer type inference when possible
- **Always validate unknown data** before asserting types
- **Document why assertions are needed** for future maintainers
- **Consider type guards** for reusable validation logic

---

## 🚀 What's Next?

Congratulations! You've mastered type assertions in TypeScript. You now know how to:

- ✅ **Tell TypeScript about types** you know but it can't infer
- ✅ **Handle DOM elements safely** with proper element types
- ✅ **Parse API responses** with validation and assertions
- ✅ **Avoid common pitfalls** that lead to runtime errors
- ✅ **Use safer alternatives** like type guards when appropriate

**Next Lesson**: `13-generics.md` - Learn about generics for creating reusable, flexible types that work with multiple data types!

---

*Remember: Type assertions are powerful but dangerous. Always validate your assumptions about data structure, especially when dealing with external sources like APIs or user input!* 🎯
