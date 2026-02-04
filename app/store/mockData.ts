import { Tenant } from './tenantsSlice';
import { PipelineRun } from './pipelineSlice';

export const mockTenants: Tenant[] = [
  {
    id: '1',
    name: 'MIT Research Lab',
    environment: 'prod',
    status: 'active',
    publicationsCount: 12450,
    configStatus: 'synced',
  },
  {
    id: '2',
    name: 'Stanford AI Institute',
    environment: 'prod',
    status: 'active',
    publicationsCount: 8920,
    configStatus: 'synced',
  },
  {
    id: '3',
    name: 'UC Berkeley EECS',
    environment: 'staging',
    status: 'active',
    publicationsCount: 7650,
    configStatus: 'pending',
  },
  {
    id: '4',
    name: 'CMU Computer Science',
    environment: 'dev',
    status: 'active',
    publicationsCount: 5430,
    configStatus: 'synced',
  },
  {
    id: '5',
    name: 'Harvard Medical School',
    environment: 'prod',
    status: 'active',
    publicationsCount: 11200,
    configStatus: 'synced',
  },
];

export const mockPipelineRuns: PipelineRun[] = [
  {
    id: 'run-001',
    dataSource: 'OpenAlex',
    status: 'success',
    recordsProcessed: 45320,
    timestamp: '2025-02-22T14:30:00Z',
    duration: 245,
  },
  {
    id: 'run-002',
    dataSource: 'Crossref',
    status: 'success',
    recordsProcessed: 32150,
    timestamp: '2025-02-22T12:15:00Z',
    duration: 189,
  },
  {
    id: 'run-003',
    dataSource: 'Scopus',
    status: 'failed',
    recordsProcessed: 12430,
    timestamp: '2025-02-22T10:45:00Z',
    duration: 512,
  },
  {
    id: 'run-004',
    dataSource: 'DOAJ',
    status: 'success',
    recordsProcessed: 18900,
    timestamp: '2025-02-22T08:20:00Z',
    duration: 156,
  },
  {
    id: 'run-005',
    dataSource: 'PubMed',
    status: 'success',
    recordsProcessed: 28500,
    timestamp: '2025-02-21T23:30:00Z',
    duration: 287,
  },
];

export const mockDataSources = [
  { name: 'OpenAlex', volume: 45320, growth: 24 },
  { name: 'Scopus', volume: 38150, growth: 18 },
  { name: 'Web of Science', volume: 32900, growth: 12 },
  { name: 'Crossref', volume: 28500, growth: 20 },
];

export const mockIngestionMetrics = {
  totalPublications: 3253345,
  successRate: 94,
  pipelineHealth: 89,
};

export const mockTenantEnvironments = [
  { name: 'Production', count: 25, percentage: 68 },
  { name: 'Staging', count: 8, percentage: 22 },
  { name: 'Development', count: 4, percentage: 10 },
];
