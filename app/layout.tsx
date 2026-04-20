import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import ConditionalLayout from '@/components/ConditionalLayout'
import './globals.css';
import { headers } from 'next/headers';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Digiflex — Build bold. Grow real.',
  description:
    'Agence de branding, marketing et communication premium à Ouagadougou. De la stratégie à l\'exécution, nous faisons de votre entreprise une marque qui s\'impose.',
  keywords: [
    'agence communication Burkina Faso',
    'branding Ouagadougou',
    'marketing digital Burkina',
    'social media agence',
    'création site web Ouagadougou',
    'Digiflex',
  ],
  authors: [{ name: 'Digiflex' }],
  openGraph: {
    title: 'Digiflex — Build bold. Grow real.',
    description:
      'Agence de branding et communication premium à Ouagadougou. Nous transformons votre entreprise en marque qui s\'impose.',
    url: 'https://digiflex-burkina.com',
    siteName: 'Digiflex',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digiflex — Build bold. Grow real.',
    description:
      'Agence de branding et communication premium à Ouagadougou.',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers()
  const pathname = headersList.get('x-invoke-path') || ''
  const isAdmin = pathname.startsWith('/admin')

  
  return (
    <html lang="fr" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );

}