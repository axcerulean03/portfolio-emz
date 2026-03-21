import { useRef, useState } from 'react'
import { MapPin, ArrowDown } from 'lucide-react'
import { OWNER } from '../../data/portfolio'
import Orb from '../ui/Orb'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroBg from '../../assets/hero-bg.jpg'

gsap.registerPlugin(ScrollTrigger)

// ── Replace these with your actual photos ──
const PHOTO_FRONT = 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80'
const PHOTO_BACK  = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'

function FlipPhoto() {
  const [flipped, setFlipped] = useState(false)
  const cardRef = useRef(null)

  const handleFlip = () => {
    const card = cardRef.current
    if (!card) return

    gsap.timeline()
      .to(card, { scaleX: 0.92, scaleY: 1.04, duration: 0.12, ease: 'power2.in' })
      .to(card, { rotationY: flipped ? 0 : 180, scaleX: 1, scaleY: 1, duration: 0.65, ease: 'power3.inOut' })
      .call(() => setFlipped(f => !f))
  }

  return (
    <div
      onClick={handleFlip}
      style={{ width: '100%', height: '100%', cursor: 'pointer', perspective: '1000px', position: 'relative' }}
      title="Click to flip"
    >
      <div
        ref={cardRef}
        style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d', borderRadius: '50%' }}
      >
        {/* Front */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden',
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
        }}>
          <img src={PHOTO_FRONT} alt={OWNER.name} className="w-full h-full object-cover" draggable={false} />
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%', overflow: 'hidden',
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
        }}>
          <img src={PHOTO_BACK} alt={`${OWNER.name} — photo 2`} className="w-full h-full object-cover" draggable={false} />
        </div>
      </div>

      {/* Flip hint */}
      {!flipped && (
        <div style={{
          position: 'absolute', bottom: -28, left: '50%', transform: 'translateX(-50%)',
          whiteSpace: 'nowrap', fontSize: '0.6rem', fontFamily: 'Satoshi, sans-serif',
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.25)', pointerEvents: 'none',
        }}>
        </div>
      )}
    </div>
  )
}

export default function HeroSection() {
  const sectionRef  = useRef(null)
  const photoRef    = useRef(null)
  const locationRef = useRef(null)
  const nameRef     = useRef(null)
  const titleRef    = useRef(null)
  const bioRef      = useRef(null)
  const ctaRef      = useRef(null)
  const bgRef       = useRef(null)

  const scrollToWork = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    gsap.to(bgRef.current, {
      yPercent: 25, ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
    })

    tl.fromTo(photoRef.current,    { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1,  duration: 0.9, ease: 'power3.out' })
    tl.fromTo(locationRef.current, { opacity: 0, y: 12 },       { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.5')
    tl.fromTo(nameRef.current,     { opacity: 0, y: 30 },       { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
    tl.fromTo(titleRef.current,    { opacity: 0, y: 16 },       { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.4')
    tl.fromTo(bioRef.current,      { opacity: 0, y: 16 },       { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.35')
    tl.fromTo(ctaRef.current,      { opacity: 0, y: 16 },       { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative flex overflow-hidden">

      <div className="absolute inset-0 z-0" ref={bgRef}>
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 w-full flex items-center justify-center min-h-screen pointer-events-none">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 w-full">

          {/* Photo + Orb */}
          <div ref={photoRef} className="flex-shrink-0 pointer-events-auto" style={{ opacity: 0 }}>
            <div className="relative w-56 h-56 lg:w-72 lg:h-72 flex items-center justify-center">
              <div className="absolute -inset-16 z-0 pointer-events-none">
                <Orb hue={0} hoverIntensity={0.2} rotateOnHover={true} forceHoverState={false} />
              </div>
              <div className="relative z-10 w-full h-full">
                <FlipPhoto />
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-5 text-center lg:text-left">
            <div ref={locationRef} className="flex items-center justify-center lg:justify-start gap-2" style={{ opacity: 0 }}>
              <MapPin size={11} className="text-accent-teal" />
              <span className="text-xs font-mono text-white/35 tracking-widest uppercase">{OWNER.location}</span>
            </div>
            <h1 ref={nameRef} className="font-display text-5xl md:text-6xl leading-tight" style={{ opacity: 0 }}>
              Hi, I'm{' '}<span className="text-accent-teal italic">{OWNER.firstName}</span>
            </h1>
            <p ref={titleRef} className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase" style={{ opacity: 0 }}>
              {OWNER.title}
            </p>
            <p ref={bioRef} className="text-white/55 leading-relaxed max-w-md" style={{ opacity: 0 }}>
              {OWNER.subtitle}
            </p>
            <div ref={ctaRef} className="mt-2 pointer-events-auto" style={{ opacity: 0 }}>
              <button onClick={scrollToWork} className="btn-outline inline-flex items-center gap-2 text-sm">
                View my work <ArrowDown size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 pointer-events-none">
        <span className="text-xs font-mono tracking-widest text-white">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  )
}