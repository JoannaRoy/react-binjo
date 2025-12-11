import { ReactNode } from "react";

export interface BinjoItem {
  item: string;
  completed: number;
  planned: number;
  remaining?: number;
  annotation?: string;
}

export interface BinjoColors {
  completed?: string;
  planned?: string;
  remaining?: string;
  cellEven?: string;
  cellOdd?: string;
  centerCell?: string;
}

export interface BinjoFonts {
  title?: string;
  cell?: string;
}

export interface BinjoBoardProps {
  data: BinjoItem[];
  colors?: BinjoColors;
  title?: string;
  starIcon?: ReactNode | string;
  showLegend?: boolean;
  onItemClick?: (item: BinjoItem, index: number) => void;
  className?: string;
  fonts?: BinjoFonts;
}

export interface CsvRow {
  Item: string;
  Planned: string;
  Completed: string;
  Annotation?: string;
}

