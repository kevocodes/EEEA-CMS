import { PageContainer } from "@/components/platform/PageContainer/PageContainer";
import InstallationImages from "./components/InstallationImages/InstallationImages";
import { useInstallations } from "@/stores/installations.store";
import { useEffect, useState } from "react";
import { ResponseError } from "@/models/responseError.model";
import { toast } from "sonner";
import { getInstallations } from "@/services/installations.service";

function Installations() {
  const installations = useInstallations((state) => state.installations);
  const setInstallations = useInstallations((state) => state.setInstallations);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await getInstallations();
        setInstallations(response);
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
      setInstallations([]);
    };
  }, [setInstallations]);

  return (
    <PageContainer>
      <div className="flex flex-col sm:flex-row justify-between items-start w-full gap-3">
        <h2 className="text-xl font-bold">Instalaciones</h2>
      </div>
      {!loading && installations && (
        <InstallationImages images={installations} />
      )}

      {loading && <InstallationImages.skeleton />}
    </PageContainer>
  );
}

export default Installations;
