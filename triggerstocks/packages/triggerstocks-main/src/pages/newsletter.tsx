import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Mail, Zap, CheckCircle, ArrowRight, Bell, Newspaper, RefreshCw } from 'lucide-react'

export default function NewsletterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSubscribed(true)
    }, 1500)
  }

  return (
    <>
      <Head><title>Newsletter — Trigger Stocks</title></Head>

      <div className="flex flex-col items-center pt-16 pb-24 px-8">
        {!isSubscribed ? (
          <>
            <div className="relative mb-10">
              <div className="absolute inset-0 bg-[#38AECC] blur-3xl opacity-20 rounded-full" />
              <div className="relative w-24 h-24 rounded-3xl bg-[#183446] border border-[#046E8F]/20 flex items-center justify-center shadow-2xl">
                <Newspaper className="w-12 h-12 text-[#38AECC]" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#38AECC] flex items-center justify-center shadow-lg animate-bounce">
                <Bell className="w-4 h-4 text-[#022F40]" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-center mb-4 tracking-tight leading-tight">
              Stay Ahead of the <span className="text-[#38AECC]">Market</span>
            </h1>
            <p className="text-[#EAF2F7]/50 text-sm text-center mb-12 max-w-[280px]">
              Get weekly catalyst summaries and early trigger alerts delivered to your inbox.
            </p>

            <div className="w-full space-y-4 mb-12">
              {[
                { icon: Zap, text: 'Early Catalyst Alerts' },
                { icon: CheckCircle, text: 'Weekly Market Summaries' },
                { icon: ArrowRight, text: 'Exclusive Ticker Deep-Dives' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-4 p-4 bg-[#183446]/30 border border-[#183446] rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-[#38AECC]/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-[#38AECC]" />
                  </div>
                  <span className="text-[10px] font-bold text-[#EAF2F7]/80 tracking-wide uppercase">{text}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubscribe} className="w-full space-y-4">
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#EAF2F7]/20" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#183446] border border-[#046E8F]/20 rounded-2xl py-5 pl-14 pr-5 text-sm focus:outline-none focus:border-[#38AECC] transition-all placeholder:text-[#EAF2F7]/20 text-white"
                />
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className={`w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-2xl shadow-cyan-900/40 ${
                  isLoading ? 'bg-[#183446] text-[#EAF2F7]/20' : 'bg-[#38AECC] text-[#022F40]'
                }`}
              >
                {isLoading ? (
                  <RefreshCw className="w-5 h-5 animate-spin" />
                ) : (
                  <>Join the List<ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <p className="mt-8 text-[9px] font-bold text-[#EAF2F7]/20 uppercase tracking-widest text-center">
              No spam. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <div className="w-24 h-24 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(34,197,94,0.1)]">
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold mb-4">You're on the list!</h2>
            <p className="text-[#EAF2F7]/50 text-sm mb-12 max-w-[240px]">
              Check your inbox shortly for a confirmation email and your first catalyst guide.
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-12 py-4 bg-[#183446] border border-[#046E8F]/20 rounded-full font-bold uppercase tracking-widest text-[10px] text-[#38AECC] hover:bg-[#38AECC]/10 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </>
  )
}
