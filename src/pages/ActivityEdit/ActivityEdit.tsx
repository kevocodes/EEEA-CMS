import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import EventEditContent from "./ActivityEditContent/ActivityEditContent";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function ActivityEdit() {
  return (
    <PageContainer>
      <div className="flex items-center w-full gap-3">
        <Link to={PRIVATE_ROUTES.ACTIVITIES}>
          <Button variant="ghost" size="icon">
            <ArrowLeft size={24} />
          </Button>
        </Link>
        <h2 className="text-xl font-bold">Editar Actividad</h2>
      </div>

      <EventEditContent />
    </PageContainer>
  );
}

export default ActivityEdit;
