'use client'

import { Database, RefreshCcw } from 'lucide-react'

export function SourcesTable({
  sources,
}: {
  sources: {
    source: string
    status: string
    records: number
  }[]
}) {
  return (
    <div className="space-y-3">
      {sources.map((s) => (
        <div
          key={s.source}
          className="flex justify-between items-center p-4 border border-zinc-200 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <Database className="w-4 h-4 text-zinc-500" />
            <div>
              <p className="font-medium">{s.source}</p>
              <p className="text-xs text-zinc-500">
                Records: {s.records.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`text-sm font-semibold ${
                s.status === 'success'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {s.status.toUpperCase()}
            </span>

            <button className="flex items-center gap-2 px-3 py-1 border border-zinc-300 rounded-md hover:bg-zinc-100">
              <RefreshCcw className="w-4 h-4" />
              Retry
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
