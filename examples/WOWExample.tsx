import { WOW } from "react-binjo";

const prizeOptions = [
  "New book",
  "New gadget",
  "IKEA trip",
  "Nice meal out",
  "Massage",
  "New sports gear",
  "Mystery prize",
  "Concert ticket",
  "Spa day",
  "Home decor",
  "Clothing article",
  "Surprise!",
];

export function BasicWOWExample() {
  return (
    <WOW
      options={prizeOptions}
      title="Spin to Win!"
      onSpinEnd={(index, label) => {
        console.log(`Won: ${label} (index ${index})`);
      }}
    />
  );
}

const customOptions = [
  { label: "Gold Prize", backgroundColor: "#fbbf24", textColor: "#1f2937" },
  { label: "Silver Prize", backgroundColor: "#9ca3af", textColor: "#1f2937" },
  { label: "Bronze Prize", backgroundColor: "#d97706", textColor: "#ffffff" },
  { label: "Platinum", backgroundColor: "#e5e7eb", textColor: "#1f2937" },
  { label: "Diamond", backgroundColor: "#60a5fa", textColor: "#ffffff" },
  { label: "Ruby", backgroundColor: "#ef4444", textColor: "#ffffff" },
];

export function CustomWOWExample() {
  return (
    <WOW
      options={customOptions}
      title="Prize Wheel"
      colors={{
        segmentColors: ["#8b5cf6", "#ec4899"],
        text: "#ffffff",
        outerBorder: "#000000",
      }}
      border={{
        outerBorderWidth: 8,
        radiusLineWidth: 2,
        radiusLineColor: "#ffffff",
      }}
      spinDuration={0.8}
      fontSize={16}
      fontFamily="Arial, sans-serif"
      fontWeight={600}
      confetti={{
        enabled: true,
        numberOfPieces: 3000,
        gravity: 0.3,
      }}
      onSpinStart={(index) => console.log(`Spinning to index ${index}`)}
      onSpinEnd={(_index, label) => alert(`You won: ${label}!`)}
    />
  );
}

export function MinimalWOWExample() {
  return (
    <WOW
      options={["Option A", "Option B", "Option C", "Option D"]}
      showTitle={false}
      confetti={false}
      onSpinEnd={(index, label) => console.log(`Won index ${index}: ${label}`)}
    />
  );
}

export function CSSVariablesWOWExample() {
  return (
    <div style={{ 
      "--wheel-color-1": "#4cbba4",
      "--wheel-color-2": "#88be74",
      "--wheel-text": "#ffffff",
      "--wheel-border": "#000000"
    } as React.CSSProperties}>
      <WOW
        options={prizeOptions}
        title="Spin with CSS Variables!"
        colors={{
          segmentColors: ["var(--wheel-color-1)", "var(--wheel-color-2)"],
          text: "var(--wheel-text)",
          outerBorder: "var(--wheel-border)",
        }}
        onSpinEnd={(index, label) => {
          console.log(`Won: ${label} (index ${index})`);
        }}
      />
    </div>
  );
}

export function ColorListWOWExample() {
  return (
    <WOW
      options={["Prize 1", "Prize 2", "Prize 3", "Prize 4", "Prize 5", "Prize 6", "Prize 7", "Prize 8"]}
      title="Rainbow Wheel!"
      colors={{
        segmentColors: ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f7b731", "#5f27cd", "#00d2d3"],
        text: "#ffffff",
        outerBorder: "#2c3e50",
      }}
      onSpinEnd={(index, label) => {
        console.log(`Won: ${label} (index ${index})`);
      }}
    />
  );
}

export function TwoColorRotationExample() {
  return (
    <WOW
      options={prizeOptions}
      title="Two Color Rotation"
      colors={{
        segmentColors: ["#e74c3c", "#3498db"],
        text: "#ffffff",
      }}
      confetti={false}
      onSpinEnd={(index, label) => {
        console.log(`Won: ${label} (index ${index})`);
      }}
    />
  );
}
