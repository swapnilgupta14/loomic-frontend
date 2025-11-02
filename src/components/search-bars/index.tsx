"use client";

import { Command, Filter, Search, X } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

export function MinimalSearch({ className, placeholder = "Search..." }: SearchBarProps) {
  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-clr-muted-foreground" />
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          "w-full pl-10 pr-4 py-2.5 rounded-lg",
          "bg-clr-background border border-clr-border",
          "text-clr-foreground placeholder:text-clr-muted-foreground",
          "focus:outline-none focus:ring-2 focus:ring-clr-primary focus:border-transparent",
          "transition-all"
        )}
      />
    </div>
  );
}

export function ExpandableSearch({ className }: SearchBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn("relative", className)}>
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            "bg-clr-primary text-clr-primary-foreground",
            "hover:bg-clr-primary-hover hover:shadow-lg",
            "transition-all"
          )}
        >
          <Search className="h-4 w-4" />
        </button>
      ) : (
        <div className="relative w-64 animate-fade-in">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-clr-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            autoFocus
            className={cn(
              "w-full pl-10 pr-10 py-2.5 rounded-full",
              "bg-clr-background border-2 border-clr-primary",
              "text-clr-foreground placeholder:text-clr-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-clr-primary/50",
              "transition-all"
            )}
          />
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-clr-muted-foreground hover:text-clr-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export function CommandSearch({ className, placeholder = "Type a command..." }: SearchBarProps) {
  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-clr-card border border-clr-border hover:border-clr-primary transition-all">
        <Command className="h-4 w-4 text-clr-muted-foreground flex-shrink-0" />
        <input
          type="text"
          placeholder={placeholder}
          className={cn(
            "flex-1 bg-transparent",
            "text-clr-foreground placeholder:text-clr-muted-foreground",
            "focus:outline-none"
          )}
        />
        <kbd className="px-2 py-0.5 rounded bg-clr-muted text-clr-muted-foreground text-xs font-mono">
          ⌘K
        </kbd>
      </div>
    </div>
  );
}

export function FilterSearch({ className, placeholder = "Search and filter..." }: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-clr-muted-foreground" />
        <input
          type="text"
          placeholder={placeholder}
          className={cn(
            "w-full pl-10 pr-12 py-2.5 rounded-lg",
            "bg-clr-background border border-clr-border",
            "text-clr-foreground placeholder:text-clr-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-clr-primary focus:border-transparent",
            "transition-all"
          )}
        />
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2",
            "p-1 rounded hover:bg-clr-surface transition-colors",
            showFilters && "bg-clr-primary text-clr-primary-foreground"
          )}
        >
          <Filter className="h-4 w-4" />
        </button>
      </div>

      {showFilters && (
        <div className="absolute top-full mt-2 w-full p-3 rounded-lg bg-clr-card border border-clr-border shadow-lg animate-fade-in">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span>Active</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span>Completed</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span>Archived</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

