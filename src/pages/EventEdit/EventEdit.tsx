import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import EventEditContent from "./components/EventEditContent/EventEditContent";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function EventEdit() {
  return (
    <PageContainer>
      <div className="flex items-center w-full gap-3">
        <Link to={PRIVATE_ROUTES.EVENTS}>
          <Button variant="ghost" size="icon">
            <ArrowLeft size={24} />
          </Button>
        </Link>
        <h2 className="text-xl font-bold">Editar Evento</h2>
      </div>

      <EventEditContent />
    </PageContainer>
  );
}

export default EventEdit;
