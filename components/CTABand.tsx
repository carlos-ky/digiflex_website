import Reveal from './Reveal';
import { siteConfig } from '@/lib/config';

export default function CTABand() {
  return (
    <section className="py-20 px-[4%] bg-noir text-center">
      <Reveal>
        <h2
          className="font-display text-blanc-casse leading-[1.15] mb-4"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
        >
          Prêt à transformer
          <br />
          votre image ?
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-gris-moyen text-base mb-8 max-w-lg mx-auto">
          Commençons par une conversation. Pas un devis — une vraie discussion
          sur votre business.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-3.5 bg-blanc-casse text-noir font-bold text-sm tracking-wider uppercase hover:bg-white hover:-translate-y-0.5 transition-all"
        >
          Échangeons sur WhatsApp
        </a>
      </Reveal>
    </section>
  );
}
