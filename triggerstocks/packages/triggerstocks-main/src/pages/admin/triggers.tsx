import React, { useState, useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
  Search, Plus, Calendar, Sparkles, Send, CheckCircle,
  AlertCircle, Check, X, MessageSquare, ClipboardList,
} from 'lucide-react'
import { useRequireAdmin } from '../../lib/auth'
import { MOCK_TRIGGERS, COMPANIES } from '../../lib/mockData'
import { Company, Trigger, TriggerType } from '../../types'

// ─── Add Trigger form ───────────────────────────────────────────────────────

function AddTriggerForm() {
  const [stockSearch, setStockSearch] = useState('')
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [sourceUrl, setSourceUrl] = useState('')
  const [type, setType] = useState<TriggerType>('expected')
  const [year, setYear] = useState('2025')
  const [period, setPeriod] = useState('Q1')
  const [exactDate, setExactDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const suggestions = useMemo(() => {
    if (!stockSearch.trim() || selectedCompany) return []
    const q = stockSearch.toLowerCase()
    return Object.values(COMPANIES).filter(
      c => c.name.toLowerCase().includes(q) || c.ticker.toLowerCase().includes(q),
    ).slice(0, 5)
  }, [stockSearch, selectedCompany])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedCompany || !title || !summary) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
        setTitle(''); setSummary(''); setSourceUrl('')
        setSelectedCompany(null); setStockSearch('')
        setExactDate('')
      }, 2000)
    }, 1200)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Stock selection */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EAF2F7]/30 ml-1">Select Asset</label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EAF2F7]/20" />
          <input
            type="text"
            placeholder="Search ticker or company…"
            value={selectedCompany ? `${selectedCompany.name} (${selectedCompany.ticker})` : stockSearch}
            onChange={e => { setStockSearch(e.target.value); if (selectedCompany) setSelectedCompany(null) }}
            className="w-full bg-[#183446] border border-[#046E8F]/20 rounded-2xl py-5 pl-12 pr-4 text-sm focus:outline-none focus:border-[#38AECC] transition-all text-white"
          />
        </div>
        {suggestions.length > 0 && (
          <div className="bg-[#183446] border border-[#046E8F]/10 rounded-2xl overflow-hidden shadow-2xl">
            {suggestions.map(c => (
              <button
                key={c._id}
                type="button"
                onClick={() => setSelectedCompany(c)}
                className="w-full text-left px-5 py-4 border-b border-[#022F40] last:border-0 hover:bg-[#022F40]/50 transition-colors"
              >
                <p className="text-sm font-bold text-white">{c.name}</p>
                <p className="text-[10px] font-bold text-[#38AECC] uppercase tracking-widest">{c.ticker}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Title */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EAF2F7]/30 ml-1">Trigger Headline</label>
        <input
          type="text"
          required
          placeholder="e.g. Phase 3 Results Readout"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full bg-[#183446] border border-[#046E8F]/20 rounded-2xl py-5 px-6 text-sm font-bold text-white focus:outline-none focus:border-[#38AECC] transition-all"
        />
      </div>

      {/* Summary */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EAF2F7]/30 ml-1">Summary / Context</label>
        <textarea
          rows={4}
          required
          placeholder="Provide detailed context for the trigger…"
          value={summary}
          onChange={e => setSummary(e.target.value)}
          className="w-full bg-[#183446] border border-[#046E8F]/20 rounded-2xl py-5 px-6 text-sm text-[#EAF2F7]/80 focus:outline-none focus:border-[#38AECC] transition-all resize-none"
        />
      </div>

      {/* Source URL */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EAF2F7]/30 ml-1">Source URL (optional)</label>
        <input
          type="url"
          placeholder="https://example.com/announcement"
          value={sourceUrl}
          onChange={e => setSourceUrl(e.target.value)}
          className="w-full bg-[#183446] border border-[#046E8F]/20 rounded-2xl py-5 px-6 text-sm text-[#EAF2F7]/80 focus:outline-none focus:border-[#38AECC] transition-all"
        />
      </div>

      {/* Type */}
      <div className="space-y-3">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EAF2F7]/30 ml-1">Trigger Type</label>
        <div className="grid grid-cols-2 gap-3">
          {([['expected', 'Expected', Plus], ['expected_update', 'Expected Update', Sparkles]] as const).map(([val, lbl, Icon]) => (
            <button
              key={val}
              type="button"
              onClick={() => setType(val)}
              className={`py-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                type === val
                  ? 'bg-[#38AECC] border-[#38AECC] text-[#022F40]'
                  : 'bg-[#183446]/40 border-[#183446] text-[#EAF2F7]/40 hover:border-[#38AECC]/30'
              }`}
            >
              <Icon className="w-3 h-3" />
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* Timing */}
      <div className="space-y-4">
        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#EAF2F7]/30 ml-1">Expected Timing</label>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EAF2F7]/20" />
            <select
              value={year}
              onChange={e => setYear(e.target.value)}
              className="w-full bg-[#183446] border border-[#046E8F]/20 rounded-xl py-4 pl-12 pr-4 text-xs font-bold text-white focus:outline-none appearance-none"
            >
              {['2025', '2026', '2027'].map(y => <option key={y}>{y}</option>)}
            </select>
          </div>
          <select
            value={period}
            onChange={e => setPeriod(e.target.value)}
            className="w-full bg-[#183446] border border-[#046E8F]/20 rounded-xl py-4 px-4 text-xs font-bold text-white focus:outline-none appearance-none"
          >
            {['Q1','Q2','Q3','Q4','H1','H2','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
        <div className="relative">
          <input
            type="date"
            value={exactDate}
            onChange={e => setExactDate(e.target.value)}
            className="w-full bg-[#183446] border border-[#046E8F]/20 rounded-xl py-4 px-6 text-xs font-bold text-white focus:outline-none focus:border-[#38AECC] transition-all [color-scheme:dark]"
          />
          <p className="text-[9px] text-[#EAF2F7]/30 text-right px-1 mt-1">Exact date overrides quarter / month</p>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || success}
        className={`w-full h-16 rounded-2xl font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-2xl ${
          success  ? 'bg-green-500 text-white'
          : loading ? 'bg-[#183446] text-[#EAF2F7]/20 cursor-wait'
          : 'bg-[#38AECC] text-[#022F40] shadow-cyan-950/40'
        }`}
      >
        {success ? (
          <><CheckCircle className="w-5 h-5" /> Trigger Published</>
        ) : loading ? (
          <div className="w-5 h-5 border-2 border-[#EAF2F7]/20 border-t-[#EAF2F7] rounded-full animate-spin" />
        ) : (
          <>Publish Trigger <Send className="w-4 h-4" /></>
        )}
      </button>
    </form>
  )
}

// ─── Review list ─────────────────────────────────────────────────────────────

type ReviewState = { comment: string; decision: 'approved' | 'rejected' | null }

function ReviewList({ triggers }: { triggers: Trigger[] }) {
  const [reviews, setReviews] = useState<Record<string, ReviewState>>(() =>
    Object.fromEntries(triggers.map(t => [t._id, { comment: '', decision: null }])),
  )

  function decide(id: string, d: 'approved' | 'rejected') {
    setReviews(prev => ({ ...prev, [id]: { ...prev[id], decision: prev[id].decision === d ? null : d } }))
  }

  if (triggers.length === 0) {
    return (
      <div className="text-center py-16 opacity-30">
        <p className="text-sm font-bold uppercase tracking-widest">No triggers pending review</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {triggers.map(t => {
        const r = reviews[t._id]
        return (
          <div
            key={t._id}
            className={`bg-[#183446] border rounded-2xl p-5 transition-all ${
              r.decision === 'approved' ? 'border-green-500/50'
              : r.decision === 'rejected' ? 'border-red-500/50'
              : 'border-[#046E8F]/20'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="bg-[#022F40] text-[#38AECC] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#38AECC]/20">
                {t.company.ticker}
              </span>
              <span className="text-[10px] font-bold text-[#EAF2F7]/30">{t.dates.dateExpected}</span>
            </div>
            <h3 className="text-white font-bold text-base mb-2 tracking-tight leading-snug">{t.title}</h3>
            <p className="text-[#EAF2F7]/60 text-sm mb-4 leading-relaxed">{t.summary}</p>

            <div className="space-y-3">
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[#EAF2F7]/20" />
                <textarea
                  rows={2}
                  placeholder="Internal comment…"
                  value={r.comment}
                  onChange={e => setReviews(prev => ({ ...prev, [t._id]: { ...prev[t._id], comment: e.target.value } }))}
                  className="w-full bg-[#022F40]/50 border border-[#183446] rounded-xl py-3 pl-10 pr-4 text-xs text-[#EAF2F7]/80 focus:outline-none focus:border-[#38AECC] transition-all resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => decide(t._id, 'rejected')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                    r.decision === 'rejected'
                      ? 'bg-red-500 text-white'
                      : 'bg-[#022F40] text-red-500/60 border border-red-500/20 hover:bg-red-500/10'
                  }`}
                >
                  <X className="w-3 h-3" /> Reject
                </button>
                <button
                  onClick={() => decide(t._id, 'approved')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                    r.decision === 'approved'
                      ? 'bg-green-500 text-white'
                      : 'bg-[#022F40] text-green-500/60 border border-green-500/20 hover:bg-green-500/10'
                  }`}
                >
                  <Check className="w-3 h-3" /> Approve
                </button>
              </div>
            </div>
          </div>
        )
      })}

      <button className="w-full bg-[#38AECC] text-[#022F40] py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-cyan-950/40 active:scale-[0.98] transition-all">
        Submit All Reviews
      </button>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type AdminTab = 'add' | 'review'

export default function AdminTriggersPage() {
  const router = useRouter()
  const { status } = useRequireAdmin()
  const [tab, setTab] = useState<AdminTab>('add')

  const pendingTriggers = MOCK_TRIGGERS.filter(t => t.reviewStatus?.status === 'pending_review')

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-64 text-[#EAF2F7]/30 text-sm">Loading…</div>
  }

  return (
    <>
      <Head>
        <title>Admin — Trigger Stocks</title>
      </Head>

      <div className="p-8 pb-32">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
              Admin <span className="text-[#38AECC]">Panel</span>
            </h1>
            <p className="text-[#EAF2F7]/50 text-xs uppercase tracking-[0.2em] font-bold">Trigger Management</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-[#183446]/30 p-1 rounded-2xl mb-10 border border-[#183446]">
          <button
            onClick={() => setTab('add')}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              tab === 'add' ? 'bg-[#38AECC] text-[#022F40] shadow-lg' : 'text-[#EAF2F7]/40'
            }`}
          >
            Add New
          </button>
          <button
            onClick={() => setTab('review')}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
              tab === 'review' ? 'bg-[#38AECC] text-[#022F40] shadow-lg' : 'text-[#EAF2F7]/40'
            }`}
          >
            Review
            {pendingTriggers.length > 0 && (
              <span className={`w-4 h-4 rounded-full text-[8px] font-black flex items-center justify-center ${tab === 'review' ? 'bg-[#022F40] text-[#38AECC]' : 'bg-[#38AECC] text-[#022F40]'}`}>
                {pendingTriggers.length}
              </span>
            )}
          </button>
        </div>

        {tab === 'add' ? (
          <>
            <AddTriggerForm />
            <div className="mt-12 p-6 bg-red-400/5 border border-red-400/10 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Admin Responsibility</span>
              </div>
              <p className="text-[10px] text-[#EAF2F7]/40 leading-relaxed font-bold">
                Ensure all data is verified against official sources before publishing. Published triggers are immediately visible to all users.
              </p>
            </div>
          </>
        ) : (
          <ReviewList triggers={pendingTriggers} />
        )}
      </div>
    </>
  )
}
