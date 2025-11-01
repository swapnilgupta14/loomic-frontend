"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

/**
 * Example hero section component demonstrating Loomic best practices
 * - TypeScript interfaces for props
 * - Framer Motion animations
 * - shadcn/ui components
 * - Tailwind + custom utilities
 * - Responsive design
 */
export function HeroSection({
  title,
  subtitle,
  ctaText = "Get Started",
  onCtaClick,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "min-h-screen flex items-center justify-center py-20 px-4",
        "bg-gradient-to-br from-brand-50 via-white to-brand-100",
        "dark:from-gray-950 dark:via-gray-900 dark:to-gray-950",
        className
      )}
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Animated title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold mb-6 gradient-brand"
        >
          {title}
        </motion.h1>

        {/* Animated subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12"
        >
          {subtitle}
        </motion.p>

        {/* Animated CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            size="lg"
            onClick={onCtaClick}
            className="bg-brand-500 hover:bg-brand-600 text-white group"
          >
            {ctaText}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        >
          {[
            { title: "Build", icon: "🏗️" },
            { title: "Showcase", icon: "✨" },
            { title: "Sell", icon: "💰" },
          ].map((feature, index) => (
            <Card
              key={feature.title}
              className="p-6 glass-effect card-hover cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-brand-600 dark:text-brand-400">
                  {feature.title}
                </h3>
              </motion.div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

