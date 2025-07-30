# Error Types - Understanding JavaScript Errors 🔍

Welcome to **Error Types** - your complete guide to understanding and handling different kinds of JavaScript errors! Knowing what type of error you're dealing with helps you fix problems faster and build more robust applications.

## 🔍 The JavaScript Error Landscape

JavaScript has several built-in error types, each indicating a specific kind of problem. Understanding these helps you diagnose issues quickly and handle them appropriately.

### Error Hierarchy:

```
Error (Base class)
├── ReferenceError
├── TypeError
├── SyntaxError
├── RangeError
├── URIError
├── EvalError (deprecated)
└── AggregateError (ES2021)
```

## 📚 Built-in Error Types

### 1. ReferenceError - Variable Not Found

```javascript
// ReferenceError occurs when trying to use undefined variables
function demonstrateReferenceError() {
  console.log("Testing ReferenceError...");

  try {
    // Using undefined variable
    console.log(undefinedVariable);
  } catch (error) {
    console.log("❌ ReferenceError:", error.message);
    // "undefinedVariable is not defined"
  }

  try {
    // Accessing undefined object property in strict mode
    ("use strict");
    let obj = {};
    obj.someMethod();
  } catch (error) {
    console.log("❌ TypeError (not ReferenceError):", error.message);
    // This is actually TypeError: obj.someMethod is not a function
  }

  try {
    // Trying to assign to const after declaration
    const user = { name: "John" };
    user = { name: "Jane" }; // This will cause TypeError, not ReferenceError
  } catch (error) {
    console.log("❌ TypeError:", error.message);
  }
}

demonstrateReferenceError();

// Common ReferenceError scenarios
function commonReferenceErrors() {
  // 1. Typo in variable name
  let userName = "Alice";
  try {
    console.log(useName); // Typo: useName instead of userName
  } catch (error) {
    console.log("Typo error:", error.message);
  }

  // 2. Using variable before declaration (temporal dead zone)
  try {
    console.log(futureVariable);
    let futureVariable = "I am declared later";
  } catch (error) {
    console.log("Temporal dead zone error:", error.message);
  }

  // 3. Accessing deleted property (in strict mode)
  try {
    ("use strict");
    let obj = { prop: "value" };
    delete obj.prop;
    console.log(prop); // ReferenceError: prop is not defined
  } catch (error) {
    console.log("Deleted property error:", error.message);
  }
}

commonReferenceErrors();
```

### 2. TypeError - Wrong Type Operations

```javascript
function demonstrateTypeError() {
  console.log("\nTesting TypeError...");

  // 1. Calling non-function as function
  try {
    let notAFunction = "I am a string";
    notAFunction();
  } catch (error) {
    console.log("❌ Not a function:", error.message);
  }

  // 2. Accessing property of null/undefined
  try {
    let nullValue = null;
    console.log(nullValue.property);
  } catch (error) {
    console.log("❌ Null property access:", error.message);
  }

  // 3. Wrong type for method
  try {
    let number = 42;
    number.toUpperCase(); // Numbers don't have toUpperCase
  } catch (error) {
    console.log("❌ Wrong method for type:", error.message);
  }

  // 4. Cannot convert values
  try {
    let symbol = Symbol("test");
    String(symbol); // This actually works
    // But this doesn't:
    symbol + "string";
  } catch (error) {
    console.log("❌ Symbol conversion:", error.message);
  }

  // 5. Assignment to readonly property
  try {
    ("use strict");
    let obj = {};
    Object.defineProperty(obj, "readonly", {
      value: "cannot change",
      writable: false,
    });
    obj.readonly = "trying to change";
  } catch (error) {
    console.log("❌ Readonly assignment:", error.message);
  }
}

demonstrateTypeError();

// Real-world TypeError handling
class SafeDataProcessor {
  static processUserData(data) {
    try {
      // Check if data exists and is object
      if (typeof data !== "object" || data === null) {
        throw new TypeError("Data must be a non-null object");
      }

      // Safe property access
      const name = this.safeStringAccess(data.name, "name");
      const age = this.safeNumberAccess(data.age, "age");
      const email = this.safeStringAccess(data.email, "email");

      // Safe method calls
      const normalizedEmail = this.safeStringMethod(email, "toLowerCase");

      return {
        name: name.trim(),
        age: age,
        email: normalizedEmail,
        isValid: true,
      };
    } catch (error) {
      if (error instanceof TypeError) {
        console.log("❌ Type error in data processing:", error.message);
        return { isValid: false, error: error.message };
      }
      throw error; // Re-throw non-TypeError
    }
  }

  static safeStringAccess(value, fieldName) {
    if (typeof value !== "string") {
      throw new TypeError(`${fieldName} must be a string, got ${typeof value}`);
    }
    return value;
  }

  static safeNumberAccess(value, fieldName) {
    if (typeof value !== "number" || isNaN(value)) {
      throw new TypeError(
        `${fieldName} must be a valid number, got ${typeof value}`
      );
    }
    return value;
  }

  static safeStringMethod(str, methodName) {
    if (typeof str[methodName] !== "function") {
      throw new TypeError(`${methodName} is not a function on string`);
    }
    return str[methodName]();
  }
}

// Test safe data processing
const testData = [
  { name: "Alice", age: 25, email: "ALICE@EXAMPLE.COM" },
  { name: 123, age: 25, email: "invalid@example.com" }, // Invalid name type
  { name: "Bob", age: "twenty-five", email: "bob@example.com" }, // Invalid age type
  null, // Invalid data
  "not an object", // Invalid data type
];

testData.forEach((data, index) => {
  console.log(`\n--- Processing data ${index + 1} ---`);
  const result = SafeDataProcessor.processUserData(data);
  console.log("Result:", result);
});
```

### 3. SyntaxError - Invalid JavaScript Code

```javascript
function demonstrateSyntaxError() {
  console.log("\nTesting SyntaxError...");

  // SyntaxError occurs during parsing, before execution
  // These examples use eval() to demonstrate

  const invalidSyntaxExamples = [
    "function invalid syntax {", // Missing parentheses
    'let 123variable = "value";', // Variable name starts with number
    'if (true { console.log("missing closing parenthesis"); }', // Missing )
    "let obj = { key: value, };", // This is actually valid in modern JS
    "return;", // Return outside function
    'let = "value";', // Missing variable name
    "function() { }", // Missing function name in declaration
    "let x = [1, 2, 3", // Missing closing bracket
    'console.log("unclosed string', // Unclosed string
    'let obj = { "key": };', // Missing value
  ];

  invalidSyntaxExamples.forEach((code, index) => {
    try {
      eval(code);
      console.log(`✅ Code ${index + 1} executed successfully`);
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.log(`❌ SyntaxError ${index + 1}: ${error.message}`);
      } else {
        console.log(
          `❌ Other error ${index + 1}: ${error.name}: ${error.message}`
        );
      }
    }
  });
}

demonstrateSyntaxError();

// JSON parsing SyntaxError (common in real applications)
class JSONProcessor {
  static safeParse(jsonString, fallback = null) {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      if (error instanceof SyntaxError) {
        console.log("❌ Invalid JSON syntax:", error.message);
        console.log("📝 Problematic JSON:", jsonString);
        return fallback;
      }
      throw error; // Re-throw non-SyntaxError
    }
  }

  static parseWithValidation(jsonString, schema = {}) {
    try {
      const parsed = JSON.parse(jsonString);

      // Validate against schema
      for (let [key, expectedType] of Object.entries(schema)) {
        if (!(key in parsed)) {
          throw new Error(`Missing required property: ${key}`);
        }

        if (typeof parsed[key] !== expectedType) {
          throw new TypeError(
            `Property ${key} should be ${expectedType}, got ${typeof parsed[
              key
            ]}`
          );
        }
      }

      return { success: true, data: parsed };
    } catch (error) {
      if (error instanceof SyntaxError) {
        return {
          success: false,
          error: "Invalid JSON format",
          details: error.message,
        };
      } else {
        return {
          success: false,
          error: "Validation failed",
          details: error.message,
        };
      }
    }
  }
}

// Test JSON processing
const jsonExamples = [
  '{"name": "Alice", "age": 25}', // Valid JSON
  '{"name": "Bob", "age": }', // Invalid JSON - missing value
  '{name: "Charlie", age: 30}', // Invalid JSON - unquoted keys
  '{"name": "David", "age": "thirty"}', // Valid JSON, but wrong type for age
  "not json at all", // Completely invalid
  '{"name": "Eve", "age": 28, "email": "eve@example.com"}', // Valid and complete
];

const schema = { name: "string", age: "number" };

jsonExamples.forEach((json, index) => {
  console.log(`\n--- JSON Example ${index + 1} ---`);
  console.log("Input:", json);

  const simpleResult = JSONProcessor.safeParse(json, {});
  console.log("Simple parse:", simpleResult);

  const validatedResult = JSONProcessor.parseWithValidation(json, schema);
  console.log("Validated parse:", validatedResult);
});
```

### 4. RangeError - Value Out of Range

```javascript
function demonstrateRangeError() {
  console.log("\nTesting RangeError...");

  // 1. Array constructor with negative length
  try {
    new Array(-1);
  } catch (error) {
    console.log("❌ Negative array length:", error.message);
  }

  // 2. Number.prototype.toFixed with invalid precision
  try {
    let num = 123.456;
    num.toFixed(101); // Maximum is 100
  } catch (error) {
    console.log("❌ toFixed precision too high:", error.message);
  }

  try {
    let num = 123.456;
    num.toFixed(-1); // Cannot be negative
  } catch (error) {
    console.log("❌ toFixed negative precision:", error.message);
  }

  // 3. Number.prototype.toPrecision with invalid precision
  try {
    let num = 123.456;
    num.toPrecision(0); // Must be between 1 and 100
  } catch (error) {
    console.log("❌ toPrecision invalid:", error.message);
  }

  // 4. String.prototype.repeat with negative count
  try {
    "hello".repeat(-1);
  } catch (error) {
    console.log("❌ String repeat negative:", error.message);
  }

  // 5. Date with invalid values
  try {
    new Date(2023, 13, 32); // Month 13 doesn't exist, day 32 doesn't exist
    // Note: This actually doesn't throw RangeError, it adjusts the date
    console.log("✅ Date constructor is forgiving");
  } catch (error) {
    console.log("❌ Invalid date:", error.message);
  }

  // 6. Number outside safe integer range
  try {
    // This doesn't throw error but loses precision
    let largeNumber = Number.MAX_SAFE_INTEGER + 1;
    console.log("Large number:", largeNumber);
    console.log("Is safe integer:", Number.isSafeInteger(largeNumber));
  } catch (error) {
    console.log("❌ Large number error:", error.message);
  }
}

demonstrateRangeError();

// Practical RangeError handling
class SafeNumberFormatter {
  static formatNumber(number, options = {}) {
    const { decimals = 2, precision = null, repeat = 1 } = options;

    try {
      // Validate inputs
      if (!Number.isFinite(number)) {
        throw new TypeError("Input must be a finite number");
      }

      if (decimals < 0 || decimals > 100) {
        throw new RangeError("Decimals must be between 0 and 100");
      }

      if (precision !== null && (precision < 1 || precision > 100)) {
        throw new RangeError("Precision must be between 1 and 100");
      }

      if (repeat < 0 || repeat > 1000) {
        throw new RangeError("Repeat must be between 0 and 1000");
      }

      // Format the number
      let formatted;
      if (precision !== null) {
        formatted = number.toPrecision(precision);
      } else {
        formatted = number.toFixed(decimals);
      }

      // Repeat if requested
      if (repeat > 1) {
        formatted = formatted.repeat(repeat);
      }

      return { success: true, value: formatted };
    } catch (error) {
      if (error instanceof RangeError) {
        return {
          success: false,
          error: "Range error",
          message: error.message,
        };
      } else if (error instanceof TypeError) {
        return {
          success: false,
          error: "Type error",
          message: error.message,
        };
      }

      throw error; // Re-throw unexpected errors
    }
  }

  static createSafeArray(length, fillValue = undefined) {
    try {
      if (length < 0) {
        throw new RangeError("Array length cannot be negative");
      }

      if (length > 1000000) {
        throw new RangeError("Array length too large (max 1,000,000)");
      }

      if (!Number.isInteger(length)) {
        throw new TypeError("Array length must be an integer");
      }

      return {
        success: true,
        array: new Array(length).fill(fillValue),
      };
    } catch (error) {
      return {
        success: false,
        error: error.name,
        message: error.message,
      };
    }
  }
}

// Test safe number formatting
const numberTests = [
  { number: 123.456, options: { decimals: 2 } },
  { number: 123.456, options: { decimals: -1 } }, // Invalid
  { number: 123.456, options: { decimals: 101 } }, // Invalid
  { number: 123.456, options: { precision: 3 } },
  { number: 123.456, options: { precision: 0 } }, // Invalid
  { number: "not a number", options: { decimals: 2 } }, // Invalid type
  { number: 42, options: { repeat: 3 } },
  { number: 42, options: { repeat: -1 } }, // Invalid
];

numberTests.forEach((test, index) => {
  console.log(`\n--- Number Test ${index + 1} ---`);
  const result = SafeNumberFormatter.formatNumber(test.number, test.options);
  console.log("Input:", test.number, test.options);
  console.log("Result:", result);
});

// Test safe array creation
const arrayTests = [5, -1, 1.5, 1000001, "not a number"];

arrayTests.forEach((length, index) => {
  console.log(`\n--- Array Test ${index + 1} ---`);
  const result = SafeNumberFormatter.createSafeArray(length, "default");
  console.log("Length:", length);
  console.log(
    "Result:",
    result.success
      ? `Array created with ${result.array.length} elements`
      : result
  );
});
```

### 5. URIError - Invalid URI Operations

```javascript
function demonstrateURIError() {
  console.log("\nTesting URIError...");

  // URIError occurs with malformed URI sequences
  const malformedURIs = [
    "%", // Incomplete percent encoding
    "%1", // Incomplete percent encoding
    "%GG", // Invalid hex digits
    "%E0%A4%", // Incomplete UTF-8 sequence
    "%%", // Double percent sign
    "%Z0", // Invalid hex character
  ];

  malformedURIs.forEach((uri, index) => {
    try {
      const decoded = decodeURIComponent(uri);
      console.log(`✅ URI ${index + 1} decoded: "${decoded}"`);
    } catch (error) {
      if (error instanceof URIError) {
        console.log(`❌ URIError ${index + 1}: ${error.message} for "${uri}"`);
      } else {
        console.log(`❌ Other error ${index + 1}: ${error.name}`);
      }
    }
  });
}

demonstrateURIError();

// Practical URI handling
class SafeURIProcessor {
  static encodeURL(url) {
    try {
      return {
        success: true,
        encoded: encodeURIComponent(url),
      };
    } catch (error) {
      return {
        success: false,
        error: error.name,
        message: error.message,
      };
    }
  }

  static decodeURL(encodedURL) {
    try {
      return {
        success: true,
        decoded: decodeURIComponent(encodedURL),
      };
    } catch (error) {
      if (error instanceof URIError) {
        return {
          success: false,
          error: "URI_ERROR",
          message: "Invalid URL encoding format",
        };
      }

      return {
        success: false,
        error: error.name,
        message: error.message,
      };
    }
  }

  static parseQueryString(queryString) {
    try {
      const params = new URLSearchParams(queryString);
      const result = {};

      for (let [key, value] of params) {
        // Safely decode each parameter
        const decodedKey = this.decodeURL(key);
        const decodedValue = this.decodeURL(value);

        if (decodedKey.success && decodedValue.success) {
          result[decodedKey.decoded] = decodedValue.decoded;
        } else {
          console.log(`⚠️ Skipping malformed parameter: ${key}=${value}`);
        }
      }

      return { success: true, params: result };
    } catch (error) {
      return {
        success: false,
        error: error.name,
        message: error.message,
      };
    }
  }

  static buildSafeURL(baseURL, params = {}) {
    try {
      const url = new URL(baseURL);

      for (let [key, value] of Object.entries(params)) {
        const encodedKey = this.encodeURL(String(key));
        const encodedValue = this.encodeURL(String(value));

        if (encodedKey.success && encodedValue.success) {
          url.searchParams.set(encodedKey.encoded, encodedValue.encoded);
        } else {
          console.log(
            `⚠️ Skipping parameter with encoding issues: ${key}=${value}`
          );
        }
      }

      return { success: true, url: url.toString() };
    } catch (error) {
      return {
        success: false,
        error: error.name,
        message: error.message,
      };
    }
  }
}

// Test URI processing
const uriTests = [
  "hello world",
  "user@example.com",
  "special chars: !@#$%^&*()",
  "中文字符",
  "🚀 emoji test",
  "%E0%A4%A6%E0%A5%87%E0%A4%B5%E0%A4%A8%E0%A4%BE%E0%A4%97%E0%A4%B0%E0%A5%80", // Valid UTF-8
  "%", // Invalid
  "%GG", // Invalid
];

uriTests.forEach((test, index) => {
  console.log(`\n--- URI Test ${index + 1}: "${test}" ---`);

  const encoded = SafeURIProcessor.encodeURL(test);
  console.log("Encode result:", encoded);

  if (encoded.success) {
    const decoded = SafeURIProcessor.decodeURL(encoded.encoded);
    console.log("Decode result:", decoded);
  }
});

// Test query string parsing
const queryStrings = [
  "name=John&age=25&city=New%20York",
  "search=hello%20world&filter=active",
  "param=%&invalid=%GG",
  "special=!@#$%25&unicode=%E2%9C%93",
];

queryStrings.forEach((query, index) => {
  console.log(`\n--- Query Test ${index + 1}: "${query}" ---`);
  const result = SafeURIProcessor.parseQueryString(query);
  console.log("Parse result:", result);
});
```

## 🎯 Error Detection Patterns

### Error Type Detection:

```javascript
class ErrorAnalyzer {
  static analyzeError(error) {
    const analysis = {
      name: error.name,
      message: error.message,
      type: this.categorizeError(error),
      severity: this.assessSeverity(error),
      suggestions: this.getSuggestions(error),
      recoverable: this.isRecoverable(error),
    };

    return analysis;
  }

  static categorizeError(error) {
    if (error instanceof ReferenceError) {
      return "REFERENCE_ERROR";
    } else if (error instanceof TypeError) {
      return "TYPE_ERROR";
    } else if (error instanceof SyntaxError) {
      return "SYNTAX_ERROR";
    } else if (error instanceof RangeError) {
      return "RANGE_ERROR";
    } else if (error instanceof URIError) {
      return "URI_ERROR";
    } else if (error instanceof Error) {
      return "GENERIC_ERROR";
    } else {
      return "UNKNOWN_ERROR";
    }
  }

  static assessSeverity(error) {
    if (error instanceof SyntaxError) {
      return "CRITICAL"; // Prevents code execution
    } else if (error instanceof ReferenceError) {
      return "HIGH"; // Usually indicates coding error
    } else if (error instanceof TypeError) {
      return "MEDIUM"; // Often recoverable with validation
    } else if (error instanceof RangeError || error instanceof URIError) {
      return "LOW"; // Usually input validation issues
    } else {
      return "MEDIUM";
    }
  }

  static getSuggestions(error) {
    const suggestions = [];

    if (error instanceof ReferenceError) {
      suggestions.push("Check variable names for typos");
      suggestions.push("Ensure variables are declared before use");
      suggestions.push("Check for scope issues");
    } else if (error instanceof TypeError) {
      suggestions.push("Validate data types before operations");
      suggestions.push("Check for null/undefined values");
      suggestions.push("Ensure methods exist on objects");
    } else if (error instanceof SyntaxError) {
      suggestions.push("Check for missing brackets/parentheses");
      suggestions.push("Validate JSON format");
      suggestions.push("Review code syntax");
    } else if (error instanceof RangeError) {
      suggestions.push("Validate numeric ranges");
      suggestions.push("Check array lengths");
      suggestions.push("Verify method parameters");
    } else if (error instanceof URIError) {
      suggestions.push("Validate URL encoding");
      suggestions.push("Check percent-encoded sequences");
      suggestions.push("Use proper encoding functions");
    }

    return suggestions;
  }

  static isRecoverable(error) {
    // SyntaxError is typically not recoverable at runtime
    if (error instanceof SyntaxError) {
      return false;
    }

    // Most other errors can be handled gracefully
    return true;
  }

  static generateErrorReport(errors) {
    const report = {
      totalErrors: errors.length,
      errorsByType: {},
      errorsBySeverity: {},
      recoverableCount: 0,
      criticalCount: 0,
    };

    errors.forEach((error) => {
      const analysis = this.analyzeError(error);

      // Count by type
      report.errorsByType[analysis.type] =
        (report.errorsByType[analysis.type] || 0) + 1;

      // Count by severity
      report.errorsBySeverity[analysis.severity] =
        (report.errorsBySeverity[analysis.severity] || 0) + 1;

      // Count recoverable vs critical
      if (analysis.recoverable) {
        report.recoverableCount++;
      } else {
        report.criticalCount++;
      }
    });

    return report;
  }
}

// Test error analysis
function generateTestErrors() {
  const errors = [];

  // Generate different types of errors
  try {
    console.log(undefinedVariable);
  } catch (error) {
    errors.push(error);
  }

  try {
    let num = 42;
    num.toUpperCase();
  } catch (error) {
    errors.push(error);
  }

  try {
    JSON.parse("invalid json");
  } catch (error) {
    errors.push(error);
  }

  try {
    new Array(-1);
  } catch (error) {
    errors.push(error);
  }

  try {
    decodeURIComponent("%");
  } catch (error) {
    errors.push(error);
  }

  return errors;
}

// Analyze collected errors
const testErrors = generateTestErrors();

console.log("\n=== ERROR ANALYSIS ===");
testErrors.forEach((error, index) => {
  console.log(`\n--- Error ${index + 1} ---`);
  const analysis = ErrorAnalyzer.analyzeError(error);
  console.log("Analysis:", analysis);
});

const report = ErrorAnalyzer.generateErrorReport(testErrors);
console.log("\n--- ERROR REPORT ---");
console.log(report);
```

## 🎯 Key Concepts to Remember

1. **ReferenceError** - Variable/property doesn't exist
2. **TypeError** - Wrong type for operation
3. **SyntaxError** - Invalid JavaScript syntax
4. **RangeError** - Value outside valid range
5. **URIError** - Invalid URI encoding
6. **Error detection** helps choose appropriate handling
7. **Custom error analysis** improves debugging

## 🚀 What's Next?

Perfect! You now understand all the major JavaScript error types and can identify them quickly. This knowledge will make you a much better debugger and help you write more robust error handling code.

Next, we'll learn about **Debugging Techniques** - the tools and strategies for finding and fixing bugs efficiently. You'll learn to use browser dev tools, add effective logging, and debug complex issues like a pro!

---

🔍 **You're now an error detective!** Understanding error types is crucial for effective debugging. This knowledge will save you countless hours when things go wrong in your applications!
