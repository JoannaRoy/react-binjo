# react-binjo

A customizable bingo-style progress board and prize wheel component for React. Track your goals visually with a 5x5 grid or spin a wheel of options.

![React Binjo Board](https://via.placeholder.com/600x400?text=BINJO+Board+Preview)

## Features

### BinjoBoard
- 5x5 bingo grid displaying 25 goals
- Pie charts showing progress on hover
- Star indicator for completed items (100%)
- Annotation tooltip for completed items
- CSV parsing utility for easy data management
- CLI tool to generate template CSV files
- Fully customizable colors and styling
- Responsive design (mobile + desktop)
- Special header display when title is exactly 5 characters

### WOW (Wheel of Wonder)
- Interactive spinning prize wheel
- Customizable segment colors and text
- Confetti animation on spin completion
- Custom pointer styles with rotation control
- Mobile-responsive design
- Callbacks for spin start and end events
- Flexible option configuration

## Installation

```bash
npm install react-binjo
```

## Quick Start

### Option 1: Direct Data

```tsx
import { BinjoBoard } from 'react-binjo';

const goals = [
  { item: "Learn React", completed: 100, planned: 0 },
  { item: "Build an App", completed: 50, planned: 25 },
  { item: "Write Tests", completed: 0, planned: 30 },
  // ... 25 items total for a 5x5 grid
];

function App() {
  return <BinjoBoard data={goals} title="BINJO" />;
}
```

### Option 2: From CSV

```tsx
import { BinjoBoard, parseBinjoCsv } from 'react-binjo';
import csvData from './my-goals.csv?raw';

const data = parseBinjoCsv(csvData);

function App() {
  return <BinjoBoard data={data} />;
}
```

---

## CLI Tool: Generate Your CSV

The easiest way to get started is using the CLI to generate a CSV template.

### Quick Template

```bash
npx react-binjo -t my-goals.csv
```

This creates a CSV with 25 placeholder goals you can edit.

### Interactive Mode

```bash
npx react-binjo my-goals.csv
```

Prompts you to enter each of your 25 goals.

### CLI Options

```
-t, --template  Generate with default placeholder goals
-h, --help      Show help message
```

---

## CSV Format

Your CSV needs these columns:

| Column | Type | Description |
|--------|------|-------------|
| `Item` | string | Name of the goal |
| `Planned` | number \| fraction | Percentage planned (0-100), or a fraction like `1/4` (treated as 25%) |
| `Completed` | number \| fraction | Percentage completed (0-100), or a fraction like `2/3` (treated as ~66.67%) |
| `Annotation` | string | Optional note (shown on hover for completed items) |

Example:

```csv
Item,Planned,Completed,Annotation
"Learn Spanish",25,50,
"Run a Marathon",0,100,Boston 2025
"Read 20 Books",10,60,
"Travel to 5 Countries",0,80,
```

The `remaining` percentage is auto-calculated: `100 - Planned - Completed`

A template is included at `templates/binjo-template.csv`.

---

## Component API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `BinjoItem[]` | **required** | Array of 25 progress items |
| `title` | `string` | `"BINJO"` | Title above the board |
| `colors` | `BinjoColors` | see below | Custom color scheme |
| `fonts` | `BinjoFonts` | see below | Custom font families |
| `starIcon` | `ReactNode \| string` | star SVG | Icon for 100% complete items |
| `className` | `string` | - | Additional CSS class |

**Note:** When `title` is exactly 5 characters, each letter is displayed in its own column above the grid (like B-I-N-G-O style).

### BinjoItem

```ts
interface BinjoItem {
  item: string;        // Goal name
  completed: number;   // 0-100
  planned: number;     // 0-100
  remaining?: number;  // Auto-calculated if omitted
  annotation?: string; // Shown on hover for completed items
}
```

### BinjoColors

```ts
interface BinjoColors {
  completed?: string;   // Pie chart: completed (default: "#82ca9d")
  planned?: string;     // Pie chart: planned (default: "#8884d8")
  remaining?: string;   // Pie chart: remaining (default: "#75c8d3")
  cellEven?: string;    // Even cell background (default: "#d8b4fe")
  cellOdd?: string;     // Odd cell background (default: "#93c5fd")
  centerCell?: string;  // Center cell (default: gradient)
}
```

### BinjoFonts

```ts
interface BinjoFonts {
  title?: string;  // Title/header font (default: "'Fredoka', system-ui, sans-serif")
  cell?: string;   // Cell content font (default: "system-ui, -apple-system, sans-serif")
}
```

---

## Examples

### Custom Colors

```tsx
<BinjoBoard
  data={data}
  title="My Progress"
  colors={{
    completed: "#22c55e",
    planned: "#f59e0b",
    remaining: "#6b7280",
    cellEven: "#fef3c7",
    cellOdd: "#dbeafe",
  }}
/>
```

### Custom Star Icon

```tsx
// Emoji (via image URL)
<BinjoBoard data={data} starIcon="/assets/trophy.png" />

// Custom component
<BinjoBoard data={data} starIcon={<MyTrophyIcon />} />

// Image URL
<BinjoBoard data={data} starIcon="/assets/gold-star.png" />
```

### 5-Letter Title (BINGO Style Header)

```tsx
<BinjoBoard data={data} title="GOALS" />
```

When the title is exactly 5 characters, each letter appears above its column.

### Custom Fonts

```tsx
<BinjoBoard
  data={data}
  fonts={{
    title: "'Bangers', cursive",
    cell: "'Poppins', sans-serif",
  }}
/>
```

**Note:** Web fonts (like Google Fonts) must be loaded separately in your HTML or app:

```html
<link href="https://fonts.googleapis.com/css2?family=Bangers&family=Poppins:wght@400;600&display=swap" rel="stylesheet">
```

---

## WOW Component (Wheel of Wonder)

An interactive spinning prize wheel component perfect for games, raffles, or decision-making.

### Basic Usage

```tsx
import { WOW } from 'react-binjo';

function App() {
  const options = ['Prize 1', 'Prize 2', 'Prize 3', 'Prize 4', 'Prize 5'];
  
  return (
    <WOW
      options={options}
      onSpinEnd={(prizeIndex, prizeLabel) => {
        console.log(`Won: ${prizeLabel} at index ${prizeIndex}`);
      }}
    />
  );
}
```

### WOW Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `string[] \| WOWOption[]` | **required** | Array of options/prizes to display |
| `title` | `string` | `"Spin the Prize Wheel!"` | Title above the wheel |
| `showTitle` | `boolean` | `true` | Whether to show the title |
| `colors` | `WOWColors` | see below | Custom color scheme |
| `border` | `WOWBorderConfig` | see below | Border configuration |
| `pointer` | `WOWPointerConfig` | see below | Pointer configuration |
| `confetti` | `boolean \| WOWConfettiConfig` | `true` | Confetti settings or disable |
| `spinDuration` | `number` | `1` | Spin duration in seconds |
| `fontSize` | `number` | `14` | Font size for labels |
| `fontFamily` | `string` | `"monospace"` | Font family for labels |
| `fontWeight` | `number` | `700` | Font weight for labels |
| `onSpinStart` | `(index: number) => void` | - | Callback when spin starts |
| `onSpinEnd` | `(index: number, label: string) => void` | - | Callback when spin ends |
| `className` | `string` | - | Additional CSS class |
| `mobileBreakpoint` | `number` | `768` | Breakpoint for mobile view |

### WOWOption

```ts
interface WOWOption {
  label: string;
  backgroundColor?: string;
  textColor?: string;
}
```

### WOWColors

```ts
interface WOWColors {
  segmentColors?: string[];  // Array of colors to alternate (default: ["#4cbba4", "#88be74"])
  text?: string;             // Text color (default: "#ffffff")
  outerBorder?: string;      // Outer border color (default: "#ffffff")
}
```

### WOWBorderConfig

```ts
interface WOWBorderConfig {
  outerBorderWidth?: number;   // Width of outer border (default: 5)
  radiusLineWidth?: number;    // Width of radius lines (default: 0)
  radiusLineColor?: string;    // Color of radius lines (default: "#ffffff")
}
```

### WOWPointerConfig

```ts
interface WOWPointerConfig {
  rotation?: number;      // Rotation angle in degrees (default: 310)
  width?: number;         // Pointer width on desktop (default: 90)
  mobileWidth?: number;   // Pointer width on mobile (default: 60)
  color?: string;         // Pointer color/shadow (default: "#000000")
  src?: string;           // Custom pointer image URL
}
```

### WOWConfettiConfig

```ts
interface WOWConfettiConfig {
  enabled?: boolean;           // Enable/disable confetti (default: true)
  numberOfPieces?: number;     // Number of pieces (default: 2000)
  gravity?: number;            // Gravity strength (default: 0.5)
  initialVelocityY?: number;   // Initial upward velocity (default: 50)
  recycle?: boolean;           // Recycle confetti (default: false)
}
```

### Examples

#### Custom Colors

```tsx
<WOW
  options={['Red', 'Blue', 'Green', 'Yellow']}
  colors={{
    segmentColors: ['#ef4444', '#3b82f6', '#10b981', '#fbbf24'],
    text: '#ffffff',
    outerBorder: '#000000',
  }}
/>
```

#### Advanced Options with Custom Styling

```tsx
const options = [
  { label: 'Grand Prize', backgroundColor: '#ffd700', textColor: '#000000' },
  { label: 'Second Place', backgroundColor: '#c0c0c0', textColor: '#000000' },
  { label: 'Third Place', backgroundColor: '#cd7f32', textColor: '#ffffff' },
  'Try Again',
  'Bonus Points',
];

<WOW options={options} />
```

#### Custom Pointer and No Confetti

```tsx
<WOW
  options={['A', 'B', 'C', 'D']}
  pointer={{
    src: '/custom-arrow.png',
    rotation: 270,
    width: 100,
  }}
  confetti={false}
/>
```

#### With Event Handlers

```tsx
<WOW
  options={['Option 1', 'Option 2', 'Option 3']}
  onSpinStart={(index) => {
    console.log('Starting to spin...');
  }}
  onSpinEnd={(index, label) => {
    alert(`You won: ${label}!`);
  }}
/>
```

---

## Utilities

### `parseBinjoCsv(csvString: string): BinjoItem[]`

Parse a CSV string into the data format for `BinjoBoard`.

```ts
import { parseBinjoCsv } from 'react-binjo';

const data = parseBinjoCsv(myCsvString);
```

### `generateCsvTemplate(items?: string[]): string`

Programmatically generate a CSV template string.

```ts
import { generateCsvTemplate } from 'react-binjo';

// With default placeholders
const csv = generateCsvTemplate();

// With custom items (must be exactly 25)
const csv = generateCsvTemplate([
  "Goal 1", "Goal 2", /* ... 25 items */
]);
```

---

## Exports

The package exports:

### Components
- `BinjoBoard` - Main bingo board component
- `WOW` - Prize wheel component
- `PieChart` - Standalone pie chart component
- `Tooltip` - Tooltip component

### Utilities
- `parseBinjoCsv` - CSV parser utility
- `generateCsvTemplate` - CSV template generator
- `externalTooltipHandler` - External tooltip handler
- `getOrCreateTooltip` - Tooltip utility
- `TOOLTIP_STYLES` - Tooltip style constants

### Types
- `BinjoItem`, `BinjoColors`, `BinjoFonts`, `BinjoBoardProps`, `CsvRow`
- `WOWProps`, `WOWOption`, `WOWColors`, `WOWBorderConfig`, `WOWPointerConfig`, `WOWConfettiConfig`

---

## Dependencies

This package includes these dependencies (bundled):

- `styled-components` - Styling
- `chart.js` + `react-chartjs-2` - Pie charts
- `papaparse` - CSV parsing
- `react-custom-roulette` - Wheel component
- `react-confetti` - Confetti animations

## Peer Dependencies

- `react` ^18.0.0 || ^19.0.0
- `react-dom` ^18.0.0 || ^19.0.0

## License

MIT
