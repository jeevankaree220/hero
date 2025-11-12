'use client'

import dynamic from 'next/dynamic'

const EnterpriseDataTable = dynamic(() => import('@/components/datatable/EnterpriseDataTable'), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border border-dashed border-slate-200 p-12 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
      Preparing datatable experience…
    </div>
  ),
})

export function DatatableClient() {
  return <EnterpriseDataTable />
}

