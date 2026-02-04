'use client'

import { Settings, Globe, Server } from 'lucide-react'

export function TenantConfigPanel({
  domain,
  environment,
  onDomainChange,
  onEnvironmentChange,
  onSave,
}: {
  domain: string
  environment: 'development' | 'staging' | 'production'
  onDomainChange: (value: string) => void
  onEnvironmentChange: (
    env: 'development' | 'staging' | 'production'
  ) => void
  onSave: () => void
}) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-4">
      <h2 className="font-semibold flex items-center gap-2">
        <Settings className="w-5 h-5" />
        Tenant Configuration
      </h2>

      <div>
        <label className="text-sm font-medium flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Domain
        </label>
        <input
          defaultValue={domain}
          onChange={(e) => onDomainChange(e.target.value)}
          className="mt-1 w-full border border-zinc-200 rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="text-sm font-medium flex items-center gap-2">
          <Server className="w-4 h-4" />
          Environment
        </label>
        <select
          defaultValue={environment}
          onChange={(e) =>
            onEnvironmentChange(
              e.target.value as
                | 'development'
                | 'staging'
                | 'production'
            )
          }
          className="mt-1 w-full border border-zinc-200 rounded-md px-3 py-2"
        >
          <option value="development">Development</option>
          <option value="staging">Staging</option>
          <option value="production">Production</option>
        </select>
      </div>

      <button
        onClick={onSave}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Save Configuration
      </button>
    </div>
  )
}
