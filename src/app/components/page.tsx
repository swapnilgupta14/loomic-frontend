"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Copy,
  ExternalLink,
  Layers,
  Layout,
  Loader2,
  type LucideIcon,
  Maximize2,
  Menu,
  MousePointer2,
  Search,
  Sparkles,
  SquareMousePointer,
  X,
  Zap,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import {
  ButtonGroup,
  FloatingActionButton,
  GhostButton,
  GradientButton,
  IconButton,
  LoadingButton,
  OutlineButton,
  PrimaryButton,
} from "@/components/buttons";
import {
  BarsLoader,
  DotsLoader,
  ProgressLoader,
  PulseLoader,
  SpinnerLoader,
} from "@/components/loaders";
import {
  CommandSearch,
  ExpandableSearch,
  FilterSearch,
  MinimalSearch,
} from "@/components/search-bars";
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
  previewType?: "iframe" | "grid"; // iframe = secondary screen, grid = inline grid
  gridColumns?: number; // number of columns for grid preview
}

const componentGroups: ComponentGroup[] = [
  {
    category: "Headers",
    description: "Navigation headers and top bars",
    count: 6,
    icon: Layout,
    previewType: "iframe",
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
    previewType: "iframe",
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
  {
    category: "Buttons",
    description: "Button styles and variants",
    count: 8,
    icon: SquareMousePointer,
    previewType: "grid",
    gridColumns: 5,
    components: [
      {
        id: "primary-button",
        name: "Primary Button",
        description: "Solid background with hover effects",
        tags: ["Primary", "Solid", "Bold"],
        icon: Sparkles,
      },
      {
        id: "outline-button",
        name: "Outline Button",
        description: "Border style with transparent background",
        tags: ["Outline", "Minimal", "Clean"],
        icon: Sparkles,
      },
      {
        id: "ghost-button",
        name: "Ghost Button",
        description: "Minimal button with hover background",
        tags: ["Ghost", "Subtle", "Modern"],
        icon: Sparkles,
      },
      {
        id: "gradient-button",
        name: "Gradient Button",
        description: "Vibrant gradient background",
        tags: ["Gradient", "Colorful", "Bold"],
        icon: Zap,
      },
      {
        id: "icon-button",
        name: "Icon Button",
        description: "Square button with icon only",
        tags: ["Icon", "Compact", "Minimal"],
        icon: Sparkles,
      },
      {
        id: "loading-button",
        name: "Loading Button",
        description: "Button with loading state",
        tags: ["Loading", "Interactive", "Feedback"],
        icon: Loader2,
      },
      {
        id: "group-button",
        name: "Button Group",
        description: "Connected button group",
        tags: ["Group", "Connected", "Toolbar"],
        icon: Layers,
      },
      {
        id: "floating-action-button",
        name: "Floating Action",
        description: "Fixed position floating button",
        tags: ["FAB", "Floating", "Action"],
        icon: Zap,
      },
    ],
  },
  {
    category: "Button Menus",
    description: "Dropdown and context menus",
    count: 4,
    icon: Menu,
    previewType: "iframe",
    components: [
      {
        id: "dropdown-menu",
        name: "Dropdown Menu",
        description: "Click to reveal menu items",
        tags: ["Dropdown", "Menu", "Interactive"],
        icon: Menu,
      },
      {
        id: "context-menu",
        name: "Context Menu",
        description: "Right-click context menu",
        tags: ["Context", "Right-click", "Advanced"],
        icon: Menu,
      },
      {
        id: "theme-menu",
        name: "Theme Menu",
        description: "Theme switcher with preview",
        tags: ["Theme", "Switcher", "Visual"],
        icon: Sparkles,
      },
      {
        id: "action-menu",
        name: "Action Menu",
        description: "Menu with icons and shortcuts",
        tags: ["Action", "Icons", "Shortcuts"],
        icon: Zap,
      },
    ],
  },
  {
    category: "Loaders",
    description: "Loading states and spinners",
    count: 5,
    icon: Loader2,
    previewType: "grid",
    gridColumns: 5,
    components: [
      {
        id: "spinner-loader",
        name: "Spinner",
        description: "Classic spinning loader",
        tags: ["Spinner", "Classic", "Simple"],
        icon: Loader2,
      },
      {
        id: "dots-loader",
        name: "Dots Loader",
        description: "Animated bouncing dots",
        tags: ["Dots", "Animated", "Modern"],
        icon: Loader2,
      },
      {
        id: "pulse-loader",
        name: "Pulse Loader",
        description: "Pulsing circle animation",
        tags: ["Pulse", "Smooth", "Minimal"],
        icon: Loader2,
      },
      {
        id: "bars-loader",
        name: "Bars Loader",
        description: "Animated vertical bars",
        tags: ["Bars", "Rhythm", "Musical"],
        icon: Loader2,
      },
      {
        id: "progress-loader",
        name: "Progress Bar",
        description: "Linear progress indicator",
        tags: ["Progress", "Linear", "Determinate"],
        icon: Loader2,
      },
    ],
  },
  {
    category: "Search Bars",
    description: "Search input components",
    count: 4,
    icon: Search,
    previewType: "grid",
    gridColumns: 2,
    components: [
      {
        id: "minimal-search",
        name: "Minimal Search",
        description: "Clean search with icon",
        tags: ["Minimal", "Clean", "Simple"],
        icon: Search,
      },
      {
        id: "expandable-search",
        name: "Expandable Search",
        description: "Icon that expands to search bar",
        tags: ["Expandable", "Animated", "Compact"],
        icon: Search,
      },
      {
        id: "command-search",
        name: "Command Search",
        description: "Command palette style search",
        tags: ["Command", "Keyboard", "Advanced"],
        icon: Search,
      },
      {
        id: "filter-search",
        name: "Filter Search",
        description: "Search with filter options",
        tags: ["Filter", "Advanced", "Dropdown"],
        icon: Search,
      },
    ],
  },
];

export default function ComponentsPage() {
  const [selectedComponent, setSelectedComponent] = useState<string>("glass-morphism");
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null); // null = show all categories
  const [currentTheme, setCurrentTheme] = useState<string>("default");
  const [iframeKey, setIframeKey] = useState<number>(0); // Force iframe reload
  const [isPreviewLoading, setIsPreviewLoading] = useState(false); // Show loader
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Find current component across all groups
  const currentComponent = componentGroups
    .flatMap((group) => group.components)
    .find((c) => c.id === selectedComponent);

  // Find current component's group
  const currentGroup = componentGroups.find((group) =>
    group.components.some((c) => c.id === selectedComponent)
  );

  // Build preview URL with theme parameters (use "dark" as default to avoid hydration mismatch)
  const previewUrl = `/preview/${selectedComponent}?theme=${currentTheme}&mode=${mounted ? theme || "dark" : "dark"}`;

  // Get total component count
  const totalComponents = componentGroups.reduce((acc, group) => acc + group.count, 0);

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

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
      const newTheme =
        customEvent.detail?.theme || localStorage.getItem("loomic-theme") || "default";
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
    setIframeKey((prev) => prev + 1);

    // Hide loader after iframe loads
    const timer = setTimeout(() => {
      setIsPreviewLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [currentTheme, theme]);

  // Get components to display in expanded view (show all components)
  const getExpandedComponents = () => {
    if (!expandedCategory) return [];
    const group = componentGroups.find((g) => g.category === expandedCategory);
    if (!group) return [];
    return group.components; // Show all components, no limiting
  };

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    const group = componentGroups.find((g) => g.category === category);

    // For grid-type categories, don't expand submenu, just select first component
    if (group?.previewType === "grid") {
      setExpandedCategory(null); // Don't expand
      if (group.components.length > 0) {
        setSelectedComponent(group.components[0].id);
      }
    } else {
      // For iframe-type categories, expand submenu
      setExpandedCategory(category);
      if (group && group.components.length > 0) {
        setSelectedComponent(group.components[0].id);
      }
    }
  };

  // Handle back to categories
  const handleBackToCategories = () => {
    setExpandedCategory(null);
  };

  const handleCopy = () => {
    // In a real app, this would copy the component code
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenNewTab = () => {
    window.open(previewUrl, "_blank");
  };

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
          <aside className="space-y-6 border-r border-clr-border pr-4">
            <div className="sticky top-24">
              <AnimatePresence mode="wait">
                {expandedCategory === null ? (
                  // CATEGORY LIST VIEW (Same design as expanded)
                  <motion.div
                    key="category-list"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
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
                  </motion.div>
                ) : (
                  // EXPANDED CATEGORY VIEW
                  <motion.div
                    key="expanded-category"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
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
                              setSelectedComponent(component.id);
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
                              {isActive && (
                                <CheckCircle2 className="h-4 w-4 ml-auto flex-shrink-0" />
                              )}
                            </div>
                            {/* Active indicator */}
                            {isActive && (
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-clr-primary rounded-r" />
                            )}
                          </button>
                        );
                      })}
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
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

            {/* Conditional Preview - Grid or Iframe */}
            {currentGroup?.previewType === "grid" ? (
              /* Grid Preview - Clean minimal showcase */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-clr-foreground">
                    {currentGroup.category}
                  </h3>
                  <span className="text-sm text-clr-muted-foreground">
                    {currentGroup.components.length} variants
                  </span>
                </div>

                {/* Minimal Grid Layout */}
                <div
                  className="grid gap-3"
                  style={{
                    gridTemplateColumns: `repeat(${currentGroup.gridColumns || 3}, minmax(0, 1fr))`,
                  }}
                >
                  {currentGroup.components.map((component) => {
                    // Render actual component based on ID
                    const renderComponent = () => {
                      // Buttons
                      if (component.id === "primary-button") return <PrimaryButton />;
                      if (component.id === "outline-button") return <OutlineButton />;
                      if (component.id === "ghost-button") return <GhostButton />;
                      if (component.id === "gradient-button") return <GradientButton />;
                      if (component.id === "icon-button") return <IconButton />;
                      if (component.id === "loading-button") return <LoadingButton isLoading />;
                      if (component.id === "group-button") return <ButtonGroup />;
                      if (component.id === "floating-action-button")
                        return <FloatingActionButton />;

                      // Loaders
                      if (component.id === "spinner-loader") return <SpinnerLoader />;
                      if (component.id === "dots-loader") return <DotsLoader />;
                      if (component.id === "pulse-loader") return <PulseLoader />;
                      if (component.id === "bars-loader") return <BarsLoader />;
                      if (component.id === "progress-loader") return <ProgressLoader />;

                      // Search Bars
                      if (component.id === "minimal-search") return <MinimalSearch />;
                      if (component.id === "expandable-search") return <ExpandableSearch />;
                      if (component.id === "command-search") return <CommandSearch />;
                      if (component.id === "filter-search") return <FilterSearch />;

                      return <p className="text-xs text-clr-muted-foreground">Preview</p>;
                    };

                    return (
                      <div
                        key={component.id}
                        className="group p-4 rounded-lg transition-all bg-clr-card/30 hover:bg-clr-card/60"
                      >
                        <div className="space-y-3">
                          {/* Component Preview - Actual Rendered Component */}
                          <div className="min-h-[120px] bg-clr-surface/50 rounded-lg flex items-center justify-center p-4 transition-all">
                            {renderComponent()}
                          </div>

                          {/* Name */}
                          <h4 className="font-medium text-sm text-clr-foreground">
                            {component.name}
                          </h4>

                          {/* Tags - Minimal chips */}
                          <div className="flex flex-wrap gap-1">
                            {component.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-0.5 rounded-md bg-clr-primary/10 text-clr-primary text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Iframe Preview - Secondary Screen */
              <Card className="bg-clr-card border-clr-border overflow-hidden">
                {/* Browser Chrome */}
                <div className="border-b border-clr-border px-4 py-3 bg-clr-surface/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 flex-1 max-w-md">
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
                    <span className="text-xs text-clr-muted-foreground font-mono">
                      Live Preview
                    </span>
                  </div>
                </div>

                {/* Iframe Container - Secondary Screen */}
                <div
                  className={`relative bg-clr-background transition-all duration-300 ${
                    isFullscreen ? "fixed inset-0 z-50" : "h-[700px]"
                  }`}
                >
                  {/* Loading Overlay - Minimal Cool Loader */}
                  {isPreviewLoading && (
                    <div className="absolute inset-0 z-10 bg-clr-background/80 backdrop-blur-md flex flex-col items-center justify-center gap-8 animate-fade-in">
                      {/* Minimal animated rings */}
                      <div className="relative w-24 h-24">
                        {/* Outer rotating ring */}
                        <div
                          className="absolute inset-0 rounded-full border-2 border-clr-primary/20 border-t-clr-primary animate-spin"
                          style={{ animationDuration: "1.2s" }}
                        />

                        {/* Inner counter-rotating ring */}
                        <div
                          className="absolute inset-2 rounded-full border-2 border-clr-accent/20 border-b-clr-accent animate-spin"
                          style={{ animationDuration: "1.8s", animationDirection: "reverse" }}
                        />

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
