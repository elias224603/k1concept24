import { leistungen, partnerGewerke } from "../../data/site";

/**
 * Editorial-Zeilenliste mit Haarlinien. Keine Karten, keine Dreierspalte.
 * Die ganze Zeile ist der CTA: beim Hover verschiebt sich der Streifen und die
 * Indexziffer fährt ein.
 */
export function Leistungen({
  onWaehlen,
}: {
  onWaehlen: (slug: string) => void;
}) {
  return (
    <section id="leistungen" className="scroll-mt-20 bg-limestone py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <h2 className="max-w-[20ch] font-display text-[2.4rem] leading-[1.02] tracking-tighter text-ink md:text-[4rem]">
          Alles rund um den Boden.
        </h2>
        <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-inksoft">
          Neuverlegung, Umbau, Reparatur und Sonderanfertigung. Tippen Sie auf
          eine Leistung, dann ist sie in der Anfrage schon ausgewählt.
        </p>

        <ul className="mt-12 border-t border-ink/15 md:mt-16">
          {leistungen.map((l) => (
            <li key={l.slug} className="border-b border-ink/15">
              <button
                type="button"
                onClick={() => onWaehlen(l.slug)}
                className="group grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-5 py-6 text-left transition-[background-color,padding] duration-300 hover:bg-chalk hover:pl-4 active:bg-stone md:gap-x-8 md:py-8 md:hover:pl-6"
              >
                <span className="font-display text-sm tabular-nums tracking-tight text-signal transition-transform duration-300 group-hover:translate-x-1 md:text-base">
                  {l.nr}
                </span>

                <span className="min-w-0">
                  <span className="flex items-center gap-3">
                    <img
                      src={l.icon}
                      alt=""
                      aria-hidden
                      width={256}
                      height={256}
                      loading="lazy"
                      decoding="async"
                      className="h-6 w-6 shrink-0 opacity-70 md:h-7 md:w-7"
                    />
                    <span className="font-display text-xl leading-tight tracking-tight text-ink md:text-3xl">
                      {l.titel}
                    </span>
                  </span>
                  <span className="mt-2 block max-w-[58ch] text-sm leading-relaxed text-inksoft md:text-base">
                    {l.text}
                  </span>
                </span>

                <span
                  aria-hidden
                  className="translate-x-0 text-ink/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-signal"
                >
                  <svg width="26" height="10" viewBox="0 0 26 10" fill="none">
                    <path
                      d="M0 5h24M20 1l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    />
                  </svg>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-12 max-w-[60ch] border-l-2 border-signal pl-5">
          <p className="text-sm leading-relaxed text-inksoft md:text-base">
            Durch langjährige Zusammenarbeit mit Fachbetrieben aus anderen
            Gewerken können wir auch das Drumherum abdecken:{" "}
            <span className="text-ink">{partnerGewerke.join(", ")}</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
