import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useStudentStore } from "@/hooks/useStudentStore";
import { cn } from "@/lib/utils";

// Color mapping for text/background and dot color
const statusStyles: Record<
  string,
  { bg: string; text: string; dot: string }
> = {
  Submitted: {
    bg: "bg-orange-100",
    text: "text-orange-800",
    dot: "bg-orange-500",
  },
  Scheduled: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    dot: "bg-blue-500",
  },
  Approved: {
    bg: "bg-green-100",
    text: "text-green-800",
    dot: "bg-green-500",
  },
  Rescheduled: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
    dot: "bg-yellow-500",
  },
  Pending: {
    bg: "bg-gray-100",
    text: "text-gray-800",
    dot: "bg-gray-500",
  },
  "Contract sent": {
    bg: "bg-purple-100",
    text: "text-purple-800",
    dot: "bg-purple-500",
  },
  Enrolled: {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    dot: "bg-emerald-500",
  },
};

export function StatusDropdown({
  status,
  studentId,
  className,
}: {
  status: string;
  studentId: string;
  className?: string;
}) {
  const { updateStatus } = useStudentStore();

  const statuses = Object.keys(statusStyles);

  const style = statusStyles[status] || {
    bg: "bg-gray-100",
    text: "text-gray-800",
    dot: "bg-gray-500",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-8 px-3 py-1 text-sm rounded-md border border-gray-300 flex items-center gap-2",
            style.bg,
            style.text,
            className
          )}
        >
          <span className={`w-2 h-2 rounded-full ${style.dot}`} />
          {status}
          <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white shadow-lg">
        {statuses.map((s) => {
          const sStyle = statusStyles[s];
          return (
            <DropdownMenuItem
              key={s}
              onClick={() => updateStatus(studentId, s)}
              className="cursor-pointer flex items-center gap-2 py-2 hover:bg-gray-100"
            >
              <span
                className={`w-2 h-2 rounded-full ${sStyle.dot}`}
              />
              <span className={`${sStyle.text}`}>{s}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
