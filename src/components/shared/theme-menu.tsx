"use client";

import { Check, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

import { themeKeys, type ThemeName, themes } from "@/lib/themes";
import { cn } from "@/lib/utils";

/**
 * Compact Theme Menu for Header
 * Opens on hover, shows theme options
 */
export function ThemeMenu() {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("default");
  const [isOpen, setIsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  const { theme: darkMode } = useTheme();

  const applyTheme = useCallback(
    (themeName: ThemeName) => {
      const theme = themes[themeName];
      const mode = darkMode === "dark" ? "dark" : "light";
      const colors = theme.colors[mode];

      // Apply ONLY branding colors (primary, secondary, accent)
      // Background stays with the dark/light mode theme
      document.documentElement.style.setProperty("--clr-primary", colors.primary);
      document.documentElement.style.setProperty("--clr-secondary", colors.secondary);
      document.documentElement.style.setProperty("--clr-accent", colors.accent);

      // Update hover states and subtle variants
      const subtleL = mode === "dark" ? 15 : 97;

      // Primary
      const [h, s, l] = colors.primary.split(" ").map((v) => parseFloat(v));
      const hoverL = mode === "dark" ? l + 10 : l - 10;
      document.documentElement.style.setProperty("--clr-primary-hover", `${h} ${s}% ${hoverL}%`);
      document.documentElement.style.setProperty("--clr-primary-subtle", `${h} ${s}% ${subtleL}%`);

      // Secondary
      const [sh, ss, sl] = colors.secondary.split(" ").map((v) => parseFloat(v));
      const secHoverL = mode === "dark" ? sl + 10 : sl - 10;
      document.documentElement.style.setProperty("--clr-secondary-hover", `${sh} ${ss}% ${secHoverL}%`);
      document.documentElement.style.setProperty("--clr-secondary-subtle", `${sh} ${ss}% ${subtleL}%`);

      // Accent
      const [ah, as, al] = colors.accent.split(" ").map((v) => parseFloat(v));
      const accHoverL = mode === "dark" ? al + 10 : al - 10;
      document.documentElement.style.setProperty("--clr-accent-hover", `${ah} ${as}% ${accHoverL}%`);
      document.documentElement.style.setProperty("--clr-accent-subtle", `${ah} ${as}% ${subtleL}%`);

      // Save to localStorage
      localStorage.setItem("loomic-theme", themeName);
      setCurrentTheme(themeName);

      // Dispatch custom event for iframe updates with theme data
      window.dispatchEvent(new CustomEvent("theme-changed", { 
        detail: { theme: themeName } 
      }));
    },
    [darkMode]
  );

  // Load saved theme from localStorage
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("loomic-theme") as ThemeName;
    if (saved && themes[saved]) {
      setCurrentTheme(saved);
      applyTheme(saved);
    }
  }, [applyTheme]);

  // Re-apply theme when dark mode changes
  useEffect(() => {
    if (mounted) {
      applyTheme(currentTheme);
    }
  }, [darkMode, mounted, currentTheme, applyTheme]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [closeTimeout]);

  if (!mounted) {
    return (
      <button
        className="relative p-2 rounded-lg border border-clr-border hover:bg-clr-surface-hover transition-colors"
        aria-label="Theme selector"
      >
        <Palette className="h-5 w-5 text-clr-foreground" />
      </button>
    );
  }

  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 200); // 200ms delay before closing
    setCloseTimeout(timeout);
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Icon Button */}
      <button
        className={cn(
          "relative p-2 rounded-lg border transition-all",
          isOpen
            ? "border-clr-primary bg-clr-primary-subtle"
            : "border-clr-border hover:bg-clr-surface-hover"
        )}
        aria-label="Theme selector"
      >
        <Palette className={cn("h-5 w-5", isOpen ? "text-clr-primary" : "text-clr-foreground")} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-80 bg-clr-card border border-clr-border rounded-lg shadow-2xl p-3 z-50 animate-fade-in">
          <h3 className="text-xs font-semibold text-clr-muted-foreground uppercase tracking-wider mb-2">
            Choose Theme
          </h3>

          <div className="space-y-1">
            {themeKeys.map((key) => {
              const theme = themes[key];
              const isActive = currentTheme === key;

              return (
                <button
                  key={key}
                  onClick={() => {
                    applyTheme(key);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 p-2 rounded-md transition-all text-left",
                    "hover:bg-clr-primary-subtle",
                    isActive ? "bg-clr-primary-subtle" : ""
                  )}
                >
                  {/* Color Preview Dots */}
                  <div className="flex gap-0.5">
                    <div
                      className="w-3 h-3 rounded-full border border-clr-border"
                      style={{
                        backgroundColor: `hsl(${theme.colors.light.primary})`,
                      }}
                    />
                    <div
                      className="w-3 h-3 rounded-full border border-clr-border"
                      style={{
                        backgroundColor: `hsl(${theme.colors.light.secondary})`,
                      }}
                    />
                    <div
                      className="w-3 h-3 rounded-full border border-clr-border"
                      style={{
                        backgroundColor: `hsl(${theme.colors.light.accent})`,
                      }}
                    />
                  </div>

                  {/* Theme Name */}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-clr-foreground">{theme.name}</div>
                    <div className="text-xs text-clr-muted-foreground">{theme.description}</div>
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
