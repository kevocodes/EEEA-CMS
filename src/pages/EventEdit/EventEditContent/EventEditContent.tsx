import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventEditInformationForm from "./EventEditInformationForm/EventEditInformationForm";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getEventById } from "@/services/events.service";
import { ResponseError } from "@/models/responseError.model";
import { useParams } from "react-router-dom";
import { useAuth } from "@/stores/auth.store";
import { EventDetail } from "@/models/events.model";
import { urlToFile } from "@/utils/createImageFileFromUrl";

type EventEditParams = {
  eventId: string;
};

function EventEditContent() {
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const { eventId } = useParams<EventEditParams>();
  const token = useAuth((state) => state.token);

  const updateEventFromUI = (
    title: string,
    location: string,
    datetime: Date,
    completed: boolean,
    thumbnail: File
  ) => {
    // Update event state
    setEvent((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        title,
        location,
        datetime: datetime.toISOString(),
        completed,
      };
    });

    // Update thumbnail state
    setThumbnail(thumbnail);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getEventById(eventId!, token!);
        setThumbnail(await urlToFile(response.thumbnail, "thumbnail.webp"));
        setEvent(response);
        console.log(response);
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        }
      }
    }

    fetchData();
  }, [eventId, token]);

  return (
    <Tabs defaultValue="information" className="w-full">
      <TabsList>
        <TabsTrigger value="information">Información</TabsTrigger>
        {event?.completed && <TabsTrigger value="images">Imágenes</TabsTrigger>}
      </TabsList>
      <TabsContent value="information" className="flex justify-center w-full">
        {event && thumbnail && (
          <EventEditInformationForm
            event={event}
            thumbnail={thumbnail}
            updateEventFromUI={updateEventFromUI}
          />
        )}
      </TabsContent>
      {event?.completed && (
        <TabsContent value="images" className="flex justify-center w-full">
          Images Page
        </TabsContent>
      )}
    </Tabs>
  );
}

export default EventEditContent;