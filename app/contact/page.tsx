import type { Metadata } from 'next';
import ContactSection from '@/components/ContactSection';

export const metadata: Metadata = {
  title: 'Contact — Digiflex',
  description:
    'Contactez Digiflex pour discuter de votre projet. WhatsApp, email, ou formulaire de contact.',
};

export default function ContactPage() {
  return (
    <>
      <div className="pt-32" />
      <ContactSection />
    </>
  );
}
