import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * useScrollReveal — GSAP-powered scroll reveal.
 * Attach the returned ref to any element.
 * Options:
 *   y        — vertical offset to animate from (default 40)
 *   duration — animation duration in seconds (default 0.7)
 *   delay    — delay in seconds (default 0)
 *   once     — only trigger once (default true)
 */
export function useScrollReveal({
  y        = 40,
  duration = 0.7,
  delay    = 0,
  once     = true,
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.fromTo(el,
      { opacity: 0, y },
      {
        opacity:  1,
        y:        0,
        duration,
        delay,
        ease:     'power3.out',
        scrollTrigger: {
          trigger:  el,
          start:    'top 88%',
          once,
        },
      }
    )

    return () => ScrollTrigger.getAll().forEach(t => {
      if (t.vars?.trigger === el) t.kill()
    })
  }, [y, duration, delay, once])

  // Keep isVisible for backward compat — always true after mount
  return { ref, isVisible: true }
}