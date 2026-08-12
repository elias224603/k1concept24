import { useState } from "react";

import { betrieb } from "../../data/site";

const punkte = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#aufbau", label: "Aufbau" },
  { href: "#projekte", label: "Projekte" },
  { href: "#betrieb", label: "Betrieb" },
  { href: "#anfrage", label: "Kontakt" },
];

export function SiteNav() {
  const [offen, setOffen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-limestone/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-10">
        <a href="/" aria-label="K1 concept 24, zur Startseite" className="shrink-0">
          <img
            src="/assets/logo-k1concept24.png"
            alt="K1 concept 24, Krzysztof Jarmuszczak"
            width={690}
            height={180}
            className="h-8 w-auto md:h-10"
          />
        </a>

        {/* Desktop: Links mit wandernder Haarlinie, keine Buttons. */}
        <nav className="hidden items-center gap-9 lg:flex">
          {punkte.map((p) => (
            <a
              key={p.href}
              href={p.href}
              className="group relative py-2 text-sm font-medium tracking-tight text-inksoft transition-colors hover:text-ink"
            >
              {p.label}
              <span className="absolute bottom-0 left-0 h-px w-0 bg-signal transition-[width] duration-300 ease-out group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Telefon-Readout: die Ziffern sind der Button. */}
          <a
            href={betrieb.telefonHref}
            className="group hidden items-baseline gap-2 md:flex"
          >
            <span className="text-[0.65rem] uppercase tracking-[0.18em] text-inksoft">
              Direkt
            </span>
            <span className="border-b border-ink/25 pb-0.5 font-display text-base tracking-tight text-ink transition-colors group-hover:border-signal group-hover:text-signal">
              {betrieb.telefon}
            </span>
          </a>

          <button
            type="button"
            onClick={() => setOffen((o) => !o)}
            aria-expanded={offen}
            aria-controls="hauptmenue"
            className="flex h-10 w-10 items-center justify-center border border-ink/20 text-ink transition-colors hover:border-ink active:bg-ink active:text-limestone lg:hidden"
          >
            <span className="sr-only">Menü</span>
            <span aria-hidden className="flex flex-col gap-[5px]">
              <span
                className={`block h-px w-5 bg-current transition-transform duration-300 ${offen ? "translate-y-[6px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-5 bg-current transition-opacity duration-200 ${offen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-px w-5 bg-current transition-transform duration-300 ${offen ? "-translate-y-[6px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      {offen ? (
        <nav
          id="hauptmenue"
          className="border-t border-ink/10 bg-limestone lg:hidden"
        >
          {punkte.map((p) => (
            <a
              key={p.href}
              href={p.href}
              onClick={() => setOffen(false)}
              className="block border-b border-ink/10 px-5 py-4 font-display text-lg tracking-tight text-ink active:bg-stone"
            >
              {p.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
