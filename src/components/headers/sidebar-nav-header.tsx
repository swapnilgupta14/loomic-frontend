"use client";

import {
  Bell,
  Compass,
  Heart,
  Home,
  Menu,
  Settings,
  TrendingUp,
  User,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Sidebar Navigation Header
 * Mobile-first sidebar with smooth animations
 * Perfect for dashboard and app interfaces
 */

export function SidebarNavHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const mainNavItems = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Explore", icon: Compass, href: "/explore" },
    { label: "Trending", icon: TrendingUp, href: "/trending" },
    { label: "Community", icon: Users, href: "/community" },
  ];

  const secondaryNavItems = [
    { label: "Favorites", icon: Heart, href: "/favorites" },
    { label: "Profile", icon: User, href: "/profile" },
    { label: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <>
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-clr-card/80 backdrop-blur-xl border-b border-clr-border/50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Menu Button & Logo */}
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hover:bg-clr-surface"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-clr-primary to-clr-accent flex items-center justify-center">
                <span className="text-white font-bold">L</span>
              </div>
              <span className="font-bold text-lg gradient-primary hidden sm:inline">
                Loomic
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-clr-accent rounded-full" />
            </Button>
            <Button size="icon" variant="ghost" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 w-80 bg-clr-card border-r border-clr-border z-50 transition-transform duration-300",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-clr-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-clr-primary to-clr-accent flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <div>
                <h2 className="font-bold text-lg gradient-primary">Loomic</h2>
                <p className="text-xs text-clr-muted-foreground">Dashboard</p>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <div className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-clr-foreground hover:bg-clr-primary-subtle hover:text-clr-primary transition-all group"
                  >
                    <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                );
              })}
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-clr-border" />

            {/* Secondary Navigation */}
            <div className="space-y-1">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-clr-muted-foreground hover:bg-clr-surface hover:text-clr-foreground transition-all group"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </a>
                );
              })}
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-clr-border">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-clr-primary-subtle">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-clr-primary to-clr-accent flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">John Doe</p>
                <p className="text-xs text-clr-muted-foreground">john@loomic.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

