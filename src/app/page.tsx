import { ArrowRight, Box, Code2, Layout, Palette, Zap } from "lucide-react";
import Link from "next/link";

import { AppHeader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-clr-background">
      <AppHeader />

      {/* Hero Section */}
      <main className="max-w-[1600px] mx-auto px-6">
        <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-20">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            {/* Main Title */}
            <div className="space-y-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-clr-primary to-clr-accent shadow-lg shadow-clr-primary/30 mb-6">
                <Box className="w-8 h-8 text-white" />
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                <span className="gradient-primary">Premium Components</span>
                <br />
                <span className="text-clr-foreground">for Modern Web</span>
              </h1>

              <p className="text-xl md:text-2xl text-clr-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Beautiful, responsive header components built with Next.js and Tailwind CSS. Ready
                to copy and customize for your projects.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/components">
                <Button size="lg" className="btn-primary group">
                  <Code2 className="mr-2 h-5 w-5" />
                  Browse Components
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-clr-border hover:bg-clr-surface"
              >
                <Palette className="mr-2 h-5 w-5" />
                View Themes
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 border-t border-clr-border">
              <div className="text-center">
                <div className="text-4xl font-bold gradient-primary mb-2">11</div>
                <div className="text-sm text-clr-muted-foreground">Components</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-primary mb-2">100%</div>
                <div className="text-sm text-clr-muted-foreground">Responsive</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-primary mb-2">6</div>
                <div className="text-sm text-clr-muted-foreground">Themes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-primary mb-2">TS</div>
                <div className="text-sm text-clr-muted-foreground">TypeScript</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 border-t border-clr-border">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-primary">Why Choose</span> Loomic
              </h2>
              <p className="text-lg text-clr-muted-foreground">
                Production-ready components with modern design patterns
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-clr-card border-clr-border p-6 hover:border-clr-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-clr-primary-subtle flex items-center justify-center mb-4">
                  <Code2 className="h-6 w-6 text-clr-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-clr-foreground">Clean Code</h3>
                <p className="text-clr-muted-foreground">
                  Well-structured, documented TypeScript code following best practices.
                </p>
              </Card>

              <Card className="bg-clr-card border-clr-border p-6 hover:border-clr-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-clr-secondary-subtle flex items-center justify-center mb-4">
                  <Layout className="h-6 w-6 text-clr-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-clr-foreground">Fully Responsive</h3>
                <p className="text-clr-muted-foreground">
                  Mobile-first design that works perfectly on all screen sizes.
                </p>
              </Card>

              <Card className="bg-clr-card border-clr-border p-6 hover:border-clr-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-clr-accent-subtle flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-clr-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-clr-foreground">Theme System</h3>
                <p className="text-clr-muted-foreground">
                  Multiple themes with semantic color tokens for easy customization.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 border-t border-clr-border">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-clr-primary to-clr-accent shadow-lg shadow-clr-primary/30 mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to <span className="gradient-primary">Build Something</span> Amazing?
            </h2>
            <p className="text-lg text-clr-muted-foreground max-w-2xl mx-auto">
              Start exploring our component library and bring your ideas to life with beautiful,
              modern headers.
            </p>
            <Link href="/components">
              <Button size="lg" className="btn-primary group">
                <Code2 className="mr-2 h-5 w-5" />
                Browse All Components
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
