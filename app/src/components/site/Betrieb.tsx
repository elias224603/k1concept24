import { betrieb, fakten } from "../../data/site";

/** Asymmetrischer Split: Aussage links, Eichen-Makro als Materialkante rechts. */
export function Betrieb() {
  return (
    <section id="betrieb" className="scroll-mt-20 bg-limestone py-20 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="max-w-[18ch] font-display text-[2.4rem] leading-[1.02] tracking-tighter text-ink md:text-[3.6rem]">
              Ein Ansprechpartner, vom Rohboden bis zur{" "}
              <span className="text-signal">letzten Leiste</span>.
            </h2>
            <div className="mt-7 max-w-[60ch] space-y-4 text-base leading-relaxed text-inksoft">
              <p>
                {betrieb.name} ist der Betrieb von {betrieb.inhaber} in{" "}
                {betrieb.plzOrt.replace(/^\d+\s/, "")}. Verlegt wird selbst,
                beraten wird vor Ort. Sie sprechen von der ersten Frage bis zur
                Abnahme mit derselben Person.
              </p>
              <p>
                Wir arbeiten in {betrieb.gebiet}. Für alles, was neben dem Boden
                anfällt, greifen wir auf feste Partnerbetriebe zurück, statt Sie
                weiterzureichen.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <img
              src="/assets/material-eiche-makro.jpg"
              alt="Nahaufnahme der Maserung einer geölten Eichendiele"
              width={1600}
              height={900}
              loading="lazy"
              decoding="async"
              className="h-56 w-full object-cover md:h-full md:min-h-[18rem]"
            />
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-1 gap-px border border-ink/15 bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {fakten.map((f) => (
            <div key={f.titel} className="bg-limestone p-6 md:p-7">
              <img
                src={f.icon}
                alt=""
                aria-hidden
                width={256}
                height={256}
                loading="lazy"
                decoding="async"
                className="h-8 w-8 opacity-70"
              />
              <dt className="mt-4 font-display text-lg tracking-tight text-ink">
                {f.titel}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-inksoft">
                {f.text}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
