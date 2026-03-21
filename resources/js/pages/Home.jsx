import MainLayout      from '../components/layout/MainLayout'
import HeroSection     from '../components/sections/HeroSection'
import ProjectsSection from '../components/sections/ProjectsSection'
import AboutSection    from '../components/sections/AboutSection'
import ResumeSection   from '../components/sections/ResumeSection'
import ContactSection  from '../components/sections/ContactSection'

export default function Home({ projects = [], flash = {} }) {
  return (
    <>
      <HeroSection />
      <ProjectsSection projects={projects} />
      <AboutSection />
      <ResumeSection />
      <ContactSection flash={flash} />
    </>
  )
}

Home.layout = page => (
  <MainLayout
    title="Portfolio"
    description="UX & Multimedia Designer based in Tarragona, Spain."
  >
    {page}
  </MainLayout>
)