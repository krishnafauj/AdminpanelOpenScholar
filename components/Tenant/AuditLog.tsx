'use client'

const MOCK_LOGS = [
  {
    user: 'admin@openscholar.ai',
    action: 'Enabled Crossref Enrichment',
    time: '2025-02-03 14:32',
  },
  {
    user: 'ops@openscholar.ai',
    action: 'Retried OpenAlex Pipeline',
    time: '2025-02-03 13:11',
  },
]

export function AuditLog() {
  return (
    <div className="space-y-3">
      {MOCK_LOGS.map((log, i) => (
        <div
          key={i}
          className="p-4 border border-zinc-200 rounded-lg"
        >
          <p className="font-medium">{log.action}</p>
          <p className="text-xs text-zinc-500">
            {log.user} • {log.time}
          </p>
        </div>
      ))}
    </div>
  )
}
