import { describe, it, expect, vi } from "vitest";
import { csvToJSON, formatCSVFileToJSONFile } from "../src/task.js";
import * as fs from "node:fs/promises";

vi.mock("node:fs/promises", () => ({
    readFile: vi.fn(),
    writeFile: vi.fn(),
}));

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


// =====================
// ТЕСТЫ formatCSVFileToJSONFile
// =====================
describe("formatCSVFileToJSONFile", () => {
    it("Должна прочитать CSV и записать JSON", async () => {
        vi.spyOn(fs, "readFile").mockResolvedValue("p1;p2\n1;A\n2;B");

        const writeSpy = vi.spyOn(fs, "writeFile").mockResolvedValue(undefined);

        await formatCSVFileToJSONFile("input.csv", "output.json", ";");

        expect(writeSpy).toHaveBeenCalled();
    });

    it("должна передать правильные данные в writeFile", async () => {

        vi.spyOn(fs, "readFile").mockResolvedValue("p1;p2\n1;A\n2;B");

        const writeSpy = vi.spyOn(fs, "writeFile").mockResolvedValue(undefined);

        await formatCSVFileToJSONFile("input.csv", "output.json", ";");

        expect(writeSpy).toHaveBeenCalledWith(
            "output.json",
            JSON.stringify(
                [
                    { p1: 1, p2: "A" },
                    { p1: 2, p2: "B" }
                ]
            ),
            "utf-8"
        );
    });
});