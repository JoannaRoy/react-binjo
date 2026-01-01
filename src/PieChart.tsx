import { ArcElement, Tooltip } from "chart.js";
import { Chart } from "chart.js";
import { Pie } from "react-chartjs-2";
import type { BinjoColors } from "./types";
import { externalTooltipHandler } from "./Tooltip";

Chart.register(ArcElement, Tooltip);

interface PieChartProps {
  completed: number;
  planned: number;
  remaining: number;
  colors: Required<Pick<BinjoColors, "completed" | "planned" | "remaining">>;
}

function resolveColor(color: string): string {
  if (color.startsWith("var(")) {
    const varName = color.slice(4, -1).trim();
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || color;
  }
  return color;
}

export function PieChart({ completed, planned, remaining, colors }: PieChartProps) {
  const resolvedColors = {
    completed: resolveColor(colors.completed),
    planned: resolveColor(colors.planned),
    remaining: resolveColor(colors.remaining),
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "visible" }}>
      <Pie
        data={{
          labels: ["Completed", "Planned", "Remaining"],
          datasets: [
            {
              data: [completed, planned, remaining],
              backgroundColor: [resolvedColors.completed, resolvedColors.planned, resolvedColors.remaining],
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { 
              display: true,
              position: "bottom",
              labels: {
                boxWidth: 12,
                padding: 8,
                font: {
                  size: 10,
                },
              },
            },
            tooltip: {
              enabled: false,
              position: "nearest",
              external: externalTooltipHandler,
            },
          },
        }}
      />
    </div>
  );
}
