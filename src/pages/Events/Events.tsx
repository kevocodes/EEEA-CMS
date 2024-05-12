import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import EventsTable from "./components/EventsTable/EventsTable";
import { eventsColumns } from "./components/EventsTable/constants/columns";
import { useEffect, useState } from "react";
import { getEvents } from "@/services/events.service";
import { toast } from "sonner";
import { ResponseError } from "@/models/responseError.model";
import { useEvents } from "@/stores/events.store";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { PRIVATE_ROUTES } from "@/constants/routes";

function Events() {
  const events = useEvents((state) => state.events);
  const setEvents = useEvents((state) => state.setEvents);
  const yearFilter = useEvents((state) => state.yearFilter);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const results = await getEvents(yearFilter);
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

    return () => {
      setEvents([]);
    };
  }, [setEvents, yearFilter]);

  return (
    <PageContainer>
      <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-3">
        <h2 className="text-xl font-bold">Eventos</h2>
        <Link to={PRIVATE_ROUTES.EVENTS_CREATE} className="w-full sm:w-fit">
          <Button className="w-full sm:w-fit">
            <Plus size={16} className="mr-2" />
            Crear evento
          </Button>
        </Link>
      </div>
      <EventsTable columns={eventsColumns} data={events} loading={loading} />
    </PageContainer>
  );
}

export default Events;
