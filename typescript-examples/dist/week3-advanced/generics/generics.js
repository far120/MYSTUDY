/**
 * Week 3 - Generics Examples
 * Master reusable, flexible types that work with multiple data types
 */
console.log('🔄 Week 3: Generics Examples\n');
// ======================================
// 1. BASIC GENERICS
// ======================================
console.log('1. Basic Generics:');
// Generic function
function identity(arg) {
    return arg;
}
// Usage with different types
const stringResult = identity('hello');
const numberResult = identity(42);
const booleanResult = identity(true);
// Type inference (TypeScript figures out the type)
const inferredString = identity('world'); // TypeScript infers string
const inferredNumber = identity(100); // TypeScript infers number
console.log('String identity:', stringResult);
console.log('Number identity:', numberResult);
console.log('Boolean identity:', booleanResult);
console.log('Inferred string:', inferredString);
console.log('Inferred number:', inferredNumber);
// ======================================
// 2. GENERIC FUNCTIONS
// ======================================
console.log('\n2. Generic Functions:');
// Generic function to get first element of array
function getFirstElement(array) {
    return array.length > 0 ? array[0] : undefined;
}
const numbers = [1, 2, 3, 4, 5];
const strings = ['apple', 'banana', 'cherry'];
const booleans = [true, false, true];
console.log('First number:', getFirstElement(numbers));
console.log('First string:', getFirstElement(strings));
console.log('First boolean:', getFirstElement(booleans));
// Generic function with multiple type parameters
function pair(first, second) {
    return { first, second };
}
const stringNumberPair = pair('hello', 42);
const numberBooleanPair = pair(100, true);
const stringStringPair = pair('key', 'value');
console.log('String-Number pair:', stringNumberPair);
console.log('Number-Boolean pair:', numberBooleanPair);
console.log('String-String pair:', stringStringPair);
// ======================================
// 3. GENERIC INTERFACES
// ======================================
console.log('\n3. Generic Interfaces:');
// Implementation of generic repository
class InMemoryRepository {
    constructor() {
        this.items = [];
        this.nextId = 1;
    }
    findById(id) {
        return this.items.find(item => item.id === id);
    }
    findAll() {
        return [...this.items];
    }
    create(item) {
        const newItem = { ...item, id: this.nextId++ };
        this.items.push(newItem);
        return newItem;
    }
    update(id, item) {
        const index = this.items.findIndex(i => i.id === id);
        if (index === -1)
            return undefined;
        this.items[index] = { ...this.items[index], ...item };
        return this.items[index];
    }
    delete(id) {
        const index = this.items.findIndex(item => item.id === id);
        if (index === -1)
            return false;
        this.items.splice(index, 1);
        return true;
    }
}
// Usage with different types
const userRepository = new InMemoryRepository();
const productRepository = new InMemoryRepository();
const user1 = userRepository.create({
    name: 'Alice Johnson',
    email: 'alice@example.com',
    age: 28
});
const product1 = productRepository.create({
    name: 'Laptop',
    price: 999,
    category: 'Electronics'
});
console.log('Created user:', user1);
console.log('Created product:', product1);
// ======================================
// 4. GENERIC CLASSES
// ======================================
console.log('\n4. Generic Classes:');
// Generic Stack class
class Stack {
    constructor() {
        this.items = [];
    }
    push(item) {
        this.items.push(item);
    }
    pop() {
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length === 0;
    }
    size() {
        return this.items.length;
    }
    toArray() {
        return [...this.items];
    }
}
// Usage with different types
const numberStack = new Stack();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
const stringStack = new Stack();
stringStack.push('first');
stringStack.push('second');
stringStack.push('third');
console.log('Number stack:', numberStack.toArray());
console.log('String stack:', stringStack.toArray());
console.log('Number stack pop:', numberStack.pop());
console.log('String stack peek:', stringStack.peek());
// ======================================
// 5. CONSTRAINED GENERICS
// ======================================
console.log('\n5. Constrained Generics:');
function logLength(item) {
    console.log(`Item has length: ${item.length}`);
    return item;
}
// These work because they have length property
logLength('hello world');
logLength([1, 2, 3, 4, 5]);
logLength({ length: 10, value: 'test' });
// This would cause an error:
// logLength(42); // ❌ number doesn't have length property
// Generic constraint with keyof
function getProperty(obj, key) {
    return obj[key];
}
const person = { name: 'John', age: 30, email: 'john@example.com' };
const name = getProperty(person, 'name'); // string
const age = getProperty(person, 'age'); // number
const email = getProperty(person, 'email'); // string
console.log('Name:', name);
console.log('Age:', age);
console.log('Email:', email);
// This would cause an error:
// const invalid = getProperty(person, 'height'); // ❌ 'height' doesn't exist on person
// ======================================
// 6. GENERIC UTILITY TYPES
// ======================================
console.log('\n6. Generic Utility Types:');
const newUser = {
    name: 'Bob Smith',
    email: 'bob@example.com',
    age: 35
};
const partialUpdate = {
    age: 36 // Only updating age
};
const nameOnly = {
    name: 'Charlie Brown'
};
console.log('New user (no ID):', newUser);
console.log('Partial update:', partialUpdate);
console.log('Name only:', nameOnly);
const themeConfig = {
    light: { background: '#ffffff', text: '#000000' },
    dark: { background: '#000000', text: '#ffffff' },
    auto: { background: '#f0f0f0', text: '#333333' }
};
console.log('Theme config:', themeConfig);
// ======================================
// 7. CONDITIONAL TYPES
// ======================================
console.log('\n7. Conditional Types:');
function getString() { return 'hello'; }
function getNumber() { return 42; }
console.log('Conditional types help extract types from complex structures');
// ======================================
// 8. MAPPED TYPES WITH GENERICS
// ======================================
console.log('\n8. Mapped Types with Generics:');
const userWithOptionalEmail = {
    id: 1,
    name: 'David Wilson',
    age: 25
    // email is optional
};
const nullableUser = {
    id: 2,
    name: null, // Can be null
    email: 'test@example.com',
    age: null // Can be null
};
console.log('User with optional email:', userWithOptionalEmail);
console.log('Nullable user:', nullableUser);
// ======================================
// 9. PRACTICAL EXAMPLE - GENERIC CACHE
// ======================================
console.log('\n9. Practical Example - Generic Cache:');
class Cache {
    constructor(maxSize = 100) {
        this.cache = new Map();
        this.maxSize = maxSize;
    }
    set(key, value) {
        if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
            // Remove oldest entry (first entry in Map)
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
    get(key) {
        return this.cache.get(key);
    }
    has(key) {
        return this.cache.has(key);
    }
    delete(key) {
        return this.cache.delete(key);
    }
    clear() {
        this.cache.clear();
    }
    size() {
        return this.cache.size;
    }
    keys() {
        return Array.from(this.cache.keys());
    }
    values() {
        return Array.from(this.cache.values());
    }
}
// Usage with different key-value types
const stringCache = new Cache(5);
const numberCache = new Cache(10);
stringCache.set('user1', { id: 1, name: 'Alice', email: 'alice@example.com', age: 30 });
stringCache.set('user2', { id: 2, name: 'Bob', email: 'bob@example.com', age: 25 });
numberCache.set(1, { id: 1, name: 'Laptop', price: 999, category: 'Electronics' });
numberCache.set(2, { id: 2, name: 'Mouse', price: 25, category: 'Accessories' });
console.log('String cache size:', stringCache.size());
console.log('Cached user1:', stringCache.get('user1'));
console.log('Number cache keys:', numberCache.keys());
console.log('Cached product:', numberCache.get(1));
console.log('\n✅ Generics Examples Complete!');
console.log('🎉 You now understand how to create flexible, reusable types!');
console.log('Next: Explore classes and advanced object-oriented patterns!');
//# sourceMappingURL=generics.js.map