import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { AmbientBackground } from "@/components/site/Background";
import { Toaster } from "@/components/ui/sonner";
import { startRegionDetection } from "@/lib/region";
import { useEffect } from "react";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Vishra AI — Engineering Autonomous Intelligence" },
      { name: "description", content: "Vishra AI builds autonomous intelligence systems, AI infrastructure, and intelligent operations for modern enterprises. A division of NexVark Industries." },
      { property: "og:title", content: "Vishra AI — Engineering Autonomous Intelligence" },
      { property: "og:description", content: "Vishra AI builds autonomous intelligence systems, AI infrastructure, and intelligent operations for modern enterprises. A division of NexVark Industries." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Vishra AI" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Vishra AI — Engineering Autonomous Intelligence" },
      { name: "twitter:description", content: "Vishra AI builds autonomous intelligence systems, AI infrastructure, and intelligent operations for modern enterprises. A division of NexVark Industries." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/c9dcc4d1-894b-4a32-8511-a4260d85e61d" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/c9dcc4d1-894b-4a32-8511-a4260d85e61d" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Vishra AI",
          url: "/",
          parentOrganization: { "@type": "Organization", name: "NexVark Industries" },
          description: "Autonomous intelligence systems and AI infrastructure for modern enterprises.",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => { void startRegionDetection(); }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen">
        <AmbientBackground />
        <Nav />
        <Outlet />
        <Footer />
        <Toaster richColors position="top-center" />
      </div>
    </QueryClientProvider>
  );
}
