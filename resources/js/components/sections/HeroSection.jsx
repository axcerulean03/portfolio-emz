import { MapPin, ArrowDown } from 'lucide-react'
import { OWNER } from '../../data/portfolio'
import Orb from '../ui/Orb'

// Replace this with your actual image import or path
import heroBg from '../../assets/hero-bg.jpg'

export default function HeroSection() {
  const scrollToWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative flex">

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
        />
        {/* Darken the image slightly so text stays readable */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-8 w-full flex items-center justify-center min-h-screen pointer-events-none">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 w-full">

          {/* ── Left: Circle photo + orb behind it ── */}
          <div className="flex-shrink-0 opacity-0 animate-fade-in animate-delay-100">
            <div className="relative w-56 h-56 lg:w-72 lg:h-72 flex items-center justify-center">

              {/* Orb glows behind the photo */}
              <div className="absolute -inset-16 z-0 pointer-events-none">
                <Orb
                  hue={0}
                  hoverIntensity={0.2}
                  rotateOnHover={true}
                  forceHoverState={false}
                />
              </div>

              {/* Photo circle */}
              <div className="relative z-10 w-full h-full rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80"
                  alt={OWNER.name}
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>

          {/* ── Right: Text ── */}
          <div className="flex flex-col gap-5 text-center lg:text-left">

            {/* Location */}
            <div className="flex items-center justify-center lg:justify-start gap-2 opacity-0 animate-fade-in animate-delay-200">
              <MapPin size={11} className="text-accent-teal" />
              <span className="text-xs font-mono text-white/35 tracking-widest uppercase">
                {OWNER.location}
              </span>
            </div>

            {/* Name */}
            <h1 className="font-display text-5xl md:text-6xl leading-tight opacity-0 animate-fade-up animate-delay-300">
              Hi, I'm{' '}
              <span className="text-accent-teal italic">{OWNER.firstName}</span>
            </h1>

            {/* Title */}
            <p className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase opacity-0 animate-fade-in animate-delay-400">
              {OWNER.title}
            </p>

            {/* Bio */}
            <p className="text-white/55 leading-relaxed max-w-md opacity-0 animate-fade-up animate-delay-500">
              {OWNER.subtitle}
            </p>

            {/* CTA */}
            <div className="mt-2 opacity-0 animate-fade-up animate-delay-500 pointer-events-auto">
              <button
                onClick={scrollToWork}
                className="btn-outline inline-flex items-center gap-2 text-sm"
              >
                View my work
                <ArrowDown size={13} />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 pointer-events-none">
        <span className="text-xs font-mono tracking-widest text-white">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
      </div>

    </section>
  )
}