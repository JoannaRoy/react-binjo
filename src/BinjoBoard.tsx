import { useState } from "react";
import styled from "styled-components";
import { PieChart } from "./PieChart";
import { Tooltip } from "./Tooltip";
import type { BinjoBoardProps, BinjoItem, BinjoFonts } from "./types";


const DEFAULT_COLORS = {
  completed: "#82ca9d",
  planned: "#8884d8",
  remaining: "#75c8d3",
  cellEven: "#d8b4fe",
  cellOdd: "#93c5fd",
  centerCell: "linear-gradient(135deg, #86efac, #c084fc)",
  titleText: "#1a1a1a",
  cellText: "#1a1a1a",
  centerCellText: "#1a1a1a",
};

const DEFAULT_FONTS: BinjoFonts = {
  title: "'Fredoka', system-ui, sans-serif",
  cell: "system-ui, -apple-system, sans-serif",
};

const BoardContainer = styled.div<{ $fontFamily: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-family: ${(props) => props.$fontFamily};
`;

const BoardBox = styled.div`
  padding: 0.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  overflow: visible;

  @media (min-width: 768px) {
    padding: 1rem;
    max-width: 34rem;
  }

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.2);

    @media (min-width: 768px) {
      transform: scale(1.05);
    }
  }
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.25rem;
  margin-bottom: 0.5rem;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, minmax(5rem, 6rem));
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
`;

const HeaderLetter = styled.div<{ $fontFamily: string; $textColor: string }>`
  font-family: ${(props) => props.$fontFamily};
  font-weight: 600;
  color: ${(props) => props.$textColor};
  text-align: center;
  font-size: clamp(1.5rem, 5vw, 3rem);
  letter-spacing: 0.02em;
`;

const Title = styled.h1<{ $fontFamily: string; $textColor: string }>`
  font-family: ${(props) => props.$fontFamily};
  font-weight: 600;
  color: ${(props) => props.$textColor};
  text-align: center;
  font-size: clamp(1.5rem, 5vw, 3rem);
  letter-spacing: 0.05em;
  margin: 0 0 0.5rem 0;

  @media (min-width: 768px) {
    margin: 0 0 1rem 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.25rem;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, minmax(5rem, 6rem));
    gap: 0.5rem;
  }
`;

const Cell = styled.div<{ $background: string; $isCenter: boolean; $fontFamily: string; $textColor: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.$textColor};
  text-align: center;
  font-size: clamp(0.5rem, 2vw, 0.625rem);
  font-weight: 600;
  border-radius: 0.5rem;
  padding: 0.125rem;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 3.5rem;
  cursor: pointer;
  overflow: hidden;
  background: ${(props) => props.$background};
  font-family: ${(props) => props.$fontFamily};
  ${(props) => props.$isCenter && "font-weight: bold; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"}

  @media (min-width: 768px) {
    font-size: 0.75rem;
    padding: 0.5rem;
    min-height: 6rem;
  }
`;

const ItemLabel = styled.span<{ $textLength: number }>`
  opacity: 1;
  z-index: 10;
  word-break: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  max-width: 100%;
  line-height: 1.1;
  font-size: ${(props) => {
    if (props.$textLength > 20) return 'clamp(0.4rem, 1.5vw, 0.5rem)';
    if (props.$textLength > 15) return 'clamp(0.45rem, 1.7vw, 0.55rem)';
    if (props.$textLength > 10) return 'clamp(0.5rem, 1.8vw, 0.6rem)';
    return 'inherit';
  }};

  @media (min-width: 768px) {
    font-size: ${(props) => {
      if (props.$textLength > 25) return '0.6rem';
      if (props.$textLength > 20) return '0.65rem';
      if (props.$textLength > 15) return '0.7rem';
      return 'inherit';
    }};
  }
`;

const StarOverlay = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CellTooltip = styled(Tooltip)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 25;
`;

const DefaultStar = styled.svg`
  width: 85%;
  height: 85%;
  z-index: 1;
`;

const ChartOverlay = styled.div<{ $isMobile: boolean }>`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  z-index: 20;
  overflow: visible;
  padding: ${(props) => (props.$isMobile ? "0.25rem" : "0.5rem")};

  @media (max-width: 640px) {
    display: ${(props) => (props.$isMobile ? "flex" : "none")};
  }

  @media (min-width: 641px) {
    display: ${(props) => (props.$isMobile ? "none" : "flex")};
  }
`;

function DefaultStarIcon() {
  return (
    <DefaultStar viewBox="0 0 24 24" fill="#fbbf24">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </DefaultStar>
  );
}

export function BinjoBoard({
  data,
  colors: userColors,
  title = "BINJO",
  starIcon,
  className,
  fonts: userFonts,
}: BinjoBoardProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoverTimestamp, setHoverTimestamp] = useState(0);

  const colors = { ...DEFAULT_COLORS, ...userColors };
  const fonts = { ...DEFAULT_FONTS, ...userFonts };
  const centerIndex = 12;

  const normalizedData: BinjoItem[] = data.map((item) => ({
    ...item,
    remaining: item.remaining ?? 100 - item.completed - item.planned,
  }));

  const getCellBackground = (index: number) => {
    if (index === centerIndex) return colors.centerCell;
    return index % 2 === 0 ? colors.cellEven : colors.cellOdd;
  };

  const renderStar = () => {
    if (typeof starIcon === "string") {
      return <img src={starIcon} alt="Complete" style={{ width: "90%", height: "90%", opacity: 0.9 }} />;
    }
    if (starIcon) return starIcon;
    return <DefaultStarIcon />;
  };

  const isFiveLetters = title.length === 5;

  return (
    <BoardContainer className={className} $fontFamily={fonts.cell!}>
      <BoardBox>
        {title && (
          isFiveLetters ? (
            <HeaderRow>
              {title.split("").map((letter, i) => (
                <HeaderLetter key={i} $fontFamily={fonts.title!} $textColor={colors.titleText!}>{letter}</HeaderLetter>
              ))}
            </HeaderRow>
          ) : (
            <Title $fontFamily={fonts.title!} $textColor={colors.titleText!}>{title}</Title>
          )
        )}

        <Grid>
          {normalizedData.slice(0, 25).map((item, index) => (
            <Cell
              key={index}
              $background={getCellBackground(index)}
              $isCenter={index === centerIndex}
              $fontFamily={fonts.cell!}
              $textColor={index === centerIndex ? colors.centerCellText! : colors.cellText!}
              onMouseEnter={() => {
                setHoverTimestamp(Date.now());
                setHoveredItem(item.item);
              }}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <ItemLabel $textLength={item.item.length}>{item.item}</ItemLabel>

              {item.completed === 100 && <StarOverlay>{renderStar()}</StarOverlay>}

              {item.completed === 100 && hoveredItem === item.item && item.annotation && (
                <CellTooltip>{item.annotation}</CellTooltip>
              )}

              {item.completed !== 100 && hoveredItem === item.item && (
                <ChartOverlay key={`chart-${item.item}-${hoverTimestamp}`} $isMobile={false}>
                  <PieChart
                    completed={item.completed}
                    planned={item.planned}
                    remaining={item.remaining!}
                    colors={{ completed: colors.completed, planned: colors.planned, remaining: colors.remaining }}
                  />
                </ChartOverlay>
              )}
            </Cell>
          ))}
        </Grid>
      </BoardBox>
    </BoardContainer>
  );
}

