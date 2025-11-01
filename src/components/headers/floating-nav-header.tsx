"use client";

import { Home, Layers, Mail, User } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Floating Nav Header
 * Blur backdrop with centered floating navigation
 * Appears on scroll, perfect for immersive experiences
 */

export function FloatingNavHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "work", label: "Work", icon: Layers },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Always visible logo */}
      <div className="fixed top-6 left-6 z-50">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-clr-card/80 backdrop-blur-xl border border-clr-border/50 shadow-lg">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-clr-primary to-clr-accent flex items-center justify-center">
            <span className="text-white font-bold">L</span>
          </div>
          <span className="font-semibold gradient-primary">Loomic</span>
        </div>
      </div>

      {/* Floating Navigation */}
      <nav
        className={cn(
          "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500",
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="flex items-center gap-2 px-3 py-3 rounded-full bg-clr-card/90 backdrop-blur-2xl border border-clr-border/50 shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
                  isActive
                    ? "bg-clr-primary text-clr-primary-foreground shadow-lg shadow-clr-primary/50"
                    : "text-clr-foreground hover:bg-clr-surface/50"
                )}
              >
                <Icon className="h-4 w-4" />
                <span
                  className={cn(
                    "font-medium transition-all duration-300",
                    isActive ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
                  )}
                >
                  {item.label}
                </span>

                {/* Glow effect on active */}
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-clr-primary blur-xl opacity-50 -z-10" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Action Button - Right Side */}
      <div
        className={cn(
          "fixed top-6 right-6 z-50 transition-all duration-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        )}
      >
        <button className="px-6 py-2 rounded-full bg-gradient-to-r from-clr-primary to-clr-accent text-white font-medium shadow-lg hover:shadow-2xl hover:shadow-clr-primary/50 transition-all">
          Hire Me
        </button>
      </div>
    </>
  );
}

