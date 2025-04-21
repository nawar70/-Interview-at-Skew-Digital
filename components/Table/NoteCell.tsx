// components/Table/NoteCell.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

interface NoteCellProps {
  note: string | undefined;
  onSave: (newNote: string) => void;
}

export function NoteCell({ note, onSave }: NoteCellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(note || "");

  return (
    <div className="flex items-center gap-2">
      {note && (
        <div className="max-w-xs truncate text-gray-500">
          {note}
        </div>
      )}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            {note ? (
              <Edit className="h-4 w-4 text-gray-500" />
            ) : (
              <Plus className="h-4 w-4 text-gray-500" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <h4 className="font-medium">Student Notes</h4>
            <Textarea
              placeholder="Add notes about this student..."
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  onSave(currentNote);
                  setIsOpen(false);
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}