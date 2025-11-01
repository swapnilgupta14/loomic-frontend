"use client";

import { useEffect, useState } from "react";

/**
 * Delay Tooltip Component
 * Tooltip with configurable show/hide delay
 */

interface DelayTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number; // delay in milliseconds
}

export function DelayTooltip({
  content,
  children,
  position = "top",
  delay = 500,
}: DelayTooltipProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isHovering) {
      timeout = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    } else {
      setIsVisible(false);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isHovering, delay]);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
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

