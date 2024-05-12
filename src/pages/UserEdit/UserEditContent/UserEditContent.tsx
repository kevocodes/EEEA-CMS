import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ResponseError } from "@/models/responseError.model";
import { useParams } from "react-router-dom";
import { useAuth } from "@/stores/auth.store";
import { UserDBDetail } from "@/models/user.model";
import { getUserById } from "@/services/users.service";
import UserEditContentForm from "./UserEditContentForm/UserEditContentForm";

type UserEditParams = {
  userId: string;
};

function UserEditContent() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserDBDetail | null>(null);

  const { userId } = useParams<UserEditParams>();
  const token = useAuth((state) => state.token);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getUserById(userId!, token!);
        setUser(response);
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId, token]);

  return (
    <>
      {!loading && user && <UserEditContentForm user={user} />}

      {/* {loading && <UserEditInformationForm.skeleton />} */}
    </>
  );
}

export default UserEditContent;
