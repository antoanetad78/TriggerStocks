import React from 'react'
import Head from 'next/head'
import { Zap, Users, Shield, Target, Award } from 'lucide-react'

function ValueCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="bg-[#183446] rounded-2xl p-6 border border-[#046E8F]/10 flex flex-col items-center text-center">
      <div className="mb-4 p-3 rounded-full bg-[#022F40]/50 border border-[#046E8F]/10">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
      <p className="text-[#EAF2F7]/60 text-xs leading-relaxed">{text}</p>
    </div>
  )
}

export default function AboutPage() {
  return (
    <>
      <Head><title>About — Trigger Stocks</title></Head>

      <div className="pt-16 pb-12 px-8 text-center bg-gradient-to-b from-[#183446]/20 to-transparent">
        <div className="w-20 h-20 rounded-2xl bg-[#0090C1] flex items-center justify-center mb-6 shadow-xl mx-auto shadow-cyan-900/20">
          <Zap className="w-12 h-12 text-white fill-current" />
        </div>
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Our <span className="text-[#38AECC]">Mission</span></h1>
        <p className="text-[#EAF2F7]/70 text-sm leading-relaxed max-w-[280px] mx-auto">
          We believe event-driven investing should be accessible to everyone. Trigger Stocks simplifies catalyst tracking for the modern investor.
        </p>
      </div>

      <div className="px-6 py-12 space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#EAF2F7]/20 whitespace-nowrap">Core Values</span>
          <div className="h-[1px] flex-1 bg-[#183446]" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ValueCard icon={<Target className="w-8 h-8 text-[#38AECC]" />} title="Precision" text="Verified data sources ensure you have the correct timing." />
          <ValueCard icon={<Shield className="w-8 h-8 text-[#38AECC]" />} title="Integrity" text="Transparency is at our core. We cite every source." />
          <ValueCard icon={<Users className="w-8 h-8 text-[#38AECC]" />} title="Community" text="Built for traders, by traders who understand catalysts." />
          <ValueCard icon={<Award className="w-8 h-8 text-[#38AECC]" />} title="Excellence" text="The most premium tracking experience on mobile." />
        </div>
      </div>

      <div className="px-8 pb-20">
        <div className="bg-[#183446]/30 border border-[#183446] rounded-3xl p-8">
          <h2 className="text-xl font-bold mb-4 text-white">Why we started?</h2>
          <p className="text-sm text-[#EAF2F7]/60 leading-relaxed mb-6">
            Finding material events used to require digging through PDFs and obscure forums. We centralized this chaos into a clean, actionable feed.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#38AECC]/10 border border-[#38AECC]/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-[#38AECC]" />
            </div>
            <div>
              <p className="text-xs font-bold text-white tracking-tight">Trigger Stocks Team</p>
              <p className="text-[10px] font-bold text-[#EAF2F7]/30 uppercase tracking-widest">Est. 2024</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
