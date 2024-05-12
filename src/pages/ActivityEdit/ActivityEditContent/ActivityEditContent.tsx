import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ResponseError } from "@/models/responseError.model";
import { useParams } from "react-router-dom";
import { useAuth } from "@/stores/auth.store";
import { ActivityDetail } from "@/models/activities.model";
import { getActivityById } from "@/services/activities.service";
import ActivityEditInformationForm from "./ActivityEditInformationForm/ActivityEditInformationForm";

type ActivityEditParams = {
  activityId: string;
};

function EventEditContent() {
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState<ActivityDetail | null>(null);

  const { activityId } = useParams<ActivityEditParams>();
  const token = useAuth((state) => state.token);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getActivityById(activityId!);
        setActivity(response);
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [activityId, token]);

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
