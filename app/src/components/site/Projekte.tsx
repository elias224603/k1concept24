import { projekte } from "../../data/site";

/** Versetztes Raster mit Crop-Rahmen. Die Höhenversätze brechen die Rasterkante. */
const raster = [
  "lg:col-span-7 aspect-[4/3]",
  "lg:col-span-5 lg:mt-20 aspect-[4/3]",
  "lg:col-span-5 aspect-[16/10]",
  "lg:col-span-7 lg:mt-14 aspect-[16/10]",
  "lg:col-span-4 lg:mt-24 aspect-[4/3]",
  "lg:col-span-8 aspect-[16/9]",
  "lg:col-span-6 aspect-[4/3]",
  "lg:col-span-6 lg:mt-16 aspect-[4/3]",
];

export function Projekte() {
  return (
    <section id="projekte" className="scroll-mt-20 bg-limestone py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-[16ch] font-display text-[2.4rem] leading-[1.02] tracking-tighter text-ink md:text-[4rem]">
            Aus der Werkstatt und von der Baustelle.
          </h2>
          <p className="max-w-[34ch] text-sm leading-relaxed text-inksoft md:text-base">
            Alle Aufnahmen stammen aus abgeschlossenen Aufträgen von K1 concept
            24. Nichts davon ist ein Katalogfoto.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-8">
          {projekte.map((p, i) => (
            <figure
              key={p.bild}
              className={`group relative ${raster[i] ?? "lg:col-span-6 aspect-[4/3]"}`}
            >
              <div className="relative h-full w-full overflow-hidden bg-stone">
                <img
                  src={p.bild}
                  alt={p.alt}
                  width={1100}
                  height={825}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
                {/* Crop-Rahmen: fährt beim Hover nach innen auf. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 border-0 border-limestone transition-all duration-500 ease-out group-hover:inset-3 group-hover:border"
                />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4 border-t border-ink/15 pt-3">
                <span className="font-display text-base tracking-tight text-ink md:text-lg">
                  {p.titel}
                </span>
                <span className="shrink-0 text-[0.65rem] uppercase tracking-[0.16em] text-inksoft">
                  {p.ort}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
