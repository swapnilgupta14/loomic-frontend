# 🚀 Loomic Frontend — Quick Start Guide

## ✅ Installation Complete!

Your Loomic frontend is ready to go with a clean, performant Next.js stack.

## 🏃 Get Started

```bash
# Start development server (with Turbopack)
pnpm dev

# Open in browser
open http://localhost:3000
```

## 📂 What's Included

### ✅ Core Stack
- **Next.js 15** with App Router & Turbopack
- **React 19** with TypeScript
- **Tailwind CSS** with SCSS support
- **shadcn/ui** components (Button, Card, Input)
- **Framer Motion** for animations
- **next-themes** for dark mode

### ✅ Code Quality Tools
- **ESLint** with Next.js config
- **Prettier** with auto-formatting
- **Simple Import Sort** (auto-sorts imports)

### ✅ Project Structure

```
src/
├── app/
│   ├── (marketing)/about      → /about
│   ├── (marketing)/pricing    → /pricing
│   ├── (builder)/editor       → /editor
│   ├── (marketplace)/products → /products
│   ├── (dashboard)/settings   → /settings
│   ├── layout.tsx             → Root layout with theme
│   └── page.tsx               → Home page
│
├── components/
│   ├── ui/                    → shadcn components
│   └── shared/                → ThemeToggle, etc.
│
├── lib/utils.ts               → cn() helper
├── styles/globals.scss        → Global styles + brand colors
└── providers/theme-provider.tsx
```

## 🎨 Brand Colors (Loomic Violet)

```css
brand-50 → #F5F3FF (lightest)
brand-500 → #8B5CF6 (primary)
brand-900 → #4C1D95 (darkest)
```

Use in components:
```tsx
<div className="bg-brand-500 text-white">Loomic</div>
<h1 className="gradient-brand">Gradient Text</h1>
```

## 🧱 Adding New Pages

### Marketing Page
```bash
mkdir -p src/app/\(marketing\)/features
```

```tsx
// src/app/(marketing)/features/page.tsx
export default function FeaturesPage() {
  return <div>Features → /features</div>;
}
```

### Dashboard Page
```bash
mkdir -p src/app/\(dashboard\)/profile
```

```tsx
// src/app/(dashboard)/profile/page.tsx
export default function ProfilePage() {
  return <div>Profile → /profile</div>;
}
```

## 🧩 Adding shadcn Components

```bash
# Add any shadcn component
pnpm dlx shadcn@latest add dialog toast avatar dropdown-menu

# Use in your component
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
```

## 🎨 Using the Theme Toggle

```tsx
import { ThemeToggle } from "@/components/shared";

export default function Navbar() {
  return (
    <nav>
      <ThemeToggle />
    </nav>
  );
}
```

## 🔧 Available Commands

```bash
pnpm dev        # Start dev server with Turbopack
pnpm build      # Production build
pnpm start      # Start production server
pnpm lint       # Run ESLint
pnpm lint --fix # Auto-fix linting issues
pnpm format     # Format code with Prettier
```

## 🎯 Next Steps

1. **Build your landing page** in `src/app/page.tsx`
2. **Create marketing pages** in `(marketing)/` group
3. **Design the builder** in `(builder)/` group
4. **Set up the marketplace** in `(marketplace)/` group
5. **Build the dashboard** in `(dashboard)/` group

## 🧪 Testing the Build

```bash
# Verify everything compiles
pnpm build

# Check for type errors
pnpm tsc --noEmit

# Run linter
pnpm lint
```

## 📚 Key Files to Know

| File | Purpose |
|------|---------|
| `tailwind.config.ts` | Tailwind + brand colors |
| `src/styles/globals.scss` | Global styles + CSS variables |
| `src/lib/utils.ts` | Utility functions (cn, etc.) |
| `components.json` | shadcn/ui configuration |
| `next.config.mjs` | Next.js config (images, etc.) |

## 🔥 Pro Tips

### Import Sorting
Imports are auto-sorted by `simple-import-sort`. Run `pnpm lint --fix` to fix any order issues.

### Type Safety
All components use TypeScript. Let the types guide you!

### Class Utilities
Use `cn()` to conditionally merge Tailwind classes:

```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class",
  isActive && "active-class",
  "hover:opacity-80"
)} />
```

### Dark Mode
Access theme anywhere:

```tsx
"use client";
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();
```

## 🐛 Troubleshooting

**Port 3000 in use?**
```bash
pnpm dev -- -p 3001
```

**Module not found?**
```bash
rm -rf node_modules .next && pnpm install
```

**Type errors?**
```bash
rm -rf .next && pnpm dev
```

---

**Happy building! 🧱⚡**

Need help? Check the [full README](./README.md) for detailed documentation.

