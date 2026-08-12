import type { ReactNode } from "react";

import { RufLeiste } from "./RufLeiste";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";

export function Rechtsseite({
  titel,
  children,
}: {
  titel: string;
  children: ReactNode;
}) {
  return (
    <>
      <SiteNav />
      <main className="bg-limestone">
        <div className="mx-auto max-w-[820px] px-5 py-16 md:px-10 md:py-24">
          <a
            href="/"
            className="inline-block border-b border-ink/30 pb-0.5 text-sm text-inksoft transition-colors hover:border-signal hover:text-ink"
          >
            Zurück zur Startseite
          </a>
          <h1 className="mt-8 font-display text-[2.2rem] leading-[1.05] tracking-tighter text-ink md:text-[3.2rem]">
            {titel}
          </h1>
          <div className="k1-rechtstext mt-10">{children}</div>
        </div>
      </main>
      <SiteFooter />
      <RufLeiste />
    </>
  );
}

export function Abschnitt({
  titel,
  children,
}: {
  titel: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-ink/15 py-8">
      <h2 className="font-display text-xl tracking-tight text-ink md:text-2xl">
        {titel}
      </h2>
      <div className="mt-4 max-w-[65ch] space-y-4 text-base leading-relaxed text-inksoft">
        {children}
      </div>
    </section>
  );
}
