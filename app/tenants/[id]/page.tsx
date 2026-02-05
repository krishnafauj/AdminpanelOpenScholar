// File: app/tenants/[id]/page.tsx

import { MOCK_TENANTS } from './data'
import TenantClient from './TenantClient'

// 1. GENERATE STATIC PARAMS
// This runs at build time on the server.
// It resolves the error: "App pages cannot use both 'use client' and export function 'generateStaticParams()'"
export async function generateStaticParams() {
  // Return the list of IDs you want to pre-build
  return Object.keys(MOCK_TENANTS).map((id) => ({
    id: id,
  }))
}

// 2. SERVER PAGE COMPONENT
export default async function TenantPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // Await params (Required in Next.js 15+)
  const resolvedParams = await params
  const tenant = MOCK_TENANTS[resolvedParams.id]

  // Pass data to the Client Component
  return <TenantClient tenant={tenant} />
}