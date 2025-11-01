# ✅ TOKEN-BASED DESIGN COMPLETE

## 🎨 Loomic is Now Fully Theme-able!

All colors have been converted to **CSS variable tokens** — no hardcoded hex values anywhere!

---

## 🚀 What Changed?

### ❌ Before (Hardcoded Colors)

```tsx
// tailwind.config.ts
colors: {
  brand: {
    500: "#8B5CF6",  // ❌ Hardcoded!
    600: "#7C3AED",
  },
  teal: {
    DEFAULT: "#14B8A6",  // ❌ Hardcoded!
  }
}

// page.tsx
<div className="bg-brand-500 text-white">  // ❌ Not theme-able
```

### ✅ After (Token-Based)

```tsx
// tailwind.config.ts
colors: {
  brand: {
    DEFAULT: "hsl(var(--brand))",        // ✅ Token!
    hover: "hsl(var(--brand-hover))",
    subtle: "hsl(var(--brand-subtle))",
  },
  teal: {
    DEFAULT: "hsl(var(--teal))",         // ✅ Token!
    hover: "hsl(var(--teal-hover))",
  }
}

// globals.scss
:root {
  --brand: 258 90% 66%;        // ✅ Easy to change!
  --teal: 173 80% 40%;
}

.dark {
  --brand: 258 90% 66%;        // ✅ Auto dark mode!
  --teal: 173 80% 50%;         // Brighter in dark
}

// page.tsx
<div className="bg-brand text-brand-foreground">  // ✅ Fully theme-able!
```

---

## 📋 Token System

### Core Semantic Tokens

```
✅ background / foreground
✅ card / card-foreground
✅ surface / surface-hover / surface-subtle
✅ primary / primary-foreground
✅ secondary / secondary-foreground
✅ muted / muted-foreground
✅ accent / accent-foreground
✅ destructive / destructive-foreground
✅ border / input / ring
```

### Loomic Brand Tokens

```
✅ brand / brand-hover / brand-subtle / brand-foreground
✅ teal / teal-hover / teal-subtle
✅ amber / amber-hover / amber-subtle
✅ ruby / ruby-hover / ruby-subtle
```

---

## 🎯 Usage Examples

### Buttons

```tsx
// Brand button (uses tokens)
<Button className="btn-brand">Primary</Button>

// Renders as:
// bg-brand hover:bg-brand-hover text-brand-foreground

// Accent buttons
<Button className="btn-teal">Teal Action</Button>
<Button className="btn-amber">Amber CTA</Button>
<Button className="btn-ruby">Ruby Alert</Button>
```

### Cards with Accents

```tsx
<Card className="bg-card border-border">
  {/* Icon with subtle background */}
  <div className="p-2 bg-teal-subtle rounded-lg">
    <Icon className="text-teal" />
  </div>

  {/* Gradient text */}
  <h3 className="gradient-teal">Feature Title</h3>

  {/* Muted text */}
  <p className="text-muted-foreground">Description</p>
</Card>
```

### Surfaces

```tsx
<div className="bg-background">
  {" "}
  {/* Main background */}
  <div className="bg-surface">
    {" "}
    {/* Elevated surface */}
    <div className="bg-surface-hover">
      {" "}
      {/* Hover state */}
      Content
    </div>
  </div>
</div>
```

---

## 🌗 Theme Switching

### Light & Dark Mode (Built-in)

All tokens automatically adjust when switching themes!

```tsx
import { ThemeToggle } from "@/components/shared";

<ThemeToggle />; // Switches between light/dark
```

**Light Mode:**

```css
--brand: 258 90% 66% /* Violet */ --teal: 173 80% 40% /* Darker teal */ --background: 0 0% 100%
  /* White */;
```

**Dark Mode:**

```css
--brand: 258 90% 66% /* Same violet */ --teal: 173 80% 50% /* Brighter teal */ --background: 0 0%
  10% /* Rich black */;
```

---

## 🎨 Creating Custom Themes

### Option 1: CSS Variables

```css
/* themes/ocean.css */
:root {
  --brand: 200 100% 50%; /* Blue instead of violet */
  --teal: 185 100% 45%; /* Cyan */
  --amber: 45 100% 55%; /* Gold */
  --background: 210 100% 12%; /* Dark blue */
}
```

### Option 2: Data Attributes

```css
/* globals.scss */
[data-theme="ocean"] {
  --brand: 200 100% 50%;
  --teal: 185 100% 45%;
  /* ... other tokens */
}

[data-theme="sunset"] {
  --brand: 15 100% 60%; /* Orange */
  --teal: 350 100% 65%; /* Pink */
  /* ... other tokens */
}
```

Apply:

```tsx
<html data-theme="ocean">{/* All colors automatically update! */}</html>
```

### Option 3: Theme Switcher Component

```tsx
"use client";

import { useState } from "react";

const themes = ["default", "ocean", "sunset", "forest"];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState("default");

  const changeTheme = (newTheme: string) => {
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <select value={theme} onChange={(e) => changeTheme(e.target.value)}>
      {themes.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  );
}
```

---

## 📊 Benefits

### ✅ Easy Theme Creation

Change entire color scheme by modifying CSS variables:

```css
/* Before: Need to rebuild Tailwind */
/* After: Just change CSS vars! */
```

### ✅ Runtime Switching

```tsx
// Switch themes without page reload
document.documentElement.setAttribute("data-theme", "ocean");
```

### ✅ User Preferences

```tsx
// Save user's theme choice
localStorage.setItem("theme", "ocean");

// Load on mount
useEffect(() => {
  const theme = localStorage.getItem("theme");
  if (theme) applyTheme(theme);
}, []);
```

### ✅ Brand Customization

Perfect for:

- White-label products
- Per-tenant branding
- A/B testing colors
- Seasonal themes
- Accessibility presets

---

## 🔧 Technical Details

### HSL Format

All tokens use HSL (Hue, Saturation, Lightness):

```css
--brand: 258 90% 66%;
         ^^^  ^^  ^^
         Hue  Sat Light
```

**Why HSL?**

- Easy to modify (change hue for different color)
- Better for dark mode (adjust lightness)
- More intuitive than RGB
- Works with Tailwind's color functions

### Tailwind Integration

```ts
// tailwind.config.ts
colors: {
  brand: {
    DEFAULT: "hsl(var(--brand))",
    hover: "hsl(var(--brand-hover))",
  }
}
```

Usage:

```tsx
className = "bg-brand hover:bg-brand-hover";
className = "bg-brand/10"; // 10% opacity works!
```

---

## 📝 Migration Checklist

### ✅ Completed

- [x] Convert Tailwind config to use CSS variables
- [x] Define all tokens in `globals.scss`
- [x] Create light & dark theme variants
- [x] Update all components to use tokens
- [x] Add custom utility classes
- [x] Create gradient utilities
- [x] Add button utilities
- [x] Remove all hardcoded colors
- [x] Test light/dark mode switching
- [x] Document all tokens

### 📚 Documentation

- [x] `THEME_TOKENS.md` — Complete token reference
- [x] `COLORS.md` — Color system guide
- [x] `TOKEN_BASED_DESIGN.md` — This file

---

## 🎯 Quick Reference

### Available Tokens

**Base:**

```tsx
(bg - background, bg - card, bg - surface);
(text - foreground, text - muted - foreground);
(border - border, ring - ring);
```

**Brand:**

```tsx
(bg - brand, bg - brand - hover, bg - brand - subtle);
(text - brand, text - brand - foreground);
```

**Accents:**

```tsx
(bg - teal, bg - teal - hover, bg - teal - subtle);
(bg - amber, bg - amber - hover, bg - amber - subtle);
(bg - ruby, bg - ruby - hover, bg - ruby - subtle);
```

**Utilities:**

```tsx
.gradient-brand, .gradient-teal, .gradient-amber
.btn-brand, .btn-teal, .btn-amber
.card-hover, .card-hover-glow
.glass-effect, .glass-card
```

---

## 🚀 Next Steps

### 1. Create Theme Presets

```ts
// lib/themes.ts
export const themes = {
  default: {
    /* Loomic violet */
  },
  ocean: {
    /* Blue theme */
  },
  sunset: {
    /* Orange/pink theme */
  },
  forest: {
    /* Green theme */
  },
};
```

### 2. Add Theme Switcher UI

```tsx
import { ThemeSwitcher } from "@/components/shared/theme-switcher";

<ThemeSwitcher />;
```

### 3. Implement User Preferences

```tsx
// Save theme choice
// Persist across sessions
// Sync with system preference
```

### 4. Create Brand Variants

For white-label or multi-brand:

```tsx
<html data-brand="client-a" data-theme="dark">
```

---

## 💡 Pro Tips

1. **Always use tokens** — Never hardcode hex/rgb colors
2. **Use semantic names** — `bg-brand` not `bg-violet`
3. **Leverage -subtle** — For backgrounds behind icons
4. **Test both themes** — Always check light + dark
5. **Use transparency** — `bg-brand/10` for tints
6. **Document custom themes** — Help future developers
7. **Keep token names consistent** — Follow conventions

---

## 🎉 Success!

Loomic now has a **fully theme-able design system** powered by CSS variables!

**Key Achievement:**

- ✅ Zero hardcoded colors
- ✅ 100% token-based
- ✅ Easy theme creation
- ✅ Runtime switching
- ✅ Perfect for customization

---

**Ready to build custom themes! 🎨⚡**

See `THEME_TOKENS.md` for complete documentation.
