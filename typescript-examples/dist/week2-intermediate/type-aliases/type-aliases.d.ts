/**
 * Week 2 - Type Aliases Examples
 * Create custom types for better code organization and reusability
 */
type UserID = number;
type UserName = string;
type EmailAddress = string;
declare const userId: UserID;
declare const userName: UserName;
declare const email: EmailAddress;
declare function createUserAccount(id: UserID, name: UserName, email: EmailAddress): void;
type Status = 'pending' | 'approved' | 'rejected';
type Theme = 'light' | 'dark' | 'auto';
type Size = 'small' | 'medium' | 'large' | 'extra-large';
declare function setApplicationStatus(status: Status): void;
declare function applyTheme(theme: Theme): void;
type StringOrNumber = string | number;
type BooleanOrNull = boolean | null;
declare const value1: StringOrNumber;
declare const value2: StringOrNumber;
declare const flag: BooleanOrNull;
declare const nullFlag: BooleanOrNull;
type User = {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    lastLogin?: Date;
};
type Address = {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
};
type UserWithAddress = User & Address;
declare const user: User;
declare const userWithAddress: UserWithAddress;
type MathOperation = (a: number, b: number) => number;
type StringFormatter = (input: string) => string;
type EventHandler<T> = (event: T) => void;
declare const add: MathOperation;
declare const multiply: MathOperation;
declare const uppercase: StringFormatter;
declare const removeSpaces: StringFormatter;
declare const clickHandler: EventHandler<string>;
type NumberList = number[];
type StringList = string[];
type UserList = User[];
type MixedData = (string | number | boolean)[];
type TodoItem = {
    id: number;
    text: string;
    completed: boolean;
};
type TodoList = TodoItem[];
declare const scores: NumberList;
declare const names: StringList;
declare const users: UserList;
declare const mixed: MixedData;
declare const todos: TodoList;
type Result<T> = {
    success: boolean;
    data?: T;
    error?: string;
};
type Pair<T, U> = {
    first: T;
    second: U;
};
type KeyValuePair<T> = {
    [key: string]: T;
};
declare const stringResult: Result<string>;
declare const numberResult: Result<number>;
declare const coordinates: Pair<number, number>;
declare const nameAge: Pair<string, number>;
declare const settings: KeyValuePair<string>;
declare const counters: KeyValuePair<number>;
type NonNullable<T> = T extends null | undefined ? never : T;
type ArrayElement<T> = T extends (infer U)[] ? U : never;
type SafeString = NonNullable<string | null>;
type SafeNumber = NonNullable<number | undefined>;
type NumberFromArray = ArrayElement<number[]>;
type StringFromArray = ArrayElement<string[]>;
declare const safeStr: SafeString;
declare const safeNum: SafeNumber;
type Optional<T> = {
    [K in keyof T]?: T[K];
};
type ReadOnly<T> = {
    readonly [K in keyof T]: T[K];
};
type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
};
type OptionalProduct = Optional<Product>;
type ReadOnlyProduct = ReadOnly<Product>;
declare const partialProduct: OptionalProduct;
declare const immutableProduct: ReadOnlyProduct;
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type ContentType = 'application/json' | 'application/xml' | 'text/plain';
type ApiRequest = {
    url: string;
    method: HttpMethod;
    headers?: {
        [key: string]: string;
    };
    body?: any;
};
type ApiResponse<T> = {
    status: number;
    statusText: string;
    data: T;
    headers: {
        [key: string]: string;
    };
};
type ApiClient = {
    get<T>(url: string): Promise<ApiResponse<T>>;
    post<T>(url: string, data: any): Promise<ApiResponse<T>>;
    put<T>(url: string, data: any): Promise<ApiResponse<T>>;
    delete<T>(url: string): Promise<ApiResponse<T>>;
};
declare const apiClient: ApiClient;
declare function demonstrateApiClient(): Promise<void>;
//# sourceMappingURL=type-aliases.d.ts.map