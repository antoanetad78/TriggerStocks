import React from 'react'
import Head from 'next/head'
import { Shield, Lock, FileText, Scale } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <>
      <Head><title>Privacy & Terms — Trigger Stocks</title></Head>

      <div className="pt-16 pb-12 px-8 text-center bg-gradient-to-b from-[#183446]/20 to-transparent">
        <div className="w-16 h-16 rounded-2xl bg-[#0090C1]/20 border border-[#38AECC]/30 flex items-center justify-center mb-6 shadow-xl mx-auto">
          <Shield className="w-8 h-8 text-[#38AECC]" />
        </div>
        <h1 className="text-3xl font-bold mb-4 tracking-tight">Privacy & <span className="text-[#38AECC]">Terms</span></h1>
        <p className="text-[#EAF2F7]/50 text-xs leading-relaxed max-w-[280px] mx-auto">
          Last updated: January 2026. Your trust is our priority.
        </p>
      </div>

      <div className="px-8 pb-32 space-y-12">
        <section className="bg-red-400/5 border border-red-400/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-3 text-red-400">
            <Scale className="w-5 h-5" />
            <h2 className="text-sm font-black uppercase tracking-widest">Financial Disclaimer</h2>
          </div>
          <p className="text-xs text-[#EAF2F7]/70 leading-relaxed">
            Trigger Stocks is an information service only. We do not provide financial advice. All investments carry risk, and event-driven catalysts are particularly volatile. You are solely responsible for your own investment decisions.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-5 h-5 text-[#38AECC]" />
            <h2 className="text-lg font-bold text-white">Terms of Service</h2>
          </div>
          <div className="space-y-6 text-xs text-[#EAF2F7]/60 leading-relaxed">
            <div>
              <h3 className="text-[#EAF2F7]/90 font-bold mb-2 uppercase tracking-widest">1. Usage Rights</h3>
              <p>Trigger Stocks provides a limited, non-exclusive license to use the app for personal, non-commercial research purposes only.</p>
            </div>
            <div>
              <h3 className="text-[#EAF2F7]/90 font-bold mb-2 uppercase tracking-widest">2. Data Accuracy</h3>
              <p>While we strive for 100% accuracy, catalyst timing and company information are subject to change without notice. We provide data "as-is" without warranty.</p>
            </div>
            <div>
              <h3 className="text-[#EAF2F7]/90 font-bold mb-2 uppercase tracking-widest">3. Prohibited Activity</h3>
              <p>Automated scraping, reverse engineering, or redistributing our curated data feed without written consent is strictly prohibited.</p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-5 h-5 text-[#38AECC]" />
            <h2 className="text-lg font-bold text-white">Privacy Policy</h2>
          </div>
          <div className="space-y-6 text-xs text-[#EAF2F7]/60 leading-relaxed">
            <div>
              <h3 className="text-[#EAF2F7]/90 font-bold mb-2 uppercase tracking-widest">Data Collection</h3>
              <p>We collect minimal information required for service: email addresses for account synchronization and anonymous usage analytics to improve the app experience.</p>
            </div>
            <div>
              <h3 className="text-[#EAF2F7]/90 font-bold mb-2 uppercase tracking-widest">Third Parties</h3>
              <p>We do not sell your personal data. We only use trusted infrastructure providers (e.g., hosting and analytics) that comply with strict data privacy standards.</p>
            </div>
            <div>
              <h3 className="text-[#EAF2F7]/90 font-bold mb-2 uppercase tracking-widest">Your Rights</h3>
              <p>You have the right to request a copy of your data or its deletion at any time by contacting our support team via the Contact page.</p>
            </div>
          </div>
        </section>

        <div className="pt-8 border-t border-[#183446] text-center">
          <p className="text-[10px] text-[#EAF2F7]/20 uppercase font-bold tracking-[0.2em]">
            © 2026 Trigger Stocks. All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  )
}
