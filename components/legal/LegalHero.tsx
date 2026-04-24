// ============================================================
// FICHIER : components/legal/LegalHero.tsx
// Hero section minimaliste et précise pour pages légales
// ============================================================

interface LegalHeroProps {
  label: string;        // Ex: "Document I"
  title: string;        // Ex: "Politique de confidentialité"
  subtitle?: string;    // Ex: "Protection de vos données personnelles"
  version: string;      // Ex: "Version 1.0"
  effectiveDate: string; // Ex: "23 avril 2026"
}

export function LegalHero({ label, title, subtitle, version, effectiveDate }: LegalHeroProps) {
  return (
    <section className="border-b border-[#0E0E0E]/10 bg-[#F8F6F0]">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12">
          {/* Colonne latérale - label & métadonnées */}
          <div className="lg:col-span-3 lg:pt-4">
            <p className="text-[10px] tracking-[0.32em] uppercase text-[#4A4A4A] font-medium">
              {label}
            </p>
            <div className="mt-16 space-y-6 text-xs tracking-[0.18em] uppercase text-[#4A4A4A]">
              <div>
                <p className="opacity-60 mb-1.5">Version</p>
                <p className="text-[#0E0E0E]">{version}</p>
              </div>
              <div>
                <p className="opacity-60 mb-1.5">Entrée en vigueur</p>
                <p className="text-[#0E0E0E] normal-case tracking-normal text-sm">
                  {effectiveDate}
                </p>
              </div>
              <div>
                <p className="opacity-60 mb-1.5">Éditeur</p>
                <p className="text-[#0E0E0E] normal-case tracking-normal text-sm">
                  DIGIFLEX SARL
                </p>
                <p className="text-[#4A4A4A] normal-case tracking-normal text-xs mt-1">
                  RCCM · BF-OUA-01-2025-B12-02317
                </p>
              </div>
            </div>
          </div>

          {/* Titre principal */}
          <div className="lg:col-span-9">
            <h1 className="font-display text-5xl md:text-6xl lg:text-[88px] leading-[0.95] tracking-tight text-[#0E0E0E]">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-8 font-display italic text-2xl md:text-3xl text-[#4A4A4A] leading-snug max-w-2xl">
                {subtitle}
              </p>
            )}

            {/* Filet décoratif + tagline */}
            <div className="mt-16 flex items-center gap-6">
              <div className="h-px w-20 bg-[#0E0E0E]" />
              <p className="text-[11px] tracking-[0.24em] uppercase text-[#4A4A4A]">
                Cadre juridique Digiflex
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
