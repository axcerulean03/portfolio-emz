import { Head } from '@inertiajs/react'
import Navbar from "./Navbar";
import Footer from "./Footer";

/**
 * MainLayout — wraps every page with the persistent Navbar + Footer.
 *
 * Usage in any page:
 *   MyPage.layout = page => <MainLayout title="Page Title">{page}</MainLayout>
 */
export default function MainLayout({ children, title, description }) {
  return (
    <>
      <Head>
        {title       && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
      </Head>

      {/* Noise overlay for depth/texture */}
      <div className="noise-overlay" aria-hidden="true" />

      <Navbar />

      <main>{children}</main>

      <Footer />
    </>
  )
}
