"use client";

import { useState } from "react";

/**
 * Arrow Tooltip Component
 * Tooltip with a small arrow pointing to the target
 */

interface ArrowTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export function ArrowTooltip({ content, children, position = "top" }: ArrowTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 -mt-px border-t-clr-border border-l-transparent border-r-transparent border-b-transparent",
    bottom:
      "bottom-full left-1/2 -translate-x-1/2 -mb-px border-b-clr-border border-l-transparent border-r-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 -ml-px border-l-clr-border border-t-transparent border-b-transparent border-r-transparent",
    right:
      "right-full top-1/2 -translate-y-1/2 -mr-px border-r-clr-border border-t-transparent border-b-transparent border-l-transparent",
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
          {/* Arrow */}
          <div className={`absolute w-0 h-0 border-[5px] ${arrowClasses[position]}`} />
        </div>
      )}
    </div>
  );
}
