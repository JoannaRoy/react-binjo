import Papa from "papaparse";
import type { BinjoItem, CsvRow } from "../types";

export function parseBinjoCsv(csvString: string): BinjoItem[] {
  const result = Papa.parse<CsvRow>(csvString, {
    header: true,
    skipEmptyLines: true,
  });

  return result.data.map((row) => {
    const planned = parseFloat(row.Planned) || 0;
    const completed = parseFloat(row.Completed) || 0;
    return {
      item: row.Item,
      planned,
      completed,
      remaining: 100 - planned - completed,
      annotation: row.Annotation || "",
    };
  });
}

export function generateCsvTemplate(items: string[] = []): string {
  const header = "Item,Planned,Completed,Annotation";
  const defaultItems = [
    "Goal 1", "Goal 2", "Goal 3", "Goal 4", "Goal 5",
    "Goal 6", "Goal 7", "Goal 8", "Goal 9", "Goal 10",
    "Goal 11", "Goal 12", "FREE SPACE", "Goal 14", "Goal 15",
    "Goal 16", "Goal 17", "Goal 18", "Goal 19", "Goal 20",
    "Goal 21", "Goal 22", "Goal 23", "Goal 24", "Goal 25",
  ];

  const finalItems = items.length === 25 ? items : defaultItems;
  const rows = finalItems.map((item) => `"${item}",0,0,`);

  return [header, ...rows].join("\n");
}

