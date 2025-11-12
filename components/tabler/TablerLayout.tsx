"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import TablerNavbar from "./TablerNavbar";
import ToolbarControls from "./ToolbarControls";
import TablerTable, { TablerTableRef } from "./TablerTable";
import SheetTabs from "./SheetTabs";
import { defaultSheets, generateNewRow, SheetData } from "@/lib/tablerData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function TablerLayout() {
  const router = useRouter();
  const tableRef = useRef<TablerTableRef>(null);

  // State management
  const [sheets, setSheets] = useState<SheetData[]>(defaultSheets);
  const [activeSheetId, setActiveSheetId] = useState<string>(defaultSheets[0].id);
  const [hasSelection, setHasSelection] = useState(false);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  // Get active sheet
  const activeSheet = sheets.find(s => s.id === activeSheetId) || sheets[0];

  // Handle sheet change
  const handleSheetChange = (sheetId: string) => {
    setActiveSheetId(sheetId);
    setHasSelection(false);
  };

  // Handle add new sheet
  const handleAddSheet = () => {
    const newSheetNumber = sheets.length + 1;
    const newSheet: SheetData = {
      id: `sheet-${Date.now()}`,
      name: `Sheet ${newSheetNumber}`,
      columns: [
        { title: "ID", field: "id", width: 80, frozen: true, headerSort: true },
        { title: "Column A", field: "columnA", width: 150, editor: "input", headerSort: true },
        { title: "Column B", field: "columnB", width: 150, editor: "input", headerSort: true },
        { title: "Column C", field: "columnC", width: 150, editor: "input", headerSort: true },
        { title: "Column D", field: "columnD", width: 150, editor: "input", headerSort: true },
      ],
      data: [{ id: 1, columnA: "", columnB: "", columnC: "", columnD: "" }],
      type: 'custom'
    };

    setSheets([...sheets, newSheet]);
    setActiveSheetId(newSheet.id);
  };

  // Handle rename sheet
  const handleRenameSheet = (sheetId: string, newName: string) => {
    setSheets(sheets.map(sheet =>
      sheet.id === sheetId ? { ...sheet, name: newName } : sheet
    ));
  };

  // Handle delete sheet
  const handleDeleteSheet = (sheetId: string) => {
    if (sheets.length === 1) return; // Keep at least one sheet

    const newSheets = sheets.filter(s => s.id !== sheetId);
    setSheets(newSheets);

    // If deleting active sheet, switch to first sheet
    if (sheetId === activeSheetId) {
      setActiveSheetId(newSheets[0].id);
    }
  };

  // Handle add row
  const handleAddRow = () => {
    if (tableRef.current) {
      const currentData = tableRef.current.getData();
      const maxId = currentData.reduce((max, row) => Math.max(max, row.id || 0), 0);
      const newRow = generateNewRow(activeSheet.type, maxId + 1);
      tableRef.current.addRow(newRow);
    }
  };

  // Handle delete row
  const handleDeleteRow = () => {
    if (tableRef.current) {
      tableRef.current.deleteSelectedRows();
    }
  };

  // Handle search
  const handleSearch = (query: string, column: string) => {
    if (tableRef.current) {
      tableRef.current.searchData(query, column);
    }
  };

  // Handle date filter
  const handleDateFilter = (startDate: string, endDate: string) => {
    if (tableRef.current) {
      // Find first date column in active sheet
      const dateColumn = activeSheet.columns.find(col =>
        col.field && (col.field.toLowerCase().includes('date') || col.editor === 'date')
      );

      if (dateColumn) {
        tableRef.current.filterByDateRange(startDate, endDate, dateColumn.field);
      }
    }
  };

  // Handle clear filters
  const handleClearFilters = () => {
    if (tableRef.current) {
      tableRef.current.clearFilters();
    }
  };

  // Handle download
  const handleDownload = () => {
    setShowDownloadDialog(true);
  };

  const handleDownloadXLSX = () => {
    if (tableRef.current) {
      const filename = `${activeSheet.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;
      tableRef.current.downloadXLSX(filename);
      setShowDownloadDialog(false);
    }
  };

  const handleDownloadCSV = () => {
    if (tableRef.current) {
      const filename = `${activeSheet.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
      tableRef.current.downloadCSV(filename);
      setShowDownloadDialog(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    router.push('/');
  };

  // Handle data change - update sheet data
  const handleDataChange = (newData: any[]) => {
    setSheets(sheets.map(sheet =>
      sheet.id === activeSheetId ? { ...sheet, data: newData } : sheet
    ));
  };

  return (
    <div className="flex flex-col h-screen bg-[var(--snow)]">
      {/* Navbar */}
      <TablerNavbar onDownload={handleDownload} onLogout={handleLogout} />

      {/* Toolbar Controls */}
      <ToolbarControls
        onAddRow={handleAddRow}
        onDeleteRow={handleDeleteRow}
        onSearch={handleSearch}
        onDateFilter={handleDateFilter}
        onClearFilters={handleClearFilters}
        columns={activeSheet.columns}
        hasSelection={hasSelection}
      />

      {/* Main Table Area */}
      <div className="flex-1 overflow-hidden px-6 py-4">
        <div className="h-full bg-white rounded-lg shadow-sm border border-[var(--mist)] overflow-hidden">
          <TablerTable
            ref={tableRef}
            columns={activeSheet.columns}
            data={activeSheet.data}
            onSelectionChange={setHasSelection}
            onDataChange={handleDataChange}
          />
        </div>
      </div>

      {/* Sheet Tabs */}
      <SheetTabs
        sheets={sheets.map(s => ({ id: s.id, name: s.name }))}
        activeSheetId={activeSheetId}
        onSheetChange={handleSheetChange}
        onAddSheet={handleAddSheet}
        onRenameSheet={handleRenameSheet}
        onDeleteSheet={handleDeleteSheet}
      />

      {/* Download Dialog */}
      <Dialog open={showDownloadDialog} onOpenChange={setShowDownloadDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-[var(--midnight)]">Download Data</DialogTitle>
            <DialogDescription>
              Choose the format to download the current sheet: <strong>{activeSheet.name}</strong>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={handleDownloadXLSX}
              className="w-full sm:w-auto bg-[var(--softorange)] hover:bg-[var(--softorange)]/90"
            >
              Download as Excel (.xlsx)
            </Button>
            <Button
              onClick={handleDownloadCSV}
              variant="outline"
              className="w-full sm:w-auto border-[var(--mist)]"
            >
              Download as CSV (.csv)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
