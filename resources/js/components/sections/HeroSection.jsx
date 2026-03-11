import { ArrowDown, MapPin } from 'lucide-react'
import { OWNER, PROJECTS } from '../../data/portfolio'

// Floating card component used in the hero collage
function FloatingCard({ children, className = '' }) {
  return (
    <div className={`card-glass shadow-2xl ${className}`}>
      {children}
    </div>
  )
}

export default function HeroSection() {
  const scrollToWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-accent-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-coral/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">
        {/* ── Left: text ── */}
        <div className="flex flex-col gap-6">
          {/* Location chip */}
          <div className="flex items-center gap-2 opacity-0 animate-fade-in animate-delay-100">
            <MapPin size={12} className="text-accent-teal" />
            <span className="text-xs font-mono text-white/40 tracking-widest uppercase">
              {OWNER.location}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl xl:text-7xl leading-[1.08] opacity-0 animate-fade-up animate-delay-200">
            Hi, I'm{' '}
            <span className="text-accent-teal italic">{OWNER.firstName}</span>
          </h1>

          {/* Sub-title */}
          <p
            className="font-mono text-sm tracking-[0.15em] text-white/50 uppercase opacity-0 animate-fade-in animate-delay-300"
          >
            {OWNER.title}
          </p>

          {/* Body */}
          <p className="text-white/60 leading-relaxed max-w-sm opacity-0 animate-fade-up animate-delay-400">
            {OWNER.subtitle} Welcome to my portfolio.
          </p>

          {/* CTA */}
          <div className="flex items-center gap-4 mt-2 opacity-0 animate-fade-up animate-delay-500">
            <button onClick={scrollToWork} className="btn-outline flex items-center gap-2">
              Check out my work
              <ArrowDown size={14} />
            </button>
          </div>
        </div>

        {/* ── Right: floating cards collage ── */}
        <div className="relative h-[520px] hidden lg:block">
          {/* Card 1 — top left: small project card */}
          <FloatingCard className="absolute -top-10 -left-[70px] w-48 p-4 animate-float z-10 ">
            <img
              src={PROJECTS[0].image}
              alt={PROJECTS[0].title}
              className="w-full h-24 object-cover rounded-xl mb-3"
            />
            <span className="tag bg-accent-teal/10 text-accent-teal mb-2 block">
              {PROJECTS[0].tag}
            </span>
            <p className="text-xs text-white/80 font-medium leading-tight">
              {PROJECTS[0].title}
            </p>
          </FloatingCard>

          {/* Card 2 — center large: landscape image */}
          <FloatingCard className="absolute top-1/6 left-[130px] w-72 overflow-hidden animate-float-slow">
            <img
              src={PROJECTS[1].image}
              alt={PROJECTS[1].title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <p className="text-xs text-white/40 font-mono tracking-widest uppercase mb-1">
                Images about my passions
              </p>
              <h3 className="font-display text-lg text-white">{PROJECTS[1].title}</h3>
              <p className="text-xs text-white/50 mt-1">{PROJECTS[1].description}</p>
            </div>
          </FloatingCard>

          {/* Card 3 — bottom right: profile card */}
          <FloatingCard className="absolute bottom-1/4 -right-[25px] w-48 p-4 flex flex-col items-center gap-3 animate-float-slow">
            <img
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80"
              alt={OWNER.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-accent-teal/40"
            />
            <div className="text-center">
              <p className="text-sm font-semibold text-white">{OWNER.name}</p>
              <p className="text-xs font-mono text-accent-teal/70 tracking-wider mt-0.5">
                JR. DEVELOPER
              </p>
              <p className="text-xs text-white/40 mt-2 leading-relaxed">{OWNER.bio}</p>
            </div>
            <button className="btn-teal text-xs py-2 px-4 w-full text-center">
              Let's start a project together!
            </button>
          </FloatingCard>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs font-mono tracking-widest text-white">scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  )
}
