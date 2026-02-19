// =======================
// 1. User
// =======================

export interface User {
  id: number;
  name: string;
  email?: string;
  isActive: boolean;
}

export function createUser(
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



// =======================
// 2. Book
// =======================

export interface Book {
  title: string;
  author: string;
  year?: number;
  genre: "fiction" | "non-fiction";
}

export function createBook(book: Book): Book {
  return book;
}



// =======================
// 3. calculateArea
// =======================

export function calculateArea(shape: "circle", radius: number): number;
export function calculateArea(shape: "square", side: number): number;

export function calculateArea(shape: "circle" | "square", value: number): number {
  if (shape === "circle") {
    return Math.PI * value * value;
  } else {
    return value * value;
  }
}



// =======================
// 4. Status
// =======================

type Status = "active" | "inactive" | "new";

export function getStatusColor(status: Status): string {
  switch (status) {
    case "active":
      return "green";
    case "inactive":
      return "red";
    case "new":
      return "blue";
  }
}



// =======================
// 5. StringFormatter
// =======================

export type StringFormatter = (text: string, uppercase?: boolean) => string;

export const capitalizeFirstLetter: StringFormatter = (
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

export const trim: StringFormatter = (
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




// =======================
// 6. getFirstElement
// =======================

export function getFirstElement<T>(arr: T[]): T | undefined {
  if (arr.length === 0) {
    return undefined;
  }

  return arr[0];
}



// =======================
// 7. findById
// =======================

export interface HasId {
  id: number;
}

export function findById<T extends HasId>(items: T[], id: number): T | undefined {
  for (const item of items) {
    if (item.id === id) {
      return item;
    }
  }

  return undefined;
}