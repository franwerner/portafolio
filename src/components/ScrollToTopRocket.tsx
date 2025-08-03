import clsx from 'clsx';
import { useEffect, useState } from 'react';

const RocketSVG = ({ isAnimating }: { isAnimating: boolean }) => (
  <svg
    className={`w-8 h-8 text-white transform transition-transform duration-300 ${isAnimating ? 'translate-y-2' : 'group-hover:-translate-y-2'}`}
    fill="currentColor"
    viewBox="0 0 100 100"
  >
    <rect x="40" y="25" width="20" height="40" rx="2" />
    <path d="M40 25 Q40 15 50 10 Q60 15 60 25 Z" />
    <rect x="40" y="20" width="20" height="3" fill="rgba(255,255,255,0.4)" />
    <rect x="42" y="65" width="16" height="6" rx="1" fill="rgba(255,255,255,0.6)" />
    <path d="M35 50 L40 55 L40 65 L35 68 L32 58 Z" />
    <path d="M65 50 L60 55 L60 65 L65 68 L68 58 Z" />
    <path d="M37 52 L40 54 L40 63 L37 65 L34 60 Z" fill="rgba(255,255,255,0.3)" />
    <path d="M63 52 L60 54 L60 63 L63 65 L66 60 Z" fill="rgba(255,255,255,0.3)" />
    <circle cx="50" cy="30" r="3" fill="rgba(135,206,235,0.8)" />
    <circle cx="50" cy="30" r="2" fill="rgba(255,255,255,0.4)" />
    <circle cx="39" cy="45" r="1.5" fill="rgba(255,255,255,0.5)" />
    <circle cx="61" cy="45" r="1.5" fill="rgba(255,255,255,0.5)" />
    <ellipse cx="46" cy="68" rx="2" ry="1.5" fill="rgba(255,255,255,0.4)" />
    <ellipse cx="50" cy="68" rx="2.5" ry="2" fill="rgba(255,255,255,0.5)" />
    <ellipse cx="54" cy="68" rx="2" ry="1.5" fill="rgba(255,255,255,0.4)" />
    <g className={`transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
      <path d="M47 71 L44 88 L50 82 L56 88 L53 71 Z" fill="#FF6B35" />
      <path d="M48 71 L46 85 L50 80 L54 85 L52 71 Z" fill="#FF4500" />
      <path d="M49 71 L48 82 L50 79 L52 82 L51 71 Z" fill="#FFD700" />
      <path d="M44 71 L42 82 L46 79 L48 82 L47 71 Z" fill="#FF4500" opacity="0.8" />
      <path d="M53 71 L52 82 L54 79 L58 82 L56 71 Z" fill="#FF4500" opacity="0.8" />
      <path d="M45 71 L44 80 L46 78 L47 80 L46 71 Z" fill="#FFD700" opacity="0.6" />
      <path d="M54 71 L53 80 L54 78 L56 80 L55 71 Z" fill="#FFD700" opacity="0.6" />
    </g>
  </svg>
);

const bars = [
  { delay: 0.2, color: 'bg-orange-400' },
  { delay: 0.4, color: 'bg-red-400' },
  { delay: 0.1, color: 'bg-yellow-400' },
]

const RocketFireTail = ({ isAnimating }: { isAnimating: boolean }) => (
  <div
    className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 ${isAnimating ? 'opacity-80' : 'opacity-0 group-hover:opacity-60'} transition-opacity duration-300`}
  >
    <div className="flex justify-center space-x-2">
      {bars.map((bar, i) => (
        <div
          key={i}
          className={`w-1 ${bar.color} rounded-full animate-pulse`}
          style={{
            animationDelay: `${bar.delay}s`,
            height: i === 1 ? 18 : 12,
          }}
        />
      ))}
    </div>
  </div>
);

const GlowLayer = ({ isAnimating }: { isAnimating: boolean }) => (
  <>
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-emerald-400 to-green-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
    <div className={`absolute inset-0 rounded-2xl border-2 border-white/40 ${isAnimating ? 'animate-ping' : ''}`} />
    <div className={`absolute inset-0 rounded-2xl bg-white/20 ${isAnimating ? 'animate-pulse' : ''}`} />
  </>
);

const ScrollToTopRocket = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrolled / maxHeight;
      setIsVisible(scrollPercent > 0.50);
    };

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    setIsAnimating(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setTimeout(() => setIsAnimating(false), 1200)
  }

  return (
    <button
      onClick={scrollToTop}
      className={clsx(
        "fixed bottom-14 right-8 z-50 group p-3 bg-gradient-to-b from-black/70",
        "emerald-glow to-emerald-600 rounded-2xl transition-all duration-300 hover:scale-110",
        isAnimating && "animate-bounce",
        !isVisible && "hidden"
      )}
      title="Volver arriba">
      <RocketSVG isAnimating={isAnimating} />
      <RocketFireTail isAnimating={isAnimating} />
      <GlowLayer isAnimating={isAnimating} />
    </button>
  )
}


export default ScrollToTopRocket;