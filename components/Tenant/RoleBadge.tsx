'use client'

const ROLE_COLORS: Record<string, string> = {
  admin: 'bg-red-100 text-red-700',
  ops: 'bg-blue-100 text-blue-700',
  'read-only': 'bg-zinc-100 text-zinc-600',
}

export function RoleBadge({ role }: { role: string }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${ROLE_COLORS[role]}`}
    >
      {role.toUpperCase()}
    </span>
  )
}
