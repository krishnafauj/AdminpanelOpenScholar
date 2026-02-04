'use client'

import { Lock, RefreshCcw, Key, Trash2 } from 'lucide-react'

export function TenantActions({
  onLock,
  onDisablePipelines,
  onRotateKeys,
  onDelete,
}: {
  onLock: () => void
  onDisablePipelines: () => void
  onRotateKeys: () => void
  onDelete: () => void
}) {
  return (
    <div className="bg-white border border-red-200 rounded-xl p-6">
      <h2 className="font-semibold mb-4 text-red-600 flex items-center gap-2">
        <Trash2 className="w-5 h-5" />
        Danger Zone
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={onLock}
          className="flex items-center gap-2 px-4 py-3 border border-zinc-300 rounded-lg hover:bg-zinc-100"
        >
          <Lock className="w-4 h-4" />
          Lock Tenant
        </button>

        <button
          onClick={onDisablePipelines}
          className="flex items-center gap-2 px-4 py-3 border border-zinc-300 rounded-lg hover:bg-zinc-100"
        >
          <RefreshCcw className="w-4 h-4" />
          Disable Pipelines
        </button>

        <button
          onClick={onRotateKeys}
          className="flex items-center gap-2 px-4 py-3 border border-zinc-300 rounded-lg hover:bg-zinc-100"
        >
          <Key className="w-4 h-4" />
          Rotate API Keys
        </button>

        <button
          onClick={onDelete}
          className="flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <Trash2 className="w-4 h-4" />
          Delete Tenant
        </button>
      </div>
    </div>
  )
}
