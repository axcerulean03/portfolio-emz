// ─── Central data file ────────────────────────────────────────────────────────
// Edit this file to update all portfolio content in one place.

export const OWNER = {
  name: 'Emanuel Sernal',
  firstName: 'Eman',
  title: 'Junior Developer & Fresh Graduate',
  subtitle: "I build things that work — from web apps and mobile solutions to games and IoT systems. I'm driven by the challenge of turning complex problems into clean, efficient solutions.",
  location: 'Naga City, Philippines',
  bio: 'A fresh graduate with a hunger for building real-world solutions. Experienced across web, mobile, game dev, and IoT — always looking for the next problem worth solving.',
  email: 'axcerulean@icloud.com',
  socials: {
    behance:  'https://behance.net',
    linkedin: 'https://linkedin.com',
    instagram:'https://instagram.com',
    github:   'https://github.com',
  },
}

export const NAV_LINKS = [
  { label: 'Projects',  href: '#projects' },
  { label: 'About me',  href: '#about'    },
  { label: 'Resume',    href: '#resume'   },
  { label: 'Contact',   href: '#contact'  },
]

export const PROJECTS = [
  {
    id: 1,
    tag: 'Web + IoT',
    title: 'Aqualume — Smart Resort Management System',
    description: 'A full-stack customer booking and staff management web system for Amesola Spring Valley Resort, integrated with an IoT smart lighting solution powered by ESP32.',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
    video: null, // replace with '/videos/aqualume.mp4' if you have one
    year: '2024',
    color: '#2dd4bf',
    tech: ['Laravel', 'React', 'ESP32', 'MySQL', 'IoT'],
    link: '#',
  },
  {
    id: 2,
    tag: 'Game Development',
    title: 'Tofu Drifters — Arcade Racing Game',
    description: 'A snappy arcade drifting game about a tofu delivery driver. Rally-style controls, score chasing, and time trials make every run feel fresh.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
    video: null,
    year: '2024',
    color: '#f5c842',
    tech: ['Unity', 'C#', 'Game Design', 'Physics'],
    link: '#',
  },
  {
    id: 3,
    tag: 'Mobile Development',
    title: 'Flutter Android App',
    description: 'Cross-platform Android application built with Flutter, focusing on clean UI and smooth performance across devices.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    video: null,
    year: '2024',
    color: '#f472b6',
    tech: ['Flutter', 'Dart', 'Android', 'Firebase'],
    link: '#',
  },
  {
    id: 4,
    tag: 'SAP Fiori',
    title: 'SAP HANA & Fiori Dashboard',
    description: 'Enterprise-level UI development using SAP Fiori, connected to SAP HANA for data visualization and business process management.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    video: null,
    year: '2024',
    color: '#a78bfa',
    tech: ['SAP Fiori', 'SAP HANA', 'SAPUI5', 'OData'],
    link: '#',
  },
]

export const SKILLS = [
  {
    category: 'Web Development',
    items: ['HTML/CSS', 'JavaScript', 'React', 'Laravel', 'PHP', 'SAP Fiori'],
  },
  {
    category: 'Mobile & Game Dev',
    items: ['Flutter', 'Android', 'Unity', 'Unreal Engine', 'C#', 'Dart'],
  },
  {
    category: 'IoT & Systems',
    items: ['ESP32', 'IoT Design', 'SAP HANA', 'Circuit Design', 'C++'],
  },
  {
    category: 'Tools & Workflow',
    items: ['Git', 'GitHub', 'Figma', 'VS Code', 'Android Studio'],
  },
]

export const EXPERIENCE = [
  {
    company: 'DepED SDO — Naga City',
    role: 'On-the-Job Trainee',
    period: '2023 — 2024',
    description: 'Completed 486 hours of OJT at the Department of Education Schools Division Office of Naga City, gaining hands-on experience in a professional government environment.',
  },
  {
    company: 'PhilHealth',
    role: 'SPES Student Worker',
    period: '2023',
    description: 'Served under the Special Program for Employment of Students (SPES), supporting daily operations and administrative tasks at PhilHealth.',
  },
]

export const PASSIONS = [
  { emoji: '🎮', label: 'Gaming'     },
  { emoji: '🎬', label: 'Movies'     },
  { emoji: '📚', label: 'Reading'    },
  { emoji: '💻', label: 'Full Stack' },
  { emoji: '📱', label: 'Mobile Dev' },
  { emoji: '🕹️', label: 'Game Dev'  },
]