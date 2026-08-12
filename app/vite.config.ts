import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import {
  higgsfieldDesignInspectorVitePlugin,
  higgsfieldDesignSourceBabelPlugin,
} from "./src/module/design-inspector/vite";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "node:url";

// The vendored @higgsfield/quanta components import their glyphs from the private
// Nexus-only `@higgsfield-ai/icons`. Generated sites build on the PUBLIC npm
// registry, so we redirect every `@higgsfield-ai/icons/*` import to a Material
// Symbols shim instead (see src/lib/quanta-material-icons.ts). tsconfig.json has
// the matching `paths` entry so type-checking resolves it too.
const QUANTA_ICONS_SHIM = fileURLToPath(
  new URL("./src/lib/quanta-material-icons.ts", import.meta.url),
);

// Ablage der Formularanfragen: auf Cloudflare die D1-Datenbank, auf Vercel der
// E-Mail-Versand. Der Tausch passiert hier, damit `cloudflare:workers` gar nicht
// erst im Vercel-Bündel landet.
const ANFRAGE_SPEICHER_VERCEL = fileURLToPath(
  new URL("./src/lib/anfrage-speicher.vercel.ts", import.meta.url),
);

export default defineConfig(({ mode }) => {
  const designInspectorEnabled =
    process.env.HF_DESIGN_INSPECTOR === "1" || mode === "design";

  // Vercel setzt VERCEL=1 im Build-Container. Lokal lässt sich das Ziel mit
  // DEPLOY_TARGET=vercel erzwingen (siehe `bun run build:vercel`).
  const zielVercel =
    process.env.VERCEL === "1" || process.env.DEPLOY_TARGET === "vercel";

  const alias = [
    { find: /^@higgsfield-ai\/icons(\/.*)?$/, replacement: QUANTA_ICONS_SHIM },
    ...(zielVercel
      ? [
          {
            // Muss den GANZEN Bezeichner treffen: Vite ersetzt nur den Treffer,
            // ein Teiltreffer würde das führende "../" stehen lassen.
            find: /^.*[\\/]anfrage-speicher$/,
            replacement: ANFRAGE_SPEICHER_VERCEL,
          },
        ]
      : []),
  ];

  return {
    resolve: { alias },

    // Nur für Cloudflare: der Server läuft dort als Worker, es gibt zur Laufzeit
    // kein node_modules. Vites SSR-Standard ließe npm-Abhängigkeiten als externe
    // Importe stehen, die im Worker mit "No such module" scheitern. Auf Vercel
    // läuft ein normaler Node-Server, dort ist das Bündeln unnötig und schädlich.
    ...(zielVercel
      ? {}
      : {
          ssr: {
            noExternal: true,
            // `cloudflare:workers` ist ein Laufzeitmodul von workerd und darf
            // nicht gebündelt werden.
            external: ["cloudflare:workers"],
          },
          build: {
            rollupOptions: { external: [/^cloudflare:/] },
          },
        }),

    plugins: [
      svgr({
        svgrOptions: {
          icon: true,
          svgProps: { fill: "currentColor" },
          svgoConfig: {
            plugins: [
              {
                name: "preset-default",
                params: { overrides: { removeViewBox: false } },
              },
            ],
          },
        },
      }),

      // TanStack Start muss vor dem React-Plugin laufen.
      //
      // Cloudflare: der eigene Worker-Einstieg src/server.ts wird gebaut
      // (dist/server/server.js mit `export default { fetch }`).
      // Vercel: der Standard-Einstieg von TanStack Start, den Nitro danach in
      // das Vercel-Ausgabeformat (.vercel/output) verpackt.
      tanstackStart(zielVercel ? {} : { server: { entry: "server" } }),

      // Nur im Vercel-Build: Nitro erzeugt .vercel/output nach der Build Output
      // API, die Vercel direkt ausliefert.
      ...(zielVercel ? [nitroV2Plugin({ preset: "vercel" })] : []),

      higgsfieldDesignInspectorVitePlugin(designInspectorEnabled),
      react({
        babel: {
          plugins: designInspectorEnabled
            ? [higgsfieldDesignSourceBabelPlugin]
            : [],
        },
      }),
      tailwindcss(),
      tsconfigPaths(),
    ],
  };
});
