import Image from 'next/image';
import { siteConfig } from '@/lib/config';

export default function Footer() {
  return (
    <footer className="bg-noir py-12 px-[4%] text-center">
      <Image
        src="/logo-white.png"
        alt="Digiflex"
        width={120}
        height={24}
        className="h-6 w-auto mx-auto mb-6"
      />
      <p className="font-display italic text-gris-moyen text-base mb-4">
        {siteConfig.tagline}
      </p>
      <p className="text-xs text-white/30 tracking-wider">
        © 2026 Digiflex — {siteConfig.location} — Tous droits réservés
      </p>
    </footer>
  );
}
