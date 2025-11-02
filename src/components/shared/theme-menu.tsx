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

      // Apply ALL theme colors including background and foreground
      document.documentElement.style.setProperty("--clr-background", colors.background);
      document.documentElement.style.setProperty("--clr-foreground", colors.foreground);
      document.documentElement.style.setProperty("--clr-primary", colors.primary);
      document.documentElement.style.setProperty("--clr-secondary", colors.secondary);
      document.documentElement.style.setProperty("--clr-accent", colors.accent);

      // Update surface colors based on background
      const [bh, bs, bl] = colors.background.split(" ").map((v) => parseFloat(v));
      const cardL = mode === "dark" ? bl + 3 : bl - 2;
      const surfaceL = mode === "dark" ? bl + 5 : bl - 4;
      const surfaceHoverL = mode === "dark" ? bl + 7 : bl - 6;

      document.documentElement.style.setProperty("--clr-card", `${bh} ${bs}% ${cardL}%`);
      document.documentElement.style.setProperty("--clr-surface", `${bh} ${bs}% ${surfaceL}%`);
      document.documentElement.style.setProperty(
        "--clr-surface-hover",
        `${bh} ${bs}% ${surfaceHoverL}%`
      );

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
      document.documentElement.style.setProperty(
        "--clr-secondary-hover",
        `${sh} ${ss}% ${secHoverL}%`
      );
      document.documentElement.style.setProperty(
        "--clr-secondary-subtle",
        `${sh} ${ss}% ${subtleL}%`
      );

      // Accent
      const [ah, as, al] = colors.accent.split(" ").map((v) => parseFloat(v));
      const accHoverL = mode === "dark" ? al + 10 : al - 10;
      document.documentElement.style.setProperty(
        "--clr-accent-hover",
        `${ah} ${as}% ${accHoverL}%`
      );
      document.documentElement.style.setProperty("--clr-accent-subtle", `${ah} ${as}% ${subtleL}%`);

      // Save to localStorage
      localStorage.setItem("loomic-theme", themeName);
      setCurrentTheme(themeName);

      // Dispatch custom event for iframe updates with theme data
      window.dispatchEvent(
        new CustomEvent("theme-changed", {
          detail: { theme: themeName },
        })
      );
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

  // Listen for ThemeToggle opening to close this menu
  useEffect(() => {
    const handleOtherMenuOpen = () => {
      setIsOpen(false);
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        setCloseTimeout(null);
      }
    };

    window.addEventListener("theme-toggle-opened", handleOtherMenuOpen);
    return () => window.removeEventListener("theme-toggle-opened", handleOtherMenuOpen);
  }, [closeTimeout]);

  if (!mounted) {
    return (
      <button
        className="relative w-10 h-10 rounded-lg border border-clr-border flex items-center justify-center"
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
    // Notify other menus to close
    window.dispatchEvent(new Event("theme-menu-opened"));
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
          "relative w-10 h-10 rounded-lg border transition-all flex items-center justify-center",
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
        <div className="absolute top-full right-0 mt-6 w-80 bg-clr-card border border-clr-border rounded-lg shadow-2xl p-3 z-50 animate-fade-in">
          <h3 className="text-xs font-semibold text-clr-muted-foreground uppercase tracking-wider mb-2">
            Choose Theme
          </h3>

          <div className="space-y-1">
            {themeKeys.map((key) => {
              const theme = themes[key];
              const isActive = currentTheme === key;
              const mode = darkMode === "dark" ? "dark" : "light";
              const themeColors = theme.colors[mode];

              return (
                <button
                  key={key}
                  onClick={() => {
                    applyTheme(key);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 p-2 rounded-md transition-all text-left border",
                    isActive ? "border-opacity-40" : "border-transparent"
                  )}
                  style={{
                    backgroundColor: `hsl(${themeColors.background})`,
                    borderColor: isActive ? `hsl(${themeColors.primary})` : "transparent",
                    backgroundImage: isActive
                      ? `linear-gradient(90deg, hsl(${themeColors.primary} / 0.05), hsl(${themeColors.secondary} / 0.05))`
                      : "none",
                  }}
                >
                  {/* Color Preview Dots - with gradient */}
                  <div className="flex gap-0.5">
                    <div
                      className="w-3 h-3 rounded-full border"
                      style={{
                        background: `linear-gradient(135deg, hsl(${themeColors.primary}), hsl(${themeColors.secondary}))`,
                        borderColor: `hsl(${themeColors.primary} / 0.3)`,
                      }}
                    />
                    <div
                      className="w-3 h-3 rounded-full border"
                      style={{
                        background: `linear-gradient(135deg, hsl(${themeColors.secondary}), hsl(${themeColors.accent}))`,
                        borderColor: `hsl(${themeColors.secondary} / 0.3)`,
                      }}
                    />
                    <div
                      className="w-3 h-3 rounded-full border"
                      style={{
                        background: `linear-gradient(135deg, hsl(${themeColors.accent}), hsl(${themeColors.primary}))`,
                        borderColor: `hsl(${themeColors.accent} / 0.3)`,
                      }}
                    />
                  </div>

                  {/* Theme Name */}
                  <div className="flex-1">
                    <div
                      className="text-sm font-medium"
                      style={{ color: `hsl(${themeColors.foreground})` }}
                    >
                      {theme.name}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: `hsl(${themeColors.foreground} / 0.6)` }}
                    >
                      {theme.description}
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <Check className="h-4 w-4" style={{ color: `hsl(${themeColors.primary})` }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
