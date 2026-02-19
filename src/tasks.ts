function printSection(title: string): void {
  console.log("\n==================================================");
  console.log(title);
  console.log("==================================================");
}



// 1. User
interface User {
  id: number;
  name: string;
  email?: string;
  isActive: boolean;
}

function createUser(
  id: number,
  name: string,
  email?: string,
  isActive: boolean = true
): User {
  const user: User = {
    id,
    name,
    isActive
  };

  if (email !== undefined) {
    user.email = email;
  }

  return user;
}

printSection("1. Проверка User");

console.log("User 1:", createUser(1, "Ревизия в процессе!"));
console.log("User 2:", createUser(2, "Go! Go! Go!"));
console.log("User 3:", createUser(3, "Leonsky", "skyonleon@gmail.com", false));



// 2. Book
interface Book {
  title: string;
  author: string;
  year?: number;
  genre: "fiction" | "non-fiction";
}

function createBook(book: Book): Book {
  return book;
}

printSection("2. Проверка Book");

console.log("Book 1:", createBook({ title: "1984", author: "George Orwell", genre: "fiction" }));
console.log("Book 2:", createBook({ title: "Clean Code", author: "Robert Martin", year: 2008, genre: "non-fiction" }));



// 3. calculateArea
function calculateArea(shape: "circle", radius: number): number;
function calculateArea(shape: "square", side: number): number;

function calculateArea(shape: "circle" | "square", value: number): number {
  if (shape === "circle") {
    return Math.PI * value * value;
  } else {
    return value * value;
  }
}

printSection("3. Проверка calculateArea");

console.log("Circle (r=5):", calculateArea("circle", 5));
console.log("Square (side=4):", calculateArea("square", 4));



// 4. Status
type Status = "active" | "inactive" | "new";

function getStatusColor(status: Status): string {
  switch (status) {
    case "active":
      return "green";
    case "inactive":
      return "red";
    case "new":
      return "blue";
  }
}

printSection("4. Проверка Status");

console.log("active   ->", getStatusColor("active"));
console.log("inactive ->", getStatusColor("inactive"));
console.log("new      ->", getStatusColor("new"));



// 5. StringFormatter
type StringFormatter = (text: string, uppercase?: boolean) => string;

// 1 функция — первая буква заглавная
const capitalizeFirstLetter: StringFormatter = (
  text,
  uppercase = false
): string => {
  if (text.length === 0) return text;

  let result = text.charAt(0).toUpperCase() + text.slice(1);

  if (uppercase) {
    result = result.toUpperCase();
  }

  return result;
};

// 2 функция — ручная обрезка пробелов
const trim: StringFormatter = (
  text,
  uppercase = false
): string => {

  let start = 0;
  let end = text.length - 1;

  while (start <= end && text[start] === " ") {
    start++;
  }

  while (end >= start && text[end] === " ") {
    end--;
  }

  let result = "";

  for (let i = start; i <= end; i++) {
    result += text[i];
  }

  if (uppercase) {
    result = result.toUpperCase();
  }

  return result;
};

printSection("5. Проверка StringFormatter");

console.log("Capitalize:", capitalizeFirstLetter("hello world"));
console.log("Cap + Upper:", capitalizeFirstLetter("hello world", true));
console.log("Trim:", trim("   hello world   "));
console.log("Trim + Upper:", trim("   hello world   ", true));



// 6. getFirstElement
function getFirstElement<T>(arr: T[]): T | undefined {
  if (arr.length === 0) {
    return undefined;
  }

  return arr[0];
}

const numbers = [10, 20, 30];
const strings = ["hello", "world"];
const emptyArray: number[] = [];

printSection("6. Проверка getFirstElement");

console.log("Numbers:", getFirstElement(numbers));
console.log("Strings:", getFirstElement(strings));
console.log("Empty:", getFirstElement(emptyArray));



// 7. findById
interface HasId {
  id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  for (const item of items) {
    if (item.id === id) {
      return item;
    }
  }

  return undefined;
}

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

printSection("7. Проверка findById");

console.log("Find id=2:", findById(users, 2));
console.log("Find id=5:", findById(users, 5));
