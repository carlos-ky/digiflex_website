'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'À propos' },
];

// Pages avec hero sombre (fond noir en haut) — logo blanc dès le départ
const darkHeroPages = ['/', '/portfolio', '/blog'];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const hasDarkHero = darkHeroPages.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Logique couleurs
  const isLight = !scrolled && !hasDarkHero
  const logo = isLight ? '/logo-black.png' : '/logo-white.png'
  const textColor = isLight ? 'text-noir' : 'text-white'
  const borderColor = isLight ? 'border-noir' : 'border-white'
  const bgHover = isLight ? 'hover:bg-noir hover:text-blanc-casse' : 'hover:bg-white hover:text-noir'
  const menuColor = isLight ? '#0E0E0E' : '#FFFFFF'

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 ${
          scrolled ? 'bg-noir py-3' : 'bg-transparent py-5'
        } px-[4%] flex items-center justify-between`}
      >
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="Digiflex"
            width={140}
            height={28}
            style={{ width: 'auto', height: '28px' }}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${textColor} text-sm uppercase tracking-wider font-medium relative group transition-colors duration-300`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 w-0 h-px ${isLight ? 'bg-noir' : 'bg-white'} transition-all duration-300 group-hover:w-full`} />
            </Link>
          ))}
          <Link
            href="/contact"
            className={`${textColor} px-6 py-2.5 text-xs font-bold uppercase tracking-wider border ${borderColor} ${bgHover} transition-colors duration-300`}
          >
            Nous contacter
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden z-50 transition-colors duration-300"
          style={{ color: menuColor }}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-noir transition-transform duration-400 md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-white text-2xl font-display"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="bg-white text-noir px-8 py-3 text-sm font-bold uppercase tracking-wider mt-4"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </>
  );
}