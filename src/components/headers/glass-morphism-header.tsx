"use client";

import { Menu, Search, User, X } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";

/**
 * Glass Morphism Header
 * Minimal frosted glass effect with blur backdrop
 * Perfect for modern, clean interfaces
 */

export function GlassMorphismHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Glass Container */}
      <div className="mx-4 mt-4 rounded-2xl bg-clr-card/30 backdrop-blur-2xl border border-clr-border/50 shadow-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-clr-primary to-clr-accent flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="font-bold text-xl gradient-primary">Loomic</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-clr-foreground hover:text-clr-primary hover:bg-clr-surface/50 transition-all"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-lg hover:bg-clr-surface/50 transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* User Profile */}
              <button
                className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-clr-surface/50 transition-colors"
                aria-label="Profile"
              >
                <User className="h-5 w-5" />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-clr-surface/50 transition-colors"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Search Bar (Expandable) */}
          {isSearchOpen && (
            <div className="mt-4 animate-slide-down">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-clr-surface/50 border-clr-border/50 backdrop-blur-xl"
                autoFocus
              />
            </div>
          )}

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-clr-border/50 animate-slide-down">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-4 py-3 rounded-lg text-clr-foreground hover:text-clr-primary hover:bg-clr-surface/50 transition-all"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-clr-surface/50 transition-all">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
