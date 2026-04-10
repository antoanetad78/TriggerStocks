import React, { useState } from 'react'
import Head from 'next/head'
import { Check, X, MessageSquare, Calendar, Edit2, Save } from 'lucide-react'
import { useRequireAdmin } from '../../lib/auth'

type ReviewStatus = 'pending' | 'approved' | 'rejected'

type LLMTrigger = {
  id: string
  headline: string
  text: string
  date: string
  ticker: string
}

const INITIAL_TRIGGERS: LLMTrigger[] = [
  { id: '1', ticker: 'AAPL', headline: 'iPhone 16 Pro Launch Event', text: 'Apple is expected to announce the new iPhone 16 lineup with significant AI integration features.', date: 'Sep 2024' },
  { id: '2', ticker: 'TSLA', headline: 'Robotaxi Unveiling', text: 'Tesla scheduled the unveiling of its dedicated robotaxi platform, a major milestone for FSD technology.', date: 'Aug 8, 2024' },
  { id: '3', ticker: 'NVDA', headline: 'Q2 Earnings Report', text: 'NVIDIA will report Q2 results with high expectations for continued AI data center growth.', date: 'Aug 2024' },
  { id: '4', ticker: 'AMZN', headline: 'Prime Day Results', text: 'Amazon to release data on Prime Day performance, indicating consumer spending strength.', date: 'Jul 2024' },
]

export default function TriggerReviewPage() {
  const { status } = useRequireAdmin()

  const [triggers, setTriggers] = useState<LLMTrigger[]>(INITIAL_TRIGGERS)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<LLMTrigger | null>(null)
  const [reviews, setReviews] = useState<Record<string, { status: ReviewStatus; comment: string }>>(
    Object.fromEntries(INITIAL_TRIGGERS.map(t => [t.id, { status: 'pending', comment: '' }])),
  )

  function setReviewStatus(id: string, reviewStatus: 'approved' | 'rejected') {
    setReviews(prev => ({ ...prev, [id]: { ...prev[id], status: reviewStatus } }))
  }

  function setComment(id: string, comment: string) {
    setReviews(prev => ({ ...prev, [id]: { ...prev[id], comment } }))
  }

  function startEdit(trigger: LLMTrigger) {
    setEditingId(trigger.id)
    setEditForm({ ...trigger })
  }

  function saveEdit() {
    if (!editForm) return
    setTriggers(prev => prev.map(t => (t.id === editForm.id ? editForm : t)))
    setEditingId(null)
    setEditForm(null)
  }

  if (status === 'loading') {
    return <div className="flex items-center justify-center h-64 text-[#EAF2F7]/30 text-sm">Loading…</div>
  }

  return (
    <>
      <Head><title>Trigger Review — Admin</title></Head>

      <div className="flex-1 p-6 pb-32">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Trigger <span className="text-[#38AECC]">Review</span></h1>
          <p className="text-[#EAF2F7]/50 text-[10px] uppercase tracking-widest font-bold">Internal Tool · LLM Generated</p>
        </div>

        <div className="space-y-6">
          {triggers.map(trigger => {
            const review = reviews[trigger.id]
            const isEditing = editingId === trigger.id

            return (
              <div
                key={trigger.id}
                className={`bg-[#183446] border rounded-2xl p-5 transition-all ${
                  review.status === 'approved' ? 'border-green-500/50' :
                  review.status === 'rejected' ? 'border-red-500/50' :
                  isEditing ? 'border-[#38AECC]/50 shadow-lg shadow-cyan-950/20' :
                  'border-[#046E8F]/20'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-[#022F40] text-[#38AECC] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#38AECC]/20">
                    {trigger.ticker}
                  </span>
                  <div className="flex items-center gap-3">
                    {!isEditing && (
                      <button onClick={() => startEdit(trigger)} className="p-1.5 text-[#EAF2F7]/20 hover:text-[#38AECC] transition-colors">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <div className="flex items-center gap-2 text-[#EAF2F7]/40 text-[10px] font-bold">
                      <Calendar className="w-3 h-3" />
                      {isEditing ? (
                        <input
                          type="text"
                          className="bg-[#022F40] border border-[#183446] rounded px-2 py-0.5 text-[10px] text-[#38AECC] focus:outline-none focus:border-[#38AECC] w-24"
                          value={editForm?.date ?? ''}
                          onChange={e => setEditForm(prev => prev ? { ...prev, date: e.target.value } : null)}
                        />
                      ) : trigger.date}
                    </div>
                  </div>
                </div>

                {isEditing ? (
                  <div className="space-y-3 mb-4">
                    <input
                      type="text"
                      className="w-full bg-[#022F40] border border-[#183446] rounded-xl px-4 py-2 text-sm font-bold text-white focus:outline-none focus:border-[#38AECC]"
                      value={editForm?.headline ?? ''}
                      onChange={e => setEditForm(prev => prev ? { ...prev, headline: e.target.value } : null)}
                    />
                    <textarea
                      className="w-full bg-[#022F40] border border-[#183446] rounded-xl px-4 py-2 text-xs text-[#EAF2F7]/80 focus:outline-none focus:border-[#38AECC] resize-none"
                      rows={3}
                      value={editForm?.text ?? ''}
                      onChange={e => setEditForm(prev => prev ? { ...prev, text: e.target.value } : null)}
                    />
                    <div className="flex gap-2">
                      <button onClick={saveEdit} className="flex-1 bg-[#38AECC] text-[#022F40] py-2 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                        <Save className="w-3 h-3" />Save Changes
                      </button>
                      <button onClick={() => { setEditingId(null); setEditForm(null) }} className="px-4 bg-[#183446] text-[#EAF2F7]/40 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest">
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-white font-bold text-lg mb-2 tracking-tight">{trigger.headline}</h3>
                    <p className="text-[#EAF2F7]/60 text-sm mb-4 leading-relaxed">{trigger.text}</p>
                  </>
                )}

                <div className="space-y-4">
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-[#EAF2F7]/20" />
                    <textarea
                      placeholder="Add internal comment..."
                      className="w-full bg-[#022F40]/50 border border-[#183446] rounded-xl py-3 pl-10 pr-4 text-xs text-[#EAF2F7]/80 focus:outline-none focus:border-[#38AECC] transition-all resize-none"
                      rows={2}
                      value={review.comment}
                      onChange={e => setComment(trigger.id, e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setReviewStatus(trigger.id, 'rejected')}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                        review.status === 'rejected' ? 'bg-red-500 text-white' : 'bg-[#022F40] text-red-500/60 border border-red-500/20 hover:bg-red-500/10'
                      }`}
                    >
                      <X className="w-3 h-3" />Reject
                    </button>
                    <button
                      onClick={() => setReviewStatus(trigger.id, 'approved')}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                        review.status === 'approved' ? 'bg-green-500 text-white' : 'bg-[#022F40] text-green-500/60 border border-green-500/20 hover:bg-green-500/10'
                      }`}
                    >
                      <Check className="w-3 h-3" />Approve
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {triggers.length > 0 && (
          <button className="mt-10 w-full bg-[#38AECC] text-[#022F40] py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-cyan-950/40 active:scale-[0.98] transition-all">
            Submit All Reviews
          </button>
        )}
      </div>
    </>
  )
}
