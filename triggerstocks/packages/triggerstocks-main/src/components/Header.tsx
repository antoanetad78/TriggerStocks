import React from 'react'
import { useRouter } from 'next/router'
import { Menu, ChevronLeft } from 'lucide-react'
import { RocketIcon } from './RocketIcon'

const PAGE_TITLES: Record<string, string> = {
  '/login': 'Back',
  '/profile': 'My Profile',
  '/profile/edit': 'Edit Profile',
  '/about': 'About',
  '/contact': 'Contact',
  '/privacy': 'Privacy & Terms',
  '/newsletter': 'Newsletter',
  '/why-trigger-stocks': 'Why Trigger Stocks',
  '/what-is-a-trigger': 'What is a Trigger',
  '/admin/triggers': 'Admin',
  '/admin/review': 'Review Triggers',
}

interface HeaderProps {
  onOpenFilter: () => void
}

export function Header({ onOpenFilter }: HeaderProps) {
  const router = useRouter()
  const isHome = router.pathname === '/'
  const title = PAGE_TITLES[router.pathname] ?? 'Back'

  return (
    <header className="sticky top-0 z-40 bg-[#022F40]/90 backdrop-blur-sm px-4 h-16 flex items-center justify-between border-b border-[#183446]">
      {isHome ? (
        <div className="flex items-center gap-2">
          <RocketIcon className="w-9 h-9" />
          <span className="font-bold text-lg tracking-tight uppercase text-[#EAF2F7]">
            Trigger Stocks
          </span>
        </div>
      ) : (
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#EAF2F7] hover:text-[#38AECC] transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
          <span className="font-bold uppercase tracking-tight text-sm">{title}</span>
        </button>
      )}

      <button
        className="p-2 text-[#EAF2F7] hover:text-[#38AECC] transition-colors"
        onClick={onOpenFilter}
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>
    </header>
  )
}

export default Header
