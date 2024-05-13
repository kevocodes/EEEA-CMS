import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import EventCreateForm from "./components/EventCreateForm/EventCreateForm";
import { Link } from "react-router-dom";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTitle } from "@/hooks/useTitle";
import { getTitles } from "@/utils/getTitles";

function EventCreate() {
  useTitle(getTitles(PRIVATE_ROUTES.EVENTS_CREATE));

  return (
    <PageContainer>
      <div className="flex items-center w-full gap-3">
        <Link to={PRIVATE_ROUTES.EVENTS}>
          <Button variant="ghost" size="icon">
            <ArrowLeft size={24} />
          </Button>
        </Link>
        <h2 className="text-xl font-bold">Crear Evento</h2>
      </div>

      <EventCreateForm />
    </PageContainer>
  );
}

export default EventCreate;
