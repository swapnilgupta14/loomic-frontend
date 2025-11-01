"use client";

import { Info, User, Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import {
  ArrowTooltip,
  BasicTooltip,
  DelayTooltip,
  GlowTooltip,
  SlideTooltip,
} from "@/components/tooltips";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { type ThemeName, themes } from "@/lib/themes";

/**
 * Tooltip Components Preview
 * Showcase all tooltip variations
 */

export default function TooltipsPreview() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-clr-background via-clr-muted/30 to-clr-background py-20 px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Hero */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold gradient-primary">Tooltip Components</h1>
          <p className="text-xl text-clr-muted-foreground">
            Hover over elements to see tooltips in action
          </p>
        </div>

        {/* Basic Tooltip */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-clr-foreground">Basic Tooltip</h2>
          <Card className="p-8 bg-clr-card border-clr-border">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <BasicTooltip content="Top tooltip" position="top">
                <Button variant="outline">Hover me (Top)</Button>
              </BasicTooltip>
              <BasicTooltip content="Bottom tooltip" position="bottom">
                <Button variant="outline">Hover me (Bottom)</Button>
              </BasicTooltip>
              <BasicTooltip content="Left tooltip" position="left">
                <Button variant="outline">Hover me (Left)</Button>
              </BasicTooltip>
              <BasicTooltip content="Right tooltip" position="right">
                <Button variant="outline">Hover me (Right)</Button>
              </BasicTooltip>
            </div>
          </Card>
        </section>

        {/* Arrow Tooltip */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-clr-foreground">Arrow Tooltip</h2>
          <Card className="p-8 bg-clr-card border-clr-border">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <ArrowTooltip content="With arrow pointer" position="top">
                <div className="p-3 rounded-lg bg-clr-primary-subtle">
                  <Zap className="h-6 w-6 text-clr-primary" />
                </div>
              </ArrowTooltip>
              <ArrowTooltip content="Bottom arrow" position="bottom">
                <div className="p-3 rounded-lg bg-clr-secondary-subtle">
                  <User className="h-6 w-6 text-clr-secondary" />
                </div>
              </ArrowTooltip>
              <ArrowTooltip content="Info tooltip" position="right">
                <div className="p-3 rounded-lg bg-clr-accent-subtle">
                  <Info className="h-6 w-6 text-clr-accent" />
                </div>
              </ArrowTooltip>
            </div>
          </Card>
        </section>

        {/* Slide Tooltip */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-clr-foreground">Slide Tooltip</h2>
          <Card className="p-8 bg-clr-card border-clr-border">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <SlideTooltip content="Slides from top" position="top">
                <Button className="btn-primary">Slide Top</Button>
              </SlideTooltip>
              <SlideTooltip content="Slides from bottom" position="bottom">
                <Button className="btn-secondary">Slide Bottom</Button>
              </SlideTooltip>
              <SlideTooltip content="Slides from left" position="left">
                <Button variant="outline">Slide Left</Button>
              </SlideTooltip>
            </div>
          </Card>
        </section>

        {/* Glow Tooltip */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-clr-foreground">Glow Tooltip</h2>
          <Card className="p-8 bg-clr-card border-clr-border">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <GlowTooltip content="Primary glow" position="top" glowColor="primary">
                <Button className="btn-primary">Primary Glow</Button>
              </GlowTooltip>
              <GlowTooltip content="Secondary glow" position="top" glowColor="secondary">
                <Button className="btn-secondary">Secondary Glow</Button>
              </GlowTooltip>
              <GlowTooltip content="Accent glow" position="top" glowColor="accent">
                <Button
                  className="bg-clr-accent text-clr-accent-foreground hover:bg-clr-accent-hover"
                >
                  Accent Glow
                </Button>
              </GlowTooltip>
            </div>
          </Card>
        </section>

        {/* Delay Tooltip */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-clr-foreground">Delay Tooltip</h2>
          <Card className="p-8 bg-clr-card border-clr-border">
            <div className="flex flex-wrap items-center justify-center gap-8">
              <DelayTooltip content="Shows after 500ms" delay={500}>
                <Button variant="outline">Delay 500ms</Button>
              </DelayTooltip>
              <DelayTooltip content="Shows after 1000ms" delay={1000}>
                <Button variant="outline">Delay 1000ms</Button>
              </DelayTooltip>
              <DelayTooltip content="No delay" delay={0}>
                <Button variant="outline">No Delay</Button>
              </DelayTooltip>
            </div>
          </Card>
        </section>

        {/* Usage Example */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-clr-foreground">Real World Usage</h2>
          <Card className="p-8 bg-clr-card border-clr-border">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-clr-foreground">User Profile:</span>
                <BasicTooltip content="View user details">
                  <button className="w-10 h-10 rounded-full bg-gradient-to-br from-clr-primary to-clr-accent flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </button>
                </BasicTooltip>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-clr-foreground">Quick Actions:</span>
                <GlowTooltip content="Boost performance" glowColor="primary">
                  <button className="w-10 h-10 rounded-lg bg-clr-primary-subtle hover:bg-clr-primary-hover flex items-center justify-center">
                    <Zap className="h-5 w-5 text-clr-primary" />
                  </button>
                </GlowTooltip>
                <ArrowTooltip content="More information">
                  <button className="w-10 h-10 rounded-lg bg-clr-accent-subtle hover:bg-clr-accent-hover flex items-center justify-center">
                    <Info className="h-5 w-5 text-clr-accent" />
                  </button>
                </ArrowTooltip>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

