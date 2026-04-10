import React, { useState, ReactNode } from 'react'
import { Header } from './Header'
import { BottomNav } from './BottomNav'
import { FilterModal } from './FilterModal'

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [filterOpen, setFilterOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#022F40] text-[#EAF2F7] max-w-lg mx-auto shadow-xl ring-1 ring-[#183446]">
      <Header onOpenFilter={() => setFilterOpen(true)} />
      <main className="pb-20">{children}</main>
      <BottomNav onFilter={() => setFilterOpen(true)} />
      <FilterModal isOpen={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  )
}

export default Layout
