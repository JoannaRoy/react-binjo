import Papa from "papaparse";
import type { BinjoItem, CsvRow } from "../types";

function parsePercentValue(input: string | undefined): number {
  const raw = (input ?? "").trim();
  if (!raw) return 0;

  if (raw.includes("/")) {
    const parts = raw.split("/").map((p) => p.trim());
    if (parts.length !== 2 || !parts[0] || !parts[1]) return 0;

    const numerator = Number(parts[0]);
    const denominator = Number(parts[1]);
    if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) return 0;

    const percent = (numerator / denominator) * 100;
    return Math.max(0, Math.min(100, percent));
  }

  const value = parseFloat(raw);
  return Number.isFinite(value) ? value : 0;
}

export function parseBinjoCsv(csvString: string): BinjoItem[] {
  const result = Papa.parse<CsvRow>(csvString, {
    header: true,
    skipEmptyLines: true,
  });

  return result.data.map((row) => {
    const planned = parsePercentValue(row.Planned);
    const completed = parsePercentValue(row.Completed);
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

