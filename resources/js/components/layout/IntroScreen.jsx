import { useState } from 'react'

export default function IntroScreen({ onEnter }) {
  const [phase, setPhase] = useState('idle') // idle | exploding | done

  const handleEnter = () => {
    if (phase !== 'idle') return
    setPhase('exploding')
    setTimeout(() => onEnter(), 1200)
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden">

      {/* Ocean video background */}
      <video
        src="/videos/ocean.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(13,15,18,0.55), rgba(13,15,18,0.75))',
          zIndex: 1,
        }}
      />

{/* ── Blob explosion — expands from center to cover full screen ── */}
{phase === 'exploding' && (
  <>
    {/* Outer exploding blob — pink, first to burst */}
    <span style={{
      position: 'absolute',
      zIndex: 20,
      width: 80, height: 80,
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
      background: 'rgba(244,114,182,0.25)',
      border: '1.5px solid rgba(244,114,182,0.6)',
      animation: 'blob-explode-outer 1.1s cubic-bezier(0.2, 0, 0.2, 1) forwards',
    }} />

    {/* Middle blob — teal, slightly behind */}
    <span style={{
      position: 'absolute',
      zIndex: 21,
      width: 76, height: 76,
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '45% 55% 40% 60% / 60% 40% 55% 45%',
      background: 'rgba(45,212,191,0.2)',
      border: '1px solid rgba(45,212,191,0.5)',
      animation: 'blob-explode-mid 1.1s cubic-bezier(0.2, 0, 0.2, 1) forwards',
      animationDelay: '0.06s',
    }} />

    {/* Inner blob — dark fill, covers everything last */}
    <span style={{
      position: 'absolute',
      zIndex: 22,
      width: 48, height: 48,
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '55% 45% 60% 40% / 40% 60% 45% 55%',
      background: '#0d0f12',
      animation: 'blob-explode-inner 1.1s cubic-bezier(0.2, 0, 0.2, 1) forwards',
      animationDelay: '0.12s',
    }} />
  </>
)}
      {/* ── Center content ── */}
      <div
        className="relative flex flex-col items-center gap-10 select-none"
        style={{
          zIndex: 10,
          opacity: phase === 'exploding' ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      >
        {/* Name */}
        <div className="flex flex-col items-center gap-3">
          <h1 style={{
            fontFamily: '"DM Mono", monospace',
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: 500,
            letterSpacing: '0.3em',
            color: '#ffffff',
            opacity: 0.9,
            textTransform: 'lowercase',
          }}>
            axcerulean
          </h1>
          <div style={{ width: 40, height: 1, background: 'rgba(45,212,191,0.4)' }} />
        </div>

        {/* Blob button */}
        <button
          onClick={handleEnter}
          aria-label="Enter portfolio"
          style={{
            position: 'relative',
            width: 80, height: 80,
            borderRadius: '50%',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 70,
          }}
        >
          {/* Outer rotating blob */}
          <span style={{
            position: 'absolute',
            inset: -6,
            borderRadius: '60% 40% 55% 45% / 45% 55% 40% 60%',
            background: 'rgba(244,114,182,0.08)',
            border: '1.5px solid rgba(244,114,182,0.35)',
            animation: 'blob-spin 6s ease-in-out infinite',
          }} />

          {/* Middle morphing blob */}
          <span style={{
            position: 'absolute',
            inset: 2,
            borderRadius: '45% 55% 40% 60% / 60% 40% 55% 45%',
            background: 'rgba(45,212,191,0.06)',
            border: '1px solid rgba(45,212,191,0.25)',
            animation: 'blob-spin 4s ease-in-out infinite reverse',
          }} />

          {/* Inner solid blob */}
          <span
            style={{
              position: 'relative',
              width: 48, height: 48,
              borderRadius: '55% 45% 60% 40% / 40% 60% 45% 55%',
              background: 'linear-gradient(135deg, rgba(244,114,182,0.15), rgba(45,212,191,0.1))',
              border: '1px solid rgba(244,114,182,0.5)',
              animation: 'blob-morph 3s ease-in-out infinite',
              transition: 'background 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(244,114,182,0.3), rgba(45,212,191,0.2))'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(244,114,182,0.15), rgba(45,212,191,0.1))'
            }}
          />
        </button>

        <p style={{
          fontFamily: '"DM Mono", monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.2)',
          marginTop: -4,
        }}>
      
        </p>
      </div>

      <style>{`
        /* ── Idle blob animations ── */
        @keyframes blob-spin {
          0%   { transform: rotate(0deg)   scale(1);    border-radius: 60% 40% 55% 45% / 45% 55% 40% 60%; }
          33%  { transform: rotate(120deg) scale(1.08); border-radius: 40% 60% 45% 55% / 55% 45% 60% 40%; }
          66%  { transform: rotate(240deg) scale(0.95); border-radius: 55% 45% 60% 40% / 40% 60% 45% 55%; }
          100% { transform: rotate(360deg) scale(1);    border-radius: 60% 40% 55% 45% / 45% 55% 40% 60%; }
        }

        @keyframes blob-morph {
          0%   { border-radius: 55% 45% 60% 40% / 40% 60% 45% 55%; transform: scale(1);    }
          25%  { border-radius: 40% 60% 45% 55% / 55% 45% 60% 40%; transform: scale(1.06); }
          50%  { border-radius: 60% 40% 55% 45% / 45% 55% 40% 60%; transform: scale(0.96); }
          75%  { border-radius: 45% 55% 40% 60% / 60% 40% 55% 45%; transform: scale(1.04); }
          100% { border-radius: 55% 45% 60% 40% / 40% 60% 45% 55%; transform: scale(1);    }
        }

        /* ── Explosion animations ── */

        /* Pink outer blob — bursts outward first */
        @keyframes blob-explode-outer {
          0%   { transform: translate(-50%, -50%) scale(1);  opacity: 1; }
          40%  { transform: translate(-50%, -50%) scale(8);  opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(40); opacity: 0; }
        }

        /* Teal mid blob — chases the pink */
        @keyframes blob-explode-mid {
          0%   { transform: translate(-50%, -50%) scale(1);  opacity: 1; }
          40%  { transform: translate(-50%, -50%) scale(10); opacity: 0.5; }
          100% { transform: translate(-50%, -50%) scale(45); opacity: 0; }
        }

        /* Dark inner blob — covers entire screen and stays */
        @keyframes blob-explode-inner {
          0%   { transform: translate(-50%, -50%) scale(1);  }
          60%  { transform: translate(-50%, -50%) scale(20); }
          100% { transform: translate(-50%, -50%) scale(50); }
        }
      `}</style>
    </div>
  )
}
