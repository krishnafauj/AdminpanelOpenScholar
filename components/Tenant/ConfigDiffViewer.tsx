'use client'

export function ConfigDiffViewer({
  before,
  after,
}: {
  before: Record<string, any>
  after: Record<string, any>
}) {
  const keys = Array.from(
    new Set([...Object.keys(before), ...Object.keys(after)])
  )

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6">
      <h2 className="font-semibold mb-4">
        Configuration Changes
      </h2>

      <div className="space-y-2 font-mono text-sm">
        {keys.map((key) => {
          const b = before[key]
          const a = after[key]

          if (b === a) return null

          return (
            <div key={key} className="flex gap-4">
              <span className="w-32 text-zinc-500">
                {key}
              </span>
              <span className="text-red-600">
                {JSON.stringify(b)}
              </span>
              <span className="text-zinc-400">→</span>
              <span className="text-green-600">
                {JSON.stringify(a)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
