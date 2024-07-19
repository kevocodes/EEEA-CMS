import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ResponseError } from "@/models/responseError.model";
import { useParams } from "react-router-dom";
import { ActivityDetail } from "@/models/activities.model";
import { getActivityById } from "@/services/activities.service";
import ActivityEditInformationForm from "./components/ActivityEditInformationForm/ActivityEditInformationForm";

type ActivityEditParams = {
  activityId: string;
};

function EventEditContent() {
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState<ActivityDetail | null>(null);

  const { activityId } = useParams<ActivityEditParams>();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getActivityById(activityId!);
        setActivity(response);
      } catch (error) {
        if (error instanceof ResponseError) return toast.error(error.message);
        toast.error("Ha ocurrido un error inesperado");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [activityId]);

  return (
    <>
      {!loading && activity && (
        <ActivityEditInformationForm activity={activity} />
      )}

      {loading && <ActivityEditInformationForm.skeleton />}
    </>
  );
}

export default EventEditContent;
