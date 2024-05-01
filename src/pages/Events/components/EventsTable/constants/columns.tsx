import { Badge } from "@/components/ui/badge";
import { Event } from "@/models/events.model";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import dayjs from "dayjs";
import EventImagesViewer from "../components/EventImagesViewer";
import EventThumbnailViewer from "../components/EventThumbnailViewer";

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

      return <div>{dayjs(datetime).format("DD/MM/YYYY - hh:mm a")}</div>;
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

      return (
        <>
          <EventImagesViewer
            completed={event.completed}
            images={event.images}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open actions menu</span>
                <MoreHorizontal className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
