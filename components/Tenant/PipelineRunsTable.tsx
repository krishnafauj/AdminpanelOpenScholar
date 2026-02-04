'use client'

import { DataTable } from '@/components/Data/DataTable'

const COLUMNS = [
  { key: 'source', label: 'Source' },
  { key: 'status', label: 'Status' },
  { key: 'records', label: 'Records' },
  { key: 'timestamp', label: 'Last Run' },
]

export function PipelineRunsTable({
  runs,
  renderCell,
}: {
  runs: any[]
  renderCell: (value: any, key: string) => JSX.Element | string
}) {
  return (
    <DataTable
      title="Pipeline Runs"
      columns={COLUMNS}
      data={runs}
      renderCell={renderCell}
    />
  )
}
