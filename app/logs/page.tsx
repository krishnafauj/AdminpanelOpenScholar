'use client'

import { useMemo, useState } from 'react'
import {
  FileText,
  Search,
  AlertTriangle,
  Info,
  Bug,
} from 'lucide-react'

import { DataTable } from '@/components/Data/DataTable'
import type { ReactNode } from 'react'
// ------------------
// MOCK LOG DATA
// ------------------
import type { LucideIcon } from 'lucide-react'
const LOGS = [
  {
    id: 1,
    timestamp: '2025-02-01 14:32:11',
    level: 'error',
    service: 'Ingestion Pipeline',
    tenant: 'Harvard University',
    message: 'Failed to fetch records from Scopus',
  },
  {
    id: 2,
    timestamp: '2025-02-01 14:31:04',
    level: 'warn',
    service: 'API Gateway',
    tenant: 'MIT',
    message: 'High latency detected (>400ms)',
  },
  {
    id: 3,
    timestamp: '2025-02-01 14:30:21',
    level: 'info',
    service: 'Auth Service',
    tenant: 'System',
    message: 'Token refresh successful',
  },
  {
    id: 4,
    timestamp: '2025-02-01 14:29:02',
    level: 'debug',
    service: 'Search Index',
    tenant: 'Stanford',
    message: 'Index refresh completed',
  },
]

// ------------------
// TABLE CONFIG
// ------------------

const COLUMNS = [
  { key: 'timestamp', label: 'Timestamp' },
  { key: 'level', label: 'Level' },
  { key: 'service', label: 'Service' },
  { key: 'tenant', label: 'Tenant' },
  { key: 'message', label: 'Message' },
]

// ------------------
// BADGES
// ------------------

const LEVEL_COLORS: Record<string, string> = {
  error: 'bg-red-100 text-red-700',
  warn: 'bg-yellow-100 text-yellow-700',
  info: 'bg-blue-100 text-blue-700',
  debug: 'bg-zinc-100 text-zinc-700',
}
const LEVEL_ICONS: Record<string, LucideIcon> = {
  error: AlertTriangle,
  warn: Bug,
  info: Info,
  debug: FileText,
}

function LevelBadge({ level }: { level: string }) {
  const Icon = LEVEL_ICONS[level]
  const color =
    LEVEL_COLORS[level] || 'bg-zinc-100 text-zinc-700'

  return (
    <span
      className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${color}`}
    >
     <Icon size={22} strokeWidth={2} />
      {level.toUpperCase()}
    </span>
  )
}

// ------------------
// PAGE
// ------------------

export default function LogsPage() {
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState('all')

  const filteredLogs = useMemo(() => {
    return LOGS.filter((log) => {
      const matchesQuery =
        log.message
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        log.service
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        log.tenant
          .toLowerCase()
          .includes(query.toLowerCase())

      const matchesLevel =
        level === 'all' || log.level === level

      return matchesQuery && matchesLevel
    })
  }, [query, level])

  return (
    <main className="flex-1 p-6 bg-dashboard overflow-y-auto h-full">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">Logs</h1>
          <p className="text-sm text-zinc-500">
            System and tenant-level event logs
          </p>
        </div>

        {/* FILTERS */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex items-center gap-2 border border-zinc-200 rounded-md px-3 py-2 bg-white flex-1">
            <Search className="w-4 h-4 text-zinc-400" />
            <input
              placeholder="Search logs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="outline-none w-full text-sm"
            />
          </div>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="border border-zinc-200 rounded-md px-3 py-2 bg-white text-sm"
          >
            <option value="all">All Levels</option>
            <option value="error">Error</option>
            <option value="warn">Warn</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
          </select>
        </div>

        {/* LOG TABLE */}
        <DataTable
          title="Event Logs"
          columns={COLUMNS}
          data={filteredLogs}
          renderCell={(value, key) => {
            if (key === 'level')
              return <LevelBadge level={value} />
            return value
          }}
        />
      </div>
    </main>
  )
}
