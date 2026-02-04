'use client';

import React, { useState } from 'react';
import { ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-react'; // Better icons

// 1. USE GENERICS <T>
// T extends { id?: string | number } ensures we have something unique for keys if needed
interface DataTableProps<T> {
  title: string;
  columns: Array<{ 
    key: string; 
    label: string; 
    align?: 'left' | 'center' | 'right'; 
    sortable?: boolean 
  }>;
  data: T[];
  // renderCell now knows T is the row type, not 'any'
  renderCell?: (value: any, key: string, row: T) => React.ReactNode;
  fullWidth?: boolean;
  uniqueKey?: keyof T; // Allow specifying which field is the unique ID (default to 'id')
}

export function DataTable<T extends Record<string, any>>({ 
  title, 
  columns, 
  data, 
  renderCell, 
  fullWidth = false, // Default value
  uniqueKey = 'id'   // Default to 'id'
}: DataTableProps<T>) {
  
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      // 2. SAFETY CHECK (Edge Case)
      // Always handle null/undefined before comparing
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;

      if (typeof aVal === 'string') {
        return sortOrder === 'asc' 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      }

      // Handle numbers and dates
      return sortOrder === 'asc' 
        ? (aVal > bVal ? 1 : -1) 
        : (aVal < bVal ? 1 : -1);
    });
  }, [data, sortKey, sortOrder]);

  return (
    <div className={`bg-card rounded-lg shadow-card border border-neutral-100 overflow-hidden flex flex-col ${fullWidth ? 'w-full' : ''}`}>
      <div className="px-6 py-4 border-b border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 border-b border-neutral-200">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  // 3. DYNAMIC ALIGNMENT
                  // We actually use the 'align' prop now
                  className={`px-6 py-3 font-semibold text-neutral-900 cursor-pointer hover:bg-neutral-100 transition-colors
                    ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}
                  `}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                >
                  <div className={`flex items-center gap-2 ${col.align === 'center' ? 'justify-center' : col.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                    {col.label}
                    {/* Visual sorting indicators */}
                    {sortKey === col.key ? (
                      sortOrder === 'asc' ? <ArrowUp className="w-3 h-3 text-neutral-600" /> : <ArrowDown className="w-3 h-3 text-neutral-600" />
                    ) : (
                      col.sortable !== false && <ChevronsUpDown className="w-3 h-3 text-neutral-300 opacity-0 group-hover:opacity-100" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-8 text-center text-neutral-500">
                  No data available
                </td>
              </tr>
            ) : (
              sortedData.map((row, idx) => {
                // 4. STABLE KEYS
                // Use the uniqueKey if it exists, otherwise fallback to index (risky but acceptable for simple lists)
                const rowKey = row[uniqueKey] ? String(row[uniqueKey]) : idx;
                
                return (
                  <tr key={rowKey} className="hover:bg-neutral-50 transition-colors group">
                    {columns.map((col) => (
                      <td 
                        key={`${rowKey}-${col.key}`} 
                        className={`px-6 py-3 text-neutral-900 
                          ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}
                        `}
                      >
                        {renderCell 
                          ? renderCell(row[col.key], col.key, row) 
                          : row[col.key]
                        }
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}