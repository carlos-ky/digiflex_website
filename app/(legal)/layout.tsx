// ============================================================
// FICHIER : app/(legal)/layout.tsx
// Layout autonome pour les pages légales — architecte souverain
// ============================================================

import type { ReactNode } from 'react';
import Link from 'next/link';

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#0E0E0E] font-sans antialiased">
      {/* Header minimaliste dédié */}
      <header className="border-b border-[#0E0E0E]/10">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-baseline gap-2"
            aria-label="Retour au site Digiflex"
          >
            <span className="font-display text-2xl tracking-tight text-[#0E0E0E]">
              digiflex
            </span>
            <span className="text-[9px] tracking-[0.24em] text-[#4A4A4A] uppercase translate-y-[-8px]">
              sarl
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10 text-[11px] tracking-[0.2em] uppercase text-[#4A4A4A]">
            <Link href="/privacy" className="hover:text-[#0E0E0E] transition-colors duration-300">
              Confidentialité
            </Link>
            <Link href="/terms" className="hover:text-[#0E0E0E] transition-colors duration-300">
              Conditions
            </Link>
            <Link href="/data-deletion" className="hover:text-[#0E0E0E] transition-colors duration-300">
              Suppression
            </Link>
          </nav>

          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#4A4A4A] hover:text-[#0E0E0E] transition-colors duration-300"
          >
            <span aria-hidden className="inline-block transition-transform group-hover:-translate-x-1">←</span>
            <span>Retour</span>
          </Link>
        </div>
      </header>

      {/* Contenu */}
      <main>{children}</main>

      {/* Footer minimaliste dédié aux pages légales */}
      <footer className="border-t border-[#0E0E0E]/10 mt-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 gap-x-8">
            <div className="md:col-span-5">
              <p className="text-[11px] tracking-[0.24em] uppercase text-[#4A4A4A] mb-4">Cadre juridique</p>
              <p className="font-display text-3xl leading-tight text-[#0E0E0E]">
                Digiflex<br />
                <span className="text-[#4A4A4A] italic">Build bold.</span><br />
                <span className="text-[#4A4A4A] italic">Grow real.</span>
              </p>
            </div>

            <div className="md:col-span-3">
              <p className="text-[11px] tracking-[0.24em] uppercase text-[#4A4A4A] mb-4">Documents</p>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/privacy" className="text-[#0E0E0E] hover:text-[#4A4A4A] transition-colors">
                    Politique de confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-[#0E0E0E] hover:text-[#4A4A4A] transition-colors">
                    Conditions générales
                  </Link>
                </li>
                <li>
                  <Link href="/data-deletion" className="text-[#0E0E0E] hover:text-[#4A4A4A] transition-colors">
                    Suppression des données
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <p className="text-[11px] tracking-[0.24em] uppercase text-[#4A4A4A] mb-4">Contact</p>
              <ul className="space-y-2 text-sm text-[#0E0E0E]">
                <li>
                  <a
                    href="mailto:contact@digiflex-burkina.com"
                    className="hover:text-[#4A4A4A] transition-colors underline-offset-4 hover:underline"
                  >
                    contact@digiflex-burkina.com
                  </a>
                </li>
                <li>+226 54 71 48 40</li>
                <li className="text-[#4A4A4A] leading-relaxed pt-2">
                  Secteur 14, Lot 08, Parcelle 05<br />
                  09 BP 1654 Ouagadougou 09<br />
                  Burkina Faso
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-6 border-t border-[#0E0E0E]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[11px] tracking-[0.18em] uppercase text-[#4A4A4A]">
            <p>© 2026 Digiflex SARL · RCCM BF-OUA-01-2025-B12-02317</p>
            <p className="italic normal-case tracking-normal text-xs">
              De la stratégie à l'exécution.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
