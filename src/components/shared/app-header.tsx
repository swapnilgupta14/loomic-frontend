"use client";

import { Code2 } from "lucide-react";
import Link from "next/link";

import { ThemeMenu, ThemeToggle } from "@/components/shared";

/**
 * App Header Component
 * Minimalistic header used across the application
 */

interface AppHeaderProps {
  showBreadcrumb?: boolean;
  breadcrumbText?: string;
}

export function AppHeader({ showBreadcrumb = false, breadcrumbText }: AppHeaderProps) {
  return (
    <header className="border-b border-clr-border/50 bg-clr-background/80 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo/Brand */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-clr-primary to-clr-accent flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-semibold text-clr-foreground group-hover:text-clr-primary transition-colors">
                Loomic
              </span>
            </Link>

            {/* Breadcrumb */}
            {showBreadcrumb && breadcrumbText && (
              <div className="hidden md:flex items-center gap-2 text-sm text-clr-muted-foreground">
                <span>/</span>
                <span className="text-clr-foreground font-medium">{breadcrumbText}</span>
              </div>
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/components"
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-clr-muted-foreground hover:text-clr-foreground hover:bg-clr-surface transition-colors"
            >
              <Code2 className="h-4 w-4" />
              <span>Components</span>
            </Link>

            <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm text-clr-muted-foreground hover:text-clr-foreground hover:bg-clr-surface transition-colors">
              <span>Docs</span>
            </button>

            <div className="w-px h-5 bg-clr-border" />

            {/* Theme Controls */}
            <div className="flex items-center gap-2">
              <ThemeMenu />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

