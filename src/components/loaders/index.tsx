import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function SpinnerLoader({ className, size = "md" }: LoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8 border-2",
    md: "w-12 h-12 border-3",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div
      className={cn(
        "rounded-full border-clr-primary/20 border-t-clr-primary animate-spin",
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function DotsLoader({ className, size = "md" }: LoaderProps) {
  const dotSizes = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <div className={cn("flex items-center gap-2", className)} role="status" aria-label="Loading">
      <div
        className={cn("rounded-full bg-clr-primary animate-pulse", dotSizes[size])}
        style={{ animationDelay: "0ms", animationDuration: "1000ms" }}
      />
      <div
        className={cn("rounded-full bg-clr-primary animate-pulse", dotSizes[size])}
        style={{ animationDelay: "200ms", animationDuration: "1000ms" }}
      />
      <div
        className={cn("rounded-full bg-clr-primary animate-pulse", dotSizes[size])}
        style={{ animationDelay: "400ms", animationDuration: "1000ms" }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function PulseLoader({ className, size = "md" }: LoaderProps) {
  const sizes = {
    sm: { outer: "w-12 h-12", inner: "w-8 h-8" },
    md: { outer: "w-16 h-16", inner: "w-10 h-10" },
    lg: { outer: "w-20 h-20", inner: "w-14 h-14" },
  };

  return (
    <div
      className={cn("relative flex items-center justify-center", sizes[size].outer, className)}
      role="status"
      aria-label="Loading"
    >
      <div
        className={cn(
          "absolute rounded-full bg-clr-primary opacity-75 animate-ping",
          sizes[size].outer
        )}
        style={{ animationDuration: "1000ms" }}
      />
      <div className={cn("rounded-full bg-clr-primary", sizes[size].inner)} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function BarsLoader({ className, size = "md" }: LoaderProps) {
  const barHeights = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
  };

  const barWidths = {
    sm: "w-1",
    md: "w-1.5",
    lg: "w-2",
  };

  return (
    <div className={cn("flex items-center gap-1", className)} role="status" aria-label="Loading">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn(
            "bg-clr-primary rounded-full animate-pulse",
            barWidths[size],
            barHeights[size]
          )}
          style={{
            animationDelay: `${i * 100}ms`,
            animationDuration: "800ms",
          }}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function ProgressLoader({ className, size = "md" }: LoaderProps) {
  const heights = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  const widths = {
    sm: "w-32",
    md: "w-48",
    lg: "w-64",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full bg-clr-primary-subtle",
        heights[size],
        widths[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <div
        className="absolute inset-0 bg-clr-primary rounded-full animate-shimmer"
        style={{
          backgroundImage: "linear-gradient(90deg, transparent, hsl(var(--clr-primary)), transparent)",
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

