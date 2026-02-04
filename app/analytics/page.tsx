'use client'

import { useMemo } from 'react'
import {
  TrendingUp,
  Users,
  BookOpen,
  Activity,
} from 'lucide-react'

import { MetricCard } from '@/components/Data/MetricCard'
import { BarChartWidget } from '@/components/Data/BarChartWidget'
import { DonutChartWidget } from '@/components/Data/DonutChartWidget'
import { DataTable } from '@/components/Data/DataTable'

// ------------------
// MOCK ANALYTICS DATA
// ------------------

const ANALYTICS_METRICS = {
  totalTenants: 42,
  totalPublications: 823421,
  apiCalls30d: 1244821,
  growthRate: 18,
}

const PUBLICATION_TRENDS = [
  { name: 'Jan', value: 62000 },
  { name: 'Feb', value: 68000 },
  { name: 'Mar', value: 72000 },
  { name: 'Apr', value: 81000 },
]

const SOURCE_DISTRIBUTION = [
  {
    name: 'OpenAlex',
    count: 412000,
    percentage: 50,
    color: '#1e40af',
  },
  {
    name: 'Crossref',
    count: 275000,
    percentage: 33,
    color: '#16a34a',
  },
  {
    name: 'Scopus',
    count: 136421,
    percentage: 17,
    color: '#f59e0b',
  },
]

const TOP_TENANTS = [
  {
    tenant: 'Harvard University',
    publications: 12934,
    apiCalls: 221341,
    growth: '+12%',
  },
  {
    tenant: 'MIT',
    publications: 11203,
    apiCalls: 198442,
    growth: '+9%',
  },
  {
    tenant: 'Stanford',
    publications: 9844,
    apiCalls: 176221,
    growth: '+15%',
  },
]

// ------------------
// TABLE CONFIG
// ------------------

const TENANT_COLUMNS = [
  { key: 'tenant', label: 'Tenant' },
  { key: 'publications', label: 'Publications' },
  { key: 'apiCalls', label: 'API Calls (30d)' },
  { key: 'growth', label: 'Growth' },
]

// ------------------
// PAGE
// ------------------

export default function AnalyticsPage() {
  const maxPublications = useMemo(
    () =>
      Math.max(
        ...PUBLICATION_TRENDS.map((d) => d.value)
      ),
    []
  )

  return (
    <main className="flex-1 p-6 bg-dashboard overflow-y-auto h-full">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">
            Analytics
          </h1>
          <p className="text-sm text-zinc-500">
            Usage, growth, and platform insights
          </p>
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MetricCard
            title="Total Tenants"
            value={ANALYTICS_METRICS.totalTenants}
            icon={<Users className="w-6 h-6" />}
          />
          <MetricCard
            title="Publications"
            value={ANALYTICS_METRICS.totalPublications.toLocaleString()}
            icon={<BookOpen className="w-6 h-6" />}
          />
          <MetricCard
            title="API Calls (30d)"
            value={ANALYTICS_METRICS.apiCalls30d.toLocaleString()}
            icon={<Activity className="w-6 h-6" />}
          />
          <MetricCard
            title="Growth Rate"
            value={`${ANALYTICS_METRICS.growthRate}%`}
            icon={<TrendingUp className="w-6 h-6" />}
          />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BarChartWidget
              title="Publication Growth"
              data={PUBLICATION_TRENDS}
              maxValue={maxPublications}
            />
          </div>

          <DonutChartWidget
            title="Source Distribution"
            data={SOURCE_DISTRIBUTION}
          />
        </div>

        {/* TOP TENANTS */}
        <DataTable
          title="Top Tenants"
          columns={TENANT_COLUMNS}
          data={TOP_TENANTS}
          renderCell={(value, key) => {
            if (
              key === 'publications' ||
              key === 'apiCalls'
            ) {
              return value.toLocaleString()
            }
            return value
          }}
        />
      </div>
    </main>
  )
}
