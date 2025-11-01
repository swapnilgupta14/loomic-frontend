# 🎨 Loomic Theme Tokens — Complete Reference

## 🚀 Token-Based Design System

**100% theme-able via CSS variables** — No hardcoded colors in Tailwind config!

All colors use **CSS custom properties** that can be easily swapped to create custom themes.

---

## 📋 Token Architecture

### Why CSS Variables?

- ✅ **Easy theming** — Change entire theme by modifying CSS vars
- ✅ **Runtime switching** — Dark mode, user themes, brand variants
- ✅ **Consistent** — Single source of truth for all colors
- ✅ **Maintainable** — Update once, applies everywhere
- ✅ **No rebuilds** — Change colors without recompiling Tailwind

---

## 🎯 Core Tokens

### Base Tokens (Always Available)

```tsx
// Background & Foreground
bg-background          text-foreground

// Cards & Surfaces
bg-card               text-card-foreground
bg-surface            (custom Loomic token)
bg-surface-hover      (hover states)
bg-surface-subtle     (subtle backgrounds)

// Interactive
bg-primary            text-primary-foreground
bg-secondary          text-secondary-foreground
bg-accent             text-accent-foreground

// Utility
bg-muted              text-muted-foreground
bg-destructive        text-destructive-foreground

// Borders & Inputs
border-border
border-input
ring-ring
```

---

## 🎨 Loomic Custom Tokens

### Brand (Primary — Violet)

```tsx
// Backgrounds
bg - brand; // Main brand color
bg - brand - hover; // Hover state
bg - brand - subtle; // Light background

// Text
text - brand;
text -
  brand -
  // Gradient
  foreground.gradient -
  brand; // Custom utility class
```

**CSS Variables:**

```css
--brand: 258 90% 66% /* #8B5CF6 */ --brand-hover: 258 86% 60% /* Darker/lighter based on theme */
  --brand-subtle: 258 100% 97% /* Light bg in light mode */ --brand-subtle: 258 90% 15%
  /* Dark bg in dark mode */ --brand-foreground: 0 0% 100% /* White text */;
```

---

### Teal (Secondary Accent)

```tsx
// Backgrounds
bg - teal;
bg - teal - hover;
bg - teal - subtle;

// Text
text -
  // Gradient
  teal.gradient -
  // Button utility
  teal.btn -
  teal;
```

**CSS Variables:**

```css
--teal: 173 80% 40% /* #14B8A6 (light mode) */ --teal: 173 80% 50% /* Brighter in dark mode */
  --teal-hover: 173 84% 32% /* (light mode) */ --teal-hover: 173 80% 60% /* (dark mode) */
  --teal-subtle: 173 76% 94% /* Light bg */ --teal-subtle: 173 80% 15% /* Dark bg */;
```

---

### Amber (Warm Accent)

```tsx
// Backgrounds
bg - amber;
bg - amber - hover;
bg - amber - subtle;

// Text
text -
  // Gradient
  amber.gradient -
  // Button utility
  amber.btn -
  amber;
```

**CSS Variables:**

```css
--amber: 38 92% 50% /* #F59E0B (light mode) */ --amber: 38 92% 55% /* Brighter in dark mode */
  --amber-hover: 36 100% 42% /* (light mode) */ --amber-hover: 38 92% 65% /* (dark mode) */
  --amber-subtle: 38 100% 95% /* Light bg */ --amber-subtle: 38 92% 15% /* Dark bg */;
```

---

### Ruby (Bold Accent)

```tsx
// Backgrounds
bg - ruby;
bg - ruby - hover;
bg - ruby - subtle;

// Text
text -
  // Gradient
  ruby.gradient -
  // Button utility
  ruby.btn -
  ruby;
```

**CSS Variables:**

```css
--ruby: 330 81% 43% /* #BE185D (light mode) */ --ruby: 330 81% 55% /* Brighter in dark mode */
  --ruby-hover: 330 82% 35% /* (light mode) */ --ruby-hover: 330 81% 65% /* (dark mode) */
  --ruby-subtle: 330 100% 96% /* Light bg */ --ruby-subtle: 330 81% 15% /* Dark bg */;
```

---

## 🛠 Utility Classes (Token-Based)

### Gradient Text

```tsx
<h1 className="gradient-brand">Loomic</h1>
<h2 className="gradient-teal">Feature</h2>
<h3 className="gradient-amber">CTA</h3>
<h4 className="gradient-ruby">Alert</h4>
```

### Button Utilities

```tsx
<button className="btn-brand">Primary</button>
<button className="btn-teal">Secondary</button>
<button className="btn-amber">Warning</button>
<button className="btn-ruby">Danger</button>
```

### Glass Effects

```tsx
<div className="glass-effect">Semi-transparent</div>
<div className="glass-card">More opaque</div>
```

### Card Animations

```tsx
<Card className="card-hover">Standard hover</Card>
<Card className="card-hover-glow">Glow effect</Card>
```

---

## 📊 Usage Examples

### Primary Button (Brand)

```tsx
import { Button } from "@/components/ui/button";

<Button className="btn-brand">Get Started</Button>;

// Renders with: bg-brand, hover:bg-brand-hover, text-brand-foreground
```

### Card with Teal Accent

```tsx
import { Card } from "@/components/ui/card";

<Card className="bg-card border-border">
  <div className="p-2 bg-teal-subtle rounded-lg">
    <Icon className="text-teal" />
  </div>
  <h3 className="gradient-teal">Title</h3>
  <p className="text-muted-foreground">Description</p>
</Card>;
```

### Hero Section

```tsx
<section className="min-h-screen bg-gradient-to-br from-brand-subtle via-background to-background">
  <h1 className="gradient-brand">Welcome</h1>
  <p className="text-muted-foreground">Subtitle</p>
</section>
```

---

## 🌗 Creating Custom Themes

### Example: Ocean Theme

Create a new CSS file or add to `globals.scss`:

```css
[data-theme="ocean"] {
  /* Base */
  --background: 210 100% 12%;
  --foreground: 180 100% 95%;

  /* Brand becomes blue */
  --brand: 200 100% 50%;
  --brand-hover: 200 100% 60%;
  --brand-subtle: 200 100% 15%;

  /* Teal becomes cyan */
  --teal: 185 100% 45%;
  --teal-hover: 185 100% 55%;
  --teal-subtle: 185 100% 15%;

  /* Amber becomes gold */
  --amber: 45 100% 55%;
  --amber-hover: 45 100% 65%;
  --amber-subtle: 45 100% 15%;

  /* Ruby becomes coral */
  --ruby: 350 100% 60%;
  --ruby-hover: 350 100% 70%;
  --ruby-subtle: 350 100% 15%;
}
```

Apply with:

```tsx
<html data-theme="ocean">{/* All tokens automatically update! */}</html>
```

---

## 🎯 Token Naming Convention

### Format

```
--{category}-{variant}: {hsl-value}
```

### Categories

- `brand`, `teal`, `amber`, `ruby` — Loomic accent colors
- `background`, `foreground` — Base colors
- `card`, `surface` — Elevated surfaces
- `primary`, `secondary`, `accent` — Semantic colors
- `muted`, `destructive` — Utility colors
- `border`, `input`, `ring` — Interactive elements

### Variants

- _Default_ — Base color
- `-hover` — Hover state
- `-subtle` — Background tint (10-15% opacity)
- `-foreground` — Text color on background

---

## 📝 Tailwind Usage

### In Tailwind Classes

```tsx
className = "bg-brand text-brand-foreground hover:bg-brand-hover";
className = "bg-teal-subtle text-teal border border-teal";
className = "text-foreground bg-background border-border";
```

### In CSS/SCSS

```scss
.custom-component {
  background: hsl(var(--brand));
  color: hsl(var(--brand-foreground));

  &:hover {
    background: hsl(var(--brand-hover));
  }
}
```

### With Transparency

```tsx
className = "bg-brand/10"; // 10% opacity
className = "bg-teal/20"; // 20% opacity
className = "border-brand/50"; // 50% opacity
```

---

## 🔍 Token Reference Table

| Token        | Tailwind Class    | CSS Variable     | Light Value    | Dark Value    |
| ------------ | ----------------- | ---------------- | -------------- | ------------- |
| Brand        | `bg-brand`        | `--brand`        | `258 90% 66%`  | `258 90% 66%` |
| Brand Hover  | `bg-brand-hover`  | `--brand-hover`  | `258 86% 60%`  | `258 90% 72%` |
| Brand Subtle | `bg-brand-subtle` | `--brand-subtle` | `258 100% 97%` | `258 90% 15%` |
| Teal         | `bg-teal`         | `--teal`         | `173 80% 40%`  | `173 80% 50%` |
| Amber        | `bg-amber`        | `--amber`        | `38 92% 50%`   | `38 92% 55%`  |
| Ruby         | `bg-ruby`         | `--ruby`         | `330 81% 43%`  | `330 81% 55%` |
| Background   | `bg-background`   | `--background`   | `0 0% 100%`    | `0 0% 10%`    |
| Foreground   | `text-foreground` | `--foreground`   | `222 84% 5%`   | `0 0% 94%`    |
| Card         | `bg-card`         | `--card`         | `0 0% 100%`    | `220 5% 13%`  |
| Surface      | `bg-surface`      | `--surface`      | `0 0% 98%`     | `220 5% 13%`  |
| Border       | `border-border`   | `--border`       | `214 32% 91%`  | `0 0% 20%`    |

---

## 🚀 Quick Reference

### Most Common Classes

```tsx
// Backgrounds
bg-background, bg-card, bg-surface
bg-brand, bg-teal, bg-amber, bg-ruby

// Text
text-foreground, text-muted-foreground
text-brand, text-teal, text-amber, text-ruby

// Borders
border-border, border-brand, border-teal

// States
hover:bg-brand-hover, hover:bg-surface-hover
bg-brand-subtle, bg-teal-subtle

// Utilities
.gradient-brand, .btn-brand, .card-hover-glow
```

---

## 💡 Best Practices

1. **Always use tokens** — Never hardcode colors
2. **Use semantic names** — `bg-brand` not `bg-violet-500`
3. **Leverage -subtle** — For icon backgrounds and tints
4. **Use -hover** — For interactive state changes
5. **Test both themes** — Ensure contrast in light & dark
6. **Use transparency** — `bg-brand/10` for subtle effects
7. **Follow conventions** — Keep token usage consistent

---

**Built for Loomic — Fully Theme-able Design System** 🎨⚡
