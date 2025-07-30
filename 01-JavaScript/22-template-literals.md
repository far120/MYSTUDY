# 22. Template Literals - Better String Handling 📝

## 🎯 Learning Objectives

By the end of this lesson, you'll master:

- What template literals are and why they're superior to string concatenation
- How to use template literal syntax with backticks
- Embedding expressions and variables in strings
- Multi-line strings without escape characters
- Tagged template literals for advanced use cases
- Real-world applications and best practices

## 🤔 What Are Template Literals?

Template literals are a modern way to work with strings in JavaScript. They use backticks (`) instead of quotes and allow you to embed expressions directly in strings using `${expression}` syntax.

**Think of it as**: Smart strings that can contain variables, expressions, and span multiple lines naturally.

```javascript
// Old way (string concatenation)
let name = "Alice";
let age = 25;
let oldWay = "Hello, my name is " + name + " and I am " + age + " years old.";

// New way (template literals)
let newWay = `Hello, my name is ${name} and I am ${age} years old.`;

console.log("=== TEMPLATE LITERALS INTRODUCTION ===");
console.log("Old way:", oldWay);
console.log("New way:", newWay);
console.log("Both are equal:", oldWay === newWay);
```

## 🏗️ Basic Template Literal Syntax

### 1. Variable Interpolation

```javascript
console.log("=== VARIABLE INTERPOLATION ===");

let firstName = "John";
let lastName = "Doe";
let age = 30;
let city = "New York";

// Embedding variables
let introduction = `Hi! I'm ${firstName} ${lastName}, ${age} years old, living in ${city}.`;
console.log("Introduction:", introduction);

// Embedding expressions
let price = 19.99;
let quantity = 3;
let total = `Total cost: $${(price * quantity).toFixed(2)}`;
console.log("Shopping:", total);

// Mathematical expressions
let a = 10;
let b = 5;
let calculation = `${a} + ${b} = ${a + b}, ${a} * ${b} = ${a * b}`;
console.log("Math:", calculation);

// Function calls in templates
let getCurrentTime = () => new Date().toLocaleTimeString();
let timestamp = `Current time: ${getCurrentTime()}`;
console.log("Timestamp:", timestamp);

// Conditional expressions
let score = 85;
let grade = `Your grade: ${
  score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F"
}`;
console.log("Grade:", grade);
```

### 2. Multi-line Strings

```javascript
console.log("=== MULTI-LINE STRINGS ===");

// Old way (with escape characters)
let oldMultiLine = "This is line 1\n" + "This is line 2\n" + "This is line 3";

// New way (natural multi-line)
let newMultiLine = `This is line 1
This is line 2
This is line 3`;

console.log("Old multi-line:");
console.log(oldMultiLine);
console.log("\nNew multi-line:");
console.log(newMultiLine);

// HTML templates
let userName = "Alice";
let userEmail = "alice@example.com";

let htmlTemplate = `
<div class="user-card">
    <h2>Welcome, ${userName}!</h2>
    <p>Email: ${userEmail}</p>
    <p>Member since: ${new Date().getFullYear()}</p>
    <button onclick="logout()">Logout</button>
</div>
`;

console.log("HTML Template:");
console.log(htmlTemplate);

// Code generation
let functionName = "calculateArea";
let params = ["width", "height"];
let codeTemplate = `
function ${functionName}(${params.join(", ")}) {
    return ${params.join(" * ")};
}
`;

console.log("Generated code:");
console.log(codeTemplate);
```

## 🎯 Working with Objects and Arrays

```javascript
let products = [
  { id: 1, name: "Laptop", price: 999.99, inStock: true },
  { id: 2, name: "Phone", price: 599.99, inStock: false },
  { id: 3, name: "Tablet", price: 399.99, inStock: true },
];

console.log("=== OBJECTS AND ARRAYS IN TEMPLATES ===");

// Single product display
let product = products[0];
let productCard = `
Product: ${product.name}
Price: $${product.price}
Status: ${product.inStock ? "✅ In Stock" : "❌ Out of Stock"}
Product ID: #${String(product.id).padStart(4, "0")}
`;

console.log("Product Card:");
console.log(productCard);

// Product list generation
let productList = products
  .map(
    (p) =>
      `• ${p.name} - $${p.price} ${p.inStock ? "(Available)" : "(Sold Out)"}`
  )
  .join("\n");

console.log("Product List:");
console.log(productList);

// Table generation
let tableHeader = `| ${"Name".padEnd(10)} | ${"Price".padEnd(
  8
)} | ${"Status".padEnd(10)} |`;
let tableSeparator = `|${"-".repeat(12)}|${"-".repeat(10)}|${"-".repeat(12)}|`;

let tableRows = products
  .map(
    (p) =>
      `| ${p.name.padEnd(10)} | ${
        "$" + p.price.toString().padEnd(7)
      } | ${(p.inStock ? "In Stock" : "Sold Out").padEnd(10)} |`
  )
  .join("\n");

let table = `${tableHeader}
${tableSeparator}
${tableRows}`;

console.log("Product Table:");
console.log(table);
```

## 🎨 Advanced Template Literal Techniques

### 1. Nested Templates and Complex Expressions

```javascript
console.log("=== ADVANCED TECHNIQUES ===");

let users = [
  { name: "Alice", role: "admin", tasks: ["review", "approve", "manage"] },
  { name: "Bob", role: "user", tasks: ["create", "edit"] },
  { name: "Charlie", role: "moderator", tasks: ["moderate", "review"] },
];

// Nested template literals
let userReport = users
  .map(
    (user) => `
📋 User: ${user.name}
🔑 Role: ${user.role.toUpperCase()}
📝 Tasks: ${user.tasks.map((task) => `"${task}"`).join(", ")}
⭐ Permissions: ${
      user.role === "admin"
        ? "Full Access"
        : user.role === "moderator"
        ? "Limited Access"
        : "Basic Access"
    }
${"─".repeat(40)}
`
  )
  .join("");

console.log("User Report:");
console.log(userReport);

// Complex calculations in templates
let orders = [
  { id: 1, items: 3, price: 45.99, tax: 0.08 },
  { id: 2, items: 1, price: 23.5, tax: 0.08 },
  { id: 3, items: 5, price: 67.25, tax: 0.08 },
];

let orderSummary = `
📊 ORDER SUMMARY
${orders
  .map((order) => {
    let subtotal = order.price;
    let taxAmount = subtotal * order.tax;
    let total = subtotal + taxAmount;

    return `Order #${order.id}: ${order.items} items
    Subtotal: $${subtotal.toFixed(2)}
    Tax: $${taxAmount.toFixed(2)}
    Total: $${total.toFixed(2)}`;
  })
  .join("\n    \n")}

📈 GRAND TOTAL: $${orders
  .reduce((sum, order) => sum + order.price + order.price * order.tax, 0)
  .toFixed(2)}
`;

console.log(orderSummary);
```

### 2. Dynamic Content Generation

```javascript
console.log("=== DYNAMIC CONTENT GENERATION ===");

function generateReport(data, reportType) {
  const timestamp = new Date().toLocaleString();

  switch (reportType) {
    case "sales":
      return `
🛍️ SALES REPORT
Generated: ${timestamp}

${data
  .map(
    (item) => `
Product: ${item.product}
Quantity Sold: ${item.quantity}
Revenue: $${(item.price * item.quantity).toFixed(2)}
Profit Margin: ${((item.profit / (item.price * item.quantity)) * 100).toFixed(
      1
    )}%
`
  )
  .join("")}

💰 Total Revenue: $${data
        .reduce((sum, item) => sum + item.price * item.quantity, 0)
        .toFixed(2)}
📈 Total Profit: $${data.reduce((sum, item) => sum + item.profit, 0).toFixed(2)}
            `;

    case "inventory":
      return `
📦 INVENTORY REPORT
Generated: ${timestamp}

${data
  .map(
    (item) => `
${item.name}: ${item.stock} units
Status: ${
      item.stock < 10
        ? "🔴 Low Stock"
        : item.stock < 50
        ? "🟡 Medium Stock"
        : "🟢 Good Stock"
    }
Reorder Point: ${item.reorderPoint} units
${item.stock <= item.reorderPoint ? "⚠️ REORDER NEEDED" : "✅ Stock OK"}
`
  )
  .join("")}

📊 Total Items: ${data.length}
🔴 Low Stock Items: ${data.filter((item) => item.stock < 10).length}
            `;

    default:
      return `❌ Unknown report type: ${reportType}`;
  }
}

// Test report generation
let salesData = [
  { product: "Laptop", quantity: 5, price: 999, profit: 500 },
  { product: "Mouse", quantity: 20, price: 25, profit: 200 },
  { product: "Keyboard", quantity: 10, price: 75, profit: 300 },
];

let inventoryData = [
  { name: "Laptop", stock: 15, reorderPoint: 10 },
  { name: "Mouse", stock: 5, reorderPoint: 20 },
  { name: "Keyboard", stock: 50, reorderPoint: 15 },
];

console.log(generateReport(salesData, "sales"));
console.log(generateReport(inventoryData, "inventory"));
```

## 🏷️ Tagged Template Literals

Tagged template literals allow you to process template literals with a function:

```javascript
console.log("=== TAGGED TEMPLATE LITERALS ===");

// Simple tag function
function highlight(strings, ...values) {
  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += `**${values[i]}**`;
    }
  }
  return result;
}

let name = "JavaScript";
let year = 1995;
let highlightedText = highlight`The language ${name} was created in ${year}`;
console.log("Highlighted text:", highlightedText);

// HTML escaping tag
function html(strings, ...values) {
  const escapeHtml = (str) => {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;");
  };

  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += escapeHtml(values[i]);
    }
  }
  return result;
}

let userInput = '<script>alert("XSS")</script>';
let safeHtml = html`<div>User said: ${userInput}</div>`;
console.log("Safe HTML:", safeHtml);

// Currency formatting tag
function currency(strings, ...values) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += formatCurrency(values[i]);
    }
  }
  return result;
}

let price = 1234.56;
let tax = 98.77;
let receipt = currency`Price: ${price}, Tax: ${tax}, Total: ${price + tax}`;
console.log("Receipt:", receipt);
```

## 🎯 Real-World Examples

### Example 1: Email Template Generator

```javascript
function createEmailTemplateGenerator() {
  console.log("=== EMAIL TEMPLATE GENERATOR ===");

  const templates = {
    welcome: (user) => `
Subject: Welcome to ${user.company}, ${user.firstName}! 🎉

Dear ${user.firstName} ${user.lastName},

Welcome to ${user.company}! We're thrilled to have you join our team.

Here are your account details:
📧 Email: ${user.email}
👤 Employee ID: ${user.employeeId}
🏢 Department: ${user.department}
📅 Start Date: ${user.startDate}

Your first day schedule:
${
  user.schedule
    ? user.schedule.map((item) => `• ${item.time}: ${item.activity}`).join("\n")
    : "• No schedule items yet"
}

Important links:
🌐 Company Portal: ${user.company.toLowerCase().replace(/\s+/g, "")}.com/portal
📚 Employee Handbook: ${user.company
      .toLowerCase()
      .replace(/\s+/g, "")}.com/handbook
💬 Slack Workspace: ${user.company.toLowerCase().replace(/\s+/g, "")}.slack.com

If you have any questions, don't hesitate to reach out to your manager:
👨‍💼 ${user.manager.name} (${user.manager.email})

Welcome aboard!

Best regards,
The ${user.company} Team
        `,

    reminder: (task) => `
Subject: Reminder: ${task.title} - Due ${task.dueDate} ⏰

Hi ${task.assignedTo},

This is a friendly reminder about your upcoming task:

📋 Task: ${task.title}
📝 Description: ${task.description || "No description provided"}
📅 Due Date: ${task.dueDate}
⚡ Priority: ${task.priority.toUpperCase()}
🏷️ Category: ${task.category}

${
  task.priority === "high"
    ? "🚨 This is a HIGH PRIORITY task!"
    : task.priority === "medium"
    ? "⚠️ This task has medium priority."
    : "📌 This is a low priority task."
}

${
  task.subtasks && task.subtasks.length > 0
    ? `
Subtasks:
${task.subtasks
  .map((subtask) => `${subtask.completed ? "✅" : "⬜"} ${subtask.title}`)
  .join("\n")}
`
    : ""
}

Progress: ${
      task.completed
        ? "✅ COMPLETED"
        : task.progress
        ? `🔄 ${task.progress}% complete`
        : "📋 Not started"
    }

${
  new Date(task.dueDate) - new Date() < 24 * 60 * 60 * 1000
    ? "🚨 URGENT: This task is due within 24 hours!"
    : ""
}

Click here to view the task: ${task.url || "#"}

Best regards,
Task Management System
        `,

    invoice: (invoice) => `
Subject: Invoice #${invoice.number} from ${invoice.company} 📄

Dear ${invoice.client.name},

Thank you for your business! Please find your invoice details below:

═══════════════════════════════════════
          INVOICE #${invoice.number}
═══════════════════════════════════════

Bill To:
${invoice.client.name}
${invoice.client.address}
${invoice.client.city}, ${invoice.client.state} ${invoice.client.zip}

Invoice Date: ${invoice.date}
Due Date: ${invoice.dueDate}
Payment Terms: ${invoice.terms}

${"-".repeat(50)}
DESCRIPTION                    QTY    RATE      TOTAL
${"-".repeat(50)}
${invoice.items
  .map((item) => {
    const description = item.description.padEnd(25);
    const qty = String(item.quantity).padStart(5);
    const rate = ("$" + item.rate.toFixed(2)).padStart(8);
    const total = ("$" + (item.quantity * item.rate).toFixed(2)).padStart(10);
    return `${description}   ${qty}  ${rate}  ${total}`;
  })
  .join("\n")}
${"-".repeat(50)}

Subtotal: $${invoice.items
      .reduce((sum, item) => sum + item.quantity * item.rate, 0)
      .toFixed(2)}
${
  invoice.discount
    ? `Discount (${invoice.discount}%): -$${(
        (invoice.items.reduce(
          (sum, item) => sum + item.quantity * item.rate,
          0
        ) *
          invoice.discount) /
        100
      ).toFixed(2)}`
    : ""
}
Tax (${invoice.taxRate * 100}%): $${(
      invoice.items.reduce((sum, item) => sum + item.quantity * item.rate, 0) *
      (1 - (invoice.discount || 0) / 100) *
      invoice.taxRate
    ).toFixed(2)}

TOTAL DUE: $${(
      invoice.items.reduce((sum, item) => sum + item.quantity * item.rate, 0) *
      (1 - (invoice.discount || 0) / 100) *
      (1 + invoice.taxRate)
    ).toFixed(2)}

Payment Methods:
💳 Credit Card: ${invoice.company.toLowerCase().replace(/\s+/g, "")}.com/pay
🏦 Bank Transfer: Account #${invoice.bankAccount}
💰 Check: Made payable to "${invoice.company}"

Questions? Contact us:
📞 ${invoice.phone}
📧 ${invoice.email}

Thank you for your business!
${invoice.company}
        `,
  };

  return {
    generateWelcome: (userData) => templates.welcome(userData),
    generateReminder: (taskData) => templates.reminder(taskData),
    generateInvoice: (invoiceData) => templates.invoice(invoiceData),

    previewTemplate: (templateName, data) => {
      console.log(`Preview of ${templateName} template:`);
      console.log("=".repeat(60));

      switch (templateName) {
        case "welcome":
          console.log(templates.welcome(data));
          break;
        case "reminder":
          console.log(templates.reminder(data));
          break;
        case "invoice":
          console.log(templates.invoice(data));
          break;
        default:
          console.log(`❌ Template "${templateName}" not found`);
      }

      console.log("=".repeat(60));
    },
  };
}

// Test email template generator
let emailGenerator = createEmailTemplateGenerator();

// Sample data
let newEmployee = {
  firstName: "Alice",
  lastName: "Johnson",
  email: "alice.johnson@techcorp.com",
  employeeId: "EMP001",
  company: "TechCorp Solutions",
  department: "Software Engineering",
  startDate: "March 1, 2024",
  manager: {
    name: "Sarah Wilson",
    email: "sarah.wilson@techcorp.com",
  },
  schedule: [
    { time: "9:00 AM", activity: "Welcome orientation" },
    { time: "10:30 AM", activity: "HR paperwork and benefits" },
    { time: "12:00 PM", activity: "Lunch with team" },
    { time: "2:00 PM", activity: "Development environment setup" },
    { time: "4:00 PM", activity: "Meet with direct manager" },
  ],
};

let urgentTask = {
  title: "Complete Q1 Financial Report",
  description: "Compile and analyze Q1 financial data for board presentation",
  assignedTo: "John Smith",
  dueDate: "March 15, 2024",
  priority: "high",
  category: "Finance",
  progress: 75,
  completed: false,
  url: "https://tasks.company.com/task/12345",
  subtasks: [
    { title: "Gather revenue data", completed: true },
    { title: "Calculate expense ratios", completed: true },
    { title: "Create charts and graphs", completed: false },
    { title: "Write executive summary", completed: false },
  ],
};

// Preview templates
emailGenerator.previewTemplate("welcome", newEmployee);
emailGenerator.previewTemplate("reminder", urgentTask);
```

### Example 2: Code Generator

```javascript
function createCodeGenerator() {
  console.log("=== CODE GENERATOR ===");

  const generators = {
    reactComponent: (componentData) => `
import React${componentData.useState ? ", { useState }" : ""} from 'react';
${
  componentData.imports
    ? componentData.imports.map((imp) => `import ${imp};`).join("\n")
    : ""
}

${
  componentData.interfaces
    ? componentData.interfaces
        .map(
          (interface) => `
interface ${interface.name} {
${interface.properties
  .map((prop) => `  ${prop.name}${prop.optional ? "?" : ""}: ${prop.type};`)
  .join("\n")}
}
`
        )
        .join("")
    : ""
}

const ${componentData.name} = (${
      componentData.props ? `{ ${componentData.props.join(", ")} }` : ""
    }) => {
${
  componentData.useState
    ? componentData.state
        .map(
          (state) =>
            `  const [${state.name}, set${
              state.name.charAt(0).toUpperCase() + state.name.slice(1)
            }] = useState(${state.initial});`
        )
        .join("\n")
    : ""
}

${
  componentData.functions
    ? componentData.functions
        .map(
          (func) => `
  const ${func.name} = (${func.params ? func.params.join(", ") : ""}) => {
    ${func.body || "// Function implementation"}
  };
`
        )
        .join("")
    : ""
}

  return (
    <div className="${
      componentData.className || componentData.name.toLowerCase()
    }">
${componentData.jsx || `      <h1>${componentData.name} Component</h1>`}
    </div>
  );
};

export default ${componentData.name};
        `,

    apiEndpoint: (endpointData) => `
// ${
      endpointData.description ||
      `${endpointData.method.toUpperCase()} ${endpointData.path}`
    }
app.${endpointData.method.toLowerCase()}('${endpointData.path}', ${
      endpointData.middleware ? endpointData.middleware.join(", ") + ", " : ""
    }async (req, res) => {
  try {
${
  endpointData.validation
    ? `    // Validation
    const { error, value } = ${endpointData.validation}.validate(req.${
        endpointData.bodySource || "body"
      });
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
`
    : ""
}
${
  endpointData.authentication
    ? `    // Authentication check
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    ${
      endpointData.authorization
        ? `// Authorization check
    if (!req.user.permissions.includes('${endpointData.authorization}')) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }`
        : ""
    }
`
    : ""
}
    // Main logic
${
  endpointData.logic ||
  `    const result = await ${endpointData.service || "service"}.${
    endpointData.action || "process"
  }(${endpointData.params || "value"});`
}
    
    res.status(${endpointData.successStatus || 200}).json({
      success: true,
${
  endpointData.responseData
    ? `      data: ${endpointData.responseData},`
    : "      data: result,"
}
      message: '${
        endpointData.successMessage || "Operation completed successfully"
      }'
    });
    
  } catch (error) {
    console.error('Error in ${endpointData.method.toUpperCase()} ${
      endpointData.path
    }:', error);
    res.status(${endpointData.errorStatus || 500}).json({
      success: false,
      error: '${endpointData.errorMessage || "Internal server error"}'
    });
  }
});
        `,

    sqlQuery: (queryData) => `
-- ${queryData.description || "Generated SQL Query"}
-- Generated on: ${new Date().toLocaleString()}

${
  queryData.type.toUpperCase() === "SELECT"
    ? `
SELECT ${queryData.columns ? queryData.columns.join(",\n       ") : "*"}
FROM ${queryData.table}${
        queryData.joins
          ? queryData.joins
              .map(
                (join) =>
                  `\n${join.type.toUpperCase()} JOIN ${join.table} ON ${
                    join.condition
                  }`
              )
              .join("")
          : ""
      }${queryData.where ? `\nWHERE ${queryData.where.join("\n  AND ")}` : ""}${
        queryData.groupBy ? `\nGROUP BY ${queryData.groupBy.join(", ")}` : ""
      }${queryData.having ? `\nHAVING ${queryData.having}` : ""}${
        queryData.orderBy ? `\nORDER BY ${queryData.orderBy.join(", ")}` : ""
      }${queryData.limit ? `\nLIMIT ${queryData.limit}` : ""};
`
    : ""
}

${
  queryData.type.toUpperCase() === "INSERT"
    ? `
INSERT INTO ${queryData.table} (${queryData.columns.join(", ")})
VALUES ${queryData.values
        .map((row) => `(${row.join(", ")})`)
        .join(",\n       ")};
`
    : ""
}

${
  queryData.type.toUpperCase() === "UPDATE"
    ? `
UPDATE ${queryData.table}
SET ${queryData.updates
        .map((update) => `${update.column} = ${update.value}`)
        .join(",\n    ")}${
        queryData.where ? `\nWHERE ${queryData.where.join("\n  AND ")}` : ""
      };
`
    : ""
}

${
  queryData.type.toUpperCase() === "DELETE"
    ? `
DELETE FROM ${queryData.table}${
        queryData.where ? `\nWHERE ${queryData.where.join("\n  AND ")}` : ""
      };
`
    : ""
}
        `,
  };

  return {
    generateReactComponent: (data) => generators.reactComponent(data),
    generateApiEndpoint: (data) => generators.apiEndpoint(data),
    generateSqlQuery: (data) => generators.sqlQuery(data),

    preview: (type, data) => {
      console.log(`\n📄 Generated ${type}:`);
      console.log("=".repeat(80));

      switch (type) {
        case "react":
          console.log(generators.reactComponent(data));
          break;
        case "api":
          console.log(generators.apiEndpoint(data));
          break;
        case "sql":
          console.log(generators.sqlQuery(data));
          break;
        default:
          console.log(`❌ Unknown generator type: ${type}`);
      }

      console.log("=".repeat(80));
    },
  };
}

// Test code generator
let codeGen = createCodeGenerator();

// React component example
let componentData = {
  name: "UserProfile",
  className: "user-profile",
  useState: true,
  props: ["user", "onEdit"],
  state: [
    { name: "isEditing", initial: "false" },
    { name: "formData", initial: "user" },
  ],
  functions: [
    {
      name: "handleEdit",
      params: [],
      body: "setIsEditing(true);",
    },
    {
      name: "handleSave",
      params: ["data"],
      body: "setFormData(data);\n    setIsEditing(false);\n    onEdit(data);",
    },
  ],
  jsx: `      <div className="profile-header">
        <img src={user.avatar} alt={user.name} />
        <h2>{user.name}</h2>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
      </div>`,
};

// API endpoint example
let apiData = {
  method: "POST",
  path: "/api/users",
  description: "Create a new user account",
  middleware: ["validateRequest", "rateLimiter"],
  validation: "userCreateSchema",
  bodySource: "body",
  authentication: true,
  authorization: "create_user",
  service: "userService",
  action: "createUser",
  params: "value",
  successStatus: 201,
  successMessage: "User created successfully",
  errorStatus: 500,
  errorMessage: "Failed to create user",
};

// SQL query example
let sqlData = {
  type: "SELECT",
  description: "Get user orders with product details",
  columns: [
    "o.id as order_id",
    "o.created_at",
    "u.name as customer_name",
    "p.name as product_name",
    "oi.quantity",
    "oi.price",
  ],
  table: "orders o",
  joins: [
    { type: "inner", table: "users u", condition: "o.user_id = u.id" },
    { type: "inner", table: "order_items oi", condition: "o.id = oi.order_id" },
    { type: "inner", table: "products p", condition: "oi.product_id = p.id" },
  ],
  where: [
    "o.status = 'completed'",
    "o.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)",
  ],
  orderBy: ["o.created_at DESC"],
  limit: 100,
};

// Generate and preview code
codeGen.preview("react", componentData);
codeGen.preview("api", apiData);
codeGen.preview("sql", sqlData);
```

## 🏋️‍♂️ Practice Exercises

### Exercise 1: Product Catalog

```javascript
let products = [
  { id: 1, name: "Laptop", price: 999, category: "Electronics", rating: 4.5 },
  { id: 2, name: "Book", price: 19, category: "Education", rating: 4.8 },
  {
    id: 3,
    name: "Headphones",
    price: 199,
    category: "Electronics",
    rating: 4.2,
  },
];

console.log("=== TEMPLATE LITERAL EXERCISE 1 ===");

// Create a product card template for each product
products.forEach((product) => {
  let productCard = `
┌─────────────────────────────────┐
│ ${product.name.padEnd(31)} │
│ $${product.price.toString().padEnd(29)} │
│ Category: ${product.category.padEnd(21)} │
│ Rating: ${"★".repeat(Math.floor(product.rating))}${"☆".repeat(
    5 - Math.floor(product.rating)
  )} (${product.rating})${" ".padEnd(10)} │
└─────────────────────────────────┘
    `;
  console.log(productCard);
});

// Create a summary report
let totalProducts = products.length;
let totalValue = products.reduce((sum, p) => sum + p.price, 0);
let avgRating =
  products.reduce((sum, p) => sum + p.rating, 0) / products.length;

let summary = `
📊 PRODUCT CATALOG SUMMARY
${"-".repeat(30)}
Total Products: ${totalProducts}
Total Value: $${totalValue}
Average Rating: ${avgRating.toFixed(1)} stars
Categories: ${[...new Set(products.map((p) => p.category))].join(", ")}
`;

console.log(summary);
```

### Exercise 2: Event Scheduler

```javascript
let events = [
  { title: "Team Meeting", date: "2024-03-15", time: "10:00", duration: 60 },
  { title: "Project Review", date: "2024-03-16", time: "14:00", duration: 90 },
  { title: "Client Call", date: "2024-03-17", time: "09:30", duration: 45 },
];

console.log("=== TEMPLATE LITERAL EXERCISE 2 ===");

// Create an agenda template
let agenda = `
📅 WEEKLY AGENDA
${events
  .map((event) => {
    let startTime = event.time;
    let startHour = parseInt(startTime.split(":")[0]);
    let startMin = parseInt(startTime.split(":")[1]);
    let endMin = startMin + (event.duration % 60);
    let endHour =
      startHour + Math.floor(event.duration / 60) + Math.floor(endMin / 60);
    endMin = endMin % 60;
    let endTime = `${endHour.toString().padStart(2, "0")}:${endMin
      .toString()
      .padStart(2, "0")}`;

    return `
📌 ${event.title}
   📅 ${new Date(event.date).toLocaleDateString("en-US", {
     weekday: "long",
     month: "long",
     day: "numeric",
   })}
   🕐 ${event.time} - ${endTime} (${event.duration} minutes)`;
  })
  .join("\n")}

Total meeting time: ${events.reduce(
  (total, event) => total + event.duration,
  0
)} minutes
`;

console.log(agenda);
```

## 📚 Key Takeaways

1. **Template literals use backticks** - `` `text` `` instead of quotes
2. **Embed expressions with ${}** - Variables, calculations, function calls
3. **Natural multi-line strings** - No need for escape characters
4. **Great for HTML/code generation** - Clean, readable templates
5. **Tagged templates** - Advanced processing with custom functions
6. **Expression evaluation** - Any valid JavaScript expression works

## ➡️ What's Next?

Excellent work mastering template literals! 🎉 You now have a powerful tool for creating dynamic, readable strings and generating complex content.

Next, you'll learn about **Destructuring** - a modern way to extract values from arrays and objects that makes your code cleaner and more expressive.

Your next lesson: **23. Destructuring - Extracting Data Easily**

## 🔗 Quick Reference

```javascript
// Template literal syntax
`text with ${variable}``multi-line
 text without
 escape characters`// Embedded expressions
`Result: ${calculation}``Conditional: ${
  condition ? "yes" : "no"
}``Function call: ${functionName()}`;

// Tagged templates
function tag(strings, ...values) {
  // Process template
}
tag`template with ${value}`;
```

You're becoming a string manipulation expert! 🚀
