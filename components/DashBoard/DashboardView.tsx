'use client';

import { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Building2, BookOpen, CheckCircle2, Activity, ExternalLink, Edit2 } from 'lucide-react';

// STORE IMPORTS (These use aliases, so they remain correct)
import { setTenants } from '@/app/store/tenantsSlice';
import { setPipelineRuns, setIngestionMetrics, setDataSources } from '@/app/store/pipelineSlice';
import { RootState } from '@/app/store/store';
import { mockTenants, mockPipelineRuns, mockDataSources, mockIngestionMetrics, mockTenantEnvironments } from '@/app/store/mockData';

// --- FIXED COMPONENT IMPORTS ---
// We must go "up" one level (../) to leave 'DashBoard', then "down" into 'Data'
import { MetricCard } from '@/components/Data/MetricCard';
import { BarChartWidget } from '@/components/Data/BarChartWidget';
import { DonutChartWidget } from '@/components/Data/DonutChartWidget';
import { DataTable } from '@/components/Data/DataTable';

// 1. EXTRACT STATIC CONFIGS
const PIPELINE_COLUMNS = [
  { key: 'source', label: 'Data Source' },
  { key: 'status', label: 'Status' },
  { key: 'records', label: 'Records Processed' },
  { key: 'timestamp', label: 'Timestamp' }
];

const TENANT_COLUMNS = [
  { key: 'name', label: 'Organization Name' },
  { key: 'environment', label: 'Environment' },
  { key: 'publications', label: 'Publications' },
  { key: 'configStatus', label: 'Config Status' },
  { key: 'actions', label: 'Actions' }
];

const STATUS_COLORS: Record<string, string> = {
  success: 'bg-green-100 text-green-700',
  synced: 'bg-green-100 text-green-700',
  failed: 'bg-red-100 text-red-600',
  error: 'bg-red-100 text-red-600',
  running: 'bg-blue-100 text-blue-700',
  pending: 'bg-yellow-100 text-yellow-700',
};

// 2. HELPER COMPONENT
const StatusBadge = ({ status }: { status: string }) => {
  const colorClass = STATUS_COLORS[status.toLowerCase()] || 'bg-neutral-100 text-neutral-700';
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export function DashboardView() {
  const dispatch = useDispatch();
  
  const { items: tenants } = useSelector((state: RootState) => state.tenants);
  const { runs: pipelineRuns, ingestionMetrics, dataSources } = useSelector((state: RootState) => state.pipeline);

  useEffect(() => {
    dispatch(setTenants(mockTenants));
    dispatch(setPipelineRuns(mockPipelineRuns));
    dispatch(setIngestionMetrics(mockIngestionMetrics));
    dispatch(setDataSources(mockDataSources));
  }, [dispatch]);

  // 3. MEMOIZED DATA
  const pipelineTableData = useMemo(() => pipelineRuns.map((run) => ({
    source: run.dataSource,
    status: run.status,
    records: run.recordsProcessed,
    timestamp: new Date(run.timestamp).toLocaleDateString(),
    duration: `${run.duration}s`,
  })), [pipelineRuns]);

  const tenantsTableData = useMemo(() => tenants.map((tenant) => ({
    id: tenant.id,
    name: tenant.name,
    environment: tenant.environment.toUpperCase(),
    publications: tenant.publicationsCount,
    configStatus: tenant.configStatus,
  })), [tenants]);

  // 4. RENDER HANDLERS
  const renderPipelineCell = useCallback((value: any, key: string) => {
    if (key === 'status') return <StatusBadge status={value} />;
    if (key === 'records') return value.toLocaleString();
    return value;
  }, []);

  const renderTenantCell = useCallback((value: any, key: string, row: any) => {
    if (key === 'configStatus') return <StatusBadge status={value} />;
    if (key === 'publications') return value.toLocaleString();
    if (key === 'actions') {
      return (
        <div className="flex items-center gap-2">
          <button onClick={() => console.log('Edit', row?.name)} className="p-1 hover:bg-neutral-100 rounded transition-colors" title="Edit">
            <Edit2 className="w-4 h-4 text-neutral-600" />
          </button>
          <button onClick={() => console.log('View', row?.name)} className="p-1 hover:bg-neutral-100 rounded transition-colors" title="View">
            <ExternalLink className="w-4 h-4 text-neutral-600" />
          </button>
        </div>
      );
    }
    return value;
  }, []);

  return (
 <main className="flex-1 pt-4 bg-dashboard p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
        
        {/* METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Active Tenants" 
            value={tenants.length} 
            icon={<Building2 className="w-6 h-6" />} 
            trend={{ value: 24, isPositive: true }} 
            compareText="against regional data" 
            iconBgColor="bg-blue-100" 
            iconTextColor="text-blue-600" 
          />
          <MetricCard 
            title="Publications Ingested" 
            value={ingestionMetrics.totalPublications} 
            icon={<BookOpen className="w-6 h-6" />} 
            trend={{ value: 24, isPositive: true }} 
            compareText="vs last 30 days" 
            iconBgColor="bg-green-100" 
            iconTextColor="text-green-600" 
          />
          <MetricCard 
            title="Pipeline Success Rate" 
            value={`${ingestionMetrics.successRate}%`} 
            icon={<CheckCircle2 className="w-6 h-6" />} 
            trend={{ value: 10, isPositive: false }} 
            compareText="vs last 30 days" 
            iconBgColor="bg-yellow-100" 
            iconTextColor="text-yellow-600" 
          />
          <MetricCard 
            title="System Health" 
            value={`${ingestionMetrics.pipelineHealth}%`} 
            icon={<Activity className="w-6 h-6" />} 
            trend={{ value: 8, isPositive: true }} 
            compareText="vs last 30 days" 
            iconBgColor="bg-purple-100" 
            iconTextColor="text-purple-600" 
          />
        </div>

        {/* CHARTS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <BarChartWidget 
              title="Data Source Ingestion Status" 
              data={dataSources.map(s => ({ name: s.name, value: s.volume, growth: s.growth }))} 
              maxValue={Math.max(...dataSources.map((d) => d.volume))} 
            />
          </div>
          <DonutChartWidget 
            title="Tenant Environment Distribution" 
            data={mockTenantEnvironments.map((env) => ({
              name: env.name, 
              count: env.count, 
              percentage: env.percentage, 
              color: env.name === 'Production' ? '#1e40af' : env.name === 'Staging' ? '#f59e0b' : '#8b5cf6' 
            }))} 
          />
        </div>

        {/* TABLES GRID */}
        <div className="grid grid-cols-1 gap-6">
          <DataTable 
            title="Recent Pipeline Runs" 
            columns={PIPELINE_COLUMNS} 
            data={pipelineTableData} 
            renderCell={renderPipelineCell} 
          />
          <DataTable 
            title="Tenant Directory" 
            columns={TENANT_COLUMNS} 
            data={tenantsTableData} 
            fullWidth 
            renderCell={renderTenantCell} 
          />
        </div>
      </div>
    </main>
  );
}