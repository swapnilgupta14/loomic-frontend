"use client";

import { Check } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

import { themeKeys, type ThemeName,themes } from "@/lib/themes";
import { cn } from "@/lib/utils";

/**
 * Theme Switcher Component
 * Allows users to select between different color themes
 * Works alongside dark mode - each theme has light and dark variants
 */
export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("default");
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
      document.documentElement.style.setProperty("--clr-surface-hover", `${bh} ${bs}% ${surfaceHoverL}%`);

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

  if (!mounted) {
    return (
      <div className="bg-clr-card border border-clr-border rounded-lg p-4 w-full max-w-md">
        <h3 className="text-sm font-semibold text-clr-foreground mb-3">Theme</h3>
        <div className="text-sm text-clr-muted-foreground">Loading themes...</div>
      </div>
    );
  }

  return (
    <div className="bg-clr-card border border-clr-border rounded-lg p-4 w-full max-w-md">
      <h3 className="text-sm font-semibold text-clr-foreground mb-3">Choose Theme</h3>

      <div className="grid grid-cols-2 gap-3">
        {themeKeys.map((key) => {
          const theme = themes[key];
          const isActive = currentTheme === key;
          const mode = darkMode === "dark" ? "dark" : "light";
          const themeColors = theme.colors[mode];

          return (
            <button
              key={key}
              onClick={() => applyTheme(key)}
              className={cn(
                "relative flex flex-col items-start p-3 rounded-lg border-2 transition-all",
                "hover:border-clr-primary",
                isActive
                  ? "border-clr-primary"
                  : "border-clr-border"
              )}
              style={{
                backgroundColor: isActive 
                  ? `hsl(${themeColors.background})` 
                  : `hsl(${themeColors.background})`,
                backgroundImage: isActive
                  ? `linear-gradient(135deg, hsl(${themeColors.primary} / 0.08), hsl(${themeColors.secondary} / 0.08))`
                  : 'none'
              }}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-2 right-2">
                  <Check className="h-4 w-4" style={{ color: `hsl(${themeColors.primary})` }} />
                </div>
              )}

              {/* Theme preview colors - with gradient */}
              <div className="flex gap-1 mb-2">
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{
                    background: `linear-gradient(135deg, hsl(${themeColors.primary}), hsl(${themeColors.secondary}))`,
                    borderColor: `hsl(${themeColors.primary} / 0.3)`
                  }}
                />
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{
                    background: `linear-gradient(135deg, hsl(${themeColors.secondary}), hsl(${themeColors.accent}))`,
                    borderColor: `hsl(${themeColors.secondary} / 0.3)`
                  }}
                />
                <div
                  className="w-4 h-4 rounded-full border"
                  style={{
                    background: `linear-gradient(135deg, hsl(${themeColors.accent}), hsl(${themeColors.primary}))`,
                    borderColor: `hsl(${themeColors.accent} / 0.3)`
                  }}
                />
              </div>

              {/* Theme name */}
              <div className="text-left">
                <div 
                  className="text-sm font-medium" 
                  style={{ color: `hsl(${themeColors.foreground})` }}
                >
                  {theme.name}
                </div>
                <div 
                  className="text-xs mt-0.5" 
                  style={{ color: `hsl(${themeColors.foreground} / 0.6)` }}
                >
                  {theme.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <p className="text-xs text-clr-muted-foreground mt-3">
        Themes adapt to light/dark mode automatically
      </p>
    </div>
  );
}

