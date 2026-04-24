// ============================================================
// FICHIER : components/legal/LegalContent.tsx
// Composants atomiques pour structurer les articles juridiques
// Style : architecte souverain — rigueur, clarté, précision
// ============================================================

import type { ReactNode } from 'react';

// ------------------------------------------------------------
// Conteneur principal d'un article numéroté
// ------------------------------------------------------------

interface ArticleProps {
  id: string;         // Ex: "article-1"
  number: string;     // Ex: "I"
  title: string;      // Ex: "Préambule"
  children: ReactNode;
}

export function Article({ id, number, title, children }: ArticleProps) {
  return (
    <section id={id} className="scroll-mt-24 py-12 border-b border-[#0E0E0E]/10 first:pt-0 last:border-b-0">
      <header className="mb-10">
        <div className="flex items-baseline gap-6 mb-4">
          <span className="font-display text-3xl tabular-nums text-[#4A4A4A]">
            {number}
          </span>
          <div className="h-px flex-1 bg-[#0E0E0E]/10" />
        </div>
        <h2 className="font-display text-3xl md:text-4xl leading-[1.1] tracking-tight text-[#0E0E0E]">
          {title}
        </h2>
      </header>
      <div className="space-y-5 text-[15px] leading-[1.75] text-[#0E0E0E]">
        {children}
      </div>
    </section>
  );
}

// ------------------------------------------------------------
// Sous-section à l'intérieur d'un article (ex: 1.1, 1.2)
// ------------------------------------------------------------

interface SectionProps {
  number?: string;    // Ex: "1.1"
  title: string;      // Ex: "Définitions"
  children: ReactNode;
}

export function Section({ number, title, children }: SectionProps) {
  return (
    <div className="mt-10 first:mt-0">
      <h3 className="font-sans text-base font-semibold tracking-tight text-[#0E0E0E] mb-4 flex items-baseline gap-3">
        {number && (
          <span className="font-display text-sm tabular-nums text-[#4A4A4A] font-normal">
            {number}
          </span>
        )}
        <span>{title}</span>
      </h3>
      <div className="space-y-4 text-[15px] leading-[1.75] text-[#0E0E0E]">
        {children}
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// Paragraphe standard
// ------------------------------------------------------------

interface PProps {
  children: ReactNode;
}

export function P({ children }: PProps) {
  return <p className="text-[#0E0E0E] leading-[1.75]">{children}</p>;
}

// ------------------------------------------------------------
// Texte en emphase forte (remplace <strong>)
// ------------------------------------------------------------

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-[#0E0E0E]">{children}</strong>;
}

// ------------------------------------------------------------
// Liste à tirets longs (style éditorial)
// ------------------------------------------------------------

interface DashListProps {
  items: ReactNode[];
}

export function DashList({ items }: DashListProps) {
  return (
    <ul className="space-y-3 pl-0">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-baseline gap-4 leading-[1.75]">
          <span
            aria-hidden
            className="flex-shrink-0 w-4 h-px bg-[#0E0E0E] mt-[0.75em] opacity-60"
          />
          <span className="flex-1 text-[#0E0E0E]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ------------------------------------------------------------
// Callout - bloc d'information important
// ------------------------------------------------------------

interface CalloutProps {
  label?: string;     // Ex: "Important"
  children: ReactNode;
}

export function Callout({ label = "Note", children }: CalloutProps) {
  return (
    <aside className="my-8 relative pl-8 py-1">
      <span
        aria-hidden
        className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#0E0E0E]"
      />
      <p className="text-[10px] tracking-[0.28em] uppercase text-[#4A4A4A] font-semibold mb-3">
        {label}
      </p>
      <div className="text-[15px] leading-[1.75] text-[#0E0E0E] italic">
        {children}
      </div>
    </aside>
  );
}

// ------------------------------------------------------------
// InfoBlock - bloc structuré type "fiche d'information"
// (pour les coordonnées, contact, identité juridique)
// ------------------------------------------------------------

interface InfoBlockRow {
  label: string;
  value: ReactNode;
}

interface InfoBlockProps {
  rows: InfoBlockRow[];
}

export function InfoBlock({ rows }: InfoBlockProps) {
  return (
    <div className="my-6 border-t border-b border-[#0E0E0E]/10 divide-y divide-[#0E0E0E]/10">
      {rows.map((row, idx) => (
        <div
          key={idx}
          className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-8 py-4"
        >
          <dt className="text-[11px] tracking-[0.2em] uppercase text-[#4A4A4A] font-medium md:pt-0.5">
            {row.label}
          </dt>
          <dd className="text-[15px] leading-[1.75] text-[#0E0E0E]">
            {row.value}
          </dd>
        </div>
      ))}
    </div>
  );
}

// ------------------------------------------------------------
// Lien interne avec style cohérent
// ------------------------------------------------------------

interface LinkInlineProps {
  href: string;
  children: ReactNode;
  external?: boolean;
}

export function LinkInline({ href, children, external }: LinkInlineProps) {
  const external_props = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};
  return (
    <a
      href={href}
      {...external_props}
      className="text-[#0E0E0E] underline underline-offset-4 decoration-[#4A4A4A] hover:decoration-[#0E0E0E] transition-colors"
    >
      {children}
    </a>
  );
}

// ------------------------------------------------------------
// Bloc de mise en valeur centrée (ex: email principal)
// ------------------------------------------------------------

interface FeatureBlockProps {
  label?: string;
  value: string;
  href?: string;
}

export function FeatureBlock({ label, value, href }: FeatureBlockProps) {
  const Content = (
    <>
      {label && (
        <p className="text-[10px] tracking-[0.28em] uppercase text-[#4A4A4A] font-medium mb-3">
          {label}
        </p>
      )}
      <p className="font-display text-3xl md:text-4xl tracking-tight text-[#0E0E0E]">
        {value}
      </p>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block my-10 py-8 px-8 border border-[#0E0E0E]/10 hover:border-[#0E0E0E] transition-colors duration-300 text-center group"
      >
        {Content}
      </a>
    );
  }

  return (
    <div className="my-10 py-8 px-8 border border-[#0E0E0E]/10 text-center">
      {Content}
    </div>
  );
}
