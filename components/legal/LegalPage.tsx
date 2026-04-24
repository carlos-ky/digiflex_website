// ============================================================
// FICHIER : components/legal/LegalPage.tsx
// Wrapper qui compose Hero + TOC sticky + contenu
// ============================================================

import type { ReactNode } from 'react';
import { LegalHero } from './LegalHero';
import { LegalTableOfContents, type TocSection } from './LegalTableOfContents';

interface LegalPageProps {
  label: string;
  title: string;
  subtitle?: string;
  version: string;
  effectiveDate: string;
  sections: TocSection[];
  children: ReactNode;
}

export function LegalPage({
  label,
  title,
  subtitle,
  version,
  effectiveDate,
  sections,
  children,
}: LegalPageProps) {
  return (
    <>
      <LegalHero
        label={label}
        title={title}
        subtitle={subtitle}
        version={version}
        effectiveDate={effectiveDate}
      />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
          {/* Sommaire sticky à gauche (desktop uniquement) */}
          <aside className="lg:col-span-3 hidden lg:block">
            <LegalTableOfContents sections={sections} />
          </aside>

          {/* Contenu principal */}
          <div className="lg:col-span-9 lg:col-start-4 max-w-3xl">
            {/* Version mobile du sommaire : collapsable */}
            <details className="lg:hidden mb-12 border border-[#0E0E0E]/10 bg-white/50">
              <summary className="cursor-pointer select-none px-6 py-4 text-[11px] tracking-[0.24em] uppercase text-[#4A4A4A] hover:text-[#0E0E0E] transition-colors flex items-center justify-between">
                <span>Sommaire du document</span>
                <span aria-hidden className="text-lg">+</span>
              </summary>
              <div className="px-6 pb-6 pt-2 border-t border-[#0E0E0E]/10">
                <ul className="space-y-2 pt-4">
                  {sections.map((section) => (
                    <li key={section.id} className="flex items-baseline gap-3 text-sm">
                      <span className="font-display text-xs tabular-nums text-[#4A4A4A] flex-shrink-0">
                        {section.number}
                      </span>
                      <a
                        href={`#${section.id}`}
                        className="text-[#0E0E0E] hover:text-[#4A4A4A] transition-colors"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </details>

            <article className="space-y-0">{children}</article>

            {/* Séparateur de fin */}
            <div className="mt-24 pt-12 border-t border-[#0E0E0E]/10">
              <p className="text-[10px] tracking-[0.32em] uppercase text-[#4A4A4A]">
                Fin du document
              </p>
              <p className="mt-2 text-xs italic text-[#4A4A4A]">
                Digiflex SARL · {title} · {version} · 2026
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
