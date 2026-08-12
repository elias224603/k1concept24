import { betrieb } from "../../data/site";

/**
 * Feste Ruf-Leiste am unteren Rand, nur auf kleinen Displays. Auf der
 * Baustelle ist der Daumen am unteren Bildschirmrand, nicht in der Kopfzeile.
 */
export function RufLeiste() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-limestone/15 bg-ink md:hidden">
      <a
        href={betrieb.telefonHref}
        className="flex items-center justify-center gap-2 py-4 font-display text-base tracking-tight text-limestone transition-transform active:translate-y-px"
      >
        <img
          src="/assets/icons/telefon.png"
          alt=""
          aria-hidden
          width={256}
          height={256}
          className="h-4 w-4 opacity-80 invert"
        />
        Anrufen
      </a>
      <a
        href="#anfrage"
        className="flex items-center justify-center bg-signal py-4 font-display text-base tracking-tight text-limestone transition-transform active:translate-y-px"
      >
        Anfrage stellen
      </a>
    </div>
  );
}
