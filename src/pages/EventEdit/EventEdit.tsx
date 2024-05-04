import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import EventEditContent from "./EventEditContent/EventEditContent";

function EventEdit() {
  return (
    <PageContainer>
      <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-3">
        <h2 className="text-xl font-bold">Editar Evento</h2>
      </div>

      <EventEditContent />
    </PageContainer>
  );
}

export default EventEdit;
