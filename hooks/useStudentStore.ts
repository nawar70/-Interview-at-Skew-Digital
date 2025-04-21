import { create } from "zustand";
import { Student } from "@/types/student";

type Store = {
  students: Student[];
  filteredStudents: Student[];
  isLoading: boolean;
  error: string | null;
  fetchStudents: () => Promise<void>;
  gradeFilter: string;
  statusFilter: string;
  searchQuery: string;
  setGradeFilter: (grade: string) => void;
  setStatusFilter: (status: string) => void;
  setSearchQuery: (query: string) => void;
  updatePreviousSchool: (id: string, newSchool: string) => void;
  updateStatus: (id: string, newStatus: string) => void;
  applyFilters: () => void;
  updateNote: (id: string, note: string) => void;
};

export const useStudentStore = create<Store>((set, get) => ({
  students: [],
  filteredStudents: [],
  isLoading: false,
  error: null,
  gradeFilter: "",
  statusFilter: "",
  searchQuery: "",

  fetchStudents: async () => {
    set({ isLoading: true, error: null });
    try {
      const mockData: Student[] = [
        // Mock data for testing
        {
          studentId: "1001",
          sex: "male",
          firstName: "Emma",
          lastName: "Johnson",
          gradeLevel: "Preschool",
          previousSchool: "Little Explorers Academy",
          phase: "Submitted",
          lastUpdate: "2 hrs",
          notes: "Needs allergy medication",
        },
        // More student data...
      ];

      set({
        students: mockData,
        filteredStudents: mockData,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: "Failed to load student data",
        isLoading: false,
      });
      console.error("Error fetching students:", err);
    }
  },

  setGradeFilter: (grade: string) => {
    set({ gradeFilter: grade });
    get().applyFilters();
  },

  setStatusFilter: (status: string) => {
    set({ statusFilter: status });
    get().applyFilters();
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  updateNote: async (id: string, note: string) => {
    try {
      await fetch(`/api/students/${id}/note`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note }),
      });

      set((state) => ({
        students: state.students.map((student) =>
          student.studentId === id
            ? {
                ...student,
                notes: note,
                lastUpdate: new Date().toISOString(),
              }
            : student
        ),
      }));

      get().applyFilters();
    } catch (err) {
      console.error("Failed to update note:", err);
    }
  },

  updatePreviousSchool: async (id: string, newSchool: string) => {
    try {
      await fetch(`/api/students/${id}/previous-school`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ previousSchool: newSchool }),
      });

      set((state) => {
        const updatedStudents = state.students.map((student) =>
          student.studentId === id
            ? {
                ...student,
                previousSchool: newSchool,
                lastUpdate: new Date().toISOString(),
              }
            : student
        );
        return {
          students: updatedStudents,
          filteredStudents: updatedStudents,
        };
      });

      get().applyFilters();
    } catch (err) {
      console.error("Failed to update previous school:", err);
    }
  },

  updateStatus: async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/students/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      set((state) => {
        const updatedStudents = state.students.map((student) =>
          student.studentId === id
            ? {
                ...student,
                phase: newStatus,
                lastUpdate: new Date().toISOString(),
              }
            : student
        );
        return {
          students: updatedStudents,
          filteredStudents: updatedStudents,
        };
      });

      get().applyFilters();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  },

  applyFilters: () => {
    const { students, gradeFilter, statusFilter, searchQuery } = get();

    let filtered = [...students];

    if (gradeFilter) {
      filtered = filtered.filter((student) => student.gradeLevel === gradeFilter);
    }

    if (statusFilter) {
      filtered = filtered.filter((student) => student.phase === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (student) =>
          student.studentId.toLowerCase().includes(query) ||
          student.firstName.toLowerCase().includes(query) ||
          student.lastName.toLowerCase().includes(query)
      );
    }

    set({ filteredStudents: filtered });
  },
}));
