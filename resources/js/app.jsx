import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import { IntroProvider, useIntro } from './context/IntroContext'
import IntroScreen from './components/layout/IntroScreen'
import '../css/app.css'

function AppWrapper({ App, props }) {
  const { entered, enterPortfolio } = useIntro()

  return (
    <>
      {!entered && <IntroScreen onEnter={enterPortfolio} />}
      <div style={{
        opacity:       entered ? 1 : 0,
        transition:    'opacity 0.8s ease',
        pointerEvents: entered ? 'auto' : 'none',
      }}>
        <App {...props} />
      </div>
    </>
  )
}

createInertiaApp({
  title: title => title ? `${title} | Emanuel Sernal` : 'Emanuel Sernal — Portfolio',
  resolve: name => {
    const pages = import.meta.glob('./pages/**/*.jsx', { eager: true })
    return pages[`./pages/${name}.jsx`]
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <IntroProvider>
        <AppWrapper App={App} props={props} />
      </IntroProvider>
    )
  },
})