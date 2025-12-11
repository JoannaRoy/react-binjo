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
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  width: 100%;
  max-width: 34rem;
  margin: 0 auto;
  overflow: visible;

  @media (max-width: 640px) {
    padding: 0.5rem;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.2);
  }
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(4rem, 6rem));
  gap: 0.5rem;
  margin-bottom: 1rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 0.25rem;
  }
`;

const HeaderLetter = styled.div<{ $fontFamily: string }>`
  font-family: ${(props) => props.$fontFamily};
  font-weight: 600;
  color: #1a1a1a;
  text-align: center;
  font-size: clamp(1.8rem, 7vw, 3rem);
  letter-spacing: 0.02em;
`;

const Title = styled.h1<{ $fontFamily: string }>`
  font-family: ${(props) => props.$fontFamily};
  font-weight: 600;
  color: #1a1a1a;
  text-align: center;
  font-size: clamp(1.8rem, 7vw, 3rem);
  letter-spacing: 0.05em;
  margin: 0 0 1rem 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(4rem, 6rem));
  gap: 0.5rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(5, 1fr);
    gap: 0.25rem;
  }
`;

const Cell = styled.div<{ $background: string; $isCenter: boolean; $fontFamily: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #1a1a1a;
  text-align: center;
  font-size: 0.625rem;
  font-weight: 600;
  border-radius: 0.5rem;
  padding: 0.5rem;
  position: relative;
  width: 4rem;
  height: 4rem;
  cursor: pointer;
  overflow: visible;
  background: ${(props) => props.$background};
  font-family: ${(props) => props.$fontFamily};
  ${(props) => props.$isCenter && "font-weight: bold; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"}

  @media (min-width: 768px) {
    width: 6rem;
    height: 6rem;
    font-size: 0.75rem;
  }
`;

const ItemLabel = styled.span`
  opacity: 1;
  z-index: 10;
  font-size: 0.625rem;
  margin-bottom: 0.25rem;

  @media (min-width: 768px) {
    font-size: 0.75rem;
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
                <HeaderLetter key={i} $fontFamily={fonts.title!}>{letter}</HeaderLetter>
              ))}
            </HeaderRow>
          ) : (
            <Title $fontFamily={fonts.title!}>{title}</Title>
          )
        )}

        <Grid>
          {normalizedData.slice(0, 25).map((item, index) => (
            <Cell
              key={index}
              $background={getCellBackground(index)}
              $isCenter={index === centerIndex}
              $fontFamily={fonts.cell!}
              onMouseEnter={() => {
                setHoverTimestamp(Date.now());
                setHoveredItem(item.item);
              }}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <ItemLabel>{item.item}</ItemLabel>

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

