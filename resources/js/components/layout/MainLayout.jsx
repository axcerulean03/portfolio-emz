import { Head } from '@inertiajs/react'
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children, title, description }) {
  return (
    <>
      <Head>
        {title       && <title>{title}</title>}
        {description && <meta name="description" content={description} />}
      </Head>
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}