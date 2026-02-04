'use client'

import { Building2, Copy, ShieldCheck } from 'lucide-react'
import { RoleBadge } from './RoleBadge'

type Props = {
  name: string
  id: string
  domain: string
  environment: string
  status: 'active' | 'locked' | 'suspended'
  role?: 'admin' | 'ops' | 'read-only'
}

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  locked: 'bg-yellow-100 text-yellow-700',
  suspended: 'bg-red-100 text-red-700',
}

export function TenantHeader({
  name,
  id,
  domain,
  environment,
  status,
  role = 'admin',
}: Props) {
  const copyId = () => {
    navigator.clipboard.writeText(id)
  }

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <Building2 className="w-6 h-6 text-blue-600" />
          {name}
        </h1>

        <p className="text-sm text-zinc-500 mt-1">
          {domain} • {environment.toUpperCase()}
        </p>

        <div className="flex items-center gap-3 mt-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[status]}`}
          >
            {status.toUpperCase()}
          </span>

          <RoleBadge role={role} />

          <button
            onClick={copyId}
            className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900"
          >
            <Copy className="w-3 h-3" />
            {id}
          </button>
        </div>
      </div>

      <ShieldCheck className="w-6 h-6 text-zinc-400" />
    </div>
  )
}
