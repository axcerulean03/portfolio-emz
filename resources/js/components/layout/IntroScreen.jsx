import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const SEA_SHAPES = [
  '62% 38% 46% 54% / 60% 44% 56% 40%',
  '45% 55% 58% 42% / 48% 62% 38% 52%',
  '55% 45% 38% 62% / 52% 36% 64% 48%',
  '38% 62% 52% 48% / 65% 50% 50% 35%',
  '60% 40% 44% 56% / 42% 58% 42% 58%',
  '48% 52% 62% 38% / 54% 40% 60% 46%',
  '52% 48% 40% 60% / 38% 55% 45% 62%',
  '42% 58% 55% 45% / 56% 42% 58% 44%',
  '65% 35% 48% 52% / 44% 60% 40% 56%',
  '40% 60% 58% 42% / 60% 38% 62% 40%',
  '56% 44% 42% 58% / 46% 64% 36% 54%',
  '50% 50% 50% 50% / 50% 50% 50% 50%',
]

function RippleCanvas({ playing, originX, originY, onCovered }) {
  const canvasRef  = useRef(null)
  const rafRef     = useRef(null)
  const startRef   = useRef(null)
  const coveredRef = useRef(false)
  // Keep onCovered in a ref so the rAF closure always has the latest version
  const onCoveredRef = useRef(onCovered)
  useEffect(() => { onCoveredRef.current = onCovered }, [onCovered])

  useEffect(() => {
    if (!playing) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight
    coveredRef.current = false

    const cx   = originX ?? canvas.width  / 2
    const cy   = originY ?? canvas.height / 2
    const maxR = Math.sqrt(cx ** 2 + cy ** 2) +
                 Math.sqrt((canvas.width - cx) ** 2 + (canvas.height - cy) ** 2)

    const RIPPLES  = 4
    const DURATION = 2800
    const COVER_AT = 0.76

    startRef.current = performance.now()

    const draw = (now) => {
      const elapsed = now - startRef.current
      const t = Math.min(elapsed / DURATION, 1)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < RIPPLES; i++) {
        const delay   = (i / RIPPLES) * 0.65
        const rt      = Math.max(0, (t - delay) / (1 - delay))
        const eased   = 1 - Math.pow(1 - rt, 2.2)
        const r       = eased * maxR * 1.1
        const opacity = Math.max(0, Math.pow(1 - rt, 1.2) * (i === 0 ? 0.55 : 0.30))
        if (r <= 0) continue

        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(45,212,191,${opacity})`
        ctx.lineWidth   = i === 0 ? 3.0 : 2.0
        ctx.stroke()

        if (i < RIPPLES - 1) {
          ctx.beginPath()
          ctx.arc(cx, cy, eased * maxR * 0.88 * 0.92, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(244,114,182,${opacity * 0.85})`
          ctx.lineWidth   = 1
          ctx.stroke()
        }
      }

      const fillT = Math.max(0, (t - COVER_AT) / (1 - COVER_AT))
      if (fillT > 0) {
        const fillEased = 1 - Math.pow(1 - fillT, 3.5)
        const fillR     = fillEased * maxR * 1.15

        ctx.beginPath()
        ctx.arc(cx, cy, fillR, 0, Math.PI * 2)
        ctx.fillStyle = '#0d0f12'
        ctx.fill()

        const grad = ctx.createRadialGradient(cx, cy, fillR * 0.92, cx, cy, fillR)
        grad.addColorStop(0,   'rgba(45,212,191,0)')
        grad.addColorStop(0.6, `rgba(45,212,191,${fillT * 0.15})`)
        grad.addColorStop(1,   'rgba(45,212,191,0)')
        ctx.beginPath()
        ctx.arc(cx, cy, fillR, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Use ref so closure always calls the latest onCovered
        if (!coveredRef.current && fillT > 0.92) {
          coveredRef.current = true
          onCoveredRef.current?.()
        }
      }

      if (t < 1) rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [playing])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'fixed',
        inset:         0,
        zIndex:        99999,
        pointerEvents: 'none',
        opacity:       playing ? 1 : 0,
      }}
    />
  )
}

function SeaBlob({ blobRef }) {
  const outerRef     = useRef(null)
  const midRef       = useRef(null)
  const innerRef     = useRef(null)
  const glowRef      = useRef(null)
  const _internalRef = useRef(null)
  const wrapRef      = blobRef ?? _internalRef

  useEffect(() => {
    const outer = outerRef.current
    const mid   = midRef.current
    const inner = innerRef.current
    const glow  = glowRef.current
    const wrap  = wrapRef.current
    if (!outer || !mid || !inner || !glow || !wrap) return

    gsap.to(wrap, { scale: 1.08, duration: 4.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })

    const morphOuter = () => gsap.to(outer, {
      borderRadius: SEA_SHAPES[Math.floor(Math.random() * SEA_SHAPES.length)],
      duration: 3.5 + Math.random() * 2, ease: 'sine.inOut', onComplete: morphOuter,
    })
    morphOuter()

    const morphMid = () => gsap.to(mid, {
      borderRadius: SEA_SHAPES[Math.floor(Math.random() * SEA_SHAPES.length)],
      duration: 2.8 + Math.random() * 1.5, ease: 'sine.inOut', onComplete: morphMid,
    })
    gsap.delayedCall(1.2, morphMid)

    const morphInner = () => gsap.to(inner, {
      borderRadius: SEA_SHAPES[Math.floor(Math.random() * SEA_SHAPES.length)],
      duration: 2.0 + Math.random() * 1.2, ease: 'power1.inOut', onComplete: morphInner,
    })
    gsap.delayedCall(0.6, morphInner)

    gsap.to(outer, { rotation: 360,  duration: 28, ease: 'none', repeat: -1 })
    gsap.to(mid,   { rotation: -360, duration: 18, ease: 'none', repeat: -1 })
    gsap.to(inner, { rotation: 360,  duration: 12, ease: 'none', repeat: -1 })
    gsap.to(glow,  { opacity: 0.6, scale: 1.15, duration: 3.8, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    gsap.to(wrap,  { y: -12, duration: 5.5, ease: 'sine.inOut', yoyo: true, repeat: -1 })

    const handleMouseMove = (e) => {
      const rect = wrap.getBoundingClientRect()
      const dx = (e.clientX - (rect.left + rect.width  / 2)) / window.innerWidth
      gsap.to(wrap, { x: dx * 18, duration: 2.5, ease: 'power1.out', overwrite: 'auto' })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      gsap.killTweensOf([outer, mid, inner, glow, wrap])
    }
  }, [])

  return (
    <div ref={wrapRef} style={{ position: 'relative', width: 120, height: 120 }}>
      <div ref={glowRef} style={{
        position: 'absolute', inset: -30, borderRadius: '50%', opacity: 0.3,
        background: 'radial-gradient(circle, rgba(45,212,191,0.12) 0%, rgba(244,114,182,0.06) 50%, transparent 70%)',
        filter: 'blur(8px)', pointerEvents: 'none',
      }} />
      <div ref={outerRef} style={{
        position: 'absolute', inset: -14,
        borderRadius: '62% 38% 46% 54% / 60% 44% 56% 40%',
        background: 'transparent',
        border: '1.5px solid rgba(45,212,191,0.22)',
        boxShadow: '0 0 20px rgba(45,212,191,0.08)',
      }} />
      <div ref={midRef} style={{
        position: 'absolute', inset: -4,
        borderRadius: '45% 55% 58% 42% / 48% 62% 38% 52%',
        background: 'rgba(244,114,182,0.04)',
        border: '1px solid rgba(244,114,182,0.28)',
        boxShadow: '0 0 12px rgba(244,114,182,0.06)',
      }} />
      <div ref={innerRef} style={{
        position: 'absolute', inset: 18,
        borderRadius: '55% 45% 40% 60% / 40% 60% 45% 55%',
        background: 'linear-gradient(135deg, rgba(244,114,182,0.18) 0%, rgba(45,212,191,0.12) 100%)',
        border: '1px solid rgba(244,114,182,0.45)',
        boxShadow: 'inset 0 0 16px rgba(45,212,191,0.08), 0 0 24px rgba(244,114,182,0.1)',
      }} />
    </div>
  )
}

export default function IntroScreen({ onEnter }) {
  const [phase,     setPhase]     = useState('idle')
  const [ripplePos, setRipplePos] = useState({ x: null, y: null })
  const contentRef  = useRef(null)
  const buttonRef   = useRef(null)
  const blobWrapRef = useRef(null)
  // Keep onEnter in a ref so it's always current inside async callbacks
  const onEnterRef  = useRef(onEnter)
  useEffect(() => { onEnterRef.current = onEnter }, [onEnter])

  const handleEnter = () => {
    if (phase !== 'idle') return

    const btn  = buttonRef.current
    const rect = btn?.getBoundingClientRect()
    const cx   = rect ? rect.left + rect.width  / 2 : window.innerWidth  / 2
    const cy   = rect ? rect.top  + rect.height / 2 : window.innerHeight / 2

    setRipplePos({ x: cx, y: cy })
    setPhase('rippling')

    gsap.to(contentRef.current, { opacity: 0, duration: 0.8, ease: 'power2.in' })

    if (blobWrapRef.current) {
      gsap.timeline()
        .to(blobWrapRef.current, { scale: 0.92, duration: 0.4, ease: 'sine.inOut' })
        .to(blobWrapRef.current, { scale: 1.06, duration: 0.5, ease: 'sine.inOut' })
        .to(blobWrapRef.current, { scale: 0,    duration: 0.55, ease: 'sine.in'   })
    }
  }

  return (
    <>
      <RippleCanvas
        playing={phase === 'rippling'}
        originX={ripplePos.x}
        originY={ripplePos.y}
        onCovered={() => onEnterRef.current?.()}
      />

      <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">
        <video
          src="/videos/ocean.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(13,15,18,0.55), rgba(13,15,18,0.75))',
          zIndex: 1,
        }} />

        <div
          ref={contentRef}
          className="relative flex flex-col items-center gap-12 select-none"
          style={{ zIndex: 10 }}
        >
          <div className="flex flex-col items-center gap-3">
            <h1 style={{
              fontFamily: 'Satoshi, sans-serif', fontSize: 'clamp(2rem, 6vw, 4rem)',
              fontWeight: 500, letterSpacing: '0.3em', color: '#ffffff',
              opacity: 0.9, textTransform: 'lowercase',
            }}>
              axcerulean
            </h1>
            <div style={{ width: 40, height: 1, background: 'rgba(45,212,191,0.4)' }} />
          </div>

          <button
            ref={buttonRef}
            onClick={handleEnter}
            aria-label="Enter portfolio"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 60 }}
          >
            <SeaBlob blobRef={blobWrapRef} />
          </button>
        </div>
      </div>
    </>
  )
}