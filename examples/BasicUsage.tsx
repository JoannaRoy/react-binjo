import { BinjoBoard, parseBinjoCsv } from "react-binjo";
import sampleCsv from "../templates/binjo-template.csv?raw";

const data = parseBinjoCsv(sampleCsv);

export function BasicExample() {
  return (
    <BinjoBoard
      data={data}
      title="BINJO"
      fonts={{
        title: "'Fredoka', system-ui, sans-serif",
        cell: "'Inter', system-ui, sans-serif",
      }}
    />
  );
}

const customColors = {
  completed: "#10b981",
  planned: "#f59e0b",
  remaining: "#6366f1",
  cellEven: "#fecaca",
  cellOdd: "#bfdbfe",
  centerCell: "linear-gradient(135deg, #fcd34d, #f87171)",
};

const customFonts = {
  title: "'Bangers', cursive",
  cell: "'Poppins', sans-serif",
};

const CustomStar = () => (
  <svg viewBox="0 0 24 24" fill="#ec4899" style={{ width: "85%", height: "85%" }}>
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export function CustomColorsExample() {
  return (
    <BinjoBoard
      data={data}
      title="TRAIL"
      colors={customColors}
      fonts={customFonts}
      starIcon={<CustomStar />}
    />
  );
}
