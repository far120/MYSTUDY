"use strict";
/**
 * JavaScript vs TypeScript Comparison Examples
 * See the same functionality implemented in both languages
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.runComparisonExamples = runComparisonExamples;
function runComparisonExamples() {
    console.log('🔄 JavaScript vs TypeScript Comparison\n');
    // ======================================
    // EXAMPLE 1: SIMPLE FUNCTION
    // ======================================
    console.log('Example 1: Simple Function');
    console.log('JavaScript version (no type safety):');
    // JavaScript - potential runtime errors
    function addJavaScript(a, b) {
        return a + b;
    }
    console.log('addJavaScript(5, 3):', addJavaScript(5, 3)); // 8 ✅
    console.log('addJavaScript("5", 3):', addJavaScript("5", 3)); // "53" ❌
    console.log('addJavaScript(5, undefined):', addJavaScript(5, undefined)); // NaN ❌
    console.log('\nTypeScript version (type safe):');
    // TypeScript - compile-time error prevention
    function addTypeScript(a, b) {
        return a + b;
    }
    console.log('addTypeScript(5, 3):', addTypeScript(5, 3)); // 8 ✅
    // These would cause TypeScript compile errors:
    // addTypeScript("5", 3); // ❌ string not assignable to number
    // addTypeScript(5); // ❌ missing required parameter
    // ======================================
    // EXAMPLE 2: OBJECT HANDLING
    // ======================================
    console.log('\n\nExample 2: Object Handling');
    console.log('JavaScript version:');
    // JavaScript - no structure enforcement
    function greetUserJavaScript(user) {
        return `Hello, ${user.name}! You are ${user.age} years old.`;
    }
    console.log('Valid user:', greetUserJavaScript({ name: "John", age: 25 }));
    // These would cause runtime errors:
    try {
        console.log('String input:', greetUserJavaScript("John"));
    }
    catch (e) {
        console.log('❌ Runtime error:', e.message);
    }
    try {
        console.log('Null input:', greetUserJavaScript(null));
    }
    catch (e) {
        console.log('❌ Runtime error:', e.message);
    }
    console.log('\nTypeScript version:');
    function greetUserTypeScript(user) {
        return `Hello, ${user.name}! You are ${user.age} years old.`;
    }
    console.log('Valid user:', greetUserTypeScript({ name: "Alice", age: 30 }));
    // These would cause TypeScript compile errors:
    // greetUserTypeScript("Alice"); // ❌ string not assignable to User
    // greetUserTypeScript(null); // ❌ null not assignable to User
    // greetUserTypeScript({ name: "Bob" }); // ❌ missing 'age' property
    // ======================================
    // EXAMPLE 3: ARRAY OPERATIONS
    // ======================================
    console.log('\n\nExample 3: Array Operations');
    console.log('JavaScript version:');
    // JavaScript - no type enforcement for array contents
    function processNumbersJavaScript(numbers) {
        return numbers.map((n) => n * 2);
    }
    console.log('Valid array:', processNumbersJavaScript([1, 2, 3, 4]));
    // This would cause runtime issues:
    try {
        console.log('Mixed array:', processNumbersJavaScript([1, "2", 3, null]));
    }
    catch (e) {
        console.log('❌ Runtime error:', e.message);
    }
    console.log('\nTypeScript version:');
    // TypeScript - enforces array element types
    function processNumbersTypeScript(numbers) {
        return numbers.map(n => n * 2);
    }
    console.log('Valid array:', processNumbersTypeScript([1, 2, 3, 4]));
    // These would cause TypeScript compile errors:
    // processNumbersTypeScript([1, "2", 3]); // ❌ string not assignable to number
    // processNumbersTypeScript("not an array"); // ❌ string not assignable to number[]
    // ======================================
    // EXAMPLE 4: CONFIGURATION OBJECTS
    // ======================================
    console.log('\n\nExample 4: Configuration Objects');
    console.log('JavaScript version:');
    // JavaScript - typos and wrong types slip through
    function configureAppJavaScript(config) {
        console.log(`App: ${config.appName || 'Unknown'}`);
        console.log(`Port: ${config.port || 3000}`);
        console.log(`Debug: ${config.debug || false}`);
    }
    // Typos and wrong types are not caught:
    configureAppJavaScript({
        appNme: "MyApp", // Typo in property name
        port: "3000", // String instead of number
        debug: "true" // String instead of boolean
    });
    console.log('\nTypeScript version:');
    function configureAppTypeScript(config) {
        console.log(`App: ${config.appName}`);
        console.log(`Port: ${config.port}`);
        console.log(`Debug: ${config.debug}`);
    }
    // Correct usage:
    configureAppTypeScript({
        appName: "TypeScript App",
        port: 3000,
        debug: true
    });
    console.log('\n✅ JavaScript vs TypeScript Comparison Complete!');
    console.log('🛡️ TypeScript prevents bugs before they happen!');
    console.log('📈 Better developer experience with autocomplete and error checking');
}
// Run examples if this file is executed directly
if (require.main === module) {
    runComparisonExamples();
}
//# sourceMappingURL=comparison.js.map