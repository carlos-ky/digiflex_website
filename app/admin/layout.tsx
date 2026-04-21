'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '▦' },
  { href: '/admin/portfolio', label: 'Portfolio', icon: '◈' },
  { href: '/admin/blog', label: 'Blog', icon: '◎' },
  { href: '/admin/services', label: 'Services', icon: '◇' },
  { href: '/admin/clients', label: 'Clients', icon: '◌' },
  { href: '/admin/messages', label: 'Messages', icon: '◻' },
  { href: '/admin/analytics', label: 'Analytics', icon: '◉' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [userEmail, setUserEmail] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }: { data: any }) => {
      if (data.user) setUserEmail(data.user.email ?? '')
    })
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  if (pathname === '/admin/login') return <>{children}</>

  return (
    <div style={{ backgroundColor: '#0E0E0E', minHeight: '100vh', display: 'flex' }}>
      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-30 flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        style={{
          width: '240px',
          backgroundColor: '#0A0A0A',
          borderRight: '1px solid #1A1A1A',
        }}
      >
        {/* Logo */}
        <div className="px-6 py-8" style={{ borderBottom: '1px solid #1A1A1A' }}>
          <p
            className="text-xs tracking-[0.3em] uppercase mb-1"
            style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
          >
            Admin
          </p>
          <h1
            className="text-2xl font-light"
            style={{ color: '#F8F6F0', fontFamily: 'Cormorant Garamond, serif' }}
          >
            Digiflex
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-3 mb-1 text-sm transition-colors"
                style={{
                  color: isActive ? '#F8F6F0' : '#4A4A4A',
                  backgroundColor: isActive ? '#1A1A1A' : 'transparent',
                  fontFamily: 'DM Sans, sans-serif',
                  borderRadius: '2px',
                }}
              >
                <span style={{ fontSize: '14px' }}>{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* User + Logout */}
        <div className="px-4 py-6" style={{ borderTop: '1px solid #1A1A1A' }}>
          <p
            className="text-xs mb-3 truncate"
            style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
          >
            {userEmail}
          </p>
          <button
            onClick={handleLogout}
            className="w-full text-left text-xs tracking-widest uppercase px-3 py-2 transition-colors"
            style={{
              color: '#4A4A4A',
              border: '1px solid #1A1A1A',
              fontFamily: 'DM Sans, sans-serif',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#F8F6F0'
              e.currentTarget.style.borderColor = '#4A4A4A'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#4A4A4A'
              e.currentTarget.style.borderColor = '#1A1A1A'
            }}
          >
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: '0px' }}>
        {/* Top bar */}
        <header
          className="flex items-center justify-between px-6 py-4 lg:hidden"
          style={{ borderBottom: '1px solid #1A1A1A' }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ color: '#F8F6F0', fontSize: '20px' }}
          >
            ☰
          </button>
          <span
            style={{
              color: '#F8F6F0',
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '20px',
            }}
          >
            Digiflex
          </span>
          <div style={{ width: '20px' }} />
        </header>

        {/* Page content */}
        <main
          className="flex-1 p-6 lg:p-8 overflow-auto"
          style={{ marginLeft: '0', paddingLeft: '1.5rem' }}
        >
          <div className="lg:ml-[240px]">{children}</div>
        </main>
      </div>
    </div>
  )
}