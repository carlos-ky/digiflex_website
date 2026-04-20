'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Identifiants incorrects. Veuillez réessayer.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div
      style={{ backgroundColor: '#0E0E0E', minHeight: '100vh' }}
      className="flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md">
        {/* Logo / Titre */}
        <div className="text-center mb-10">
          <p
            className="text-xs tracking-[0.3em] uppercase mb-2"
            style={{ color: '#4A4A4A', fontFamily: 'DM Sans, sans-serif' }}
          >
            Administration
          </p>
          <h1
            className="text-4xl font-light"
            style={{ color: '#F8F6F0', fontFamily: 'Cormorant Garamond, serif' }}
          >
            Digiflex
          </h1>
        </div>

        {/* Formulaire */}
        <div
          className="rounded-sm p-8"
          style={{ backgroundColor: '#141414', border: '1px solid #222' }}
        >
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-xs tracking-widest uppercase mb-2"
                style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 text-sm outline-none transition-colors"
                style={{
                  backgroundColor: '#0E0E0E',
                  border: '1px solid #2A2A2A',
                  color: '#F8F6F0',
                  fontFamily: 'DM Sans, sans-serif',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#4A4A4A')}
                onBlur={(e) => (e.target.style.borderColor = '#2A2A2A')}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs tracking-widest uppercase mb-2"
                style={{ color: '#9A9A9A', fontFamily: 'DM Sans, sans-serif' }}
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 text-sm outline-none transition-colors"
                style={{
                  backgroundColor: '#0E0E0E',
                  border: '1px solid #2A2A2A',
                  color: '#F8F6F0',
                  fontFamily: 'DM Sans, sans-serif',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#4A4A4A')}
                onBlur={(e) => (e.target.style.borderColor = '#2A2A2A')}
              />
            </div>

            {error && (
              <p
                className="text-xs text-center"
                style={{ color: '#ef4444', fontFamily: 'DM Sans, sans-serif' }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-xs tracking-widest uppercase transition-opacity"
              style={{
                backgroundColor: '#F8F6F0',
                color: '#0E0E0E',
                fontFamily: 'DM Sans, sans-serif',
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>

        <p
          className="text-center text-xs mt-6"
          style={{ color: '#2A2A2A', fontFamily: 'DM Sans, sans-serif' }}
        >
          digiflex-burkina.com
        </p>
      </div>
    </div>
  )
}