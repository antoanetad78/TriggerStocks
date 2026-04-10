import React, { useState } from 'react'
import Head from 'next/head'
import { signOut, useSession } from 'next-auth/react'
import {
  User, Bell, Trash2, Building2, Mail, Shield,
  CreditCard, ExternalLink, ChevronRight, LogOut, Settings,
} from 'lucide-react'
import { useRequireAuth } from '../lib/auth'
import { Company } from '../types'
import { COMPANIES } from '../lib/mockData'

type Tab = 'FOLLOWING' | 'NOTIFICATIONS' | 'SETTINGS'

type FollowedEntry = { company: Company; alerts: boolean }

const INITIAL_FOLLOWING: FollowedEntry[] = [
  { company: COMPANIES.ONCO,  alerts: true },
  { company: COMPANIES.OCGN,  alerts: true },
  { company: COMPANIES.EGET,  alerts: false },
  { company: COMPANIES.NIMBU, alerts: true },
]

export default function ProfilePage() {
  const { status } = useRequireAuth()
  const { data: session } = useSession()

  const [tab, setTab] = useState<Tab>('FOLLOWING')
  const [following, setFollowing] = useState<FollowedEntry[]>(INITIAL_FOLLOWING)
  const [emailOpen, setEmailOpen] = useState(false)
  const [prefs, setPrefs] = useState({ digest: true, newsletter: false })

  function unfollow(id: string) {
    setFollowing(prev => prev.filter(e => e.company._id !== id))
  }

  function toggleAlert(id: string) {
    setFollowing(prev =>
      prev.map(e => e.company._id === id ? { ...e, alerts: !e.alerts } : e),
    )
  }

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-64 text-[#EAF2F7]/30 text-sm">Loading…</div>
  }

  const alertCount = following.filter(e => e.alerts).length
  const displayName = session?.user?.name ?? 'User'
  const displayEmail = session?.user?.email ?? ''

  return (
    <>
      <Head>
        <title>My Profile — Trigger Stocks</title>
      </Head>

      <div className="p-6 pb-8">
        {/* Profile card */}
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#38AECC]/20 to-transparent blur-3xl -z-10 rounded-full" />
          <div className="bg-[#183446]/40 border border-[#046E8F]/20 rounded-3xl p-8 flex flex-col items-center text-center shadow-2xl backdrop-blur-sm">
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#38AECC] to-[#0090C1] p-1 shadow-[0_0_30px_rgba(56,174,204,0.3)]">
                <div className="w-full h-full rounded-full bg-[#022F40] flex items-center justify-center border border-white/10">
                  {session?.user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={session.user.image} alt="avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-white" />
                  )}
                </div>
              </div>
              <button className="absolute bottom-0 right-0 bg-[#38AECC] text-[#022F40] p-2 rounded-full border-4 border-[#022F40] shadow-lg active:scale-90 transition-transform">
                <Settings className="w-4 h-4" />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight mb-1">{displayName}</h2>
            <p className="text-[#EAF2F7]/40 text-sm font-medium mb-6">{displayEmail}</p>

            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-[#022F40]/50 border border-[#183446] rounded-2xl py-4 px-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#EAF2F7]/20 mb-1">Following</p>
                <p className="text-xl font-bold text-[#38AECC]">{following.length}</p>
              </div>
              <div className="bg-[#022F40]/50 border border-[#183446] rounded-2xl py-4 px-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#EAF2F7]/20 mb-1">Alerts</p>
                <p className="text-xl font-bold text-blue-400">{alertCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#183446]/30 p-1 rounded-2xl mb-8 border border-[#183446]">
          {(['FOLLOWING', 'NOTIFICATIONS', 'SETTINGS'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                tab === t ? 'bg-[#38AECC] text-[#022F40] shadow-lg' : 'text-[#EAF2F7]/40 hover:text-[#EAF2F7]/60'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="space-y-4">
          {tab === 'FOLLOWING' && (
            <>
              {following.length === 0 ? (
                <div className="text-center py-20 opacity-30">
                  <Building2 className="w-12 h-12 mx-auto mb-4" />
                  <p className="text-sm font-bold uppercase tracking-widest">No companies followed</p>
                </div>
              ) : (
                following.map(({ company }) => (
                  <div key={company._id} className="bg-[#183446]/20 border border-[#183446] rounded-2xl p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#022F40] border border-[#183446] flex items-center justify-center text-[#38AECC] font-bold text-lg">
                        {company.ticker[0]}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight">{company.name}</h4>
                        <p className="text-[10px] font-bold text-[#38AECC] uppercase tracking-widest">{company.ticker}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => unfollow(company._id)}
                      className="p-3 text-[#EAF2F7]/20 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                      aria-label={`Unfollow ${company.name}`}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </>
          )}

          {tab === 'NOTIFICATIONS' && (
            <>
              <div className="bg-blue-400/5 border border-blue-400/10 rounded-2xl p-4 mb-6">
                <p className="text-[10px] text-blue-400/80 leading-relaxed font-bold uppercase tracking-wider text-center">
                  Alerts active for {alertCount} {alertCount === 1 ? 'company' : 'companies'}
                </p>
              </div>
              {following.map(({ company, alerts }) => (
                <div key={company._id} className="bg-[#183446]/20 border border-[#183446] rounded-2xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${alerts ? 'bg-blue-400/10 border-blue-400/30 text-blue-400' : 'bg-[#022F40] border-[#183446] text-[#EAF2F7]/20'}`}>
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-tight">{company.name}</h4>
                      <p className="text-[10px] font-bold text-[#EAF2F7]/40 uppercase tracking-widest">
                        {alerts ? 'Alerts Active' : 'Alerts Muted'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleAlert(company._id)}
                    aria-label={alerts ? 'Mute alerts' : 'Enable alerts'}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${alerts ? 'bg-[#38AECC]' : 'bg-[#183446]'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${alerts ? 'left-7' : 'left-1'}`} />
                  </button>
                </div>
              ))}
            </>
          )}

          {tab === 'SETTINGS' && (
            <div className="space-y-3">
              {/* Email preferences */}
              <div className="bg-[#183446]/20 border border-[#183446]/30 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setEmailOpen(v => !v)}
                  className="w-full flex items-center justify-between px-6 py-5 hover:bg-[#183446]/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#183446] flex items-center justify-center">
                      <Mail className="w-5 h-5 text-[#38AECC]" />
                    </div>
                    <div className="text-left">
                      <span className="block text-sm font-bold text-[#EAF2F7]/80 uppercase tracking-widest">Email Preferences</span>
                      <span className="block text-[10px] text-[#EAF2F7]/30 font-medium">Newsletter & digest</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-[#EAF2F7]/20 transition-transform ${emailOpen ? 'rotate-90' : ''}`} />
                </button>
                {emailOpen && (
                  <div className="px-6 pb-6 space-y-4 border-t border-[#183446]">
                    {[
                      { key: 'newsletter', label: 'Newsletter', desc: 'Weekly market triggers & insights' },
                      { key: 'digest',     label: 'Weekly Digest', desc: 'Summary of the week\'s best triggers' },
                    ].map(({ key, label, desc }) => (
                      <div key={key} className="flex items-center justify-between pt-4">
                        <div>
                          <p className="text-xs font-bold text-white/80 uppercase tracking-wider">{label}</p>
                          <p className="text-[10px] text-[#EAF2F7]/30">{desc}</p>
                        </div>
                        <button
                          onClick={() => setPrefs(p => ({ ...p, [key]: !p[key as keyof typeof p] }))}
                          aria-label={`Toggle ${label}`}
                          className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${prefs[key as keyof typeof prefs] ? 'bg-[#38AECC]' : 'bg-[#183446]'}`}
                        >
                          <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 ${prefs[key as keyof typeof prefs] ? 'left-6' : 'left-1'}`} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {[
                { icon: Shield,      label: 'Security',       desc: 'Password & 2FA' },
                { icon: CreditCard,  label: 'Subscription',   desc: 'Trigger Stocks Pro', soon: true },
                { icon: ExternalLink,label: 'Connected Apps',  desc: 'Sync with brokers',  soon: true },
              ].map(({ icon: Icon, label, desc, soon }) => (
                <button key={label} className="w-full flex items-center justify-between px-6 py-5 bg-[#183446]/20 border border-[#183446]/30 rounded-2xl hover:bg-[#183446]/40 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#183446] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#38AECC]" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#EAF2F7]/80 uppercase tracking-widest">{label}</span>
                        {soon && <span className="text-[8px] font-black bg-[#38AECC]/10 text-[#38AECC] px-2 py-0.5 rounded uppercase tracking-widest">Soon</span>}
                      </div>
                      <span className="block text-[10px] text-[#EAF2F7]/30 font-medium">{desc}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#EAF2F7]/20" />
                </button>
              ))}

              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full flex items-center justify-center gap-3 px-6 py-5 mt-6 border border-red-400/20 rounded-2xl text-red-400 font-bold text-xs uppercase tracking-[0.2em] hover:bg-red-400/5 active:scale-[0.98] transition-all"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
