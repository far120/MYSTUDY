/**
 * Week 2 - Interfaces Examples
 * Learn to describe object shapes and create contracts for your code
 */
console.log('🏗️ Week 2: Interfaces Examples\n');
// ======================================
// 1. BASIC INTERFACES
// ======================================
console.log('1. Basic Interfaces:');
// Use the interface
const user1 = {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    age: 28
};
console.log('User 1:', user1);
// Function using interface
function displayUser(user) {
    console.log(`User: ${user.name} (${user.email}), Age: ${user.age}`);
}
displayUser(user1);
// ======================================
// 2. OPTIONAL PROPERTIES
// ======================================
console.log('\n2. Optional Properties:');
const product1 = {
    id: 1,
    name: 'Laptop',
    price: 999
    // description and category are optional
};
const product2 = {
    id: 2,
    name: 'Smartphone',
    price: 599,
    description: 'Latest model with advanced features',
    category: 'Electronics'
};
console.log('Product 1:', product1);
console.log('Product 2:', product2);
// ======================================
// 3. READONLY PROPERTIES
// ======================================
console.log('\n3. Readonly Properties:');
const appConfig = {
    apiUrl: 'https://api.example.com',
    version: '1.0.0',
    timeout: 5000
};
console.log('Config:', appConfig);
// This is allowed
appConfig.timeout = 10000;
// This would cause an error:
// appConfig.apiUrl = 'https://newapi.com'; // ❌ Cannot assign to readonly property
console.log('Updated timeout:', appConfig.timeout);
// ======================================
// 4. INTERFACE METHODS
// ======================================
console.log('\n4. Interface Methods:');
const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => {
        if (b === 0)
            throw new Error('Division by zero');
        return a / b;
    }
};
console.log('5 + 3 =', calculator.add(5, 3));
console.log('10 - 4 =', calculator.subtract(10, 4));
console.log('6 * 7 =', calculator.multiply(6, 7));
console.log('15 / 3 =', calculator.divide(15, 3));
// ======================================
// 5. EXTENDING INTERFACES
// ======================================
console.log('\n5. Extending Interfaces:');
const myDog = {
    name: 'Buddy',
    age: 5,
    breed: 'Golden Retriever',
    isGoodBoy: true
};
const myCat = {
    name: 'Whiskers',
    age: 3,
    indoorOnly: true,
    favoriteToy: 'Feather wand'
};
console.log('My dog:', myDog);
console.log('My cat:', myCat);
// ======================================
// 6. MULTIPLE INTERFACE INHERITANCE
// ======================================
console.log('\n6. Multiple Interface Inheritance:');
const duck = {
    name: 'Donald',
    age: 2,
    maxAltitude: 1000,
    maxDepth: 10,
    fly: () => console.log('Flying through the sky!'),
    swim: () => console.log('Swimming in the pond!'),
    quack: () => console.log('Quack quack!')
};
console.log('Duck:', duck.name);
duck.fly();
duck.swim();
duck.quack();
// ======================================
// 7. FUNCTION INTERFACES
// ======================================
console.log('\n7. Function Interfaces:');
const mySearch = (source, searchTerm) => {
    return source.includes(searchTerm);
};
console.log('Search "hello" in "hello world":', mySearch('hello world', 'hello'));
console.log('Search "foo" in "hello world":', mySearch('hello world', 'foo'));
// ======================================
// 8. INDEXABLE INTERFACES
// ======================================
console.log('\n8. Indexable Interfaces:');
const fruits = ['apple', 'banana', 'orange'];
console.log('Fruits:', fruits);
console.log('First fruit:', fruits[0]);
const colors = {
    red: '#FF0000',
    green: '#00FF00',
    blue: '#0000FF'
};
console.log('Colors:', colors);
console.log('Red color code:', colors['red']);
// ======================================
// 9. INTERFACE VS TYPE ALIAS
// ======================================
console.log('\n9. Interface vs Type Alias:');
const userWithStatus = {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
    age: 32,
    status: 'success'
};
console.log('User with status:', userWithStatus);
// ======================================
// 10. PRACTICAL EXAMPLE - API RESPONSES
// ======================================
console.log('\n10. Practical Example - API Responses:');
// Successful response
const successResponse = {
    success: true,
    message: 'Posts retrieved successfully',
    data: [
        {
            id: 1,
            title: 'Getting Started with TypeScript',
            content: 'TypeScript is amazing...',
            author: 'John Doe',
            publishedAt: '2024-01-15',
            tags: ['typescript', 'programming', 'tutorial']
        },
        {
            id: 2,
            title: 'Advanced TypeScript Patterns',
            content: 'In this post we explore...',
            author: 'Jane Smith',
            publishedAt: '2024-01-20',
            tags: ['typescript', 'advanced', 'patterns']
        }
    ]
};
// Error response
const errorResponse = {
    success: false,
    message: 'Failed to retrieve posts',
    errors: ['Database connection failed', 'Invalid authentication token']
};
console.log('Success response:', successResponse);
console.log('Error response:', errorResponse);
function handleApiResponse(response) {
    if (response.success && response.data) {
        console.log('✅ Success:', response.message);
        console.log('Data:', response.data);
    }
    else {
        console.log('❌ Error:', response.message);
        if (response.errors) {
            console.log('Errors:', response.errors);
        }
    }
}
console.log('\nHandling success response:');
handleApiResponse(successResponse);
console.log('\nHandling error response:');
handleApiResponse(errorResponse);
console.log('\n✅ Interfaces Examples Complete!');
console.log('Next: Check out type aliases and union types!');
//# sourceMappingURL=interfaces.js.map