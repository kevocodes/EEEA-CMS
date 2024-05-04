import { Badge } from "@/components/ui/badge";
import { Event } from "@/models/events.model";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import EventThumbnailViewer from "../components/EventThumbnailViewer";
import EventActions from "../components/EventActions/EventActions";

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
    header: "Fecha y hora",
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
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const event = row.original;

      return <EventActions event={event} />;
    },
  },
];
