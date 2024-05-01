import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import EventsTable from "./components/EventsTable/EventsTable";
import { eventsColumns } from "./components/EventsTable/constants/columns";
import { useEffect, useState } from "react";
import { getEvents } from "@/services/events.service";
import { toast } from "sonner";
import { ResponseError } from "@/models/responseError.model";
import { Event } from "@/models/events.model";

function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const results = await getEvents();
        setEvents(results);
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <PageContainer>
      <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-3">
        <div>
          <h2 className="text-xl font-bold">Eventos</h2>
        </div>
      </div>
      <EventsTable columns={eventsColumns} data={events} loading={loading} />
    </PageContainer>
  );
}

export default Events;
