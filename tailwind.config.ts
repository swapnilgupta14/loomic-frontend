import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./src/app/**/*.{ts,tsx}",
        "./src/components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Semantic color tokens with clr- prefix (easily identifiable, fully theme-able)
                "clr-background": "hsl(var(--clr-background))",
                "clr-foreground": "hsl(var(--clr-foreground))",
                "clr-primary": {
                    DEFAULT: "hsl(var(--clr-primary))",
                    foreground: "hsl(var(--clr-primary-foreground))",
                    hover: "hsl(var(--clr-primary-hover))",
                    subtle: "hsl(var(--clr-primary-subtle))",
                },
                "clr-secondary": {
                    DEFAULT: "hsl(var(--clr-secondary))",
                    foreground: "hsl(var(--clr-secondary-foreground))",
                    hover: "hsl(var(--clr-secondary-hover))",
                    subtle: "hsl(var(--clr-secondary-subtle))",
                },
                "clr-accent": {
                    DEFAULT: "hsl(var(--clr-accent))",
                    foreground: "hsl(var(--clr-accent-foreground))",
                    hover: "hsl(var(--clr-accent-hover))",
                    subtle: "hsl(var(--clr-accent-subtle))",
                },
                "clr-muted": {
                    DEFAULT: "hsl(var(--clr-muted))",
                    foreground: "hsl(var(--clr-muted-foreground))",
                },
                "clr-card": {
                    DEFAULT: "hsl(var(--clr-card))",
                    foreground: "hsl(var(--clr-card-foreground))",
                },
                "clr-surface": {
                    DEFAULT: "hsl(var(--clr-surface))",
                    hover: "hsl(var(--clr-surface-hover))",
                },
                "clr-popover": {
                    DEFAULT: "hsl(var(--clr-popover))",
                    foreground: "hsl(var(--clr-popover-foreground))",
                },
                "clr-danger": {
                    DEFAULT: "hsl(var(--clr-danger))",
                    foreground: "hsl(var(--clr-danger-foreground))",
                    hover: "hsl(var(--clr-danger-hover))",
                    subtle: "hsl(var(--clr-danger-subtle))",
                },
                "clr-warning": {
                    DEFAULT: "hsl(var(--clr-warning))",
                    foreground: "hsl(var(--clr-warning-foreground))",
                    hover: "hsl(var(--clr-warning-hover))",
                    subtle: "hsl(var(--clr-warning-subtle))",
                },
                "clr-success": {
                    DEFAULT: "hsl(var(--clr-success))",
                    foreground: "hsl(var(--clr-success-foreground))",
                    hover: "hsl(var(--clr-success-hover))",
                    subtle: "hsl(var(--clr-success-subtle))",
                },
                "clr-info": {
                    DEFAULT: "hsl(var(--clr-info))",
                    foreground: "hsl(var(--clr-info-foreground))",
                    hover: "hsl(var(--clr-info-hover))",
                    subtle: "hsl(var(--clr-info-subtle))",
                },
                "clr-border": "hsl(var(--clr-border))",
                "clr-input": "hsl(var(--clr-input))",
                "clr-ring": "hsl(var(--clr-ring))",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-in-out",
                "slide-up": "slideUp 0.5s ease-out",
                "slide-down": "slideDown 0.5s ease-out",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(10px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                slideDown: {
                    "0%": { transform: "translateY(-10px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
            },
        },
    },
    plugins: [],
};

export default config;

