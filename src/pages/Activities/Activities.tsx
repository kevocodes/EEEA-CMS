import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import { ResponseError } from "@/models/responseError.model";
import { getActivities } from "@/services/activities.service";
import { useActivities } from "@/stores/activities.store";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ActivitiesTable from "./components/ActivitiesTable/ActivitiesTable";
import { activitiesColumns } from "./components/ActivitiesTable/constants/columns";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { useTitle } from "@/hooks/useTitle";
import { getTitles } from "@/utils/getTitles";

function Activities() {
  useTitle(getTitles(PRIVATE_ROUTES.ACTIVITIES));

  const activities = useActivities((state) => state.activities);
  const setActivities = useActivities((state) => state.setActivities);
  const yearFilter = useActivities((state) => state.yearFilter);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const results = await getActivities(yearFilter);
        setActivities(results);
      } catch (error) {
        if (error instanceof ResponseError) return toast.error(error.message);
        toast.error("Ha ocurrido un error inesperado");
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      setActivities([]);
    };
  }, [setActivities, yearFilter]);

  return (
    <PageContainer>
      <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-3">
        <h2 className="text-xl font-bold">Actividades</h2>
        <Link to={PRIVATE_ROUTES.ACTIVITIES_CREATE} className="w-full sm:w-fit">
          <Button className="w-full sm:w-fit">
            <Plus size={16} className="mr-2" />
            Crear actividad
          </Button>
        </Link>
      </div>

      <ActivitiesTable
        columns={activitiesColumns}
        data={activities}
        loading={loading}
      />
    </PageContainer>
  );
}

export default Activities;
