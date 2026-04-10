import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { ChevronDown, ChevronUp, ExternalLink, Briefcase, Calendar } from 'lucide-react'
import { Trigger } from '../types'
import { statusLabel, statusColors, typeLabel, formatDate } from '../lib/helpers'

interface TriggerCardProps {
  trigger: Trigger
  hideCompany?: boolean
}

export function TriggerCard({ trigger, hideCompany = false }: TriggerCardProps) {
  const [expanded, setExpanded] = useState(false)
  const router = useRouter()

  const statusCls = statusColors(trigger.status)
  const dateLabel = trigger.type === 'expected_update' ? 'Update' : 'Expected'
  const dateValue = trigger.type === 'expected_update'
    ? formatDate(trigger.dates.dateExpectedUpdate)
    : formatDate(trigger.dates.dateExpected)

  function goToCompany(e: React.MouseEvent) {
    e.stopPropagation()
    router.push(`/company/${trigger.company._id}`)
  }

  return (
    <div
      className={`group bg-[#183446]/40 border border-[#046E8F]/10 rounded-2xl transition-all duration-300 overflow-hidden shadow-lg ${
        expanded ? 'bg-[#183446]/60 border-[#38AECC]/30 ring-1 ring-[#38AECC]/10' : 'active:scale-[0.98]'
      }`}
    >
      <button
        onClick={() => setExpanded(v => !v)}
        className="w-full text-left p-5 focus:outline-none"
        aria-expanded={expanded}
      >
        <div className="flex flex-col gap-2.5">
          {/* Title row */}
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-bold text-[12px] text-white/90 leading-snug tracking-tight">
              {trigger.title}
            </h3>
            <div className={`flex-shrink-0 p-1.5 rounded-lg transition-colors ${expanded ? 'bg-[#38AECC]/10' : 'bg-transparent'}`}>
              {expanded
                ? <ChevronUp className="w-4 h-4 text-[#38AECC]" />
                : <ChevronDown className="w-4 h-4 text-[#EAF2F7]/20" />}
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {!hideCompany && (
              <span className="text-[11px] font-medium text-[#EAF2F7]/50 tracking-wide">
                {trigger.company.name}
              </span>
            )}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-[#38AECC]/80 uppercase tracking-widest">
                {trigger.company.ticker}
              </span>
              <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border ${statusCls}`}>
                {statusLabel(trigger.status)}
              </span>
              {trigger.type === 'expected_update' && (
                <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border text-[#38AECC] bg-[#38AECC]/10 border-[#38AECC]/20">
                  {typeLabel(trigger.type)}
                </span>
              )}
            </div>
          </div>

          {/* Date row */}
          <div className="flex items-center gap-4 pt-2 border-t border-[#183446]/20">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#EAF2F7]/30" />
              <span className="text-[11px] font-bold text-[#EAF2F7]/40 uppercase tracking-widest">
                {dateLabel}:{' '}
                <span className="text-[#EAF2F7]/80 ml-1">{dateValue}</span>
              </span>
            </div>
          </div>
        </div>
      </button>

      {/* Expanded content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          expanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-5 pb-6 pt-2 space-y-5">
          <div className="h-[1px] w-full bg-[#183446]" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[9px] font-black text-[#EAF2F7]/20 uppercase tracking-[0.2em] mb-1">Added to feed</p>
              <p className="text-xs font-bold text-[#EAF2F7]/60">{formatDate(trigger.dates.dateAdded)}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] font-black text-[#EAF2F7]/20 uppercase tracking-[0.2em] mb-1">Price at Added</p>
              <p className="text-xs font-bold text-[#38AECC]">
                {trigger.prices.priceAtAdded.toFixed(2)} {trigger.company.currency}
              </p>
            </div>
          </div>

          <div className="bg-[#022F40]/50 rounded-xl p-4">
            <p className="text-sm leading-relaxed text-[#EAF2F7]/80 whitespace-pre-wrap">{trigger.summary}</p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-4">
              {!hideCompany && (
                <button
                  onClick={goToCompany}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#EAF2F7]/40 hover:text-[#38AECC] transition-colors"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  Company
                </button>
              )}
              <span className="text-[10px] font-black uppercase tracking-widest text-[#EAF2F7]/30">
                {trigger.company.market}
              </span>
            </div>

            {trigger.source && (
              <a
                href={trigger.source.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-2 px-4 py-2 bg-[#38AECC]/10 border border-[#38AECC]/20 rounded-lg text-[10px] font-black uppercase tracking-widest text-[#38AECC] hover:bg-[#38AECC]/20 transition-all"
              >
                {trigger.source.text}
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TriggerCard
