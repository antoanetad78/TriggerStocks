import React, { useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Eye, Target, RefreshCw, Activity, Bell, BellOff, Bookmark, BookmarkCheck } from 'lucide-react'
import { useRequireAuth } from '../../lib/auth'
import { MOCK_TRIGGERS, COMPANIES } from '../../lib/mockData'
import { TriggerCard } from '../../components/TriggerCard'
import { TriggerStatus } from '../../types'
import { statusLabel } from '../../lib/helpers'
import { useState } from 'react'

type StatFilter = 'all' | TriggerStatus

export default function CompanyPage() {
  const router = useRouter()
  const { status } = useRequireAuth()
  const id = router.query.id as string

  const [following, setFollowing] = useState(false)
  const [alerts, setAlerts] = useState(false)
  const [filter, setFilter] = useState<StatFilter>('all')

  const company = useMemo(() => {
    if (!id) return null
    return (
      Object.values(COMPANIES).find(c => c._id === id) ??
      MOCK_TRIGGERS.find(t => t.company._id === id)?.company ?? null
    )
  }, [id])

  const allTriggers = useMemo(
    () => MOCK_TRIGGERS.filter(t => t.company._id === id).sort(
      (a, b) => new Date(b.dates.dateAdded).getTime() - new Date(a.dates.dateAdded).getTime(),
    ),
    [id],
  )

  const stats = useMemo(() => ({
    on_time:  allTriggers.filter(t => t.status === 'on_time').length,
    triggered: allTriggers.filter(t => t.status === 'triggered').length,
    delayed:  allTriggers.filter(t => t.status === 'delayed').length,
    cancelled: allTriggers.filter(t => t.status === 'cancelled').length,
  }), [allTriggers])

  const displayTriggers = filter === 'all' ? allTriggers : allTriggers.filter(t => t.status === filter)

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-64 text-[#EAF2F7]/30 text-sm">Loading…</div>
  }

  if (!company) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-[#EAF2F7]/30 text-sm">Company not found.</p>
      </div>
    )
  }

  const statButtons: { status: TriggerStatus; icon: React.ReactNode; label: string }[] = [
    { status: 'on_time',   icon: <Eye className="w-5 h-5" />,      label: 'On Time' },
    { status: 'triggered', icon: <Target className="w-5 h-5" />,   label: 'Triggered' },
    { status: 'delayed',   icon: <RefreshCw className="w-5 h-5" />, label: 'Delayed' },
  ]

  return (
    <>
      <Head>
        <title>{company.name} — Trigger Stocks</title>
      </Head>

      {/* Hero */}
      <div className="pt-8 pb-6 px-6 bg-gradient-to-b from-[#183446]/20 to-transparent">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-white">{company.name}</h1>
          <div className="text-right">
            <span className="text-[10px] font-bold text-[#EAF2F7]/30 uppercase tracking-widest block mb-0.5">
              Exchange
            </span>
            <span className="text-xs font-bold text-[#38AECC]">{company.market}</span>
          </div>
        </div>

        {/* Follow / Alerts */}
        <div className="flex gap-3 mb-10">
          <button
            onClick={() => setFollowing(v => !v)}
            className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all active:scale-95 ${
              following
                ? 'bg-[#38AECC]/10 border border-[#38AECC] text-[#38AECC]'
                : 'bg-[#38AECC] text-[#022F40] shadow-xl shadow-cyan-900/40'
            }`}
          >
            {following ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            {following ? 'Following' : 'Follow'}
          </button>
          <button
            onClick={() => setAlerts(v => !v)}
            className={`flex-1 flex items-center justify-center gap-2 h-12 rounded-xl text-[10px] font-black uppercase tracking-[0.15em] transition-all border active:scale-95 ${
              alerts
                ? 'bg-blue-400/10 border-blue-400 text-blue-400'
                : 'bg-transparent border-[#183446] text-[#EAF2F7]/40 hover:border-[#38AECC]/40'
            }`}
          >
            {alerts ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
            {alerts ? 'Mute Alerts' : 'Get Alerts'}
          </button>
        </div>

        {/* Stat filters */}
        <div className="flex justify-between items-center mb-8 px-2">
          {statButtons.map(({ status: s, icon, label }) => (
            <React.Fragment key={s}>
              <button
                onClick={() => setFilter(prev => prev === s ? 'all' : s)}
                className={`flex flex-col items-center gap-1 transition-all p-2 rounded-xl flex-1 ${
                  filter === s ? 'bg-[#38AECC]/10 ring-1 ring-[#38AECC]/50' : 'opacity-80'
                }`}
              >
                <span className={filter === s ? 'text-[#38AECC]' : 'text-[#EAF2F7]/40'}>{icon}</span>
                <span className="text-[10px] uppercase font-bold text-[#EAF2F7]/40 tracking-widest">{label}</span>
                <span className={`text-lg font-bold ${filter === s ? 'text-[#38AECC]' : ''}`}>
                  {stats[s]}
                </span>
              </button>
              {s !== 'delayed' && <div className="w-[1px] h-8 bg-[#183446] mx-1" />}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-[#183446]/30 border border-[#046E8F]/10 rounded-full">
          <Activity className="w-3.5 h-3.5 text-[#38AECC]" />
          <p className="text-[11px] text-[#EAF2F7]/70 font-medium tracking-tight">
            {allTriggers.length} trigger{allTriggers.length !== 1 ? 's' : ''} tracked for{' '}
            <span className="text-white font-bold">{company.ticker}</span>
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center justify-between mb-6 opacity-40">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em]">
            {filter === 'all' ? 'Full History' : `${statusLabel(filter as TriggerStatus)} Triggers`}
          </span>
          <div className="h-[1px] flex-1 bg-[#183446] ml-3" />
        </div>

        {displayTriggers.length > 0 ? (
          <div className="space-y-0">
            {displayTriggers.map(t => (
              <div key={t._id} className="relative pl-6 mb-4">
                <div className="absolute left-[2px] top-0 bottom-0 w-[2px] bg-[#183446]/50" />
                <div className="absolute left-[-3px] top-6 w-3 h-3 rounded-full bg-[#38AECC] border-2 border-[#022F40] z-10" />
                <TriggerCard trigger={t} hideCompany />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 opacity-30 italic text-sm">
            No {filter === 'all' ? '' : statusLabel(filter as TriggerStatus).toLowerCase() + ' '}triggers found.
          </div>
        )}
      </div>
    </>
  )
}
