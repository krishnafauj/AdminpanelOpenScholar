'use client'

import { useMemo } from 'react'
import {
  Database,
  Activity,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react'

import { MetricCard } from '@/components/Data/MetricCard'
import { DataTable } from '@/components/Data/DataTable'

// ------------------
// MOCK DATA
// ------------------

const INGESTION_METRICS = {
  activePipelines: 6,
  successRate: 97,
  failedRuns: 3,
  records24h: 48231,
}

const PIPELINE_RUNS = [
  {
    id: 1,
    tenant: 'Harvard University',
    source: 'OpenAlex',
    status: 'success',
    records: 5400,
    lastRun: '2025-02-01 14:02',
  },
  {
    id: 2,
    tenant: 'MIT',
    source: 'Scopus',
    status: 'failed',
    records: 0,
    lastRun: '2025-02-01 13:10',
  },
  {
    id: 3,
    tenant: 'Stanford',
    source: 'Crossref',
    status: 'running',
    records: 1200,
    lastRun: '2025-02-01 14:20',
  },
]

// ------------------
// TABLE CONFIG
// ------------------

const COLUMNS = [
  { key: 'tenant', label: 'Tenant' },
  { key: 'source', label: 'Source' },
  { key: 'status', label: 'Status' },
  { key: 'records', label: 'Records' },
  { key: 'lastRun', label: 'Last Run' },
  { key: 'actions', label: 'Actions' },
]

const STATUS_COLORS: Record<string, string> = {
  success: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  running: 'bg-blue-100 text-blue-700',
}

function StatusBadge({ status }: { status: string }) {
  const color =
    STATUS_COLORS[status] || 'bg-zinc-100 text-zinc-700'

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
      {status.toUpperCase()}
    </span>
  )
}

// ------------------
// PAGE
// ------------------

export default function IngestionPage() {
  const tableData = useMemo(() => PIPELINE_RUNS, [])

  return (
    <main className="flex-1 p-6 bg-dashboard overflow-y-auto h-full">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">Ingestion</h1>
          <p className="text-sm text-zinc-500">
            System-wide data ingestion pipelines and health
          </p>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard
            title="Active Pipelines"
            value={INGESTION_METRICS.activePipelines}
            icon={<Database className="w-6 h-6" />}
          />
          <MetricCard
            title="Success Rate"
            value={`${INGESTION_METRICS.successRate}%`}
            icon={<CheckCircle2 className="w-6 h-6" />}
          />
          <MetricCard
            title="Failed Runs"
            value={INGESTION_METRICS.failedRuns}
            icon={<AlertTriangle className="w-6 h-6" />}
          />
          <MetricCard
            title="Records (24h)"
            value={INGESTION_METRICS.records24h.toLocaleString()}
            icon={<Activity className="w-6 h-6" />}
          />
        </div>

        {/* PIPELINE TABLE */}
        <DataTable
          title="Recent Pipeline Runs"
          columns={COLUMNS}
          data={tableData}
          renderCell={(value, key, row) => {
            if (key === 'status') return <StatusBadge status={value} />
            if (key === 'records') return value.toLocaleString()
            if (key === 'actions') {
              return (
                <button
                  onClick={() =>
                    alert(`Retry ${row.source} for ${row.tenant}`)
                  }
                  className="flex items-center gap-2 px-3 py-1 border border-zinc-300 rounded-md hover:bg-zinc-100"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </button>
              )
            }
            return value
          }}
        />
      </div>
    </main>
  )
}
