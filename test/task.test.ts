import { describe, it, expect, vi } from "vitest";
import * as fs from "node:fs/promises";
import { csvToJSON, formatCSVFileToJSONFile } from "../src/task.js";

// =====================
// ТЕСТЫ csvToJSON
// =====================

describe("csvToJSON", () => {
    it("Корректно преобращует csv в json", () => {
        const input = [
            "p1;p2;p3;p4",
            "1;A;b;c",
            "2;B;v;d"
        ];

        const result = csvToJSON(input, ";");

        expect(result).toEqual([
            { p1: 1, p2: "A", p3: "b", p4: "c" },
            { p1: 2, p2: "B", p3: "v", p4: "d" }
        ]);
    });

    it("выбрасывает ошибку при несовпадении колонок", () => {

        const input = [
            "p1;p2",
            "1;A;B"
        ];

        let errorCaught = false;

        try {
            csvToJSON(input, ";");
        } catch (error) {
            errorCaught = true;
        }

        expect(errorCaught).toBe(true);
    });

    it("выбрасывает ошибку при пустом вводе", () => {

        const input: string[] = [];

        let errorCaught = false;

        try {
            csvToJSON(input, ";");
        } catch (error) {
            errorCaught = true;
        }

        expect(errorCaught).toBe(true);
    });

});