import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ResponseError } from "@/models/responseError.model";
import { useAuth } from "@/stores/auth.store";
import { UserDBDetail } from "@/models/user.model";
import { validateSession } from "@/services/auth.service";
import ProfileEditForm from "./components/ProfileEditForm/ProfileEditForm";

function UserEditContent() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserDBDetail | null>(null);

  const token = useAuth((state) => state.token);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await validateSession(token!);
        setUser(response);
      } catch (error) {
        if (error instanceof ResponseError) return toast.error(error.message);
        toast.error("Ha ocurrido un error inesperado");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [token]);

  return (
    <>
      {!loading && user && <ProfileEditForm user={user} />}

      {loading && <ProfileEditForm.skeleton />}
    </>
  );
}

export default UserEditContent;
