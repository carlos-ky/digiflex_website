'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import { siteConfig } from '@/lib/config';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="py-24 px-[4%]" id="contact">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Reveal>
            <span className="text-xs tracking-[0.2em] uppercase text-gris-moyen mb-6 block">
              Contact
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="font-display leading-[1.15] mb-10"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              Parlons de
              <br />
              votre projet.
            </h2>
          </Reveal>

          <div className="space-y-8">
            <Reveal delay={0.2}>
              <div>
                <span className="text-xs tracking-[0.15em] uppercase text-gris-moyen block mb-1">
                  WhatsApp
                </span>
                <a
                  href={siteConfig.whatsappUrl}
                  className="text-lg font-medium border-b border-gris-clair hover:border-noir transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div>
                <span className="text-xs tracking-[0.15em] uppercase text-gris-moyen block mb-1">
                  Email
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-lg font-medium border-b border-gris-clair hover:border-noir transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div>
                <span className="text-xs tracking-[0.15em] uppercase text-gris-moyen block mb-1">
                  Localisation
                </span>
                <span className="text-lg font-medium">
                  {siteConfig.location}
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.35}>
              <div className="flex gap-6 pt-4">
                {Object.entries(siteConfig.social).map(([name, url]) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gris-moyen tracking-wider uppercase hover:text-noir transition-colors"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.2}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Votre nom"
              required
              className="w-full px-4 py-4 border border-gris-clair bg-transparent font-sans text-sm focus:border-noir outline-none transition-colors"
            />
            <input
              type="text"
              placeholder="Votre entreprise"
              className="w-full px-4 py-4 border border-gris-clair bg-transparent font-sans text-sm focus:border-noir outline-none transition-colors"
            />
            <input
              type="email"
              placeholder="Votre email"
              required
              className="w-full px-4 py-4 border border-gris-clair bg-transparent font-sans text-sm focus:border-noir outline-none transition-colors"
            />
            <input
              type="tel"
              placeholder="Votre téléphone / WhatsApp"
              className="w-full px-4 py-4 border border-gris-clair bg-transparent font-sans text-sm focus:border-noir outline-none transition-colors"
            />
            <textarea
              placeholder="Parlez-nous de votre projet..."
              className="w-full px-4 py-4 border border-gris-clair bg-transparent font-sans text-sm focus:border-noir outline-none transition-colors resize-y min-h-[150px]"
              rows={5}
            />
            <button
              type="submit"
              className="px-10 py-4 bg-noir text-blanc-casse font-bold text-sm tracking-wider uppercase hover:bg-gris-graphite transition-colors"
            >
              {submitted ? 'Message envoyé !' : 'Envoyer le message'}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
