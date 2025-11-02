import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "gradient" | "icon" | "loading" | "group" | "fab";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function PrimaryButton({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-6 py-2.5 rounded-lg font-medium transition-all",
        "bg-clr-primary text-clr-primary-foreground",
        "hover:bg-clr-primary-hover hover:shadow-lg hover:shadow-clr-primary/30",
        "active:scale-95",
        className
      )}
      {...props}
    >
      {children || "Primary"}
    </button>
  );
}

export function OutlineButton({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-6 py-2.5 rounded-lg font-medium transition-all",
        "border-2 border-clr-primary text-clr-primary bg-transparent",
        "hover:bg-clr-primary hover:text-clr-primary-foreground",
        "active:scale-95",
        className
      )}
      {...props}
    >
      {children || "Outline"}
    </button>
  );
}

export function GhostButton({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-6 py-2.5 rounded-lg font-medium transition-all",
        "text-clr-foreground bg-transparent",
        "hover:bg-clr-surface hover:text-clr-primary",
        "active:scale-95",
        className
      )}
      {...props}
    >
      {children || "Ghost"}
    </button>
  );
}

export function GradientButton({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-6 py-2.5 rounded-lg font-medium transition-all relative overflow-hidden",
        "bg-gradient-to-r from-clr-primary via-clr-accent to-clr-secondary text-white",
        "hover:shadow-2xl hover:shadow-clr-primary/50 hover:scale-105",
        "active:scale-95",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-clr-secondary before:via-clr-accent before:to-clr-primary",
        "before:opacity-0 hover:before:opacity-100 before:transition-opacity",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children || "Gradient"}</span>
    </button>
  );
}

export function IconButton({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "w-10 h-10 rounded-lg font-medium transition-all flex items-center justify-center",
        "bg-clr-primary text-clr-primary-foreground",
        "hover:bg-clr-primary-hover hover:shadow-lg",
        "active:scale-90",
        className
      )}
      {...props}
    >
      {children || "★"}
    </button>
  );
}

export function LoadingButton({ className, children, isLoading, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "px-6 py-2.5 rounded-lg font-medium transition-all flex items-center gap-2",
        "bg-clr-primary text-clr-primary-foreground",
        "hover:bg-clr-primary-hover",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children || (isLoading ? "Loading..." : "Load")}
    </button>
  );
}

export function ButtonGroup({ className }: { className?: string }) {
  return (
    <div
      className={cn("inline-flex rounded-lg border border-clr-border overflow-hidden", className)}
    >
      <button className="px-4 py-2 bg-clr-card hover:bg-clr-surface transition-colors border-r border-clr-border text-sm font-medium">
        Left
      </button>
      <button className="px-4 py-2 bg-clr-primary text-clr-primary-foreground text-sm font-medium">
        Center
      </button>
      <button className="px-4 py-2 bg-clr-card hover:bg-clr-surface transition-colors border-l border-clr-border text-sm font-medium">
        Right
      </button>
    </div>
  );
}

export function FloatingActionButton({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "w-14 h-14 rounded-full font-bold text-xl transition-all",
        "bg-gradient-to-br from-clr-primary to-clr-accent text-white",
        "hover:shadow-2xl hover:shadow-clr-primary/50 hover:scale-110",
        "active:scale-95",
        className
      )}
      {...props}
    >
      {children || "+"}
    </button>
  );
}
