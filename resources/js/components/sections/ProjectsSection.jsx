import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { PROJECTS as STATIC_PROJECTS } from '../../data/portfolio'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function ProjectsSection({ projects }) {
  const items = projects?.length ? projects : STATIC_PROJECTS
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef(null)
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const section = sectionRef.current
      const sectionTop = section.getBoundingClientRect().top
      const sectionHeight = section.offsetHeight
      const windowHeight = window.innerHeight

      const scrollProgress = Math.max(0, Math.min(1,
        (-sectionTop) / (sectionHeight - windowHeight)
      ))

      const newIndex = Math.min(
        items.length - 1,
        Math.floor(scrollProgress * items.length)
      )
      setActiveIndex(newIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [items.length])

  return (
    <section id="projects" className="pt-16 pb-24 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div
          ref={titleRef}
          className={`mb-10 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="section-label">Selected work</p>
          <h2 className="font-display text-4xl md:text-5xl text-white">
            Projects I'm proud of
          </h2>
        </div>

        {/* Sticky scroll container */}
        <div
          ref={sectionRef}
          style={{ height: `${items.length * 100}vh` }}
          className="relative"
        >
          <div className="sticky top-0 h-screen flex items-center">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* ── Left: project info panel ── */}
              <div className="flex flex-col gap-8">

                {/* Progress dots */}
                <div className="flex items-center gap-2">
                  {items.map((_, i) => (
                    <div
                      key={i}
                      style={{
                        width: i === activeIndex ? 24 : 6,
                        height: 6,
                        borderRadius: 999,
                        background: i === activeIndex
                          ? (items[i].color ?? '#2dd4bf')
                          : 'rgba(255,255,255,0.15)',
                        transition: 'all 0.4s ease',
                      }}
                    />
                  ))}
                  <span className="text-xs font-mono text-white/30 ml-2">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
                  </span>
                </div>

                {/* Project info — all panels stacked, fade in/out */}
                <div style={{ position: 'relative', minHeight: 280 }}>
                  {items.map((project, i) => (
                    <div
                      key={project.id}
                      style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0,
                        opacity: i === activeIndex ? 1 : 0,
                        transform: i === activeIndex
                          ? 'translateY(0)'
                          : i < activeIndex
                          ? 'translateY(-20px)'
                          : 'translateY(20px)',
                        transition: 'opacity 0.5s ease, transform 0.5s ease',
                        pointerEvents: i === activeIndex ? 'auto' : 'none',
                      }}
                    >
                      {/* Tag + year */}
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="tag"
                          style={{
                            backgroundColor: `${project.color ?? '#2dd4bf'}18`,
                            color: project.color ?? '#2dd4bf',
                          }}
                        >
                          {project.tag}
                        </span>
                        <span className="text-xs font-mono text-white/30">{project.year}</span>
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-3xl md:text-4xl text-white leading-tight mb-4">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/55 leading-relaxed mb-6 max-w-md">
                        {project.description}
                      </p>

                      {/* Tech stack chips */}
                      {project.tech && (
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tech.map(t => (
                            <span
                              key={t}
                              className="tag bg-dark-600 text-white/50 border border-white/5"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* CTA */}
                      <a
                        href={project.link ?? '#'}
                        className="inline-flex items-center gap-2 text-sm font-mono tracking-wider"
                        style={{ color: project.color ?? '#2dd4bf' }}
                      >
                        View project <ArrowUpRight size={14} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Right: stacked media cards ── */}
              <div className="relative h-[480px] hidden lg:block">
                {items.map((project, i) => {
                  const offset = i - activeIndex
                  const isActive = i === activeIndex
                  const isPast = i < activeIndex

                  return (
                    <div
                      key={project.id}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 20,
                        overflow: 'hidden',
                        opacity: isActive ? 1 : Math.abs(offset) === 1 ? 0.3 : 0,
                        transform: isActive
                          ? 'translateY(0) scale(1)'
                          : isPast
                          ? `translateY(-${Math.abs(offset) * 40}px) scale(${1 - Math.abs(offset) * 0.04})`
                          : `translateY(${Math.abs(offset) * 40}px) scale(${1 - Math.abs(offset) * 0.04})`,
                        zIndex: items.length - Math.abs(offset),
                        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: isActive
                          ? `0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px ${project.color ?? '#2dd4bf'}22`
                          : '0 8px 32px rgba(0,0,0,0.3)',
                      }}
                    >
                      {/* Media */}
                      {project.video ? (
                        <video
                          src={project.video}
                          autoPlay muted loop playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          style={{
                            transform: isActive ? 'scale(1.02)' : 'scale(1)',
                            transition: 'transform 0.6s ease',
                          }}
                        />
                      )}

                      {/* Gradient overlay */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to top, ${project.color ?? '#2dd4bf'}44 0%, transparent 50%)`,
                          opacity: isActive ? 1 : 0.4,
                          transition: 'opacity 0.4s ease',
                        }}
                      />

                      {/* Active card label */}
                      {isActive && (
                        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                          <div>
                            <p className="text-xs font-mono text-white/50 tracking-widest uppercase mb-1">
                              {project.tag}
                            </p>
                            <p className="font-display text-white text-lg leading-tight">
                              {project.title}
                            </p>
                          </div>
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center"
                            style={{
                              background: `${project.color ?? '#2dd4bf'}22`,
                              border: `1px solid ${project.color ?? '#2dd4bf'}60`,
                            }}
                          >
                            <ExternalLink size={13} style={{ color: project.color ?? '#2dd4bf' }} />
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}