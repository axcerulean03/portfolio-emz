import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS } from '../../data/portfolio'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Navbar() {
  const [mobileOpen,    setMobileOpen]    = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const headerRef = useRef(null)

  // GSAP ScrollTrigger for navbar shrink
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top+=40 top',
        onEnter: () => {
          gsap.to(headerRef.current, {
            paddingTop:    12,
            paddingBottom: 12,
            backgroundColor: 'rgba(13,15,18,0.9)',
            backdropFilter: 'blur(24px)',
            borderBottomWidth: 1,
            duration: 0.4,
            ease: 'power2.out',
          })
        },
        onLeaveBack: () => {
          gsap.to(headerRef.current, {
            paddingTop:    24,
            paddingBottom: 24,
            backgroundColor: 'rgba(13,15,18,0)',
            backdropFilter: 'blur(0px)',
            borderBottomWidth: 0,
            duration: 0.4,
            ease: 'power2.out',
          })
        },
      })
    })
    return () => ctx.revert()
  }, [])

  // Animate navbar in on mount
  useEffect(() => {
    gsap.fromTo(headerRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 1.2 }
    )
  }, [])

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

  return (
    <header
      ref={headerRef}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        zIndex: 50,
        paddingTop: 24, paddingBottom: 24,
        opacity: 0, // GSAP animates this in
        borderBottom: '0px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a
          href="#"
          className="font-display text-xl tracking-tight"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <span className="text-white font-normal">Axce</span>
          <span className="text-accent-teal font-bold">rulean</span>
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

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
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

      <style>{`
        .nav-link { position: relative; padding-bottom: 4px; }
        .nav-link::after {
          content: ''; position: absolute;
          bottom: 0; left: 0; width: 0; height: 1.5px;
          background: #f472b6; border-radius: 999px;
          transition: width 0.25s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .nav-link.active::after { width: 100%; background: #2dd4bf; }
      `}</style>
    </header>
  )
}