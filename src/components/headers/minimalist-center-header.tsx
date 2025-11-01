"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";

/**
 * Minimalist Center Header
 * Ultra clean, centered layout
 * Perfect for personal portfolios and minimal designs
 */

export function MinimalistCenterHeader() {
  const navItems = [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-clr-background/80 backdrop-blur-md border-b border-clr-border/30">
      <div className="container mx-auto px-4 py-6">
        {/* Centered Layout */}
        <div className="flex flex-col items-center gap-6">
          {/* Logo/Name */}
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              <span className="gradient-primary">John Doe</span>
            </h1>
            <p className="text-sm text-clr-muted-foreground mt-1">
              Designer & Developer
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-clr-foreground hover:text-clr-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-clr-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-clr-primary-subtle hover:text-clr-primary transition-all"
                  aria-label={social.label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

