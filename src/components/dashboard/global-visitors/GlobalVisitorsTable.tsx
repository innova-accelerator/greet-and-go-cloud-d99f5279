
import { 
  Badge 
} from "@/components/ui/badge";
import { User, Clock } from "lucide-react";
import { SiteVisitor } from "@/models/kiosk";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

interface GlobalVisitorsTableProps {
  filteredVisitors: SiteVisitor[];
  getSiteName: (siteId: string) => string;
}

export const GlobalVisitorsTable = ({ 
  filteredVisitors,
  getSiteName
}: GlobalVisitorsTableProps) => {
  const [sorting, setSorting] = useState<{ id: string, desc: boolean }[]>([]);
  
  // Define columns for the DataTable
  const columns: ColumnDef<SiteVisitor>[] = [
    {
      accessorKey: "siteId",
      header: "Site",
      cell: ({ row }) => {
        return <div className="font-medium">{getSiteName(row.original.siteId)}</div>;
      },
    },
    {
      accessorKey: "name",
      header: "Visitor",
      cell: ({ row }) => {
        const visitor = row.original;
        return (
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
              <User className="h-4 w-4 text-gray-500" />
            </div>
            <div>
              <div>{visitor.name}</div>
              {visitor.company && (
                <div className="text-xs text-gray-500">{visitor.company}</div>
              )}
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "visitorType",
      header: "Type",
      cell: ({ row }) => {
        return (
          <Badge variant="outline">
            {row.original.visitorType}
          </Badge>
        );
      },
    },
    {
      accessorKey: "host",
      header: "Host",
    },
    {
      accessorKey: "checkInTime",
      header: "Check-In Time",
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gray-500" />
            {row.original.checkInTime}
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge 
            variant="outline" 
            className={
              status === "active" 
              ? "bg-green-100 text-green-800 hover:bg-green-100" 
              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
            }
          >
            {status === "active" ? "Checked In" : "Checked Out"}
          </Badge>
        );
      },
    },
  ];

  return (
    <div className="bg-white rounded-md shadow-sm">
      <DataTable 
        columns={columns}
        data={filteredVisitors}
        sorting={sorting}
        onSortingChange={setSorting}
        noDataMessage="No visitors found matching your filters."
      />
    </div>
  );
};

