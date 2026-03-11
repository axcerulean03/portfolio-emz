import MainLayout       from '../components/layout/MainLayout'
import HeroSection      from '../components/sections/HeroSection'
import ProjectsSection  from '../components/sections/ProjectsSection'
import AboutSection     from '../components/sections/AboutSection'
import ResumeSection    from '../components/sections/ResumeSection'
import ContactSection   from '../components/sections/ContactSection'

/**
 * Home — the main portfolio landing page.
 *
 * Laravel controller:  return inertia('Home');
 * Route:               Route::get('/', [PortfolioController::class, 'home']);
 *
 * Props passed from the controller (e.g. $projects) can be
 * destructured here and forwarded to sections as needed.
 */
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

// Attach layout so Inertia wraps this page in Navbar + Footer
Home.layout = page => (
  <MainLayout
    title="Portfolio"
    description="UX & Multimedia Designer based in Tarragona, Spain."
  >
    {page}
  </MainLayout>
)
