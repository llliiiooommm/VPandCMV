import { describe, it, expect } from "vitest";
import {
  createUser,
  createBook,
  calculateArea,
  getStatusColor,
  capitalizeFirstLetter,
  trim,
  getFirstElement,
  findById
} from "../src/tasks.js";

describe("Tests for ../src/tasks.ts", () => {
    // createUser:  
    it("createUser: Создаю пользователя по умолчанию с isActive", () => {
      const user = createUser(1, "Test №1");
      expect(user.isActive).toBe(true);
    });

    it("createUser: Создаю пользователя с isActive = false", () => {
      const user = createUser(2, "Test №2", undefined, false);
      expect(user.isActive).toBe(false);
    });

    it("createUser: Создаю пользователя с email", () => {
      const user = createUser(3, "Test №3", "test@gmail.com");
      expect(user.email).toBe("test@gmail.com");
    });


    // createBook:
    it("createBook: Создаю книгу без year", () => {
      const book = createBook({
        title: "1984",
        author: "George Orwell",
        genre: "fiction"
      });
      expect(book.year).toBeUndefined();
    });

    it("createBook: Создаю книгу с year", () => {
      const book = createBook({
        title: "Clean Code",
        author: "Robert Martin",
        year: 2008,
        genre: "non-fiction"
      });
      expect(book.year).toBe(2008);
    });


    // calculateArea:
    it("calculateArea: Вычисляет площадь квадрата", () => {
      const result = calculateArea("square", 4);
      expect(result).toBe(16);
    });

    it("calculateArea: Вычисляет площадь круга", () => {
      const result = calculateArea("circle", 2);
      expect(result).toBeCloseTo(Math.PI * 4);
    });


    // getStatusColor:
    it("getStatusColor: Возвращает green для active", () => {
      const result = getStatusColor("active");
      expect(result).toBe("green");
    });

    it("getStatusColor: Возвращает red для active", () => {
      const result = getStatusColor("inactive");
      expect(result).toBe("red");
    });

    it("getStatusColor: Возвращает new для new", () => {
      const result = getStatusColor("new");
      expect(result).toBe("blue");
    });


    // StringFormatter
    it("capitalizeFirstLetter: Проба делать первую букву заглавной", () => {
      const result = capitalizeFirstLetter("test");
      expect(result).toBe("Test");
    });

    it("capitalizeFirstLetter: Делаем всю строку заглавной", () => {
      const result = capitalizeFirstLetter("test", true);
      expect(result).toBe("TEST");
    });

    it("capitalizeFirstLetter: Вроде как возрат пустой строки должен быть", () => {
      const result = capitalizeFirstLetter("");
      expect(result).toBe("");
    });


    it("trim: Убирает пробелы по краям без заглавия строки", () => {
      const result = trim("     trim     ");
      expect(result).toBe("trim");
    });

    it("trim: Убирает пробелы и делает строку заглавной", () => {
      const result = trim("     trim     ", true);
      expect(result).toBe("TRIM");
    });

    it("trim: Если пробелов нема - остаётся прежней строка", () => {
      const result = trim("trim");
      expect(result).toBe("trim");
    });


    // getFirstElement
    it("getFirstElement: Возврат первого элемента массива", () => {
      const result = getFirstElement([5928, 6928, 7928]);
      expect(result).toBe(5928);
    });

    it("getFirstElement: Возврат underfined должен быть", () => {
      const result = getFirstElement([]);
      expect(result).toBeUndefined();
    });


    it("findById: Надо найти объект по  id", () => {
      const arr = [
        {id: 1, name: "Test 1"},
        {id: 2, name: "LOL"}
      ];

      const result = findById(arr, 2);
      expect(result?.name).toBe("LOL");
    });

    it("findById: Возврат underfined если id нема", () => {
      const arr = [
        {id: 1},
        {id: 2}
      ];

      const result = findById(arr, 3);

      expect(result).toBeUndefined();
    });
});