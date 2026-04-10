import React, { useState, useRef, TouchEvent } from 'react'
import { RocketIcon } from './RocketIcon'

const NewsSparkIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.1" />
  </svg>
)

const SearchIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

interface HeroProps {
  onLearnMore: () => void
  onSeeDetails: () => void
  onFindTriggers: () => void
}

const slides = [
  {
    id: 'why',
    title: <>Why <span className="text-[#38AECC]">Trigger</span> Stocks?</>,
    description: "Follow companies and get alerts. Identify catalysts that may materially impact a stock's price.",
    cta: 'Learn More',
    icon: <RocketIcon className="w-24 h-24" />,
  },
  {
    id: 'what',
    title: <>What is a <span className="text-[#38AECC]">Trigger?</span></>,
    description: 'A future event that has the potential to materially affect the stock price.',
    cta: 'See Details',
    icon: <NewsSparkIcon className="w-16 h-16 text-[#EAF2F7]" />,
  },
  {
    id: 'discover',
    title: <>Discover <span className="text-[#38AECC]">Upcoming</span> Triggers</>,
    description: 'Filter by stock or timing — month or quarter — to find your next opportunity.',
    cta: 'Find Triggers',
    icon: <SearchIcon className="w-16 h-16 text-[#EAF2F7]" />,
  },
]

export function Hero({ onLearnMore, onSeeDetails, onFindTriggers }: HeroProps) {
  const [current, setCurrent] = useState(0)
  const touchX = useRef<number | null>(null)

  function handleTouchStart(e: TouchEvent) {
    touchX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: TouchEvent) {
    if (touchX.current === null) return
    const diff = touchX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      setCurrent(prev =>
        diff > 0 ? Math.min(prev + 1, slides.length - 1) : Math.max(prev - 1, 0),
      )
    }
    touchX.current = null
  }

  function handleAction() {
    const id = slides[current].id
    if (id === 'why') onLearnMore()
    else if (id === 'what') onSeeDetails()
    else onFindTriggers()
  }

  return (
    <section
      className="bg-[#022F40] text-center overflow-x-hidden relative flex flex-col items-center justify-center min-h-[600px] py-16"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slide track */}
      <div
        className="flex transition-transform duration-500 ease-in-out w-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div key={i} className="w-full flex-shrink-0 flex flex-col items-center px-8">
            <div className="h-32 flex items-center justify-center mb-10">{slide.icon}</div>

            <div className="flex flex-col items-center">
              <div className="h-24 flex items-center mb-2">
                <h1 className="text-4xl font-bold leading-tight text-white px-2">{slide.title}</h1>
              </div>
              <div className="h-16 mb-12 flex items-center">
                <p className="text-base text-[#EAF2F7]/80 max-w-[280px] mx-auto leading-relaxed">
                  {slide.description}
                </p>
              </div>
              <button
                onClick={handleAction}
                className="bg-[#EAF2F7] text-[#022F40] px-14 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:opacity-95 active:scale-95 transition-all shadow-2xl"
              >
                {slide.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-16">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              current === i ? 'bg-[#38AECC] w-6' : 'bg-[#EAF2F7]/20 w-2.5'
            }`}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
