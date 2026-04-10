import React, { useState, useRef, TouchEvent } from 'react'
import Head from 'next/head'
import { Zap, Calendar, TrendingUp, Target, Search, AlertTriangle, Compass } from 'lucide-react'

const cards = [
  { icon: <Zap className="w-12 h-12 text-[#38AECC]" strokeWidth={1.5} />, title: 'Event-Driven Stocks', text: 'Stocks with volatility potential around key events.' },
  { icon: <Calendar className="w-12 h-12 text-[#38AECC]" strokeWidth={1.5} />, title: 'Timing Matters', text: 'Price moves often happen before or after a trigger.' },
  { icon: <TrendingUp className="w-12 h-12 text-[#38AECC]" strokeWidth={1.5} />, title: 'Up or Down', text: 'Direction is uncertain — volatility is the point.' },
  { icon: <Target className="w-12 h-12 text-[#38AECC]" strokeWidth={1.5} />, title: 'Opportunity Window', text: 'Spot moments when sentiment can shift fast.' },
  { icon: <Search className="w-12 h-12 text-[#38AECC]" strokeWidth={1.5} />, title: 'Smarter Research', text: 'Focus on companies where something is actually happening.' },
  { icon: <AlertTriangle className="w-12 h-12 text-[#38AECC]" strokeWidth={1.5} />, title: 'Risk Awareness', text: 'Even good news can be priced in.' },
  { icon: <Compass className="w-12 h-12 text-[#38AECC]" strokeWidth={1.5} />, title: 'Not Investment Advice', text: 'Decision support, not recommendations.' },
]

export default function WhyTriggerStocksPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  function handleTouchStart(e: TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: TouchEvent) {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < cards.length - 1) setCurrentIndex(prev => prev + 1)
      else if (diff < 0 && currentIndex > 0) setCurrentIndex(prev => prev - 1)
    }
    touchStartX.current = null
  }

  return (
    <>
      <Head><title>Why Trigger Stocks? — Trigger Stocks</title></Head>

      <div className="pt-12 px-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Why <span className="text-[#38AECC]">Trigger</span> Stocks?</h1>
        <p className="text-[#EAF2F7]/60 text-sm">Swipe through to understand the value.</p>
      </div>

      <div
        className="flex flex-col items-center justify-center py-8"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out w-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {cards.map((card, idx) => (
              <div key={idx} className="w-full flex-shrink-0 px-8">
                <div className="bg-[#183446] rounded-2xl p-8 flex flex-col items-center text-center shadow-xl border border-[#046E8F]/20 h-72 justify-center">
                  <div className="mb-6 p-4 rounded-full bg-[#022F40]/50 border border-[#046E8F]/10">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{card.title}</h3>
                  <p className="text-[#EAF2F7]/80 text-sm leading-relaxed max-w-[240px]">{card.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-10 pb-4">
          {cards.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                currentIndex === idx ? 'bg-[#38AECC] w-6' : 'bg-[#EAF2F7]/10 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </>
  )
}
