import React from 'react'
import { useRouter } from 'next/router'
import { Home, Zap, Filter, Trophy } from 'lucide-react'

interface BottomNavProps {
  onFilter: () => void
}

export function BottomNav({ onFilter }: BottomNavProps) {
  const router = useRouter()

  function goHome() {
    if (router.pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
    else router.push('/')
  }

  function goTriggers() {
    if (router.pathname === '/') {
      document.getElementById('feed')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/#feed')
    }
  }

  function goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const items = [
    { icon: Home,   label: 'Home',     action: goHome },
    { icon: Zap,    label: 'Triggers', action: goTriggers },
    { icon: Filter, label: 'Filter',   action: onFilter },
    { icon: Trophy, label: 'Top',      action: goTop },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-[#183446] border-t border-[#046E8F]/30 h-14 flex items-center justify-around z-50">
      {items.map(({ icon: Icon, label, action }) => (
        <button
          key={label}
          onClick={action}
          className="flex flex-col items-center gap-0.5 p-1 text-[#EAF2F7]/70 hover:text-[#38AECC] transition-colors"
        >
          <Icon className="w-4 h-4" />
          <span className="text-[9px] uppercase font-bold tracking-tighter">{label}</span>
        </button>
      ))}
    </nav>
  )
}

export default BottomNav
