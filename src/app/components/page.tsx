"use client";

import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Copy,
  ExternalLink,
  Layers,
  Layout,
  type LucideIcon,
  Maximize2,
  Menu,
  MousePointer2,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { AppHeader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/**
 * Components Showcase Page
 * Display all components organized by category in an isolated iframe preview
 * Treating the preview as a secondary screen
 */

interface Component {
  id: string;
  name: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
}

interface ComponentGroup {
  category: string;
  description: string;
  count: number;
  icon: LucideIcon;
  components: Component[];
}

const componentGroups: ComponentGroup[] = [
  {
    category: "Headers",
    description: "Navigation headers and top bars",
    count: 6,
    icon: Layout,
    components: [
      {
        id: "glass-morphism",
        name: "Glass Morphism",
        description: "Minimal frosted glass effect with blur",
        tags: ["Minimal", "Blur", "Modern"],
        icon: Sparkles,
      },
      {
        id: "gradient-border",
        name: "Gradient Border",
        description: "Animated gradient border with neon glow",
        tags: ["Bold", "Animated", "Neon"],
        icon: Zap,
      },
      {
        id: "floating-nav",
        name: "Floating Nav",
        description: "Blur backdrop with floating navigation",
        tags: ["Floating", "Minimal", "Scroll"],
        icon: Layout,
      },
      {
        id: "sidebar-nav",
        name: "Sidebar Nav",
        description: "Mobile-first sidebar navigation",
        tags: ["Mobile", "Sidebar", "Dashboard"],
        icon: Menu,
      },
      {
        id: "mega-menu",
        name: "Mega Menu",
        description: "Grid layout with dropdown mega menu",
        tags: ["E-commerce", "Dropdown", "Rich"],
        icon: Layers,
      },
      {
        id: "minimalist-center",
        name: "Minimalist Center",
        description: "Ultra clean, centered layout",
        tags: ["Minimal", "Centered", "Portfolio"],
        icon: Layout,
      },
    ],
  },
  {
    category: "Tooltips",
    description: "Minimal tooltips with animations",
    count: 5,
    icon: MousePointer2,
    components: [
      {
        id: "tooltips",
        name: "All Tooltips",
        description: "Collection of tooltip variants",
        tags: ["Minimal", "Animated", "Hover"],
        icon: MousePointer2,
      },
    ],
  },
];

export default function ComponentsPage() {
  const [selectedComponent, setSelectedComponent] = useState<string>("glass-morphism");
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null); // null = show all categories
  const [showAllInCategory, setShowAllInCategory] = useState(false); // Toggle to show all components in expanded view
  const [currentTheme, setCurrentTheme] = useState<string>("default");
  const [iframeKey, setIframeKey] = useState<number>(0); // Force iframe reload
  const [isPreviewLoading, setIsPreviewLoading] = useState(false); // Show loader
  const { theme } = useTheme();
  
  // Window control states
  const [isMinimizedCircle, setIsMinimizedCircle] = useState(false); // Red button - circular float
  const [isMinimizedRect, setIsMinimizedRect] = useState(false); // Yellow button - bottom right rect
  const [isMaximized, setIsMaximized] = useState(false); // Green button - maximized
  const [circlePosition, setCirclePosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Find current component across all groups
  const currentComponent = componentGroups
    .flatMap((group) => group.components)
    .find((c) => c.id === selectedComponent);

  // Build preview URL with theme parameters
  const previewUrl = `/preview/${selectedComponent}?theme=${currentTheme}&mode=${theme || "dark"}`;

  // Get total component count
  const totalComponents = componentGroups.reduce((acc, group) => acc + group.count, 0);

  // Load current theme from localStorage and set up event listeners
  useEffect(() => {
    const savedTheme = localStorage.getItem("loomic-theme") || "default";
    setCurrentTheme(savedTheme);
  }, []);

  // Listen for theme changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "loomic-theme" && e.newValue) {
        setCurrentTheme(e.newValue);
      }
    };

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newTheme = customEvent.detail?.theme || localStorage.getItem("loomic-theme") || "default";
      setCurrentTheme(newTheme);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("theme-changed", handleThemeChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("theme-changed", handleThemeChange);
    };
  }, []);

  // Force iframe reload when theme or dark mode changes
  useEffect(() => {
    setIsPreviewLoading(true);
    setIframeKey(prev => prev + 1);
    
    // Hide loader after iframe loads
    const timer = setTimeout(() => {
      setIsPreviewLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [currentTheme, theme]);

  // Get components to display in expanded view
  const getExpandedComponents = () => {
    if (!expandedCategory) return [];
    const group = componentGroups.find((g) => g.category === expandedCategory);
    if (!group) return [];
    return showAllInCategory ? group.components : group.components.slice(0, 4);
  };

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    setExpandedCategory(category);
    setShowAllInCategory(false);
    // Auto-select first component in category
    const group = componentGroups.find((g) => g.category === category);
    if (group && group.components.length > 0) {
      setIsPreviewLoading(true);
      setSelectedComponent(group.components[0].id);
      setTimeout(() => setIsPreviewLoading(false), 800);
    }
  };

  // Handle back to categories
  const handleBackToCategories = () => {
    setExpandedCategory(null);
    setShowAllInCategory(false);
  };

  const handleCopy = () => {
    // In a real app, this would copy the component code
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenNewTab = () => {
    window.open(previewUrl, "_blank");
  };

  // Red button - Minimize to floating circle
  const handleRedButton = () => {
    if (isMinimizedCircle) {
      // Re-open
      setIsMinimizedCircle(false);
    } else {
      // Minimize to circle
      setIsMinimizedCircle(true);
      setIsMinimizedRect(false);
      setIsMaximized(false);
      setIsFullscreen(false);
    }
  };

  // Yellow button - Minimize to bottom right rectangle
  const handleYellowButton = () => {
    if (!isMinimizedCircle && !isMinimizedRect) {
      setIsMinimizedRect(true);
      setIsMaximized(false);
      setIsFullscreen(false);
    }
  };

  // Green button - Maximize
  const handleGreenButton = () => {
    if (!isMaximized && !isMinimizedCircle && !isMinimizedRect) {
      setIsMaximized(true);
      setIsFullscreen(false);
    }
  };

  // Drag handlers for circular minimized state
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMinimizedCircle) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - circlePosition.x,
        y: e.clientY - circlePosition.y,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && isMinimizedCircle) {
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Keep within bounds
      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 80;
      
      setCirclePosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add mouse move and up listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isFullscreen]);

  return (
    <div className="min-h-screen bg-clr-background">
      <AppHeader showBreadcrumb breadcrumbText="Components" />

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar - Component List */}
          <aside className="space-y-6">
            <div className="sticky top-24">
              {expandedCategory === null ? (
                // CATEGORY LIST VIEW (Same design as expanded)
                <>
                  {/* Sidebar Header */}
                  <div className="mb-6">
                    <h2 className="text-sm font-semibold text-clr-muted-foreground uppercase tracking-wider">
                      Components
                    </h2>
                    <p className="text-xs text-clr-muted-foreground mt-1">
                      {totalComponents} total components
                    </p>
                  </div>

                  {/* Category List */}
                  <nav className="space-y-1">
                    {/* All Components Option */}
                    <button
                      onClick={() => setExpandedCategory(null)}
                      className="group relative w-full text-left px-3 py-2.5 rounded-lg transition-all bg-clr-primary-subtle text-clr-primary"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Layers className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm font-medium">All Components</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs">{totalComponents}</span>
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                      </div>
                      {/* Active indicator */}
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-clr-primary rounded-r" />
                    </button>

                    {/* Category Options */}
                    {componentGroups.map((group) => {
                      const Icon = group.icon;

                      return (
                        <button
                          key={group.category}
                          onClick={() => handleCategoryClick(group.category)}
                          className="group relative w-full text-left px-3 py-2.5 rounded-lg transition-all text-clr-foreground hover:bg-clr-surface hover:text-clr-primary"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Icon className="h-4 w-4 flex-shrink-0" />
                              <span className="text-sm font-medium">{group.category}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-clr-muted-foreground">
                                {group.count}
                              </span>
                              <ChevronRight className="h-4 w-4 text-clr-muted-foreground group-hover:text-clr-primary transition-colors" />
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </nav>

                  {/* Info */}
                  <div className="mt-6 pt-6 border-t border-clr-border">
                    <div className="text-xs text-clr-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-clr-success" />
                        <span>Production Ready</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-clr-primary" />
                        <span>Fully Responsive</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // EXPANDED CATEGORY VIEW
                <>
                  {/* Back Button */}
                  <button
                    onClick={handleBackToCategories}
                    className="flex items-center gap-2 mb-6 text-sm text-clr-muted-foreground hover:text-clr-primary transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Categories</span>
                  </button>

                  {/* Category Header */}
                  <div className="mb-6">
                    <h2 className="text-sm font-semibold text-clr-foreground uppercase tracking-wider">
                      {expandedCategory}
                    </h2>
                    <p className="text-xs text-clr-muted-foreground mt-1">
                      {componentGroups.find((g) => g.category === expandedCategory)?.count}{" "}
                      components
                    </p>
                  </div>

                  {/* Component List */}
                  <nav className="space-y-1">
                    {getExpandedComponents().map((component) => {
                      const isActive = selectedComponent === component.id;
                      const Icon = component.icon;

                      return (
                        <button
                          key={component.id}
                          onClick={() => {
                            setIsPreviewLoading(true);
                            setSelectedComponent(component.id);
                            setTimeout(() => setIsPreviewLoading(false), 800);
                          }}
                          className={`group relative w-full text-left px-3 py-2.5 rounded-lg transition-all ${
                            isActive
                              ? "bg-clr-primary-subtle text-clr-primary"
                              : "text-clr-foreground hover:bg-clr-surface hover:text-clr-primary"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm font-medium">{component.name}</span>
                            {isActive && <CheckCircle2 className="h-4 w-4 ml-auto flex-shrink-0" />}
                          </div>
                          {/* Active indicator */}
                          {isActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-clr-primary rounded-r" />
                          )}
                        </button>
                      );
                    })}

                    {/* Show All Button */}
                    {!showAllInCategory &&
                      expandedCategory &&
                      componentGroups.find((g) => g.category === expandedCategory)!.count > 4 && (
                        <button
                          onClick={() => setShowAllInCategory(true)}
                          className="w-full text-left px-3 py-2.5 rounded-lg transition-all text-clr-primary hover:bg-clr-primary-subtle border border-clr-border hover:border-clr-primary"
                        >
                          <div className="flex items-center gap-2 justify-center">
                            <span className="text-sm font-medium">Show All</span>
                            <span className="text-xs">
                              (+
                              {componentGroups.find((g) => g.category === expandedCategory)!.count -
                                4}{" "}
                              more)
                            </span>
                          </div>
                        </button>
                      )}
                  </nav>
                </>
              )}
            </div>
          </aside>

          {/* Main Content - Preview Area */}
          <main className="space-y-6">
            {/* Component Info */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-clr-foreground">{currentComponent?.name}</h2>
                <p className="text-sm text-clr-muted-foreground mt-1">
                  {currentComponent?.description}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleOpenNewTab}
                  variant="outline"
                  size="sm"
                  className="border-clr-border hover:bg-clr-surface"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open
                </Button>
                <Button onClick={handleCopy} size="sm" className="btn-primary">
                  <Copy className="mr-2 h-4 w-4" />
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>

            {/* Circular Minimized State */}
            {isMinimizedCircle && (
              <div
                className="fixed z-50 cursor-move"
                style={{
                  left: `${circlePosition.x}px`,
                  top: `${circlePosition.y}px`,
                  transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseDown={handleMouseDown}
                onClick={handleRedButton}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-clr-primary via-clr-secondary to-clr-accent shadow-2xl hover:shadow-clr-primary/50 border-2 border-clr-border flex items-center justify-center backdrop-blur-sm animate-pulse hover:scale-110 transition-transform">
                  <span className="text-xs text-white font-medium">Click</span>
                </div>
              </div>
            )}

            {/* Rectangle Minimized State - Bottom Right */}
            {isMinimizedRect && (
              <div
                className="fixed bottom-4 right-4 z-50 cursor-pointer"
                onClick={() => setIsMinimizedRect(false)}
              >
                <div className="w-24 h-48 rounded-lg bg-gradient-to-b from-clr-card via-clr-surface to-clr-card shadow-2xl border border-clr-border flex flex-col items-center justify-center gap-2 backdrop-blur-sm hover:scale-105 transition-all">
                  <div className="text-xs text-clr-muted-foreground text-center px-2">
                    {currentComponent?.name}
                  </div>
                  <div className="text-xs text-clr-primary font-medium">Click to restore</div>
                </div>
              </div>
            )}

            {/* Preview Card - Iframe Secondary Screen */}
            {!isMinimizedCircle && (
              <Card className="bg-clr-card border-clr-border overflow-hidden">
                {/* Browser Chrome */}
                <div className="border-b border-clr-border px-4 py-3 bg-clr-surface/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleRedButton}
                      disabled={false}
                      className="w-3 h-3 rounded-full bg-clr-danger hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Minimize to floating circle"
                    />
                    <button
                      onClick={handleYellowButton}
                      disabled={isMinimizedCircle || isMinimizedRect}
                      className="w-3 h-3 rounded-full bg-clr-warning hover:bg-yellow-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Minimize to bottom right"
                    />
                    <button
                      onClick={handleGreenButton}
                      disabled={isMaximized || isMinimizedCircle || isMinimizedRect}
                      className="w-3 h-3 rounded-full bg-clr-success hover:bg-green-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Maximize"
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-1 max-w-md mx-4">
                    <div className="flex-1 px-3 py-1.5 rounded-md bg-clr-background/50 border border-clr-border text-xs text-clr-muted-foreground font-mono truncate">
                      {previewUrl}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-1.5 rounded hover:bg-clr-surface-hover transition-colors"
                      aria-label="Toggle fullscreen"
                    >
                      <Maximize2 className="h-4 w-4 text-clr-muted-foreground" />
                    </button>
                    <span className="text-xs text-clr-muted-foreground font-mono">Live Preview</span>
                  </div>
                </div>

                {/* Iframe Container - Secondary Screen */}
                <div
                  className={`relative bg-clr-background transition-all duration-300 ${
                    isFullscreen 
                      ? "fixed inset-0 z-50" 
                      : isMaximized 
                        ? "h-[900px]" 
                        : isMinimizedRect 
                          ? "h-0 overflow-hidden" 
                          : "h-[700px]"
                  }`}
                >
                  {/* Loading Overlay - Minimal Cool Loader */}
                  {isPreviewLoading && (
                    <div className="absolute inset-0 z-10 bg-clr-background/80 backdrop-blur-md flex flex-col items-center justify-center gap-8 animate-fade-in">
                      {/* Minimal animated rings */}
                      <div className="relative w-24 h-24">
                        {/* Outer rotating ring */}
                        <div className="absolute inset-0 rounded-full border-2 border-clr-primary/20 border-t-clr-primary animate-spin" style={{ animationDuration: '1.2s' }} />
                        
                        {/* Inner counter-rotating ring */}
                        <div className="absolute inset-2 rounded-full border-2 border-clr-accent/20 border-b-clr-accent animate-spin" style={{ animationDuration: '1.8s', animationDirection: 'reverse' }} />
                        
                        {/* Center dot */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-clr-primary animate-pulse" />
                        </div>
                      </div>

                      {/* Clean text */}
                      <p className="text-sm font-medium text-clr-foreground">Updating preview</p>
                    </div>
                  )}

                  {/* Fullscreen Close Button */}
                  {isFullscreen && (
                    <button
                      onClick={() => setIsFullscreen(false)}
                      className="fixed top-4 right-4 z-[60] p-3 rounded-full bg-clr-card border border-clr-border hover:bg-clr-surface-hover transition-all shadow-2xl group"
                      aria-label="Exit fullscreen"
                    >
                      <X className="h-5 w-5 text-clr-foreground group-hover:text-clr-danger" />
                    </button>
                  )}

                  <iframe
                    key={`${selectedComponent}-${currentTheme}-${theme}-${iframeKey}`}
                    src={previewUrl}
                    className="w-full h-full border-0"
                    title={`Preview of ${currentComponent?.name}`}
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
