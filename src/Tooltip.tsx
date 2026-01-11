import styled from "styled-components";
import type { Chart } from "chart.js";

export const Tooltip = styled.div`
  position: absolute;
  background: rgba(30, 30, 46, 0.95);
  color: white;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-family: monospace;
  white-space: normal;
  min-width: 150px;
  width: max-content;
  max-width: 300px;
  z-index: 9999;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  pointer-events: none;
`;

export const TOOLTIP_STYLES = {
  background: "rgba(30, 30, 46, 0.95)",
  borderRadius: "6px",
  color: "white",
  padding: "6px 10px",
  fontFamily: "monospace",
  fontSize: "12px",
  whiteSpace: "normal",
  width: "max-content",
  maxWidth: "300px",
  zIndex: "9999",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  pointerEvents: "none",
  position: "absolute",
  transform: "translate(-50%, -100%)",
  transition: "all .15s ease",
} as const;

export const getOrCreateTooltip = (chart: Chart) => {
  let tooltipEl = chart.canvas.parentNode?.querySelector("div.chartjs-tooltip") as HTMLDivElement | null;

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.className = "chartjs-tooltip";
    Object.assign(tooltipEl.style, TOOLTIP_STYLES);
    tooltipEl.style.opacity = "1";
    chart.canvas.parentNode?.appendChild(tooltipEl);
  }

  return tooltipEl;
};

export const externalTooltipHandler = (context: { chart: Chart; tooltip: any }) => {
  const { chart, tooltip } = context;
  const tooltipEl = getOrCreateTooltip(chart);

  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = "0";
    return;
  }

  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map((b: any) => b.lines);

    let innerHtml = "";
    titleLines.forEach((title: string) => {
      innerHtml += `<div style="font-weight:bold;margin-bottom:2px">${title}</div>`;
    });
    bodyLines.forEach((body: string[], i: number) => {
      const colors = tooltip.labelColors[i];
      const colorBox = `<span style="display:inline-block;width:10px;height:10px;margin-right:6px;background:${colors.backgroundColor};border-radius:2px"></span>`;
      innerHtml += `<div>${colorBox}${body}</div>`;
    });

    tooltipEl.innerHTML = innerHtml;
  }

  const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

  tooltipEl.style.opacity = "1";
  tooltipEl.style.left = positionX + tooltip.caretX + "px";
  tooltipEl.style.top = positionY + tooltip.caretY - 10 + "px";
};

