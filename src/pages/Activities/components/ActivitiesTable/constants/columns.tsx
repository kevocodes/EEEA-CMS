import { Button } from "@/components/ui/button";
import { Activity, Creator } from "@/models/activities.model";
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
          className="p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fecha
          {column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
    cell: ({ row }) => {
      const { isAllDay } = row.original;
      const datetime = row.getValue("datetime") as string;

      const datetimeFormat = isAllDay ? "DD/MM/YYYY" : "DD/MM/YYYY - HH:mm";

      return isAllDay ? (
        <div>{dayjs(datetime).format(datetimeFormat)} - todo el día</div>
      ) : (
        <div>{dayjs(datetime).format(datetimeFormat)}</div>
      );
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
