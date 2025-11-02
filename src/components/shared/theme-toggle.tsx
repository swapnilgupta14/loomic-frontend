"use client";

import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Theme Mode Menu Component
 * Allows users to select between Dark, Light, and System modes
 * Opens on hover with menu similar to ThemeMenu
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const { theme, setTheme, systemTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [closeTimeout]);

  // Listen for ThemeMenu opening to close this menu
  useEffect(() => {
    const handleOtherMenuOpen = () => {
      setIsOpen(false);
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        setCloseTimeout(null);
      }
    };

    window.addEventListener("theme-menu-opened", handleOtherMenuOpen);
    return () => window.removeEventListener("theme-menu-opened", handleOtherMenuOpen);
  }, [closeTimeout]);

  if (!mounted) {
    return (
      <button
        className="relative p-2 rounded-lg border border-clr-border flex items-center justify-center"
        aria-label="Theme mode selector"
      >
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setIsOpen(true);
    // Notify other menus to close
    window.dispatchEvent(new Event("theme-toggle-opened"));
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 200); // 200ms delay before closing
    setCloseTimeout(timeout);
  };

  const handleModeSelect = (mode: "light" | "dark" | "system") => {
    setTheme(mode);
    setIsOpen(false);
  };

  // Determine current display icon
  const isDark = theme === "dark" || (theme === "system" && systemTheme === "dark");

  const modes = [
    {
      id: "light",
      name: "Light",
      description: "Light mode",
      icon: Sun,
    },
    {
      id: "dark",
      name: "Dark",
      description: "Dark mode",
      icon: Moon,
    },
    {
      id: "system",
      name: "System",
      description: "Use system preference",
      icon: Monitor,
    },
  ] as const;

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Icon Button */}
      <button
        className={cn(
          "relative w-10 h-10 rounded-lg border transition-all flex items-center justify-center",
          isOpen
            ? "border-clr-primary bg-clr-primary-subtle"
            : "border-clr-border hover:bg-clr-surface-hover"
        )}
        aria-label="Theme mode selector"
      >
        <div className="relative w-5 h-5">
          <Sun
            className={cn(
              "h-5 w-5 absolute inset-0 transition-all duration-300",
              isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100",
              isOpen ? "text-clr-primary" : "text-clr-foreground"
            )}
          />
          <Moon
            className={cn(
              "h-5 w-5 absolute inset-0 transition-all duration-300",
              isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0",
              isOpen ? "text-clr-primary" : "text-clr-foreground"
            )}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-6 w-64 bg-clr-card border border-clr-border rounded-lg shadow-2xl p-3 z-50 animate-fade-in">
          <h3 className="text-xs font-semibold text-clr-muted-foreground uppercase tracking-wider mb-2">
            Display Mode
          </h3>

          <div className="space-y-1">
            {modes.map((mode) => {
              const isActive = theme === mode.id;
              const Icon = mode.icon;

              return (
                <button
                  key={mode.id}
                  onClick={() => handleModeSelect(mode.id)}
                  className={cn(
                    "w-full flex items-center gap-3 p-2 rounded-md transition-all text-left",
                    "hover:bg-clr-primary-subtle",
                    isActive ? "bg-clr-primary-subtle" : ""
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "w-8 h-8 rounded-md flex items-center justify-center transition-colors",
                      isActive
                        ? "bg-clr-primary text-clr-primary-foreground"
                        : "bg-clr-surface text-clr-muted-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  {/* Name & Description */}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-clr-foreground">{mode.name}</div>
                    <div className="text-xs text-clr-muted-foreground">{mode.description}</div>
                  </div>

                  {/* Active Indicator */}
                  {isActive && <Check className="h-4 w-4 text-clr-primary" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
