export const metadata = {
  title: 'Enterprise Datatable | Hero',
  description:
    'Enterprise-ready datatable experience with advanced filtering, exports, and minimal chrome built on Tabulator.',
}

import { DatatableClient } from './DatatableClient'

export default function DatatablePage() {
  return (
    <div className="mx-auto w-full px-6 py-6 lg:px-8">
      <DatatableClient />
    </div>
  )
}

