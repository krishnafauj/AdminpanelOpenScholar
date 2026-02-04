'use client'

const MOCK_ERRORS = [
  {
    level: 'error',
    message: 'Scopus API timeout',
    time: '2025-02-03 11:21',
  },
  {
    level: 'warning',
    message: 'Crossref rate limit hit',
    time: '2025-02-02 19:02',
  },
]

export function ErrorTimeline() {
  return (
    <div className="space-y-3">
      {MOCK_ERRORS.map((e, i) => (
        <div
          key={i}
          className={`p-4 border rounded-lg ${
            e.level === 'error'
              ? 'border-red-200 bg-red-50'
              : 'border-yellow-200 bg-yellow-50'
          }`}
        >
          <p className="font-medium">{e.message}</p>
          <p className="text-xs text-zinc-500">{e.time}</p>
        </div>
      ))}
    </div>
  )
}
