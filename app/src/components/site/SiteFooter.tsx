import { betrieb } from "../../data/site";

export function SiteFooter() {
  return (
    <footer className="border-t-2 border-signal bg-ink pb-28 pt-16 md:pb-16 md:pt-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-limestone/55">
              Rufen Sie an
            </p>
            {/* Fugenlinie: der Unterstrich zeichnet sich von links. */}
            <a
              href={betrieb.telefonHref}
              className="group mt-4 inline-block font-display text-[2.4rem] leading-none tracking-tighter text-limestone md:text-[3.4rem]"
            >
              {betrieb.telefon}
              <span className="mt-2 block h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </a>
            <p className="mt-6 text-sm leading-relaxed text-limestone/60">
              Fax {betrieb.fax}
            </p>
          </div>

          <div className="md:col-span-4">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-limestone/55">
              Besuchen Sie uns
            </p>
            <address className="mt-4 not-italic text-base leading-relaxed text-limestone/85">
              {betrieb.name}
              <br />
              {betrieb.inhaber}
              <br />
              {betrieb.strasse}
              <br />
              {betrieb.plzOrt}
            </address>
          </div>

          <div className="md:col-span-3">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-limestone/55">
              Schreiben Sie uns
            </p>
            <a
              href={`mailto:${betrieb.email}`}
              className="mt-4 inline-block border-b border-limestone/30 pb-0.5 text-base text-limestone/85 transition-colors hover:border-signal hover:text-limestone"
            >
              {betrieb.email}
            </a>
            <p className="mt-6 text-sm leading-relaxed text-limestone/60">
              Tätig in {betrieb.gebiet}.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-limestone/15 pt-6 text-sm text-limestone/55 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <img
              src="/assets/logo-k1concept24-hell.png"
              alt="K1 concept 24"
              width={690}
              height={180}
              loading="lazy"
              decoding="async"
              className="h-7 w-auto"
            />
            <p>© {new Date().getFullYear()} {betrieb.name}</p>
          </div>
          <nav className="flex gap-6">
            <a href="/impressum" className="transition-colors hover:text-limestone">
              Impressum
            </a>
            <a href="/datenschutz" className="transition-colors hover:text-limestone">
              Datenschutz
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
