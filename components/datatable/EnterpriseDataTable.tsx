'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Activity,
  BadgeCheck,
  BarChart3,
  Building2,
  ClipboardCopy,
  Columns3,
  Download,
  Filter,
  LineChart,
  RefreshCcw,
  Settings2,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

type Region = 'Americas' | 'EMEA' | 'APAC' | 'LATAM'
type Segment = 'Enterprise' | 'Upper Mid-Market' | 'Mid-Market' | 'Strategic'
type Portfolio = 'Cloud Infrastructure' | 'Payments' | 'Security' | 'Data Platform' | 'AI Services'
type Risk = 'Low' | 'Medium' | 'High'

interface FinancialRecord {
  id: number
  accountName: string
  accountCode: string
  region: Region
  segment: Segment
  portfolio: Portfolio
  owner: string
  arr: number
  forecast: number
  plan: number
  variance: number
  qoqGrowth: number
  yoyGrowth: number
  currency: 'USD' | 'EUR'
  renewalDate: string
  healthScore: number
  risk: Risk
  escalations: number
  tags: string[]
  netRetention: number
  grossMargin: number
  pipelineCoverage: number
  expansionPipeline: number
}

type TabulatorModule = typeof import('tabulator-tables')
type TabulatorInstance = import('tabulator-tables').TabulatorFull

const densityConfig = {
  compact: {
    className:
      'text-xs leading-4 [&_.tabulator-row]:text-xs [&_.tabulator-row]:py-1 [&_.tabulator-cell]:py-1 [&_.tabulator]:text-xs',
    height: undefined,
  },
  comfortable: {
    className:
      'text-sm [&_.tabulator-row]:text-sm [&_.tabulator-row]:py-1.5 [&_.tabulator-cell]:py-1.5 [&_.tabulator]:text-sm',
    height: undefined,
  },
  spacious: {
    className:
      'text-base [&_.tabulator-row]:text-base [&_.tabulator-row]:py-2.5 [&_.tabulator-cell]:py-2.5 [&_.tabulator]:text-base',
    height: undefined,
  },
} as const

const riskColorMap: Record<Risk, string> = {
  Low: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300',
  Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-300',
  High: 'bg-rose-500/10 text-rose-600 dark:text-rose-300',
}

const varianceColor = (value: number) =>
  value >= 0
    ? 'text-emerald-600 dark:text-emerald-300 bg-emerald-500/10'
    : 'text-rose-600 dark:text-rose-300 bg-rose-500/10'

const rowsPerPageOptions = [5, 10, 15, 20] as const
const DEFAULT_DATASET_SIZE = rowsPerPageOptions[0] * 5

const loadTabulator = async (): Promise<TabulatorModule> => {
  const module = await import('tabulator-tables')
  // @ts-expect-error - CSS side-effect import for Tabulator theme
  await import('tabulator-tables/dist/css/tabulator_modern.min.css')
  return module
}

const generateDataset = (size: number): FinancialRecord[] => {
  const accounts = [
    'Globex Manufacturing',
    'Initech Systems',
    'Prestige Worldwide',
    'Vandelay Logistics',
    'Acme Retail Group',
    'Soylent Nutrition',
    'Wayne Enterprises',
    'Stark Industries',
    'Umbra Security Alliance',
    'Zephyr Airlines',
    'Nimbus Cloud Cooperative',
    'Apollo Energy Partners',
    'Sapphire Banking Group',
    'Atlas Shipping Lines',
    'Panorama Media Holdings',
  ]
  const owners = [
    'Morgan Blake',
    'Priya Raman',
    'Daniela Ortiz',
    'Ethan Kim',
    'Charlotte Wu',
    'Noah Singh',
    'Amelia Carter',
    'Luca Moretti',
  ]
  const regions: Region[] = ['Americas', 'EMEA', 'APAC', 'LATAM']
  const segments: Segment[] = ['Enterprise', 'Upper Mid-Market', 'Mid-Market', 'Strategic']
  const portfolios: Portfolio[] = [
    'Cloud Infrastructure',
    'Payments',
    'Security',
    'Data Platform',
    'AI Services',
  ]
  const currencies: Array<'USD' | 'EUR'> = ['USD', 'EUR']
  const tagsPool = [
    'Q4 Renewal',
    'Expansion',
    'Usage Spike',
    'Exec Sponsor',
    'Co-Sell',
    'Net-New',
    'Multi-Year',
    'Needs Attention',
  ]

  const records: FinancialRecord[] = []
  for (let index = 0; index < size; index += 1) {
    const accountName = accounts[index % accounts.length]
    const region = regions[index % regions.length]
    const segment = segments[(index * 3) % segments.length]
    const portfolio = portfolios[(index * 5) % portfolios.length]
    const owner = owners[(index * 7) % owners.length]
    const currency = currencies[index % currencies.length]
    const arr = 1_450_000 + (index % 18) * 180_000 + Math.round(Math.sin(index) * 95_000)
    const forecast = arr * (1 + ((index % 6) - 2) * 0.03 + (index % 3) * 0.02)
    const plan = arr * (1 + ((index % 4) - 1) * 0.025)
    const variance = forecast - plan
    const qoqGrowth = 0.04 + ((index % 5) - 1) * 0.015
    const yoyGrowth = 0.18 + ((index % 7) - 2) * 0.02
    const renewalDate = new Date(2025, (index * 2) % 12, ((index * 6) % 27) + 1)
    const healthScore = Math.min(98, Math.max(55, 72 + ((index * 13) % 24) - (variance < 0 ? 8 : 0)))
    const risk: Risk =
      healthScore >= 80 ? 'Low' : healthScore >= 68 ? 'Medium' : variance < 0 ? 'High' : 'Medium'
    const escalations = variance < 0 || risk === 'High' ? (index % 3) + 1 : index % 2
    const tagCount = (index % 3) + 1
    const tags = Array.from({ length: tagCount }, (_, tagIdx) => tagsPool[(index + tagIdx * 3) % tagsPool.length])
    const netRetention = 1.06 + ((index % 6) - 2) * 0.015
    const grossMargin = 0.70 + ((index % 7) - 3) * 0.012
    const pipelineCoverage = 3.2 + ((index % 8) - 3) * 0.25
    const expansionPipeline = 380_000 + (index % 14) * 55_000

    records.push({
      id: index + 1,
      accountName,
      accountCode: `AC-${String(3000 + index).padStart(4, '0')}`,
      region,
      segment,
      portfolio,
      owner,
      arr,
      forecast,
      plan,
      variance,
      qoqGrowth,
      yoyGrowth,
      currency,
      renewalDate: renewalDate.toISOString().split('T')[0],
      healthScore,
      risk,
      escalations,
      tags,
      netRetention,
      grossMargin,
      pipelineCoverage,
      expansionPipeline,
    })
  }

  return records
}

const formatCurrency = (value: number, currency: 'USD' | 'EUR') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
    notation: 'compact',
  }).format(value)

const formatPercent = (value: number) => {
  const percentage = value * 100
  const formatted = percentage.toFixed(Math.abs(percentage) < 10 ? 1 : 0)
  return `${percentage > 0 ? '+' : ''}${formatted}%`
}

const formatPercentRatio = (value: number) => {
  const percentage = value * 100
  const precision = percentage >= 100 ? 0 : 1
  return `${percentage.toFixed(precision)}%`
}

const buildSparkline = (values: number[], accent: 'positive' | 'negative') => {
  if (!values.length) return ''

  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = Math.max(max - min, 1)

  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 100
      const y = 100 - ((value - min) / range) * 100
      return `${x},${y}`
    })
    .join(' ')

  return `
    <div class="flex items-center gap-3">
      <svg width="140" height="40" viewBox="0 0 100 35" preserveAspectRatio="none" class="h-9 w-[140px] overflow-visible">
        <polyline
          fill="none"
          stroke="${accent === 'positive' ? '#22c55e' : '#f97316'}"
          stroke-width="2.4"
          points="${points.replace(/,(-?\\d+(?:\\.\\d+)?)/g, (_match, y) => `,${(Number(y) * 0.35).toFixed(2)}`)}"
          stroke-linecap="round"
          stroke-linejoin="round"
          opacity="0.9"
        />
        <polyline
          fill="url(#gradient)"
          stroke="none"
          points="0,35 ${points.replace(/,(-?\\d+(?:\\.\\d+)?)/g, (_match, y) => `,${(Number(y) * 0.35).toFixed(2)}`)} 100,35"
          opacity="0.18"
        />
        <defs>
          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stop-color="${accent === 'positive' ? '#22c55e' : '#f97316'}" />
            <stop offset="100%" stop-color="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  `
}

type Density = keyof typeof densityConfig

interface FilterState {
  region: Region | 'all'
  segment: Segment | 'all'
  portfolio: Portfolio | 'all'
  risk: Risk | 'all'
  expiringSoon: boolean
  highRiskOnly: boolean
}

const defaultFilters: FilterState = {
  region: 'all',
  segment: 'all',
  portfolio: 'all',
  risk: 'all',
  expiringSoon: false,
  highRiskOnly: false,
}

export function EnterpriseDataTable() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const tabulatorRef = useRef<TabulatorInstance | null>(null)

  const [dataset, setDataset] = useState(() => generateDataset(DEFAULT_DATASET_SIZE))
  const [isInitializing, setIsInitializing] = useState(true)
  const [isReady, setIsReady] = useState(false)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [density, setDensity] = useState<Density>('comfortable')
  const [selectedCount, setSelectedCount] = useState(0)
  const [pageSize, setPageSize] = useState<number>(rowsPerPageOptions[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [columnsState, setColumnsState] = useState<
    {
      field: string
      title: string
      visible: boolean
    }[]
  >([])
  const [totalRecords, setTotalRecords] = useState(dataset.length)
  const [visibleRecords, setVisibleRecords] = useState(dataset.length)

  const uniqueFilters = useMemo(() => {
    const unique = <T,>(values: T[]) => Array.from(new Set(values)).sort()
    return {
      regions: unique(dataset.map((item) => item.region)),
      segments: unique(dataset.map((item) => item.segment)),
      portfolios: unique(dataset.map((item) => item.portfolio)),
    }
  }, [dataset])

  useEffect(() => {
    let isMounted = true

    const setupTable = async () => {
      if (!containerRef.current) return
      setIsInitializing(true)
      const { TabulatorFull } = await loadTabulator()
      if (!isMounted || !containerRef.current) return

      const table = new TabulatorFull(containerRef.current, {
        data: dataset,
        layout: 'fitColumns',
        ...(densityConfig[density].height !== undefined
          ? { height: densityConfig[density].height }
          : {}),
        pagination: true,
        paginationMode: 'local',
        paginationInitialPage: 1,
        paginationSize: rowsPerPageOptions[0],
        paginationSizeSelector: [...rowsPerPageOptions],
        columnDefaults: {
          headerSortTristate: true,
          vertAlign: 'middle',
          resizable: true,
          minWidth: 120,
        },
        selectable: true,
        selectableRangeMode: 'drag',
        selectableRangeClearCells: true,
        reactiveData: true,
        placeholder: 'No matching financial records',
        columnHeaderVertAlign: 'bottom',
        keybindings: {
          'select-all': 'ctrl + a',
        },
        columns: [
          {
            title: '',
            field: 'selection',
            width: 44,
            hozAlign: 'center',
            formatter: 'rowSelection',
            titleFormatter: 'rowSelection',
            headerSort: false,
            cssClass: 'selection-cell',
          },
          {
            title: 'Account',
            field: 'accountName',
            minWidth: 220,
            headerHozAlign: 'left',
            formatter: (cell: any) => {
              const row = cell.getData() as FinancialRecord
              return `<div class="flex flex-col gap-0.5">
                <span class="font-medium text-slate-900 dark:text-slate-100">${row.accountName}</span>
                <span class="text-[11px] uppercase tracking-wide text-slate-400">${row.accountCode}・${row.owner}</span>
              </div>`
            },
            variableHeight: true,
          },
          {
            title: 'Region',
            field: 'region',
            width: 120,
          },
          {
            title: 'Segment',
            field: 'segment',
            width: 140,
          },
          {
            title: 'Portfolio',
            field: 'portfolio',
            minWidth: 180,
          },
          {
            title: 'ARR',
            field: 'arr',
            width: 120,
            hozAlign: 'right',
            sorter: 'number',
            formatter: (cell: any) => {
              const row = cell.getData() as FinancialRecord
              return formatCurrency(cell.getValue() as number, row.currency)
            },
          },
          {
            title: 'QoQ Growth',
            field: 'qoqGrowth',
            width: 140,
            hozAlign: 'center',
            sorter: 'number',
            formatter: (cell: any) => {
              const value = cell.getValue() as number
              const positive = value >= 0
              return `<span class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                positive
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                  : 'bg-rose-500/10 text-rose-600 dark:text-rose-300'
              }">
                ${positive ? '+' : ''}
                ${formatPercent(value)}
              </span>`
            },
          },
          {
            title: 'Forecast',
            field: 'forecast',
            width: 130,
            hozAlign: 'right',
            sorter: 'number',
            formatter: (cell: any) => {
              const row = cell.getData() as FinancialRecord
              return formatCurrency(cell.getValue() as number, row.currency)
            },
          },
          {
            title: 'Plan',
            field: 'plan',
            width: 120,
            hozAlign: 'right',
            sorter: 'number',
            formatter: (cell: any) => {
              const row = cell.getData() as FinancialRecord
              return formatCurrency(cell.getValue() as number, row.currency)
            },
          },
          {
            title: 'Variance',
            field: 'variance',
            width: 140,
            hozAlign: 'center',
            sorter: 'number',
            formatter: (cell: any) => {
              const row = cell.getData() as FinancialRecord
              const value = cell.getValue() as number
              const absFormatted = formatCurrency(Math.abs(value), row.currency)
              return `<span class="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${varianceColor(
                value
              )}">
                ${value >= 0 ? '▲' : '▼'} ${absFormatted}
              </span>`
            },
          },
      {
        title: 'Net Retention',
        field: 'netRetention',
        width: 150,
        hozAlign: 'center',
        sorter: 'number',
        formatter: (cell: any) => {
          const value = cell.getValue() as number
          return `<span class="inline-flex items-center gap-1 rounded-full bg-indigo-500/10 px-2 py-1 text-xs font-medium text-indigo-600 dark:text-indigo-300">${formatPercentRatio(
            value
          )}</span>`
        },
      },
      {
        title: 'Gross Margin',
        field: 'grossMargin',
        width: 130,
        hozAlign: 'center',
        sorter: 'number',
        formatter: (cell: any) => {
          const value = cell.getValue() as number
          return `<span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-300">${formatPercentRatio(
            value
          )}</span>`
        },
      },
      {
        title: 'Pipeline Coverage',
        field: 'pipelineCoverage',
        width: 160,
        hozAlign: 'center',
        sorter: 'number',
        formatter: (cell: any) => `<span class="font-medium text-slate-700 dark:text-slate-200">${(cell.getValue() as number).toFixed(1)}x</span>`,
      },
      {
        title: 'Expansion Pipeline',
        field: 'expansionPipeline',
        minWidth: 170,
        hozAlign: 'right',
        sorter: 'number',
        formatter: (cell: any) => {
          const row = cell.getData() as FinancialRecord
          return formatCurrency(cell.getValue() as number, row.currency)
        },
      },
          {
            title: 'Health',
            field: 'healthScore',
            width: 150,
            sorter: 'number',
            formatter: (cell: any) => {
              const value = cell.getValue() as number
              return `<div class="flex flex-col gap-1">
                <span class="text-sm font-medium text-slate-900 dark:text-slate-100">${value}/100</span>
                <div class="relative h-2.5 rounded-full bg-slate-200 dark:bg-slate-700">
                  <div class="absolute inset-y-0 left-0 rounded-full ${
                    value >= 80
                      ? 'bg-emerald-500'
                      : value >= 70
                        ? 'bg-amber-400'
                        : 'bg-rose-500'
                  }" style="width:${value}%"></div>
                </div>
              </div>`
            },
          },
          {
            title: 'Renewal',
            field: 'renewalDate',
            width: 140,
            sorter: 'date',
            formatter: (cell: any) => {
              const value = cell.getValue() as string
              return new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }).format(new Date(value))
            },
          },
          {
            title: 'Risk',
            field: 'risk',
            width: 110,
            formatter: (cell: any) => {
              const value = cell.getValue() as Risk
              return `<span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${riskColorMap[value]}">${value}</span>`
            },
          },
          {
            title: 'Escalations',
            field: 'escalations',
            width: 130,
            hozAlign: 'center',
            sorter: 'number',
          },
          {
            title: 'Tags',
            field: 'tags',
            minWidth: 220,
            formatter: (cell: any) => {
              const tags = cell.getValue() as string[]
              return `<div class="flex flex-wrap gap-1">${tags
                .map(
                  (tag) =>
                    `<span class="inline-flex items-center rounded-full border border-slate-200 px-2 py-1 text-[11px] text-slate-500 dark:border-slate-700 dark:text-slate-300">${tag}</span>`
                )
                .join('')}</div>`
            },
          },
        ],
      })

      tabulatorRef.current = table
      setIsInitializing(false)
      setIsReady(true)
      setTotalRecords(dataset.length)
      setVisibleRecords(dataset.length)
      setCurrentPage(1)

      const initialColumns = table
        .getColumns(true)
        .filter((column) => column.getField() && column.getField() !== 'selection')
        .map((column) => ({
          field: column.getField() as string,
          title: String(column.getDefinition().title ?? column.getField()),
          visible: column.isVisible(),
        }))
      setColumnsState(initialColumns)

      table.on('rowSelectionChanged', (...args) => {
        const data = Array.isArray(args[0]) ? (args[0] as unknown[]) : []
        setSelectedCount(data.length)
      })
      table.on('columnVisibilityChanged', (column: any) => {
        const field = column.getField()
        if (!field || field === 'selection') return
        setColumnsState((prev) =>
          prev.map((meta) => (meta.field === field ? { ...meta, visible: column.isVisible() } : meta))
        )
      })
      table.on('pageLoaded', (...args) => {
        const page = args[0]
        if (typeof page === 'number') {
          setCurrentPage(page)
        }
      })
      table.on('dataFiltered', (...args) => {
        const rows = Array.isArray(args[1]) ? (args[1] as unknown[]) : []
        const filteredCount = rows.length
        setVisibleRecords(filteredCount)
        const shouldReset = typeof table.getPage === 'function' ? table.getPage() !== 1 : true
        if (shouldReset) {
          table.setPage(1)
        } else {
          setCurrentPage(1)
        }
      })
    }

    setupTable()

    return () => {
      isMounted = false
      tabulatorRef.current?.destroy()
      tabulatorRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const table = tabulatorRef.current
    if (!table) return
    table.setPageSize(pageSize)
    table.setPage(1)
    if (typeof table.getDataCount === 'function') {
      setVisibleRecords(table.getDataCount('active'))
    }
    setCurrentPage(1)
  }, [pageSize])

  useEffect(() => {
    const table = tabulatorRef.current
    setTotalRecords(dataset.length)
    setVisibleRecords(dataset.length)
    setCurrentPage(1)
    if (!table) return
    table.replaceData(dataset)
    const activeCount =
      typeof table.getDataCount === 'function' ? table.getDataCount('active') : dataset.length
    setVisibleRecords(activeCount ?? dataset.length)
    table.setPage(1)
  }, [dataset])

  useEffect(() => {
    const table = tabulatorRef.current
    if (!table) return
    table.setFilter((data) => {
      const rowData = data as FinancialRecord
      const matchesSearch =
        !search.trim() ||
        Object.values(rowData as FinancialRecord)
          .join(' ')
          .toLowerCase()
          .includes(search.toLowerCase())
      if (!matchesSearch) return false

      if (filters.region !== 'all' && rowData.region !== filters.region) return false
      if (filters.segment !== 'all' && rowData.segment !== filters.segment) return false
      if (filters.portfolio !== 'all' && rowData.portfolio !== filters.portfolio) return false
      if (filters.risk !== 'all' && rowData.risk !== filters.risk) return false

      if (filters.expiringSoon) {
        const today = new Date()
        const renewal = new Date(rowData.renewalDate)
        const diffDays = (renewal.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        if (diffDays > 90 || diffDays < 0) return false
      }

      if (filters.highRiskOnly && rowData.risk !== 'High' && rowData.healthScore >= 70) return false

      return true
    })
  }, [filters, search])

  const handleResetFilters = () => {
    setFilters(defaultFilters)
    setSearch('')
  }

  const handleDownload = (format: 'csv' | 'xlsx' | 'json') => {
    const table = tabulatorRef.current
    if (!table) return

    const filename = `enterprise-financials-${new Date().toISOString().split('T')[0]}`
    const options =
      format === 'xlsx'
        ? { sheetName: 'Revenue' }
        : {
            bom: true,
          }

    table.download(format, `${filename}.${format}`, options)
  }

  const handleColumnToggle = (field: string) => {
    const table = tabulatorRef.current
    if (!table) return
    const column = table.getColumn(field)
    if (!column) return

    if (column.isVisible()) {
      column.hide()
    } else {
      column.show()
    }
  }

  const handleRevealAllColumns = () => {
    const table = tabulatorRef.current
    if (!table) return
    table
      .getColumns(true)
      .filter((column) => column.getField() && column.getField() !== 'selection')
      .forEach((column) => column.show())
    setColumnsState((prev) => prev.map((meta) => ({ ...meta, visible: true })))
  }

  const handleCopySelection = () => {
    const table = tabulatorRef.current
    if (!table) return
    table.copyToClipboard('selected')
  }

  const handleRefreshData = () => {
    const refreshed = generateDataset(DEFAULT_DATASET_SIZE)
    setDataset(refreshed)
  }

  const visibleColumnsCount = columnsState.filter((meta) => meta.visible).length
  const totalPages = Math.max(1, Math.ceil(Math.max(visibleRecords, 1) / pageSize))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const canGoPrev = safeCurrentPage <= 1
  const canGoNext = safeCurrentPage >= totalPages

  const handleFirstPage = () => {
    const table = tabulatorRef.current
    if (!table) return
    if (safeCurrentPage !== 1) {
      table.setPage(1)
    }
    setCurrentPage(1)
  }

  const handlePrevPage = () => {
    const table = tabulatorRef.current
    if (!table || canGoPrev) return
    if (typeof table.previousPage === 'function') {
      table.previousPage()
    } else {
      table.setPage(Math.max(1, safeCurrentPage - 1))
    }
  }

  const handleNextPage = () => {
    const table = tabulatorRef.current
    if (!table || canGoNext) return
    if (typeof table.nextPage === 'function') {
      table.nextPage()
    } else {
      table.setPage(Math.min(totalPages, safeCurrentPage + 1))
    }
  }

  const handleLastPage = () => {
    const table = tabulatorRef.current
    if (!table) return
    if (safeCurrentPage !== totalPages) {
      table.setPage(totalPages)
    }
    setCurrentPage(totalPages)
  }

  const handleGoToPage = (page: number) => {
    const table = tabulatorRef.current
    if (!table) return
    table.setPage(page)
    setCurrentPage(page)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold tracking-tight text-slate-500 dark:text-slate-400">
                <Sparkles className="size-4 text-indigo-500" />
                Enterprise Financial Datatable
              </div>
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                Billion-Dollar Financial Control Tower
              </h1>
              <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                Inspect revenue commitments, margin posture, and renewal exposure across a billion-dollar
                portfolio. All controls stay anchored while only the results pane scrolls, enabling
                precise comparisons without sacrificing context.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-1 dark:border-slate-800">
                  <BadgeCheck className="size-3 text-emerald-500" />
                  SOX aligned
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-1 dark:border-slate-800">
                  <Building2 className="size-3 text-indigo-500" />
                  Board-ready metrics
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-1 dark:border-slate-800">
                  <LineChart className="size-3 text-slate-400" />
                  Scroll locked to rows
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end justify-between gap-4">
              <div className="text-right">
                <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  Selected Accounts
                </p>
                <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{selectedCount}</p>
              </div>
              <Tabs
                value={density}
                onValueChange={(value) => setDensity(value as Density)}
                className="w-full min-w-[220px] sm:w-auto"
              >
                <TabsList className="grid h-9 grid-cols-3 bg-slate-100 text-xs dark:bg-slate-900/70">
                  <TabsTrigger value="compact">Compact 10</TabsTrigger>
                  <TabsTrigger value="comfortable">Comfort</TabsTrigger>
                  <TabsTrigger value="spacious">Expanded</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/60">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex flex-1 items-center">
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search accounts, owners, regions, tags..."
                className="h-10 rounded-xl bg-slate-100/70 pl-10 text-sm shadow-inner outline-none ring-0 transition dark:bg-slate-900/70"
              />
              <SlidersHorizontal className="absolute left-3 size-4 text-slate-400" />
            </div>
            <Select value={String(pageSize)} onValueChange={(value) => setPageSize(Number(value))}>
              <SelectTrigger className="h-10 w-[150px] rounded-xl border-slate-200 bg-white text-sm dark:border-slate-800 dark:bg-slate-900/70">
                <SelectValue placeholder="Rows / page" />
              </SelectTrigger>
              <SelectContent>
                {rowsPerPageOptions.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option} rows
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 rounded-xl border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <Columns3 className="size-4" />
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {columnsState.map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.field}
                    checked={column.visible}
                    onCheckedChange={() => handleColumnToggle(column.field)}
                    className="capitalize"
                  >
                    {column.title.replace(/\s+/g, ' ')}
                  </DropdownMenuCheckboxItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={(event) => {
                    event.preventDefault()
                    handleRevealAllColumns()
                  }}
                >
                  Reveal hidden columns
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 rounded-xl border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <Download className="size-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-44 text-sm">
                <DropdownMenuItem onSelect={() => handleDownload('csv')}>
                  CSV (UTF-8)
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleDownload('xlsx')}>
                  Excel workbook
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => handleDownload('json')}>
                  JSON snapshot
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopySelection}
              className="h-10 rounded-xl border-slate-200 bg-white px-3 text-sm dark:border-slate-800 dark:bg-slate-900/70"
            >
              <ClipboardCopy className="size-4" />
              Copy
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefreshData}
              className="h-10 rounded-xl px-3 text-sm text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
            >
              <RefreshCcw className="size-4" />
            </Button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="size-4 text-slate-400" />
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Filters
                </span>
              </div>
              <Select
                value={filters.region}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, region: value as FilterState['region'] }))}
              >
                <SelectTrigger className="h-9 w-[140px] rounded-lg border-slate-200 bg-white text-xs dark:border-slate-800 dark:bg-slate-950/60">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All regions</SelectItem>
                  {uniqueFilters.regions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={filters.segment}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, segment: value as FilterState['segment'] }))}
              >
                <SelectTrigger className="h-9 w-[160px] rounded-lg border-slate-200 bg-white text-xs dark:border-slate-800 dark:bg-slate-950/60">
                  <SelectValue placeholder="Segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All segments</SelectItem>
                  {uniqueFilters.segments.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={filters.portfolio}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, portfolio: value as FilterState['portfolio'] }))
                }
              >
                <SelectTrigger className="h-9 w-[180px] rounded-lg border-slate-200 bg-white text-xs dark:border-slate-800 dark:bg-slate-950/60">
                  <SelectValue placeholder="Portfolio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All portfolios</SelectItem>
                  {uniqueFilters.portfolios.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={filters.risk}
                onValueChange={(value) => setFilters((prev) => ({ ...prev, risk: value as FilterState['risk'] }))}
              >
                <SelectTrigger className="h-9 w-[130px] rounded-lg border-slate-200 bg-white text-xs dark:border-slate-800 dark:bg-slate-950/60">
                  <SelectValue placeholder="Risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All risk levels</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
              <Separator orientation="vertical" className="hidden h-6 sm:flex" />
              <div
                role="button"
                tabIndex={0}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    expiringSoon: !prev.expiringSoon,
                  }))
                }
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setFilters((prev) => ({
                      ...prev,
                      expiringSoon: !prev.expiringSoon,
                    }))
                  }
                }}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
                  filters.expiringSoon
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:border-indigo-400 dark:text-indigo-300'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900'
                )}
              >
                <Checkbox
                  id="expiringSoon"
                  checked={filters.expiringSoon}
                  onCheckedChange={(checked) =>
                    setFilters((prev) => ({
                      ...prev,
                      expiringSoon: Boolean(checked),
                    }))
                  }
                />
                <span>Renewal &lt; 90d</span>
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    highRiskOnly: !prev.highRiskOnly,
                  }))
                }
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setFilters((prev) => ({
                      ...prev,
                      highRiskOnly: !prev.highRiskOnly,
                    }))
                  }
                }}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500',
                  filters.highRiskOnly
                    ? 'border-rose-500 bg-rose-500/10 text-rose-600 dark:border-rose-400 dark:text-rose-300'
                    : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-900'
                )}
              >
                <Checkbox
                  id="highRisk"
                  checked={filters.highRiskOnly}
                  onCheckedChange={(checked) =>
                    setFilters((prev) => ({
                      ...prev,
                      highRiskOnly: Boolean(checked),
                    }))
                  }
                />
                <span>High risk focus</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetFilters}
                className="ml-auto h-9 rounded-lg px-3 text-xs text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
              >
                Reset
              </Button>
            </div>
          </div>

          <div
            className={cn(
              'relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-inner ring-1 ring-black/5 dark:border-slate-800 dark:bg-slate-950/60',
              densityConfig[density].className
            )}
          >
            <div
              ref={containerRef}
              className="tabulator-minimal [&_.tabulator-footer]:hidden [&_.tabulator-header]:sticky [&_.tabulator-header]:top-0 [&_.tabulator-header]:z-20 [&_.tabulator-header]:border-b [&_.tabulator-header]:border-slate-200 [&_.tabulator-tableholder]:max-h-none [&_.tabulator-tableholder]:overflow-y-auto dark:[&_.tabulator-header]:border-slate-800"
            />
            {(!isReady || isInitializing) && (
              <div className="absolute inset-0 flex items-center justify-center gap-2 rounded-2xl bg-white/90 text-sm text-slate-500 backdrop-blur-sm dark:bg-slate-950/90 dark:text-slate-400">
                <Settings2 className="size-4 animate-spin" />
                Initializing financial workspace...
              </div>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Activity className="size-3 text-emerald-500" />
              Keyboard (`↑↓`), range select (Shift+Click), copy (`Ctrl+C`), export, and tri-state sorts remain live while the grid body scrolls independently.
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="size-3 text-indigo-500" />
                {visibleColumnsCount} columns visible ・ {visibleRecords} of {totalRecords} accounts
              </div>
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap">
                  Page {safeCurrentPage} of {totalPages}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={handleFirstPage}
                    disabled={canGoPrev}
                  >
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">First page</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={handlePrevPage}
                    disabled={canGoPrev}
                  >
                    <span aria-hidden="true">‹</span>
                    <span className="sr-only">Previous page</span>
                  </Button>
                  {Array.from({ length: totalPages }, (_, index) => {
                    const page = index + 1
                    const isActive = page === safeCurrentPage
                    return (
                      <Button
                        key={page}
                        variant={isActive ? 'default' : 'ghost'}
                        size="sm"
                        className={cn('h-8 px-3', isActive && 'cursor-default')}
                        onClick={() => handleGoToPage(page)}
                        disabled={isActive}
                      >
                        {page}
                      </Button>
                    )
                  })}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={handleNextPage}
                    disabled={canGoNext}
                  >
                    <span aria-hidden="true">›</span>
                    <span className="sr-only">Next page</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2"
                    onClick={handleLastPage}
                    disabled={canGoNext}
                  >
                    <span aria-hidden="true">»</span>
                    <span className="sr-only">Last page</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnterpriseDataTable

