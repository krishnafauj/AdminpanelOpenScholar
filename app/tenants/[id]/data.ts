// File: app/tenants/[id]/data.ts

export const MOCK_TENANTS: Record<string, any> = {
  // 1. HARVARD (Production / Active / High Health)
  '1': {
    id: '1',
    name: 'Harvard University',
    environment: 'production',
    domain: 'harvard.openscholar.ai',
    status: 'active',
    admins: 2,
    publications: 12934,
    health: 98,
    lastSuccess: '2h ago',
    errorRate: '1.3%',
    apiCalls: 12441,
    storage: '4.2 GB',
    adminsList: [
      { email: 'ops@harvard.edu', role: 'admin', lastActive: '2h ago' },
      { email: 'support@harvard.edu', role: 'read-only', lastActive: '1d ago' },
    ],
    features: [
      { name: 'OpenAlex Sync', enabled: true },
      { name: 'Crossref Enrichment', enabled: true },
      { name: 'Scopus Import', enabled: false },
    ],
    sources: [
      { source: 'OpenAlex', status: 'success', records: 12034 },
      { source: 'Crossref', status: 'success', records: 8421 },
      { source: 'Scopus', status: 'failed', records: 0 },
    ],
    recentRuns: [
      { source: 'OpenAlex', status: 'success', records: 5400, timestamp: '2025-02-01 14:02' },
      { source: 'Crossref', status: 'success', records: 1200, timestamp: '2025-02-01 13:47' },
      { source: 'Scopus', status: 'failed', records: 0, timestamp: '2025-01-31 18:22' },
    ],
  },

  // 2. MIT (Staging / Active / Good Health)
  '2': {
    id: '2',
    name: 'MIT',
    environment: 'staging',
    domain: 'mit.openscholar.ai',
    status: 'active',
    admins: 2,
    publications: 6421,
    health: 91,
    lastSuccess: '15m ago',
    errorRate: '0.8%',
    apiCalls: 8532,
    storage: '2.1 GB',
    adminsList: [
      { email: 'admin@mit.edu', role: 'admin', lastActive: '5m ago' },
      { email: 'dev@mit.edu', role: 'editor', lastActive: '1h ago' },
    ],
    features: [
      { name: 'OpenAlex Sync', enabled: true },
      { name: 'Crossref Enrichment', enabled: false },
      { name: 'Beta Features', enabled: true },
    ],
    sources: [
      { source: 'OpenAlex', status: 'success', records: 6400 },
      { source: 'Crossref', status: 'running', records: 0 },
    ],
    recentRuns: [
      { source: 'OpenAlex', status: 'success', records: 320, timestamp: '2025-02-03 12:45' },
      { source: 'Crossref', status: 'running', records: 0, timestamp: '2025-02-03 12:47' },
    ],
  },

  // 3. STANFORD (Development / Warning / Poor Health)
  '3': {
    id: '3',
    name: 'Stanford University',
    environment: 'development',
    domain: 'stanford.openscholar.ai',
    status: 'warning',
    admins: 1,
    publications: 3120,
    health: 76,
    lastSuccess: '1d ago',
    errorRate: '12.4%',
    apiCalls: 2100,
    storage: '1.5 GB',
    adminsList: [
      { email: 'research@stanford.edu', role: 'admin', lastActive: '3d ago' },
    ],
    features: [
      { name: 'OpenAlex Sync', enabled: true },
      { name: 'Crossref Enrichment', enabled: true },
      { name: 'Scopus Import', enabled: true },
    ],
    sources: [
      { source: 'OpenAlex', status: 'success', records: 3100 },
      { source: 'Crossref', status: 'failed', records: 20 },
      { source: 'Scopus', status: 'failed', records: 0 },
    ],
    recentRuns: [
      { source: 'OpenAlex', status: 'success', records: 150, timestamp: '2025-02-02 18:00' },
      { source: 'Crossref', status: 'failed', records: 0, timestamp: '2025-02-02 18:15' },
      { source: 'Scopus', status: 'failed', records: 0, timestamp: '2025-02-02 18:20' },
    ],
  },

  // 4. OXFORD (Production / Active / High Volume)
  '4': {
    id: '4',
    name: 'Oxford University',
    environment: 'production',
    domain: 'oxford.openscholar.ai',
    status: 'active',
    admins: 6,
    publications: 22145,
    health: 88,
    lastSuccess: '5m ago',
    errorRate: '2.1%',
    apiCalls: 34100,
    storage: '8.4 GB',
    adminsList: [
      { email: 'it@ox.ac.uk', role: 'admin', lastActive: '10m ago' },
      { email: 'library@ox.ac.uk', role: 'editor', lastActive: '30m ago' },
      { email: 'audit@ox.ac.uk', role: 'read-only', lastActive: '2h ago' },
      { email: 'sysadmin@ox.ac.uk', role: 'admin', lastActive: '4h ago' },
      { email: 'bot@ox.ac.uk', role: 'service', lastActive: '1m ago' },
      { email: 'manager@ox.ac.uk', role: 'admin', lastActive: '1d ago' },
    ],
    features: [
      { name: 'OpenAlex Sync', enabled: true },
      { name: 'Crossref Enrichment', enabled: true },
      { name: 'Europe PMC', enabled: true },
    ],
    sources: [
      { source: 'OpenAlex', status: 'success', records: 15000 },
      { source: 'Crossref', status: 'success', records: 5000 },
      { source: 'Europe PMC', status: 'success', records: 2145 },
    ],
    recentRuns: [
      { source: 'OpenAlex', status: 'success', records: 1200, timestamp: '2025-02-03 08:30' },
      { source: 'Crossref', status: 'success', records: 450, timestamp: '2025-02-03 08:45' },
      { source: 'Europe PMC', status: 'success', records: 100, timestamp: '2025-02-03 09:00' },
    ],
  },
}