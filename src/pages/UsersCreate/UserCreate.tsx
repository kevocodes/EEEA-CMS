import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import { Button } from "@/components/ui/button";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import UserCreateForm from "./components/UserCreateForm/UserCreateForm";

function UserCreate() {
  return (
    <PageContainer>
      <div className="flex items-center w-full gap-3">
        <Link to={PRIVATE_ROUTES.USERS}>
          <Button variant="ghost" size="icon">
            <ArrowLeft size={24} />
          </Button>
        </Link>
        <h2 className="text-xl font-bold">Crear Usuario</h2>
      </div>

      <UserCreateForm />
    </PageContainer>
  );
}

export default UserCreate;
