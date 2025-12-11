#!/usr/bin/env node
import * as fs from "fs";
import * as path from "path";
import * as readline from "readline";

const DEFAULT_ITEMS = [
  "Goal 1", "Goal 2", "Goal 3", "Goal 4", "Goal 5",
  "Goal 6", "Goal 7", "Goal 8", "Goal 9", "Goal 10",
  "Goal 11", "Goal 12", "FREE SPACE", "Goal 14", "Goal 15",
  "Goal 16", "Goal 17", "Goal 18", "Goal 19", "Goal 20",
  "Goal 21", "Goal 22", "Goal 23", "Goal 24", "Goal 25",
];

function generateCsv(items: string[]): string {
  const header = "Item,Planned,Completed,Notes";
  const rows = items.map((item) => `"${item}",0,0,`);
  return [header, ...rows].join("\n");
}

async function prompt(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function main() {
  const args = process.argv.slice(2);
  const isTemplate = args.includes("--template") || args.includes("-t");
  const isHelp = args.includes("--help") || args.includes("-h");
  const positionalArgs = args.filter((a) => !a.startsWith("-"));
  const outputFile = positionalArgs[0] || "binjo-progress.csv";

  if (isTemplate) {
    const csv = generateCsv(DEFAULT_ITEMS);
    fs.writeFileSync(outputFile, csv);
    console.log(`✓ Created template: ${outputFile}`);
    console.log("  Edit the file to customize your goals!");
    return;
  }

  if (isHelp) {
    console.log(`
react-binjo CSV Generator

Usage:
  npx react-binjo generate [output-file]    Interactive mode
  npx react-binjo generate -t [output-file] Quick template (default goals)

Options:
  -t, --template  Generate with default placeholder goals
  -h, --help      Show this help message

Examples:
  npx react-binjo generate my-goals.csv
  npx react-binjo generate -t 2025-goals.csv
`);
    return;
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("\n🎯 react-binjo CSV Generator\n");
  console.log("Enter 25 goals for your bingo board.");
  console.log("Press Enter with no input to use default placeholder.\n");

  const items: string[] = [];

  for (let i = 0; i < 25; i++) {
    const defaultItem = DEFAULT_ITEMS[i];
    const answer = await prompt(rl, `Goal ${i + 1} [${defaultItem}]: `);
    items.push(answer.trim() || defaultItem);
  }

  rl.close();

  const csv = generateCsv(items);
  fs.writeFileSync(outputFile, csv);

  console.log(`\n✓ Created: ${path.resolve(outputFile)}`);
  console.log("\nNext steps:");
  console.log("  1. Edit the CSV to set Planned/Completed percentages");
  console.log("  2. Import in your React app:");
  console.log(`
  import { BinjoBoard, parseBinjoCsv } from 'react-binjo';
  import csvData from './${outputFile}?raw';
  
  const data = parseBinjoCsv(csvData);
  <BinjoBoard data={data} />
`);
}

main();

