import React, { useState } from 'react'
import Head from 'next/head'
import { Mail, Send, Linkedin, Github, Globe } from 'lucide-react'

export default function ContactPage() {
  const [isSent, setIsSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSent(true)
    setTimeout(() => setIsSent(false), 3000)
  }

  return (
    <>
      <Head><title>Contact — Trigger Stocks</title></Head>

      <div className="pt-16 pb-12 px-8 text-center bg-gradient-to-b from-[#183446]/20 to-transparent">
        <h1 className="text-4xl font-bold mb-3 tracking-tight">Get in <span className="text-[#38AECC]">Touch</span></h1>
        <p className="text-[#EAF2F7]/50 text-sm max-w-[240px] mx-auto">Have questions or feedback? We'd love to hear from you.</p>
      </div>

      <div className="px-8 pb-32">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#EAF2F7]/40 ml-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="Your Name"
              className="w-full bg-[#183446] border border-[#046E8F]/20 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-[#38AECC] transition-all text-white"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#EAF2F7]/40 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EAF2F7]/30" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                className="w-full bg-[#183446] border border-[#046E8F]/20 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-[#38AECC] transition-all text-white"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-[#EAF2F7]/40 ml-1">Message</label>
            <textarea
              rows={4}
              required
              placeholder="How can we help?"
              className="w-full bg-[#183446] border border-[#046E8F]/20 rounded-xl py-4 px-5 text-sm focus:outline-none focus:border-[#38AECC] transition-all resize-none text-white"
            />
          </div>

          <button
            type="submit"
            className={`w-full h-14 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] ${
              isSent ? 'bg-green-500 text-white shadow-green-900/40' : 'bg-[#38AECC] text-[#022F40] shadow-cyan-900/40 hover:opacity-90'
            }`}
          >
            {isSent ? 'Message Sent!' : 'Send Message'}
            {!isSent && <Send className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-16 space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#EAF2F7]/20 whitespace-nowrap">Connect</span>
            <div className="h-[1px] flex-1 bg-[#183446]" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <a href="mailto:support@triggerstocks.com" className="flex items-center gap-3 p-4 bg-[#183446]/40 border border-[#183446] rounded-xl hover:border-[#38AECC]/30 transition-all">
              <Mail className="w-5 h-5 text-[#38AECC]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#EAF2F7]/60">Email</span>
            </a>
            <a href="https://www.linkedin.com/in/perakerblom/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 bg-[#183446]/40 border border-[#183446] rounded-xl hover:border-[#38AECC]/30 transition-all">
              <Linkedin className="w-5 h-5 text-[#38AECC]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#EAF2F7]/60">LinkedIn</span>
            </a>
          </div>

          <div className="flex justify-center gap-6 pt-4">
            <a href="https://www.linkedin.com/in/perakerblom/" target="_blank" rel="noopener noreferrer" className="text-[#EAF2F7]/20 hover:text-[#38AECC] transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-[#EAF2F7]/20 hover:text-[#38AECC] transition-colors"><Github className="w-5 h-5" /></a>
            <a href="https://triggerstocks.com" target="_blank" rel="noopener noreferrer" className="text-[#EAF2F7]/20 hover:text-[#38AECC] transition-colors"><Globe className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </>
  )
}
