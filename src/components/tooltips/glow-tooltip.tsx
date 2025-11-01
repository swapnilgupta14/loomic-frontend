"use client";

import { useState } from "react";

/**
 * Glow Tooltip Component
 * Tooltip with subtle glow effect on hover
 */

interface GlowTooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  glowColor?: "primary" | "secondary" | "accent";
}

export function GlowTooltip({
  content,
  children,
  position = "top",
  glowColor = "primary",
}: GlowTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const glowClasses = {
    primary: "shadow-clr-primary/30",
    secondary: "shadow-clr-secondary/30",
    accent: "shadow-clr-accent/30",
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
          className={`absolute z-50 px-3 py-1.5 text-xs font-medium text-clr-foreground bg-clr-card border border-clr-border rounded-lg shadow-xl ${glowClasses[glowColor]} whitespace-nowrap animate-fade-in ${positionClasses[position]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}

