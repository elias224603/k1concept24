import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportHiggsfieldError } from "../lib/higgsfield-error-reporting";
// Seiten-Metadaten (Titel, Favicon, og:) werden zur BUILD-Zeit aus dieser Datei
// gelesen, nicht zur Laufzeit geladen.
import appMetaJson from "../app-meta.json";

declare const __HF_DESIGN_INSPECTOR__: boolean;

const DEFAULT_TITLE = "K1 concept 24";
const DEFAULT_DESCRIPTION =
  "Parkett, Dielen und Terrassen aus Offenbach am Main.";

type AppMeta = {
  og_title?: string | null;
  og_description?: string | null;
  og_image_url?: string | null;
  favicon_url?: string | null;
  og_video_url?: string | null;
};

const appMeta = appMetaJson as AppMeta;

const APP_HOST_ZONES = ["higgsfield.app", "higgsfield-dev.app"];

function toOwnAssetUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  if (value.startsWith("/")) return value;
  try {
    const u = new URL(value);
    const isAppHost = APP_HOST_ZONES.some(
      (zone) => u.hostname === zone || u.hostname.endsWith(`.${zone}`),
    );
    if (isAppHost) return u.pathname + u.search;
    return value;
  } catch {
    return value;
  }
}

function buildHead(meta: AppMeta) {
  const title = meta.og_title ?? DEFAULT_TITLE;
  const description = meta.og_description ?? DEFAULT_DESCRIPTION;
  const ogImage = toOwnAssetUrl(meta.og_image_url);
  const ogVideo = toOwnAssetUrl(meta.og_video_url);

  return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { name: "theme-color", content: "#15181B" },
      { name: "author", content: "K1 concept 24, Krzysztof Jarmuszczak" },
      { property: "og:site_name", content: "K1 concept 24" },
      { property: "og:locale", content: "de_DE" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      {
        name: "twitter:card",
        content: ogImage ? "summary_large_image" : "summary",
      },
      ...(ogImage
        ? [
            { property: "og:image", content: ogImage },
            { name: "twitter:image", content: ogImage },
          ]
        : []),
      ...(ogVideo ? [{ property: "og:video", content: ogVideo }] : []),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Schriften liegen auf dem eigenen Server, kein Fremdabruf.
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/assets/fonts/cabinet-grotesk-800.woff2",
        crossOrigin: "anonymous" as const,
      },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: "/assets/fonts/satoshi-400.woff2",
        crossOrigin: "anonymous" as const,
      },
      { rel: "icon", href: "/assets/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/assets/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/assets/apple-touch-icon.png" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  };
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-limestone px-6 text-center">
      <p className="font-display text-[6rem] leading-none tracking-tighter text-signal">
        404
      </p>
      <h1 className="mt-4 font-display text-2xl tracking-tight text-ink">
        Diese Seite gibt es nicht.
      </h1>
      <p className="mt-2 max-w-sm text-base leading-relaxed text-inksoft">
        Vielleicht wurde sie verschoben. Rufen Sie uns an, dann klären wir das
        schneller als jede Suchfunktion.
      </p>
      <a
        href="/"
        className="mt-8 border-b-2 border-signal pb-1 font-display text-lg tracking-tight text-ink transition-colors hover:text-signal"
      >
        Zur Startseite
      </a>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportHiggsfieldError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-limestone px-6 text-center">
      <h1 className="font-display text-2xl tracking-tight text-ink">
        Die Seite konnte nicht geladen werden.
      </h1>
      <p className="mt-2 max-w-sm text-base leading-relaxed text-inksoft">
        Bitte laden Sie neu. Wenn es weiter klemmt, erreichen Sie uns unter
        0179 9454659.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="border-b-2 border-signal pb-1 font-display text-lg tracking-tight text-ink transition-colors hover:text-signal"
        >
          Neu laden
        </button>
        <a
          href="/"
          className="border-b-2 border-transparent pb-1 font-display text-lg tracking-tight text-inksoft transition-colors hover:border-ink hover:text-ink"
        >
          Zur Startseite
        </a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => buildHead(appMeta),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="de" style={{ colorScheme: "light" }}>
      <head>
        <HeadContent />
      </head>
      <body className="bg-limestone font-body text-ink antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    if (!__HF_DESIGN_INSPECTOR__) {
      return;
    }

    void import("../module/design-inspector/runtime")
      .then(({ installHiggsfieldDesignInspector }) => {
        installHiggsfieldDesignInspector();
      })
      .catch((error) => {
        reportHiggsfieldError(
          error instanceof Error
            ? error
            : new Error("Failed to load design inspector"),
          { boundary: "higgsfield_design_inspector_import" },
        );
      });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
