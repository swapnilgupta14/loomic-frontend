"use client";

import {
  Box,
  ChevronDown,
  Layers,
  Menu,
  Palette,
  Rocket,
  ShoppingBag,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

/**
 * Mega Menu Header
 * Grid layout dropdown with rich content
 * Perfect for e-commerce and content-heavy sites
 */

export function MegaMenuHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  const megaMenuContent = {
    products: {
      sections: [
        {
          title: "Features",
          items: [
            { label: "Portfolio Builder", icon: Palette, href: "#" },
            { label: "Templates", icon: Layers, href: "#" },
            { label: "Analytics", icon: Zap, href: "#" },
            { label: "Integrations", icon: Box, href: "#" },
          ],
        },
        {
          title: "Solutions",
          items: [
            { label: "For Designers", icon: Sparkles, href: "#" },
            { label: "For Developers", icon: Rocket, href: "#" },
            { label: "For Teams", icon: ShoppingBag, href: "#" },
          ],
        },
      ],
      featured: {
        title: "New: AI Portfolio Generator",
        description: "Create stunning portfolios with AI in minutes",
        image: "🎨",
      },
    },
    resources: {
      sections: [
        {
          title: "Learn",
          items: [
            { label: "Documentation", icon: Box, href: "#" },
            { label: "Tutorials", icon: Sparkles, href: "#" },
            { label: "Blog", icon: Zap, href: "#" },
          ],
        },
        {
          title: "Support",
          items: [
            { label: "Help Center", icon: Palette, href: "#" },
            { label: "Community", icon: Layers, href: "#" },
            { label: "Contact Us", icon: Rocket, href: "#" },
          ],
        },
      ],
      featured: {
        title: "Latest Blog Post",
        description: "10 Tips for Building Amazing Portfolios",
        image: "📝",
      },
    },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-clr-card/90 backdrop-blur-xl border-b border-clr-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-clr-primary to-clr-accent flex items-center justify-center">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <span className="font-bold text-xl gradient-primary">Loomic</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Products Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu("products")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-clr-surface transition-colors">
                <span className="font-medium">Products</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Mega Menu Dropdown */}
              {activeMegaMenu === "products" && (
                <div className="absolute top-full left-0 mt-2 w-[600px] animate-slide-down">
                  <div className="bg-clr-card border border-clr-border rounded-xl shadow-2xl p-6">
                    <div className="grid grid-cols-3 gap-6">
                      {/* Sections */}
                      {megaMenuContent.products.sections.map((section) => (
                        <div key={section.title}>
                          <h3 className="text-sm font-semibold text-clr-muted-foreground uppercase tracking-wider mb-3">
                            {section.title}
                          </h3>
                          <div className="space-y-2">
                            {section.items.map((item) => {
                              const Icon = item.icon;
                              return (
                                <a
                                  key={item.label}
                                  href={item.href}
                                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-clr-primary-subtle hover:text-clr-primary transition-all group"
                                >
                                  <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                  <span className="text-sm font-medium">{item.label}</span>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      ))}

                      {/* Featured Card */}
                      <div className="bg-gradient-to-br from-clr-primary-subtle to-clr-accent-subtle rounded-lg p-4">
                        <div className="text-4xl mb-2">
                          {megaMenuContent.products.featured.image}
                        </div>
                        <h4 className="font-semibold mb-1">
                          {megaMenuContent.products.featured.title}
                        </h4>
                        <p className="text-sm text-clr-muted-foreground mb-3">
                          {megaMenuContent.products.featured.description}
                        </p>
                        <Button size="sm" className="btn-primary w-full">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setActiveMegaMenu("resources")}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-clr-surface transition-colors">
                <span className="font-medium">Resources</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {/* Mega Menu Dropdown */}
              {activeMegaMenu === "resources" && (
                <div className="absolute top-full left-0 mt-2 w-[600px] animate-slide-down">
                  <div className="bg-clr-card border border-clr-border rounded-xl shadow-2xl p-6">
                    <div className="grid grid-cols-3 gap-6">
                      {/* Sections */}
                      {megaMenuContent.resources.sections.map((section) => (
                        <div key={section.title}>
                          <h3 className="text-sm font-semibold text-clr-muted-foreground uppercase tracking-wider mb-3">
                            {section.title}
                          </h3>
                          <div className="space-y-2">
                            {section.items.map((item) => {
                              const Icon = item.icon;
                              return (
                                <a
                                  key={item.label}
                                  href={item.href}
                                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-clr-primary-subtle hover:text-clr-primary transition-all group"
                                >
                                  <Icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                  <span className="text-sm font-medium">{item.label}</span>
                                </a>
                              );
                            })}
                          </div>
                        </div>
                      ))}

                      {/* Featured Card */}
                      <div className="bg-gradient-to-br from-clr-secondary-subtle to-clr-accent-subtle rounded-lg p-4">
                        <div className="text-4xl mb-2">
                          {megaMenuContent.resources.featured.image}
                        </div>
                        <h4 className="font-semibold mb-1">
                          {megaMenuContent.resources.featured.title}
                        </h4>
                        <p className="text-sm text-clr-muted-foreground mb-3">
                          {megaMenuContent.resources.featured.description}
                        </p>
                        <Button size="sm" className="btn-secondary w-full">
                          Read Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Regular Nav Items */}
            <a
              href="#"
              className="px-4 py-2 rounded-lg hover:bg-clr-surface transition-colors font-medium"
            >
              Pricing
            </a>
            <a
              href="#"
              className="px-4 py-2 rounded-lg hover:bg-clr-surface transition-colors font-medium"
            >
              About
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden lg:flex">
              Sign In
            </Button>
            <Button className="hidden lg:flex btn-primary">Get Started</Button>

            {/* Mobile Menu Toggle */}
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-clr-border">
            <nav className="flex flex-col gap-2">
              <a
                href="#"
                className="px-4 py-3 rounded-lg hover:bg-clr-surface transition-colors font-medium"
              >
                Products
              </a>
              <a
                href="#"
                className="px-4 py-3 rounded-lg hover:bg-clr-surface transition-colors font-medium"
              >
                Resources
              </a>
              <a
                href="#"
                className="px-4 py-3 rounded-lg hover:bg-clr-surface transition-colors font-medium"
              >
                Pricing
              </a>
              <a
                href="#"
                className="px-4 py-3 rounded-lg hover:bg-clr-surface transition-colors font-medium"
              >
                About
              </a>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1">
                  Sign In
                </Button>
                <Button className="flex-1 btn-primary">Get Started</Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

