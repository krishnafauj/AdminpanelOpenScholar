'use client'

import { useState, useMemo } from 'react'
import { Settings, Globe, Server, Save } from 'lucide-react'
import { ConfigDiffViewer } from '@/components/Tenant/ConfigDiffViewer'

type Env = 'development' | 'staging' | 'production'

export function TenantConfigPanel({
  domain,
  environment,
  onDomainChange,
  onEnvironmentChange,
  onSave,
}: {
  domain: string
  environment: Env
  onDomainChange: (value: string) => void
  onEnvironmentChange: (env: Env) => void
  onSave: () => void
}) {
  const [draftDomain, setDraftDomain] = useState(domain)
  const [draftEnv, setDraftEnv] = useState<Env>(environment)

  const hasChanges = useMemo(() => {
    return (
      draftDomain !== domain ||
      draftEnv !== environment
    )
  }, [draftDomain, draftEnv, domain, environment])

  const before = useMemo(
    () => ({
      domain,
      environment,
    }),
    [domain, environment]
  )

  const after = useMemo(
    () => ({
      domain: draftDomain,
      environment: draftEnv,
    }),
    [draftDomain, draftEnv]
  )

  const handleSave = () => {
    onDomainChange(draftDomain)
    onEnvironmentChange(draftEnv)
    onSave()
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6 space-y-6">
      <h2 className="font-semibold flex items-center gap-2">
        <Settings className="w-5 h-5" />
        Tenant Configuration
      </h2>

      {/* Domain */}
      <div>
        <label className="text-sm font-medium flex items-center gap-2">
          <Globe className="w-4 h-4" />
          Domain
        </label>
        <input
          value={draftDomain}
          onChange={(e) =>
            setDraftDomain(e.target.value)
          }
          className="mt-1 w-full border border-zinc-200 rounded-md px-3 py-2"
        />
      </div>

      {/* Environment */}
      <div>
        <label className="text-sm font-medium flex items-center gap-2">
          <Server className="w-4 h-4" />
          Environment
        </label>
        <select
          value={draftEnv}
          onChange={(e) =>
            setDraftEnv(
              e.target.value as Env
            )
          }
          className="mt-1 w-full border border-zinc-200 rounded-md px-3 py-2"
        >
          <option value="development">
            Development
          </option>
          <option value="staging">
            Staging
          </option>
          <option value="production">
            Production
          </option>
        </select>
      </div>

      {/* Diff Preview */}
      {hasChanges && (
        <ConfigDiffViewer
          before={before}
          after={after}
        />
      )}

      {/* Save Button */}
      <button
        disabled={!hasChanges}
        onClick={handleSave}
        className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
          hasChanges
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-zinc-200 text-zinc-500 cursor-not-allowed'
        }`}
      >
        <Save className="w-4 h-4" />
        Save Configuration
      </button>
    </div>
  )
}
