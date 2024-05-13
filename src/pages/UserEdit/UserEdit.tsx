import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import { Button } from "@/components/ui/button";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import UserEditContent from "./components/UserEditContent/UserEditContent";
import { useTitle } from "@/hooks/useTitle";
import { getTitles } from "@/utils/getTitles";

function UserEdit() {
  useTitle(getTitles(PRIVATE_ROUTES.USERS_EDIT));

  return (
    <PageContainer>
      <div className="flex items-center w-full gap-3">
        <Link to={PRIVATE_ROUTES.USERS}>
          <Button variant="ghost" size="icon">
            <ArrowLeft size={24} />
          </Button>
        </Link>
        <h2 className="text-xl font-bold">Editar Usuario</h2>
      </div>

      <UserEditContent />
    </PageContainer>
  );
}

export default UserEdit;
