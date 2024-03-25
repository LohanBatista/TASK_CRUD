import fs from "node:fs";
import { parse } from "csv-parse";

export async function parseCSV(filePath) {
  const parser = fs.createReadStream(filePath).pipe(parse({ columns: true }));
  const tasks = [];
  for await (const record of parser) {
    tasks.push(record);
  }
  return tasks;
}
