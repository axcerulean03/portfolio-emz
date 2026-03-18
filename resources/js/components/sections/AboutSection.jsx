import { OWNER, SKILLS } from '../../data/portfolio'
import { useScrollReveal } from '../../hooks/useScrollReveal'

const ICON_MAP = {
  'HTML':           { slug: 'html5',            color: '#E34F26' },
  'CSS':            { slug: 'css',              color: '#1572B6' },  // css3 → css in SI v13
  'JavaScript':     { slug: 'javascript',       color: '#F7DF1E' },
  'TypeScript':     { slug: 'typescript',       color: '#3178C6' },
  'React':          { slug: 'react',            color: '#61DAFB' },
  'Vue':            { slug: 'vuedotjs',         color: '#4FC08D' },
  'Tailwind':       { slug: 'tailwindcss',      color: '#06B6D4' },
  'Laravel':        { slug: 'laravel',          color: '#FF2D20' },
  'PHP':            { slug: 'php',              color: '#777BB4' },
  'Android':        { slug: 'android',          color: '#3DDC84' },
  'Java':           { slug: 'java',             color: '#F89820' },  // openjdk slug removed
  'Kotlin':         { slug: 'kotlin',           color: '#7F52FF' },
  'Flutter':        { slug: 'flutter',          color: '#02569B' },
  'Dart':           { slug: 'dart',             color: '#0175C2' },
  'MySQL':          { slug: 'mysql',            color: '#4479A1' },
  'Firebase':       { slug: 'firebase',         color: '#FFCA28' },
  'Git':            { slug: 'git',              color: '#F05032' },
  'GitHub':         { slug: 'github',           color: '#ffffff' },
  'Figma':          { slug: 'figma',            color: '#F24E1E' },
  'VS Code':        { slug: 'vscode',           color: '#007ACC' },  // visualstudiocode → vscode
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
}

function SkillIcon({ name }) {
  const info = ICON_MAP[name]
  return (
    <div title={name} className="flex flex-col items-center gap-2 group">
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/25 group-hover:bg-white/10 transition-all duration-200">
        {info ? (
          <img
            src={`https://cdn.simpleicons.org/${info.slug}/${info.color.replace('#', '')}`}
            alt={name}
            className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity"
          />
        ) : (
          <span className="text-[10px] font-mono text-white/50">{name.slice(0, 2).toUpperCase()}</span>
        )}
      </div>
      <span className="text-[10px] font-mono text-white/30 group-hover:text-white/60 transition-colors">
        {name}
      </span>
    </div>
  )
}

function SkillCard({ category, items, className = '' }) {
  return (
    <div className={`card-glass p-5 shadow-2xl ${className}`}>
      <p className="text-[10px] font-mono tracking-[0.2em] text-accent-teal/60 uppercase mb-4">
        {category}
      </p>
      <div className="flex flex-wrap gap-4">
        {items.map(skill => (
          <SkillIcon key={skill} name={skill} />
        ))}
      </div>
    </div>
  )
}

export default function AboutSection() {
  const { ref: textRef,  isVisible: textVisible  } = useScrollReveal()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal()

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">

        {/* ── Header + bio ── */}
        <div
          ref={textRef}
          className={`max-w-2xl transition-all duration-700 ${
            textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="section-label">About me</p>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-6">
            Building things that{' '}
            <em className="text-accent-teal not-italic">actually work</em>
          </h2>
          <p className="text-white/55 leading-relaxed mb-4">
            I'm Eman, a fresh graduate from Naga City, Philippines with a broad set of hands-on
            skills — from building web systems and Android apps to crafting games and wiring up
            IoT devices. I like solving problems that sit at the intersection of software and the real world.
          </p>
          <p className="text-white/55 leading-relaxed mb-16">
            When I'm not coding, you'll find me gaming, watching movies, or diving into a good book.
            I bring that same curiosity and attention to detail into everything I build. 🎮
          </p>
        </div>

        {/* ── Floating skill cards ── */}
        <div
          ref={cardsRef}
          className={`w-full transition-all duration-700 delay-200 ${
            cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-col items-center gap-4">

            {/* Row 1 */}
            <div className="flex flex-wrap justify-center gap-4 w-full">
              {SKILLS.slice(0, 2).map((group, i) => (
                <SkillCard
                  key={group.category}
                  category={group.category}
                  items={group.items}
                  className={`flex-1 min-w-[260px] max-w-[420px] ${
                    i % 2 === 0 ? 'animate-float' : 'animate-float-slow'
                  }`}
                />
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex flex-wrap justify-center gap-4 w-full">
              {SKILLS.slice(2).map((group, i) => (
                <SkillCard
                  key={group.category}
                  category={group.category}
                  items={group.items}
                  className={`flex-1 min-w-[260px] max-w-[420px] ${
                    i % 2 === 0 ? 'animate-float-slow' : 'animate-float'
                  }`}
                />
              ))}
            </div>

          </div>
        </div>

        {/* ── CTA ── */}
        <div className={`mt-14 transition-all duration-700 delay-400 ${
          cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          <a href={`mailto:${OWNER.email}`} className="btn-teal inline-block">
            Let's build something together!
          </a>
        </div>

      </div>
    </section>
  )
}