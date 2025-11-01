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

      // Apply ONLY branding colors (primary, secondary, accent)
      // Background/foreground stays with dark/light mode
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

          return (
            <button
              key={key}
              onClick={() => applyTheme(key)}
              className={cn(
                "relative flex flex-col items-start p-3 rounded-lg border-2 transition-all",
                "hover:border-clr-primary hover:bg-clr-primary-subtle",
                isActive
                  ? "border-clr-primary bg-clr-primary-subtle"
                  : "border-clr-border bg-clr-surface"
              )}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-2 right-2">
                  <Check className="h-4 w-4 text-clr-primary" />
                </div>
              )}

              {/* Theme preview colors */}
              <div className="flex gap-1 mb-2">
                <div
                  className="w-4 h-4 rounded-full border border-clr-border"
                  style={{
                    backgroundColor: `hsl(${theme.colors.light.primary})`,
                  }}
                />
                <div
                  className="w-4 h-4 rounded-full border border-clr-border"
                  style={{
                    backgroundColor: `hsl(${theme.colors.light.secondary})`,
                  }}
                />
                <div
                  className="w-4 h-4 rounded-full border border-clr-border"
                  style={{
                    backgroundColor: `hsl(${theme.colors.light.accent})`,
                  }}
                />
              </div>

              {/* Theme name */}
              <div className="text-left">
                <div className="text-sm font-medium text-clr-foreground">{theme.name}</div>
                <div className="text-xs text-clr-muted-foreground mt-0.5">
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

