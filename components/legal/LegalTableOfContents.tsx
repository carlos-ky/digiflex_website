// ============================================================
// FICHIER : components/legal/LegalTableOfContents.tsx
// Sommaire sticky avec détection de la section active
// ============================================================

'use client';

import { useEffect, useState } from 'react';

export interface TocSection {
  id: string;       // Ex: "article-1"
  number: string;   // Ex: "I"
  title: string;    // Ex: "Préambule"
}

interface LegalTableOfContentsProps {
  sections: TocSection[];
}

export function LegalTableOfContents({ sections }: LegalTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');

  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Trouve la section visible la plus haute
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav aria-label="Sommaire" className="sticky top-12">
      <p className="text-[10px] tracking-[0.32em] uppercase text-[#4A4A4A] font-medium mb-8">
        Sommaire
      </p>

      <ul className="space-y-1 border-l border-[#0E0E0E]/10">
        {sections.map((section) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(e) => handleClick(e, section.id)}
                className={`
                  group relative flex items-baseline gap-4 py-2 pl-5 pr-2 -ml-px
                  border-l transition-all duration-300
                  ${
                    isActive
                      ? 'border-[#0E0E0E] text-[#0E0E0E]'
                      : 'border-transparent text-[#4A4A4A] hover:text-[#0E0E0E] hover:border-[#4A4A4A]'
                  }
                `}
              >
                <span
                  className={`
                    flex-shrink-0 font-display text-xs tabular-nums transition-opacity duration-300
                    ${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'}
                  `}
                >
                  {section.number}
                </span>
                <span
                  className={`
                    text-[13px] leading-snug transition-all duration-300
                    ${isActive ? 'font-medium' : ''}
                  `}
                >
                  {section.title}
                </span>
              </a>
            </li>
          );
        })}
      </ul>

      <div className="mt-10 pt-6 border-t border-[#0E0E0E]/10">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase text-[#4A4A4A] hover:text-[#0E0E0E] transition-colors"
        >
          <span aria-hidden>↑</span>
          <span>Retour en haut</span>
        </a>
      </div>
    </nav>
  );
}
