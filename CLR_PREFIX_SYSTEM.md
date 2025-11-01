# 🎨 CLR- PREFIX COLOR SYSTEM

## ✅ Pure Semantic Token System

**All colors now use the `clr-` prefix for instant recognition and semantic meaning!**

No custom color names like "brand", "teal", "amber" — only semantic tokens that work across any theme.

---

## 🎯 Available Color Tokens

### Base Tokens
```tsx
bg-clr-background       // Main background
text-clr-foreground     // Main text color
```

### Primary (Main Brand Color)
```tsx
bg-clr-primary          // Primary brand color
bg-clr-primary-hover    // Hover state
bg-clr-primary-subtle   // Light background (10-15% opacity)
text-clr-primary
text-clr-primary-foreground  // Text on primary background
```

### Secondary
```tsx
bg-clr-secondary
bg-clr-secondary-hover
bg-clr-secondary-subtle
text-clr-secondary
text-clr-secondary-foreground
```

### Accent
```tsx
bg-clr-accent
bg-clr-accent-hover
bg-clr-accent-subtle
text-clr-accent
text-clr-accent-foreground
```

### Surface & Card
```tsx
bg-clr-card             // Card background
bg-clr-card-foreground  // Text on cards
bg-clr-surface          // Elevated surface
bg-clr-surface-hover    // Hover state for surfaces
```

### Muted
```tsx
bg-clr-muted
text-clr-muted-foreground  // Secondary text
```

### Status Colors
```tsx
// Danger (errors, delete actions)
bg-clr-danger
bg-clr-danger-hover
bg-clr-danger-subtle
text-clr-danger-foreground

// Warning (caution, alerts)
bg-clr-warning
bg-clr-warning-hover
bg-clr-warning-subtle
text-clr-warning-foreground

// Success (confirmations)
bg-clr-success
bg-clr-success-hover
bg-clr-success-subtle
text-clr-success-foreground

// Info (helpful tips)
bg-clr-info
bg-clr-info-hover
bg-clr-info-subtle
text-clr-info-foreground
```

### Borders & Inputs
```tsx
border-clr-border
border-clr-input
ring-clr-ring
```

---

## 🚀 Usage Examples

### Primary Button
```tsx
<button className="bg-clr-primary hover:bg-clr-primary-hover text-clr-primary-foreground px-4 py-2 rounded">
  Click me
</button>

// Or use utility class:
<button className="btn-primary">
  Click me
</button>
```

### Card Component
```tsx
<div className="bg-clr-card text-clr-card-foreground border border-clr-border rounded-lg p-6">
  <h3 className="text-clr-foreground">Title</h3>
  <p className="text-clr-muted-foreground">Description</p>
</div>
```

### Status Badges
```tsx
// Success
<span className="bg-clr-success-subtle text-clr-success px-2 py-1 rounded">
  Active
</span>

// Warning
<span className="bg-clr-warning-subtle text-clr-warning px-2 py-1 rounded">
  Pending
</span>

// Danger
<span className="bg-clr-danger-subtle text-clr-danger px-2 py-1 rounded">
  Error
</span>
```

### Icon with Subtle Background
```tsx
<div className="p-2 bg-clr-primary-subtle rounded-lg">
  <Icon className="text-clr-primary" />
</div>
```

### Gradient Text
```tsx
<h1 className="gradient-primary">Loomic</h1>
<h2 className="gradient-secondary">Secondary</h2>
<h3 className="gradient-accent">Accent</h3>
```

---

## 🛠 Utility Classes

### Pre-built Button Classes
```tsx
.btn-primary      // Primary action button
.btn-secondary    // Secondary action button
.btn-danger       // Delete/destructive button
.btn-warning      // Warning button
.btn-success      // Success/confirm button
.btn-info         // Info button
```

### Gradient Classes
```tsx
.gradient-primary    // Primary gradient text
.gradient-secondary  // Secondary gradient text
.gradient-accent     // Accent gradient text
```

### Card Effects
```tsx
.card-hover          // Standard hover effect
.card-hover-glow     // Hover with primary color glow
.glass-effect        // Glassmorphism effect
.glass-card          // Glass card effect
```

---

## 🎨 Why `clr-` Prefix?

### ✅ Benefits

1. **Instantly Recognizable**
   ```tsx
   bg-clr-primary     // ✅ Obviously a color token
   bg-primary         // ❌ Could be anything
   ```

2. **No Conflicts**
   ```tsx
   bg-clr-border      // ✅ Clear it's a color
   border-border      // ❌ Confusing
   ```

3. **Semantic Meaning**
   ```tsx
   bg-clr-primary     // ✅ Works with any theme
   bg-brand           // ❌ Theme-specific
   ```

4. **Easy to Search**
   - Search for `clr-` to find all color usage
   - Easy to refactor or create new themes
   - Clear distinction from layout/spacing utilities

5. **Autocomplete Friendly**
   - Type `bg-clr-` and see all color options
   - Group all colors together in IDE autocomplete

---

## 📝 Color Mapping

### Current Light Theme Values
```css
--clr-primary: 258 90% 66%        /* Violet #8B5CF6 */
--clr-secondary: 173 80% 40%      /* Teal #14B8A6 */
--clr-accent: 250 90% 60%         /* Purple-Blue */
--clr-danger: 0 84.2% 60.2%       /* Red */
--clr-warning: 38 92% 50%         /* Amber */
--clr-success: 142 76% 36%        /* Green */
--clr-info: 199 89% 48%           /* Blue */
```

### Dark Theme (Automatically Brighter)
```css
--clr-primary: 258 90% 66%        /* Same violet */
--clr-secondary: 173 80% 50%      /* Brighter teal */
--clr-accent: 250 90% 70%         /* Brighter purple-blue */
--clr-danger: 0 84% 65%           /* Brighter red */
--clr-warning: 38 92% 60%         /* Brighter amber */
--clr-success: 142 76% 45%        /* Brighter green */
--clr-info: 199 89% 58%           /* Brighter blue */
```

---

## 🔄 Creating Custom Themes

### Ocean Theme Example
```css
[data-theme="ocean"] {
  --clr-primary: 200 100% 50%;      /* Blue */
  --clr-secondary: 185 100% 45%;    /* Cyan */
  --clr-accent: 160 100% 50%;       /* Sea green */
  /* ... other tokens */
}
```

Apply:
```tsx
<html data-theme="ocean">
```

### Sunset Theme
```css
[data-theme="sunset"] {
  --clr-primary: 15 100% 60%;       /* Orange */
  --clr-secondary: 350 100% 65%;    /* Pink */
  --clr-accent: 45 100% 55%;        /* Gold */
  /* ... other tokens */
}
```

---

## 🎯 Best Practices

### ✅ DO
```tsx
// Use semantic tokens
<button className="bg-clr-primary text-clr-primary-foreground">
  
// Use hover variants
<div className="bg-clr-surface hover:bg-clr-surface-hover">

// Use subtle for backgrounds
<div className="bg-clr-primary-subtle">
  <Icon className="text-clr-primary" />
</div>
```

### ❌ DON'T
```tsx
// Don't use arbitrary colors
<div className="bg-purple-500">  // ❌

// Don't hardcode hex values
<div style={{ color: '#8B5CF6' }}>  // ❌

// Don't use non-semantic names
<div className="bg-brand">  // ❌ Use bg-clr-primary
```

---

## 📊 Token Structure

```
clr-{semantic-name}[-variant][-state]

Examples:
clr-primary              // Base primary color
clr-primary-foreground   // Text on primary
clr-primary-hover        // Hover state
clr-primary-subtle       // Subtle background

clr-danger               // Base danger color
clr-danger-hover         // Danger hover
clr-danger-subtle        // Danger background
```

---

## 🚀 Quick Reference Table

| Use Case | Token | Example |
|----------|-------|---------|
| Main action | `clr-primary` | Primary buttons, links |
| Secondary action | `clr-secondary` | Secondary buttons |
| Special feature | `clr-accent` | Badges, highlights |
| Errors | `clr-danger` | Error messages, delete |
| Warnings | `clr-warning` | Alerts, caution |
| Success | `clr-success` | Confirmations, done |
| Information | `clr-info` | Tips, help text |
| Cards | `clr-card` | Card backgrounds |
| Surfaces | `clr-surface` | Elevated elements |
| Subtle text | `clr-muted-foreground` | Descriptions |
| Borders | `clr-border` | All borders |

---

## 💡 Migration from Old System

### Before (removed)
```tsx
bg-brand          → bg-clr-primary
bg-teal           → bg-clr-secondary
bg-amber          → bg-clr-warning
bg-ruby           → bg-clr-danger

.gradient-brand   → .gradient-primary
.btn-brand        → .btn-primary
```

### Now (semantic)
```tsx
bg-clr-primary          // Main brand color
bg-clr-secondary        // Secondary brand color
bg-clr-warning          // Warning states
bg-clr-danger           // Danger/destructive
bg-clr-success          // Success states
bg-clr-info             // Informational
```

---

**🎉 Loomic now has a clean, semantic, theme-able color system!**

All colors are prefixed with `clr-` for instant recognition and work across any custom theme you create.

