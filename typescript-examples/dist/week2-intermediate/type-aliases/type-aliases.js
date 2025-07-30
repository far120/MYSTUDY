/**
 * Week 2 - Type Aliases Examples
 * Create custom types for better code organization and reusability
 */
console.log('🏷️ Week 2: Type Aliases Examples\n');
// ======================================
// 1. BASIC TYPE ALIASES
// ======================================
console.log('1. Basic Type Aliases:');
// Using the aliases
const userId = 12345;
const userName = 'Alice Johnson';
const email = 'alice@example.com';
console.log(`User: ${userName} (ID: ${userId}, Email: ${email})`);
// Function using type aliases
function createUserAccount(id, name, email) {
    console.log(`Creating account for ${name} with ID ${id}`);
}
createUserAccount(67890, 'Bob Smith', 'bob@example.com');
// ======================================
// 2. UNION TYPES
// ======================================
console.log('\n2. Union Types:');
// Using union types
function setApplicationStatus(status) {
    console.log(`Application status set to: ${status}`);
}
function applyTheme(theme) {
    console.log(`Applying ${theme} theme`);
}
setApplicationStatus('approved');
setApplicationStatus('pending');
applyTheme('dark');
const value1 = 'hello';
const value2 = 42;
const flag = true;
const nullFlag = null;
console.log('String or number values:', value1, value2);
console.log('Boolean or null values:', flag, nullFlag);
// ======================================
// 3. OBJECT TYPE ALIASES
// ======================================
console.log('\n3. Object Type Aliases:');
const user = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    isActive: true
};
const userWithAddress = {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    isActive: true,
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
    country: 'USA'
};
console.log('User:', user);
console.log('User with address:', userWithAddress);
// ======================================
// 4. FUNCTION TYPE ALIASES
// ======================================
console.log('\n4. Function Type Aliases:');
// Implementing the function types
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const uppercase = (input) => input.toUpperCase();
const removeSpaces = (input) => input.replace(/\s/g, '');
const clickHandler = (buttonId) => {
    console.log(`Button ${buttonId} was clicked`);
};
console.log('add(5, 3):', add(5, 3));
console.log('multiply(4, 6):', multiply(4, 6));
console.log('uppercase("hello"):', uppercase('hello'));
console.log('removeSpaces("hello world"):', removeSpaces('hello world'));
clickHandler('submit-btn');
// ======================================
// 5. ARRAY TYPE ALIASES
// ======================================
console.log('\n5. Array Type Aliases:');
const scores = [95, 87, 92, 78];
const names = ['Alice', 'Bob', 'Charlie'];
const users = [user, { id: 3, name: 'David', email: 'david@example.com', isActive: false }];
const mixed = ['hello', 42, true, 'world', 100, false];
const todos = [
    { id: 1, text: 'Learn TypeScript', completed: true },
    { id: 2, text: 'Build a project', completed: false },
    { id: 3, text: 'Deploy to production', completed: false }
];
console.log('Scores:', scores);
console.log('Names:', names);
console.log('Users count:', users.length);
console.log('Mixed data:', mixed);
console.log('Todos:', todos);
// ======================================
// 6. GENERIC TYPE ALIASES
// ======================================
console.log('\n6. Generic Type Aliases:');
// Using generic types
const stringResult = {
    success: true,
    data: 'Operation completed successfully'
};
const numberResult = {
    success: false,
    error: 'Invalid input provided'
};
const coordinates = {
    first: 10,
    second: 20
};
const nameAge = {
    first: 'Alice',
    second: 30
};
const settings = {
    theme: 'dark',
    language: 'en',
    timezone: 'UTC'
};
const counters = {
    visitors: 1000,
    pageViews: 5000,
    downloads: 250
};
console.log('String result:', stringResult);
console.log('Number result:', numberResult);
console.log('Coordinates:', coordinates);
console.log('Name and age:', nameAge);
console.log('Settings:', settings);
console.log('Counters:', counters);
// ======================================
// 7. CONDITIONAL TYPE ALIASES
// ======================================
console.log('\n7. Conditional Type Aliases:');
const safeStr = 'hello'; // null and undefined are excluded
const safeNum = 42;
console.log('Safe string:', safeStr);
console.log('Safe number:', safeNum);
// ======================================
// 8. MAPPED TYPE ALIASES
// ======================================
console.log('\n8. Mapped Type Aliases:');
const partialProduct = {
    name: 'Smartphone'
    // id, price, and category are optional
};
const immutableProduct = {
    id: 1,
    name: 'Laptop',
    price: 999,
    category: 'Electronics'
};
console.log('Partial product:', partialProduct);
console.log('Immutable product:', immutableProduct);
// This would cause an error:
// immutableProduct.price = 1200; // ❌ Cannot assign to readonly property
// ======================================
// 9. PRACTICAL EXAMPLE - API CLIENT
// ======================================
console.log('\n9. Practical Example - API Client:');
// Mock implementation
const apiClient = {
    async get(url) {
        console.log(`GET request to ${url}`);
        return {
            status: 200,
            statusText: 'OK',
            data: {},
            headers: { 'content-type': 'application/json' }
        };
    },
    async post(url, data) {
        console.log(`POST request to ${url} with data:`, data);
        return {
            status: 201,
            statusText: 'Created',
            data: {},
            headers: { 'content-type': 'application/json' }
        };
    },
    async put(url, data) {
        console.log(`PUT request to ${url} with data:`, data);
        return {
            status: 200,
            statusText: 'OK',
            data: {},
            headers: { 'content-type': 'application/json' }
        };
    },
    async delete(url) {
        console.log(`DELETE request to ${url}`);
        return {
            status: 204,
            statusText: 'No Content',
            data: {},
            headers: {}
        };
    }
};
// Usage
async function demonstrateApiClient() {
    const getUserResponse = await apiClient.get('/api/users/1');
    console.log('Get user response status:', getUserResponse.status);
    const createUserResponse = await apiClient.post('/api/users', {
        name: 'New User',
        email: 'new@example.com'
    });
    console.log('Create user response status:', createUserResponse.status);
}
demonstrateApiClient();
console.log('\n✅ Type Aliases Examples Complete!');
console.log('Next: Explore optional properties and advanced type features!');
//# sourceMappingURL=type-aliases.js.map