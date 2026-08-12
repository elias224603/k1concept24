import { useEffect, useRef, useState } from "react";

import { aufbau } from "../../data/site";

/**
 * Tier-1: Kapitel-Stack. Jede Bauschicht schiebt sich beim Scrollen über die
 * vorherige, so wie sie auf der Baustelle aufeinanderkommt. Reines CSS-Sticky,
 * kein Scroll-Framework. Bei prefers-reduced-motion fallen die Kapitel in eine
 * statische Abfolge zurück (siehe styles.css).
 */
export function Aufbau() {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const [aktiv, setAktiv] = useState(0);

  useEffect(() => {
    const el = stackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const messen = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const schritt = rect.height / aufbau.length;
      const index = Math.round(Math.min(Math.max(-rect.top, 0), rect.height - schritt) / schritt);
      setAktiv(Math.min(aufbau.length - 1, Math.max(0, index)));
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(messen);
    };

    messen();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="aufbau" className="scroll-mt-20 bg-ink">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <p className="text-[0.7rem] uppercase tracking-[0.2em] text-signal">
          Der Aufbau
        </p>
        <h2 className="mt-5 max-w-[18ch] font-display text-[2.4rem] leading-[1.02] tracking-tighter text-limestone md:text-[4rem]">
          Ein Boden entsteht in Schichten.
        </h2>
        <p className="mt-5 max-w-[54ch] text-base leading-relaxed text-limestone/70">
          Was am Ende nach einem Stück Holz aussieht, sind sechs Arbeitsgänge.
          Die Bilder stammen von einer Dachgeschossbaustelle, vom leeren Raum bis
          zum versiegelten Boden.
        </p>
      </div>

      <div ref={stackRef} className="relative">
        {aufbau.map((k, i) => (
          <article
            key={k.nr}
            className="k1-chapter flex min-h-[100svh] items-end overflow-hidden"
            style={{ zIndex: i + 1 }}
          >
            <img
              src={k.bild}
              alt={k.alt}
              width={1200}
              height={900}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/20"
            />

            <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-16 md:px-10 md:pb-24">
              <div className="max-w-[34rem] border-l-2 border-signal bg-limestone/95 p-6 md:p-9">
                <span className="block font-display text-[4.5rem] leading-[0.8] tracking-tighter text-ink/15 md:text-[7rem]">
                  {k.nr}
                </span>
                <h3 className="mt-4 font-display text-2xl tracking-tight text-ink md:text-4xl">
                  {k.titel}
                </h3>
                <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-inksoft md:text-base">
                  {k.text}
                </p>
              </div>
            </div>

            {/* Fortschrittsleiste: zeigt, in welcher Schicht man gerade steckt. */}
            <div
              aria-hidden
              className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
            >
              {aufbau.map((s, j) => (
                <span
                  key={s.nr}
                  className={`h-6 w-px transition-all duration-300 ${
                    j === aktiv ? "bg-signal" : "bg-limestone/35"
                  }`}
                  style={j === aktiv ? { height: "2.5rem" } : undefined}
                />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
