// File: app/tenants/[id]/TenantClient.tsx
'use client'

import { useCallback } from 'react'
import {
  Activity,
  BookOpen,
  Database,
  CheckCircle2,
} from 'lucide-react'

import { MetricCard } from '@/components/Data/MetricCard'
import { Breadcrumbs } from '@/components/Tenant/Breadcrumbs'
import { TenantHeader } from '@/components/Tenant/TenantHeader'
import { FeatureFlagPanel } from '@/components/Tenant/FeatureFlagPanel'
import { TenantActions } from '@/components/Tenant/TenantActions'
import { TenantTabs } from '@/components/Tenant/TenantTabs'
import { PipelineRunsTable } from '@/components/Tenant/PipelineRunsTable'
import { SourcesTable } from '@/components/Tenant/SourcesTable'
import { AuditLog } from '@/components/Tenant/AuditLog'
import { ErrorTimeline } from '@/components/Tenant/ErrorTimeline'
import { TenantAdminsPanel } from '@/components/Tenant/TenantAdminsPanel'
import { TenantConfigPanel } from '@/components/Tenant/TenantConfigPanel'

// STATUS BADGE HELPER
const STATUS_COLORS: Record<string, string> = {
  success: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-700',
  running: 'bg-blue-100 text-blue-700',
}

function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status] || 'bg-zinc-100 text-zinc-700'

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${color}`}>
      {status.toUpperCase()}
    </span>
  )
}

// MAIN UI COMPONENT
export default function TenantClient({ tenant }: { tenant: any }) {
  const renderPipelineCell = useCallback((value: any, key: string) => {
    if (key === 'status') return <StatusBadge status={value} />
    if (key === 'records') return value.toLocaleString()
    return value
  }, [])

  if (!tenant) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Tenant Not Found</h1>
      </div>
    )
  }

  return (
    <main className="flex-1 p-6 bg-dashboard overflow-y-auto h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <Breadcrumbs
          items={[
            { label: 'Tenants', href: '/tenants' },
            { label: tenant.name },
          ]}
        />

        <TenantHeader
          name={tenant.name}
          id={tenant.id}
          domain={tenant.domain}
          environment={tenant.environment}
          status={tenant.status}
          role="admin"
        />

        {/* METRICS */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <MetricCard
            title="Admins"
            value={tenant.adminsList.length}
            icon={<Activity className="w-6 h-6" />}
          />
          <MetricCard
            title="Publications"
            value={tenant.publications}
            icon={<BookOpen className="w-6 h-6" />}
          />
          <MetricCard
            title="System Health"
            value={`${tenant.health}%`}
            icon={<Activity className="w-6 h-6" />}
          />
          <MetricCard
            title="Last Success"
            value={tenant.lastSuccess}
            icon={<CheckCircle2 className="w-6 h-6" />}
          />
          <MetricCard
            title="API Calls (24h)"
            value={tenant.apiCalls.toLocaleString()}
            icon={<Activity className="w-6 h-6" />}
          />
          <MetricCard
            title="Storage"
            value={tenant.storage}
            icon={<Database className="w-6 h-6" />}
          />
        </div>

        {/* TABS */}
        <TenantTabs
          tabs={[
            {
              label: 'Pipelines',
              content: (
                <PipelineRunsTable
                  runs={tenant.recentRuns}
                  renderCell={renderPipelineCell}
                />
              ),
            },
            {
              label: 'Sources',
              content: <SourcesTable sources={tenant.sources} />,
            },
            {
              label: 'Admins',
              content: (
                <TenantAdminsPanel
                  admins={tenant.adminsList}
                  onAdd={() => alert('Add admin')}
                  onRemove={(email) => alert(`Remove ${email}`)}
                  onChangeRole={(email, role) => alert(`${email} → ${role}`)}
                />
              ),
            },
            {
              label: 'Config',
              content: (
                <TenantConfigPanel
                  domain={tenant.domain}
                  environment={tenant.environment}
                  onDomainChange={(value) => console.log('Domain changed:', value)}
                  onEnvironmentChange={(env) => console.log('Env changed:', env)}
                  onSave={() => alert('Configuration saved')}
                />
              ),
            },
            {
              label: 'Audit Log',
              content: <AuditLog />,
            },
            {
              label: 'Errors',
              content: <ErrorTimeline />,
            },
          ]}
        />

        {/* FEATURES */}
        <FeatureFlagPanel
          features={tenant.features}
          onToggle={(name, enabled) => {
            console.log('[AUDIT]', tenant.id, name, enabled, new Date().toISOString())
          }}
        />

        {/* ACTIONS */}
        <TenantActions
          onLock={() => alert(`Tenant ${tenant.name} locked`)}
          onDisablePipelines={() => alert(`Pipelines disabled for ${tenant.name}`)}
          onRotateKeys={() => alert(`API keys rotated for ${tenant.name}`)}
          onDelete={() =>
            confirm(`Are you sure you want to delete ${tenant.name}?`) &&
            alert('Tenant deleted')
          }
        />
      </div>
    </main>
  )
}