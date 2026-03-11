import { MapPin } from 'lucide-react'
import { OWNER, SKILLS, PASSIONS } from '../../data/portfolio'
import { useScrollReveal } from '../../hooks/useScrollReveal'

export default function AboutSection() {
  const { ref: textRef, isVisible: textVisible } = useScrollReveal()
  const { ref: imgRef,  isVisible: imgVisible  } = useScrollReveal()

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* ── Left: photo + quick info ── */}
        <div
          ref={imgRef}
          className={`transition-all duration-700 ${imgVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
        >
          <div className="relative">
            {/* Portrait */}
            <div className="rounded-3xl overflow-hidden aspect-[3/4] max-w-sm">
              <img
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80"
                alt={OWNER.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating badge */}
            <div className="card-glass absolute -right-6 top-1/2 transform -translate-y-1/2 p-5 w-52 shadow-2xl">
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={12} className="text-accent-teal" />
                <span className="text-xs font-mono text-white/50">{OWNER.location}</span>
              </div>
              <p className="font-display text-lg text-white">{OWNER.name}</p>
              <p className="text-xs font-mono text-accent-teal/70 tracking-wider mt-0.5">
                JR. DEVELOPER
              </p>
              <p className="text-xs text-white/40 mt-3 leading-relaxed">{OWNER.bio}</p>
            </div>

            {/* Passions chips */}
            <div className="flex flex-wrap gap-2 mt-8">
              {PASSIONS.map(p => (
                <span key={p.label} className="tag bg-dark-600 text-white/50">
                  {p.emoji} {p.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right: bio + skills ── */}
        <div
          ref={textRef}
          className={`transition-all duration-700 delay-200 ${textVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
        >
          <p className="section-label">About me</p>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-6">
            Building things that<br />
            <em className="text-accent-teal not-italic">actually work</em>
          </h2>
          <p className="text-white/60 leading-relaxed mb-4">
            I'm Eman, a fresh graduate from Naga City, Philippines with a broad set of hands-on
            skills — from building web systems and Android apps to crafting games and wiring up
            IoT devices. I like solving problems that sit at the intersection of software and the real world.
          </p>
          <p className="text-white/60 leading-relaxed mb-10">
            When I'm not coding, you'll find me gaming, watching movies, or diving into a good book.
            I bring that same curiosity and attention to detail into everything I build. 🎮
          </p>

          {/* Skills grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SKILLS.map(skillGroup => (
              <div key={skillGroup.category}>
                <h4 className="text-xs font-mono tracking-[0.2em] text-accent-teal/70 uppercase mb-3">
                  {skillGroup.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map(skill => (
                    <span key={skill} className="tag bg-dark-700 text-white/60 border border-white/5">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <a href={`mailto:${OWNER.email}`} className="btn-teal inline-block">
              Let's build something together!
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}