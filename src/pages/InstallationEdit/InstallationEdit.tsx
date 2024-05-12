import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import InstallationEditContent from "./InstallationEditContent/InstallationEditContent";

function InstallationEdit() {
  return (
    <PageContainer>
      <div className="flex items-center w-full gap-3">
        <Link to={PRIVATE_ROUTES.INSTALLATIONS}>
          <Button variant="ghost" size="icon">
            <ArrowLeft size={24} />
          </Button>
        </Link>
        <h2 className="text-xl font-bold">Editar Instalación</h2>
      </div>

      <InstallationEditContent />
    </PageContainer>
  );
}

export default InstallationEdit;
