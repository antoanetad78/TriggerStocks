import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { Trigger } from '../types'
import { TriggerCard } from './TriggerCard'

interface TriggerFeedProps {
  triggers: Trigger[]
}

export function TriggerFeed({ triggers }: TriggerFeedProps) {
  const [search, setSearch] = useState('')

  const filtered = search.trim()
    ? triggers.filter(
        t =>
          t.company.ticker.toLowerCase().includes(search.toLowerCase()) ||
          t.company.name.toLowerCase().includes(search.toLowerCase()),
      )
    : triggers

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="relative group px-1">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Search className="w-5 h-5 text-[#EAF2F7]/20 group-focus-within:text-[#38AECC] transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search by ticker or company"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-[#183446] border border-[#046E8F]/20 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#38AECC] transition-all shadow-inner placeholder:text-[#EAF2F7]/30"
        />
      </div>

      {/* Cards */}
      <div className="space-y-4 px-1">
        {filtered.length > 0 ? (
          filtered.map(trigger => <TriggerCard key={trigger._id} trigger={trigger} />)
        ) : (
          <div className="text-center py-20 px-6">
            <div className="w-16 h-16 bg-[#183446] rounded-full flex items-center justify-center mx-auto mb-4 opacity-20">
              <Search className="w-8 h-8" />
            </div>
            <p className="text-[#EAF2F7]/40 italic text-sm font-medium">
              No triggers found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TriggerFeed
