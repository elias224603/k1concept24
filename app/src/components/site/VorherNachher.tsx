import { useState } from "react";

/**
 * Bildvergleich einer Parkettsanierung. Der Regler ist ein echtes
 * range-Input, damit der Vergleich auch per Tastatur bedienbar ist und ohne
 * Zeigergerät funktioniert. Ausgangszustand: 50 Prozent, serverseitig gerendert.
 */
export function VorherNachher() {
  const [wert, setWert] = useState(50);

  return (
    <section className="bg-stone py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <h2 className="max-w-[20ch] font-display text-[2rem] leading-[1.05] tracking-tighter text-ink md:text-[3rem]">
          Mosaikparkett, Altbauwohnung.
        </h2>
        <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-inksoft">
          Fehlstellen ergänzt, Estrichflicken überdeckt, komplett abgeschliffen
          und neu versiegelt. Ziehen Sie den Regler.
        </p>

        <div className="relative mt-10 select-none overflow-hidden">
          <div className="relative aspect-[4/3] w-full md:aspect-[16/10]">
            <img
              src="/assets/nachher-mosaik.jpg"
              alt="Fertig geschliffenes und versiegeltes Mosaikparkett"
              width={1000}
              height={750}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - wert}% 0 0)` }}
            >
              <img
                src="/assets/vorher-mosaik.jpg"
                alt="Mosaikparkett vor der Sanierung mit offener Fehlstelle"
                width={1000}
                height={750}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-0.5 bg-signal"
              style={{ left: `calc(${wert}% - 1px)` }}
            />
            <span className="pointer-events-none absolute left-4 top-4 bg-ink/80 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.16em] text-limestone">
              Vorher
            </span>
            <span className="pointer-events-none absolute right-4 top-4 bg-limestone/90 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.16em] text-ink">
              Nachher
            </span>
          </div>

          <label className="mt-5 block">
            <span className="sr-only">
              Vergleich zwischen Vorher und Nachher verschieben
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={wert}
              onChange={(e) => setWert(Number(e.target.value))}
              className="h-2 w-full cursor-ew-resize appearance-none bg-ink/15 accent-signal"
            />
          </label>
        </div>
      </div>
    </section>
  );
}
