declare module 'tabulator-tables' {
  export class TabulatorFull {
    constructor(element: HTMLElement, options?: Record<string, unknown>)
    destroy(): void
    setFilter(filter: (data: unknown) => boolean): void
    setHeight(height: number | string): void
    setPage(page: number): void
    setPageSize(size: number): void
    previousPage(): void
    nextPage(): void
    getPage(): number
    getPageMax(): number
    getDataCount(type?: 'all' | 'active' | 'visible'): number
    getColumns(includeHidden?: boolean): TabulatorColumn[]
    getColumn(field: string): TabulatorColumn | false
    download(
      type: 'csv' | 'xlsx' | 'json' | string,
      filename: string,
      options?: Record<string, unknown>
    ): void
    copyToClipboard(range?: 'selected' | 'table'): void
    replaceData(data: unknown[]): void
    on(event: string, callback: (...args: unknown[]) => void): void
  }

  export interface TabulatorColumn {
    getField(): string | undefined
    getDefinition(): Record<string, unknown>
    isVisible(): boolean
    show(): void
    hide(): void
  }
}

