import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import { Button } from "@/components/ui/button";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { ResponseError } from "@/models/responseError.model";
import { getUsers } from "@/services/users.service";
import { useAuth } from "@/stores/auth.store";
import { useUsers } from "@/stores/users.store";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import UsersTable from "./components/UsersTable/UsersTable";
import { usersColumns } from "./components/UsersTable/constants/columns";

function Users() {
  const users = useUsers((state) => state.users);
  const setUsers = useUsers((state) => state.setUsers);
  const token = useAuth((state) => state.token);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const results = await getUsers(token!);
        setUsers(results);
      } catch (error) {
        if (error instanceof ResponseError) {
          toast.error(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      setUsers([]);
    };
  }, [setUsers, token]);

  return (
    <PageContainer>
      <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-3">
        <h2 className="text-xl font-bold">Usuarios</h2>
        <Link to={PRIVATE_ROUTES.USERS_CREATE} className="w-full sm:w-fit">
          <Button className="w-full sm:w-fit">
            <Plus size={16} className="mr-2" />
            Crear Usuario
          </Button>
        </Link>
      </div>

      <UsersTable columns={usersColumns} data={users} loading={loading} />
    </PageContainer>
  );
}

export default Users;
