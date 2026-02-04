'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Building2,
  PlusCircle,
  ExternalLink,
  Activity,
  Search,
  Filter,
} from 'lucide-react'

import { MetricCard } from '@/components/Data/MetricCard'
import { DataTable } from '@/components/Data/DataTable'

// ------------------
// STATIC MOCK DATA
// ------------------

type Tenant = {
  id: string
  name: string
  domain: string
  environment: 'production' | 'staging' | 'development'
  publications: number
  admins: number
  health: number
  status: 'active' | 'warning' | 'inactive'
  lastActivity: string
}

const MOCK_TENANTS: Tenant[] = [
  {
    id: '1',
    name: 'Harvard University',
    domain: 'harvard.openscholar.ai',
    environment: 'production',
    publications: 12934,
    admins: 4,
    health: 98,
    status: 'active',
    lastActivity: '2025-02-03 14:12',
  },
  {
    id: '2',
    name: 'MIT',
    domain: 'mit.openscholar.ai',
    environment: 'staging',
    publications: 6421,
    admins: 2,
    health: 91,
    status: 'active',
    lastActivity: '2025-02-03 12:47',
  },
  {
    id: '3',
    name: 'Stanford University',
    domain: 'stanford.openscholar.ai',
    environment: 'development',
    publications: 3120,
    admins: 1,
    health: 76,
    status: 'warning',
    lastActivity: '2025-02-02 18:21',
  },
  {
    id: '4',
    name: 'Oxford University',
    domain: 'oxford.openscholar.ai',
    environment: 'production',
    publications: 22145,
    admins: 6,
    health: 88,
    status: 'active',
    lastActivity: '2025-02-03 09:03',
  },
]

// ------------------
// TABLE CONFIG
// ------------------

const TENANT_COLUMNS = [
  { key: 'name', label: 'Organization' },
  { key: 'domain', label: 'Domain' },
  { key: 'environment', label: 'Environment' },
  { key: 'publications', label: 'Publications' },
  { key: 'admins', label: 'Admins' },
  { key: 'health', label: 'Health' },
  { key: 'status', label: 'Status' },
  { key: 'lastActivity', label: 'Last Activity' },
  { key: 'actions', label: 'Actions' },
]

// ------------------
// STATUS BADGE
// ------------------

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  inactive: 'bg-zinc-100 text-zinc-600',
}

function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status] || 'bg-zinc-100 text-zinc-700'

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
      {status.toUpperCase()}
    </span>
  )
}

// ------------------
// PAGE
// ------------------

export default function TenantsPage() {
  const router = useRouter()

  const [search, setSearch] = useState('')
  const [envFilter, setEnvFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [healthFilter, setHealthFilter] = useState<string>('all')

  // ------------------
  // FILTER + FUZZY SEARCH
  // ------------------

  const filteredTenants = useMemo(() => {
    return MOCK_TENANTS.filter((tenant) => {
      const q = search.toLowerCase()

      const matchesSearch =
        tenant.name.toLowerCase().includes(q) ||
        tenant.domain.toLowerCase().includes(q) ||
        tenant.id.includes(q)

      const matchesEnv =
        envFilter === 'all' ||
        tenant.environment === envFilter

      const matchesStatus =
        statusFilter === 'all' ||
        tenant.status === statusFilter

      const matchesHealth =
        healthFilter === 'all' ||
        (healthFilter === '90' && tenant.health >= 90) ||
        (healthFilter === '75' &&
          tenant.health >= 75 &&
          tenant.health < 90)

      return (
        matchesSearch &&
        matchesEnv &&
        matchesStatus &&
        matchesHealth
      )
    })
  }, [search, envFilter, statusFilter, healthFilter])

  const tableData = useMemo(
    () =>
      filteredTenants.map((t) => ({
        ...t,
        environment: t.environment.toUpperCase(),
      })),
    [filteredTenants]
  )

  // ------------------
  // METRICS
  // ------------------

  const total = filteredTenants.length
  const prodCount = filteredTenants.filter(
    (t) => t.environment === 'production'
  ).length
  const avgHealth = total
    ? Math.round(
        filteredTenants.reduce(
          (acc, t) => acc + t.health,
          0
        ) / total
      )
    : 0

  return (
    <main className="flex-1 min-h-screen p-6 bg-dashboard overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Building2 className="w-6 h-6 text-violet-600" />
              Tenants
            </h1>
            <p className="text-sm text-zinc-500">
              Search, filter, and manage tenant operational state
            </p>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg">
            <PlusCircle className="w-4 h-4" />
            New Tenant
          </button>
        </div>

        {/* CONTROLS */}
        <div className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col lg:flex-row gap-4 items-center">
          {/* SEARCH */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, domain, or ID..."
              className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* FILTERS */}
          <div className="flex gap-3 items-center">
            <Filter className="w-4 h-4 text-zinc-400" />

            <select
              value={envFilter}
              onChange={(e) =>
                setEnvFilter(e.target.value)
              }
              className="border border-zinc-200 rounded-lg px-3 py-2"
            >
              <option value="all">All Envs</option>
              <option value="production">Production</option>
              <option value="staging">Staging</option>
              <option value="development">Development</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="border border-zinc-200 rounded-lg px-3 py-2"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="warning">Warning</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              value={healthFilter}
              onChange={(e) =>
                setHealthFilter(e.target.value)
              }
              className="border border-zinc-200 rounded-lg px-3 py-2"
            >
              <option value="all">All Health</option>
              <option value="90">≥ 90%</option>
              <option value="75">75–89%</option>
            </select>
          </div>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Visible Tenants"
            value={total}
            icon={<Building2 className="w-6 h-6" />}
          />
          <MetricCard
            title="Production Tenants"
            value={prodCount}
            icon={<Activity className="w-6 h-6" />}
          />
          <MetricCard
            title="Average Health"
            value={`${avgHealth}%`}
            icon={<Activity className="w-6 h-6" />}
          />
        </div>

        {/* TABLE */}
        <DataTable
          title="Tenant Directory"
          columns={TENANT_COLUMNS}
          data={tableData}
          fullWidth
          renderCell={(value, key, row) => {
            if (key === 'status')
              return <StatusBadge status={value} />

            if (key === 'health')
              return (
                <span
                  className={`font-semibold ${
                    value >= 90
                      ? 'text-green-600'
                      : value >= 75
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {value}%
                </span>
              )

            if (key === 'publications')
              return value.toLocaleString()

            if (key === 'actions') {
              return (
                <button
                  onClick={() =>
                    router.push(`/tenants/${row.id}`)
                  }
                  className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 rounded-md text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  View
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
