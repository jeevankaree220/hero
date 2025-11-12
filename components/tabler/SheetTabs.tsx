"use client";

import { useState } from "react";
import { Plus, X, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SheetTab {
  id: string;
  name: string;
}

interface SheetTabsProps {
  sheets: SheetTab[];
  activeSheetId: string;
  onSheetChange: (sheetId: string) => void;
  onAddSheet: () => void;
  onRenameSheet: (sheetId: string, newName: string) => void;
  onDeleteSheet: (sheetId: string) => void;
}

export default function SheetTabs({
  sheets,
  activeSheetId,
  onSheetChange,
  onAddSheet,
  onRenameSheet,
  onDeleteSheet
}: SheetTabsProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleDoubleClick = (sheet: SheetTab) => {
    setEditingId(sheet.id);
    setEditName(sheet.name);
  };

  const handleRename = (sheetId: string) => {
    if (editName.trim() && editName !== sheets.find(s => s.id === sheetId)?.name) {
      onRenameSheet(sheetId, editName.trim());
    }
    setEditingId(null);
    setEditName("");
  };

  const handleKeyDown = (e: React.KeyboardEvent, sheetId: string) => {
    if (e.key === 'Enter') {
      handleRename(sheetId);
    } else if (e.key === 'Escape') {
      setEditingId(null);
      setEditName("");
    }
  };

  return (
    <div className="border-t bg-[var(--skymist)] h-12 flex items-center px-4 overflow-x-auto">
      <div className="flex items-center gap-1">
        {sheets.map((sheet) => (
          <div key={sheet.id} className="relative group">
            {editingId === sheet.id ? (
              <Input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onBlur={() => handleRename(sheet.id)}
                onKeyDown={(e) => handleKeyDown(e, sheet.id)}
                className="h-8 w-32 text-sm px-3 border-[var(--softorange)]"
                autoFocus
              />
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    onClick={() => onSheetChange(sheet.id)}
                    onDoubleClick={() => handleDoubleClick(sheet)}
                    className={`
                      relative h-9 px-4 rounded-t-lg text-sm font-medium transition-all
                      flex items-center gap-2 min-w-[120px] justify-between
                      ${activeSheetId === sheet.id
                        ? 'bg-white text-[var(--midnight)] shadow-sm border-t-2 border-t-[var(--softorange)]'
                        : 'bg-white/50 text-gray-600 hover:bg-white/80'
                      }
                    `}
                  >
                    <span className="truncate">{sheet.name}</span>
                    {sheets.length > 1 && (
                      <X
                        className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteSheet(sheet.id);
                        }}
                      />
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem
                    onClick={() => handleDoubleClick(sheet)}
                    className="gap-2 cursor-pointer"
                  >
                    <Edit2 className="h-4 w-4" />
                    Rename
                  </DropdownMenuItem>
                  {sheets.length > 1 && (
                    <DropdownMenuItem
                      onClick={() => onDeleteSheet(sheet.id)}
                      className="gap-2 cursor-pointer text-red-600 focus:text-red-600"
                    >
                      <X className="h-4 w-4" />
                      Delete Sheet
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        ))}

        {/* Add Sheet Button */}
        <Button
          onClick={onAddSheet}
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 rounded-lg hover:bg-white/80 transition-colors"
          title="Add new sheet"
        >
          <Plus className="h-4 w-4 text-gray-600" />
        </Button>
      </div>
    </div>
  );
}
