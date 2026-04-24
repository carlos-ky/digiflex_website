'use client'

import { usePathname } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

const LEGAL_PATHS = ['/privacy', '/terms', '/data-deletion']

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')
  const isLegal = LEGAL_PATHS.includes(pathname)
  const hideMainChrome = isAdmin || isLegal

  return (
    <>
      {!hideMainChrome && <Navigation />}
      <main>{children}</main>
      {!hideMainChrome && <Footer />}
      {!hideMainChrome && <WhatsAppFloat />}
    </>
  )
}