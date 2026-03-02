import { readFile, writeFile } from "node:fs/promises";

export function csvToJSON(input: string[], delimiter: string): object[] {
    if (!Array.isArray(input) || input.length === 0){
        throw new Error('Input is empty');
    }

    const firstRow = input[0];

    if (firstRow === undefined){
        throw new Error("Header row is empty");
    }

    const headers = firstRow.split(delimiter);

    const result: object[] = [];

    for (let i = 1; i < input.length; i++){
        const currentRow = input[i];

        if (currentRow === undefined){
            throw new Error("Row is empty");
        }

        const values = currentRow.split(delimiter);

        if (values.length !== headers.length){
            throw new Error("Different number of columns");
        }

        const obj: Record<string, string | number> = {};

        for (let j = 0; j < headers.length; j++){
            const header = headers[j];
            const value = values[j];

            if (header === undefined || value === undefined){
                throw new Error("Invalid data");
            }

            const numberValue = Number(value);

            if (!isNaN(numberValue)){
                obj[header] = numberValue;
            } else {
                obj[header] = value;
            }
        }

        result.push(obj);
    }
    return result;
}