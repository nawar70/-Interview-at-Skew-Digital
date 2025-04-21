"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { useStudentStore } from "@/hooks/useStudentStore";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchBarProps {
  showColumns: boolean;
  setShowColumns: (value: boolean) => void;
}

export function SearchBar({ showColumns, setShowColumns }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { setSearchQuery } = useStudentStore();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    setSearchQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchQuery]);

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Search input */}
      <div className="relative w-[250px]">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search..."
          className="pl-10 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Show/Hide Button */}
      <button
        onClick={() => setShowColumns(!showColumns)}
        className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-xl hover:bg-blue-50 transition"
      >
        {showColumns ? (
          <EyeNoneIcon className="w-4 h-4 mr-2" />
        ) : (
          <EyeOpenIcon className="w-4 h-4 mr-2" />
        )}
        Show / Hide
      </button>
    </div>
  );
}
