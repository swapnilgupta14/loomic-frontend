/**
 * Loomic Theme Definitions
 * Each theme defines all CLR- prefix token values
 */

export const themes = {
  default: {
    name: "Pitch Black",
    description: "Pure black with neon ambience",
    colors: {
      light: {
        primary: "180 100% 50%", // Cyan
        secondary: "280 100% 60%", // Electric Purple
        accent: "330 100% 50%", // Neon Pink
        background: "0 0% 98%",
        foreground: "0 0% 10%",
      },
      dark: {
        primary: "180 100% 60%", // Glowing Cyan
        secondary: "280 100% 70%", // Electric Purple
        accent: "330 100% 60%", // Neon Pink
        background: "0 0% 3%", // Pitch Black (#080808)
        foreground: "0 0% 95%", // Soft White
      },
    },
  },
  loomic: {
    name: "Loomic",
    description: "Premium violet and teal",
    colors: {
      light: {
        primary: "258 90% 66%", // Violet
        secondary: "173 80% 40%", // Teal
        accent: "250 90% 60%", // Purple-Blue
        background: "0 0% 100%",
        foreground: "222.2 84% 4.9%",
      },
      dark: {
        primary: "258 90% 66%",
        secondary: "173 80% 50%",
        accent: "250 90% 70%",
        background: "0 0% 10%", // Rich black
        foreground: "0 0% 94%",
      },
    },
  },
  ocean: {
    name: "Ocean",
    description: "Deep blues and cyan",
    colors: {
      light: {
        primary: "200 100% 45%", // Blue
        secondary: "185 100% 40%", // Cyan
        accent: "220 90% 50%", // Deep blue
        background: "200 40% 98%", // Very light blue
        foreground: "200 100% 10%",
      },
      dark: {
        primary: "200 100% 55%",
        secondary: "185 100% 50%",
        accent: "220 90% 65%",
        background: "200 60% 8%", // Deep ocean blue
        foreground: "200 20% 94%",
      },
    },
  },
  sunset: {
    name: "Sunset",
    description: "Warm oranges and pinks",
    colors: {
      light: {
        primary: "15 100% 55%", // Orange
        secondary: "350 100% 60%", // Pink
        accent: "30 100% 50%", // Gold
        background: "20 60% 98%", // Warm white
        foreground: "15 80% 15%",
      },
      dark: {
        primary: "15 100% 65%",
        secondary: "350 100% 70%",
        accent: "30 100% 60%",
        background: "15 40% 12%", // Warm dark
        foreground: "20 30% 92%",
      },
    },
  },
  forest: {
    name: "Forest",
    description: "Natural greens and earth tones",
    colors: {
      light: {
        primary: "140 60% 40%", // Forest green
        secondary: "160 50% 45%", // Teal green
        accent: "80 60% 50%", // Lime
        background: "140 30% 98%", // Light green tint
        foreground: "140 70% 15%",
      },
      dark: {
        primary: "140 60% 50%",
        secondary: "160 50% 55%",
        accent: "80 60% 60%",
        background: "140 30% 10%", // Deep forest
        foreground: "140 20% 92%",
      },
    },
  },
  crimson: {
    name: "Crimson",
    description: "Bold reds and purples",
    colors: {
      light: {
        primary: "350 90% 50%", // Crimson
        secondary: "280 80% 55%", // Purple
        accent: "330 100% 45%", // Rose
        background: "350 40% 98%", // Light pink tint
        foreground: "350 80% 15%",
      },
      dark: {
        primary: "350 90% 60%",
        secondary: "280 80% 65%",
        accent: "330 100% 60%",
        background: "350 30% 12%", // Dark crimson
        foreground: "350 20% 92%",
      },
    },
  },
  midnight: {
    name: "Midnight",
    description: "Deep purples and blues",
    colors: {
      light: {
        primary: "260 60% 50%", // Deep purple
        secondary: "230 70% 50%", // Navy blue
        accent: "280 80% 60%", // Bright purple
        background: "250 30% 98%", // Light purple tint
        foreground: "260 70% 15%",
      },
      dark: {
        primary: "260 60% 65%",
        secondary: "230 70% 60%",
        accent: "280 80% 70%",
        background: "260 40% 8%", // Deep midnight
        foreground: "260 20% 92%",
      },
    },
  },
} as const;

export type ThemeName = keyof typeof themes;

export const themeKeys = Object.keys(themes) as ThemeName[];

