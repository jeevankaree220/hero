"use client";

import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";

export interface TablerTableRef {
  getTable: () => Tabulator | null;
  getData: () => any[];
  setData: (data: any[]) => void;
  addRow: (data?: any) => void;
  deleteSelectedRows: () => void;
  clearFilters: () => void;
  searchData: (query: string, column: string) => void;
  filterByDateRange: (startDate: string, endDate: string, dateField: string) => void;
  downloadXLSX: (filename: string) => void;
  downloadCSV: (filename: string) => void;
  getSelectedRows: () => any[];
}

interface TablerTableProps {
  columns: any[];
  data: any[];
  onSelectionChange?: (hasSelection: boolean) => void;
  onDataChange?: (data: any[]) => void;
}

const TablerTable = forwardRef<TablerTableRef, TablerTableProps>(
  ({ columns, data, onSelectionChange, onDataChange }, ref) => {
    const tableRef = useRef<HTMLDivElement>(null);
    const tabulatorInstance = useRef<Tabulator | null>(null);
    const isInitialized = useRef(false);

    // Initialize Tabulator
    useEffect(() => {
      if (tableRef.current && !tabulatorInstance.current) {
        tabulatorInstance.current = new Tabulator(tableRef.current, {
          data: data,
          columns: columns,
          layout: "fitData",
          responsiveLayout: "collapse",
          height: "100%",
          movableColumns: true,
          resizableColumns: true,
          resizableRows: false,
          headerSort: true,
          headerSortTristate: true,
          clipboard: true,
          clipboardPasteAction: "replace",
          clipboardCopyConfig: {
            columnHeaders: true,
            columnGroups: false,
            rowHeaders: false,
            rowGroups: false,
            columnCalcs: false,
            dataTree: false,
            formatCells: true,
          },
          clipboardCopyRowRange: "selected",
          printAsHtml: true,
          printStyled: true,
          selectableRows: true,
          selectableRowsPersistence: false,
          index: "id",
          persistence: false,

          // Keyboard navigation
          keybindings: {
            navPrev: "shift + 9", // tab
            navNext: 9, // shift + tab
            navUp: 38, // up arrow
            navDown: 40, // down arrow
            scrollPageUp: 33, // page up
            scrollPageDown: 34, // page down
            scrollToStart: 36, // home
            scrollToEnd: 35, // end
            undo: false,
            redo: false,
            copyToClipboard: "ctrl + 67", // ctrl + c
          },
        });

        // Row selection changed event
        tabulatorInstance.current.on("rowSelectionChanged", (data) => {
          if (onSelectionChange) {
            onSelectionChange(data.length > 0);
          }
        });

        // Cell edited event
        tabulatorInstance.current.on("cellEdited", () => {
          if (onDataChange && tabulatorInstance.current) {
            const currentData = tabulatorInstance.current.getData();
            onDataChange(currentData);
          }
        });

        // Row deleted event
        tabulatorInstance.current.on("rowDeleted", () => {
          if (onDataChange && tabulatorInstance.current) {
            const currentData = tabulatorInstance.current.getData();
            onDataChange(currentData);
          }
        });

        // Row added event
        tabulatorInstance.current.on("rowAdded", () => {
          if (onDataChange && tabulatorInstance.current) {
            const currentData = tabulatorInstance.current.getData();
            onDataChange(currentData);
          }
        });

        isInitialized.current = true;
      }

      // Cleanup
      return () => {
        if (tabulatorInstance.current) {
          // Destroy instance on unmount
          tabulatorInstance.current.destroy();
          tabulatorInstance.current = null;
          isInitialized.current = false;
        }
      };
    }, []);

    // Update data and columns when sheet changes
    useEffect(() => {
      if (tabulatorInstance.current && isInitialized.current) {
        // Destroy and recreate table with new columns and data
        const parentElement = tableRef.current;
        if (parentElement) {
          tabulatorInstance.current.destroy();

          tabulatorInstance.current = new Tabulator(parentElement, {
            data: data,
            columns: columns,
            layout: "fitData",
            responsiveLayout: "collapse",
            height: "100%",
            movableColumns: true,
            resizableColumns: true,
            resizableRows: false,
            headerSort: true,
            headerSortTristate: true,
            clipboard: true,
            clipboardPasteAction: "replace",
            clipboardCopyConfig: {
              columnHeaders: true,
              columnGroups: false,
              rowHeaders: false,
              rowGroups: false,
              columnCalcs: false,
              dataTree: false,
              formatCells: true,
            },
            clipboardCopyRowRange: "selected",
            printAsHtml: true,
            printStyled: true,
            selectableRows: true,
            selectableRowsPersistence: false,
            index: "id",
            persistence: false,
            keybindings: {
              navPrev: "shift + 9",
              navNext: 9,
              navUp: 38,
              navDown: 40,
              scrollPageUp: 33,
              scrollPageDown: 34,
              scrollToStart: 36,
              scrollToEnd: 35,
              undo: false,
              redo: false,
              copyToClipboard: "ctrl + 67",
            },
          });

          // Re-attach event listeners
          tabulatorInstance.current.on("rowSelectionChanged", (data) => {
            if (onSelectionChange) {
              onSelectionChange(data.length > 0);
            }
          });

          tabulatorInstance.current.on("cellEdited", () => {
            if (onDataChange && tabulatorInstance.current) {
              const currentData = tabulatorInstance.current.getData();
              onDataChange(currentData);
            }
          });

          tabulatorInstance.current.on("rowDeleted", () => {
            if (onDataChange && tabulatorInstance.current) {
              const currentData = tabulatorInstance.current.getData();
              onDataChange(currentData);
            }
          });

          tabulatorInstance.current.on("rowAdded", () => {
            if (onDataChange && tabulatorInstance.current) {
              const currentData = tabulatorInstance.current.getData();
              onDataChange(currentData);
            }
          });
        }
      }
    }, [columns, data]);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      getTable: () => tabulatorInstance.current,

      getData: () => {
        if (tabulatorInstance.current) {
          return tabulatorInstance.current.getData();
        }
        return [];
      },

      setData: (newData: any[]) => {
        if (tabulatorInstance.current) {
          tabulatorInstance.current.replaceData(newData);
        }
      },

      addRow: (rowData?: any) => {
        if (tabulatorInstance.current) {
          const currentData = tabulatorInstance.current.getData();
          const maxId = currentData.reduce((max, row) => Math.max(max, row.id || 0), 0);
          const newRow = rowData || { id: maxId + 1 };
          tabulatorInstance.current.addRow(newRow, true); // Add to top
        }
      },

      deleteSelectedRows: () => {
        if (tabulatorInstance.current) {
          const selectedRows = tabulatorInstance.current.getSelectedRows();
          selectedRows.forEach((row) => row.delete());
        }
      },

      clearFilters: () => {
        if (tabulatorInstance.current) {
          tabulatorInstance.current.clearFilter();
          tabulatorInstance.current.clearHeaderFilter();
        }
      },

      searchData: (query: string, column: string) => {
        if (tabulatorInstance.current) {
          if (!query) {
            tabulatorInstance.current.clearFilter();
            return;
          }

          if (column === "all") {
            // Search across all columns
            tabulatorInstance.current.setFilter([
              (data: any) => {
                return Object.values(data).some((value) =>
                  String(value).toLowerCase().includes(query.toLowerCase())
                );
              },
            ]);
          } else {
            // Search specific column
            tabulatorInstance.current.setFilter(column, "like", query);
          }
        }
      },

      filterByDateRange: (startDate: string, endDate: string, dateField: string) => {
        if (tabulatorInstance.current) {
          tabulatorInstance.current.setFilter([
            (data: any) => {
              const dateValue = data[dateField];
              if (!dateValue) return false;
              return dateValue >= startDate && dateValue <= endDate;
            },
          ]);
        }
      },

      downloadXLSX: (filename: string) => {
        if (tabulatorInstance.current) {
          tabulatorInstance.current.download("xlsx", filename, { sheetName: "Data" });
        }
      },

      downloadCSV: (filename: string) => {
        if (tabulatorInstance.current) {
          tabulatorInstance.current.download("csv", filename);
        }
      },

      getSelectedRows: () => {
        if (tabulatorInstance.current) {
          return tabulatorInstance.current.getSelectedData();
        }
        return [];
      },
    }));

    return (
      <div className="w-full h-full overflow-hidden">
        <div ref={tableRef} className="tabulator-container" />
      </div>
    );
  }
);

TablerTable.displayName = "TablerTable";

export default TablerTable;
