import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import Confetti from "react-confetti";
import type { WOWProps, WOWOption, WOWConfettiConfig, WOWPointerConfig, WOWBorderConfig } from "./types";

const DEFAULT_COLORS = {
  segmentColors: ["#4cbba4", "#88be74"],
  text: "#ffffff",
  outerBorder: "#ffffff",
};

const DEFAULT_CONFETTI: WOWConfettiConfig = {
  enabled: true,
  numberOfPieces: 2000,
  gravity: 0.5,
  initialVelocityY: 50,
  recycle: false,
};

const DEFAULT_POINTER: WOWPointerConfig = {
  rotation: 310,
  width: 90,
  mobileWidth: 60,
  color: "#000000",
};

const DEFAULT_BORDER: WOWBorderConfig = {
  outerBorderWidth: 5,
  radiusLineWidth: 0,
  radiusLineColor: "#ffffff",
};

function normalizeOptions(
  options: string[] | WOWOption[],
  colors: { segmentColors: string[]; text: string }
) {
  return options.map((opt, index) => {
    const label = typeof opt === "string" ? opt : opt.label;
    const paddedLabel = label
      .padEnd(label.length + 3, " ")
      .padStart(label.length + 6, " ");

    const defaultBackgroundColor = colors.segmentColors[index % colors.segmentColors.length];

    if (typeof opt === "string") {
      return {
        option: paddedLabel,
        style: {
          backgroundColor: defaultBackgroundColor,
          textColor: colors.text,
        },
      };
    }

    return {
      option: paddedLabel,
      style: {
        backgroundColor: opt.backgroundColor ?? defaultBackgroundColor,
        textColor: opt.textColor ?? colors.text,
      },
    };
  });
}

function getConfettiConfig(confetti: WOWConfettiConfig | boolean | undefined): WOWConfettiConfig {
  if (confetti === false) return { ...DEFAULT_CONFETTI, enabled: false };
  if (confetti === true || confetti === undefined) return DEFAULT_CONFETTI;
  return { ...DEFAULT_CONFETTI, ...confetti };
}

function getPointerConfig(pointer: WOWPointerConfig | undefined): WOWPointerConfig {
  if (!pointer) return DEFAULT_POINTER;
  return { ...DEFAULT_POINTER, ...pointer };
}

function getBorderConfig(border: WOWBorderConfig | undefined): WOWBorderConfig {
  if (!border) return DEFAULT_BORDER;
  return { ...DEFAULT_BORDER, ...border };
}

export const WOW: React.FC<WOWProps> = ({
  options,
  colors,
  border,
  title = "Spin the Prize Wheel!",
  showTitle = true,
  spinDuration = 1,
  fontSize = 14,
  fontFamily = "monospace",
  fontWeight = 700,
  confetti,
  pointer,
  onSpinStart,
  onSpinEnd,
  className,
  mobileBreakpoint = 768,
}) => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const windowSize = {
    width: typeof window !== "undefined" ? window.innerWidth : 1024,
    height: typeof window !== "undefined" ? window.innerHeight : 768,
  };

  const mergedColors = {
    segmentColors: colors?.segmentColors ?? DEFAULT_COLORS.segmentColors,
    text: colors?.text ?? DEFAULT_COLORS.text,
    outerBorder: colors?.outerBorder ?? DEFAULT_COLORS.outerBorder,
  };
  
  const confettiConfig = getConfettiConfig(confetti);
  const pointerConfig = getPointerConfig(pointer);
  const borderConfig = getBorderConfig(border);
  const isMobile = windowSize.width < mobileBreakpoint;

  const data = normalizeOptions(options, mergedColors);

  const handleSpinClick = () => {
    if (mustSpin) return;
    setIsConfettiActive(false);
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    onSpinStart?.(newPrizeNumber);
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    if (confettiConfig.enabled) {
      setIsConfettiActive(true);
    }
    const originalOption = options[prizeNumber];
    const label = typeof originalOption === "string" ? originalOption : originalOption.label;
    onSpinEnd?.(prizeNumber, label);
  };

  const pointerWidth = isMobile
    ? (pointerConfig.mobileWidth ?? DEFAULT_POINTER.mobileWidth!)
    : (pointerConfig.width ?? DEFAULT_POINTER.width!);

  const confettiPieces = isMobile
    ? Math.floor((confettiConfig.numberOfPieces ?? DEFAULT_CONFETTI.numberOfPieces!) / 4)
    : confettiConfig.numberOfPieces ?? DEFAULT_CONFETTI.numberOfPieces!;

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "1rem" : "2.5rem",
        width: "100%",
      }}
    >
      {showTitle && (
        <h1
          style={{
            fontSize: isMobile ? "1.5rem" : "2.25rem",
            fontWeight: "bold",
            color: "#1f2937",
            marginBottom: isMobile ? "1rem" : "1.5rem",
            textAlign: "center",
          }}
        >
          {title}
        </h1>
      )}
      <div
        style={{
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          zIndex: 500,
        }}
        onClick={handleSpinClick}
      >
        <Wheel
          mustStartSpinning={mustSpin}
          prizeNumber={prizeNumber}
          data={data}
          backgroundColors={mergedColors.segmentColors}
          textColors={[mergedColors.text]}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          outerBorderColor={mergedColors.outerBorder}
          outerBorderWidth={borderConfig.outerBorderWidth}
          radiusLineWidth={borderConfig.radiusLineWidth}
          radiusLineColor={borderConfig.radiusLineColor}
          onStopSpinning={handleStopSpinning}
          spinDuration={spinDuration}
          pointerProps={
            pointerConfig.src
              ? {
                  src: pointerConfig.src,
                  style: {
                    transform: `rotate(${pointerConfig.rotation}deg)`,
                    width: `${pointerWidth}px`,
                    ...(pointerConfig.color && { filter: `drop-shadow(0 0 2px ${pointerConfig.color})` }),
                  },
                }
              : undefined
          }
        />
      </div>
      {isConfettiActive && confettiConfig.enabled && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height * 5}
          numberOfPieces={confettiPieces}
          recycle={confettiConfig.recycle ?? false}
          gravity={confettiConfig.gravity ?? 0.5}
          initialVelocityY={confettiConfig.initialVelocityY ?? 50}
        />
      )}
    </div>
  );
};

export default WOW;
