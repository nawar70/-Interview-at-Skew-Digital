"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useStudentStore } from "@/hooks/useStudentStore";

export function StatusFilter() {
  const { setStatusFilter } = useStudentStore();

  return (
    <DropdownMenu>
      
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={() => setStatusFilter("")}>
          All
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatusFilter("Submitted")}>
          Submitted
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatusFilter("Scheduled")}>
          Scheduled
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatusFilter("Approved")}>
          Approved
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatusFilter("Rescheduled")}>
          Rescheduled
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatusFilter("Pending")}>
          Pending
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatusFilter("Contract sent")}>
          Contract sent
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setStatusFilter("Enrolled")}>
          Enrolled
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}