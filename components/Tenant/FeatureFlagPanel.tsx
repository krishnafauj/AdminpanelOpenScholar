'use client'

import { ToggleLeft, ToggleRight } from 'lucide-react'

type Feature = {
  name: string
  enabled: boolean
}

export function FeatureFlagPanel({
  features,
  onToggle,
}: {
  features: Feature[]
  onToggle: (name: string, enabled: boolean) => void
}) {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 p-6">
      <h2 className="font-semibold mb-4 flex items-center gap-2">
        <ToggleLeft className="w-5 h-5" />
        Feature Flags
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((f) => (
          <button
            key={f.name}
            onClick={() => onToggle(f.name, !f.enabled)}
            className="flex justify-between items-center p-4 border border-zinc-200 rounded-lg hover:bg-zinc-50 transition"
          >
            <span className="font-medium">{f.name}</span>
            {f.enabled ? (
              <ToggleRight className="text-green-600" />
            ) : (
              <ToggleLeft className="text-zinc-400" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
