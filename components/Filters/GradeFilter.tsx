"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";


export function GradeFilter() {
  return (
    <DropdownMenu>
     
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Preschool</DropdownMenuItem>
        <DropdownMenuItem>Pre-k</DropdownMenuItem>
        <DropdownMenuItem>Kindergarten</DropdownMenuItem>
        <DropdownMenuItem>Grade 1</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}