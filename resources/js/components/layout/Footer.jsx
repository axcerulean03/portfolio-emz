import { Github, Linkedin, Instagram, Dribbble } from 'lucide-react'
import { OWNER } from '../../data/portfolio'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-24 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <span className="font-display text-lg">
          <span className="text-white/60">Eman</span>
          <span className="text-accent-teal font-bold"> Sernal</span>
        </span>

        {/* Copy */}
        <p className="text-white/30 text-xs font-mono tracking-wider">
          © {new Date().getFullYear()} — All rights reserved
        </p>

        {/* Socials */}
        <div className="flex items-center gap-5">
          <SocialLink href={OWNER.socials.linkedin}  Icon={Linkedin}  />
          <SocialLink href={OWNER.socials.dribbble}  Icon={Dribbble}  />
          <SocialLink href={OWNER.socials.instagram} Icon={Instagram} />
          <SocialLink href={OWNER.socials.behance}   Icon={Github}    label="Behance" />
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-white/30 hover:text-accent-teal transition-colors duration-200"
    >
      <Icon size={16} />
    </a>
  )
}
