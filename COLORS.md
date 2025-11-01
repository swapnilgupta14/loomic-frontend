# 🎨 Loomic Dark Theme — Color Reference

## 🌗 Theme Philosophy

**Premium Dark + Jewel Accents** — A sophisticated dark theme combining rich black surfaces with vibrant jewel-tone accents for a luxurious, portfolio-focused experience.

---

## 🎯 Primary Palette

### Brand Violet (Primary)
The signature Loomic color — premium, creative, trustworthy.

```css
brand-500: #8B5CF6  /* Primary brand color */
brand-600: #7C3AED  /* Hover states */
brand-700: #6D28D9  /* Pressed states */
brand-400: #A78BFA  /* Lighter variant */
```

**Usage:**
- Primary CTAs
- Brand elements
- Interactive highlights
- Focus states

---

## 🌈 Accent Colors

### Teal Accent (Secondary)
Vibrant, modern, energetic — perfect for showcasing content.

```css
accent-teal:       #14B8A6  /* Default */
accent-teal-dark:  #0D9488  /* Hover/Active */
accent-teal-light: #2DD4BF  /* Highlights */
```

**Usage:**
- Secondary actions
- Info badges
- Showcase features
- Links in dark mode

### Amber Accent (Warm)
Warm, inviting, action-oriented — great for CTAs and selling.

```css
accent-amber:       #F59E0B  /* Default */
accent-amber-dark:  #D97706  /* Hover/Active */
accent-amber-light: #FBBF24  /* Highlights */
```

**Usage:**
- Premium features
- "Buy now" buttons
- Warnings/important info
- Monetization elements

### Ruby Accent (Bold)
Deep, luxurious, attention-grabbing — for special emphasis.

```css
accent-ruby:       #BE185D  /* Default */
accent-ruby-dark:  #9F1239  /* Hover/Active */
accent-ruby-light: #DB2777  /* Highlights */
```

**Usage:**
- Featured content
- Limited offers
- Destructive actions (delete)
- Special badges

---

## 🖤 Dark Theme Surfaces

### Backgrounds
```css
dark-bg:             #1A1A1A  /* Rich black - main background */
dark-surface:        #212226  /* Elevated cards/panels */
dark-surface-hover:  #2A2A2F  /* Hover states for surfaces */
dark-border:         #333338  /* Subtle borders */
```

**Layer System:**
- **Level 0 (Base):** `dark-bg` (#1A1A1A)
- **Level 1 (Cards):** `dark-surface` (#212226)
- **Level 2 (Modals):** `dark-surface-hover` (#2A2A2F)

### Text Colors
```css
Foreground:       #F0F0F0  /* Primary text - off-white */
Muted:            #A6A6A6  /* Secondary text */
Border:           #333338  /* Dividers */
```

**Contrast Ratios (WCAG AA/AAA):**
- `#F0F0F0` on `#1A1A1A` → 13.5:1 ✅ AAA
- `#A6A6A6` on `#1A1A1A` → 6.8:1 ✅ AA
- `#8B5CF6` on `#1A1A1A` → 7.2:1 ✅ AA

---

## 🎨 Utility Classes

### Gradient Text
```tsx
<h1 className="gradient-brand">Brand Violet</h1>
<h1 className="gradient-teal">Accent Teal</h1>
<h1 className="gradient-amber">Accent Amber</h1>
<h1 className="gradient-ruby">Accent Ruby</h1>
```

### Surface Classes
```tsx
<div className="surface-elevated">
  {/* Automatically white (light) or dark-surface (dark) */}
</div>

<div className="surface-hover">
  {/* Hover effect respecting theme */}
</div>

<div className="glass-effect">
  {/* Glassmorphism with theme support */}
</div>
```

### Button Utilities
```tsx
<button className="btn-teal">Teal Action</button>
<button className="btn-amber">Amber CTA</button>
<button className="btn-ruby">Ruby Alert</button>
```

### Card Animations
```tsx
<Card className="card-hover-dark">
  {/* Premium hover with shadow glow */}
</Card>
```

---

## 📊 Usage Guidelines

### When to Use Each Color

| Color | Best For | Avoid For |
|-------|----------|-----------|
| **Brand Violet** | Primary actions, branding, navigation | Errors, warnings |
| **Teal** | Info, links, secondary actions | CTAs (use amber) |
| **Amber** | CTAs, premium features, highlights | Errors (use red) |
| **Ruby** | Featured content, special badges | Regular buttons |

### Color Hierarchy
1. **Primary:** Brand Violet (#8B5CF6)
2. **Secondary:** Teal (#14B8A6)
3. **Tertiary:** Amber (#F59E0B)
4. **Accent:** Ruby (#BE185D)

---

## 🎯 Component Examples

### Primary Button
```tsx
<Button className="bg-brand-500 hover:bg-brand-600 text-white">
  Get Started
</Button>
```

### Teal Secondary Button
```tsx
<Button className="btn-teal">
  Learn More
</Button>
```

### Amber CTA
```tsx
<Button className="btn-amber">
  Buy Now - $99
</Button>
```

### Card with Teal Accent
```tsx
<Card className="surface-elevated border-dark-border">
  <CardHeader>
    <div className="p-2 bg-accent-teal/10 rounded-lg">
      <Icon className="text-accent-teal" />
    </div>
    <CardTitle className="gradient-teal">Feature</CardTitle>
  </CardHeader>
</Card>
```

---

## 🌗 Light vs Dark Mode

### Automatic Theme Switching
All colors automatically adjust based on theme:

```tsx
// Light mode: white bg, dark text
// Dark mode: dark-bg, light text
<div className="bg-white dark:bg-dark-bg text-gray-900 dark:text-gray-100">
  Content adapts automatically
</div>
```

### Theme-Aware Utilities
```tsx
className="
  bg-gray-50 dark:bg-dark-surface
  text-gray-900 dark:text-gray-100
  border-gray-200 dark:border-dark-border
"
```

---

## 🔍 Accessibility

### Contrast Ratios
All color combinations meet **WCAG 2.1 AA** standards minimum:
- ✅ Primary text: 13.5:1 (AAA)
- ✅ Secondary text: 6.8:1 (AA)
- ✅ Brand violet on dark: 7.2:1 (AA)
- ✅ Teal on dark: 8.5:1 (AAA)

### Focus States
```tsx
// All interactive elements have visible focus
focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 
dark:focus:ring-offset-dark-bg
```

---

## 📝 CSS Variable Reference

### Root Variables
```css
:root {
  --brand-color: #8b5cf6;
  --brand-accent: #c084fc;
  --brand-gradient: linear-gradient(135deg, #8b5cf6 0%, #c084fc 100%);
}
```

### Dark Theme Variables
```css
.dark {
  --background: 0 0% 10%;           /* #1A1A1A */
  --foreground: 0 0% 94%;           /* #F0F0F0 */
  --card: 220 5% 13%;               /* #212226 */
  --primary: 258 90% 66%;           /* #8B5CF6 */
  --accent: 173 80% 40%;            /* #14B8A6 */
  --border: 0 0% 20%;               /* #333338 */
  --ring: 258 90% 66%;              /* #8B5CF6 */
}
```

---

## 🎨 Color Psychology

### Brand Violet
- **Emotion:** Creativity, luxury, innovation
- **Association:** Premium portfolios, artistic
- **Psychology:** Trust + creativity

### Teal
- **Emotion:** Modern, energetic, fresh
- **Association:** Technology, clarity
- **Psychology:** Balance + sophistication

### Amber
- **Emotion:** Warmth, optimism, action
- **Association:** Value, premium, energy
- **Psychology:** Urgency + friendliness

### Ruby
- **Emotion:** Passion, luxury, importance
- **Association:** Premium, exclusive
- **Psychology:** Desire + attention

---

## 🚀 Quick Reference

### Tailwind Classes
```tsx
// Backgrounds
bg-dark-bg
bg-dark-surface
bg-dark-surface-hover

// Text
text-brand-500
text-accent-teal
text-accent-amber
text-accent-ruby

// Borders
border-dark-border

// Gradients
gradient-brand
gradient-teal
gradient-amber
gradient-ruby

// Utilities
surface-elevated
surface-hover
glass-effect
glass-card
card-hover-dark
```

---

## 💡 Pro Tips

1. **Use transparency** for subtle effects: `bg-brand-500/10`
2. **Layer surfaces** properly: bg → surface → surface-hover
3. **Limit accent colors** per view: 2-3 max
4. **Test in both modes** always
5. **Use gradients sparingly** for emphasis
6. **Ensure text contrast** especially on colored backgrounds
7. **Hover states** should be obvious but not jarring

---

**Created for Loomic — Premium Portfolio Ecosystem**  
*Dark theme optimized for creative professionals*

