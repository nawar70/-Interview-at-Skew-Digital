// components/Table/EditableCell.tsx
"use client";

import { useState } from "react";
import { useStudentStore } from "@/hooks/useStudentStore";
import { Student } from "@/types/student";

interface EditableCellProps {
  student: Student;
}

export function EditableCell({ student }: EditableCellProps) {
  const [value, setValue] = useState(student.previousSchool);
  const { updatePreviousSchool } = useStudentStore();

  const handleBlur = () => {
    if (value !== student.previousSchool) {
      updatePreviousSchool(student.studentId, value);
    }
  };

  return (
    <td>
      <input
        className="border p-1 rounded w-full"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
      />
    </td>
  );
}