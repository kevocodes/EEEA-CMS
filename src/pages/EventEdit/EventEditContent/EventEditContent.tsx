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
import EventEditImages from "./EventEditImages/EventEditImages";

type EventEditParams = {
  eventId: string;
};

function EventEditContent() {
  const [isDisabledTabs, setIsDisabledTabs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const { eventId } = useParams<EventEditParams>();
  const token = useAuth((state) => state.token);

  // Function to refetch data and update UI
  const refetchData = () => {
    setRefetch((prev) => !prev);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getEventById(eventId!, token!);
        setThumbnail(await urlToFile(response.thumbnail, "thumbnail.webp"));
        setEvent(response);
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        }
      } finally {
        // Hide loading skeleton
        setLoading(false);
        // Enable tabs after loading data
        setIsDisabledTabs(false);
      }
    }

    fetchData();
  }, [eventId, token, refetch]);

  return (
    <Tabs defaultValue="information" className="w-full">
      <TabsList>
        <TabsTrigger disabled={isDisabledTabs} value="information">
          Información
        </TabsTrigger>
        {event?.completed && (
          <TabsTrigger disabled={isDisabledTabs} value="images">
            Imágenes
          </TabsTrigger>
        )}
      </TabsList>
      <TabsContent value="information" className="flex justify-center w-full">
        {!loading && event && thumbnail && (
          <EventEditInformationForm
            event={event}
            thumbnail={thumbnail}
            refetch={refetchData}
            setIsDisabledTabs={setIsDisabledTabs}
          />
        )}

        {loading && <EventEditInformationForm.skeleton />}
      </TabsContent>
      {event?.completed && (
        <TabsContent value="images" className="flex justify-center w-full">
          <EventEditImages
            event={event}
            images={event.images}
            refetch={refetchData}
          />
        </TabsContent>
      )}
    </Tabs>
  );
}

export default EventEditContent;
