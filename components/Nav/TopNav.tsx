'use client'

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSidebar } from '@/app/store/uiSlice'
import { RootState } from '@/app/store/store'
import { Menu, CalendarPlus } from 'lucide-react'

export function TopNav() {
  const dispatch = useDispatch()
  const { dateRange } = useSelector((state: RootState) => state.ui)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200">
      <div className="flex items-center justify-between h-16 px-6">
        
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 transition-colors md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu size={22} />
          </button>

          <h1 className="hidden md:block text-lg font-semibold tracking-tight text-zinc-900">
            OpenScholar Control Plane
          </h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-sm text-zinc-500">
            <CalendarPlus size={16} />
            <span>{dateRange.startDate}</span>
            <span>–</span>
            <span>{dateRange.endDate}</span>
          </div>

          <button
            onClick={() => alert('Onboard new tenant functionality')}
            className="px-4 py-2 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
          >
            Onboard Tenant
          </button>
        </div>
      </div>
    </header>
  )
}
