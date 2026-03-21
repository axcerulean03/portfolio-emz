import { useRef, useState } from 'react'
import { ArrowUpRight, Github, ExternalLink, Play, X, ChevronLeft, ChevronRight, Film, Image } from 'lucide-react'
import { PROJECTS as STATIC_PROJECTS } from '../../data/portfolio'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Lightbox ── */
function Lightbox({ project, startIndex = 0, onClose }) {
  const allMedia = [
    ...(project.video  ? [{ type: 'video', src: project.video, label: 'Demo Video' }] : []),
    ...(project.images ? project.images.map((src, i) => ({ type: 'image', src, label: `Screenshot ${i + 1}` })) : []),
    ...(project.image && !project.images ? [{ type: 'image', src: project.image, label: 'Screenshot' }] : []),
  ]
  const [idx, setIdx] = useState(startIndex)
  const current = allMedia[idx]
  const prev = () => setIdx(i => (i - 1 + allMedia.length) % allMedia.length)
  const next = () => setIdx(i => (i + 1) % allMedia.length)

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(16px)' }}
      onClick={onClose}
    >
      <div className="relative w-full max-w-5xl mx-4" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-12 right-0 text-white/40 hover:text-white transition-colors flex items-center gap-2 text-xs font-mono tracking-widest uppercase">
          <X size={14} /> Close
        </button>
        <div className="rounded-2xl overflow-hidden bg-dark-800" style={{ aspectRatio: '16/9' }}>
          {current?.type === 'video'
            ? <video src={current.src} controls autoPlay className="w-full h-full object-contain" />
            : <img src={current?.src} alt="" className="w-full h-full object-contain" />
          }
        </div>
        {allMedia.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-5">
            <button onClick={prev} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <ChevronLeft size={16} className="text-white" />
            </button>
            <div className="flex gap-2">
              {allMedia.map((m, i) => (
                <button key={i} onClick={() => setIdx(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{ background: i === idx ? (project.color ?? '#2dd4bf') : 'rgba(255,255,255,0.2)', width: i === idx ? 16 : 8 }}
                />
              ))}
            </div>
            <button onClick={next} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <ChevronRight size={16} className="text-white" />
            </button>
          </div>
        )}
        <p className="mt-3 text-center text-white/30 text-xs font-mono tracking-widest uppercase">{current?.label}</p>
      </div>
    </div>
  )
}

/* ── Media preview with tab switcher ── */
function MediaPreview({ project }) {
  const hasVideo      = !!project.video
  const screenshots   = project.images ?? (project.image ? [project.image] : [])
  const hasScreenshots = screenshots.length > 0

  // Default to video if available, else screenshots
  const [activeTab,   setActiveTab]   = useState(hasVideo ? 'video' : 'screenshots')
  const [shotIndex,   setShotIndex]   = useState(0)
  const [lightbox,    setLightbox]    = useState(false)
  const [lightboxIdx, setLightboxIdx] = useState(0)

  const accentColor = project.color ?? '#2dd4bf'

  const openLightbox = (idx) => {
    setLightboxIdx(idx)
    setLightbox(true)
  }

  return (
    <>
      {lightbox && (
        <Lightbox
          project={project}
          startIndex={lightboxIdx}
          onClose={() => setLightbox(false)}
        />
      )}

      <div className="flex flex-col gap-3">
        {/* Tab switcher — only show if both exist */}
        {hasVideo && hasScreenshots && (
          <div className="flex items-center gap-1 p-1 rounded-full self-start"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <button
              onClick={() => setActiveTab('video')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all duration-200"
              style={{
                background: activeTab === 'video' ? `${accentColor}20` : 'transparent',
                color:      activeTab === 'video' ? accentColor : 'rgba(255,255,255,0.35)',
                border:     activeTab === 'video' ? `1px solid ${accentColor}50` : '1px solid transparent',
              }}
            >
              <Film size={10} /> Video
            </button>
            <button
              onClick={() => setActiveTab('screenshots')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-mono tracking-widest uppercase transition-all duration-200"
              style={{
                background: activeTab === 'screenshots' ? `${accentColor}20` : 'transparent',
                color:      activeTab === 'screenshots' ? accentColor : 'rgba(255,255,255,0.35)',
                border:     activeTab === 'screenshots' ? `1px solid ${accentColor}50` : '1px solid transparent',
              }}
            >
              <Image size={10} /> Screenshots
            </button>
          </div>
        )}

        {/* Media frame */}
        <div
          className="relative rounded-2xl overflow-hidden cursor-pointer group"
          style={{
            aspectRatio: '16/10',
            boxShadow:   `0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px ${accentColor}20`,
          }}
        >
          {/* Video tab */}
          {activeTab === 'video' && hasVideo && (
            <>
              <video
                src={project.video}
                autoPlay muted loop playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Expand to lightbox */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => openLightbox(0)}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: `1px solid ${accentColor}60` }}>
                  <Play size={18} fill={accentColor} color={accentColor} />
                </div>
              </div>
            </>
          )}

          {/* Screenshots tab */}
          {activeTab === 'screenshots' && hasScreenshots && (
            <>
              <img
                src={screenshots[shotIndex]}
                alt={`Screenshot ${shotIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-500"
              />
              {/* Expand */}
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={() => openLightbox(hasVideo ? shotIndex + 1 : shotIndex)}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', border: `1px solid ${accentColor}60` }}>
                  <ExternalLink size={16} color={accentColor} />
                </div>
              </div>

              {/* Screenshot nav dots */}
              {screenshots.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {screenshots.map((_, i) => (
                    <button
                      key={i}
                      onClick={e => { e.stopPropagation(); setShotIndex(i) }}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width:      i === shotIndex ? 20 : 6,
                        height:     6,
                        background: i === shotIndex ? accentColor : 'rgba(255,255,255,0.3)',
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: `linear-gradient(to top, ${accentColor}25 0%, transparent 50%)` }}
          />

          {/* Bottom label */}
          <div className="absolute top-3 right-3 pointer-events-none">
            <span
              className="text-[9px] font-mono tracking-widest uppercase px-2 py-1 rounded-full"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.4)' }}
            >
              {activeTab === 'video' ? 'Demo' : `${shotIndex + 1} / ${screenshots.length}`}
            </span>
          </div>
        </div>

        {/* Screenshot strip — thumbnails when on screenshots tab */}
        {activeTab === 'screenshots' && screenshots.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {screenshots.map((src, i) => (
              <button
                key={i}
                onClick={() => setShotIndex(i)}
                className="flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200"
                style={{
                  width:  64, height: 40,
                  border: `2px solid ${i === shotIndex ? accentColor : 'transparent'}`,
                  opacity: i === shotIndex ? 1 : 0.45,
                }}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

/* ── Single full-screen project card ── */
function ProjectCard({ project, index, total }) {
  const cardRef    = useRef(null)
  const contentRef = useRef(null)
  const accentColor = project.color ?? '#2dd4bf'

  useGSAP(() => {
    ScrollTrigger.create({
      trigger:    cardRef.current,
      start:      'top top',
      end:        '+=100%',
      pin:        true,
      pinSpacing: index < total - 1 ? false : true,
    })
    const els = contentRef.current?.querySelectorAll('[data-reveal]')
    if (els?.length) {
      gsap.fromTo(els,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: cardRef.current, start: 'top 80%', once: true },
        }
      )
    }
  }, { scope: cardRef })

  return (
    <div
      ref={cardRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        zIndex:     index + 1,
        background: `linear-gradient(160deg, #0d0f12 0%, #13161b 60%, ${accentColor}08 100%)`,
      }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${accentColor}40, transparent)` }} />

      {/* Background number */}
      <span className="absolute right-6 top-1/2 -translate-y-1/2 font-display font-bold select-none pointer-events-none"
        style={{ fontSize: 'clamp(8rem, 18vw, 16rem)', color: `${accentColor}05`, lineHeight: 1 }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Progress */}
      <div className="absolute top-8 right-8 flex items-center gap-3 z-10">
        <span className="text-[10px] font-mono text-white/20 tracking-widest">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className="h-0.5 rounded-full transition-all duration-500"
              style={{ width: i === index ? 20 : 6, background: i === index ? accentColor : 'rgba(255,255,255,0.15)' }} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
      >
        {/* Left: info */}
        <div className="flex flex-col gap-5 order-2 lg:order-1">
          <div className="flex items-center gap-3" data-reveal>
            <span className="tag text-[10px] tracking-widest"
              style={{ backgroundColor: `${accentColor}15`, color: accentColor }}>
              {project.tag}
            </span>
            <span className="text-xs font-mono text-white/25">{project.year}</span>
          </div>

          <h3 className="font-display leading-[1.1] text-white"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }} data-reveal>
            {project.title}
          </h3>

          <div className="w-10 h-px" data-reveal
            style={{ background: `linear-gradient(to right, ${accentColor}80, transparent)` }} />

          <p className="text-white/50 leading-relaxed text-sm max-w-md" data-reveal>
            {project.description}
          </p>

          {project.tech && (
            <div className="flex flex-wrap gap-2" data-reveal>
              {project.tech.map(t => (
                <span key={t} className="text-[10px] font-mono px-2.5 py-1 rounded-full tracking-widest uppercase"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }}>
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center gap-4 mt-1" data-reveal>
            {project.link && project.link !== '#' && (
              <a href={project.link} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase px-4 py-2.5 rounded-full transition-all duration-200"
                style={{ background: `${accentColor}15`, border: `1px solid ${accentColor}40`, color: accentColor }}
                onMouseEnter={e => { e.currentTarget.style.background = `${accentColor}25`; e.currentTarget.style.borderColor = accentColor }}
                onMouseLeave={e => { e.currentTarget.style.background = `${accentColor}15`; e.currentTarget.style.borderColor = `${accentColor}40` }}
              >
                <ExternalLink size={11} /> Live site
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-white/35 hover:text-white transition-colors">
                <Github size={12} /> Source
              </a>
            )}
          </div>
        </div>

        {/* Right: media with tabs */}
        <div className="order-1 lg:order-2" data-reveal>
          <MediaPreview project={project} />
        </div>
      </div>
    </div>
  )
}

/* ── Section ── */
export default function ProjectsSection({ projects }) {
  const items = projects?.length ? projects : STATIC_PROJECTS
  const { ref: titleRef } = useScrollReveal()

  return (
    <section id="projects">
      <div className="px-6 pt-16 pb-10 max-w-7xl mx-auto">
        <div ref={titleRef} style={{ opacity: 0 }}>
          <p className="section-label">Selected work</p>
          <h2 className="font-display text-4xl md:text-5xl text-white">Projects I'm proud of</h2>
        </div>
      </div>

      {items.map((project, i) => (
        <ProjectCard key={project.id} project={project} index={i} total={items.length} />
      ))}
    </section>
  )
}