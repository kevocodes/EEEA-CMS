import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import EventCreateForm from "./components/EventCreateForm/EventCreateForm";

function EventCreate() {
  return (
    <PageContainer>
      <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-3">
        <h2 className="text-xl font-bold">Crear Evento</h2>
      </div>

      <EventCreateForm />
    </PageContainer>
  );
}

export default EventCreate;
