import type { Metadata } from 'next';
import Services from '@/components/Services';
import CTABand from '@/components/CTABand';

export const metadata: Metadata = {
  title: 'Services — Digiflex',
  description:
    'Brand Book, Site Web, Social Media, Publicité Digitale. Des solutions sur mesure pour transformer votre entreprise en marque.',
};

export default function ServicesPage() {
  return (
    <>
      <div className="pt-32" />
      <Services />
      <CTABand />
    </>
  );
}
