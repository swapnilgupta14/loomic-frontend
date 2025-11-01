import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "dots" | "bars" | "pulse" | "ripple" | "gradient";
}

/**
 * Modern loading spinner component with multiple variants
 * Demonstrates: size variants, animation variants, cn() utility
 */
export function LoadingSpinner({ size = "md", className, variant = "dots" }: LoadingSpinnerProps) {
  const sizeScale = {
    sm: 0.6,
    md: 1,
    lg: 1.5,
  };

  const scale = sizeScale[size];

  // Pulsing dots loader (default)
  if (variant === "dots") {
    return (
      <div className={cn("flex items-center gap-2", className)} role="status" aria-label="Loading">
        <div
          className="rounded-full bg-clr-primary animate-pulse"
          style={{
            width: `${8 * scale}px`,
            height: `${8 * scale}px`,
            animationDelay: "0ms",
            animationDuration: "1000ms",
          }}
        />
        <div
          className="rounded-full bg-clr-primary animate-pulse"
          style={{
            width: `${8 * scale}px`,
            height: `${8 * scale}px`,
            animationDelay: "200ms",
            animationDuration: "1000ms",
          }}
        />
        <div
          className="rounded-full bg-clr-primary animate-pulse"
          style={{
            width: `${8 * scale}px`,
            height: `${8 * scale}px`,
            animationDelay: "400ms",
            animationDuration: "1000ms",
          }}
        />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  // Animated bars loader
  if (variant === "bars") {
    return (
      <div className={cn("flex items-center gap-1", className)} role="status" aria-label="Loading">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-clr-primary rounded-full animate-pulse"
            style={{
              width: `${4 * scale}px`,
              height: `${24 * scale}px`,
              animationDelay: `${i * 100}ms`,
              animationDuration: "800ms",
            }}
          />
        ))}
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  // Ripple effect loader
  if (variant === "ripple") {
    return (
      <div
        className={cn("relative flex items-center justify-center", className)}
        style={{ width: `${64 * scale}px`, height: `${64 * scale}px` }}
        role="status"
        aria-label="Loading"
      >
        <div
          className="absolute rounded-full border-2 border-clr-primary animate-ping"
          style={{
            width: `${48 * scale}px`,
            height: `${48 * scale}px`,
            animationDuration: "1500ms",
          }}
        />
        <div
          className="absolute rounded-full border-2 border-clr-primary animate-ping"
          style={{
            width: `${32 * scale}px`,
            height: `${32 * scale}px`,
            animationDuration: "1500ms",
            animationDelay: "300ms",
          }}
        />
        <div
          className="rounded-full bg-clr-primary"
          style={{
            width: `${12 * scale}px`,
            height: `${12 * scale}px`,
          }}
        />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  // Gradient pulse loader
  if (variant === "gradient") {
    return (
      <div
        className={cn("relative overflow-hidden rounded-lg", className)}
        style={{ width: `${120 * scale}px`, height: `${8 * scale}px` }}
        role="status"
        aria-label="Loading"
      >
        <div className="absolute inset-0 bg-clr-primary-subtle" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-clr-primary to-transparent animate-shimmer"
          style={{
            backgroundSize: "200% 100%",
            animation: "shimmer 1.5s infinite",
          }}
        />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  // Pulse loader
  if (variant === "pulse") {
    return (
      <div
        className={cn("relative flex items-center justify-center", className)}
        style={{ width: `${64 * scale}px`, height: `${64 * scale}px` }}
        role="status"
        aria-label="Loading"
      >
        <div
          className="absolute rounded-full bg-clr-primary opacity-75 animate-ping"
          style={{
            width: `${48 * scale}px`,
            height: `${48 * scale}px`,
            animationDuration: "1000ms",
          }}
        />
        <div
          className="rounded-full bg-clr-primary"
          style={{
            width: `${32 * scale}px`,
            height: `${32 * scale}px`,
          }}
        />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  // Default fallback
  return (
    <div className={cn("flex items-center gap-2", className)} role="status" aria-label="Loading">
      <div
        className="rounded-full bg-clr-primary animate-pulse"
        style={{ width: `${8 * scale}px`, height: `${8 * scale}px` }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

