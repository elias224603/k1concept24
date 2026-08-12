import { betrieb } from "../../data/site";

/**
 * Vollbild-Foto als Bühne, Text unten links. Das Bild ist eine echte Aufnahme
 * eines fertigen Bodens, kein generiertes Motiv.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[86svh] items-end overflow-hidden md:min-h-[92svh]">
      <img
        src="/assets/hero-parkett.jpg"
        alt="Wohnraum mit durchgehend verlegtem Eichenparkett und Kaminofen"
        width={1800}
        height={1350}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-ink/5"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-14 pt-32 md:px-10 md:pb-20">
        <p className="k1-rise text-[0.7rem] uppercase tracking-[0.2em] text-limestone/75">
          Bodenleger in Offenbach am Main
        </p>
        <h1
          className="k1-rise mt-4 max-w-[16ch] font-display text-[3.1rem] leading-[0.95] tracking-tighter text-limestone md:text-[5.5rem]"
          style={{ animationDelay: "0.07s" }}
        >
          Böden, die bleiben.
        </h1>
        <p
          className="k1-rise mt-6 max-w-[46ch] text-base leading-relaxed text-limestone/85 md:text-lg"
          style={{ animationDelay: "0.14s" }}
        >
          Parkett, Landhausdielen und Terrassen. Vom Untergrund bis zum letzten
          Schliff aus einer Hand.
        </p>

        <div
          className="k1-rise mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          style={{ animationDelay: "0.21s" }}
        >
          <ViewfinderCta href="#anfrage">Anfrage stellen</ViewfinderCta>
          <a
            href={betrieb.telefonHref}
            className="group inline-flex items-baseline gap-2 text-limestone/80 transition-colors hover:text-limestone"
          >
            <span className="text-[0.65rem] uppercase tracking-[0.18em]">
              oder anrufen
            </span>
            <span className="border-b border-limestone/40 pb-0.5 font-display text-lg tracking-tight transition-colors group-hover:border-signal">
              {betrieb.telefon}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Sucher-CTA: vier Eckwinkel fahren beim Hover auf das Label zu, wie das
 * Anlegen eines Winkels beim Aufmaß. Nur auf dieser Seite verwendet.
 */
function ViewfinderCta({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const ecke = "pointer-events-none absolute h-4 w-4 border-signal transition-all duration-300 ease-out";
  return (
    <a
      href={href}
      className="group relative inline-flex items-center px-7 py-4 font-display text-lg tracking-tight text-limestone active:translate-y-px"
    >
      <span className="absolute inset-0 bg-limestone/0 transition-colors duration-300 group-hover:bg-limestone/10" />
      <span aria-hidden className={`${ecke} left-0 top-0 border-l-2 border-t-2 group-hover:left-1 group-hover:top-1`} />
      <span aria-hidden className={`${ecke} right-0 top-0 border-r-2 border-t-2 group-hover:right-1 group-hover:top-1`} />
      <span aria-hidden className={`${ecke} bottom-0 left-0 border-b-2 border-l-2 group-hover:bottom-1 group-hover:left-1`} />
      <span aria-hidden className={`${ecke} bottom-0 right-0 border-b-2 border-r-2 group-hover:bottom-1 group-hover:right-1`} />
      <span className="relative">{children}</span>
    </a>
  );
}
