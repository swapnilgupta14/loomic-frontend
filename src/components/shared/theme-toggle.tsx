"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Theme toggle component with animated icon
 * Switches between light, dark, and system themes
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative h-10 w-10 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center justify-center"
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative h-10 w-10 rounded-lg border border-gray-200 dark:border-gray-800 
                 hover:bg-gray-100 dark:hover:bg-gray-800 
                 transition-colors duration-200 
                 flex items-center justify-center group"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <Sun
        className={`h-5 w-5 absolute transition-all duration-300 ${
          isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon
        className={`h-5 w-5 absolute transition-all duration-300 ${
          isDark
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
}

