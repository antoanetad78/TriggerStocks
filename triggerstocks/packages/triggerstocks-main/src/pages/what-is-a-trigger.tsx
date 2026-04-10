import React, { useState, useRef, TouchEvent } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { History, Eye, Target, Sparkles } from 'lucide-react'
import { RocketIcon } from '../components/RocketIcon'

const BullIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 15c0-2.5 2.5-4.5 6.5-4.5 1.5 0 3 1 4.5 2" />
    <path d="M8 10.5c0-2-1-4.5 2-6.5 1.5-.5 3 1 4 2.5" />
    <path d="M10 10.5c1-2.5 3-3.5 5-3.5" />
    <path d="M3 15v5M8 15v4.5M14 12v7" />
    <path d="M2 21h18" strokeOpacity="0.2" />
  </svg>
)

const cards = [
  { icon: <BullIcon className="w-12 h-12 text-[#38AECC]" />, title: 'Trade the Moment', text: 'Trigger Stocks surfaces stocks with explosive move potential around upcoming or fresh triggers.' },
  { icon: <RocketIcon className="w-12 h-12" />, title: 'Position Early', text: 'Markets often move before the outcome. Build, trim, or exit positions ahead of the actual event.' },
  { icon: <Sparkles className="w-12 h-12 text-[#38AECC]" strokeWidth={1.5} />, title: 'Market Shifters', text: 'Earnings, approvals, results. Triggers reset expectations — and price follows fast.' },
  { icon: <History className="w-12 h-12 text-[#38AECC]" strokeWidth={1.5} />, title: 'News → Trigger', text: 'When a company announces results timing, that news itself becomes a tradable trigger event.' },
  { icon: <Eye className="w-12 h-12 text-[#38AECC]" strokeWidth={1.5} />, title: 'Trigger Updates', text: 'Confirmed news that clarifies timing. Higher uncertainty but earlier awareness for traders.' },
  { icon: <Target className="w-12 h-12 text-[#38AECC]" strokeWidth={1.5} />, title: 'Triggered!', text: 'When the trigger is released, market volatility peaks — uncertainty is highest and moves are violent.' },
]

export default function WhatIsATriggerPage() {
  const router = useRouter()
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
      <Head><title>What is a Trigger? — Trigger Stocks</title></Head>

      <div className="pt-12 px-8 text-center">
        <h1 className="text-3xl font-bold mb-2">What is a <span className="text-[#38AECC]">Trigger?</span></h1>
        <p className="text-[#EAF2F7]/60 text-sm">Swipe through to learn about catalysts.</p>
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

        <div className="flex justify-center gap-2 mt-8 pb-4">
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

      <div className="px-8 pb-8 flex justify-center">
        <button
          onClick={() => router.push('/')}
          className="bg-[#38AECC] text-[#022F40] px-12 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:opacity-90 active:scale-95 transition-all shadow-xl"
        >
          Explore Feed
        </button>
      </div>
    </>
  )
}
