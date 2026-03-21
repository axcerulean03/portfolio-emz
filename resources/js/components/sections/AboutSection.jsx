import { useRef } from 'react'
import { OWNER, SKILLS } from '../../data/portfolio'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ICON_MAP = {
  'HTML':           { slug: 'html5',            color: '#E34F26' },
  'CSS':            { slug: 'css',              color: '#1572B6' },
  'JavaScript':     { slug: 'javascript',       color: '#F7DF1E' },
  'TypeScript':     { slug: 'typescript',       color: '#3178C6' },
  'React':          { slug: 'react',            color: '#61DAFB' },
  'Vue':            { slug: 'vuedotjs',         color: '#4FC08D' },
  'Tailwind':       { slug: 'tailwindcss',      color: '#06B6D4' },
  'Laravel':        { slug: 'laravel',          color: '#FF2D20' },
  'PHP':            { slug: 'php',              color: '#777BB4' },
  'Android':        { slug: 'android',          color: '#3DDC84' },
  'Java':           { slug: 'java',             color: '#F89820' },
  'Kotlin':         { slug: 'kotlin',           color: '#7F52FF' },
  'Flutter':        { slug: 'flutter',          color: '#02569B' },
  'Dart':           { slug: 'dart',             color: '#0175C2' },
  'MySQL':          { slug: 'mysql',            color: '#4479A1' },
  'Firebase':       { slug: 'firebase',         color: '#FFCA28' },
  'Git':            { slug: 'git',              color: '#F05032' },
  'GitHub':         { slug: 'github',           color: '#ffffff' },
  'Figma':          { slug: 'figma',            color: '#F24E1E' },
  'VS Code':        { slug: 'vscode',           color: '#007ACC' },
  'Node.js':        { slug: 'nodedotjs',        color: '#339933' },
  'Python':         { slug: 'python',           color: '#3776AB' },
  'C#':             { slug: 'csharp',           color: '#239120' },
  'Unity':          { slug: 'unity',            color: '#ffffff' },
  'Arduino':        { slug: 'arduino',          color: '#00979D' },
  'Raspberry Pi':   { slug: 'raspberrypi',      color: '#A22846' },
  'Docker':         { slug: 'docker',           color: '#2496ED' },
  'PostgreSQL':     { slug: 'postgresql',       color: '#4169E1' },
  'MongoDB':        { slug: 'mongodb',          color: '#47A248' },
  'Next.js':        { slug: 'nextdotjs',        color: '#ffffff' },
  'Vite':           { slug: 'vite',             color: '#646CFF' },
  'HTML/CSS':       { slug: 'css',              color: '#1572B6' },
  'SAP Fiori':      { slug: 'sap',              color: '#0070F2' },
  'Unreal Engine':  { slug: 'unrealengine',     color: '#ffffff' },
  'ESP32':          { slug: 'espressif',        color: '#E7352C' },
  'IoT Design':     { slug: 'arduino',          color: '#00979D' },
  'SAP HANA':       { slug: 'sap',              color: '#0070F2' },
  'Circuit Design': { slug: 'arduino',          color: '#00979D' },
  'Android Studio': { slug: 'androidstudio',    color: '#3DDC84' },
}

/* ── Single icon pill ── */
function SkillPill({ name, index }) {
  const info = ICON_MAP[name]
  const pillRef = useRef(null)

  return (
    <div
      ref={pillRef}
      title={name}
      className="group flex items-center gap-2 px-3 py-2 rounded-full cursor-default transition-all duration-200"
      style={{
        background:  'rgba(255,255,255,0.04)',
        border:      '1px solid rgba(255,255,255,0.08)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background    = 'rgba(255,255,255,0.08)'
        e.currentTarget.style.borderColor   = info?.color ? `${info.color}60` : 'rgba(255,255,255,0.2)'
        e.currentTarget.style.transform     = 'translateY(-2px)'
        e.currentTarget.style.boxShadow     = info?.color ? `0 4px 16px ${info.color}20` : 'none'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background    = 'rgba(255,255,255,0.04)'
        e.currentTarget.style.borderColor   = 'rgba(255,255,255,0.08)'
        e.currentTarget.style.transform     = 'translateY(0)'
        e.currentTarget.style.boxShadow     = 'none'
      }}
    >
      {info ? (
        <img
          src={`https://cdn.simpleicons.org/${info.slug}/${info.color.replace('#', '')}`}
          alt={name}
          className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0"
        />
      ) : (
        <span className="w-3.5 h-3.5 flex items-center justify-center text-[8px] font-mono text-white/40 flex-shrink-0">
          {name.slice(0, 2).toUpperCase()}
        </span>
      )}
      <span className="text-[11px] font-mono text-white/40 group-hover:text-white/70 transition-colors whitespace-nowrap">
        {name}
      </span>
    </div>
  )
}

/* ── Skill group block ── */
function SkillGroup({ group, groupIndex, sectionRef }) {
  const groupRef = useRef(null)
  const labelRef = useRef(null)
  const pillsRef = useRef(null)

  useGSAP(() => {
    // Label slides in from left
    gsap.fromTo(labelRef.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: groupRef.current, start: 'top 85%', once: true },
      }
    )

    // Pills stagger in
    const pills = pillsRef.current?.querySelectorAll('[title]')
    if (pills?.length) {
      gsap.fromTo(pills,
        { opacity: 0, y: 16, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1,
          duration:  0.45,
          stagger:   0.05,
          ease:      'power2.out',
          delay:     0.15,
          scrollTrigger: { trigger: groupRef.current, start: 'top 85%', once: true },
        }
      )
    }
  }, { scope: groupRef })

  const accent = ['#2dd4bf', '#f472b6', '#f5c842', '#a78bfa'][groupIndex % 4]

  return (
    <div ref={groupRef} className="flex flex-col gap-4">
      {/* Category label with accent line */}
      <div ref={labelRef} className="flex items-center gap-3" style={{ opacity: 0 }}>
        <div className="w-4 h-px" style={{ background: accent }} />
        <span
          className="text-[10px] font-mono tracking-[0.25em] uppercase"
          style={{ color: `${accent}99` }}
        >
          {group.category}
        </span>
      </div>

      {/* Pills */}
      <div ref={pillsRef} className="flex flex-wrap gap-2">
        {group.items.map((skill, i) => (
          <SkillPill key={skill} name={skill} index={i} />
        ))}
      </div>
    </div>
  )
}

export default function AboutSection() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const bio1Ref    = useRef(null)
  const bio2Ref    = useRef(null)
  const ctaRef     = useRef(null)
  const dividerRef = useRef(null)
  const skillsRef  = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true },
    })

    tl.fromTo(headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    )
    tl.fromTo(bio1Ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    )
    tl.fromTo(bio2Ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
    tl.fromTo(ctaRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )

    // Divider line draws in
    gsap.fromTo(dividerRef.current,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1, duration: 1.0, ease: 'power3.inOut',
        scrollTrigger: { trigger: dividerRef.current, start: 'top 88%', once: true },
      }
    )
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-16">
          <p className="section-label">About me</p>
          <div ref={headingRef} style={{ opacity: 0 }}>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-tight">
              Building things that{' '}
              <em className="text-accent-teal not-italic">actually work</em>
            </h2>
          </div>
        </div>

        {/* ── Bio + CTA ── */}
        <div className="max-w-2xl mb-8">
          <p ref={bio1Ref} className="text-white/55 leading-relaxed mb-4" style={{ opacity: 0 }}>
            I'm Eman, a fresh graduate from Naga City, Philippines with a broad set of hands-on
            skills — from building web systems and Android apps to crafting games and wiring up
            IoT devices. I like solving problems that sit at the intersection of software and the real world.
          </p>
          <p ref={bio2Ref} className="text-white/55 leading-relaxed" style={{ opacity: 0 }}>
            When I'm not coding, you'll find me gaming, watching movies, or diving into a good book.
            I bring that same curiosity and attention to detail into everything I build. 🎮
          </p>
        </div>

        <div ref={ctaRef} className="mb-20" style={{ opacity: 0 }}>
          <a href={`mailto:${OWNER.email}`} className="btn-teal inline-block">
            Let's build something together!
          </a>
        </div>

        {/* ── Divider ── */}
        <div
          ref={dividerRef}
          className="w-full h-px mb-16"
          style={{ background: 'linear-gradient(to right, rgba(45,212,191,0.3), rgba(244,114,182,0.15), transparent)' }}
        />

        {/* ── Skills grid — 2 columns ── */}
        <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {SKILLS.map((group, i) => (
            <SkillGroup
              key={group.category}
              group={group}
              groupIndex={i}
              sectionRef={sectionRef}
            />
          ))}
        </div>

      </div>
    </section>
  )
}