'use client'

import { useState } from 'react'

const STEPS = [
  'Organization Info',
  'Domain & Environment',
  'Admins',
  'Features',
  'Review',
]

export default function NewTenantPage() {
  const [step, setStep] = useState(0)

  return (
    <main className="p-6 bg-dashboard min-h-full">
      <div className="max-w-3xl mx-auto bg-white border rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold">
          New Tenant Setup
        </h1>

        <div className="flex gap-2">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded ${
                i <= step
                  ? 'bg-blue-600'
                  : 'bg-zinc-200'
              }`}
            />
          ))}
        </div>

        <div className="min-h-[200px] flex items-center justify-center text-zinc-500">
          Step {step + 1}: {STEPS[step]} (UI Placeholder)
        </div>

        <div className="flex justify-between">
          <button
            disabled={step === 0}
            onClick={() =>
              setStep((s) => Math.max(0, s - 1))
            }
            className="px-4 py-2 border rounded-md"
          >
            Back
          </button>

          <button
            onClick={() =>
              setStep((s) =>
                Math.min(STEPS.length - 1, s + 1)
              )
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            {step === STEPS.length - 1
              ? 'Create Tenant'
              : 'Next'}
          </button>
        </div>
      </div>
    </main>
  )
}
