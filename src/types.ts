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

export interface WOWOption {
  label: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface WOWColors {
  segmentColors?: string[];
  text?: string;
  outerBorder?: string;
}

export interface WOWBorderConfig {
  outerBorderWidth?: number;
  radiusLineWidth?: number;
  radiusLineColor?: string;
}

export interface WOWConfettiConfig {
  enabled?: boolean;
  numberOfPieces?: number;
  gravity?: number;
  initialVelocityY?: number;
  recycle?: boolean;
}

export interface WOWPointerConfig {
  src?: string;
  rotation?: number;
  width?: number;
  mobileWidth?: number;
  color?: string;
}

export interface WOWProps {
  options: string[] | WOWOption[];
  colors?: WOWColors;
  border?: WOWBorderConfig;
  title?: string;
  showTitle?: boolean;
  spinDuration?: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  confetti?: WOWConfettiConfig | boolean;
  pointer?: WOWPointerConfig;
  onSpinStart?: (prizeIndex: number) => void;
  onSpinEnd?: (prizeIndex: number, prizeLabel: string) => void;
  className?: string;
  mobileBreakpoint?: number;
}

