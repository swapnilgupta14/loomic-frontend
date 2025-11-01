# 🧱 Loomic Frontend

> **Build. Showcase. Sell.** — Your creative portfolio ecosystem.

A modern, performant Next.js application built with TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Run development server with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Format code
pnpm format
```

Development server: [http://localhost:3000](http://localhost:3000)

## 📦 Tech Stack

### Core
- **Next.js 15** — React framework with App Router
- **React 19** — UI library
- **TypeScript** — Type safety
- **pnpm** — Fast, efficient package manager

### Styling
- **Tailwind CSS** — Utility-first CSS framework
- **SCSS** — Enhanced CSS with variables
- **shadcn/ui** — High-quality React components
- **CVA** — Class Variance Authority for component variants
- **Framer Motion** — Animation library

### DX (Developer Experience)
- **Turbopack** — Fast bundler for development
- **ESLint** — Code linting
- **Prettier** — Code formatting
- **Simple Import Sort** — Auto-sort imports

### Utilities
- **next-themes** — Dark mode support
- **lucide-react** — Beautiful icons
- **clsx + tailwind-merge** — Conditional class utilities

## 🗂 Project Structure

```
loomic-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (marketing)/        # Public marketing pages
│   │   ├── (builder)/          # Portfolio builder
│   │   ├── (marketplace)/      # Marketplace for creatives
│   │   ├── (dashboard)/        # User dashboard
│   │   ├── api/                # API routes
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   │
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   └── shared/             # Shared components (navbar, footer, etc.)
│   │
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   │
│   ├── styles/
│   │   └── globals.scss        # Global styles + Loomic variables
│   │
│   └── providers/
│       └── theme-provider.tsx  # Dark mode provider
│
├── public/                     # Static assets
├── components.json             # shadcn/ui config
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── next.config.mjs             # Next.js configuration
├── .eslintrc.js                # ESLint rules
└── .prettierrc                 # Prettier config
```

## 🎨 Design System

### Brand Colors

The Loomic brand uses a custom violet palette:

```scss
--brand-color: #8b5cf6      // Primary violet
--brand-accent: #c084fc      // Lighter accent
--brand-gradient: linear-gradient(135deg, #8b5cf6 0%, #c084fc 100%)
```

Available as Tailwind classes:
- `brand-50` through `brand-900`
- `text-brand-500`, `bg-brand-500`, etc.

### Custom Utilities

```css
.gradient-brand        /* Brand gradient text */
.glass-effect         /* Glassmorphism background */
.card-hover           /* Card hover animation */
```

### Typography

Headers use semibold tracking with responsive sizing:
- `h1`: 4xl → 5xl (mobile → desktop)
- `h2`: 3xl → 4xl
- `h3`: 2xl → 3xl

## 🧩 Route Groups

Next.js route groups organize features without affecting URL structure:

- **(marketing)** — Landing, pricing, features
- **(builder)** — Portfolio creation tools
- **(marketplace)** — Buy/sell creative works
- **(dashboard)** — User account & analytics

Access directly: `/`, `/marketing`, `/builder`, etc.

## 🌗 Dark Mode

Built-in dark mode using `next-themes`:

```tsx
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();
setTheme("dark"); // or "light", "system"
```

## 🧱 Adding shadcn/ui Components

```bash
pnpm dlx shadcn@latest add [component-name]
```

Example:
```bash
pnpm dlx shadcn@latest add dialog toast dropdown-menu
```

Components are added to `src/components/ui/` and ready to use.

## 🔧 Configuration

### Environment Variables

Create `.env.local` for local development:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Add your env vars here
```

### Import Aliases

TypeScript paths configured in `tsconfig.json`:

```typescript
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";
```

### Code Quality

Auto-sort imports on save with:
```bash
pnpm lint --fix
pnpm format
```

## 📈 Performance Optimizations

- ✅ Turbopack for blazing-fast dev builds
- ✅ Next.js Image optimization (AVIF, WebP)
- ✅ Experimental CSS optimization
- ✅ Font optimization with `next/font`
- ✅ Automatic code splitting
- ✅ React Server Components by default

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

### Other Platforms

Build command: `pnpm build`  
Output directory: `.next`  
Install command: `pnpm install`  
Dev command: `pnpm dev`

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Run `pnpm lint` before committing
4. Keep components small and reusable
5. Document complex logic with comments

## 📝 License

Proprietary — Loomic

---

**Built with ⚡ by the Loomic team**

