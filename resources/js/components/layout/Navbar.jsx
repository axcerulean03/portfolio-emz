import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, OWNER } from '../../data/portfolio'

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false)
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Shrink navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight active nav link based on scroll position
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const handleClick = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Go back to intro screen by reloading the page
  const handleBlobClick = (e) => {
    e.preventDefault()
    window.location.reload()
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 bg-dark-900/90 backdrop-blur-xl border-b border-white/5' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo with mini blob */}
        <a
          href="#"
          className="font-display text-xl tracking-tight flex items-center gap-2"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          {/* Mini blob — click to return to intro screen */}
          <span
            onClick={handleBlobClick}
            title="Back to intro"
            style={{
              position: 'relative',
              width: 22, height: 22,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            <span style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
              background: 'rgba(244,114,182,0.08)',
              border: '1px solid rgba(244,114,182,0.35)',
              animation: 'blob-spin 6s ease-in-out infinite',
              transition: 'background 0.2s ease, border-color 0.2s ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(244,114,182,0.22)'
                e.currentTarget.style.borderColor = 'rgba(244,114,182,0.8)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(244,114,182,0.08)'
                e.currentTarget.style.borderColor = 'rgba(244,114,182,0.35)'
              }}
            />
            <span style={{
              position: 'absolute',
              inset: 3,
              borderRadius: '45% 55% 40% 60% / 60% 40% 55% 45%',
              background: 'linear-gradient(135deg, rgba(244,114,182,0.15), rgba(45,212,191,0.1))',
              border: '1px solid rgba(45,212,191,0.2)',
              animation: 'blob-spin 4s ease-in-out infinite reverse',
              pointerEvents: 'none',
            }} />
          </span>

          <span className="text-white font-normal">Axce<span className="text-accent-teal font-bold">rulean</span></span>

        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`nav-link text-sm transition-colors duration-200 ${
                activeSection === link.href.replace('#', '')
                  ? 'text-accent-teal active'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="px-6 py-4 flex flex-col gap-4 bg-dark-800/95 backdrop-blur-xl border-b border-white/5">
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className="text-left text-white/70 hover:text-accent-teal transition-colors text-sm"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes blob-spin {
          0%   { transform: rotate(0deg)   scale(1);    border-radius: 60% 40% 55% 45% / 45% 55% 40% 60%; }
          33%  { transform: rotate(120deg) scale(1.08); border-radius: 40% 60% 45% 55% / 55% 45% 60% 40%; }
          66%  { transform: rotate(240deg) scale(0.95); border-radius: 55% 45% 60% 40% / 40% 60% 45% 55%; }
          100% { transform: rotate(360deg) scale(1);    border-radius: 60% 40% 55% 45% / 45% 55% 40% 60%; }
        }

        .nav-link {
          position: relative;
          padding-bottom: 4px;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #f472b6;
          border-radius: 999px;
          transition: width 0.25s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-link.active::after {
          width: 100%;
          background: #2dd4bf;
        }
      `}</style>
    </header>
  )
}
