import { Badge } from "@/components/ui/badge";
import { Event } from "@/models/events.model";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import EventThumbnailViewer from "../components/EventThumbnailViewer";
import EventActions from "../components/EventActions/EventActions";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";

export const eventsColumns: ColumnDef<Event>[] = [
  {
    accessorKey: "thumbnail",
    header: "Imagen",
    cell: ({ row }) => {
      const thumbnail = row.getValue("thumbnail") as string;

      return <EventThumbnailViewer thumbnail={thumbnail} />;
    },
  },
  {
    accessorKey: "title",
    header: "Titulo",
  },
  {
    accessorKey: "location",
    header: "Lugar",
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
      const datetime = row.getValue("datetime") as string;

      return <div>{dayjs(datetime).format("DD/MM/YYYY - HH:mm")}</div>;
    },
  },
  {
    accessorKey: "completed",
    header: "Estado",
    cell: ({ row }) => {
      const event = row.original;
      const completed = event.completed;

      return completed ? (
        <Badge variant="default">Completado</Badge>
      ) : (
        <Badge variant="outline">Pendiente</Badge>
      );
    },
    filterFn: (row, id, filterValue) => {
      const value = row.getValue(id) ? "completed" : "pending";

      return filterValue.includes(value);
    },
  },
  {
    accessorKey: "creator",
    header: "Creador",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const event = row.original;

      return <EventActions event={event} />;
    },
  },
];
