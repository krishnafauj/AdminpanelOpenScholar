'use client'

import React, { useState } from 'react'
import {
  PlusCircle,
  ChevronRight,
  ChevronLeft,
  Dna,
  LayoutDashboard,
  Building2,
  GitMerge,
  BarChart3,
  Activity,
  FileText,
} from 'lucide-react'
import { useUI } from '@/context/UiContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const { toggleDna, openMain } = useUI()
  const [isExpanded, setIsExpanded] = useState(false)
  const pathname = usePathname()

  const menuItems = [
    {
      icon: <LayoutDashboard />,
      label: 'Dashboard',
      href: '/',
      color: 'text-sky-600',
    },
    {
      icon: <Building2 />,
      label: 'Tenants',
      href: '/tenants',
      color: 'text-violet-600',
    },
    {
      icon: <GitMerge />,
      label: 'Ingestion',
      href: '/ingestion',
      color: 'text-pink-600',
    },
    {
      icon: <BarChart3 />,
      label: 'Analytics',
      href: '/analytics',
      color: 'text-orange-600',
    },
    {
      icon: <Activity />,
      label: 'Health',
      href: '/health',
      color: 'text-emerald-600',
    },
    {
      icon: <FileText />,
      label: 'Logs',
      href: '/logs',
      color: 'text-blue-600',
    },
  ]

  return (
    <aside
      className={`h-[100dvh] bg-white flex flex-col py-5 gap-6 border-r border-zinc-200 shrink-0 z-50 transition-[width] duration-300 ease-in-out ${isExpanded ? 'w-[240px]' : 'w-[84px]'
        }`}
    >
      {/* --- Header --- */}
      <div
        className={`flex items-center transition-all ${isExpanded ? 'px-6 justify-between' : 'justify-center'
          }`}
      >
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="relative w-4 h-4">
            {/* Ping ring */}
            <span className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 opacity-70 animate-ping" />

            {/* Glow */}
            <span className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 blur-md opacity-60" />

            {/* Core dot */}
            <span className="absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500" />
          </div>
        </div>



        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-zinc-500 hover:text-zinc-900 transition-colors p-1"
        >
          {isExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* --- Create New --- */}
      <nav className="flex flex-col gap-2 w-full px-3">
        <NavItem
          icon={<PlusCircle size={24} />}
          label="Create New"
          isExpanded={isExpanded}
          onClick={openMain}
          active
          color="text-zinc-900"
        />

        <div className="h-px bg-zinc-200 w-full my-2" />

        {menuItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isExpanded={isExpanded}
              active={isActive}
              color={item.color}
            />
          )
        })}
      </nav>

      {/* --- DNA Button --- */}
      <div className="mt-auto px-3">
        <button
          onClick={toggleDna}
          className={`group flex items-center bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 hover:border-zinc-300 rounded-xl transition-all duration-300 overflow-hidden ${isExpanded
            ? 'w-full h-[56px] px-4 gap-3'
            : 'w-[60px] h-[45px] justify-center mx-auto'
            }`}
        >
          <Dna className="shrink-0 text-zinc-900" size={20} />
          <span
            className={`text-zinc-900 font-bold tracking-wide uppercase whitespace-nowrap transition-opacity duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'
              }`}
          >
            DNA Mode
          </span>
        </button>
      </div>
    </aside>
  )
}

/* ----------------------------- */
/* Nav Item                    */
/* ----------------------------- */

type NavItemProps = {
  icon: React.ReactNode
  label: string
  isExpanded: boolean
  onClick?: () => void
  href?: string
  active?: boolean
  color?: string
}

function NavItem({
  icon,
  label,
  isExpanded,
  onClick,
  href,
  active = false,
  color = 'text-zinc-900',
}: NavItemProps) {
  const content = (
    <div
      className={`flex items-center w-full group rounded-lg transition-all duration-200 ${isExpanded
        ? 'h-12 px-4 justify-start gap-4'
        : 'h-12 w-full justify-center'
        } ${active
          ? 'bg-zinc-100 border border-zinc-200'
          : 'hover:bg-zinc-50 border border-transparent'
        }`}
    >
      {/* Icon */}
      <span
        className={`shrink-0 transition-colors ${active
          ? color
          : 'text-zinc-500 group-hover:text-zinc-900'
          }`}
      >
        {React.cloneElement(icon as React.ReactElement, {
          size: 22,
          strokeWidth: active ? 2.5 : 2,
        })}
      </span>

      {/* Label */}
      <span
        className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${active
          ? 'text-zinc-900'
          : 'text-zinc-600 group-hover:text-zinc-900'
          } ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}
      >
        {label}
      </span>
    </div>
  )

  if (href) {
    return (
      <Link href={href} title={!isExpanded ? label : undefined}>
        {content}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      title={!isExpanded ? label : undefined}
      className="w-full"
    >
      {content}
    </button>
  )
}
