import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-clr-background px-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold gradient-primary">404</h1>
        <h2 className="text-2xl font-semibold text-clr-foreground">Component Not Found</h2>
        <p className="text-clr-muted-foreground max-w-md">
          The component you&apos;re looking for doesn&apos;t exist. Please check the URL and try again.
        </p>
        <Link
          href="/components"
          className="inline-block px-6 py-3 rounded-lg bg-clr-primary text-clr-primary-foreground hover:bg-clr-primary-hover transition-colors font-medium"
        >
          Back to Components
        </Link>
      </div>
    </div>
  );
}

