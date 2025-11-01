"use client";

import { useState } from "react";

/**
 * Slide Tooltip Component
 * Tooltip with slide-in animation based on position
 */

interface SlideTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export function SlideTooltip({ content, children, position = "top" }: SlideTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const animationClasses = {
    top: "animate-slide-up",
    bottom: "animate-slide-down",
    left: "animate-slide-up", // reusing slide-up for left
    right: "animate-slide-down", // reusing slide-down for right
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute z-50 px-3 py-1.5 text-xs font-medium text-clr-foreground bg-clr-card border border-clr-border rounded-lg shadow-lg whitespace-nowrap ${positionClasses[position]} ${animationClasses[position]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}

