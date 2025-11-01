"use client";

import { useState } from "react";

/**
 * Basic Tooltip Component
 * Simple tooltip with fade animation
 */

interface BasicTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export function BasicTooltip({ content, children, position = "top" }: BasicTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
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
          className={`absolute z-50 px-3 py-1.5 text-xs font-medium text-clr-foreground bg-clr-card border border-clr-border rounded-lg shadow-lg whitespace-nowrap animate-fade-in ${positionClasses[position]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
