"use client";

import { useEffect, useState } from "react";
import { GradeFilter } from "@/components/Filters/GradeFilter";
import { StatusFilter } from "@/components/Filters/StatusFilter";
import { StudentTable } from "@/components/Table/StudentTable";
import { useStudentStore } from "@/hooks/useStudentStore";
import { SearchBar } from "@/components/SearchBar";

export default function AdminPage() {
  const { students, fetchStudents, isLoading } = useStudentStore();
  const [showColumns, setShowColumns] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <div className="p-6 bg-gray-50 rounded-md shadow-md">
      <div className="flex flex-col space-y-4">
        {/* Row: Title, Total, Search, Show/Hide */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left: Title + Total */}
          <div className="flex items-center gap-3 min-w-[200px]">
            <h1 className="text-2xl font-bold text-gray-800 whitespace-nowrap">
              All students
            </h1>
            <div className="bg-blue-50 text-sm px-3 py-1 rounded-md">
              <span className="text-gray-500">Total:</span>{" "}
              <span className="text-blue-700 font-bold">
                {isLoading ? "..." : students.length}
              </span>
            </div>
          </div>

          {/* Right: Search + Toggle */}
          <div className="flex-grow flex justify-end">
            <SearchBar
              showColumns={showColumns}
              setShowColumns={setShowColumns}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-end gap-2">
          <GradeFilter />
          <StatusFilter />
        </div>

        {/* Table */}
        <StudentTable  />
      </div>
    </div>
  );
}
