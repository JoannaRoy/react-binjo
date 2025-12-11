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
        primary: "#8b5cf6",
        secondary: "#ec4899",
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
