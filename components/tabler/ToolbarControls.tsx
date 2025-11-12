"use client";

import { useState } from "react";
import { Plus, Trash2, Search, Calendar, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ToolbarControlsProps {
  onAddRow: () => void;
  onDeleteRow: () => void;
  onSearch: (query: string, column: string) => void;
  onDateFilter: (startDate: string, endDate: string) => void;
  onClearFilters: () => void;
  columns: any[];
  hasSelection: boolean;
}

export default function ToolbarControls({
  onAddRow,
  onDeleteRow,
  onSearch,
  onDateFilter,
  onClearFilters,
  columns,
  hasSelection
}: ToolbarControlsProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchColumn, setSearchColumn] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showDateFilter, setShowDateFilter] = useState(false);

  const handleSearch = () => {
    onSearch(searchQuery, searchColumn);
  };

  const handleDateFilter = () => {
    if (startDate && endDate) {
      onDateFilter(startDate, endDate);
    }
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setSearchColumn("all");
    setStartDate("");
    setEndDate("");
    setShowDateFilter(false);
    onClearFilters();
  };

  // Get date columns for filtering
  const dateColumns = columns.filter(col =>
    col.field && (col.field.toLowerCase().includes('date') || col.editor === 'date')
  );

  return (
    <div className="border-b bg-white px-6 py-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left Side - Add/Delete Actions */}
        <div className="flex items-center gap-2">
          <Button
            onClick={onAddRow}
            size="sm"
            className="gap-2 bg-[var(--softorange)] hover:bg-[var(--softorange)]/90 text-white"
          >
            <Plus className="h-4 w-4" />
            Add Row
          </Button>

          <Button
            onClick={onDeleteRow}
            size="sm"
            variant="outline"
            disabled={!hasSelection}
            className="gap-2 border-[var(--mist)] hover:bg-red-50 hover:text-red-600 hover:border-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>

          {(searchQuery || startDate || endDate) && (
            <Button
              onClick={handleClearAll}
              size="sm"
              variant="ghost"
              className="gap-2 text-gray-600 hover:text-gray-900"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Right Side - Search and Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Date Filter Toggle */}
          {dateColumns.length > 0 && (
            <Button
              onClick={() => setShowDateFilter(!showDateFilter)}
              size="sm"
              variant={showDateFilter ? "default" : "outline"}
              className="gap-2"
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden md:inline">Date Filter</span>
            </Button>
          )}

          {/* Search Column Selector */}
          <Select value={searchColumn} onValueChange={setSearchColumn}>
            <SelectTrigger className="w-[140px] h-9 border-[var(--mist)]">
              <SelectValue placeholder="Search in..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Columns</SelectItem>
              {columns.map((col) => (
                <SelectItem key={col.field} value={col.field}>
                  {col.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search Input */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="h-9 w-[200px] border-[var(--mist)]"
            />
            <Button
              onClick={handleSearch}
              size="sm"
              className="gap-2 bg-[var(--midnight)] hover:bg-[var(--midnight)]/90 text-white"
            >
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline">Search</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Date Filter Panel */}
      {showDateFilter && dateColumns.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-3 pt-3 border-t border-[var(--mist)]">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 font-medium">From:</label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="h-9 w-[160px] border-[var(--mist)]"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600 font-medium">To:</label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="h-9 w-[160px] border-[var(--mist)]"
            />
          </div>

          <Button
            onClick={handleDateFilter}
            size="sm"
            disabled={!startDate || !endDate}
            className="gap-2 bg-[var(--midnight)] hover:bg-[var(--midnight)]/90 text-white disabled:opacity-50"
          >
            <Filter className="h-4 w-4" />
            Apply Date Filter
          </Button>
        </div>
      )}
    </div>
  );
}
