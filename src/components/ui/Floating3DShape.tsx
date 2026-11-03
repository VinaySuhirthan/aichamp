"use client";

import React from "react";

export interface Floating3DShapeProps {
  variant?: "sphere" | "blob" | "ellipsoid" | "pill";
  theme?: "cyan" | "lavender" | "rose" | "ice" | "mint";
  size?: number; // width in px
  path?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  delay?: number; // delay in seconds (supports negative values like -8s)
  className?: string;
  style?: React.CSSProperties;
}

export default function Floating3DShape({
  variant = "sphere",
  theme = "cyan",
  size = 140,
  path,
  delay = 0,
  className = "",
  style = {},
}: Floating3DShapeProps) {
  // Theme gradients & shadows matching the strict warm cream / navy / cyan / lavender / pink / mint palette
  const themeStyles = {
    cyan: {
      gradient:
        "radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.98) 0%, rgba(224, 242, 254, 0.85) 16%, rgba(56, 189, 248, 0.48) 46%, rgba(14, 165, 233, 0.32) 75%, rgba(2, 132, 199, 0.2) 100%)",
      shadow:
        "inset -10px -10px 22px rgba(2, 132, 199, 0.22), inset 8px 8px 18px rgba(255, 255, 255, 0.95), inset -2px -2px 6px rgba(56, 189, 248, 0.3), 0 20px 38px -10px rgba(2, 132, 199, 0.16), 0 8px 18px -4px rgba(14, 165, 233, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.75)",
      glow: "rgba(56, 189, 248, 0.24)",
    },
    lavender: {
      gradient:
        "radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.98) 0%, rgba(238, 242, 255, 0.85) 16%, rgba(165, 180, 252, 0.46) 46%, rgba(129, 140, 248, 0.32) 75%, rgba(99, 102, 241, 0.2) 100%)",
      shadow:
        "inset -10px -10px 22px rgba(99, 102, 241, 0.2), inset 8px 8px 18px rgba(255, 255, 255, 0.95), inset -2px -2px 6px rgba(192, 132, 252, 0.28), 0 20px 38px -10px rgba(99, 102, 241, 0.14), 0 8px 18px -4px rgba(129, 140, 248, 0.09)",
      border: "1px solid rgba(255, 255, 255, 0.75)",
      glow: "rgba(129, 140, 248, 0.22)",
    },
    rose: {
      gradient:
        "radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 241, 242, 0.85) 16%, rgba(244, 114, 182, 0.4) 46%, rgba(251, 113, 133, 0.28) 75%, rgba(225, 29, 72, 0.16) 100%)",
      shadow:
        "inset -10px -10px 22px rgba(244, 114, 182, 0.2), inset 8px 8px 18px rgba(255, 255, 255, 0.95), inset -2px -2px 6px rgba(251, 146, 60, 0.25), 0 20px 38px -10px rgba(244, 114, 182, 0.14), 0 8px 18px -4px rgba(251, 113, 133, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.75)",
      glow: "rgba(244, 114, 182, 0.2)",
    },
    ice: {
      gradient:
        "radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.98) 0%, rgba(240, 253, 250, 0.85) 16%, rgba(45, 212, 191, 0.42) 46%, rgba(56, 189, 248, 0.3) 75%, rgba(14, 165, 233, 0.18) 100%)",
      shadow:
        "inset -10px -10px 22px rgba(13, 148, 136, 0.2), inset 8px 8px 18px rgba(255, 255, 255, 0.95), inset -2px -2px 6px rgba(56, 189, 248, 0.28), 0 20px 38px -10px rgba(13, 148, 136, 0.14), 0 8px 18px -4px rgba(45, 212, 191, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.75)",
      glow: "rgba(45, 212, 191, 0.22)",
    },
    mint: {
      gradient:
        "radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.98) 0%, rgba(240, 253, 244, 0.85) 16%, rgba(52, 211, 153, 0.4) 46%, rgba(16, 185, 129, 0.28) 75%, rgba(5, 150, 105, 0.16) 100%)",
      shadow:
        "inset -10px -10px 22px rgba(5, 150, 105, 0.2), inset 8px 8px 18px rgba(255, 255, 255, 0.95), inset -2px -2px 6px rgba(52, 211, 153, 0.25), 0 20px 38px -10px rgba(5, 150, 105, 0.14), 0 8px 18px -4px rgba(16, 185, 129, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.75)",
      glow: "rgba(52, 211, 153, 0.22)",
    },
  }[theme];

  // Determine path: if not explicitly specified, auto-pick based on left vs right positioning in className
  let chosenPath = path;
  if (!chosenPath) {
    if (className.includes("-right") || className.includes("right-")) {
      chosenPath = 5; // Default right path
    } else {
      chosenPath = 1; // Default left path
    }
  }

  const pathClassMap: Record<number, string> = {
    1: "animate-border-drift-left-1",
    2: "animate-border-drift-left-2",
    3: "animate-border-drift-left-3",
    4: "animate-border-drift-left-4",
    5: "animate-border-drift-right-1",
    6: "animate-border-drift-right-2",
    7: "animate-border-drift-right-3",
    8: "animate-border-drift-right-4",
  };

  const animClass = pathClassMap[chosenPath] || "animate-border-drift-left-1";

  const isBlob = variant === "blob";
  const isEllipsoid = variant === "ellipsoid";
  const isPill = variant === "pill";

  const height = isEllipsoid ? Math.round(size * 0.72) : isPill ? Math.round(size * 1.35) : size;

  return (
    <div
      className={`pointer-events-none select-none z-0 absolute ${animClass} ${className}`}
      style={{
        width: `${size}px`,
        height: `${height}px`,
        animationDelay: delay !== 0 ? `${delay}s` : undefined,
        contain: "paint layout",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
        ...style,
      }}
      aria-hidden="true"
    >
      <div
        className={`relative w-full h-full ${
          isBlob ? "animate-blob-morph" : ""
        }`}
        style={{
          background: themeStyles.gradient,
          boxShadow: themeStyles.shadow,
          border: themeStyles.border,
          borderRadius: isBlob
            ? "60% 40% 30% 70% / 60% 30% 70% 40%"
            : isEllipsoid
            ? "50%"
            : isPill
            ? "9999px"
            : "50%",
        }}
      >
        {/* Primary Specular Glint Oval */}
        <div
          className="absolute rounded-full"
          style={{
            top: "14%",
            left: "18%",
            width: "36%",
            height: "22%",
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.96) 0%, rgba(255, 255, 255, 0) 100%)",
            transform: "rotate(-30deg)",
            filter: "blur(0.8px)",
          }}
        />

        {/* Secondary Delicate Micro-Highlight Dot */}
        <div
          className="absolute rounded-full"
          style={{
            top: "28%",
            left: "14%",
            width: "8%",
            height: "8%",
            background: "rgba(255, 255, 255, 0.92)",
            filter: "blur(0.5px)",
          }}
        />

        {/* Subtle Ambient Back-Glow */}
        <div
          className="absolute -inset-4 rounded-full pointer-events-none -z-10"
          style={{
            background: `radial-gradient(circle, ${themeStyles.glow} 0%, transparent 70%)`,
            filter: "blur(22px)",
          }}
        />
      </div>
    </div>
  );
}
