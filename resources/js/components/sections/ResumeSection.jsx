import { Download, ArrowUpRight } from 'lucide-react'
import { EXPERIENCE } from '../../data/portfolio'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const CARD_COLORS = ['#2dd4bf', '#f472b6', '#f5c842', '#a78bfa']

function ExperienceCard({ item, index }) {
  const { ref, isVisible } = useScrollReveal()
  const color = CARD_COLORS[index % CARD_COLORS.length]

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div
        className="relative overflow-hidden rounded-3xl p-8 md:p-10 group cursor-default"
        style={{
          background: 'linear-gradient(135deg, rgba(26,30,37,0.9) 0%, rgba(19,22,27,0.95) 100%)',
          border: `1px solid ${color}22`,
          boxShadow: `0 4px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)`,
          transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = `${color}55`
          e.currentTarget.style.boxShadow = `0 8px 60px rgba(0,0,0,0.4), 0 0 40px ${color}12, inset 0 1px 0 rgba(255,255,255,0.06)`
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = `${color}22`
          e.currentTarget.style.boxShadow = `0 4px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)`
        }}
      >
        {/* Large background index number */}
        <span
          className="absolute -right-4 -top-6 font-display font-bold select-none pointer-events-none"
          style={{
            fontSize: 'clamp(6rem, 12vw, 9rem)',
            color: `${color}08`,
            lineHeight: 1,
            transition: 'color 0.4s ease',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>


        {/* Role */}
        <h3
          className="font-display leading-tight mb-2"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#fff' }}
        >
          {item.role}
        </h3>

        {/* Company */}
        <p
          className="font-mono text-xs tracking-[0.2em] uppercase mb-6"
          style={{ color: `${color}99` }}
        >
          {item.company}
        </p>

        {/* Divider */}
        <div
          className="w-12 h-px mb-6 transition-all duration-500 group-hover:w-24"
          style={{ background: `linear-gradient(to right, ${color}60, transparent)` }}
        />

        {/* Description */}
        <p className="text-white/50 leading-relaxed text-sm max-w-xl">
          {item.description}
        </p>

        {/* Bottom color glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `linear-gradient(to right, transparent, ${color}60, transparent)` }}
        />
      </div>
    </div>
  )
}

export default function ResumeSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="resume" className="py-24 px-6 bg-dark-800/40">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div
          ref={ref}
          className={`flex items-end justify-between mb-16 flex-wrap gap-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div>
            <p className="section-label">My background</p>
            <h2 className="font-display text-4xl md:text-5xl text-white">
              Experience
            </h2>
          </div>
          <a
            href="#"
            className="btn-outline flex items-center gap-2"
            download
          >
            <Download size={14} />
            Download CV
          </a>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-5">
          {EXPERIENCE.map((item, i) => (
            <ExperienceCard key={item.company} item={item} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
