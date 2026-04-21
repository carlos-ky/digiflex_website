'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { siteConfig } from '@/lib/config';

export default function Hero() {
  return (
    <section className="min-h-screen bg-noir flex items-center justify-center text-center relative overflow-hidden px-8 pt-32 pb-16">
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(74,74,74,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl w-full">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          className="font-display text-blanc-casse leading-[1.15] mb-8"
          style={{ fontSize: 'clamp(2.4rem, 5vw, 4.5rem)' }}
        >
          De la stratégie
          <br />
          <em className="italic text-gris-moyen">à l&apos;exécution,</em>
          <br />
          nous faisons de votre entreprise
          <br />
          <em className="italic text-gris-moyen">une marque qui s&apos;impose.</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
          className="text-gris-moyen text-base tracking-widest uppercase mb-14"
        >
          Agence de Branding, Marketing Digital &amp; Communication
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: 'easeOut' }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-3.5 bg-blanc-casse text-noir font-bold text-sm tracking-wider uppercase hover:bg-white hover:-translate-y-0.5 transition-all"
          >
            Discutons de votre projet
          </a>
          <Link
            href="/services"
            className="inline-block px-10 py-3.5 border border-gris-moyen text-blanc-casse font-medium text-sm tracking-wider uppercase hover:border-blanc-casse hover:bg-white/5 transition-all"
          >
            Découvrir nos services
          </Link>
        </motion.div>
      </div>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gris-moyen text-xs tracking-[0.2em] uppercase flex flex-col items-center gap-2"
      >
        Scroll
        <span className="block w-px h-10 bg-gris-moyen animate-scroll-line" />
      </motion.span>
    </section>
  );
}
