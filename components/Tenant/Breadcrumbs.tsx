'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[]
}) {
  return (
    <nav className="flex items-center text-sm text-zinc-500 gap-1">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-zinc-900"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-zinc-900 font-medium">
              {item.label}
            </span>
          )}

          {i < items.length - 1 && (
            <ChevronRight className="w-4 h-4" />
          )}
        </span>
      ))}
    </nav>
  )
}
