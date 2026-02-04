'use client'

import { useMemo } from 'react'
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Server,
  Clock,
} from 'lucide-react'

import { MetricCard } from '@/components/Data/MetricCard'
import { DataTable } from '@/components/Data/DataTable'

// ------------------
// MOCK HEALTH DATA
// ------------------

const HEALTH_METRICS = {
  uptime: '99.98%',
  latency: '210ms',
  errorRate: '0.12%',
  incidents: 1,
}

const SERVICES = [
  {
    service: 'Ingestion Pipeline',
    status: 'healthy',
    latency: '180ms',
    lastIncident: '7 days ago',
  },
  {
    service: 'API Gateway',
    status: 'degraded',
    latency: '420ms',
    lastIncident: '2h ago',
  },
  {
    service: 'Search Index',
    status: 'healthy',
    latency: '140ms',
    lastIncident: '14 days ago',
  },
  {
    service: 'Auth Service',
    status: 'healthy',
    latency: '90ms',
    lastIncident: '30 days ago',
  },
]

const INCIDENTS = [
  {
    id: 1,
    title: 'Elevated API latency',
    severity: 'medium',
    status: 'ongoing',
    started: '2025-02-01 12:40',
  },
]

// ------------------
// TABLE CONFIG
// ------------------

const SERVICE_COLUMNS = [
  { key: 'service', label: 'Service' },
  { key: 'status', label: 'Status' },
  { key: 'latency', label: 'Latency' },
  { key: 'lastIncident', label: 'Last Incident' },
]

const INCIDENT_COLUMNS = [
  { key: 'title', label: 'Incident' },
  { key: 'severity', label: 'Severity' },
  { key: 'status', label: 'Status' },
  { key: 'started', label: 'Started At' },
]

// ------------------
// BADGES
// ------------------

const STATUS_COLORS: Record<string, string> = {
  healthy: 'bg-green-100 text-green-700',
  degraded: 'bg-yellow-100 text-yellow-700',
  down: 'bg-red-100 text-red-700',
  ongoing: 'bg-red-100 text-red-700',
  resolved: 'bg-green-100 text-green-700',
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

export default function HealthPage() {
  const services = useMemo(() => SERVICES, [])
  const incidents = useMemo(() => INCIDENTS, [])

  return (
    <main className="flex-1 p-6 bg-dashboard overflow-y-auto h-full">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">System Health</h1>
          <p className="text-sm text-zinc-500">
            Platform reliability, uptime, and active incidents
          </p>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard
            title="Uptime (30d)"
            value={HEALTH_METRICS.uptime}
            icon={<CheckCircle2 className="w-6 h-6" />}
          />
          <MetricCard
            title="Avg Latency"
            value={HEALTH_METRICS.latency}
            icon={<Clock className="w-6 h-6" />}
          />
          <MetricCard
            title="Error Rate"
            value={HEALTH_METRICS.errorRate}
            icon={<Activity className="w-6 h-6" />}
          />
          <MetricCard
            title="Active Incidents"
            value={HEALTH_METRICS.incidents}
            icon={<AlertTriangle className="w-6 h-6" />}
          />
        </div>

        {/* SERVICES STATUS */}
        <DataTable
          title="Service Status"
          columns={SERVICE_COLUMNS}
          data={services}
          renderCell={(value, key) => {
            if (key === 'status')
              return <StatusBadge status={value} />
            return value
          }}
        />

        {/* INCIDENTS */}
        <DataTable
          title="Incidents"
          columns={INCIDENT_COLUMNS}
          data={incidents}
          renderCell={(value, key) => {
            if (key === 'status' || key === 'severity')
              return <StatusBadge status={value} />
            return value
          }}
        />
      </div>
    </main>
  )
}
