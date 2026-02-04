'use client'

import { UserPlus, Shield, Trash2 } from 'lucide-react'

type Admin = {
  email: string
  role: 'admin' | 'ops' | 'read-only'
  lastActive: string
}

export function TenantAdminsPanel({
  admins,
  onAdd,
  onRemove,
  onChangeRole,
}: {
  admins: Admin[]
  onAdd: () => void
  onRemove: (email: string) => void
  onChangeRole: (email: string, role: Admin['role']) => void
}) {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Tenant Administrators
        </h2>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <UserPlus className="w-4 h-4" />
          Add Admin
        </button>
      </div>

      <div className="space-y-3">
        {admins.map((a) => (
          <div
            key={a.email}
            className="flex justify-between items-center p-4 border border-zinc-200 rounded-lg"
          >
            <div>
              <p className="font-medium">{a.email}</p>
              <p className="text-xs text-zinc-500">
                Last active: {a.lastActive}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={a.role}
                onChange={(e) =>
                  onChangeRole(
                    a.email,
                    e.target.value as Admin['role']
                  )
                }
                className="border border-zinc-200 rounded-md px-2 py-1 text-sm"
              >
                <option value="admin">Admin</option>
                <option value="ops">Ops</option>
                <option value="read-only">Read-only</option>
              </select>

              <button
                onClick={() => onRemove(a.email)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
