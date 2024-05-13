import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import { Button } from "@/components/ui/button";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import InstallationCreateForm from "./components/InstallationCreateForm/InstallationCreateForm";
import { useTitle } from "@/hooks/useTitle";
import { getTitles } from "@/utils/getTitles";

function InstallationCreate() {
  useTitle(getTitles(PRIVATE_ROUTES.INSTALLATIONS_CREATE));

  return (
    <PageContainer>
      <div className="flex items-center w-full gap-3">
        <Link to={PRIVATE_ROUTES.INSTALLATIONS}>
          <Button variant="ghost" size="icon">
            <ArrowLeft size={24} />
          </Button>
        </Link>
        <h2 className="text-xl font-bold">Crear Instalación</h2>
      </div>

      <InstallationCreateForm />
    </PageContainer>
  );
}

export default InstallationCreate;
