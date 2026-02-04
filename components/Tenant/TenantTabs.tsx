'use client'

import { useState, ReactNode } from 'react'

export function TenantTabs({
  tabs,
}: {
  tabs: { label: string; content: ReactNode }[]
}) {
  const [active, setActive] = useState(0)

  return (
    <div className="bg-white border border-zinc-200 rounded-xl">
      <div className="flex border-b border-zinc-200">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActive(i)}
            className={`px-5 py-3 text-sm font-medium ${
              i === active
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">{tabs[active].content}</div>
    </div>
  )
}
