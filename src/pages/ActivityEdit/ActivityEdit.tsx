import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import EventEditContent from "./components/ActivityEditContent/ActivityEditContent";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useTitle } from "@/hooks/useTitle";
import { getTitles } from "@/utils/getTitles";

function ActivityEdit() {
  useTitle(getTitles(PRIVATE_ROUTES.ACTIVITIES_EDIT));

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
