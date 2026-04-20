'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import { siteConfig } from '@/lib/config';
import { supabase } from '@/lib/supabase';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    full_name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const set = (key: string, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.from('contact_messages').insert({
      full_name: form.full_name,
      email: form.email,
      phone: form.phone || null,
      company: form.company || null,
      message: form.message,
    });

    if (error) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setForm({ full_name: '', company: '', email: '', phone: '', message: '' });
    setLoading(false);
    setTimeout(() => setSubmitted(false), 4000);
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
                
                <a  href={siteConfig.whatsappUrl}
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
                
                <a  href={`mailto:${siteConfig.email}`}
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
              value={form.full_name}
              onChange={(e) => set('full_name', e.target.value)}
              className="w-full px-4 py-4 border border-gris-clair bg-transparent font-sans text-sm focus:border-noir outline-none transition-colors"
            />
            <input
              type="text"
              placeholder="Votre entreprise"
              value={form.company}
              onChange={(e) => set('company', e.target.value)}
              className="w-full px-4 py-4 border border-gris-clair bg-transparent font-sans text-sm focus:border-noir outline-none transition-colors"
            />
            <input
              type="email"
              placeholder="Votre email"
              required
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              className="w-full px-4 py-4 border border-gris-clair bg-transparent font-sans text-sm focus:border-noir outline-none transition-colors"
            />
            <input
              type="tel"
              placeholder="Votre téléphone / WhatsApp"
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              className="w-full px-4 py-4 border border-gris-clair bg-transparent font-sans text-sm focus:border-noir outline-none transition-colors"
            />
            <textarea
              placeholder="Parlez-nous de votre projet..."
              required
              value={form.message}
              onChange={(e) => set('message', e.target.value)}
              className="w-full px-4 py-4 border border-gris-clair bg-transparent font-sans text-sm focus:border-noir outline-none transition-colors resize-y min-h-[150px]"
              rows={5}
            />
            {error && (
              <p className="text-sm" style={{ color: '#ef4444' }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="px-10 py-4 bg-noir text-blanc-casse font-bold text-sm tracking-wider uppercase hover:bg-gris-graphite transition-colors"
              style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {submitted ? 'Message envoyé !' : loading ? 'Envoi...' : 'Envoyer le message'}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}