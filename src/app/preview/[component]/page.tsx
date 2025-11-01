"use client";

import { notFound, redirect, useSearchParams } from "next/navigation";
import { use, useEffect } from "react";

import {
  FloatingNavHeader,
  GlassMorphismHeader,
  GradientBorderHeader,
  MegaMenuHeader,
  MinimalistCenterHeader,
  SidebarNavHeader,
} from "@/components/headers";
import { Card } from "@/components/ui/card";
import { type ThemeName, themes } from "@/lib/themes";

/**
 * Preview Page for Components
 * This page renders in an isolated environment (iframe)
 * Treats as a secondary screen for component showcase
 */

const componentMap = {
  "glass-morphism": GlassMorphismHeader,
  "gradient-border": GradientBorderHeader,
  "floating-nav": FloatingNavHeader,
  "sidebar-nav": SidebarNavHeader,
  "mega-menu": MegaMenuHeader,
  "minimalist-center": MinimalistCenterHeader,
} as const;

export default function PreviewPage({
  params,
}: {
  params: Promise<{ component: string }>;
}) {
  // Unwrap params using React.use()
  const { component } = use(params);
  const searchParams = useSearchParams();

  // Get theme parameters from URL
  const themeParam = (searchParams.get("theme") || "default") as ThemeName;
  const modeParam = searchParams.get("mode") || "dark";

  // Apply theme from URL parameters
  useEffect(() => {
    const theme = themes[themeParam];
    if (!theme) return;

    const mode = modeParam === "dark" ? "dark" : "light";
    const colors = theme.colors[mode];

    // Apply ONLY branding colors (primary, secondary, accent)
    // Background stays with the dark/light mode theme
    document.documentElement.style.setProperty("--clr-primary", colors.primary);
    document.documentElement.style.setProperty("--clr-secondary", colors.secondary);
    document.documentElement.style.setProperty("--clr-accent", colors.accent);

    // Update hover states for primary
    const [h, s, l] = colors.primary.split(" ").map((v) => parseFloat(v));
    const hoverL = mode === "dark" ? l + 10 : l - 10;
    document.documentElement.style.setProperty("--clr-primary-hover", `${h} ${s}% ${hoverL}%`);

    // Update primary-subtle
    const subtleL = mode === "dark" ? 15 : 97;
    document.documentElement.style.setProperty(
      "--clr-primary-subtle",
      `${h} ${s}% ${subtleL}%`
    );

    // Update secondary hover/subtle
    const [sh, ss, sl] = colors.secondary.split(" ").map((v) => parseFloat(v));
    const secHoverL = mode === "dark" ? sl + 10 : sl - 10;
    document.documentElement.style.setProperty("--clr-secondary-hover", `${sh} ${ss}% ${secHoverL}%`);
    document.documentElement.style.setProperty(
      "--clr-secondary-subtle",
      `${sh} ${ss}% ${subtleL}%`
    );

    // Update accent hover/subtle
    const [ah, as, al] = colors.accent.split(" ").map((v) => parseFloat(v));
    const accHoverL = mode === "dark" ? al + 10 : al - 10;
    document.documentElement.style.setProperty("--clr-accent-hover", `${ah} ${as}% ${accHoverL}%`);
    document.documentElement.style.setProperty(
      "--clr-accent-subtle",
      `${ah} ${as}% ${subtleL}%`
    );

    // Apply dark mode class (this controls background via globals.scss)
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Add custom beigish background for light mode preview
    if (mode === "light") {
      document.documentElement.style.setProperty("--clr-background", "40 15% 96%"); // Beigish light background
      document.documentElement.style.setProperty("--clr-foreground", "240 10% 10%");
    }
  }, [themeParam, modeParam]);

  // Handle tooltips as a special case (redirect to dedicated page)
  if (component === "tooltips") {
    redirect("/preview/tooltips");
  }

  const HeaderComponent = componentMap[component as keyof typeof componentMap];

  if (!HeaderComponent) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-clr-background via-clr-muted/30 to-clr-background">
      {/* Render the header component */}
      <HeaderComponent />

      {/* Page Content - Demo/Filler */}
      <div className="pt-32 px-8 pb-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-bold gradient-primary">
              Welcome to Loomic
            </h1>
            <p className="text-2xl text-clr-muted-foreground max-w-3xl">
              This is a live preview of the header component. Scroll down to see how it behaves
              with content below.
            </p>
            <div className="flex gap-4 pt-4">
              <button className="px-6 py-3 rounded-lg bg-clr-primary text-clr-primary-foreground hover:bg-clr-primary-hover transition-colors font-medium">
                Get Started
              </button>
              <button className="px-6 py-3 rounded-lg border border-clr-border hover:bg-clr-surface transition-colors font-medium">
                Learn More
              </button>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 bg-clr-card border-clr-border hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-clr-primary to-clr-accent mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{i}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Feature {i}</h3>
                <p className="text-clr-muted-foreground">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod
                  repellendus.
                </p>
              </Card>
            ))}
          </div>

          {/* Content Sections */}
          <div className="space-y-8 pt-12">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold">About Our Platform</h2>
              <p className="text-lg text-clr-muted-foreground leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 bg-clr-card border-clr-border">
                <h3 className="text-2xl font-semibold mb-4 gradient-primary">
                  Why Choose Us?
                </h3>
                <ul className="space-y-3 text-clr-muted-foreground">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-clr-primary" />
                    Professional and modern design
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-clr-primary" />
                    Fully responsive and mobile-friendly
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-clr-primary" />
                    Built with latest technologies
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-clr-primary" />
                    Easy to customize and extend
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-clr-card border-clr-border">
                <h3 className="text-2xl font-semibold mb-4 gradient-secondary">
                  Get Started Today
                </h3>
                <p className="text-clr-muted-foreground mb-4">
                  Join thousands of satisfied users who have transformed their workflow with our
                  platform.
                </p>
                <button className="w-full px-6 py-3 rounded-lg bg-clr-secondary text-clr-secondary-foreground hover:bg-clr-secondary-hover transition-colors font-medium">
                  Start Free Trial
                </button>
              </Card>
            </div>
          </div>

          {/* More scrollable content */}
          <div className="space-y-6 pt-12">
            <h2 className="text-4xl font-bold">Explore More</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Card
                  key={i}
                  className="aspect-square p-4 bg-clr-card border-clr-border hover:border-clr-primary transition-colors flex items-center justify-center"
                >
                  <span className="text-4xl font-bold text-clr-muted-foreground opacity-50">
                    {i}
                  </span>
                </Card>
              ))}
            </div>
          </div>

          {/* Footer Content */}
          <div className="pt-20 pb-12 border-t border-clr-border">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold gradient-accent">
                Ready to Get Started?
              </h2>
              <p className="text-clr-muted-foreground max-w-2xl mx-auto">
                Experience the power of modern web development with our comprehensive suite of
                tools and components.
              </p>
              <button className="px-8 py-4 rounded-lg bg-gradient-to-r from-clr-primary to-clr-accent text-white font-semibold hover:shadow-2xl hover:shadow-clr-primary/50 transition-all">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

