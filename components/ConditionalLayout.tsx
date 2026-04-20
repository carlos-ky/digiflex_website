'use client'

import { usePathname } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <>
      {!isAdmin && <Navigation />}
      <main>{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppFloat />}
    </>
  )
}