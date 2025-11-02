/**
 * Loomic Theme Definitions
 * Each theme defines all CLR- prefix token values
 */

export const themes = {
  default: {
    name: "Loomic",
    description: "Vibrant gradients from lime to cyan",
    colors: {
      light: {
        primary: "85 75% 55%", // Bright Lime (gradient start)
        secondary: "175 80% 50%", // Cyan-Turquoise (gradient middle)
        accent: "195 85% 55%", // Bright Cyan (gradient end)
        background: "40 9% 96%", // Subtle beige
        foreground: "0 0% 10%",
      },
      dark: {
        primary: "85 85% 60%", // Electric Lime (gradient start)
        secondary: "175 85% 55%", // Glowing Turquoise (gradient middle)
        accent: "195 90% 60%", // Neon Cyan (gradient end)
        background: "0 0% 3%", // Pitch Black
        foreground: "0 0% 95%", // Soft White
      },
    },
  },
  loomic: {
    name: "Coral Reef",
    description: "Warm coral and turquoise",
    colors: {
      light: {
        primary: "11 90% 62%", // Coral
        secondary: "173 80% 40%", // Turquoise/Teal
        accent: "340 82% 52%", // Rose
        background: "258 15% 96%", // Soft lavender background
        foreground: "222.2 84% 4.9%",
      },
      dark: {
        primary: "11 90% 65%", // Bright Coral
        secondary: "173 80% 50%", // Bright Turquoise
        accent: "340 82% 60%", // Bright Rose
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
        background: "200 18% 95%", // Pastel ocean blue (reduced saturation by 40%)
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
    name: "Sunset Bliss",
    description: "Soft peach and warm tones",
    colors: {
      light: {
        primary: "24 85% 60%", // Warm Peach
        secondary: "340 75% 65%", // Soft Pink
        accent: "45 90% 55%", // Golden Yellow
        background: "20 21% 95%", // Pastel warm peach
        foreground: "15 80% 15%",
      },
      dark: {
        primary: "24 85% 65%", // Bright Peach
        secondary: "340 75% 70%", // Bright Pink
        accent: "45 90% 60%", // Bright Gold
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
        background: "140 13% 95%", // Pastel mint green (reduced saturation by 40%)
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
    name: "Berry Wine",
    description: "Sophisticated berry and plum",
    colors: {
      light: {
        primary: "335 78% 48%", // Berry
        secondary: "275 60% 50%", // Plum
        accent: "0 72% 51%", // Ruby Red
        background: "350 17% 95%", // Soft rose background
        foreground: "350 80% 15%",
      },
      dark: {
        primary: "335 78% 60%", // Bright Berry
        secondary: "275 60% 65%", // Bright Plum
        accent: "0 72% 60%", // Bright Ruby
        background: "335 35% 12%", // Deep wine
        foreground: "350 20% 92%",
      },
    },
  },
  midnight: {
    name: "Emerald Glow",
    description: "Rich emerald with gold",
    colors: {
      light: {
        primary: "160 84% 39%", // Emerald Green
        secondary: "140 60% 40%", // Forest Green
        accent: "45 96% 53%", // Gold Yellow
        background: "215 16% 96%", // Soft slate background
        foreground: "215 80% 15%",
      },
      dark: {
        primary: "160 84% 50%", // Bright Emerald
        secondary: "140 60% 50%", // Bright Forest Green
        accent: "45 96% 60%", // Bright Gold
        background: "215 45% 8%", // Deep navy
        foreground: "215 20% 92%",
      },
    },
  },
} as const;

export type ThemeName = keyof typeof themes;

export const themeKeys = Object.keys(themes) as ThemeName[];

