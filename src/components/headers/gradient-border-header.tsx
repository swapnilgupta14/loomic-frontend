"use client";

import { Menu, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

/**
 * Gradient Border Header
 * Animated gradient border with neon glow effect
 * Perfect for bold, eye-catching designs
 */

export function GradientBorderHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "Products", href: "/products" },
    { label: "Collections", href: "/collections" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      {/* Gradient Border Container */}
      <div className="relative rounded-2xl overflow-hidden">
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-clr-primary via-clr-accent to-clr-secondary animate-pulse opacity-50" />
        <div className="absolute inset-[2px] bg-clr-background rounded-2xl" />

        {/* Content */}
        <div className="relative container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-clr-primary to-clr-accent blur-lg opacity-50" />
                <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-clr-primary to-clr-accent flex items-center justify-center">
                  <span className="text-clr-background font-bold text-xl">L</span>
                </div>
              </div>
              <span className="font-bold text-xl gradient-primary">Loomic</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative group text-clr-foreground hover:text-clr-primary transition-colors font-medium"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-clr-primary to-clr-accent group-hover:w-full transition-all duration-300" />
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="ghost"
                className="hidden md:flex relative group"
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-clr-accent text-clr-accent-foreground text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className="hidden md:flex"
              >
                <User className="h-5 w-5" />
              </Button>

              {/* CTA Button */}
              <Button className="hidden md:flex relative group overflow-hidden">
                <span className="absolute inset-0 bg-gradient-to-r from-clr-primary via-clr-accent to-clr-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative">Get Started</span>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                size="icon"
                variant="ghost"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-6 pt-6 border-t border-clr-border">
              <nav className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-clr-foreground hover:text-clr-primary transition-colors font-medium"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="flex gap-3 mt-4">
                  <Button className="flex-1">Get Started</Button>
                  <Button size="icon" variant="outline">
                    <ShoppingBag className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="outline">
                    <User className="h-5 w-5" />
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

