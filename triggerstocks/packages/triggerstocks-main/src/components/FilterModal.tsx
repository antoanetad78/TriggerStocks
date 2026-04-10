import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'
import {
  X, ChevronDown, ChevronUp, Search, User, Check,
  Info, Mail, ShieldCheck, Newspaper, Lock,
} from 'lucide-react'
import { MOCK_TRIGGERS } from '../lib/mockData'
import { RocketIcon } from './RocketIcon'

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
}

type Filters = { year: string; halfYear: string; quarter: string; month: string }

const YEARS = (() => {
  const y = new Date().getFullYear()
  return [y - 2, y - 1, y, y + 1, y + 2].sort((a, b) => b - a)
})()

const HALF_YEARS = ['H1', 'H2']
const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4']
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function FilterModal({ isOpen, onClose }: FilterModalProps) {
  const router = useRouter()
  const { data: session } = useSession()

  const [stockSearch, setStockSearch] = useState('')
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const [filters, setFilters] = useState<Filters>({ year: '', halfYear: '', quarter: '', month: '' })

  const suggestions = useMemo(() => {
    if (!stockSearch.trim()) return []
    const q = stockSearch.toLowerCase()
    const seen = new Set<string>()
    return MOCK_TRIGGERS.filter(
      t =>
        (t.company.name.toLowerCase().includes(q) || t.company.ticker.toLowerCase().includes(q)) &&
        !seen.has(t.company._id) &&
        seen.add(t.company._id),
    )
      .slice(0, 5)
      .map(t => ({ name: t.company.name, ticker: t.company.ticker, id: t.company._id }))
  }, [stockSearch])

  function navigate(path: string) {
    onClose()
    router.push(path)
  }

  function toggleSection(id: string) {
    setExpandedSection(prev => (prev === id ? null : id))
  }

  function toggleFilter(key: keyof Filters, value: string) {
    setFilters(prev => ({ ...prev, [key]: prev[key] === value ? '' : value }))
  }

  function reset() {
    setFilters({ year: '', halfYear: '', quarter: '', month: '' })
    setStockSearch('')
  }

  const filterSections = [
    { id: 'year',     label: 'By Year',        options: YEARS.map(String) },
    { id: 'halfYear', label: 'Half Year (H)',   options: HALF_YEARS },
    { id: 'quarter',  label: 'Quarter (Q)',     options: QUARTERS },
    { id: 'month',    label: 'Specific Month',  options: MONTHS },
  ] as const

  const currentPath = router.pathname + (router.asPath.includes('?') ? router.asPath.slice(router.asPath.indexOf('?')) : '')

  const exploreLinks = [
    { icon: User,       label: 'My Profile',          path: session ? '/profile' : `/login?callbackUrl=${encodeURIComponent(currentPath)}` },
    { icon: Info,       label: 'About Trigger Stocks', path: '/about' },
    { icon: Mail,       label: 'Contact Support',      path: '/contact' },
    { icon: Newspaper,  label: 'Newsletter Signup',    path: '/newsletter' },
    { icon: ShieldCheck,label: 'Privacy & Terms',      path: '/privacy' },
    { icon: Lock,       label: 'Admin Panel',          path: '/admin/triggers' },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-y-0 left-0 right-0 mx-auto w-full max-w-lg z-[100] bg-[#022F40] flex flex-col animate-in slide-in-from-right duration-300 shadow-2xl border-x border-[#183446]">
      {/* Header */}
      <div className="bg-[#022F40]/90 backdrop-blur-md h-16 flex items-center justify-between px-6 flex-shrink-0 border-b border-[#183446]">
        <div className="flex items-center gap-2">
          <RocketIcon className="w-9 h-9" />
          <span className="font-bold text-lg tracking-tight uppercase text-[#EAF2F7]">Menu</span>
        </div>
        <button onClick={onClose} className="p-2 text-[#EAF2F7]/60 hover:text-white transition-colors" aria-label="Close menu">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-8 pt-12 pb-20 no-scrollbar">
        {/* Account CTA */}
        <div className="mb-12">
          {session ? (
            <div className="bg-[#183446]/40 border border-[#046E8F]/20 rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#38AECC]/10 border border-[#38AECC]/30 flex items-center justify-center">
                <User className="w-6 h-6 text-[#38AECC]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-white text-sm truncate">{session.user?.name}</p>
                <p className="text-xs text-[#EAF2F7]/40 truncate">{session.user?.email}</p>
              </div>
              <button
                onClick={() => { signOut({ callbackUrl: '/' }); onClose() }}
                className="text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="w-full relative group overflow-hidden bg-gradient-to-br from-[#38AECC] to-[#0090C1] rounded-2xl p-0.5 active:scale-[0.98] transition-all shadow-[0_20px_50px_rgba(0,144,193,0.3)]"
            >
              <div className="bg-[#183446]/10 backdrop-blur-sm rounded-[14px] p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-lg font-bold text-white tracking-tight">Sign In or Join</p>
                  <p className="text-xs text-white/70 font-medium">Follow companies and get alerts</p>
                </div>
                <ChevronDown className="-rotate-90 w-4 h-4 text-white" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
          )}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#EAF2F7]/20 whitespace-nowrap">Filter</span>
          <div className="h-[1px] flex-1 bg-[#183446]" />
        </div>

        <div className="space-y-6 mb-12">
          {/* Ticker search */}
          <div className="relative group">
            <div className="bg-[#183446] border border-[#046E8F]/20 rounded-xl flex items-center px-4 h-14 focus-within:border-[#38AECC] focus-within:ring-2 focus-within:ring-[#38AECC]/10 transition-all">
              <Search className="w-5 h-5 text-[#EAF2F7]/20 group-focus-within:text-[#38AECC] transition-colors flex-shrink-0" />
              <input
                type="text"
                placeholder="Find a specific ticker..."
                value={stockSearch}
                onChange={e => setStockSearch(e.target.value)}
                className="bg-transparent w-full px-3 text-sm outline-none text-white font-medium placeholder:text-[#EAF2F7]/20"
              />
            </div>
            {suggestions.length > 0 && (
              <div className="absolute top-16 left-0 right-0 bg-[#183446] shadow-2xl rounded-xl z-20 border border-[#046E8F]/20 overflow-hidden">
                {suggestions.map(s => (
                  <button
                    key={s.id}
                    onClick={() => { setStockSearch(`${s.name} (${s.ticker})`); navigate(`/company/${s.id}`) }}
                    className="w-full text-left px-5 py-4 text-sm hover:bg-[#022F40] border-b border-[#022F40] last:border-0 text-[#EAF2F7]/80 font-bold"
                  >
                    {s.name}
                    <span className="ml-2 text-[10px] text-[#38AECC] font-black uppercase tracking-widest">{s.ticker}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Collapsible filter sections */}
          {filterSections.map(section => {
            const selected = filters[section.id as keyof Filters]
            const expanded = expandedSection === section.id
            return (
              <div key={section.id} className="bg-[#183446]/40 rounded-xl border border-[#183446]">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full h-14 flex items-center justify-between px-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#EAF2F7]/60"
                >
                  <div className="flex items-center gap-2">
                    <span className={selected ? 'text-[#38AECC]' : ''}>{section.label}</span>
                    {selected && (
                      <span className="text-[10px] font-black text-[#38AECC] bg-[#38AECC]/10 px-2 py-0.5 rounded">
                        {selected}
                      </span>
                    )}
                  </div>
                  {expanded
                    ? <ChevronUp className="w-4 h-4 text-[#38AECC]" />
                    : <ChevronDown className="w-4 h-4" />}
                </button>
                {expanded && (
                  <div className="p-3 pt-0 grid grid-cols-2 gap-2">
                    {section.options.map(opt => {
                      const active = selected === String(opt)
                      return (
                        <button
                          key={opt}
                          onClick={() => toggleFilter(section.id as keyof Filters, String(opt))}
                          className={`px-4 py-3 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
                            active
                              ? 'bg-[#38AECC] text-[#022F40]'
                              : 'bg-[#022F40]/50 text-[#EAF2F7]/40 border border-[#183446]'
                          }`}
                        >
                          {opt}
                          {active && <Check className="w-3 h-3" />}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}

          <div className="flex gap-3 mt-8">
            <button
              onClick={reset}
              className="flex-1 h-14 rounded-xl border border-[#183446] text-[#EAF2F7]/60 font-bold uppercase tracking-widest text-[10px] hover:bg-[#183446]/40 transition-all"
            >
              Reset
            </button>
            <button
              onClick={onClose}
              className="flex-1 h-14 rounded-xl bg-[#38AECC] text-[#022F40] font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-cyan-900/20 active:scale-[0.98] transition-all"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Explore */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#EAF2F7]/20 whitespace-nowrap">Explore</span>
          <div className="h-[1px] flex-1 bg-[#183446]" />
        </div>

        <div className="space-y-3">
          {exploreLinks.map(({ icon: Icon, label, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="w-full flex items-center justify-between px-6 py-5 bg-[#183446]/20 border border-[#183446]/30 rounded-2xl hover:bg-[#183446]/40 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Icon className="w-5 h-5 text-[#38AECC]" />
                <span className="text-sm font-bold text-[#EAF2F7]/80 uppercase tracking-widest">{label}</span>
              </div>
              <ChevronDown className="-rotate-90 w-4 h-4 text-[#EAF2F7]/20" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterModal
