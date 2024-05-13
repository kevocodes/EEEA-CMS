import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import { Link } from "react-router-dom";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ActivityCreateForm from "./components/ActivityCreateForm/ActivityCreateForm";
import { useTitle } from "@/hooks/useTitle";
import { getTitles } from "@/utils/getTitles";

function ActivityCreate() {
  useTitle(getTitles(PRIVATE_ROUTES.ACTIVITIES_CREATE));

  return (
    <PageContainer>
      <div className="flex items-center w-full gap-3">
        <Link to={PRIVATE_ROUTES.ACTIVITIES}>
          <Button variant="ghost" size="icon">
            <ArrowLeft size={24} />
          </Button>
        </Link>
        <h2 className="text-xl font-bold">Crear Actividad</h2>
      </div>

      <ActivityCreateForm />
    </PageContainer>
  );
}

export default ActivityCreate;
