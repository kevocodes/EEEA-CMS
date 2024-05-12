import { Button } from "@/components/ui/button";
import { Activity, Creator } from "@/models/activities.mode";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowDown, ArrowUp } from "lucide-react";
import ActivityActions from "../components/ActivityActions/ActivityActions";

export const activitiesColumns: ColumnDef<Activity>[] = [
  {
    accessorKey: "title",
    header: "Titulo",
  },
  {
    accessorKey: "datetime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha y hora
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const datetime = row.getValue("datetime") as string;

      return <div>{dayjs(datetime).format("DD/MM/YYYY - HH:mm")}</div>;
    },
  },
  {
    accessorKey: "creator",
    header: "Creador",
    cell: ({ row }) => {
      const creator = row.getValue("creator") as Creator;

      return <div>{`${creator.name} ${creator.lastname}`}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const activity = row.original;

      return <ActivityActions activity={activity} />;
    },
  },
];
