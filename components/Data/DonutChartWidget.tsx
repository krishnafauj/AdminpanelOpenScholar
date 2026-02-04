'use client'

import React, { useState, useEffect } from 'react'

interface DonutChartData {
  name: string
  count: number
  percentage: number
  color: string
  details?: string[] // optional: rows or extra info
}

interface DonutChartWidgetProps {
  title: string
  data: DonutChartData[]
}

export function DonutChartWidget({ title, data }: DonutChartWidgetProps) {
  const total = data.reduce((sum, d) => sum + d.count, 0)
  const radius = 70
  const strokeWidth = 18
  const normalizedRadius = radius - strokeWidth / 2
  const circumference = normalizedRadius * 2 * Math.PI

  const [selected, setSelected] = useState<DonutChartData | null>(null)

  let cumulativeOffset = 0

  return (
    <>
      <div className="bg-white rounded-lg p-6 shadow-sm border border-zinc-200 h-full">
        <h3 className="text-lg font-semibold text-zinc-900 mb-6">
          {title}
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8">

          {/* Donut */}
          <div className="relative">
            <svg height="200" width="200">
              {/* Background Ring */}
              <circle
                stroke="#e5e7eb"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx="100"
                cy="100"
              />

              {data.map((item, index) => {
                const sliceLength =
                  (item.percentage / 100) * circumference

                const dashArray = `${sliceLength} ${circumference - sliceLength
                  }`

                const dashOffset = -cumulativeOffset
                cumulativeOffset += sliceLength

                return (
                  <circle
                    key={index}
                    stroke={item.color}
                    fill="transparent"
                    strokeWidth={strokeWidth}
                    strokeDasharray={dashArray}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx="100"
                    cy="100"
                    onClick={() => setSelected(item)}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    style={{
                      transform: 'rotate(-90deg)',
                      transformOrigin: '50% 50%',
                    }}
                  />
                )
              })}

              {/* Center Label */}
              {/* Center Summary */}
              <text
                x="100"
                y="90"
                textAnchor="middle"
                className="fill-zinc-900 text-2xl font-bold"
              >
                {total}
              </text>
              <text
                x="100"
                y="112"
                textAnchor="middle"
                className="fill-zinc-500 text-sm"
              >
                Total Tenants
              </text>

            </svg>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {data.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelected(item)}
                className="flex items-center gap-3 text-left w-full hover:bg-zinc-50 p-2 rounded-lg transition"
              >
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <p className="text-sm font-medium text-zinc-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {item.count} • {item.percentage}%
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <DetailDrawer
          item={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  )
}

/* ----------------------------- */
/* Modal Component             */
/* ----------------------------- */
function DetailDrawer({
  item,
  onClose,
}: {
  item: DonutChartData
  onClose: () => void
}) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex">

      {/* Backdrop */}
      <div
        className="flex-1 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="w-full max-w-md h-full bg-white shadow-2xl border-l border-zinc-200 animate-in slide-in-from-right duration-300 flex flex-col">

        {/* Header */}
        <div className="p-5 border-b border-zinc-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-zinc-900">
            {item.name}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-900 text-xl"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">

          {/* Summary Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-zinc-50">
              <p className="text-xs text-zinc-500">Count</p>
              <p className="text-2xl font-bold text-zinc-900">
                {item.count}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-50">
              <p className="text-xs text-zinc-500">Percentage</p>
              <p className="text-2xl font-bold text-zinc-900">
                {item.percentage}%
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <div>
            <h3 className="text-sm font-semibold text-zinc-700 mb-3">
              Breakdown
            </h3>

            {item.details?.length ? (
              <ul className="space-y-2 text-sm">
                {item.details.map((row, i) => (
                  <li
                    key={i}
                    className="p-3 rounded-lg bg-zinc-50 text-zinc-700"
                  >
                    {row}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-500">
                No detailed data available.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 rounded-lg bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  )
}
